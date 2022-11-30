function McEChartsThemeRiver(){
    //___mcUtils参考mc-utils.js
    this.mcUtils = ___mcUtils;
    this.param = null;
    this.domClass = "mc-echarts-themeriver";
}
/*务必带此render方法：否则组件不会被追踪渲染*/
McEChartsThemeRiver.prototype.render = function(param){
    if(!this.mcUtils.ifEchartsContinueRenderInMagicalCoder(param,this.domClass)){
        return;
    }
    this.param = param;
    this.themeriver();
}

McEChartsThemeRiver.prototype.themeriver = function () {
    var _t = this;
    var charsDoms = this.mcUtils.findNeedDealerElements(this.param,this.domClass);
    for(var i=0;i<charsDoms.length;i++){
        var echartsDom = charsDoms[i];
        var myEcharts = echarts.init(echartsDom);
        var _dataManager = this.mcUtils.attr(echartsDom,"mc-echarts-data-manager");
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: 'rgba(0,0,0,0.2)',
                        width: 1,
                        type: 'solid'
                    }
                }
            },

            legend: {
                data: ['DQ', 'TY', 'SS', 'QG', 'SY', 'DD']
            },

            singleAxis: {
                top: 50,
                bottom: 50,
                axisTick: {},
                axisLabel: {},
                type: 'time',
                axisPointer: {
                    animation: true,
                    label: {
                        show: true
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        opacity: 0.2
                    }
                }
            },

            series: [
                {
                    type: 'themeRiver',
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 20,
                            shadowColor: 'rgba(0, 0, 0, 0.8)'
                        }
                    },
                    data: []
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
                render = dataManager.choose1.sourceApi && dataManager.choose1.x && dataManager.choose1.y && dataManager.choose1.t;
                xFieldName=dataManager.choose1.x;
                yFieldName=dataManager.choose1.y;
                tFieldName=dataManager.choose1.t;
            }else if(dataType==2){
                render = dataManager.choose2.sourceApi && dataManager.choose2.x && dataManager.choose2.y && dataManager.choose2.t;
                xFieldName=dataManager.choose2.x;
                yFieldName=dataManager.choose2.y;
                tFieldName=dataManager.choose2.t;
            }else if(dataType==3){
                render = true;
            }
        }
        if(render){
            var dataType = dataManager.dataType;
            if(dataType==1){
                //这里是循环调用ajax所以栈顶不变，参数务必传ajax首位参数  window.iframeUi可以判断当前是否在布局器环境
                this.mcUtils.ajax(window.iframeUi,{myEcharts:myEcharts,dataManager:dataManager,option:option},dataManager.choose1.sourceApi,function(param,data){
                    _t.setOption(param.option,{myEcharts:param.myEcharts,xFieldName:param.dataManager.choose1.x,yFieldName:param.dataManager.choose1.y,tFieldName:param.dataManager.choose1.t},data)
                })
            }else if(dataType==2){
                this.mcUtils.ajax(window.iframeUi,{myEcharts:myEcharts,dataManager:dataManager,option:option},dataManager.choose2.sourceApi,function(param,data){
                    _t.setOption(param.option,{myEcharts:param.myEcharts,xFieldName:param.dataManager.choose2.x,yFieldName:param.dataManager.choose2.y,tFieldName:param.dataManager.choose2.t},data)
                })
            }else{
                var data = dataManager.choose3.data;
                _t.setOption(option,{myEcharts:myEcharts,xFieldName:"x",yFieldName:"y",tFieldName: "t"},{code:0,data:data})
            }
        }
    }
}

McEChartsThemeRiver.prototype.getTitle = function(echartsDom){
    var title = this.mcUtils.attr(echartsDom,"mc-echarts-title");
    if(title){
        return JSON.parse(title);
    }
    return null;
}
McEChartsThemeRiver.prototype.setOption = function(option,param,data){
    var xFieldName=param.xFieldName;
    var yFieldName=param.yFieldName;
    var tFieldName=param.tFieldName;
    if(data.code!=0){
        return;
    }
    var dataList = data.data;
    //拿到数据 我们转换一下 变成echarts的数据
    var seriesData = [];//y数据
    for(var j=0;j<dataList.length;j++){
        var item = dataList[j];
        seriesData.push([item[xFieldName],item[yFieldName],item[tFieldName]]);
    }
    option.series[0].data = seriesData;
    param.myEcharts.setOption(option);
    param.myEcharts.resize();
}
/*把组件安装一下*/
___mcUtils.install({component:new McEChartsThemeRiver()})
