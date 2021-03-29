import { React, useEffect, useState } from 'react'
import { Redirect } from "react-router-dom"; 
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'


export default function Login() {

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: e.nativeEvent.target[0].value,
            password: e.nativeEvent.target[1].value
        };

        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            console.log("response", res);
            if (res.status === 200) {
                setRedirect(true);
            }
            //TODO: Error handling
        })
    };

    return (
        <div>
        { redirect ? (
            <Redirect 
                to={{ pathname: "/campgrounds"}}
            />
        ) : (    
            <Container>
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                        <Card variant="shadow">
                            <Image src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
                                alt="" className="card-img-top"/>
                            <Card.Body>
                                <Card.Title>Login</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="username" >
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" name="username"  placeholder="username" />
                                    </Form.Group>
\                                   <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="password" />
                                    </Form.Group>
                                    <Button variant="success" type="submit">Login</Button>{' '}
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>
            )}
        </div>
    )
};
