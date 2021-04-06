import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Rating from '@material-ui/lab/Rating';


// const getCampgrounds = async () => {
//   try {
//     const resp = await axios.get('http://localhost:5000/campgrounds');
//     console.log(resp.data);
//   } catch (err) {
//       // Handle Error Here
//     console.error(err);
//   }
// };

function ShowCampground() {

  let { id } = useParams();
  const [campgroundState, setCampgroundState] = useState(null);
  const [isDataLoaded, setLoaded] = useState(false);

  const handleClick = () => {

  }

  useEffect(() => {
    async function fetchData () {
      try {
        const response = await fetch(`http://localhost:5000/campgrounds/${id}`);
        const json = await response.json();
        setCampgroundState(json);
        setLoaded(true);        
        console.log(json);
      } catch (error) {}
    }
    // if (campgroundState.length === 0 ) { 
    //   fetchData() 
    // }
    
    fetchData();
  }, []);

  //console.log(campgroundState);
  return (
    <div className="row">
      <h1>ShowCampground!</h1>
        { isDataLoaded ? (
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
              <Link to={`/campgrounds/${id}/edit`} className="btn btn-success">Edit Campground</Link>
              <div className="col-6 text-muted">
                2 days ago
              </div>
            </Card>
          </div>) : (<Spinner animation="border" />)
        }
        <div className="col-6">
          <h2>Leave a Review</h2>
          <Form>
            <Form.Group controlId="ratingStars">
              <Rating name="pristine" />
            </Form.Group>
          </Form>
        </div>
      </div>
  )
}

export default ShowCampground;

