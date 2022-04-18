import http from "../http-common"

class Payment {

    getSettings(){
        return http.get("/payment-settings")
    }
}

export default new Payment()