import React from 'react';
import ShowCampground from './ShowCampground';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Card from 'react-bootstrap/Card';

function Campground(camp) {
  return (
    <Card style={{ width: '18rem'}}>
      { camp.campground.images.length > 0 ? 
        <Card.Img variant="top" src={camp.campground.images[0].url} className="campground-img"/>
        : ''}
      <Card.Body>
        <Card.Title>{camp.campground.title}</Card.Title>
        <Card.Text>
          {camp.campground.description}
        </Card.Text>
        <Card.Text>
          <small className="text-muted">{camp.campground.location}</small>
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Link to={"/campgrounds/" + camp.campground.id}>View</Link>
      </Card.Body>
    </Card>
    
  )
}

// { camp.campground.images.length > 0 ? (
//   <Carousel>
//     { camp.campground.images.forEach((img, i) => {
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src={img.url}
//           alt="Slide"
//         />
//       </Carousel.Item>
//     })}
//   </Carousel>
//   ) : ''
// }      

export default Campground;