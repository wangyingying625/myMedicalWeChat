import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
Page({
  data: {
    date: '',
    isAdmin: '',
    display: '',
    used:'',
    indicatorDots: true,
    msgList: '',
  },
  agree: function(e) {
    var that = this
    wx.request({
      url: 'https://test.taropowder.cn/api/family/accept',
      data: {
        openId: app.globalData.openid,
        user_id: e.target.dataset.id
      },
      success: function(res) {
        that.onLoad()
      },
    })
  },
  no: function(e) {
    var that = this
    wx.request({
      url: 'https://test.taropowder.cn/api/family/no',
      data: {
        openId: app.globalData.openid,
        user_id: e.target.dataset.id
      },
      success: function(res) {
        that.onLoad()
      },
    })
  },
  onLoad: function() {
    var that = this
    if (!(wx.getStorageSync('openid'))) {
      wx.switchTab({
        url: '../geRen/geRen',
      })
    }
    if (app.globalData.msg.status == 'admin')
      this.setData({
        isAdmin: true
      })
    else
      this.setData({
        isAdmin: false
      })
    if (app.globalData.openid != '' && app.globalData.openid) {
      wx.request({
        url: 'https://test.taropowder.cn/api/days',
        data: {
          openId: app.globalData.openid
        },
        success: function(res) {
          if(res.data.status==true)
          {
          app.globalData.date = res.data.days
          that.setData({
            used: true,
            date: res.data.days,
          })
          }
          else{
            that.setData({
              used:false,
            })
            app.globalData.date =-1
          }
        },
      })
      wx.request({
        url: 'https://test.taropowder.cn/api/family/manage',
        data: {
          openId: app.globalData.openid
        },
        success: function(res) {
          if (res.data == '')
            that.setData({
              msgList: false
            })
            else
          that.setData({
            msgList: res.data
          })
        },
      })
    }
  },
  onReady() {},
  onShow(){
    this.onLoad()
  }
});