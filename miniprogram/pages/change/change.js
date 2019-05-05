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
    isMale:true,
    items: [
      { name: '男', value: '男' },
      { name: '女', value: '女' },
    ]
  },
  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    var that = this;
  this.setData({
    msg:app.globalData.msg
  })
    if(this.data.msg.sex=="男")
    {

      that.setData({
        'items[0].checked':true
      })
     
    }
    if (this.data.msg.sex == "女") {

      that.setData({
        'items[1].checked': true
      })

    }
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
    var t ='msg.birthday'
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
  formSubmit:function(e){
    if(!e.detail.value.height)
      e.detail.height=''
    if (!e.detail.value.weight)
      e.detail.weight = ''
    console.log(e.detail.value)
    wx.request({
      url: 'https://test.taropowder.cn/api/change',
      data: {
        name: e.detail.value.name,
        sex: e.detail.value.sex,
        birthday: e.detail.value.birthday,
        height: e.detail.value.height,
        weight: e.detail.value.weight,
        openId: app.globalData.openid
      },
      success: function (res) {
        app.globalData.msg = res.data
        app.globalData.ifBind = true
        wx.switchTab({
          url: '../geRen/geRen',
        })

      }
    })
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