import React from 'react'
import { useQuery } from '@apollo/client'
import { LOAD_LOGS } from '../GraphQL/Queries'
import { Card as CardComponent, Alert, Button } from 'react-bootstrap'

export default function Card(props) {
    
    const handleLogout = () => {return null}
    
    return (
        <>
            {
                JSON.parse(props.data["Log"]).map(function(item){
                    return <>
                                <CardComponent id={item["_id"]}>
                                    <CardComponent.Body>
                                        <h2 className="text-center mb-4">{item["type"] === "mousemove" ? "Mouse Movement" : new String(item["type"]).charAt(0).toUpperCase() + new String(item["type"]).slice(1)}</h2>
                                        {item["createdAt"] && <p><strong>Date: </strong>{new Date(item["createdAt"]).toLocaleDateString('en-GB')}</p>}
                                        {<p><strong>Client IP: </strong>{item["info"]["clientInfo"] ? item["info"]["clientInfo"] : "Not known"}</p>}
                                        {/* <Link to='/update-profile' className="btn btn-primary w-100 mt-3">Update Profile</Link> */}
                                    </CardComponent.Body>
                                    <div className="w-100 text-center m">
                                        <Button variant="link" onClick={ handleLogout }>Log Out</Button>
                                    </div>
                                </CardComponent>
                            </>
                  })
            }
        </>)
}
