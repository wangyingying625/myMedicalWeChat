// miniprogram/pages/geRen/geRen.js
const app = getApp()
Page({
  data: {
    getUserInfoFail: false,
    ifBind: '',
    msg: '',
    userInfo: '',
  },
  onLoad: function() {
    this.setData({
      msg: app.globalData.msg,
    })
    var that = this;
    var openid = (wx.getStorageSync('openid'));
    // app.globalData.openid = (wx.getStorageSync('openid'))
    // app.globalData.msg = (wx.getStorageSync('msg'))
    if (!openid) {
      var that = this
      wx.login({
        success: function(response) {
          var code = response.code
          wx.request({
            url: 'https://test.taropowder.cn/api/login',
            data: {
              code: code,
            },
            success: function(res) {
              wx.setStorage({
                key: 'openid',
                data: res.data.openId,
              })
              app.globalData.openid = res.data.openId
              if (res.data.status == true) {
                that.setData({
                  ifBind: true,
                  msg: res.data.user
                })
                wx.setStorage({
                  key: 'msg',
                  data: res.data.user,
                })
                app.globalData.msg = res.data.user
                wx.getUserInfo({
                  success: res => {
                    this.setData({
                      userInfo: res.userInfo,
                    })
                    app.globalData.userInfo = res.userInfo
                  },
                  fail: res => {
                    that.setData({
                      getUserInfoFail: true,
                    })
                  }
                })
              } else if (res.data.status == false) {
                that.setData({
                  ifBind: false,
                  msg: ''
                })
                app.globalData.msg = ''
              }
            },
            //请求失败
            fail(res) {
              console.log(res)
            }
          })
        },
        fail: function(res) {
          console.log(res)
        }
      })
    }
     else 
     {
      if (app.globalData.msg) 
      {
        that.setData({
          ifBind: true
        })
      } 
      else 
      {
        wx.request({
          url: 'https://test.taropowder.cn/api/info',
          data: {
            openId: openid,
          },
          success: function(res) {
            that.setData({
              ifBind: true,
              msg: res.data,
            })
            wx.setStorage({
              key: 'msg',
              data: res.data,
            })
            app.globalData.msg = res.data
            wx.getUserInfo({
              success: res => {
                that.setData({
                  userInfo: res.userInfo,
                })
                app.globalData.userInfo = res.userInfo
              },
              fail: res => {
                that.setData({
                  getUserInfoFail: true,
                  userInfo: ''
                })
              }
            })
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */

  /*生命周期函数--监听页面初次渲染完成
   */
  createId: function() {
    wx.navigateTo({
      url: '../create/create',
    })
  },
  bindId: function() {
    wx.navigateTo({
      url: '../bind/bind',
    })
  },
  onReady: function() {
  },
  getUserInfoo: function(e) {
    app.globalData.openId = wx.getStorageSync('openId')
    var openId = wx.getStorageSync('openId')
    var that = this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        getUserInfoFail: false,
        hasUserInfo: true,
      })
      that.setUserInfo()
    } else {
      this.setData({
        getUserInfoFail: true,
        hasUserInfo: false,
      })
      this.openSetting();
    }

  },
  openSetting: function() {
    wx.showToast({

      title: '您还没有登录',

      icon: 'none',

      duration: 2000

    })

    setTimeout(function() {

      wx.hideToast()

    }, 2000)
    return;
  },
  chose: function() {
    wx.showActionSheet({
      itemList: ['智能上传'],
      success: function(res) {
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '../smart/smart',
          })
        } else if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '../temp/temp',
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  getUserInfoo: function(e) {
    var that = this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        getUserInfoFail: false,
      })
    } else {
      this.setData({
        getUserInfoFail: true,
      })
      this.openSetting();
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // doUpload: function() {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function(res) {

  //       wx.showLoading({
  //         title: '上传中',
  //       })
  //       const filePath = res.tempFilePaths[0]

  //       // 上传图片
  //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：', res)

  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath

  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })

  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // }

})