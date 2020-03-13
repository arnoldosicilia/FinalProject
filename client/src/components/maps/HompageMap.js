import React, { Component } from "react";

import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";


import Geocode from "react-geocode";

import OfferServices from '../../services/offer.services'



Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_API_KEY}`);

class Map extends Component {
    constructor(props) {
        super(props);
        this.offerServices = new OfferServices();
        this.state = {

            center: { lat: 37.093798, lng: -3.399168 },
            offers: this.props.offers,
            markers: [],
            locations: {
                'Baqueira': { lat: 42.699659, lng: 0.933011 },
                'Formigal': { lat: 42.775447, lng: -0.371188 },
                'Andorra': { lat: 42.543899, lng: 1.733701 },
                'Sierra Nevada': { lat: 37.093798, lng: -3.399168 }
            }
        };
    }

    componentDidMount = () => {
        this.setCenter()
        this.setMarkersCoords()
    }

    componentDidUpdate = prevProps => {
        prevProps !== this.props && this.setCenter()
        prevProps !== this.props && this.setMarkersCoords()
    }

    setCenter = () => {
        let center = this.state.locations[this.props.center]
        this.setState({ center: center })
    }

    setMarkersCoords = () => {
        this.state.offers.forEach(elm => {
            Geocode.fromAddress(elm.direction)
                .then(response => this.pushMarkersCoords(response.results[0].geometry.location))
                .catch(err => new Error(err))
        })
    }

    pushMarkersCoords = coords => {
        const markersCopy = [...this.state.markers]
        coords && markersCopy.push(coords)
        this.setState({ markers: markersCopy })
    }


    render() {


        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={this.state.center}
                center={this.state.center} >

                {this.state.markers.map((elm, idx) => (<Marker key={idx} position={elm}></Marker>))}
            </GoogleMap>
        );
    }
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;

