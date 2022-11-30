function McEChartsFunnel(){
    //___mcUtils参考mc-utils.js
    this.mcUtils = ___mcUtils;
    this.param = null;
    this.domClass = "mc-echarts-funnel";
}
/*务必带此render方法：否则组件不会被追踪渲染*/
McEChartsFunnel.prototype.render = function(param){
    if(!this.mcUtils.ifEchartsContinueRenderInMagicalCoder(param,this.domClass)){
        return;
    }
    this.param = param;
    this.funnel();
}
McEChartsFunnel.prototype.funnel = function () {
    var _t = this;
    var charsDoms = this.mcUtils.findNeedDealerElements(this.param,this.domClass);
    for(var i=0;i<charsDoms.length;i++){
        var echartsDom = charsDoms[i];
        var myEcharts = echarts.init(echartsDom);
        var _dataManager = this.mcUtils.attr(echartsDom,"mc-echarts-data-manager");
        var option = {
               
            title: {
                text: '漏斗图',
                subtext: '纯属虚构'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            legend: {
                data: []
            },

            series: [
                {
                    name:'漏斗图',
                    type:'funnel',
                    left: '10%',
                    top: 60,
                    //x2: 80,
                    bottom: 60,
                    width: '80%',
                    // height: {totalHeight} - y - y2,
                    min: 0,
                    max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
                    gap: 2,
                    label: {
                        show: true,
                        position: 'inside'
                    },
                    labelLine: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            fontSize: 20
                        }
                    },
                    data: [
                        {value: 60, name: '访问'},
                        {value: 40, name: '咨询'},
                        {value: 20, name: '订单'},
                        {value: 80, name: '点击'},
                        {value: 100, name: '展现'}
                    ]
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
McEChartsFunnel.prototype.setOption = function(option,param,data){
    var xFieldName=param.xFieldName;
    var yFieldName=param.yFieldName;
    if(data.code!=0){
        return;
    }
    var dataList = data.data;
    //拿到数据 我们转换一下 变成echarts的数据
    var seriesData = [];//y数据
    var legendData = [];
    // debugger;
    for(var j=0;j<dataList.length;j++){
        var item = dataList[j];
        seriesData.push({value:item[yFieldName],name:item[xFieldName]});
        legendData.push(item[xFieldName]);
    }
    option.series[0].data = seriesData;
    option.legend.data = legendData;
    param.myEcharts.setOption(option);
    param.myEcharts.resize();
}
/*把组件安装一下*/
___mcUtils.install({component:new McEChartsFunnel()})
