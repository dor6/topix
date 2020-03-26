import React, { useState, useCallback } from 'react';
import './ClearButton.css';


export function ClearButton({clear}) {
    const [close, setClose] = useState(false);

    const handleClick = useCallback(() => {
        setClose(true);
        setTimeout(() => clear(), 750);
    }, [setClose, clear]);


    let classes = ["ClearButton"];
    if(close)       classes.push("Close");

    return (
        <div className={classes.join(' ')} onClick={handleClick}>
            <div className="ClearButtonContent">×</div>
        </div>
    );
}

ClearButton.defaultProps = {
    clear: () => {}
};



export default ClearButton;
