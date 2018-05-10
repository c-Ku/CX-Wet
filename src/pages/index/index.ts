//index.js
//获取应用实例
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res: any) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    }

    if (app.globalData.locationInfo) {
      this.setData({
        locationInfo: app.globalData.locationInfo,
        hasLocationInfo: true,
      })
    } else {
      app.locationInfoReadyCallback = (res: any) => {
        this.setData({
          locationInfo: res,
          hasUserInfo: true,
        })
      }
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
