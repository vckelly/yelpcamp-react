import { React, useEffect, useState, useContext } from 'react';
import { Redirect, useHistory, useLocation } from "react-router-dom"; 
import { UserContext } from '../UserContext.js';

import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';


export default function Logout() {

    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('From logout', user, setUser);
        
        fetch('http://localhost:5000/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log('From logout', res);
            
            if (res.ok) {
                    setUser(null);
                    history.push({
                        pathname: '/campgrounds',
                        state: { 
                            from: 'logout'
                        }
                    })
                }
            })

    };


    return (
        <div> 
            <Button variant="success" onClick={handleSubmit}>Logout</Button>{' '}
        </div>
    )
};