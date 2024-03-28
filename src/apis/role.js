import { request } from '../utils/request'

export function loginAPI(data) {
    return request({
        url: '/api/role/login',
        method: 'POST',
        data
    })
}

export function registerAPI(data) {
    return request({
        url: '/api/role/register',
        method: 'POST',
        data
    })
}

export function getRolesAPI(start, num) {
    return request({
        url: `/api/role/getRoles/${start}/${num}`,
        method: 'GET',
    })
}

export function deleteRoleAPI(username) {
    return request({
        url: '/api/role/delete',
        method: 'POST',
        data: { username }
    })
}

export function updateUserAPI(data) {
    return request({
        url: '/api/role/update',
        method: 'POST',
        data
    })
}
