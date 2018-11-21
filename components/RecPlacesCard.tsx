import React, { Fragment } from 'react';
import { connect } from 'react-redux';
/*
API RES OBJECT
{
  "location_id": {
    "national": false,
    "fax": "",
    "postal_code": "85015",
    "location_type_id": 0,
    "description": "Checker Auto Parts",
    "city": "PHOENIX",
    "latitude": 33.5034205914,
    "province": "AZ",
    "updated": "2002-07-09T10:13:00-06:00",
    "municipal": false,
    "curbside": false,
    "hours": "Please call for hours of operation.",
    "phone": "(602) 263-7668",
    "address": "4545 North 19th Avenue",
    "created": "2002-07-09T09:48:00-06:00",
    "url": "http://www.cskauto.com",
    "country": "US",
    "notes": "Additional location notes go here.",
    "longitude": -112.099765575,
    "geocoded": true,
    "materials": [
      {
        "dropoff": true,
        "description": "Used Motor Oil",
        "business": false,
        "residential": true,
        "notes": "There is a five gallon maximum drop-off per day.",
        "material_id": 1,
        "pickup": false
      },
      {
        "dropoff": true,
        "description": "Car Batteries",
        "business": false,
        "residential": true,
        "notes": "",
        "material_id": 4,
        "pickup": false
      }
    ],
    "region": "MARICOPA"
  }
}
*/
const RecPlacesCard = () => (
    <Fragment></Fragment>
)


export default connect()(RecPlacesCard);
