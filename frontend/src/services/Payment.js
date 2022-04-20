import http from "../http-common"

class Payment {

    getSettings(){
        return http.get("/payment-settings")
    }

    getFullPrice(data){
        return http.get("/purchase/full-price", {params: data})
    }

    makePurchase(data){
        return http.post("/purchase", data, {withCredentials: true})
    }
}

export default new Payment()