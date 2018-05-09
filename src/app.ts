//app.js
import { amapLocation } from './utils/location'
import * as wxpp from './utils/wechat'

interface IUserInfo {
  encryptedData: string
  errMsg: string
  iv: string
  rawData: string
  signature: string
  userInfo: {
    avatarUrl: string
    city: string
    country: string
    gender: number
    language: string
    nickName: string
    province: string
  }
}

App({
  data: {
    name: 'test',
    version: '0.0.1',
  },
  onLaunch: function() {
    wxpp.getLocation('wgs84').then(({ longitude, latitude }) => {
      amapLocation(longitude, latitude).then(res => {
        this.globalData.locationInfo = res
        if (this.locationInfoReadyCallback) {
          this.locationInfoReadyCallback(res)
        }
      })
    })
    wxpp.login().then(res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
    })
    wxpp.getUserInfo().then((res: IUserInfo) => {
      this.globalData.userInfo = res.userInfo
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(res)
      }
    })
  },
  globalData: {
    userInfo: null,
    locationInfo: null,
  },
})
