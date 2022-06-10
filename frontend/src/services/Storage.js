import http from "../http-common"

class Storage {
    getFiles(){
        return http.get("/storage/content", { withCredentials: true })
    }

    fileContent(file){
        return http.get(`/storage/content/${file}`, { withCredentials: true })
    }

    update(data){
        return http.patch("/storage/update", data, { withCredentials: true })
    }

    upload(data){
        return http.post("/storage/upload", data, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})

    }
}

export default new Storage()