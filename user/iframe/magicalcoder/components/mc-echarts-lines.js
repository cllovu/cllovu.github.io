function McEChartsLines() {
    //___mcUtils参考mc-utils.js
    this.mcUtils = ___mcUtils;
    this.param = null;
    this.domClass = "mc-echarts-lines";
}

/*务必带此render方法：否则组件不会被追踪渲染*/
McEChartsLines.prototype.render = function (param) {
    if (!this.mcUtils.ifEchartsContinueRenderInMagicalCoder(param, this.domClass)) {
        return;
    }
    this.param = param;
    this.lines();
}

McEChartsLines.prototype.lines = function () {
    var _t = this;
    var charsDoms = this.mcUtils.findNeedDealerElements(this.param, this.domClass);
    for (var i = 0; i < charsDoms.length; i++) {
        var echartsDom = charsDoms[i];
        var myEcharts = echarts.init(echartsDom);
        var _dataManager = this.mcUtils.attr(echartsDom, "mc-echarts-data-manager");
        var option = {
            bmap: {
                center: [120.13066322374, 30.240018034923],
                zoom: 14,
                roam: true,
                mapStyle: {
                    styleJson: [{
                        'featureType': 'water',
                        'elementType': 'all',
                        'stylers': {
                            'color': '#d1d1d1'
                        }
                    }, {
                        'featureType': 'land',
                        'elementType': 'all',
                        'stylers': {
                            'color': '#f3f3f3'
                        }
                    }, {
                        'featureType': 'railway',
                        'elementType': 'all',
                        'stylers': {
                            'visibility': 'off'
                        }
                    }, {
                        'featureType': 'highway',
                        'elementType': 'all',
                        'stylers': {
                            'color': '#fdfdfd'
                        }
                    }, {
                        'featureType': 'highway',
                        'elementType': 'labels',
                        'stylers': {
                            'visibility': 'off'
                        }
                    }, {
                        'featureType': 'arterial',
                        'elementType': 'geometry',
                        'stylers': {
                            'color': '#fefefe'
                        }
                    }, {
                        'featureType': 'arterial',
                        'elementType': 'geometry.fill',
                        'stylers': {
                            'color': '#fefefe'
                        }
                    }, {
                        'featureType': 'poi',
                        'elementType': 'all',
                        'stylers': {
                            'visibility': 'off'
                        }
                    }, {
                        'featureType': 'green',
                        'elementType': 'all',
                        'stylers': {
                            'visibility': 'off'
                        }
                    }, {
                        'featureType': 'subway',
                        'elementType': 'all',
                        'stylers': {
                            'visibility': 'off'
                        }
                    }, {
                        'featureType': 'manmade',
                        'elementType': 'all',
                        'stylers': {
                            'color': '#d1d1d1'
                        }
                    }, {
                        'featureType': 'local',
                        'elementType': 'all',
                        'stylers': {
                            'color': '#d1d1d1'
                        }
                    }, {
                        'featureType': 'arterial',
                        'elementType': 'labels',
                        'stylers': {
                            'visibility': 'off'
                        }
                    }, {
                        'featureType': 'boundary',
                        'elementType': 'all',
                        'stylers': {
                            'color': '#fefefe'
                        }
                    }, {
                        'featureType': 'building',
                        'elementType': 'all',
                        'stylers': {
                            'color': '#d1d1d1'
                        }
                    }, {
                        'featureType': 'label',
                        'elementType': 'labels.text.fill',
                        'stylers': {
                            'color': '#999999'
                        }
                    }]
                }
            },
            series: [{
                type: 'lines',
                coordinateSystem: 'bmap',
                data: [],
                polyline: true,
                lineStyle: {
                    color: 'purple',
                    opacity: 0.6,
                    width: 1
                }
            }]
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
                this.mcUtils.ajax(window.iframeUi, {
                    myEcharts: myEcharts,
                    dataManager: dataManager,
                    option: option
                }, dataManager.choose1.sourceApi, function (param, data) {
                    _t.setOption(param.option, {
                        myEcharts: param.myEcharts,
                        xFieldName: param.dataManager.choose1.x,
                        yFieldName: param.dataManager.choose1.y
                    }, data)
                })
            } else if (dataType == 2) {
                this.mcUtils.ajax(window.iframeUi, {
                    myEcharts: myEcharts,
                    dataManager: dataManager,
                    option: option
                }, dataManager.choose2.sourceApi, function (param, data) {
                    _t.setOption(param.option, {
                        myEcharts: param.myEcharts,
                        xFieldName: param.dataManager.choose2.x,
                        yFieldName: param.dataManager.choose2.y
                    }, data)
                })
            } else {
                var data = dataManager.choose3.data;
                _t.setOption(option, {myEcharts: myEcharts, xFieldName: "x", yFieldName: "y"}, {code: 0, data: data})
            }
        }
    }
}

McEChartsLines.prototype.getTitle = function (echartsDom) {
    var title = this.mcUtils.attr(echartsDom, "mc-echarts-title");
    if (title) {
        return JSON.parse(title);
    }
    return null;
}
McEChartsLines.prototype.setOption = function (option, param, data) {
    // var xFieldName=param.xFieldName;
    // var yFieldName=param.yFieldName;
    if (data.code != 0) {
        return;
    }
    // $.get('https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/hangzhou-tracks.json', function(data) {
    //     var dataList = data.map(function (track) {
    //         return {
    //             coords: track.map(function (seg, idx) {
    //                 return seg.coord;
    //             })
    //         };
    //     });

    // })
    var dataList = data.data;
    // //拿到数据 我们转换一下 变成echarts的数据
    dataList.map(function (track) {
        return {
            coords: track.map(function (seg, idx) {
                return seg.coord;
            })
        };
    });
    var seriesData = [];//y数据
    for(var j=0;j<dataList.length;j++){
        var item = dataList[j];
        seriesData.push({elevation:item[yFieldName],coord:item[xFieldName]});
    }
    option.series[0].data = dataList;
    param.myEcharts.setOption(option);
    param.myEcharts.resize();


}
/*把组件安装一下*/
___mcUtils.install({component: new McEChartsLines()})
