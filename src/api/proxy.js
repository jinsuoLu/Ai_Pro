import { backendServerUrl } from '@/config/net.config'
import request from '@/utils/request'

export async function uploadImage(imageBase64) {
  return request({
    url: '/api/image/upload',
    method: 'post',
    data: { imageBase64 }
  })
}

export async function createProxy(data) {
  return request({
    url: '/api/proxy/create',
    method: 'post',
    data
  })
}

export async function listProxies() {
  return request({
    url: '/api/proxy/list',
    method: 'get'
  })
}

export async function extendProxy(token, additionalMinutes) {
  return request({
    url: '/api/proxy/extend',
    method: 'post',
    data: { token, additionalMinutes }
  })
}

export async function deleteProxy(token) {
  return request({
    url: '/api/proxy/' + token,
    method: 'delete'
  })
}

export async function refreshCaptcha(token) {
  return request({
    url: '/api/proxy/refresh-captcha',
    method: 'post',
    data: { token }
  })
}

export function getProxyUrl(token) {
  return `${backendServerUrl}/proxy/${token}`
}

export async function batchCreateProxy(items, imageId = '') {
  return request({
    url: '/api/proxy/batch-create',
    method: 'post',
    data: { items, imageId }
  })
}
