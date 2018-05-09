import { Promise } from 'es6-promise'

const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({ success: resolve, fail: reject })
  })
}

const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({ success: resolve, fail: reject })
  })
}

const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({ success: resolve, fail: reject })
  })
}

const setStorage = (key, value) => {
  return new Promise((resolve, reject) => {
    wx.setStorage({ key: key, data: value, success: resolve, fail: reject })
  })
}

const getStorage = key => {
  return new Promise((resolve, reject) => {
    wx.getStorage({ key: key, success: resolve, fail: reject })
  })
}

const getLocation = type => {
  return new Promise((resolve, reject) => {
    wx.getLocation({ type, success: resolve, fail: reject })
  })
}

const request = (api: string, path: string, params: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const data = {}
    Object.keys(params).forEach(key => {
      data[key] = params[key]
    })
    wx.request({
      url: `${api}/${path}`,
      data: data,
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject,
    })
  })
}

export {
  login,
  getUserInfo,
  getSetting,
  setStorage,
  getStorage,
  getLocation,
  request,
}
