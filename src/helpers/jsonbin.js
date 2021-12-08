import axios from 'axios'

const config = require('./config.json')

export const getToilets = async () => {
  const url = config.toiletAPI + config.toiletListing
  const response = await axios.get(url, { headers: { 'X-Master-Key': config.storeKey } })
  if (response && response.data) return response.data.record.toilets
  return []
}

export const getToiletPhoto = async (photoId) => {
  const url = config.toiletAPI + photoId
  const response = await axios.get(url, { headers: { 'X-Master-Key': config.storeKey } })
  if (response && response.data && response.data.record) return response.data.record.photo
  return null
}

export const getToiletPhotos = async (toilet) => {
  let photos = [];

  if (toilet.photos && toilet.photos.length > 0) {
    for (let i = 0; i < toilet.photos.length; i++) {
      const photo = await getToiletPhoto(toilet.photos[i])
      photos.push(photo)
    }
  }
  return photos;
}

export const addToilet = async (toilet) => {

  var toilets = await getToilets();
  const url = config.toiletAPI + '/b'

  let photoIds = []
  // Add the photos to the data store
  if (toilet.photos && toilet.photos.length > 0) {

    for (const photo of toilet.photos) {
      const upload = await axios.post(url, { photo: await resizedataURL(photo, 300, 300) }, { headers: { 'X-Master-Key': config.storeKey } });
      photoIds.push(upload.data.metadata.id)
    }
  }

  toilet.photos = photoIds;

  // Add the toilet to the list
  toilets.push(toilet);

  // save the list
  const listUrl = config.toiletAPI + config.toiletListing
  await axios.put(listUrl, { lastUpdated: Date.now(), toilets: toilets }, { headers: { 'X-Master-Key': config.storeKey } });

  return toilets;
}

// From StackOverflow: https://stackoverflow.com/a/52983833
export const resizedataURL = (datas, wantedWidth, wantedHeight) => {
  return new Promise(async function (resolve, reject) {

    var img = document.createElement('img');

    img.onload = function () {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = wantedWidth;
      canvas.height = wantedHeight;
      ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

      var dataURI = canvas.toDataURL();

      // This is the return of the Promise
      resolve(dataURI);
    };

    // We put the Data URI in the image's src attribute
    img.src = datas;

  })
}