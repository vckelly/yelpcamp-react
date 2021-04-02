import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom"; 
import Campground from './Campground.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// const getCampgrounds = async () => {
//   try {
//     const resp = await axios.get('http://localhost:5000/campgrounds');
//     console.log(resp.data);
//   } catch (err) {
//       // Handle Error Here
//     console.error(err);
//   }
// };

function Campgrounds() {

  let history = useHistory();
  let location = useLocation();
  console.log(history, location);
  
  const [campgroundState, setCampgroundState] = useState([]);

  useEffect(() => {
    async function fetchData () {
      try {
        const response = await fetch('http://localhost:5000/campgrounds');
        const json = await response.json();

        setCampgroundState(json)

      } catch (error) {}
    }
    if (campgroundState.length === 0) {
      fetchData();
    }
  }, [campgroundState]);

  return (
    <div className="Campgrounds">
      { location.state.from === 'login' ? (
        <div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <h1>Campgrounds!</h1>
          <div className="Campground">
            { campgroundState.map((camp) => (
              <Campground
                key={camp.id}
                campground={camp}
              />
            ))}
        </div>
      )
      : (
        <h1>Campgrounds!</h1>
        <div className="Campground">
          { campgroundState.map((camp) => (
            <Campground
              key={camp.id}
              campground={camp}
            />
          ))}
        </div>
        )
    }
    </div>
  )
}



export default Campgrounds;
