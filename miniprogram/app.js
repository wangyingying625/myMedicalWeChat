//app.js
App({
  onLaunch: function () {
  
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.globalData = {
      userInfo: '',
      openid: wx.getStorageSync('openid'),
      date: 1,
      msg: wx.getStorageSync('msg'),
      ifBind:''
    }
  }
})