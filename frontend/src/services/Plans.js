import http from "../http-common"

class Plan {
    
    storagePlans(){
        return http.get("/plans/storage")
    }

    webHostingPlans(){
        return http.get("/plans/web-hosting")
    }

    emailsPlans(){
        return http.get("/plans/emails")
    }

    domain(){
        return http.get("/plans/domains")
    }

    backupPlans(){
        return http.get("/plans/backup")
    }

    getById(id){
        return http.get(`/plans/${id}`)
    }
}

export default new Plan()