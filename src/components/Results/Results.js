import React, { useState } from 'react';
import './Results.css';
import CoolText from '../CoolText';
import Chart from '../Chart';
import ClusterContent from '../ClusterContent'

const PIE_TITLE_TEXT = 'I Barfed This Pie For You';
const CONTENT_TITLE_TEXT = 'Here Is The Pie Contents';
const CONTENT_SUB_TITLE_TEXT = 'You Know, For Allergies & Such';

export function Results({dataJson, clearResults}) {
    const [selectedCluster, setSelectedCluster] = useState(dataJson.clusters[0]);

    let classes = ["Results"];
    if(clearResults)    classes.push('Close');

    return (
        <div className={classes.join(' ')}>

            <div className="PieSection">
                <div className="PieTitle">
                    <CoolText text={PIE_TITLE_TEXT} />
                </div>
                <div className="PieContainer">
                    <Chart dataJson={dataJson} setSelectedCluster={setSelectedCluster} />
                </div>
            </div>

            <div className="Divider"></div>

            <div className="ContentSection">
                <div className="ContentTitle">
                    <CoolText text={CONTENT_TITLE_TEXT} delay={2100} />
                    <div className="ContentSubTitle">
                        <CoolText text={CONTENT_SUB_TITLE_TEXT} delay={3200} />
                    </div>
                </div>
                <div className="ContentContainer">
                    <ClusterContent cluster={selectedCluster}  documents={dataJson["documents"]} />
                </div>
            </div>
        </div>
    );
}

export default Results;
