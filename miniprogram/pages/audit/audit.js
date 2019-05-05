// miniprogram/pages/audit/audit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIndex: 0,
    list: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var content=JSON.parse(options.content)
this.setData({
  list: content,
  showIndex: content[0].id,
})
   
  },
  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  formSubmit:function(e){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://test.taropowder.cn/api/save',
      data: e.detail.value,
      success: function (res) {
        var a=true;
          wx.switchTab({
            url: '../medical/medical?change='+a,
          })
      }
    })
   
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