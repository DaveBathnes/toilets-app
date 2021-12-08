import './App.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Map from './Map.js';

function App() {
  return (
    <>
      <div className="map"><Map /></div>
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
