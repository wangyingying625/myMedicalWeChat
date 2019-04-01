// miniprogram/pages/family/family.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
//List:[{"id":'1',"email":'123',"name":'mmldwyy'}],
List:'',
display:'block',
display1:'none',
haveFam:true,
createDis:'none',
    addDis: 'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
if(this.data.List=='')
{
  this.setData({
    display:'none',
    display1: 'block'
  })
}
  },
  create:function(){
    if(this.data.createDis=='none')
    this.setData({
      createDis:'block'
    })
    else if (this.data.createDis == 'block')
      this.setData({
        createDis: 'none'
      })
  },
  add:function(){
    if (this.data.addDis == 'none')
      this.setData({
        addDis: 'block'
      })
    else if (this.data.addDis == 'block')
      this.setData({
        addDis: 'none'
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