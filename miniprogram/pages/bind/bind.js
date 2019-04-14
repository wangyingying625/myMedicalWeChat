// miniprogram/pages/bind/bind.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit:function(e){
    wx.request({
      url: 'https://test.taropowder.cn/api/binding',
      data: {
        name:e.detail.value.name,
        password: e.detail.value.password,
        openId: app.globalData.openid
      },
      success:function(res){
        if(res.data.status==true)
        {
          app.globalData.msg = res.data.user
          app.globalData.ifBind = true
          wx.switchTab({
            url: '../geRen/geRen',
          })
         
        }
        else
        {
          wx.showToast({
            title: '用户名或密码输入错误',
            icon: "none",
            duration: 2000
          })
          app.globalData.ifBind = false
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})