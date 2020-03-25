/*
const COLORS = [
    '#2b908f',
    '#90ee7e',
    '#f45b5b',
    '#7798BF',
    '#aaeeee',
    '#ff0066',
    '#eeaaee',
    '#55BF3B',
    '#DF5353',
    '#a6f0ff',
    '#70d49e',
    '#e898a5',
    '#007faa',
    '#f9db72',
    '#1e824c',
    '#e7934c',
    '#dadfe1',
    '#a0618b',
    '#2f7ed8',
    '#0d233a',
    '#8bbc21',
    '#910000',
    '#1aadce',
    '#492970',
    '#f28f43', 
    '#77a1e5',
    '#c42525',
    '#a6c96a',
    '#4572A7',
    '#AA4643',
    '#89A54E',
    '#80699B',
    '#3D96AE',
    '#DB843D',
    '#92A8CD',
    '#A47D7C',
    '#B5CA92',
    '#7cb5ec',
    '#434348',
    '#90ed7d',
    '#f7a35c',
    '#8085e9',
    '#f15c80',
    '#e4d354',
    '#91e8e1'
];
*/

const COLORS = [
    '#20211d',
    '#50514F',
    '#7f8181',
    '#5D605F',
    '#3b3e3d',
    '#737575',
    '#aaabad',
    '#818587',
    '#585e61',
    '#94999C',
    '#d0d4d7'
];

export const ColorGiver = () => {
    const pub = {};

    let currentColorIndex = 0;

    pub.getColor = () => {
        let color = COLORS[currentColorIndex];
        currentColorIndex ++;

        if(currentColorIndex === COLORS.length) currentColorIndex = 0;

        return color;
    };

    return pub;
};

export default ColorGiver;