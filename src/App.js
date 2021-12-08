import './App.css';

import React, { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Map from './Map.js';

import * as binHelper from './helpers/jsonbin';
import * as geoHelper from './helpers/geo';

function App() {

  const [bins, setBins] = useState([])
  const [camera, setCamera] = useState(false)
  const [notes, setNotes] = useState("")
  const [photos, setPhotos] = useState([])
  const [position, setPosition] = useState([])

  const [addBinOpen, setAddBinOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    var bins = binHelper.getBins();
    setBins(bins);
  }, [])

  const startAddBin = async () => {
    const currentPosition = await geoHelper.getCurrentPosition();
    setPosition(currentPosition);
    setAddBinOpen(true);
  }

  const addBin = () => {
    setAddBinOpen(false);
    binHelper.addBin();
  }

  const handleTakePhoto = (photo) => {
  }

  return (
    <>
      {
        camera ? <Camera
          onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
          imageCompression={0.97}
          isMaxResolution={true}
          isImageMirror={false}
          isSilentMode={false}
          isDisplayStartCameraError={true}
          isFullscreen={true}
          sizeFactor={1}
        /> : null
      }
      <div className="map"><Map bins={bins} position={position} /></div>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bog hub
          </Typography>
          <Button color="inherit" onClick={() => startAddBin()}>Add a bin</Button>
        </Toolbar>
      </AppBar>
      <Dialog
        fullScreen={fullScreen}
        open={addBinOpen}
        onClose={() => setAddBinOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Add a new bin
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new bin to BogHub.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setCamera(true)}>
            Add a photo
          </Button>
          <Button autoFocus onClick={() => setAddBinOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => addBin()} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
