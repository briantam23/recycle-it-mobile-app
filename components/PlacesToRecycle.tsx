import React, { Fragment } from 'react';
//import { Fragment } from 'react';
import { connect } from 'react-redux'; 
//import { api_key } from '../env';
import { findPlacesToRecycle } from '../store/where';
import RecPlacesCard from '../components/RecPlacesCard';

const PlacesToRecycle = () => (
    <Fragment></Fragment>
)

const mapDispatchToProps = dispatch => ({
    findPlacesToRecycle: (api_key, GPS, productInfo) => dispatch(findPlacesToRecycle(api_key, GPS, productInfo))
});

export default connect(null, mapDispatchToProps)(PlacesToRecycle);