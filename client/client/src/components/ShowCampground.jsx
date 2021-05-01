import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Rating from '@material-ui/lab/Rating';
import { UserContext } from '../UserContext.js';
import ShowCampgroundMap from './ShowCampgroundMap.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShowCampground() {

  let { id } = useParams();
  const [campgroundState, setCampgroundState] = useState(null);
  const [isDataLoaded, setLoaded] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useContext(UserContext);

  //TODO: Add delete button/functionality

  const handleClick = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/campgrounds/${id}?_method=DELETE`, {
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
  }

  useEffect(() => {
    async function fetchData () {
      try {
        const response = await fetch(`http://localhost:5000/campgrounds/${id}`);
        const json = await response.json();
        setCampgroundState(json);
        setLoaded(true);        
      } catch (error) {}
    }
    
    fetchData();
    //TODO: fix Toast appearing on refresh 
    if (location.state) {
      if (location.state.from === 'edit') {
        toast.success('Campground succesfully updated!', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      if (location.state.from === 'new') {
        toast.success('Campground succesfully created!', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      location.state.from = '';
    }
  }, []);

  return (
    <div className="row">
      <ToastContainer />
        { isDataLoaded ? (
          <>
            <ShowCampgroundMap campground={campgroundState} />
            <div className="col-6">
              { campgroundState.images.length > 0 ?
                (
                  <Carousel>
                  { campgroundState.images.map((img) => {
                      return (
                      <Carousel.Item key={img.id}>
                        <img          
                          key={img.id}              
                          className="d-block w-100"
                          src={img.url}
                          alt='Slide Here'
                        />
                      </Carousel.Item>
                      )
                    }
                  )}                
                  </Carousel>
                ) 
                : ('')
              }
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{campgroundState.title}</Card.Title>  
                  <Card.Text>{campgroundState.description}</Card.Text>
                </Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item className="text-muted">{campgroundState.location}</ListGroup.Item>
                  <ListGroup.Item>{"Submitted by " + campgroundState.author.username}</ListGroup.Item>
                  <ListGroup.Item>{"$" + campgroundState.price + "/night"}</ListGroup.Item>
                </ListGroup>
                { user && user['user'] === campgroundState.author.username ? (
                  <>
                    <Link to={`/campgrounds/${id}/edit`} className="btn btn-success">Edit Campground</Link>
                    <Button className="btn btn-danger" onClick={handleClick}>Delete</Button>
                  </>)
                  : ('')
                }              
                <div className="col-6 text-muted">
                  2 days ago
                </div>
              </Card>
            </div>
          </>) : (<Spinner animation="border" />)
        }
        <div className="col-6">
        { user ? (
          <>
            <h2>Leave a Review</h2>
            <Form>
              <Form.Group controlId="ratingStars">
                <Rating name="pristine" />
              </Form.Group>
            </Form>
          </>
        ) : ('')}
        </div>
      </div>
  )
}

export default ShowCampground;

