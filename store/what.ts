/*
FETCHING DATA FROM CLOUD VISION
POST https://vision.googleapis.com/
*/
import axios from 'axios';

const baseURL: string = 'https://vision.googleapis.com/v1/images:annotate';
const GOOGLE_MATERIAL: string = 'GOOGLE_MATERIAL';

const _googleWhatDoYouSee = (materials: object) => ({ type: GOOGLE_MATERIAL, materials });

// const initialState = {
//   responses: [{
//     labelAnnotations: [{
//       description: "cat",
//       mid: "/m/01yrx",
//       score: 0.9918305,
//       topicality: 0.9918305
//     }]
//   }]
// }

const whatReducer = (state = [], action) => {
  switch (action.type) {
    case GOOGLE_MATERIAL:
      return action.materials;
    default: return state;
  };
};

export const googleWhatDoYouSee = (CLOUD_VISION_API_KEY: string, body: object) => dispatch => {
  return axios
    .post(`${baseURL}?key=${CLOUD_VISION_API_KEY}`, body)
    .then(res => res.data)
    .then((materials) => dispatch(_googleWhatDoYouSee(materials)))
};

export default whatReducer;
