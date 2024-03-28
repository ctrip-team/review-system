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
        url: '/api/auth/register',
        method: 'POST',
        data
    })
}
export function getAllUsersAPI() {
    return request({
        url: '/api/auth/allusers',
        method: 'GET',
    })
}

export function deleteUserAPI(userId) {
    return request({
        url: '/api/auth/delete',
        method: 'POST',
        data: userId
    })
}

export function updateUserAPI(data) {
    return request({
        url: '/api/auth/update',
        method: 'POST',
        data
    })
}

export function changeSalaryAPI(data) {
    return request({
        url: '/api/auth/salary',
        method: 'POST',
        data
    })
}