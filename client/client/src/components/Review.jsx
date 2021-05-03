import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import { UserContext } from '../UserContext.js';
import ShowCampgroundMap from './ShowCampgroundMap.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Review({ review }) {
    const [user, setUser] = useContext(UserContext);

    const handleClick = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/campgrounds/${id}/reviews/{review._id}?_method=DELETE`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log("response", res);
            if (res.ok) {
              history.push({
                  pathname: "/campgrounds",
                  state: { 
                      from: 'show'
                  }
              })
            }
            //TODO: Error handling
        })
    };

    return {
        <div className="review">               
            <Card className="mb-3">
                <Card.Body>
                    <h5 className="card-title">{review.author.username}</h5>
                    <p className="staribility-result">Rated: {review.rating} stars</p>
                    <p className="card-text">Review: {review.body}</p>
                { user && review.author.equals(user._id) ? ({
                    <Button className="btn-sm btn-danger" onClick={handleClick}>Delete</Button>
                }) : ('')}
                </Card.Body>
            </Card>
        </div>
    }
};

