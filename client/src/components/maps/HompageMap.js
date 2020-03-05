import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
const mapStyles = {
    width: "100%",
    height: "500px"
};


class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {

            center: { lat: 37.093798, lng: -3.399168 },

            locations: {
                'Baqueira': { lat: 42.699659, lng: 0.933011 },
                'Formigal': { lat: 42.775447, lng: -0.371188 },
                'Andorra': { lat: 42.543899, lng: 1.733701 },
                'Sierra Nevada': { lat: 37.093798, lng: -3.399168 }
            }

        };
    }



    setCenter = () => {
        let center = this.state.locations[this.props.center]
        this.setState({ center: center })
    }


    componentDidUpdate = (prevProps) => prevProps !== this.props && this.setCenter()

    displayMarkers = () => <Marker position={this.state.center} />

    render() {

        return (
            <Map
                google={this.props.google}
                zoom={9}
                style={mapStyles}
                initialCenter={this.state.center}
                center={this.state.center}
            >
                {this.displayMarkers()}
            </Map>
        );
    }
}
export default GoogleApiWrapper({ apiKey: process.env.GOOGLE_API_KEY })(Events);