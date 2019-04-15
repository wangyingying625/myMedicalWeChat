//app.js
App({
  onLaunch: function () {
    var that=this
    this.globalData = {
      userInfo: '',
      openid: wx.getStorageSync('openid'),
      date: '',
      msg: wx.getStorageSync('msg'),
    }
  }
})