import React, { useState, useCallback } from 'react';
import './Main.css';
import DragFile from '../DragFile';
import Results from '../Results';
import ClearButton from '../ClearButton';

export function Main() {
    const [json, setJson] = useState();
    const [clearResults, setClearResults] = useState(false);


    const clearJson = useCallback(() => {
        setClearResults(true);
        setTimeout(() => setJson(), 600);
    }, [setJson, setClearResults]);

    const selectJson = useCallback((json) => {
        setClearResults(false);
        setJson(json);
    }, [setJson, setClearResults]);

    return (
        <div className="Main">
            {
                json ? (
                    <>
                        <Results dataJson={json} clearResults={clearResults} /> 
                        <ClearButton clear={clearJson} />
                    </>
                ) : <DragFile setJson={selectJson} rerendered={clearResults} />
            }
        </div>
    );
}

export default Main;
