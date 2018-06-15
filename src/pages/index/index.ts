//index.js
//获取应用实例
import { ILocations } from '../../utils/location'
import { getUserInfo } from '../../utils/util'
import * as wepp from '../../utils/wepp/wepp'

const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    locationInfo: {},
    hasLocationInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },

  helloWorld() {
    wx.navigateTo({
      url: '../demos/demos',
    })
  },

  onLoad() {
    const locationInfo = app.globalData.locationInfo
    if (locationInfo) {
      this.setData({ locationInfo })
    } else {
      app.setLocationInfo = (locationInfo: ILocations) =>
        this.setData({ locationInfo })
    }
  },

  onReady() {
    wepp.getUserInfo().then((res: any) => {
      if (res) {
        const userInfo = getUserInfo(res)
        this.setData({
          userInfo,
          hasUserInfo: true,
        })
      }
    })
  },
})
