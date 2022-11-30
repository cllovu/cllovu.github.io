function McEChartsBackgroundBar(){
    //___mcUtils参考mc-utils.js
    this.mcUtils = ___mcUtils;
    this.param = null;
    this.domClass = "mc-echarts-bar-waterfall";
}
/*务必带此render方法：否则组件不会被追踪渲染*/
McEChartsBackgroundBar.prototype.render = function(param){
    if(!this.mcUtils.ifEchartsContinueRenderInMagicalCoder(param,this.domClass)){
        return;
    }
    this.param = param;
    this.bar();
}
McEChartsBackgroundBar.prototype.bar = function () {
    var _t = this;
    var charsDoms = this.mcUtils.findNeedDealerElements(this.param,this.domClass);
    for(var i=0;i<charsDoms.length;i++){
        var echartsDom = charsDoms[i];
        var myEcharts = echarts.init(echartsDom);
        var _dataManager = this.mcUtils.attr(echartsDom,"mc-echarts-data-manager");
        var option = {
           
            // title: {
            //     text: '深圳月最低生活费组成（单位:元）',
            //     subtext: 'From ExcelHome',
            //     sublink: 'http://e.weibo.com/1341556070/AjQH99che'
            // },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: ""
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                splitLine: {show: false},
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '辅助',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    },
                    emphasis: {
                        itemStyle: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    data: []
                },
                {
                    name: '生活费',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'inside'
                    },
                    data: []
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


McEChartsBackgroundBar.prototype.setOption = function(option,param,data){
    var xFieldName=param.xFieldName;
    var yFieldName=param.yFieldName;
    if(data.code!=0){
        return;
    }
    var dataList = data.data;

    //拿到数据 我们转换一下 变成echarts的数据
    var xAxisData = [];//x数据
    var seriesData = [];//y数据
    var assistData = [0]; // 辅助数据
    if (dataList.length > 0) {
        for(var j=0;j<dataList.length;j++) {
            var item = dataList[j];
            xAxisData.push(item[xFieldName]);
            seriesData.push(Number(item[yFieldName]));
        }
        var all = eval(seriesData.join("+")); // 总计
        xAxisData.unshift('总计'); // 在数组头部添加元素
        
        let assistAll = 0;
    
        seriesData.forEach((elem, index) => {
            assistAll =assistAll+elem;
            assistData.push(all-assistAll);
        });
        seriesData.unshift(all);
        option.xAxis.data = xAxisData;
        option.series[0].data = assistData;
        option.series[1].data = seriesData;
        
        // 格式化函数提示
        option.tooltip.formatter = function (params) {
            var tar = params[1];
            return tar.name + ' : ' + tar.value;
        };
    }
    param.myEcharts.setOption(option);
    param.myEcharts.resize();
}
/*把组件安装一下*/
___mcUtils.install({component:new McEChartsBackgroundBar()})
