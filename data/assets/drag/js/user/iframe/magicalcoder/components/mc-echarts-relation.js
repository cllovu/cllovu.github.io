function McEChartsRelation(){
    //___mcUtils参考mc-utils.js
    this.mcUtils = ___mcUtils;
    this.param = null;
    this.domClass = "mc-echarts-relation";
}
/*务必带此render方法：否则组件不会被追踪渲染*/
McEChartsRelation.prototype.render = function(param){
    if(!this.mcUtils.ifEchartsContinueRenderInMagicalCoder(param,this.domClass)){
        return;
    }
    this.param = param;
    this.relation();
}
McEChartsRelation.prototype.relation = function () {
    var _t = this;
    var charsDoms = this.mcUtils.findNeedDealerElements(this.param,this.domClass);
    for(var i=0;i<charsDoms.length;i++){
        var echartsDom = charsDoms[i];
        var myEcharts = echarts.init(echartsDom);
        var _dataManager = this.mcUtils.attr(echartsDom,"mc-echarts-data-manager");
        var option = {
            
            title: {
                text: '笛卡尔坐标系上的 Graph'
            },
            tooltip: {},
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '很长很长的周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    type: 'graph',
                    layout: 'none',
                    coordinateSystem: 'cartesian2d',
                    symbolSize: 40,
                    label: {
                        show: true
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    data: [807, 1362, 2111, 330, 3766, 2743, 1833],
                    links: [{"source": 0, "target": 1},
                            {"source": 1, "target": 2},
                            {"source": 2, "target": 3},
                            {"source": 3, "target": 4},
                            {"source": 4, "target": 5},
                            {"source": 5, "target": 6}],
                    lineStyle: {
                        color: '#2f4554'
                    }
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
McEChartsRelation.prototype.setOption = function(option,param,data){
    var xFieldName=param.xFieldName;
    var yFieldName=param.yFieldName;
    if(data.code!=0){
        return;
    }
    var dataList = data.data;
    //拿到数据 我们转换一下 变成echarts的数据
    var xAxisData = [];//y数据
    var seriesData = [];
    for(var j=0;j<dataList.length;j++){
        var item = dataList[j];
        xAxisData.push(item[xFieldName]);
        seriesData.push(item[yFieldName]);
    }

    var links = seriesData.map(function (item, i) {
        return {
            source: i,
            target: i + 1
        };
    });
    links.pop();

    //debugger;
    option.xAxis.data = xAxisData;
    option.series[0].data = seriesData;
    option.series[0].links = links;
    param.myEcharts.setOption(option);
    param.myEcharts.resize();
}
/*把组件安装一下*/
___mcUtils.install({component:new McEChartsRelation()})
