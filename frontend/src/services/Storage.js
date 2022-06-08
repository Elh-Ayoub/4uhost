import http from "../http-common"

class Storage {
    getFiles(){
        return http.get("/storage/content", { withCredentials: true })
    }

    fileContent(file){
        return http.get(`/storage/content/${file}`, { withCredentials: true })
    }

    // logout(){
    //     return http.post("/auth/logout", null, { withCredentials: true })
    // }

    // forgotPassword(data){
    //     return http.post("/auth/forgot-password", data)
    // }

    // user(){
    //     return http.get("/auth/user", { withCredentials: true })
    // }
}

export default new Storage()