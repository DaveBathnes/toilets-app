import './App.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Map from './Map.js';

import * as binHelper from './helpers/jsonbin';

function App() {

  const [bins, setBins] = React.useState([])

  useEffect(() => {
    var bins = binHelper.getBins();
    setBins(bins);
  })

  return (
    <>
      <div className="map"><Map bins={bins} /></div>
      <AppBar position="static" color="primary" elevation="0">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bog hub
          </Typography>
          <Button color="inherit">Add a bin</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default App;
