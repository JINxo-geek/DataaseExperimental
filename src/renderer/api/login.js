import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'http://rap2api.taobao.org/app/mock/15053/list2',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
