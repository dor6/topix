import React from 'react';
import './ClusterDocument.css';


const RTL_STYLE = {
    direction: 'rtl',
    textAlign: 'right'
};

const LTR_STYLE = {
    direction: 'ltr',
    textAlign: 'left'
};


const _isRTL = (s) => {           
    let ltrChars    = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
        rtlChars    = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
        rtlDirCheck = new RegExp('^[^'+ltrChars+']*['+rtlChars+']');

    return rtlDirCheck.test(s);
};

const _getDirectionStyle = (text) => {
    return _isRTL(text) ? RTL_STYLE : LTR_STYLE;
};


export function ClusterDocument({document}) {

    const {header, text, link} = document;

    return (
        <div className="ClusterDocument">
            <div className="ClusterDocumentTitle" style={_getDirectionStyle(header)}>{header}</div>
            <div className="ClusterDocumentText" style={_getDirectionStyle(text)}>{text}</div>
            <a href={link} className="ClusterDocumentLink" style={LTR_STYLE}>{link}</a>
        </div>
    );
}

export default ClusterDocument;
