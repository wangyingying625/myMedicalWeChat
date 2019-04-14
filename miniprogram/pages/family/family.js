// miniprogram/pages/family/family.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
List:'',
    isAdmin: '',
haveFam:'',
createDis:'none',
    addDis: 'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(app.globalData.msg)
    if (app.globalData.msg.status == 'admin')
      this.setData({
        isAdmin: true
      })
    else
      this.setData({
        isAdmin: false
      })
    if (app.globalData.msg.family_id)
    {
    this.setData({
      haveFam:true
    })
      wx.request({
        url: 'https://test.taropowder.cn/api/family/info',
        data: {
          family_id: app.globalData.msg.family_id,
          openId: app.globalData.openid
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            List: res.data
          })
        }
      })
    }
    else
      this.setData({
        haveFam: false
      })
  },
  dissolve:function(){
    var that=this
        wx.request({
          url: 'https://test.taropowder.cn/api/family/dissolve',
          data: {
            openId: app.globalData.openid,
          },
          success: function (res) {
            if(res.data.status==true)
            {
              wx.request({
                url: 'https://test.taropowder.cn/api/info',
                data: {
                  openId: app.globalData.openid
                },
                success: function (res) {
                  app.globalData.msg = res.data
                  wx.setStorage({
                    key: 'msg',
                    data: res.data,
                  })
                  that.setData({
                    msg: res.data,
                    haveFam: false
                  })
                  that.onLoad()
                }
              })
            }
          }
        })
  },
  create:function(){
    if(this.data.createDis=='none')
    this.setData({
      createDis:'block',
      addDis: 'none',
    })
    else if (this.data.createDis == 'block')
      this.setData({
        createDis: 'none',
        addDis: 'none',
      })
  },
  createF:function(e){
    var that=this
    wx.request({
      url: 'https://test.taropowder.cn/api/family/create',
      data: {
        name: e.detail.value.name,
        openId: app.globalData.openid
      },
      success: function (res) {
        that.setData({
          haveFam:true
        })
        wx.request({
          url: 'https://test.taropowder.cn/api/info',
          data: {
            openId: app.globalData.openid
          },
          success: function (res) {
            app.globalData.msg=res.data
            wx.setStorage({
              key: 'msg',
              data: res.data,
            })
            that.setData({
              msg:res.data
            })
            that.onLoad()
          }
        })
      }
    })
  },
  addF:function(e){
    var that = this
    wx.request({
      url: 'https://test.taropowder.cn/api/family/apply',
      data: {
        family_name: e.detail.value.id,
        openId: app.globalData.openid
      },
      success: function (res) {
        wx.showToast({
          title: '您的申请已发送',
          duration: 2000
        })
      }
    })
  },
  add:function(){
    if (this.data.addDis == 'none')
      this.setData({
        addDis: 'block',
        createDis: 'none'
      })
    else if (this.data.addDis == 'block')
      this.setData({
        addDis: 'none',
        createDis: 'none'
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