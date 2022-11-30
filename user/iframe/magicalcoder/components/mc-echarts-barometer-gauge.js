function McEChartsBarometerGauge(){
    //___mcUtils参考mc-utils.js
    this.mcUtils = ___mcUtils;
    this.param = null;
    this.domClass = "mc-echarts-barometer-gauge";
}
/*务必带此render方法：否则组件不会被追踪渲染*/
McEChartsBarometerGauge.prototype.render = function(param){
    if(!this.mcUtils.ifEchartsContinueRenderInMagicalCoder(param,this.domClass)){
        return;
    }
    this.param = param;
    this.barometerGauge();
}

McEChartsBarometerGauge.prototype.barometerGauge = function () {
    var _t = this;
    var charsDoms = this.mcUtils.findNeedDealerElements(this.param,this.domClass);
    for(var i=0;i<charsDoms.length;i++){
        var echartsDom = charsDoms[i];
        var myEcharts = echarts.init(echartsDom);
        var _dataManager = this.mcUtils.attr(echartsDom,"mc-echarts-data-manager");
        var option = {
            series: [{
                type: 'gauge',
                min: 0,
                max: 100,
                splitNumber: 10,
                radius: '80%',
                axisLine: {
                    lineStyle: {
                        color: [
                            [1, '#f00']
                        ],
                        width: 3
                    }
                },
                splitLine: {
                    distance: -18,
                    length: 18,
                    lineStyle: {
                        color: '#f00'
                    }
                },
                axisTick: {
                    distance: -12,
                    length: 10,
                    lineStyle: {
                        color: '#f00'
                    }
                },
                axisLabel: {
                    distance: -50,
                    color: '#f00',
                    fontSize: 25
                },
                anchor: {
                    show: true,
                    size: 20,
                    itemStyle: {
                        borderColor: '#000',
                        borderWidth: 2
                    }
                },
                pointer: {
                    offsetCenter: [0, '10%'],
                    icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
                    length: '115%',
                    itemStyle: {
                        color: '#000'
                    }
                },
                detail: {
                    valueAnimation: true,
                    precision: 1
                },
                title: {
                    offsetCenter: [0, '-50%']
                },
                data: []
            },
                {
                    type: 'gauge',
                    min: 0,
                    max: 60,
                    splitNumber: 6,
                    axisLine: {
                        lineStyle: {
                            color: [
                                [1, '#000']
                            ],
                            width: 3
                        }
                    },
                    splitLine: {
                        distance: -3,
                        length: 18,
                        lineStyle: {
                            color: '#000'
                        }
                    },
                    axisTick: {
                        distance: 0,
                        length: 10,
                        lineStyle: {
                            color: '#000'
                        }
                    },
                    axisLabel: {
                        distance: 10,
                        fontSize: 25,
                        color: '#000'
                    },
                    pointer: {
                        show: false
                    },
                    title: {
                        show: false
                    },
                    anchor: {
                        show: true,
                        size: 14,
                        itemStyle: {
                            color: '#000'
                        }
                    }

                }
            ]
        };
        var title = _t.getTitle(echartsDom);
        if(title){
            option.title = title;
        }
        var dataManager = null;
        if(_dataManager){
            dataManager = JSON.parse(_dataManager);
        }
        var render = false;
        if(dataManager){
            var dataType = dataManager.dataType;
            if(dataType==1){
                render = dataManager.choose1.sourceApi && dataManager.choose1.x && dataManager.choose1.y;
                xFieldName=dataManager.choose1.x;
                yFieldName=dataManager.choose1.y;
            }else if(dataType==2){
                render = dataManager.choose2.sourceApi && dataManager.choose2.x && dataManager.choose2.y;
                xFieldName=dataManager.choose2.x;
                yFieldName=dataManager.choose2.y;
            }else if(dataType==3){
                render = true;
            }
        }
        if(render){
            var dataType = dataManager.dataType;
            if(dataType==1){
                //这里是循环调用ajax所以栈顶不变，参数务必传ajax首位参数  window.iframeUi可以判断当前是否在布局器环境
                this.mcUtils.ajax(window.iframeUi,{myEcharts:myEcharts,dataManager:dataManager,option:option},dataManager.choose1.sourceApi,function(param,data){
                    _t.setOption(param.option,{myEcharts:param.myEcharts,xFieldName:param.dataManager.choose1.x,yFieldName:param.dataManager.choose1.y},data)
                })
            }else if(dataType==2){
                this.mcUtils.ajax(window.iframeUi,{myEcharts:myEcharts,dataManager:dataManager,option:option},dataManager.choose2.sourceApi,function(param,data){
                    _t.setOption(param.option,{myEcharts:param.myEcharts,xFieldName:param.dataManager.choose2.x,yFieldName:param.dataManager.choose2.y},data)
                })
            }else{
                var data = dataManager.choose3.data;
                _t.setOption(option,{myEcharts:myEcharts,xFieldName:"x",yFieldName:"y"},{code:0,data:data})
            }
        }
    }
}

McEChartsBarometerGauge.prototype.getTitle = function(echartsDom){
    var title = this.mcUtils.attr(echartsDom,"mc-echarts-title");
    if(title){
        return JSON.parse(title);
    }
    return null;
}
McEChartsBarometerGauge.prototype.setOption = function(option,param,data){
    var xFieldName=param.xFieldName;
    var yFieldName=param.yFieldName;
    if(data.code!=0){
        return;
    }
    var dataList = data.data;
    //拿到数据 我们转换一下 变成echarts的数据
    var seriesData = [];//y数据
    for(var j=0;j<dataList.length;j++){
        var item = dataList[j];
        seriesData.push({value:item[yFieldName],name:item[xFieldName]});
    }
    option.series[0].data = seriesData;
    param.myEcharts.setOption(option);
    param.myEcharts.resize();
}
/*把组件安装一下*/
___mcUtils.install({component:new McEChartsBarometerGauge()})
