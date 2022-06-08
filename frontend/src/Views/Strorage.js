import React, { useEffect, useState } from "react";
import StorageDataServices from "../services/Storage";


function Storage(){
    const [files, setFiles] = useState({loading: false, data: null, error: null})
    const [fileContent, setFileContent] = useState({loading: false, data: null, error: null})

    useEffect(() => {
        setFiles({loading: true, data: null, error: null})
        StorageDataServices.getFiles()
        .then(response => {
            setFiles({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setFiles({loading: false, data: null, error: error.response.data})
        })
    }, [])

    const fetchFileContent = (file) => {
        setFileContent({loading: true, data: null, error: null})
        StorageDataServices.fileContent(file)
        .then(response => {
            setFileContent({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setFileContent({loading: false, data: null, error: error.response.data})
        })
    }

    let content = null
    let file_content = null
    let list = null
    if(files.data){
        if(files.data.status == "success"){
            list = files.data.message.map(file => 
                <li className="link-dark" style={{cursor: "pointer"}} onClick={() => {fetchFileContent(file)}}>
                    <i class="fas fa-file-alt mx-2"></i>
                    {file}
                </li>
            )
        }
        if(fileContent.data){
            if(fileContent.data.status == "success"){
                file_content = fileContent.data.message.split('\n').map(line =>
                    <p>{(line.includes("\t")) ? ("\u00a0".repeat((line.match(/\t/g) || []).length * 4) + line) : (line)}</p>
                )
            }
        }
        content =  
            <div className="slider_main" style={{background: "#2E428B"}}>
                <div className="about">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2">
                                <ul>
                                    {list}
                                </ul>
                            </div>
                            <div className="col-sm-10">
                                {file_content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    }
    return content
}

export default Storage