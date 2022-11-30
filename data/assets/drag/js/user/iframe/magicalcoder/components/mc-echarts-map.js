function McEChartsMap(){
    //___mcUtils参考mc-utils.js
    this.mcUtils = ___mcUtils;
    this.param = null;
    this.domClass = "mc-echarts-map";
}
/*务必带此render方法：否则组件不会被追踪渲染*/
McEChartsMap.prototype.render = function(param){
    if(!this.mcUtils.ifEchartsContinueRenderInMagicalCoder(param,this.domClass)){
        return;
    }
    this.param = param;
    this.map();
}

McEChartsMap.prototype.map = function () {
    var _t = this;
    var charsDoms = this.mcUtils.findNeedDealerElements(this.param,this.domClass);
    for(var i=0;i<charsDoms.length;i++){
        var echartsDom = charsDoms[i];
        var myEcharts = echarts.init(echartsDom);
        var _dataManager = this.mcUtils.attr(echartsDom,"mc-echarts-data-manager");
        var option = {
            backgroundColor: '#FFFFFF',
            title: {
                // text: '全国地图大数据',
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            // legend: {
            //     top: '5%',
            //     left: 'center'
            // },
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
            //左侧小导航图标
            visualMap: {
                min: 0,
                max: 1500,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'],
                inRange: {
                    color: ['#e0ffff', '#006edd']
                },
                show: true
            },
            series: [{
                name: '',
                // name: '中国',
                type: 'map',
                // mapType: 'beijing',
                mapType: '',
                roam: true,
                selectedMode: 'multiple',
                label: {
                    show: true
                },
                data: [],
            }]
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
                render = dataManager.choose1.sourceApi && dataManager.choose1.x && dataManager.choose1.y && dataManager.choose1.c;
                xFieldName=dataManager.choose1.x;
                yFieldName=dataManager.choose1.y;
                cFieldName=dataManager.choose1.c;
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
                    _t.setOption(param.option,{myEcharts:param.myEcharts,xFieldName:param.dataManager.choose1.x,yFieldName:param.dataManager.choose1.y,cFieldName:param.dataManager.choose1.c},data)
                })
            }else if(dataType==2){
                this.mcUtils.ajax(window.iframeUi,{myEcharts:myEcharts,dataManager:dataManager,option:option},dataManager.choose2.sourceApi,function(param,data){
                    _t.setOption(param.option,{myEcharts:param.myEcharts,xFieldName:param.dataManager.choose2.x,yFieldName:param.dataManager.choose2.y},data)
                })
            }else{
                var data = dataManager.choose3.data;
                var cFieldName = dataManager.choose3.c;
                _t.setOption(option,{myEcharts:myEcharts,xFieldName:"x",yFieldName:"y",cFieldName:"c",},{code:0,data:data,cFieldName:cFieldName})
            }
        }
    }
}

McEChartsMap.prototype.getTitle = function(echartsDom){
    var title = this.mcUtils.attr(echartsDom,"mc-echarts-title");
    if(title){
        return JSON.parse(title);
    }
    return null;
}
McEChartsMap.prototype.setOption = function(option,param,data){
    var xFieldName=param.xFieldName;
    var yFieldName=param.yFieldName;
    var cFieldName = null;
    // 如果 data.cFieldName 不存在 那么说明使用 自定义数据源
    if (null == data.cFieldName || '' == data.cFieldName || undefined == data.cFieldName ){
        cFieldName = param.cFieldName;
    }else {
        // 使用本地默认数据源
        cFieldName = data.cFieldName;
    }
    if(data.code!=0){
        return;
    }
    var dataList = data.data;
    //拿到数据 我们转换一下 变成echarts的数据
    var seriesData = [];//y数据
    // var cityArr = []
    for(var j=0;j<dataList.length;j++){
        var item = dataList[j];
        seriesData.push({value:item[yFieldName],name:item[xFieldName]});
    }
    // // 是否选中省份
    // if (cityArr.length < 1){
    //     // alert('请选择省份');
    // }else {
        if (this.checkCityName(cFieldName)){
            var cityName = this.getCityName(cFieldName,1);
            if (cityName != null && cityName != '' && cityName != undefined){
                option.series[0].name = cityName;
                option.series[0].mapType = cFieldName;
                option.series[0].data = seriesData;
                param.myEcharts.setOption(option);
                param.myEcharts.resize();
                param.myEcharts.on('click', function(params) {
                    if (params.data == undefined){
                        alert("暂无数据")
                    }else {
                        alert(params.data.name + ":" + params.data.value);
                    }
                });
            }else {
                // alert('请检查省份名称')
            }
        }else{
            var cityName = this.getCityName(cFieldName,2);
            if (cityName != null && cityName != '' && cityName != undefined){
                option.series[0].name = cFieldName;
                option.series[0].mapType = cityName;
                option.series[0].data = seriesData;
                param.myEcharts.setOption(option);
                param.myEcharts.resize();
                param.myEcharts.on('click', function(params) {
                    if (params.data == undefined){
                        alert("暂无数据")
                    }else {
                        alert(params.data.name + ":" + params.data.value);
                    }
                });
            }else {
                // alert('请检查省份名称')
            }
        }

    // }
}

McEChartsMap.prototype.getCityName = function (key, type){
    var cityArr = [{"name":"china","title":"中国"},{"name":"anhui","title":"安徽"},{"name":"aomen","title":"澳门"},{"name":"beijing","title":"北京"},{"name":"chongqing","title":"重庆"},
        {"name":"fujian","title":"福建"},{"name":"gansu","title":"甘肃"},{"name":"guangdong","title":"广东"},{"name":"guangxi","title":"广西"},{"name":"guangzhou","title":"广州"},
        {"name":"guizhou","title":"贵州"},{"name":"hainan","title":"海南"},{"name":"hebei","title":"河北"},{"name":"heilongjiang","title":"黑龙江"},{"name":"henan","title":"河南"},
        {"name":"hubei","title":"湖北"},{"name":"hunan","title":"湖南"},{"name":"jiangsu","title":"江苏"},{"name":"jiangxi","title":"江西"},{"name":"jilin","title":"吉林"},
        {"name":"liaoning","title":"辽宁"},{"name":"neimenggu","title":"内蒙古"},{"name":"ningxia","title":"宁夏"},{"name":"qinghai","title":"青海"},{"name":"shandong","title":"山东"},
        {"name":"shanghai","title":"上海"},{"name":"shanxi","title":"山西"},{"name":"sichuan","title":"四川"},{"name":"taiwan","title":"台湾"},{"name":"tianjin","title":"天津"},
        {"name":"xianggang","title":"香港"},{"name":"xinjiang","title":"新疆"},{"name":"xizang","title":"西藏"},{"name":"yunnan","title":"云南"},{"name":"zhejiang","title":"浙江"}];
    // 根据name 查找title
    if (type == 1){
        for (var i = 0; i < cityArr.length;i++){
            if (key == cityArr[i].name){
                return cityArr[i].title;
            }
        }
    }
    // 根据 title查找 name
    if (type == 2){
        for (var i = 0; i < cityArr.length;i++){
            if (key == cityArr[i].title){
                return cityArr[i].name;
            }
        }
    }
}

// 判断传入中文还是字母
McEChartsMap.prototype.checkCityName = function (key){
    if(/^[a-zA-Z]*$/.test(key)){
        return true;
    }else if(/^[\u4e00-\u9fa5]*$/.test(key)){
        return false;
    }
}

/*把组件安装一下*/
___mcUtils.install({component:new McEChartsMap()})
