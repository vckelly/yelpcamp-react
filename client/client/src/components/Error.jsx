import { React, useEffect, useState, useContext } from "react";
import { Router, Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function Error() {
  let history = useHistory();
  let location = useLocation();
  let [userCon, setUser] = useContext(UserContext);

  const campButton = (
    <Button variant="contained" color="primary" component={Link}>
        View Campgrounds
    </Button>
  );

  const homeButton = (
    <Button variant="contained" color="primary" component={Link}>
       Home
    </Button>

  );

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="row">
        <h2>Oops!</h2>
        <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
            <img
                src="https://res.cloudinary.com/vckelly/image/upload/v1623451948/YelpCamp/charles-deluvio-bYXP-ITv4_s-unsplash_syzerm.jpg"
                alt=""
                style={{"margin": "0 auto", "max-height": "65vh" }}
            />
            <Router>
                <p>We checked all of our maps but couldn't find what you were looking for. Sorry!</p>
                <p>Let's get back to...{homeButton} {campButton}</p>
            </Router>
        </div>
      </div>
    </div>
  );
}
