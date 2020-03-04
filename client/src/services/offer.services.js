import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/offer',
            withCredentials: true,
        })
    }

    getAllOffers = () => this.service.get('/getAllOffers').then(response => response.data)
    getOneOffer = id => this.service.get(`/getOneOffer/${id}`).then(response => response.data)
    getOfferByOwner = ownerId => this.service.get(`/owner/${ownerId}`).then(response => response.data)
    createNewOffer = offer => this.service.post(`/new`, offer).then(response => response.data)

}