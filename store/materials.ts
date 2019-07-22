import axios from 'axios';
const baseURL: string = 'http://api.earth911.com/earth911.';

//ACTIONS
const FIND_MATERIALS: string = 'FIND_MATERIALS';
const GET_MATERIAL_DETAIL: string = 'GET_MATERIAL_DETAIL';

//ACTION CREATORS
const _findMaterials = (materials) => ({ type: FIND_MATERIALS, materials });
const _getMaterialDetail = (material) => ({ type: GET_MATERIAL_DETAIL, material });

//REDUCER
const initialState = {
  foundMaterials: [],
  materialDetails: {
    // description: '',
    // image: '',
    // long_description: '',
    // material_id: '',
  },
}
const materialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_MATERIALS:
      return { ...state, foundMaterials: action.materials };
    case GET_MATERIAL_DETAIL:
      return { ...state, materialDetails: action.material }
    default: return state;
  };
};

//THUNKS
export const getMaterialDetail = (api_key: string, materialId: string) => dispatch => {
  return axios
    .get(`${baseURL}getMaterials?api_key=${api_key}`)
    .then(res => res.data)
    .then(materials => {
      return materials.result.find(material => {
        return material.material_id === materialId;
      })
    })
    .then(material => dispatch(_getMaterialDetail(material)))

  /* SAMPLE RES {
"description": "#1 Plastic Bags",
"url": "",
"description_legacy": "",
"material_id": 445,
"long_description": "Plastic bags are used to transport products or to seal foods. #1 Plastic bags may be difficult to recycle because they have limited markets.",
"family_ids": [
9,
106,
108
],
"image": "materials/1-plastic-bags.jpg"
}, */
};

export const searchMaterials = (api_key: string, materialSearch: string) => dispatch => {
  return axios
    .get(`${baseURL}searchMaterials?api_key=${api_key}&query=${materialSearch}`)
    .then(res => res.data)
    .then(materials => {
      if (!materials.result.length) {
        materials.result.description = 'Not Recycable, but maybe you can try Reusing it!';
        materials.result.material_id = 10000;
      }
      dispatch(_findMaterials(materials.result))
    })
    .catch(error => {
      console.log('materials.ts');
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
  /* SAMPLE RES {
  "num_results": 1,
  "result": [
  {
  "url": "",
  "exact": true,
  "description": "Toothbrushes",
  "material_id": 587
  }
  ]}
  */
}

export default materialsReducer;
