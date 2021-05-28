import React, { useEffect, useState, useContext, forwardRef } from 'react';
import { useHistory, useLocation } from "react-router-dom"; 
import Campground from './Campground.jsx';
import MapboxGLMap from './MapboxGLMap.jsx';
import { UserContext } from '../UserContext.js';
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Campgrounds.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Campgrounds() {
  let history = useHistory();
  let location = useLocation();
  let [isDataLoaded, setDataLoaded] = useState('false');
  const [user, setUser] = useContext(UserContext);
  
  //console.log('From campgrounds', user, setUser);

  const [campgroundState, setCampgroundState] = useState([]);

  let campList = [];


  useEffect(() => {
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
      if (location.state.from === 'show') {
        toast.success('Campground successfully deleted!', toastObj);
      }
      location.state = {};
    }
  }, []);


  const Row = ({ index, style }) => {
    return (     
      <div className="virtualized-campground" style={style}>        
        <Campground
          key={campgroundState[index].id}
          campground={campgroundState[index]}
        /> 
      </div>
    )
  };

  const innerElementType = forwardRef(({ style, ...rest }, ref) => (
    <div
      ref={ref}
      style={{
        ...style,
        //height: `${parseFloat(style.height) + GUTTER_SIZE * 2}px`,
        height: '300px',
        overflow: 'visible',
        padding: '20px'
      }}
      {...rest}
    />
  ));

  return (
    <div>
      <div className="campgrounds">
        <ToastContainer />        
        { isDataLoaded ? (
          <div>
            <MapboxGLMap campgrounds={campgroundState} />
            <AutoSizer>
              {({ height, width }) => (
                <List
                  className="list"
                  height={height*2}
                  itemCount={campgroundState.length}
                  itemSize={(() => 600)}
                  width={width}
                  //innerElementType={innerElementType}
                >
                  {Row}
                </List>
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


// { campgroundState.map((camp) => (
//   <Campground
//     key={camp.id}
//     campground={camp}
//   />))}