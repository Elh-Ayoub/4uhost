import http from "../http-common"

class Ticket {

    getTickets(id){
        return http.get(`/users/${id}/tickets`, {withCredentials: true})
    }

    createTicket(data){
        return http.post("/tickets", data, {withCredentials: true})
    }
}

export default new Ticket()