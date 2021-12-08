import * as React from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';

function Map() {
  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle={'https://api.maptiler.com/maps/streets/style.json?key=1OK05AJqNta7xYzrG2kA'}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <NavigationControl style={{ padding: 20 }} />
    </ReactMapGL>
  );
}

export default Map;