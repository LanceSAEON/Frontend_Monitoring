import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { LOAD_LOGS } from '../GraphQL/Queries'
import { Card, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

export default function GetLogs() {

    const {error, loading, data} = useQuery(LOAD_LOGS)

    const handleLogout = () => { return null }
    const handleTitle = (item) => {

        if (item === "mousemove") {
            return "Mouse Movement"
        } else {
            console.log(item)
            return new String(item).charAt(0).toUpperCase() + new String(item).slice(1);
        }
    }

    function Success() {
        return (
            <div>
                {
                    JSON.parse(data["Log"]).map(function(item){
                        return <li key={item["_id"]}>
                                    <Card>
                                        <Card.Body>
                                            <h2 className="text-center mb-4">{handleTitle(item["type"])}</h2>
                                            {error && <Alert variant="danger">{error}</Alert>}
                                            {item["createdAt"] && <p><strong>Date: </strong>{new Date(item["createdAt"]).toLocaleDateString('en-GB')}</p>}
                                            {<p><strong>Client IP: </strong>{item["info"]["clientInfo"] ? item["info"]["clientInfo"] : "Not known"}</p>}
                                            {/* <Link to='/update-profile' className="btn btn-primary w-100 mt-3">Update Profile</Link> */}
                                        </Card.Body>
                                    </Card>
                                    <div className="w-100 text-center m">
                                        <Button variant="link" onClick={ handleLogout }>Log Out</Button>
                                    </div>
                                </li>
                      })
                }
            </div>
        )
    }
    

    // useEffect(() => {
    //     if (data !== undefined) {
    //         console.log(JSON.parse(data["Log"]))
    //     }
    // }, [data])
    
    return (
        <div>
            {!error && <Alert/>}
            {!loading && <Success/>}
        </div>
    )
}
