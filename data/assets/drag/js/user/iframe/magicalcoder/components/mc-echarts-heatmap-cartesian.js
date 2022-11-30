function McEChartsHeatmapCartesian(){
    //___mcUtils参考mc-utils.js
    // 笛卡尔坐标系上的热力图 Heatmap on Cartesian
    this.mcUtils = ___mcUtils;
    this.param = null;
    this.domClass = "mc-echarts-heatmap-cartesian";
}
/*务必带此render方法：否则组件不会被追踪渲染*/
McEChartsHeatmapCartesian.prototype.render = function(param){
    if(!this.mcUtils.ifEchartsContinueRenderInMagicalCoder(param,this.domClass)){
        return;
    }
    this.param = param;
    this.heatmap();
}
McEChartsHeatmapCartesian.prototype.heatmap = function () {
    var _t = this;
    var charsDoms = this.mcUtils.findNeedDealerElements(this.param,this.domClass);
    for(var i=0;i<charsDoms.length;i++){
        var echartsDom = charsDoms[i];
        var myEcharts = echarts.init(echartsDom);
        var _dataManager = this.mcUtils.attr(echartsDom,"mc-echarts-data-manager");
        var option = {
            tooltip: {
                position: 'top'
            },
            grid: {
                height: '50%',
                top: '10%'
            },
            xAxis: {
                type: 'category',
                data:  [],
                splitArea: {
                    show: true
                }
            },
            yAxis: {
                type: 'category',
                data: [],
                splitArea: {
                    show: true
                }
            },
            visualMap: {
                min: 0,
                max: 10,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '15%'
            },
            series: [{
                name: 'Punch Card',
                type: 'heatmap',
                data: [],
                label: {
                    show: true
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
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
                    _t.setOption(param.option,{myEcharts:param.myEcharts,xFieldName:param.dataManager.choose1.x,yFieldName:param.dataManager.choose1.y,zFieldName:param.dataManager.choose1.z},data)
                })
            }else if(dataType==2){
                this.mcUtils.ajax(window.iframeUi,{myEcharts:myEcharts,dataManager:dataManager,option:option},dataManager.choose2.sourceApi,function(param,data){
                    _t.setOption(param.option,{myEcharts:param.myEcharts,xFieldName:param.dataManager.choose2.x,yFieldName:param.dataManager.choose2.y,zFieldName:param.dataManager.choose2.z},data)
                })
            }else{
                var data = dataManager.choose3.data;
                
                // 数据格式处理
                var dataX = [];
                var dataY = [];
                var dataZ = [];
                if (data['x']) {
                    for(var i=0;i<data['x'].length;i++){
                        dataX.push(data['x'][i]['x']);
                    }
                }
                
                if(data['y']) {
                    for(var i=0;i<data['y'].length;i++){
                        dataY.push(data['y'][i]['y']);
                    }
                }
                if(data['z']) {
                    for(var i=0;i<data['z'].length;i++){
                        dataZ.push([Number(data['z'][i]['x']),Number(data['z'][i]['y']),Number(data['z'][i]['z'])]);
                    }
                }
                var data3 = [{x:dataX,y:dataY,z:dataZ}];
                _t.setOption(option,{myEcharts:myEcharts,xFieldName:"x",yFieldName:"y",zFieldName:"z"},{code:0,data:data3})
            }
        }
    }
}
McEChartsHeatmapCartesian.prototype.setOption = function(option,param,data){
    var xFieldName=param.xFieldName;
    var yFieldName=param.yFieldName;
    var zFieldName=param.zFieldName;
    
    if(data.code!=0){
        return;
    }
    // debugger;
    var dataList = data.data;
    if (dataList.length > 0) {
        option.xAxis.data = dataList[0][xFieldName];
        option.yAxis.data = dataList[0][yFieldName];
        option.series[0].data = dataList[0][zFieldName];
    }
    param.myEcharts.setOption(option);
    param.myEcharts.resize();
}
/*把组件安装一下*/
___mcUtils.install({component:new McEChartsHeatmapCartesian()})
