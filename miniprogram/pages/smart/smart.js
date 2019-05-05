// pages/storageConsole/storageConsole.js

const app = getApp()

Page({

  data: {
    fileID: '',
    cloudPath: '',
    imagePath: '',
    dateChose:''
  },
  bindDateChange(e) {
    var t = 'dateChose'
    this.setData({
      [t]: e.detail.value
    })
  },
  onLoad: function (options) {
    var now = new Date(); 
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate(); 
    this.setData({
      dateChose:year+'-'+month+'-'+day
    })
  },
  formSubmit: function (e) {
    wx.showLoading({
      title: '识别中',
    })
    if (e.detail.value.type == '')
      wx.showToast({
        title: '请输入化验名称',
        icon: "none",
        duration: 2000
      })
    else
      wx.request({
        url: 'https://test.taropowder.cn/api/ocr',
        data: {
          type: e.detail.value.type,
          openId: app.globalData.openid,
          image_id: this.data.fileID,
          date: e.detail.value.date
        },
        success: function (res) {
          if(res.data.status==true)
          {
          wx.navigateTo({
            url: '../audit/audit?content=' + JSON.stringify(res.data.indicators)
          })
          }
          else
          {
            wx.showToast({
              title: '图片识别失败',
              icon: "none",
              duration: 2000
            })
          }
        }
      })
  },
  showImg:function(){
    const {
      fileID,
      imagePath,
    } = app.globalData

    this.setData({
      fileID,
      imagePath,
    })
  },
  doUpload: function () {
    var that=this
    // 选择图片
    wx.chooseImage({
        count: 1,
          sizeType: ['original'],
            sourceType: ['album', 'camera'],
              success: function(res) {
                wx.showLoading({
                  title: '上传中',
                })
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://test.taropowder.cn/api/upload',
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            openId: app.globalData.openid
          },
          success(res) {
            res.data=JSON.parse(res.data)
            app.globalData.fileID = res.data.id
            app.globalData.imagePath = "https://test.taropowder.cn/storage/" + res.data.name
            that.showImg()
          },
          fail(res) {
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      }
    })
  }
})