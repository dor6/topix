import{ useState, useEffect } from 'react';


export function CoolText({text, typeTime, delay}) {
    const [shownText, setShownText] = useState('');

    useEffect(() => {
        setShownText('');
        
        let timeToTypeLetter = typeTime / text.length;
        let stepTimeout;
        let textToShow = '';

        const step = () => {
            textToShow = text.substr(0, textToShow.length+1);
            setShownText(textToShow);
            if(textToShow !== text){
                stepTimeout = setTimeout(step, timeToTypeLetter);
            }
        };

        stepTimeout = setTimeout(step, timeToTypeLetter + delay);

        return () => clearTimeout(stepTimeout);


    }, [text, typeTime, setShownText, delay]);


    return (
        shownText
    );
}

CoolText.defaultProps = {
    typeTime: 1000,
    delay: 0
};

export default CoolText;
