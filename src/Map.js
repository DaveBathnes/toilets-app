import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import Avatar from '@mui/material/Avatar';

function Map(props) {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  useEffect(() => {
    if (props.position.length > 0) {
      setViewport({
        latitude: props.position[1],
        longitude: props.position[0],
        zoom: 18
      });
    }
  }, [props.position]);

  const displayToilet = (toilet) => {
    props.displayToilet(toilet);
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle={'https://api.maptiler.com/maps/streets/style.json?key=1OK05AJqNta7xYzrG2kA'}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {
        props.toilets && props.toilets.length > 0 ?
          props.toilets.map(toilet => {
            return (
              <Marker latitude={toilet.latitude} longitude={toilet.longitude} offsetLeft={-20} offsetTop={-10}>
                <Avatar onClick={() => displayToilet(toilet)}>{toilet.name.substring(0, 2)}</Avatar>
              </Marker>
            )
          }) : null
      }
    </ReactMapGL>
  );
}

export default Map;