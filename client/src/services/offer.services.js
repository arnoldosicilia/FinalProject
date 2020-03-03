import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/offer',
            withCredentials: true,
        })
    }

    getAllOffers = () => this.service.post('/getAllOffers').then(response => response.data)
    getOneOffer = id => this.service.post(`/getOneOffer/${id}`).then(response => response.data)
    createNewOffer = offer => this.service.post(`/new`, offer).then(response => response.data)

}