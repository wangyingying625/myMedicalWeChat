import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
Page({
      data: {
        date: '',
        isAdmin: '',
        display:'',
        pushMsg: [{
            id: 0,
            name: "甲状腺激素",
            description: "甲状腺激素：主要作用是促进动物的生长发育、新陈代谢，以及提高动物的兴奋性。要保证甲状腺激素含量正常需要充足的睡眠与放松的心情，避免太大的精神压力。否则会出现便次增多、体重减少等症状"
          },
          {
            id: 1,
            name: "血红蛋白",
            description: "血红蛋白：主要功能是运输氧气。"
          }
        ],

        indicatorDots: true,
        msgList: [{
          id: "1",
          msg: "mldwyy申请加入您的家庭"
        }, {
          id: "2",
          msg: "cldyy申请加入您的家庭"
        }],
      },
        onLoad: function() {
          console.log(app.globalData)
          if ((wx.getStorageSync('openid')))
          {
            app.globalData.ifBind=true
          }

          else

          {
            wx.switchTab({
              url: '../geRen/geRen',
            })
          }
          if(app.globalData.msg.status=='admin')
          this.setData({
            isAdmin:true
          })
          else
            this.setData({
              isAdmin: false
            })
          this.setData({
            date: app.globalData.date,
          })
        },
        onReady() {}
      });