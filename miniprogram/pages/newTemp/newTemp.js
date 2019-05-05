// miniprogram/pages/newTemp/newTemp.js
const app = getApp()
function item(id) {
  this.id=id;
}
function info(){
  this.item=[]
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    index:0
  },
  init: function () {
    let that = this;
    this.setData({
      info: new info(),
    });
  },
  formSubmit:function(e){
    var li = e.detail.value
    li.openId = app.globalData.openid
    wx.request({
      url: 'https://test.taropowder.cn/api/temp/create',
      data: li,
      success: function (res) {
        var a = true;
        wx.navigateTo({
          url: '../temp/temp',
        })
      }
    })
  },
  addItem: function (e) {
    let info = this.data.info;
    var st="temp"+this.data.index;
    this.setData({
      index:this.data.index++
    })
    var item1=new item()
    info.item.push(item1);
    this.setData({
      info: info
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.init();
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