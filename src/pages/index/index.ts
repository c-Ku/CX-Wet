//index.js
//获取应用实例
import { ILocations } from '../../utils/location'

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
  getUserInfo(req: any) {
    app.globalData.userInfo = req.detail.userInfo
    this.setData({
      userInfo: req.detail.userInfo,
      hasUserInfo: true,
    })
  },
})
