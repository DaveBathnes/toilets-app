import axios from 'axios'

const config = require('./config.json')

export const getToilets = async () => {
  const url = config.toiletAPI + config.toiletListing
  const response = await axios.get(url)
  if (response && response.data) return response.data.toilets
  return []
}

export const getToiletPhoto = async (photoId) => {
  const url = config.toiletAPI + photoId
  const response = await axios.get(url)
  if (response && response.data) return response.data.photo
  return null
}

export const addToilet = async (toilet) => {

  var toilets = await getToilets();
  const url = config.toiletAPI + '/b'

  // Add the photos to the data store
  toilets.photos.forEach(async photo => {
    const upload = await axios.post(url, { photo });
    photo = upload.data.metadata.id
  });

  // Add the toilet to the list
  toilets.push(toilet);

  // save the list
  const listUrl = config.toiletAPI + config.listing
  await axios.post(listUrl, { lastUpdated: Date.now(), toilets: toilets });
}