import { React, useEffect, useState } from 'react'
import { Redirect } from "react-router-dom"; 
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'


export default function Register() {

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.nativeEvent.target[0].value);

        const data = {
            email: e.nativeEvent.target[0].value,
            username: e.nativeEvent.target[1].value,
            password: e.nativeEvent.target[2].value
        };

        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            //console.log("response", res);
            if (res.status === 200) {
                setRedirect(true);
            }
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
                                <Card.Title>Register</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="email" >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" name="email"  placeholder="Enter email" />
                                        <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" name="username" placeholder="Enter username" />
                                    </Form.Group>

                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Password" />
                                    </Form.Group>
                                    <Button variant="success" type="submit">Register</Button>{' '}
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
