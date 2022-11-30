function McEChartsHKMap(){
    //___mcUtils参考mc-utils.js
    this.mcUtils = ___mcUtils;
    this.param = null;
    this.domClass = "mc-echarts-hkmap";
}
/*务必带此render方法：否则组件不会被追踪渲染*/
McEChartsHKMap.prototype.render = function(param){
    if(!this.mcUtils.ifEchartsContinueRenderInMagicalCoder(param,this.domClass)){
        return;
    }
    this.param = param;
    this.hkmap();
}
McEChartsHKMap.prototype.hkmap = function () {
    var _t = this;
    var charsDoms = this.mcUtils.findNeedDealerElements(this.param,this.domClass);
    for(var i=0;i<charsDoms.length;i++){
        var echartsDom = charsDoms[i];
        var myEcharts = echarts.init(echartsDom);
        var _dataManager = this.mcUtils.attr(echartsDom,"mc-echarts-data-manager");
        var option = {
            title: {
                text: '香港18区人口密度 （2011）',
                subtext: '人口密度数据来自Wikipedia',
                // sublink: 'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} (p / km2)'
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            visualMap: {
                min: 800,
                max: 50000,
                text: ['High', 'Low'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                }
            },
            series: [
                {
                    name: '香港18区人口密度',
                    type: 'map',
                    roam: true,
                    selectedMode: 'multiple',
                    mapType: 'HK', // 自定义扩展图表类型
                    label: {
                        show: true
                    },
                    data: [],
                    // 自定义名称映射
                    // nameMap: {
                    //     'Central and Western': '中西区',
                    //     'Eastern': '东区',
                    //     'Islands': '离岛',
                    //     'Kowloon City': '九龙城',
                    //     'Kwai Tsing': '葵青',
                    //     'Kwun Tong': '观塘',
                    //     'North': '北区',
                    //     'Sai Kung': '西贡',
                    //     'Sha Tin': '沙田',
                    //     'Sham Shui Po': '深水埗',
                    //     'Southern': '南区',
                    //     'Tai Po': '大埔',
                    //     'Tsuen Wan': '荃湾',
                    //     'Tuen Mun': '屯门',
                    //     'Wan Chai': '湾仔',
                    //     'Wong Tai Sin': '黄大仙',
                    //     'Yau Tsim Mong': '油尖旺',
                    //     'Yuen Long': '元朗'
                    // }
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
McEChartsHKMap.prototype.setOption = function(option,param,data){
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

    $.get('assets/drag/js/data/echarts/hkmap/HK.json', function (geoJson) {
        echarts.registerMap('HK', geoJson);
        option.series[0].data = seriesData;
        param.myEcharts.setOption(option);
        param.myEcharts.resize();
        param.myEcharts.on('click', function(params) {
            alert(params.data.name + ":" + params.data.value);
        });
    })
}
/*把组件安装一下*/
___mcUtils.install({component:new McEChartsHKMap()})
