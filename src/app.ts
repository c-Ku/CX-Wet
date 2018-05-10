import { amapLocation } from './utils/location'
import * as wxpp from './utils/wepp/wepp'

App({
  data: {
    name: 'test',
    version: '0.0.1',
  },
  onLaunch() {
    wxpp.getLocation('wgs84').then(({ longitude, latitude }: any) => {
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
    wxpp.getUserInfo().then((res) => {
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
