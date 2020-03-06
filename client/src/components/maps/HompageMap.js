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
            console.log('se llama al geocoder ', elm.direction)
            Geocode.fromAddress(elm.direction)
                .then(response => {
                    this.pushMarkersCoords(response.results[0].geometry.location)
                })
                .catch(err => console.log(err))
        })
    }



    pushMarkersCoords = coords => {
        const markersCopy = [...this.state.markers]
        coords && markersCopy.push(coords)
        this.setState({ markers: markersCopy })
        console.log('se llama al pushMarkers---------', coords)
    }

    // componentDidMount = () => {
    //     this._service
    //         .getAllCenters()
    //         .then(allCentersFromDB => {
    //             this.setState({ centers: allCentersFromDB.data });
    //             const addressesCopy = [...this.state.addresses];
    //             this.state.centers.forEach(elm => {
    //                 Geocode.fromAddress(elm.address)
    //                     .then(
    //                         response => {
    //                             const { lat, lng } = response.results[0].geometry.location;
    //                             addressesCopy.push({ lat, lng });
    //                             this.setState({
    //                                 address: { lat, lng },
    //                                 addresses: addressesCopy
    //                             });
    //                         },
    //                         error => {
    //                             console.error(error);
    //                         }
    //                     )
    //                     .catch(err => console.log(err));
    //             });
    //         })
    //         .catch(err => console.log("Error", err));
    // };





    render() {
        console.log('estos son los makers', this.state.markers)

        return (
            <GoogleMap
                defaultZoom={14}
                defaultCenter={this.state.center}
                center={this.state.center} >

                {this.state.markers.map((elm, idx) => (<Marker key={idx} position={elm}></Marker>))}
            </GoogleMap>
        );
    }
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
























// -----------------------------------------------------------------------------------------------

//HAY QUE INSTALAR EL PAQUETE DE GOOGLE-MAPS-REACT

// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

// const mapStyles = {
//     width: "100%",
//     height: "500px"
// };


// class Events extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//             center: { lat: 37.093798, lng: -3.399168 },

//             locations: {
//                 'Baqueira': { lat: 42.699659, lng: 0.933011 },
//                 'Formigal': { lat: 42.775447, lng: -0.371188 },
//                 'Andorra': { lat: 42.543899, lng: 1.733701 },
//                 'Sierra Nevada': { lat: 37.093798, lng: -3.399168 }
//             }

//         };
//     }



//     setCenter = () => {
//         let center = this.state.locations[this.props.center]
//         this.setState({ center: center })
//     }


//     componentDidUpdate = (prevProps) => prevProps !== this.props && this.setCenter()

//     displayMarkers = () => <Marker position={this.state.center} />

//     render() {

//         return (
//             <Map
//                 google={this.props.google}
//                 zoom={9}
//                 style={mapStyles}
//                 initialCenter={this.state.center}
//                 center={this.state.center}
//             >
//                 {this.displayMarkers()}
//             </Map>
//         );
//     }
// }
// export default GoogleApiWrapper({ apiKey: process.env.GOOGLE_API_KEY })(Events);