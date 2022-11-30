if (typeof String.prototype.endsWith != 'function') {String.prototype.endsWith = function (suffix){return this.slice(-1*suffix.length) === suffix;};}var __import = function(imports){var resources = [];for(var i=0;i<imports.length;i++){if(!imports[i]){continue;}if(imports[i].endsWith(".js")){resources.push('<script src="'+imports[i]+'" type="text/javascript"></sc' + 'ript>');}else if(imports[i].endsWith(".css")){resources.push('<link href='+imports[i]+' rel="stylesheet" type="text/css" />');}}document.write(resources.join(''));}
/*
    您自定义的组件的渲染逻辑都可以在下面引入进来:这些资源是脱离布局器独立运行的最小化依赖资源
*/
__import([
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/magicalcoder.css",
        "https://cllovu.github.io/data/assets/drag/ui/element/2.10.1/element.css",
        "https://cllovu.github.io/data/assets/drag/js/lib/leaflet/leaflet.css",
        "https://cllovu.github.io/data/assets/drag/js/lib/json3.js",
        "https://cllovu.github.io/data/assets/drag/js/lib/jscore.js",
        "https://cllovu.github.io/data/assets/drag/js/lib/vue/es6-promise.auto.min.js",
        "https://cllovu.github.io/data/assets/drag/js/lib/vue/es6-promise.min.js",
        "https://cllovu.github.io/data/assets/drag/js/lib/echarts/5.0.2/echarts.min.js",
        "https://cllovu.github.io/data/assets/drag/js/lib/echarts/5.0.2/china.js",
        "https://cllovu.github.io/data/assets/drag/js/lib/echarts/5.0.2/ecstat.js",
        "https://cllovu.github.io/data/assets/drag/js/lib/echarts/5.0.2/extension/datatool.min.js",
        "https://cllovu.github.io/data/assets/drag/js/lib/vue/vue.js",
        "https://cllovu.github.io/data/assets/drag/ui/element/2.10.1/element.js",
        "https://cllovu.github.io/data/assets/drag/js/lib/vue/axios.js",
        "https://cllovu.github.io/data/assets/drag/js/lib/leaflet/leaflet.js",
    /*全局工具类：请勿删除*/
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-utils.js",
    /*由于各个ui都可以复用下面这几个通用的组件，所以我们提取出来放入magicalcoder目录*/
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-geometry.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-line.js",
    /*yy*/
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-line1.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-line2.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-line3.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-line4.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-line5.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-line6.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-line7.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-line8.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-bar.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-pie.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-pie1.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-pie2.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-pie3.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-pie4.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-pie5.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-pie6.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-radar.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-dashboard.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-scatter.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-scatter1.js",
     "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-scatter2.js",
     /*lj*/
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-map.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-hkmap.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-tree.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-lines.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-treemap.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-sunburst.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-parallel.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-sankey.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-themeriver.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-simple-gauge.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-speed-gauge.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-grogress-gauge.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-stage-gauge.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-grade-gauge.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-barometer-gauge.js",
    /*yjj*/
//    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-bar-negative.js",
//    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-bar-ladder.js",
//    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-bar-background.js",
//    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-bar-waterfall.js",
//    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-scatter-exponential.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-funnel.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-relation.js",
    "https://cllovu.github.io/data/assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-heatmap-cartesian.js",
])
function IframeComponents (){
}
/*这个方法会在html渲染完主动执行 已经写入constant.js的defaultJavascript默认脚本了*/
IframeComponents.prototype.execute = function(param){
    var iframeComponents = ___mcUtils.iframeComponents;
    for(var i=0;i<iframeComponents.length;i++){
        var component = iframeComponents[i];
        if(component['render']){
            component.render(param);
        }else{
            console.log("以下组件缺少render方法"+component)
        }
    }
}
