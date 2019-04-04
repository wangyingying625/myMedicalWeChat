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
    list1: {
      "甲状腺激素": '21',
      "促甲状腺激素": '23',
      "促甲状腺激素释放激素": '22'
    },
    data1: {
      "病例": [
        {
          "id": 2,
          "user_id": 9,
          "name": "upload/JGJhIANJIyhTC9Gens8riIDrZexgUcDdlPYMQBGI.jpeg",
          "type": "病例",
          "created_at": "2019-04-02 10:58:49",
          "updated_at": "2019-04-02 10:58:54",
          "indicators": [
            {
              "id": 6,
              "name_en": "TSH",
              "name_ch": "促甲状腺激素",
              "unit": "uIU/m10.27-4.2",
              "upper_limit": null,
              "lower_limit": null,
              "value": 4.27,
              "image_id": 2,
              "important": 0,
              "created_at": "2019-04-02 10:59:28",
              "updated_at": "2019-04-02 10:59:28"
            },
            {
              "id": 7,
              "name_en": "FT3",
              "name_ch": "游离三碘甲状腺原氨酸",
              "unit": "p1/13.1--6.8",
              "upper_limit": null,
              "lower_limit": null,
              "value": 5.36,
              "image_id": 2,
              "important": 0,
              "created_at": "2019-04-02 10:59:28",
              "updated_at": "2019-04-02 10:59:28"
            },
            {
              "id": 8,
              "name_en": "FT4",
              "name_ch": "游离甲状腺荼",
              "unit": "pno1/11222",
              "upper_limit": null,
              "lower_limit": null,
              "value": 22,
              "image_id": 2,
              "important": 0,
              "created_at": "2019-04-02 10:59:28",
              "updated_at": "2019-04-02 10:59:28"
            },
            {
              "id": 9,
              "name_en": 'null',
              "name_ch": '我叫null',
              "unit": null,
              "upper_limit": 0,
              "lower_limit": 115,
              "value": 2939,
              "image_id": 2,
              "important": 0,
              "created_at": "2019-04-02 10:59:28",
              "updated_at": "2019-04-02 10:59:28"
            },
            {
              "id": 10,
              "name_en": "Ant",
              "name_ch": "甲状腺过氧化物酶抗体",
              "unit": null,
              "upper_limit": 0,
              "lower_limit": 34,
              "value": 436.6,
              "image_id": 2,
              "important": 0,
              "created_at": "2019-04-02 10:59:28",
              "updated_at": "2019-04-02 10:59:28"
            }
          ]
        },
        {
          "id": 8,
          "user_id": 9,
          "name": "upload/xDVUzS6xKSqWQDjCohlLIVwQoJLFMS8eq3EQvSTx.jpeg",
          "type": "病例",
          "created_at": "2019-04-03 01:46:11",
          "updated_at": "2019-04-03 01:46:13",
          "indicators": [
            {
              "id": 21,
              "name_en": "TSH",
              "name_ch": "促甲状腺激素",
              "unit": "uIU/m10.27-4.2",
              "upper_limit": null,
              "lower_limit": null,
              "value": 4.27,
              "image_id": 8,
              "important": 0,
              "created_at": "2019-04-03 01:47:11",
              "updated_at": "2019-04-03 01:47:11"
            },
            {
              "id": 22,
              "name_en": "FT3",
              "name_ch": "游离三碘甲状腺原氨酸",
              "unit": "p1/13.1--6.8",
              "upper_limit": null,
              "lower_limit": null,
              "value": 5.36,
              "image_id": 8,
              "important": 0,
              "created_at": "2019-04-03 01:47:11",
              "updated_at": "2019-04-03 01:47:11"
            },
            {
              "id": 23,
              "name_en": "FT4",
              "name_ch": "游离甲状腺荼",
              "unit": "pno1/11222",
              "upper_limit": null,
              "lower_limit": null,
              "value": 22,
              "image_id": 8,
              "important": 0,
              "created_at": "2019-04-03 01:47:11",
              "updated_at": "2019-04-03 01:47:11"
            },
            {
              "id": 24,
              "name_en": "F5",
              "name_ch": "甲状腺过氧化物酶",
              "unit": null,
              "upper_limit": 0,
              "lower_limit": 115,
              "value": 2939,
              "image_id": 8,
              "important": 0,
              "created_at": "2019-04-03 01:47:11",
              "updated_at": "2019-04-03 01:47:25"
            },
            {
              "id": 25,
              "name_en": "Ant",
              "name_ch": "甲状腺过氧化物酶抗体",
              "unit": null,
              "upper_limit": 0,
              "lower_limit": 34,
              "value": 436.6,
              "image_id": 8,
              "important": 0,
              "created_at": "2019-04-03 01:47:11",
              "updated_at": "2019-04-03 01:47:11"
            }
          ]
        }
      ],
    }
  },
  showJson: function() {
    var that = this;
    var data = that.data.data1;
    for (var key in data) {
      that.picture(key);
    }
  },
  picture: function(key) {
    var that = this;
    this.setData({
      ec: {
        onInit: function(canvas, width, height, num) {
          console.log("init")
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(chart);
          var data = that.data.data1;
          var indictors = new Array();
          var indictorsMap = new Map();
          var timeArray = new Array();
          for (var image in data[key]) {
            timeArray.push(data[key][image]['created_at']);
            for (var indictor in data[key][image]['indicators']) {
              indictors.push(data[key][image]['indicators'][indictor]['name_ch']);
            }
          }
          indictors = new Set(indictors);
          console.log(Array.from(indictors));
          for (var indictor of indictors) {
            for (var image in data[key]) {
              for (var indic in data[key][image]['indicators']) {
                if (data[key][image]['indicators'][indic]['name_ch'] == indictor) {
                  if (indictorsMap.has(indictor)) {
                    console.log(data[key][image]['indicators'][indic]);
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
          console.log(seriesObject);
          var option = null;
          option = {
            title: {
              text: key,
              left: 'center',
              top: -5,
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
          return chart;
        },
      }
    })
   // console.log(this.data)
  },
  mapToObject: function(indictors) {
    var series = new Array();
    for (var name of indictors) {
      console.log(name);
      series.push({
        name: name[0],
        type: 'line',
        data: name[1],
        smooth: true
      });
    }
    return series;
  },
  onLoad: function() {
    this.setData({
      date: app.globalData.date,
      list: Object.keys(this.data.data1)
    })
    this.showJson();
  },
  onReady() {}
});