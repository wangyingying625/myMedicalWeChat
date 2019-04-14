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
    console.log(this.data.msg)
    console.log(wx.getStorageSync('msg'));
    var that = this;
    var openid = (wx.getStorageSync('openid'));
    app.globalData.openid = (wx.getStorageSync('openid'))
    app.globalData.msg = (wx.getStorageSync('msg'))
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
          console.log("login fail")
          console.log(res)
        }
      })
    } else {
      wx.request({
        url: 'https://test.taropowder.cn/api/info',
        data: {
          openId: openid,
        },
        success: function(res) {
          console.log(res.data)
          that.setData({
            ifBind: true,
            msg: res.data,
          })
          wx.setStorage({
            key: 'msg',
            data: res.data,
          })
          app.globalData.openid = res.data.openId
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
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
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
                userInfo: ''
              })
            }
          })
        }
      }
    })

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
    this.setData({
      msg: app.globalData.msg,
      ifBind: app.globalData.ifBind
    })
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

      duration: 1500

    })

    setTimeout(function() {

      wx.hideToast()

    }, 2000)
    return;
  },
  chose: function() {
    wx.showActionSheet({
      itemList: ['智能上传', '模板上传'],
      success: function(res) {
        console.log(JSON.stringify(res))
        console.log(res.tapIndex)
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
    console.log("getUSerInfoooooooo")
    console.log(e.detail.userInfo)
    var that = this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        getUserInfoFail: false,
        hasUserInfo: true,
      })
      wx.login({

        success: function(response) {
          console.log("login succ")
          var code = response.code
          console.log(response)
          wx.getUserInfo({
            success: function(resp) {
              console.log("getUserInfo succ")
              wx.request({
                url: 'https://test.taropowder.cn/api/login',
                data: {
                  code: code,
                  iv: resp.iv,
                  encryptedData: resp.encryptedData
                },
                success: function(res) {
                  console.log("request suc")
                  console.log(res.data)
                },
                fail(res) {
                  console.log(res)
                }
              })
            },
            fail() {
              that.setData({
                getUserInfoFail: true
              })
            }
          })
        },
        fail: function() {
          console.log("login fail")
        }
      })
    } else {
      this.setData({
        getUserInfoFail: true,
        hasUserInfo: false,
      })
      this.openSetting();
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  coll: function() {
    var that = this;
    if (app.globalData.openId == '' || app.globalData.userInfo == '') {
      wx.showToast({

        title: '您还没有登录',

        icon: 'none',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)
      return;
    } else {
      wx.navigateTo({
        url: '../coll/coll?id=' + that.data.id,
      })
    }
  },
  onShow: function() {
    var that=this
    this.setData({
      msg: app.globalData.msg,
      ifBind: app.globalData.ifBind
    })
    if(!this.data.userInfo)
    {
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
  doUpload: function() {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  }

})