// miniprogram/pages/change/change.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    nickName:'',
    msg:'',
    isMale:true
  },
  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    var that = this;
    //console.log(options)
    this.setData({
      msg:JSON.parse(options.msg)
    })
    if(this.data.msg.gender=="女")
    {
      that.setData({
        isMale:false
      })
    }
    console.log(this.data.msg)
    that.setData({
      nickName: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl, 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindDateChange(e) {
    var t='msg.bir'
   // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      [t]: e.detail.value
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