import { request } from '../utils/request'

export function loginAPI(data) {
    return request({
        url: '/api/reviewer/login',
        method: 'POST',
        data
    })
}

export function registerAPI(data) {
    return request({
        url: '/api/reviewer/register',
        method: 'POST',
        data
    })
}
export function getAllUsersAPI() {
    return request({
        url: '/api/reviewer/allusers',
        method: 'GET',
    })
}

export function deleteUserAPI(userId) {
    return request({
        url: '/api/reviewer/delete',
        method: 'POST',
        data: userId
    })
}

export function updateUserAPI(data) {
    return request({
        url: '/api/reviewer/update',
        method: 'POST',
        data
    })
}
