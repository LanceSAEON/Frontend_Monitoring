import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { 
    LOAD_LOGS, 
    LOAD_LOGS_CLICK,
    LOAD_LOGS_DOWNLOAD,
    LOAD_LOGS_MOUSEMOVE,
    LOAD_LOGS_QUERY
 } from '../GraphQL/Queries'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useParams } from "react-router";
import { 
    Navbar, 
    Container,
    Button,
    ListGroup,
    NavDropdown,
    Form,
    Row,
    Col,
    Card,
    CardGroup,
    Alert
 } from 'react-bootstrap'

export default function Dashboard() {
    const { category } = useParams()

    const query = (category) => {
        switch (category) {
            case 'clicks':
                return LOAD_LOGS_CLICK
            
            case 'downloads':
                return LOAD_LOGS_DOWNLOAD
    
            case 'mousemoves':
                return LOAD_LOGS_MOUSEMOVE
    
            case 'queries':
                return LOAD_LOGS_QUERY
            
            default:
                return LOAD_LOGS
        }
    }
    
    const [authError, setAuthError] = useState("")
    const { logout } = useAuth()
    const history = useHistory()
    const {error, loading, data} = useQuery(query(category))

    const handleLoad = () => {        
        var finalResult = []
        var container = <CardGroup>{innerCard}</CardGroup>
        var innerCard = [];
        let resData

        switch (category) {
            case 'clicks':
                resData = data["Log_Click"]
                break;
            
            case 'downloads':
                resData = data["Log_Download"]
                break;
    
            case 'mousemoves':
                resData = data["Log_MouseMove"]
                break;
    
            case 'queries':
                resData = data["Log_Quey"]
                break;
            
            default:
                resData = data["Log"]
                break;
        }

        JSON.parse(resData).map((item, index) => {
            if (((index + 1) % 3) === 1) {
                // Initialization
                container = <CardGroup>{ innerCard }</CardGroup>
                innerCard = []

                innerCard.push(
                    <Card style={{margin: "2vh"}}>
                        <Card.Img className="card-img-top w-100 d-block" />
                        <Card.Body>
                            <Card.Title as="h4" className="text-center">{handleTitle(item.type)}</Card.Title>
                            <Card.Text style={{color:"rgba(0,0,0,0.8)"}}>
                                <h5>Session: </h5><p className="text-secondary">{item.clientSession}</p>
                                <h5>Date: </h5><p className="text-secondary">{item.createdAt}</p>
                                <h5>IP: </h5><p className="text-secondary">{item.clientInfo.ipAddress}</p>
                            </Card.Text>
                            <Button className="btn-primary">Button</Button>
                        </Card.Body>
                    </Card>)
            } else if (((index + 1) % 3) === 2) {
                // Middle item
                innerCard.push(
                    <Card style={{margin: "2vh"}}>
                        <Card.Img className="card-img-top w-100 d-block" />
                        <Card.Body>
                            <Card.Title as="h4" className="text-center">{handleTitle(item.type)}</Card.Title>
                            <Card.Text style={{color:"rgba(0,0,0,0.8)"}}>
                                <h5>Session: </h5><p className="text-secondary">{item.clientSession}</p>
                                <h5>Date: </h5><p className="text-secondary">{item.createdAt}</p>
                                <h5>IP: </h5><p className="text-secondary">{item.clientInfo.ipAddress}</p>
                            </Card.Text>
                            <Button className="btn-primary">Button</Button>
                        </Card.Body>
                    </Card>)

            } else if (((index + 1) % 3) === 0) {
                // Third item and closing of group
                innerCard.push(
                    <Card style={{margin: "2vh"}}>
                        <Card.Img className="card-img-top w-100 d-block" />
                        <Card.Body>
                            <Card.Title as="h4" className="text-center">{handleTitle(item.type)}</Card.Title>
                            <Card.Text style={{color:"rgba(0,0,0,0.8)"}}>
                                <h5>Session: </h5><p className="text-secondary">{item.clientSession}</p>
                                <h5>Date: </h5><p className="text-secondary">{item.createdAt}</p>
                                <h5>IP: </h5><p className="text-secondary">{item.clientInfo.ipAddress}</p>
                            </Card.Text>
                            <Button className="btn-primary">Button</Button>
                        </Card.Body>
                    </Card>)

                finalResult.push(container)
            }
        })
            
        return finalResult
    }

    async function handleLogout() {
        setAuthError('')

        try {
            await logout()
            history.push('/login')
        } catch (error) {
            setAuthError('Failed to logout')
        }
    }

    const handleTitle = (title) => { return (title === "mousemove" ? "Mouse Movement" : String(title).charAt(0).toUpperCase() + new String(title).slice(1)) }
    
    return (
        <>
            <div>
                <div className="header-blue">
                    <Navbar as="nav" expand="md" className="navbar-dark navigation-clean-search">
                        <Container>
                            <Navbar.Brand href="/">Log Client</Navbar.Brand>
                            <Navbar.Collapse id="navcol-1">
                                <ListGroup as="ul" className="navbar-nav">
                                    <ListGroup.Item bsPrefix=" " className="nav-item" role="presentation">
                                        <Link className="nav-link active" to="/live-catalogue">Catalogue</Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item bsPrefix=" "className="nav-item" role="presentation">
                                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                                            <NavDropdown.Item role="presentation" href="clicks">Clicks</NavDropdown.Item>
                                            <NavDropdown.Item role="presentation" href="downloads">Downloads</NavDropdown.Item>
                                            <NavDropdown.Item role="presentation" href="mousemoves">Mouse Move</NavDropdown.Item>
                                            <NavDropdown.Item role="presentation" href="queries">Query</NavDropdown.Item>
                                        </NavDropdown>
                                    </ListGroup.Item>
                                </ListGroup>
                                <Form className="mr-auto" inline target="_self">
                                    <Form.Group></Form.Group>
                                </Form>
                                <Navbar.Text>
                                    <Link className="w-1 btn-light action-button hover" size="sm" role="button" to="/update-profile" style={{ textDecoration: 'none' }}>Account</Link>
                                </Navbar.Text>
                                <Button className="w-1 btn-light action-button hover" size="sm" role="button" onClick={ handleLogout }>Logout</Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Container className="hero">
                        <Row>
                            <Col id="target-column">
                                { !loading ? handleLoad() : <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div> }
                                { error && <Alert variant="danger">{error}</Alert> }
                                { authError && <Alert variant="danger">{authError}</Alert> }
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <footer className="footer-dark">
                <Container>
                    <Row>
                        <Col className="col-sm-6 col-md-3 item">
                            <h3>Services</h3>
                            <ListGroup as="ul">
                                <ListGroup.Item bsPrefix=" "><Link href="#">Web design</Link></ListGroup.Item>
                                <ListGroup.Item bsPrefix=" "><Link href="#">Development</Link></ListGroup.Item>
                                <ListGroup.Item bsPrefix=" "><Link href="#">Hosting</Link></ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col className="col-sm-6 col-md-3 item">
                            <h3>About</h3>
                            <ListGroup as="ul">
                                <ListGroup.Item bsPrefix=" "><Link href="#">Company</Link></ListGroup.Item>
                                <ListGroup.Item bsPrefix=" "><Link href="#">Team</Link></ListGroup.Item>
                                <ListGroup.Item bsPrefix=" "><Link to='/privacy-policy'>Careers</Link></ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col className="col-sm-6 item text">
                            <h3>Company Name</h3>
                            <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
                        </Col>
                        <Col className="col item social">
                            <Link to="/facebook">
                                <i className="icon ion-social-facebook"></i>
                            </Link>
                            <Link to="/twitter">
                                <i className="icon ion-social-twitter"></i>
                            </Link>
                            <Link to="/github">
                                <i className="icon ion-social-github"></i>
                            </Link>
                        </Col>
                    </Row>
                    <p className="copyright">Company Name @ 2021</p>
                </Container>
            </footer>
        </>
    )
}
