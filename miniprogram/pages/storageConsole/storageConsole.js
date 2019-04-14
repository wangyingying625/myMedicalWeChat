// pages/storageConsole/storageConsole.js

const app = getApp()

Page({

  data: {
    fileID: '',
    cloudPath: '',
    imagePath: '',
  },
  formSubmit:function(e){
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration: 2000
    })
    if (e.detail.value.type=='')return false;
    else
    wx.navigateTo({
      url: '../audit/audit?type=' + e.detail.value.type
    })
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  onLoad: function (options) {

    const {
      fileID,
      cloudPath,
      imagePath,
    } = app.globalData

    this.setData({
      fileID,
      cloudPath,
      imagePath,
    })

    console.group('文件存储文档')
    console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/storage.html')
    console.groupEnd()
  },

})