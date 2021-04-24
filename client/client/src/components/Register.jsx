import { React, useEffect, useState } from 'react'
import { Redirect } from "react-router-dom"; 
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {

    const [redirect, setRedirect] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: e.nativeEvent.target[0].value,
            username: e.nativeEvent.target[1].value,
            password: e.nativeEvent.target[2].value
        };

        setEmail('');
        setUsername('');
        setPassword('');

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
            else {
                res.json()
                .then((resJSON) => {
                    console.log(resJSON);
                    toast.error(resJSON['error'], {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
            }
        })
    };

    const handleEmailChange = (e) => { setEmail(e.target.value) };
    const handleUsernameChange = (e) => { setUsername(e.target.value) };
    const handlePasswordChange = (e) => { setPassword(e.target.value) };

    return (
        <div>
        { redirect ? (
            <Redirect 
                to={{ pathname: "/campgrounds"}}
            />
        ) : (
            <Container>
            <ToastContainer />
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
                                        <Form.Control type="email" 
                                                      name="email"  
                                                      value={email}
                                                      onChange={handleEmailChange}/>
                                        <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" 
                                                      name="username" 
                                                      value={username}
                                                      onChange={handleUsernameChange}/>
                                    </Form.Group>

                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" 
                                                      name="password" 
                                                      value={password}
                                                      onChange={handlePasswordChange}/>
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
