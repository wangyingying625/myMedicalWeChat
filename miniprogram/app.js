//app.js
App({
  onLaunch: function () {
  
    var that=this
    this.globalData = {
      userInfo: '',
      openid: wx.getStorageSync('openid'),
      date: -1,
      myDevice: null,
      imgUrl: [],
      msg: wx.getStorageSync('msg'),
    }
    this.globalData.myDevice = wx.getSystemInfoSync()
    wx.getUserInfo({
      success: res => {
        that.globalData.userInfo = res.userInfo
      },
      fail: res => {
      }
    })
  }
})