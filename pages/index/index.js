//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    medicinelist: [],
    windowHeight:[],
    windowWidth:[],
    openid:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad:async function () {
    var that = this
    that.setData({
      openid:wx.getStorageSync('openid')
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      },
    })
    //请求medicinelist
    wx.request({
      url: 'http://49.234.220.199/getdruglist.php',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        if (res.data == null) {
        } else {
          that.setData({
            medicinelist: res.data
          })
        }
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
})
