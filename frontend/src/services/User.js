import http from "../http-common"

class User {

    update(id, data){
        return http.patch(`/users/${id}`, data, { withCredentials: true })
    }

    setAvatar(id, data){
        return http.post(`/users/${id}/avatar`, data, { withCredentials: true , headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    }

    updatePassword(id, data){
        return http.patch(`/users/${id}/password`, data, { withCredentials: true })
    }

    deleteAvatar(id){
        return http.delete(`/users/${id}/avatar`, { withCredentials: true })
    }

    getRole(role_id){
        return http.get(`/roles/${role_id}`)
    }

    fillWallet(id, data){
        return http.post(`/users/${id}/fill-wallet`, data, { withCredentials: true })
    }
}

export default new User()