import React, { useEffect, useState, useContext, forwardRef } from 'react';
import { useHistory, useLocation } from "react-router-dom"; 
import Campground from './Campground.jsx';
import MapboxGLMap from './MapboxGLMap.jsx';
import { UserContext } from '../UserContext.js';
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Campgrounds.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Campgrounds() {
  let history = useHistory();
  let location = useLocation();
  let [isDataLoaded, setDataLoaded] = useState('false');
  let [gridDimensions, setGridDimensions] = useState(null);
  const [user, setUser] = useContext(UserContext);
  
  //console.log('From campgrounds', user, setUser);
  const NUM_COLS = 4;

  const [campgroundState, setCampgroundState] = useState([]);

  useEffect(() => {
    function computeGridDimensions(numCampgrounds) {
      let numRows = numCampgrounds % NUM_COLS === 0 ? numCampgrounds / NUM_COLS : (numCampgrounds / NUM_COLS) + 1;
      return [NUM_COLS, parseInt(numRows)];
    }
    async function fetchData () {
      try {
        const response = await fetch('http://localhost:5000/campgrounds', {
          method: 'GET',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:3000',
              'Access-Control-Allow-Credentials': true
          }
        });
        const json = await response.json();
        setGridDimensions(computeGridDimensions(json.length));
        setCampgroundState(json);
        setDataLoaded(true);
      } catch (error) {}
    };

    if (campgroundState.length === 0) {
      fetchData();
    }  
    //TODO: check if this is correct way to load data with useEffect
  // }, [campgroundState, isDataLoaded]);
  }, [campgroundState]);

  useEffect(() => {
    setDataLoaded(false);
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
      if (location.state.from === 'login') {
        toast.success('Welcome Back!', toastObj);
      }
      if (location.state.from === 'logout') {
        toast.success('Goodbye!', toastObj);
      }
      if (location.state.from === 'show') {
        toast.success('Campground successfully deleted!', toastObj);
      }

      if (location.state.from === 'register') {
        toast.success('You have been succesfully registered!', toastObj);
      }
      if (location.state.from === 'unauthorized') {
        toast.error('You are not authorized to do that', toastObj);
      }
      location.state.user = '';
    }
  }, []);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    let curIndex = columnIndex + (rowIndex * NUM_COLS);
    if (curIndex < campgroundState?.length) {
      return (     
        <div className="virtualized-campground" style={style}>        
          <Campground
            key={campgroundState[curIndex].id}
            campground={campgroundState[curIndex]}
          /> 
        </div>
      )
    }
    return null;
  };

  return (
    <div>
      <div className="campgrounds">
        
        { isDataLoaded ? (
          <div>
            <MapboxGLMap campgrounds={campgroundState} />
            <AutoSizer>
              {({ height, width }) => (
                <Grid
                  columnCount={gridDimensions[0]}
                  columnWidth={300}
                  height={height*2}
                  rowCount={gridDimensions[1]}
                  rowHeight={600}
                  width={width}
                >
                  {Cell}
                </Grid>
              )}
            </AutoSizer>
          </div>
          ) : ( <span>
                  <FontAwesomeIcon className="icon" icon="sun" size="7x" spin />
                </span>                              
              )
        }
      </div>
    </div>
  );
}

