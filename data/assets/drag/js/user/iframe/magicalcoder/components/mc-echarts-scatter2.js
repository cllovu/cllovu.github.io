function McEChartsScatter () {
  //___mcUtils参考mc-utils.js
  this.mcUtils = ___mcUtils;
  this.param = null;
  this.domClass = "mc-echarts-scatter2";
}
/*务必带此render方法：否则组件不会被追踪渲染*/
McEChartsScatter.prototype.render = function (param) {
  if (!this.mcUtils.ifEchartsContinueRenderInMagicalCoder(param, this.domClass)) {
    return;
  }
  this.param = param;
  this.scatter();
}
McEChartsScatter.prototype.scatter = function () {
  var _t = this;
  var charsDoms = this.mcUtils.findNeedDealerElements(this.param, this.domClass);
  for (var i = 0; i < charsDoms.length; i++) {
    var echartsDom = charsDoms[i];
    var myEcharts = echarts.init(echartsDom);
    var _dataManager = this.mcUtils.attr(echartsDom, "mc-echarts-data-manager");
    echarts.registerTransform(ecStat.transform.regression);

    var option = {
      dataset: [{
        source: [
          [1, 4862.4],
          [2, 5294.7],
          [3, 5934.5],
          [4, 7171.0],
          [5, 8964.4],
          [6, 10202.2],
          [7, 11962.5],
          [8, 14928.3],
          [9, 16909.2],
          [10, 18547.9],
          [11, 21617.8],
          [12, 26638.1],
          [13, 34634.4],
          [14, 46759.4],
          [15, 58478.1],
          [16, 67884.6],
          [17, 74462.6],
          [18, 79395.7]
        ]
      }, {
        transform: {
          type: 'ecStat:regression',
          config: {
            method: 'exponential',
            // 'end' by default
            // formulaOn: 'start'
          }
        }
      }],
      title: {
        text: '',
        subtext: '',
        sublink: 'https://github.com/ecomfe/echarts-stat',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: {
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      series: [{
        name: 'scatter',
        type: 'scatter',
        datasetIndex: 0
      }, {
        name: 'line',
        type: 'line',
        smooth: true,
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: 'circle',
        label: { show: true, fontSize: 16 },
        labelLayout: { dx: -20 },
        encode: { label: 2, tooltip: 1 }
      }]
    };
    var dataManager = null;
    if (_dataManager) {
      dataManager = JSON.parse(_dataManager);
    }
    var render = false;
    if (dataManager) {
      var dataType = dataManager.dataType;
      if (dataType == 1) {
        render = dataManager.choose1.sourceApi && dataManager.choose1.x && dataManager.choose1.y;
        xFieldName = dataManager.choose1.x;
        yFieldName = dataManager.choose1.y;
      } else if (dataType == 2) {
        render = dataManager.choose2.sourceApi && dataManager.choose2.x && dataManager.choose2.y;
        xFieldName = dataManager.choose2.x;
        yFieldName = dataManager.choose2.y;
      } else if (dataType == 3) {
        render = true;
      }
    }
    if (render) {
      var dataType = dataManager.dataType;
      if (dataType == 1) {
        //这里是循环调用ajax所以栈顶不变，参数务必传ajax首位参数  window.iframeUi可以判断当前是否在布局器环境
        this.mcUtils.ajax(window.iframeUi, { myEcharts: myEcharts, dataManager: dataManager, option: option }, dataManager.choose1.sourceApi, function (param, data) {
          _t.setOption(param.option, { myEcharts: param.myEcharts, xFieldName: param.dataManager.choose1.x, yFieldName: param.dataManager.choose1.y }, data)
        })
      } else if (dataType == 2) {
        this.mcUtils.ajax(window.iframeUi, { myEcharts: myEcharts, dataManager: dataManager, option: option }, dataManager.choose2.sourceApi, function (param, data) {
          _t.setOption(param.option, { myEcharts: param.myEcharts, xFieldName: param.dataManager.choose2.x, yFieldName: param.dataManager.choose2.y }, data)
        })
      } else {
        var data = dataManager.choose3.data;
        _t.setOption(option, { myEcharts: myEcharts, xFieldName: "x", yFieldName: "y" }, { code: 0, data: data })
      }
    }
  }
}
McEChartsScatter.prototype.setOption = function (option, param, data) {
  var xFieldName = param.xFieldName;
  var yFieldName = param.yFieldName;
  if (data.code != 0) {
    return;
  }
  var dataList = data.data;
  //拿到数据 我们转换一下 变成echarts的数据
  var seriesData = [];//y数据
  for (var j = 0; j < dataList.length; j++) {
    var item = dataList[j];
    seriesData.push([item[xFieldName], item[yFieldName], item.z]);
  }
  option.dataset[0].source = seriesData;
  param.myEcharts.setOption(option);
  param.myEcharts.resize();
}
/*把组件安装一下*/
___mcUtils.install({ component: new McEChartsScatter() })
