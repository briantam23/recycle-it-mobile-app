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
  findMaterials: [],
  materialDetails: {
    // description: '',
    // image: '',
    // long_description: '',
    // material_id: '',
  },
}
const materialsReducer = (state = [], action) => {
  switch (action.type) {
    case FIND_MATERIALS:
      return { ...state, findMaterials: action.materials };
    case GET_MATERIAL_DETAIL:
      return { ...state, materialDetails: action.material }
    default: return state;
  };
};

//THUNKS
export const getMaterials = (api_key: string, materialId: string) => dispatch => {
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
    .then(materials => dispatch(_findMaterials(materials.result)))
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
