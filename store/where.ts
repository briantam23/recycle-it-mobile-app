/*
FETCHING DATA FROM EARTH911 API USING JSON
1) METHOD: searchMaterials - Find match in Earth911 database
2) METHOD: ~GET GEO LOCATION through navigator.geolocation~
3) METHOD: searchLocations - With Lat/Long, can now find which locations accept certain recyclables
4) METHOD: getLocationDetails - Expand on location details
*/
import axios from 'axios';
import console = require('console');
const baseURL: string = 'http://api.earth911.com/earth911.';

//ACTIONS
const FIND_PLACES_TO_RECYCLE: string = 'FIND_PLACES_TO_RECYCLE';

//ACTION CREATORS
const _findPlacesToRecycle = (locations: Object[]) => ({ type: FIND_PLACES_TO_RECYCLE, locations });

//REDUCER
const whereReducer = (state = [], action) => {
  switch (action.type) {
    case FIND_PLACES_TO_RECYCLE:
      return action.locations;
    default: return state;
  };
};

//THUNKS
const searchLocations = (api_key: string, geolocation, materialId: string, maxDistance: number = 5, maxResults: number = 5) => {
  const { latitude, longitude } = geolocation;
  // const materials = materialsArr.map(material => `material_id[]=${material}`).join('&')
  return axios
    .get(`${baseURL}searchLocations?api_key=${api_key}&latitude=${latitude}&longitude=${longitude}&material_id:${materialId}&max_distance=${maxDistance}&max_results=${maxResults}`)
    .then(res => res.data)
  /* SAMPLE RES {
"num_results": 24,
"result": [
{
"curbside": false,
"description": "My Battery Recyclers-MYBRS",
"distance": 0.8,
"longitude": -74.0038019201317,
"latitude": 40.68504631940398,
"location_type_id": 0,
"location_id": "Q1RQNVdZXlZGUw",
"municipal": false
},}
*/
}

export const findPlacesToRecycle = (api_key: string, geolocation: object, productInfo: string, maxDistance: number, maxResults: number) => dispatch => {
  return searchLocations(api_key, geolocation, productInfo, maxDistance, maxResults)
    .then(locations => dispatch(_findPlacesToRecycle(locations.result)))
};

export const getLocationDetails = (api_key: string, location: string) => {
  return axios
    .get(`${baseURL}getLocationDetails?api_key=${api_key}&location_id'=${location}`)
    //.then(res => res.data)
    .then(() => ({ latitude: 0, longitude: 0 }))
    .catch(error => {
      console.log('where.ts');
      if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
      } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request);
      } else {
          // Something happened in setting up the request and triggered an Error
          console.log('Error', error.message);
      }
      console.log(error.config);
    });

  //send this back to RecPlacesCard.js
  /* SAMPLE RES {
  "num_results": 1,
"result": {
"Q1RQNVdZXlZGUw": {
"national": false,
"updated": "2013-11-12T07:42:13",
"postal_code": "11231",
"location_type_id": 0,
"municipal": false,
"city": "Brooklyn",
"event_only": false,
"latitude": 40.68504631940398,
"province": "NY",
"fax": "",
"description": "My Battery Recyclers-MYBRS",
"curbside": false,
"hours": "Please call for hours of operation.",
"phone": "(718) 858-3600",
"address": "95 Union Street",
"notes_public": "This facility accepts all types of batteries and electronic waste for proper recycling. Please call for pick-up services, or drop-off.\r\nDEC Facility #01002 ",
"created": "2013-11-11T10:13:03",
"url": "http://www.mybatteryrecyclers.com/",
"country": "US",
"region": "Kings",
"longitude": -74.0038019201317,
"geocoded": false,
"materials": [
    {
    "dropoff": true,
    "description": "Alkaline Batteries",
    "business": true,
    "url": "",
    "residential": true,
    "notes": "",
    "residential_method": "both",
    "business_method": "both",
    "material_id": 104,
    "pickup": true,
    "pending": "F"
    },
],
"notes": "This facility accepts all types of batteries and electronic waste for proper recycling. Please call for pick-up services, or drop-off.\r\nDEC Facility #01002 "
}
}}

*/
};

export default whereReducer;
