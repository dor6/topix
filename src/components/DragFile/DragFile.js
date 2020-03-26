import React, { useState, useEffect, useRef } from 'react';
import './DragFile.css';
import CoolText from '../CoolText';

const DRAG_HERE_TEXT = "Drop Your Stupid File Here!";
const DRAG_OVER_TEXT = "YES! FEED ME!!! YES!!!";
const DIGESTING_TEXT = "YUM YMU YUM YUM YUM! NOW DIGESTING!!";
const INVALID_FILE_TEXT = "The Last File You Gave Me Was Bad So I Spat It!";

const _getFileFromEvent = (e) => {
    let dt = e.dataTransfer
    let files = dt.files
    let file = files[0];
    return file;
};

const _fileIsValid = (file) => (file.type === "application/json" || file.type.indexOf("text") === 0);

const _validateJson = (json) => {
    // TODO: Validate The Json Better.
    // now just validating that the higher attributes are arrays.
    // needs to add validation of the inwards of the json.
    if( !Array.isArray(json["clusters"]) || !Array.isArray(json["documents"]) ){
        throw new Error("Json Is Invalid");
    }
};

export function DragFile({setJson, rerendered}) {
    const [over, setOver] = useState(false);
    const [invalidFile, setInvalidFile] = useState(false);
    const [digesting, setDigesting] = useState(false);
    const [close, setClose] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        if(ref && ref.current && !digesting && !close){
            const element = ref.current;

            const handleDragEnter = () => {
                setInvalidFile(false);
                setOver(true);
            }

            const handleDragLeave = () => {
                setOver(false);
            };

            
            function handleDrop(e) {
                handleDragLeave();

                const file = _getFileFromEvent(e);

                if (_fileIsValid(file)) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var text = e.target.result;
                        try{
                            let json = JSON.parse(text);
                            _validateJson(json);
                            setDigesting(true);
                            setTimeout(() => {
                                setClose(true);
                                setTimeout(() => setJson(json), 1000);
                            }, 1500);
                        }
                        catch{
                            setInvalidFile(true);
                        }
                    }
                    reader.readAsText(file);
                }
                else{
                    setInvalidFile(true);
                }

            }


            element.addEventListener('dragenter', handleDragEnter, false);
            element.addEventListener('dragleave', handleDragLeave, false);
            element.addEventListener('drop', handleDrop, false);

            return () => {
                element.removeEventListener('dragenter', handleDragEnter);
                element.removeEventListener('dragleave', handleDragLeave);
                element.removeEventListener('drop', handleDrop);
            };
        }
    }, [ref, setInvalidFile, setOver, setJson, digesting, close]);


    let dragAreaClasses = ["DragArea"];
    if(over)        dragAreaClasses.push("Over");
    if(close)       dragAreaClasses.push("Close");
    if(rerendered && !close)  dragAreaClasses.push("Enter");

    return (
        <div className="DragFile">
            <div className={dragAreaClasses.join(' ')} ref={ref}>
                <CoolText   text={over ?  DRAG_OVER_TEXT : digesting ? DIGESTING_TEXT : invalidFile ? INVALID_FILE_TEXT : DRAG_HERE_TEXT}
                            delay={(!over && !digesting && !invalidFile && rerendered) ? 500 : 0}  
                />
            </div>
        </div>
    );
}

export default DragFile;
