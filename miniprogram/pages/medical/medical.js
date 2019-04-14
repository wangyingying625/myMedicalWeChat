import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
Page({
  onShareAppMessage: function(res) {
    return {
      title: '',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    date: '',
    list: '',
    list1: '',
    ec:'',
    index: 0,
    echartt:'',
  },
  showJson: function() {
    var that = this;
    var data = that.data.data1;
    console.log(data)
    console.log(that.data.list1[that.data.index])
    that.picture(that.data.list1[that.data.index]);
  },


  picture: function(key) {
    console.log("picture")
    var that = this;
    this.setData({
      ec:{
        onInit: function (canvas, width, height) {
          console.log("ec")
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(chart);
          console.log('canvas');
          var data = that.data.data1;
          var indictors = new Array();
          var indictorsMap = new Map();
          var timeArray = new Array();
          for (var image in data[key]) {
            console.log(data[key][image])
            timeArray.push(data[key][image]['created_at']);
            for (var indictor in data[key][image]['indicators']) {
              indictors.push(data[key][image]['indicators'][indictor]['name_ch']);
            }
          }
          indictors = new Set(indictors);
          for (var indictor of indictors) {
            for (var image in data[key]) {
              for (var indic in data[key][image]['indicators']) {
                if (data[key][image]['indicators'][indic]['name_ch'] == indictor) {
                  if (indictorsMap.has(indictor)) {
                    indictorsMap.get(indictor).push(data[key][image]['indicators'][indic]['value']);
                  } else {
                    indictorsMap.set(indictor, []);
                    indictorsMap.get(indictor).push(data[key][image]['indicators'][indic]['value']);
                  }
                }

              }
            }
          }
          var seriesObject = that.mapToObject(indictorsMap);
          console.log(timeArray)
          var option = null;
          option = {
            title: {
              text: key,
              left: 'center',
              top: -2,
            },
            tooltip: {
              show: true,
              trigger: 'axis'
            },
            //color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
            legend: {
              data: Array.from(indictors),
              type: 'scroll',
              top: 18,
              left: 'center',
              z: 100,
              //backgroundColor: '#ffffff',
            },
            grid: {
              containLabel: true
            },
            toolbox: {
              show: false,
              feature: {
                mark: {
                  show: true
                },
                dataView: {
                  show: true,
                  readOnly: false
                },
                magicType: {
                  show: true,
                  type: ['line', 'bar']
                },
                restore: {
                  show: true
                },
                saveAsImage: {
                  show: true
                }
              }
            },
            calculable: true,
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: timeArray
            },
           
            series: seriesObject,
            yAxis: {
              x: 'center',
              type: 'value',
              axisLabel: {
                formatter: '{value}'
              },
              splitLine: 
              {
                lineStyle: 
                {
                  type: 'dashed'
                }
              }
            },
          };

          chart.setOption(option);
          that.chart = chart
          // console.log(that.chart);
          return chart;
        },
      }
    });
   console.log(this.data.ec)
  },
  getchartOption:function(key){
    console.log(key)
    var that = this;
    var data = that.data.data1;
    var indictors = new Array();
    var indictorsMap = new Map();
    var timeArray = new Array();
    for (var image in data[key]) {
      console.log(data[key][image])
      timeArray.push(data[key][image]['created_at']);
      for (var indictor in data[key][image]['indicators']) {
        indictors.push(data[key][image]['indicators'][indictor]['name_ch']);
      }
    }
    indictors = new Set(indictors);
    for (var indictor of indictors) {
      for (var image in data[key]) {
        for (var indic in data[key][image]['indicators']) {
          if (data[key][image]['indicators'][indic]['name_ch'] == indictor) {
            if (indictorsMap.has(indictor)) {
              indictorsMap.get(indictor).push(data[key][image]['indicators'][indic]['value']);
            } else {
              indictorsMap.set(indictor, []);
              indictorsMap.get(indictor).push(data[key][image]['indicators'][indic]['value']);
            }
          }

        }
      }
    }
    var seriesObject = that.mapToObject(indictorsMap);
    console.log(timeArray)
    var option = null;
    option = {
      title: {
        text: key,
        left: 'center',
        top: -2,
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      //color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
      legend: {
        data: Array.from(indictors),
        type: 'scroll',
        top: 18,
        left: 'center',
        z: 100,
        //backgroundColor: '#ffffff',
      },
      grid: {
        containLabel: true
      },
      toolbox: {
        show: false,
        feature: {
          mark: {
            show: true
          },
          dataView: {
            show: true,
            readOnly: false
          },
          magicType: {
            show: true,
            type: ['line', 'bar']
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
       
      },
      calculable: true,
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: timeArray
      },

      series: seriesObject,
      yAxis: {
        x: 'center',
        type: 'value',
        axisLabel: {
          formatter: '{value}'
        },
        splitLine:
        {
          lineStyle:
          {
            type: 'dashed'
          }
        }
      },
    };
    return option;
  },
  bindPickerChange:function(e){
    var that=this;
    console.log("bindPicker")
       this.setData({
         index: e.detail.value
       })
      // console.log(char)
    that.chart.setOption(that.getchartOption(that.data.list1[that.data.index]))
  },
  mapToObject: function(indictors) {
    var series = new Array();
    for (var name of indictors) {
      series.push({
        name: name[0],
        type: 'line',
        data: name[1],
        smooth: true
      });
    }
    return series;
  },
  onLoad: function(options) {
    var that=this
    wx.request({
      url: 'https://test.taropowder.cn/api/show/user',
      data: {
        openId: app.globalData.openid
      },
      success: function (res) {
       that.setData({
         data1: res.data,
        //  list: Objqect.keys(res.data)
         list1: Object.keys(res.data),
        list:['jq']
       })
       console.log(that.data.list)
        that.showJson();
      }
    })
    this.setData({
      date: app.globalData.date,
    })
    // this.barComponent = this.selectComponent('#mychart-dom-bar');
    // this.init_bar(token);
  },
 
  onReady() {
  }
});