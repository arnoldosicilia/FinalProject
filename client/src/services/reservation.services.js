import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/reservation`,
            withCredentials: true,
        })

    }

    createNewReservation = reservation => {
        console.log('llamando al services')
        console.log(`${process.env.REACT_APP_URL}/reservation`)
        return this.service.post(`/new`, reservation).then(response => response.data)
    }


}