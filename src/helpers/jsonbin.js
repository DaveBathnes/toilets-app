import axios from 'axios'

const config = require('./config.json')

export const getBins = async () => {
  const url = config.binAPI + config.binListing
  const response = await axios.get(url)
  if (response && response.data) return response.data.bins
  return []
}

export const getBinPhoto = async (photoId) => {
  const url = config.binAPI + photoId
  const response = await axios.get(url)
  if (response && response.data) return response.data.photo
  return null
}

export const addBin = async (bin) => {
  // Get the bin list
  var bins = await getBins();
  const url = config.binAPI + '/b'

  // Add the bin photos to the data store
  bin.photos.forEach(async photo => {
    const upload = await axios.post(url, { photo });
    photo = upload.data.metadata.id
  });

  // Add the bin to the list
  bins.push(bin);

  // save the list
  const listUrl = config.binAPI + config.listing
  await axios.post(listUrl, { lastUpdated: Date.now(), bins: bins });
}