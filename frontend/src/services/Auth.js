import http from "../http-common"

class Auth {
    register(data){
        return http.post("/auth/register", data)
    }

    login(data){
        return http.post("/auth/login", data)
    }

    user(){
        return http.get("/auth/user")
    }
}

export default new Auth()