import './App.css';

import React, { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import Avatar from '@mui/material/Avatar';

import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Map from './Map.js';

import * as storeHelper from './helpers/jsonbin';
import * as geoHelper from './helpers/geo';

function App() {

  const [toilets, setToilets] = useState([])
  const [camera, setCamera] = useState(false)
  const [name, setName] = useState("")
  const [notes, setNotes] = useState("")
  const [photos, setPhotos] = useState([])
  const [position, setPosition] = useState([])

  const [addToiletOpen, setAddToiletOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    var toilets = storeHelper.getToilets();
    setToilets(toilets);
  }, [])

  const startAddToilet = async () => {
    const currentPosition = await geoHelper.getCurrentPosition();
    setPosition(currentPosition);
    setAddToiletOpen(true);
  }

  const addToilet = () => {
    setAddToiletOpen(false);
    storeHelper.addToilet({ name: name, notes: notes, photos: photos, position: position });
  }

  const handleTakePhoto = (photo) => {
    setPhotos([...photos, photo]);
    setCamera(false);
  }

  return (
    <>
      {
        camera ?
          <div className="camera">
            <Camera
              onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
              imageCompression={0.97}
              isMaxResolution={true}
              isImageMirror={false}
              isSilentMode={false}
              isDisplayStartCameraError={true}
              isFullscreen={true}
              sizeFactor={1}
            />
          </div>
          : null
      }
      <div className="map"><Map toilets={toilets} position={position} /></div>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bog hub
          </Typography>
          <Button color="inherit" onClick={() => startAddToilet()}>Add toilet</Button>
        </Toolbar>
      </AppBar>
      <Dialog
        fullScreen={fullScreen}
        open={addToiletOpen}
        onClose={() => setAddToiletOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Add toilet
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new toilet to BogHub.
          </DialogContentText>
          <TextField
            id="txt-name"
            label="Name"
            placeholder="Name for the toilet"
            multiline
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="txa-notes"
            label="Notes"
            placeholder="Enter notes about the toilet e.g. size, surroundings, etc."
            multiline
            onChange={(e) => setNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          {
            photos && photos.length > 0 ?
              photos.map((photo) => {
                return (
                  <Avatar src={'data:image/png;base64' + photo} sx={{ width: 56, height: 56 }}></Avatar>
                )
              })
              : null
          }
        </DialogActions>
        <DialogActions>
          <Button autoFocus onClick={() => setCamera(true)}>
            Add photo
          </Button>
          <Button autoFocus onClick={() => setAddToiletOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => addToilet()} autoFocus>
            Complete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
