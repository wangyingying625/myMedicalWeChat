// miniprogram/pages/geRen/geRen.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    avatarUrl: '',
    getUserInfoFail: false,
    userName: '匿名'
  },
  setUserInfo: function () {
    var that = this
    wx.request({
      url: 'https://meng.taropowder.cn/wechat/api/get_username.php',
      data: {
        userName: app.globalData.userInfo.nickName,
        userImg: app.globalData.userInfo.avatarUrl,
        OpenId: app.globalData.openId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
      }
    })
  },
  onLoad: function () {
    wx.clearStorage()
    var that = this;
    var openId = (wx.getStorageSync('openId'));
    if (openId) {
      console.log("if")
      app.globalData.openId = wx.getStorageSync('openId')
      wx.getUserInfo({
        success: function (res) {
          const userInfo = res.userInfo
          that.setData({
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
            userName: userInfo.nickName
          })
          app.globalData.userInfo = userInfo;
          that.setUserInfo()
        },
        fail: function () {
          that.setData({
            getUserInfoFail: true,
            nickName: '',
            avatarUrl: ''
          })
        },
      })
    }
    //没有缓存openId的情况












    else {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log(res)
          console.log('[云函数] [login] user openid: ' + res.result.openid)
          app.globalData.openid = res.result.openid
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        }
      })
      //login的success结束
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */

  /*生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  openSetting: function () {
    wx.showToast({

      title: '您还没有登录',

      icon: 'none',

      duration: 1500

    })

    setTimeout(function () {

      wx.hideToast()

    }, 2000)
    return;





  },

  getUserInfoo: function (e) {
    app.globalData.openId = wx.getStorageSync('openId')
    var openId = wx.getStorageSync('openId')
    var that = this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userName: e.detail.userInfo.nickName,
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
  /**
   * 生命周期函数--监听页面显示
   */
  coll: function () {
    var that = this;
    if (app.globalData.openId == '' || app.globalData.userInfo == '') {
      wx.showToast({

        title: '您还没有登录',

        icon: 'none',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)
      return;
    } else {
      wx.navigateTo({
        url: '../coll/coll?id=' + that.data.id,
      })
    }
  },
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
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

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