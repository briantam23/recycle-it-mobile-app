/*
FETCHING DATA FROM EARTH911 API in JSON
GET http://api.earth911.com/earth911.methodName
http://api.earth911.com/
*/

import axios from 'axios';

const FIND_PLACES_TO_RECYCLE = 'FIND_PLACES_TO_RECYCLE';

const _findPlacesToRecycle = locationDetails => ({ type: FIND_PLACES_TO_RECYCLE, locationDetails });

const initialState = [];

const whereReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PLACES_TO_RECYCLE:
      return action.locationDetails;
    default: return state;
  };
};

export const findPlacesToRecycle = (api_key, GPS, productInfo) => dispatch => {
  console.log(productInfo)
  /*
  1) GET MATERIAL ID: materials = api.earth911.searchMaterials({
    'api_key': api_key,
    'query': 'used motor oil',
})
  2) {We may be able to skip this call with GPS coordinates from cell phone}
  Convert Zip Code to Lat/Long: postal_data = api.earth911.getPostalData({
    'api_key': api_key,
    'country': 'US',
    'postal_code': '90210',
})
  3) With Lat/Long, can now find what locations accept certain recycables
    results = api.earth911.searchLocations({
   'api_key': api_key,
   'latitude': 34.09,
   'longitude': -118.41,
   'material_id': [1, 4],
   'max_distance': 5,
})

len(results) >>> 57

RES:
{'curbside': False,
 'description': 'Jim Falk Lexus of Beverly Hills',
 'distance': 1.7,
 'latitude': 34.07,
 'location_id': '2VwAkLGZ',
 'location_type_id': 0,
 'longitude': -118.39,
 'municipal': False}

  4) Expand on location details
  details = api.earth911.getLocationDetails({
  'api_key': api_key,
  'location_id': '2VwAkLGZ',
})

RES:
{'2VwAkLGZ': {'address': '9230 Wilshire Boulevard',
              'city': 'BEVERLY HILLS',
              'country': 'US',
              'created': '2007-12-18T16:03:00',
              'curbside': False,
              'description': 'Jim Falk Lexus of Beverly Hills',
              'event_only': False,
              'fax': '',
              'flag': 'none',
              'geocoded': True,
              'hours': 'Please call for hours of operation.',
              'latitude': 34.067096470199999,
              'location_type_id': 0,
              'longitude': -118.39313399700001,
              'materials': [{'business': False,
                             'business_method': 'none',
                             'description': 'Used Motor Oil',
                             'dropoff': True,
                             'material_id': 1,
                             'notes': '',
                             'pickup': False,
                             'residential': True,
                             'residential_method': 'dropoff'}],
              'municipal': False,
              'national': False,
              'notes': '',
              'phone': '(310) 274-5200',
              'postal_code': '90212',
              'province': 'CA',
              'region': 'LOS ANGELES',
              'updated': '2007-12-21T11:23:00',
              'url': ''}}
  */

  materials = api.earth911.searchMaterials({
    //this will have to talk to './what.js' in that the query is populated by the vision component.
    api_key,
    'query': 'used motor oil',
  });


  results = api.earth911.searchLocations({
    api_key,
    'latitude': GPS.latitude,
    'longitude': GPS.longitude,
    //get lat and long from phone GPS
    'material_id': [1, 4],
    //params below are optional
    'max_distance': 5,
    'max_results': 10,
  });

  locationDetails = api.earth911.getLocationDetails({
    api_key,
    'location_id': '2VwAkLGZ',
    //send this back to RecPlacesCard.js
  });

  //probably break this out into multiple thunks

  return axios
    //template until we get API KEY
    .get(`http://api.earth911.com/earth911.methodName?key=${api_key}&productInfo=${productInfo}`)
    .then(res => res.data)
    .then(locationDetails => dispatch(_findPlacesToRecycle(locationDetails)));
};

export default whereReducer;
