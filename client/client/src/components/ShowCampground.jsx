import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';


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
  const [campgroundState, setCampgroundState] = useState([]);

  useEffect(() => {
    async function fetchData () {
      try {
        const response = await fetch(`http://localhost:5000/campgrounds/${id}`);
        const json = await response.json();

        setCampgroundState(json)

      } catch (error) {}
    }
    fetchData();
  }, []);

  console.log(id);

  return (
    <div className="ShowCampground">
      <h1>ShowCampground!</h1>
      <div className="Campground">
         <h3>{campgroundState.title}</h3>
      </div>
    </div>
  )
}



export default ShowCampground;
