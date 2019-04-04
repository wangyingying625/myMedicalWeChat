import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
  
    color: ["#6890ec"],
  
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: '甲状腺激素',
      type: 'line',
      smooth: true,
      data: [52,59,66]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    date: '',
    indicatorDots: true,
    msgList: [{ id:"1", msg: "mldwyy申请加入您的家庭" }, { id:"2", msg: "cldyy申请加入您的家庭" }],
    ec1: {
      onInit: initChart
    },
    ec2:{
      onInit: function (canvas, width, height) {
        console.log("init")
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        var list = [1, 2, 3];
        var option = {
          color: ["#6890ec"],
          grid: {
            containLabel: true
          },
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            // show: false
          },
          yAxis: {
            x: 'center',
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
            // show: false
          },
          series: [{
            name: 'name',
            type: 'line',
            smooth: true,
            data: list
          }]
        };

        chart.setOption(option);
        return chart;
      }
    }
  },
  onLoad: function () {
    this.setData({
      date: app.globalData.date
    })
  },
  onReady() {
  }
});
