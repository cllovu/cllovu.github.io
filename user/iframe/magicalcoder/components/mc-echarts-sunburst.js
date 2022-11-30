function McEChartsSunburst(){
    //___mcUtils参考mc-utils.js
    this.mcUtils = ___mcUtils;
    this.param = null;
    this.domClass = "mc-echarts-sunburst";
}
/*务必带此render方法：否则组件不会被追踪渲染*/
McEChartsSunburst.prototype.render = function(param){
    if(!this.mcUtils.ifEchartsContinueRenderInMagicalCoder(param,this.domClass)){
        return;
    }
    this.param = param;
    this.sunburst();
}

McEChartsSunburst.prototype.sunburst = function () {
    var _t = this;
    var charsDoms = this.mcUtils.findNeedDealerElements(this.param,this.domClass);
    for(var i=0;i<charsDoms.length;i++){
        var echartsDom = charsDoms[i];
        var myEcharts = echarts.init(echartsDom);
        var _dataManager = this.mcUtils.attr(echartsDom,"mc-echarts-data-manager");
        var option = {
            series: {
                type: 'sunburst',
                // emphasis: {
                //     focus: 'ancestor'
                // },
                data: [],
                radius: [0, '90%'],
                label: {
                    rotate: 'radial'
                }
            }
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
                render = dataManager.choose1.sourceApi && dataManager.choose1.x && dataManager.choose1.y && dataManager.choose1.v;
                xFieldName=dataManager.choose1.x;
                yFieldName=dataManager.choose1.y;
                vFieldName=dataManager.choose1.v;
            }else if(dataType==2){
                render = dataManager.choose2.sourceApi && dataManager.choose2.x && dataManager.choose2.y && dataManager.choose2.v;
                xFieldName=dataManager.choose2.x;
                yFieldName=dataManager.choose2.y;
                vFieldName=dataManager.choose2.v;
            }else if(dataType==3){
                render = true;
            }
        }
        if(render){
            var dataType = dataManager.dataType;
            if(dataType==1){
                //这里是循环调用ajax所以栈顶不变，参数务必传ajax首位参数  window.iframeUi可以判断当前是否在布局器环境
                this.mcUtils.ajax(window.iframeUi,{myEcharts:myEcharts,dataManager:dataManager,option:option},dataManager.choose1.sourceApi,function(param,data){
                    _t.setOption(param.option,{myEcharts:param.myEcharts,xFieldName:param.dataManager.choose1.x,yFieldName:param.dataManager.choose1.y,vFieldName:param.dataManager.choose1.v},data)
                })
            }else if(dataType==2){
                this.mcUtils.ajax(window.iframeUi,{myEcharts:myEcharts,dataManager:dataManager,option:option},dataManager.choose2.sourceApi,function(param,data){
                    _t.setOption(param.option,{myEcharts:param.myEcharts,xFieldName:param.dataManager.choose2.x,yFieldName:param.dataManager.choose2.y,vFieldName:param.dataManager.choose2.v},data)
                })
            }else{
                var data = dataManager.choose3.data;
                _t.setOption(option,{myEcharts:myEcharts,xFieldName:"x",yFieldName:"y",vFieldName:"v"},{code:0,data:data})
            }
        }
    }
}

McEChartsSunburst.prototype.getTitle = function(echartsDom){
    var title = this.mcUtils.attr(echartsDom,"mc-echarts-title");
    if(title){
        return JSON.parse(title);
    }
    return null;
}
McEChartsSunburst.prototype.setOption = function(option,param,data){
    var xFieldName=param.xFieldName;
    var yFieldName=param.yFieldName;
    var vFieldName=param.vFieldName;
    if(data.code!=0){
        return;
    }
    var dataList = data.data;
    //拿到数据 我们转换一下 变成echarts的数据
    var seriesData = [];//y数据
    for(var j=0;j<dataList.length;j++){
        var item = dataList[j];
        seriesData.push({children:item[yFieldName],name:item[xFieldName],value:item[vFieldName]});
    }
        option.series.data = seriesData;
        param.myEcharts.setOption(option);
        param.myEcharts.resize();
}
/*把组件安装一下*/
___mcUtils.install({component:new McEChartsSunburst()})
