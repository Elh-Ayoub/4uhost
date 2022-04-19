import React from "react";
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import StoragePlans from "../Components/Hosting/StoragePlansComponent";
import WebHostingPlans from "../Components/Hosting/WebHostingComponent";
import EmailsPlans from "../Components/Hosting/EmailsPlansComponent";
import BackupPlans from "../Components/Hosting/BackupPlansComponent";

function HostingPlans(props){
    return (
        <div className="slider_main" style={{background: "#2E428B"}}>
            <div className="about">
                <div className="container-fluid">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="storage-plans">
                        <Row>
                            <Col sm={2}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item style={{cursor: "pointer"}}>
                                        <Nav.Link eventKey="storage-plans">
                                            <i class="fas fa-box-open nav-icon mx-2"></i>
                                            Storage plans
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item style={{cursor: "pointer"}}>
                                        <Nav.Link eventKey="web-hosting">
                                            <i class="fas fa-server nav-icon mx-2"></i>
                                            Web hosting plans
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item style={{cursor: "pointer"}}>
                                        <Nav.Link eventKey="emails-plans">
                                            <i class="fas fa-at nav-icon mx-2"></i>
                                            Emails plans
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item style={{cursor: "pointer"}}>
                                        <Nav.Link eventKey="backup-plans">
                                            <i class="fas fa-undo nav-icon mx-2"></i>
                                            Backup plans
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={10}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="storage-plans">
                                        <StoragePlans cart={props.cart} addToCard={props.addToCard} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="web-hosting">
                                        <WebHostingPlans cart={props.cart} addToCard={props.addToCard}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="emails-plans">
                                        <EmailsPlans cart={props.cart} addToCard={props.addToCard}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="backup-plans">
                                        <BackupPlans cart={props.cart} addToCard={props.addToCard}/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        </div>
    )
}

export default HostingPlans