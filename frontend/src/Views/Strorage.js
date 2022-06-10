import React, { useEffect, useState } from "react";
import StorageDataServices from "../services/Storage";
import Loader from "../Components/LoaderComponent";
import "../Css/storage.css"
import { ToastContainer, toast } from 'react-toastify';

function Storage(){
    const [files, setFiles] = useState({loading: false, data: null, error: null})
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileContent, setFileContent] = useState({loading: false, data: null, error: null})
    const [updateContent, setUpdateContent] = useState(null)
    const [updateResponse, setUpdateResponse] = useState({loading: false, data: null, error: null})
    const [uploadResponse, setUploadResponse] = useState({loading: false, data: null, error: null})

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
        setSelectedFile(file)
        setFileContent({loading: true, data: null, error: null})
        StorageDataServices.fileContent(file)
        .then(response => {
            setFileContent({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setFileContent({loading: false, data: null, error: error.response.data})
        })
    }

    const update = () => {
        setUpdateResponse({loading: true, data: null, error: null})
        let data = {file: selectedFile, content: updateContent}
        StorageDataServices.update(data)
        .then(response => {
            setUpdateResponse({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setUpdateResponse({loading: false, data: null, error: error.response.data})
        })
    }

    const handleInputChange = async (event) => {
        const formData = new FormData()
        setUploadResponse({loading: true, data: null, error: null})
        for (let i = 0; i < event.target.files.length; i++) {
            formData.append("files[]", event.target.files[i]);
        }
        await StorageDataServices.upload(formData)
        .then(response => {
            setUploadResponse({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setUploadResponse({loading: false, data: null, error: error.response.data})
        })
        window.location.reload()
    }

    let content = null
    let file_content = <p>{"Select file to display content"}</p>
    let list = null
    let loader = null

    if(files.loading || fileContent.loading){
        loader = <Loader/>
    }

    if(updateResponse.data){
        if(updateResponse.data.status == "success"){
            toast(updateResponse.data.message)
        }
    }else if(updateResponse.error){
        toast(updateResponse.error.message)
    }

    if(uploadResponse.data){
        if(uploadResponse.data.status == "success"){
            toast(uploadResponse.data.message)
        }
    }else if(uploadResponse.error){
        toast(uploadResponse.error.message)
    }
    let uploadLoder = null
    if(uploadResponse.loading){
        uploadLoder = <Loader/>
    }

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
                file_content = 
                <div>
                    <textarea className="col-md-12 file_content" rows={20} onChange={(e) => {setUpdateContent(e.target.value)}}>{fileContent.data.message}</textarea>
                    <div className="row justify-content-end col-md-12">
                        <button className="btn btn-outline-warning col-md-3" onClick={update}>Save Changes</button>
                    </div>
                </div>
            }
        }
        content =  
            <div className="slider_main" style={{background: "#2E428B"}}>
                <div className="about">
                    <div className="container">
                        <div className="row align-items-start">
                            <div className="col-sm-4">
                                <label htmlFor="files_input" className="btn btn-outline-primary w-100 mb-2 uplaod_btn">Upload</label>
                                <input type="file" id="files_input" className="d-none" onChange={(e) => {handleInputChange(e)}} multiple/>
                                <ul className="files_list py-4 px-2">
                                    {list}
                                </ul>
                            </div>
                            <div className="col-sm-8">
                                {loader}
                                <div className="upload_loder">{uploadLoder}</div>
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