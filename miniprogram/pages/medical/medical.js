import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '甲功',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['甲状腺激素', '促甲状腺激素', '促甲状腺激素释放激素'],
      top: 50,
      left: 'center',
      backgroundColor: 'red',
      z: 100
    },
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
      data: ['2018-03-31', '2019-04-01', '2019-04-03', '2019-04-04', '2019-04-05'],
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
      data: [18, 36, 65, 30, 78]
    }, {
      name: '促甲状腺激素',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70]
    }, {
      name: '促甲状腺激素释放激素',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40]
    }]
  };

  chart.setOption(option);
  return chart;
}

function initChart1(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '血常规',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['血红蛋白', '白细胞', '红细胞'],
      top: 50,
      left: 'center',
      backgroundColor: 'red',
      z: 100
    },
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
      data: ['2018.03.21', '2019.04.01', '2019.04.03', '2019.04.04', '2019.04.05'],
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
      name: '血红蛋白',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78]
    }, {
        name: '白细胞',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70]
    }, {
      name: '红细胞',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: '',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    },
    ec1: {
      onInit: initChart1
    }
  },

  onReady() {
  }
});
