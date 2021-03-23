import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Campground from './Campground.jsx';



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
      <h1>Campgrounds!</h1>
      <div className="Campground">
         { campgroundState.map((camp) => (
          <Campground
            key={camp.id}
            campground={camp}
          />
        ))}
      </div>
    </div>
  )
}



export default Campgrounds;
