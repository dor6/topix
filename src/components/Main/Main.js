import React, { useState } from 'react';
import './Main.css';
import DragFile from '../DragFile';
import Results from '../Results';

export function Main() {
    const [json, setJson] = useState();

    return (
        <div className="Main">
            {
                json ? <Results dataJson={json} /> : <DragFile setJson={setJson}/>
            }
        </div>
    );
}

export default Main;
