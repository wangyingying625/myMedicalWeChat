// pages/storageConsole/storageConsole.js
const app = getApp()
Page({
  data: {
    fileID: '',
    tempList:'',
    cloudPath: '',
    showTemp:false,
    imagePath: '',
    dateChose: '',
    msg:''
  },
  bindDateChange(e) {
    var t = 'dateChose'
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      [t]: e.detail.value
    })
  },
  onLoad: function (options) {
    var that=this
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    this.setData({
      dateChose: year + '-' + month + '-' + day
    })

    wx.request({
      url: 'https://test.taropowder.cn/api/temp/list',
      data: {
        openId: app.globalData.openid,
      },
      success: function (res) {
        var a = true;
       that.setData({
         tempList:res.data
       })
      }
    })

    if(options.url)
    {
      console.log("show")
     that.showImg()
    }
  },
  onShow: function () {
    this.onLoad
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
          wx.navigateTo({
            url: '../audit/audit?content=' + res.data
          })
        }
      })
  },
  bindPickerChange: function (e) {
    var that = this;
    this.setData({
     index: e.detail.value,
     showTemp:true
    })

    wx.request({
      url: 'https://test.taropowder.cn/api/temp/info',
      data: {
        openId: app.globalData.openid,
        name: that.data.tempList[that.data.index]
      },
      success: function (res) {
       that.setData({
         msg:res.data
       })
       console.log(that.data.msg)
      }
    })
  },
  showImg: function (id,path) {
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
    var that = this
    wx.navigateTo({
      url: '../modifyPhoto/modify',
    })
    
  }
})



// wx.chooseImage({
//   count: 1,
//   sizeType: ['compressed'],
//   sourceType: ['album', 'camera'],
//   success: function (res) {
//     wx.showLoading({
//       title: '上传中',
//     })
//     const tempFilePaths = res.tempFilePaths
//     wx.uploadFile({
//       url: 'https://test.taropowder.cn/api/upload',
//       filePath: tempFilePaths[0],
//       name: 'image',
//       formData: {
//         openId: app.globalData.openid
//       },
//       success(res) {
//         res.data = JSON.parse(res.data)
//         app.globalData.fileID = res.data.id
//         app.globalData.imagePath = "https://test.taropowder.cn/storage/" + res.data.name
//       },
//       fail: e => {
//         console.error('[上传文件] 失败：', e)
//         wx.showToast({
//           icon: 'none',
//           title: '上传失败',
//         })
//       },
//       complete: () => {
//         wx.hideLoading()
//       }
//     })
//   }
// })