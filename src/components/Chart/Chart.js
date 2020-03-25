import React, { useEffect, useRef } from 'react';
import './Chart.css';
import {Chart as ChartJs} from 'chart.js';
import 'chartjs-plugin-datalabels';

import ColorGiver from '../../utils/ColorGiver';


const TEXT_DIMENSION_MULTIPLIER = 0.7;
const MAX_FONT_SIZE = 40;
const RAD_TO_DEGREE_MULTIPLIER = 57.296;

const _hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

const _calculatePiePieceWidth = ({circumference, outerRadius, innerRadius}) => {
    return (Math.sin(circumference/2) * (outerRadius + innerRadius ) / 2) * 2;
};

const _calculatePiePieceHeight = ({outerRadius, innerRadius}) => {
    return outerRadius - innerRadius;
};

const _calculateTextPiePieceDimensions = (model) => {
    let height = _calculatePiePieceHeight(model) * TEXT_DIMENSION_MULTIPLIER;
    let width = _calculatePiePieceWidth(model) * TEXT_DIMENSION_MULTIPLIER;
    return {
        width: Math.max(height, width),
        height: Math.min(height, width)
    };
};

const _calculatePiePieceMiddleAngle = ({startAngle, endAngle}) => {
    return RAD_TO_DEGREE_MULTIPLIER * (startAngle + endAngle)/2;
} 

const _getOptimalFontSizeForText = (canvasCtx, text, {width, height}) => {
    let fontSize = 0;
    let textWidth = 0;

    while(textWidth < width && fontSize < height && fontSize < MAX_FONT_SIZE){
        fontSize ++;
        canvasCtx.font = `${fontSize}px Arial`;
        textWidth = canvasCtx.measureText(text).width;
    }

    return fontSize - 1;
};

const _getPiePieceLabel = ({dataset, dataIndex}) => {
    return dataset.labels[dataIndex];
};

const _getPiePieceModel = ({dataset, dataIndex}) => {
    return dataset._meta[0].data[dataIndex]._model;
};

const _createEmptyDataset = () => ({
    data: [],
    clusters: [],
    backgroundColor: [],
    labels: []
});


const _addClusterToDatasets = (datasets, colorGiver, cluster, color, layer = 0) => {
    if(!datasets[layer])    datasets[layer] = _createEmptyDataset();
    const dataset = datasets[layer];

    if(!color) color = colorGiver.getColor();

    dataset.data.push(cluster["number_of_documents"]);
    dataset.clusters.push(cluster);
    dataset.labels.push(cluster["cluster_name"]);
    dataset.backgroundColor.push(color);

    if(cluster["sub_clusters"]){
        cluster["sub_clusters"].forEach((cluster) => {
            _addClusterToDatasets(datasets, colorGiver, cluster, color, layer + 1)
        });
    }
};

const _getDatasts = (dataJson => {
    let datasets = [];    
    let colorGiver = ColorGiver();

    dataJson.clusters.forEach(cluster => _addClusterToDatasets(datasets, colorGiver, cluster));

    return datasets.reverse();
});

const _getConfig = (dataJson, setSelectedCluster, canvasCtx) => {
    return {
        type: 'pie',
        data: {
            datasets: _getDatasts(dataJson)
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var index = tooltipItem.index;
                        return dataset.labels[index] + ': ' + dataset.data[index];
                    }
                }
            },
            onClick: (event, chartElements) => {
                const chartElement = chartElements[0];
                if(chartElement){
                    const dataset = chartElement._chart.config.data.datasets[chartElement._datasetIndex];
                    const cluster = dataset.clusters[chartElement._index];

                    setSelectedCluster(cluster);
                }
            },
            plugins: {
                datalabels: {
                    formatter: (value, context) => {
                        return _getPiePieceLabel(context);
                    },
                    color: ({dataset, dataIndex}) => {
                        let rgb = _hexToRgb(dataset.backgroundColor[dataIndex]);
                        let threshold = 140;
                        let luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
                        return luminance > threshold ? 'black' : 'white';
                    },
                    textStrokeColor: ({dataset, dataIndex}) => {
                        let rgb = _hexToRgb(dataset.backgroundColor[dataIndex]);
                        let threshold = 140;
                        let luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
                        return luminance > threshold ? 'white' : 'black';
                    },
                    display: true,
                    clip: true,
                    clamp: true,
                    offset: 0,
                    textStrokeWidth: 2,
                    rotation: (context) => {
                        const model = _getPiePieceModel(context);
                        const height = _calculatePiePieceHeight(model);
                        const width = _calculatePiePieceWidth(model);

                        let angle = _calculatePiePieceMiddleAngle(model)%360;


                        if(width >= height){
                            angle += 90;
                        }

                        if(angle > 90 && angle < 270 ){
                            angle -= 180;
                        }



                        return angle;
                    },
                    font: (context) => ({
                        size: ((context) => {
                            const text = _getPiePieceLabel(context);
                            const dimensions = _calculateTextPiePieceDimensions(_getPiePieceModel(context));
                            const fontSize = _getOptimalFontSizeForText(canvasCtx, text, dimensions);
                            return fontSize;
                        })(context)
                    })
                    
                }
            }
        }
    };
};

export function Chart({dataJson, setSelectedCluster}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if(canvasRef && canvasRef.current){
            const ctx = canvasRef.current.getContext("2d");
            const pieChart = new ChartJs(ctx, _getConfig(dataJson, setSelectedCluster, ctx));

            return () => pieChart.destroy();
        }

    }, [canvasRef, dataJson, setSelectedCluster]);

    return(
        <div className="ChartContainer">
            <canvas className="ChartCanvas" width="500" height="500" ref={canvasRef} />
        </div>
    );
}

export default Chart;
