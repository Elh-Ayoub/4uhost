import React, { useEffect, useState } from "react";
import TicketDataService from "../../services/Ticket";
import Loader from "../LoaderComponent";
function SupportTicket(props){
    const [tickets, setTickets] = useState({loading: false, data: null, error: null})

    useEffect(() => {
        setTickets({loading: true, data: null, error: null})
        TicketDataService.getTickets(props.user.id)
        .then(response => {
            setTickets({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setTickets({loading: false, data: null, error: error.response.data})
        })
    },[])
    const getStatusClassName = (status) => {
        if(status == 'pending') return "badge badge-primary";
        if(status == 'opened') return "badge badge-success";
        if(status == 'closed') return "badge badge-dark";
        return ""
    }
    const getPriorityClassName = (priority) => {
        if(priority == 'low') return "badge badge-success mx-1";
        if(priority == 'medium') return "badge badge-warning mx-1";
        if(priority == 'high') return "badge badge-danger mx-1";
        return ""
    }
    let content
    if(tickets.loading){
        content = <div className="loader_mid"><Loader/></div>
    }else if(tickets.data){
        content = tickets.data.map((ticket) => 
            <div key={ticket.id} className="ticket-container">
                <div className="d-flex justify-content-between mb-2">
                    <div># <span className="ticket_id">{ticket.id}</span></div>
                    <div>
                        <span className={getStatusClassName(ticket.status)}>{ticket.status}</span>
                        <span className={getPriorityClassName(ticket.priority)}>{ticket.priority}</span>
                    </div>
                </div>
                <div>
                    <strong>{ticket.message}</strong>
                </div>
                <div>{new Date(ticket.created_at).toUTCString()}</div>
            </div>
        )
        if(tickets.data.length == 0){
            content = <p className="small">No ticket created yet</p>
        }
    }
    return content
}

export default SupportTicket