import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';


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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData () {
      try {
        const response = await fetch(`http://localhost:5000/campgrounds/${id}`);
        const json = await response.json();
        setCampgroundState(json);
        setLoading(true);        
        //console.log(campgroundState);
      } catch (error) {}
    }
    // if (campgroundState.length === 0 ) { 
    //   fetchData() 
    // }
    
    fetchData();
  }, [campgroundState]);

  //console.log(campgroundState);
  return (
    <div className="row">
    <h1>ShowCampground!</h1>
        { loading ? (
          <div className="col-6">
            { campgroundState.images[0] ?
              (<Carousel>
                { campgroundState.images.forEach((img, i) => {
                    <Carousel.Item >
                      <img
                        className="d-block w-100"
                        src={img.url}
                        alt='Slide Here'
                      />
                    </Carousel.Item>
                  }
                )}                
              </Carousel>) 
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
              <div className="col-6 text-muted">
                2 days ago
              </div>
            </Card>
          </div>) : (<Spinner animation="border" />)
        }
      </div>
  )
}

export default ShowCampground;

