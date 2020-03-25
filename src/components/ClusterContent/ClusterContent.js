import React from 'react';
import './ClusterContent.css';
import ClusterDocument from '../ClusterDocument';


export function ClusterContent({cluster, documents}) {
    return (
        <div className="ClusterContent">
            <div className="ClusterTitle">
                {cluster["cluster_name"]}
            </div>
            <div className="ClusterDocuments">
                {
                    documents
                    .filter((document) => cluster["list_of_documents_ids"].includes(document["document_id"]))
                    .map(document => <ClusterDocument document={document} key={document["document_id"]} />)
                }
            </div>
        </div>
    );
}

export default ClusterContent;
