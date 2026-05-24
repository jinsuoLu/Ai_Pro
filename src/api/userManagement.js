import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/api/user/list',
    method: 'get',
    params: data,
  })
}

export function doEdit(data) {
  const { id, ...rest } = data
  if (id) {
    return request({
      url: `/api/user/${id}`,
      method: 'put',
      data: rest,
    })
  } else {
    return request({
      url: '/api/user/create',
      method: 'post',
      data,
    })
  }
}

export function doDelete(data) {
  return request({
    url: `/api/user/${data.id}`,
    method: 'delete',
  })
}
