import * as React from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';

function Map(props) {
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
      {
        props.bins && props.bins.length < 0 ?
          props.bins.map(bin => {
            return (
              <Marker latitude={bin.latitude} longitude={bin.longitude} offsetLeft={-20} offsetTop={-10}>
                <div>Bin 1</div>
              </Marker>
            )
          }) : null
      }

      <NavigationControl style={{ padding: 20 }} />
    </ReactMapGL>
  );
}

export default Map;