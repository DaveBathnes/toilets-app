import * as React from 'react';
import ReactMapGL, {NavigationControl} from 'react-map-gl';

const OSM_MAP = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap Contributors',
      maxzoom: 19
    }
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm'
    }
  ]
};

function Map() {
  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle={OSM_MAP}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <NavigationControl style={{ padding: 20 }} />
    </ReactMapGL>
  );
}