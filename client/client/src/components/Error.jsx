import { React, useContext } from "react";
import { Link } from "react-router-dom";

export default function Error() {
  const campButton = (
    <Link to='/campgrounds' style={{'padding': '1vh'}}>
       View Campgrounds
    </Link>
  );

  const homeButton = (
    <Link to='/' style={{'padding': '1vh'}}>
       Home
    </Link>

  );

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="row">
        <h2>Oops!</h2>
        <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
            <img
                src="https://res.cloudinary.com/vckelly/image/upload/v1623451948/YelpCamp/charles-deluvio-bYXP-ITv4_s-unsplash_syzerm.jpg"
                alt=""
                style={{"margin": "0 auto", "maxHeight": "65vh" }}
            />
            <p>We checked all of our maps but couldn't find what you were looking for. Sorry!</p>
            <p>Let's get back to...</p>
            <p>{homeButton} {campButton}</p>
        </div>
      </div>
    </div>
  );
}
