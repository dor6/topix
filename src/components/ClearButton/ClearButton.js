import React, { useState, useCallback, useEffect } from 'react';
import './ClearButton.css';


export function ClearButton({clear, renderDelay}) {
    const [close, setClose] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    const handleClick = useCallback(() => {
        setClose(true);
        setTimeout(() => clear(), 750);
    }, [setClose, clear]);


    useEffect(()=> {
        const timeout = setTimeout(()=> {
            setShouldRender(true);
        },renderDelay);

        return () => clearTimeout(timeout);
    },[setShouldRender, renderDelay]);

    if(!shouldRender){
        return '';
    }

    let classes = ["ClearButton"];
    if(close)       classes.push("Close");

    return (
        <div className={classes.join(' ')} onClick={handleClick}>
            <div className="ClearButtonContent">×</div>
        </div>
    );
}

ClearButton.defaultProps = {
    clear: () => {},
    renderDelay: 5000
};



export default ClearButton;
