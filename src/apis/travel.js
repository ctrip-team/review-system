import { request } from '../utils/request'

export function getTravelsAPI() {
    return request({
        url: `/api/travel/get`,
        method: 'GET',
    })
}

export function passTravelAPI(data) {
    return request({
        url: `/api/travel/pass`,
        method: 'POST',
        data: data
    })
}

export function rejectTravelAPI(data) {
    return request({
        url: `/api/travel/reject`,
        method: 'POST',
        data
    })
}

export function deleteTravelAPI(travel_id) {
    return request({
        url: `/api/travel/delete`,
        method: 'POST',
        data: { travel_id }
    })
}

export function getDeleteTravelsAPI() {
    return request({
        url: `/api/travel/getDelete`,
        method: 'GET',
    })
}

export function recoverTravelAPI(travel_id) {
    return request({
        url: `/api/travel/recover`,
        method: 'POST',
        data: { travel_id }
    })
}

export function getTravelInfoAPI(role_id) {
    return request({
        url: `/api/travel/getTravelInfoAPI`,
        method: 'POST',
        data: { role_id }
    })
}