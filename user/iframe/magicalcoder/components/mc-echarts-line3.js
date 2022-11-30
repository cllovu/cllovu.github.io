function McEChartsLine () {
  //___mcUtils参考mc-utils.js
  this.mcUtils = ___mcUtils;
  this.param = null;
  this.domClass = "mc-echarts-line3";
}
/*务必带此render方法：否则组件不会被追踪渲染*/
McEChartsLine.prototype.render = function (param) {
  if (!this.mcUtils.ifEchartsContinueRenderInMagicalCoder(param, this.domClass)) {
    return;
  }
  this.param = param;
  this.line();
}

McEChartsLine.prototype.line = function () {
  var _t = this;
  var charsDoms = this.mcUtils.findNeedDealerElements(this.param, this.domClass);
  for (var i = 0; i < charsDoms.length; i++) {
    var echartsDom = charsDoms[i];
    var myEcharts = echarts.init(echartsDom);
    var _dataManager = this.mcUtils.attr(echartsDom, "mc-echarts-data-manager");
    var option = {
      xAxis: {
        type: 'category',
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '30%']
      },
      visualMap: {
        type: 'piecewise',
        show: false,
        dimension: 0,
        seriesIndex: 0,
        pieces: [{
          gt: 1,
          lt: 3,
          color: 'rgba(0, 0, 180, 0.4)'
        }, {
          gt: 5,
          lt: 7,
          color: 'rgba(0, 0, 180, 0.4)'
        }]
      },
      series: [
        {
          type: 'line',
          smooth: 0.6,
          symbol: 'none',
          lineStyle: {
            color: '#5470C6',
            width: 5
          },
          markLine: {
            symbol: ['none', 'none'],
            label: { show: false },
            data: [
              { xAxis: 1 },
              { xAxis: 3 },
              { xAxis: 5 },
              { xAxis: 7 }
            ]
          },
          areaStyle: {},
          data: [
            ['2019-10-10', 200],
            ['2019-10-11', 560],
            ['2019-10-12', 750],
            ['2019-10-13', 580],
            ['2019-10-14', 250],
            ['2019-10-15', 300],
            ['2019-10-16', 450],
            ['2019-10-17', 300],
            ['2019-10-18', 100]
          ]
        }
      ]
    };
    var title = _t.getTitle(echartsDom);
    if (title) {
      option.title = title;
    }
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

McEChartsLine.prototype.getTitle = function (echartsDom) {
  var title = this.mcUtils.attr(echartsDom, "mc-echarts-title");
  if (title) {
    return JSON.parse(title);
  }
  return null;
}
McEChartsLine.prototype.setOption = function (option, param, data) {
  var xFieldName = param.xFieldName;
  var yFieldName = param.yFieldName;
  if (data.code != 0) {
    return;
  }
  var dataList = data.data;
  //拿到数据 我们转换一下 变成echarts的数据
  var xAxisData = [];//x数据
  var seriesData = [];//y数据
  for (var j = 0; j < dataList.length; j++) {
    var item = dataList[j];
    xAxisData.push(item[xFieldName]);
    seriesData.push(item[yFieldName]);
  }
  option.xAxis.data = xAxisData;
  option.series[0].data = seriesData;
  param.myEcharts.setOption(option);
  param.myEcharts.resize();
}
/*把组件安装一下*/
___mcUtils.install({ component: new McEChartsLine() })
