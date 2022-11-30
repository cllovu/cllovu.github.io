function McEChartsBarStack(){
    // 堆叠条形图
    //___mcUtils参考mc-utils.js
    this.mcUtils = ___mcUtils;
    this.param = null;
    this.domClass = "mc-echarts-bar-stack";
}
/*务必带此render方法：否则组件不会被追踪渲染*/
McEChartsBarStack.prototype.render = function(param){
    if(!this.mcUtils.ifEchartsContinueRenderInMagicalCoder(param,this.domClass)){
        return;
    }
    this.param = param;
    this.barStack();
}
McEChartsBarStack.prototype.barStack = function () {
    var _t = this;
    var charsDoms = this.mcUtils.findNeedDealerElements(this.param,this.domClass);
    for(var i=0;i<charsDoms.length;i++){
        var echartsDom = charsDoms[i];
        var myEcharts = echarts.init(echartsDom);
        var _dataManager = this.mcUtils.attr(echartsDom,"mc-echarts-data-manager");
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // Use axis to trigger tooltip
                    type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
                }
            },
            legend: {
                data: ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [320, 302, 301, 334, 390, 330, 320]
                },
                {
                    name: 'Mail Ad',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Affiliate Ad',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Video Ad',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [150, 212, 201, 154, 190, 330, 410]
                },
                {
                    name: 'Search Engine',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [820, 832, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
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
McEChartsBarStack.prototype.setOption = function(option,param,data){
    var xFieldName=param.xFieldName;
    var yFieldName=param.yFieldName;
    if(data.code!=0){
        return;
    }
    var dataList = data.data;
    //拿到数据 我们转换一下 变成echarts的数据
    var xAxisData = [];//x数据
    var seriesData = [];//y数据
    for(var j=0;j<dataList.length;j++){
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
___mcUtils.install({component:new McEChartsBarStack()})
