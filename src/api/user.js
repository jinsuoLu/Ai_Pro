import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'

export async function login(data) {
  if (loginRSA) {
    data = await encryptedData(data)
  }
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

export function getUserInfo(accessToken) {
  return request({
    url: '/userInfo',
    method: 'post',
    data: {
      [tokenName]: accessToken,
    },
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}

export function listUsers() {
  return request({
    url: '/api/user/list',
    method: 'get',
  })
}

export function createUser(data) {
  return request({
    url: '/api/user/create',
    method: 'post',
    data,
  })
}

export function updateUser(id, data) {
  return request({
    url: `/api/user/${id}`,
    method: 'put',
    data,
  })
}

export function deleteUser(id) {
  return request({
    url: `/api/user/${id}`,
    method: 'delete',
  })
}

export function getUserProxies(id) {
  return request({
    url: `/api/user/${id}/proxies`,
    method: 'get',
  })
}

export function assignProxies(id, proxies) {
  return request({
    url: `/api/user/${id}/assign-proxies`,
    method: 'post',
    data: { proxies },
  })
}
