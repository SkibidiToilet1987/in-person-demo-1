import { useParams } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";


export default function ViewBooking()
{
    let {bookingID} = useParams();
    const [booking, setBooking] = useState({});
    const [cookies] = useCookies(['token']);

    useEffect(()=>{
        axios.get('http://localhost:3000/bookings/'+bookingID,{
            headers:{
                Authorization:'Bearer '+cookies['token']
            }
        }).then((res)=>{
            setBooking(res.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[]);

    if(booking._id !== undefined)
    {
        return(
            <>
                <MainNavigation/>
                <Container>
                    <Row>
                        <Col>
                        <Card className="mt-4">
                                <Card.Title className= "text-center fs-1" style={{paddingTop:"20px"}}><strong>View Your Booking</strong></Card.Title>
                                <Card.Body style={{paddingTop:"0px"}}>                                    <img src={booking.hotel.img} style = {{width:"100%", paddingLeft:"20px", paddingRight:"20px", paddingBottom:"15px"}}/>
                                    <div className="text-left" style={{paddingLeft:"20px"}}>
                                        <Button className="justify-button: center display: flex"type="button" href='/' class="btn btn-primary" >Home</Button>{" "}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }else{
        return(
            <>
                <MainNavigation/>
                <Container>
                    <Row>
                        <Col>
                            <p>Loading Booking</p>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
    
}