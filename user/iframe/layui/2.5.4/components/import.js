if (typeof String.prototype.endsWith != 'function') {String.prototype.endsWith = function (suffix){return this.slice(-1*suffix.length) === suffix;};}var __import = function(imports){var resources = [];for(var i=0;i<imports.length;i++){if(!imports[i]){continue;}if(imports[i].endsWith(".js")){resources.push('<script src="'+imports[i]+'" type="text/javascript"></sc' + 'ript>');}else if(imports[i].endsWith(".css")){resources.push('<link href='+imports[i]+' rel="stylesheet" type="text/css" />');}}document.write(resources.join(''));}
/*
    您自定义的组件的渲染逻辑都可以在下面引入进来:这些资源是脱离布局器独立运行的最小化依赖资源
*/
__import([
        "assets/drag/js/user/iframe/magicalcoder/components/magicalcoder.css",
        "assets/drag/ui/layui/2.5.4/css/layui.css",
        "assets/drag/js/lib/leaflet/leaflet.css",
        "assets/drag/js/lib/json3.js",
        "assets/drag/js/lib/jscore.js",
        "assets/drag/js/lib/vue/es6-promise.auto.min.js",
        "assets/drag/js/lib/vue/es6-promise.min.js",
        "assets/drag/js/lib/echarts/5.0.2/echarts.min.js",
        "assets/drag/js/lib/echarts/5.0.2/extension/datatool.min.js",
        "assets/drag/ui/layui/2.5.4/layui.all.js",
        "assets/drag/js/lib/leaflet/leaflet.js",
    /*全局工具类：请勿删除*/
    "assets/drag/js/user/iframe/magicalcoder/components/mc-utils.js",
    /*由于各个ui都可以复用下面这几个通用的组件，所以我们提取出来放入magicalcoder目录*/
    "assets/drag/js/user/iframe/magicalcoder/components/mc-geometry.js",
    "assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-line.js",
    "assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-bar.js",
    "assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-pie.js",
    "assets/drag/js/user/iframe/magicalcoder/components/mc-echarts-scatter.js",
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
