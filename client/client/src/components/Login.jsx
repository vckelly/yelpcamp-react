import { React, useEffect, useState, useContext } from 'react'
import { Redirect, useHistory, useLocation } from "react-router-dom"; 
import { UserContext } from '../UserContext.js'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {

    const history = useHistory();
    const location = useLocation();
    let { userCon, setUser } = useContext(UserContext);
    let [userName, setUserName] = useState('');
    let [pw, setPw] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: e.nativeEvent.target[0].value,
            password: e.nativeEvent.target[1].value
        };
        
        setUserName('');
        setPw('');
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            console.log(res);
            
            if (res.ok) {
                //TODO: set user context + session data
                fetch('http://localhost:5000/users/current' , {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Credentials': true
                    },
                    body: JSON.stringify({ username: data.username })
                })
                .then((res) => {
                    res.json()
                    .then((user) => {
                        console.log(user)
                        setUser(user);
                    });
                    
                    history.push({
                        pathname: '/campgrounds',
                        state: { 
                            from: 'login'
                        }
                    })
                })
            }
            else {
                toast.error('Username or password was incorrect. Try again.', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            //TODO: Error handling
        })
    };

    const handleUsernameChange = (e) => { setUserName(e.target.value) };
    const handlePasswordChange = (e) => { setPw(e.target.value) };

    return (
        <div> 
            <ToastContainer />
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
                                        <Form.Control type="username" name="username"  placeholder="username" value={userName} onChange={handleUsernameChange}/>
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="password" value={pw} onChange={handlePasswordChange}/>
                                    </Form.Group>
                                    <Button variant="success" type="submit">Login</Button>{' '}
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    )
};
