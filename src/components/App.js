import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { api_key } from '../../env';
import { findPlacesToRecycle } from '../store/where';
import RecPlacesCard from './RecPlacesCard';

const GPS = {
  latitude: '',
  longitutde: '',
}

class App extends Component {

  render() {
    return (
      <Router>
        <div />
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  findPlacesToRecycle: (api_key, GPS, productInfo) => dispatch(findPlacesToRecycle(api_key, GPS, productInfo))
});

export default connect(null, mapDispatchToProps)(App);
