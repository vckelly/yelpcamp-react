import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import { UserContext } from "../UserContext.js";
import ShowCampgroundMap from "./ShowCampgroundMap.jsx";
import Review from "./Review.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShowCampground() {
  let { id } = useParams();
  const [campgroundState, setCampgroundState] = useState(null);
  const [isDataLoaded, setLoaded] = useState(false);
  const [ratingStars, setRatingStars] = useState(0);
  const [ratingText, setRatingText] = useState("");
  const history = useHistory();
  const location = useLocation();

  if (location) { console.log("LOCATION", location.state) };
  if (history) { console.log("history", history) };
  const [user, setUser] = useContext(UserContext);

  //TODO: Add delete button/functionality

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/campgrounds/${id}?_method=DELETE`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      console.log("response", res);
      if (res.ok) {
        history.push({
          pathname: "/campgrounds",
          state: {
            from: "show",
          },
        });
      }
      //TODO: Error handling
    });
  };

  const handleReview = (e) => {
    e.preventDefault();

    const review = {
      rating: parseInt(ratingStars),
      body: ratingText,
    };

    fetch(`http://localhost:5000/campgrounds/${id}/reviews`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(review),
    }).then((res) => {
      console.log("response", res);
      if (res.ok) {
        setRatingStars(0);
        setRatingText('');
        location.state = { from: "add-review" };
        history.go()
      }
      //TODO: Error handling
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/campgrounds/${id}`);
        const json = await response.json();
        setCampgroundState(json);
        console.log("CAMPGROUND STATE?", campgroundState);
        setLoaded(true);
      } catch (error) {}
    }

    fetchData();
    
  }, []);

  useEffect(() => {
    //TODO: fix Toast appearing on refresh
    if (location.state) {
      const toastObj = {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        };

      if (location.state.from === "login") {
          toast.success("Welcmoe back!", toastObj) 
      }
      if (location.state.from === "edit") {
        toast.success("Campground succesfully updated!", toastObj) 
      }
      if (location.state.from === "new") {
        toast.success("Campground succesfully created!", toastObj) 
      }

      if (location.state.from === "add-review") {
        toast.success("Review succesfully created!", toastObj) 
      }

      if (location.state.from === "delete-review") {
        toast.success("Review succesfully deleted!", toastObj) 
      }
    }
  }, [])

  const handleRatingTextChange = (e) => {
    setRatingText(e.target.value);
  };

  return (
    <div className="ShowCampground">
      <div className="row">
        <ToastContainer />
        {isDataLoaded ? (
          <>
            <ShowCampgroundMap campground={campgroundState} />
            <div className="col-6">
              {campgroundState.images.length > 0 ? (
                <Carousel>
                  {campgroundState.images.map((img) => {
                    return (
                      <Carousel.Item key={img.id}>
                        <img
                          key={img.id}
                          className="d-block w-100"
                          src={img.url}
                          alt="Slide Here"
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              ) : (
                ""
              )}
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{campgroundState.title}</Card.Title>
                  <Card.Text>{campgroundState.description}</Card.Text>
                </Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item className="text-muted">
                    {campgroundState.location}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {"Submitted by " + campgroundState.author.username}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {"$" + campgroundState.price + "/night"}
                  </ListGroup.Item>
                </ListGroup>
                {user?.user === campgroundState.author.username ? (
                  <>
                    <Link
                      to={`/campgrounds/${id}/edit`}
                      className="btn btn-success"
                    >
                      Edit Campground
                    </Link>
                    <Button className="btn btn-danger" onClick={handleDelete}>
                      Delete Campground
                    </Button>
                  </>
                ) : (
                  ""
                )}
                <div className="col-6 text-muted">2 days ago</div>
              </Card>
            </div>
            <div className="col-6">
              {user ? (
                <>
                  <h2>Leave a Review</h2>
                  <Form onSubmit={handleReview}>
                    <Rate
                      allowClear="true"
                      defaultValue="0"
                      value={ratingStars}
                      onChange={setRatingStars}
                    />
                    <div className="mb-3">
                      <label className="form-label">Review Text</label>
                      <textarea
                        className="form-control"
                        value={ratingText}
                        onChange={handleRatingTextChange}
                        cols="30"
                        rows="3"
                      ></textarea>
                    </div>
                    <Button className="btn btn-success" type="submit">
                      Submit
                    </Button>
                  </Form>
                </>
              ) : (
                ""
              )}
              {campgroundState.reviews.map((review) => {
                return <Review key={review._id}
                               review={review} 
                               campgroundId={id} 
                        />
              })}
            </div>
          </>
        ) : (
          <Spinner animation="border" />
        )}
      </div>
    </div>
  );
}

export default ShowCampground;
