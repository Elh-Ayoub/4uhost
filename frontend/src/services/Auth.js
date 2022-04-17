import http from "../http-common"

class Auth {
    register(data){
        return http.post("/auth/register", data)
    }

    login(data){
        return http.post("/auth/login", data, { withCredentials: true })
    }

    logout(){
        return http.post("/auth/logout", null, { withCredentials: true })
    }

    forgotPassword(data){
        return http.post("/auth/forgot-password", data)
    }

    user(){
        return http.get("/auth/user", { withCredentials: true })
    }
}

export default new Auth()