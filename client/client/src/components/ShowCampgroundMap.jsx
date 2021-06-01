import React, { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
 
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const ShowCampgroundMap = ({ campground }) => {
  
    const mapContainer = useRef();

    useEffect(() => {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
      
      const map = new mapboxgl.Map({
        container: mapContainer.current, // container ID
        style: 'mapbox://styles/mapbox/outdoors-v10', // style URL
        center: campground.geometry.coordinates, // starting position [lng, lat]
        zoom: 8 // starting zoom
      });
            
  
      map.addControl(new mapboxgl.NavigationControl());

      new mapboxgl.Marker()
        .setLngLat(campground.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
            .setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
        )
      .addTo(map);
    }, []);
    
    return (
      <div>
          <div className="show-campground-map" ref={mapContainer}/>
      </div>
    );
};
  
export default ShowCampgroundMap;