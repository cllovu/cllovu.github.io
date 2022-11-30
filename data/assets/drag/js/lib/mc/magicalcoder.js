/*编写一个贯穿全局类*/
function MagicalCoder(){
    this.components = [];//新版组件管理方式
    this.dragItems = [];//左侧拖拽源
    this.ajaxCache = {};//缓存
    this.callbacks = {};//callback.js的回调处理
    this.changeEnv = [];//修改环境变量 application-env.js的参数
}
/*安装组件*/
MagicalCoder.prototype.install = function(param){
    if(param['components']){
        var components = param.components;
        for(var i=0;i<components.length;i++){
            this.components.push(components[i]);
        }
    }
    if(param['dragItems']){
        var dragItems = param.dragItems;
        for(var i=0;i<dragItems.length;i++){
            this.dragItems.push(dragItems[i]);
        }
    }
    if(param['callbacks']){
        var callbacks = param.callbacks;
        for(var i=0;i<callbacks.length;i++){
            var callback = callbacks[i];
            if(callback){
                var order = callback['order']||0;
                for(var key in callback){
                    if(key !== 'order'){
                        var userFn = callback[key];
                        var existKeyCallbacks = this.callbacks[key];
                        if(existKeyCallbacks && existKeyCallbacks.length>0){//已经存在
                            var orderIndex = -1;
                            for(var j=0;j<existKeyCallbacks.length;j++){
                                var existFn = existKeyCallbacks[j];
                                if(order <= existFn.order){
                                    orderIndex = j;
                                    break;
                                }
                            }
                            if(orderIndex==-1){
                                existKeyCallbacks.push({order:order,callback:userFn});
                            }else{
                                existKeyCallbacks.splice(orderIndex,0,{order:order,callback:userFn});
                            }
                        }else{
                            this.callbacks[key] = [{order:order,callback:userFn}];
                        }
                    }
                }
            }
        }
    }
    if(param['changeEnv']){
        this.changeEnv.push(param.changeEnv)
    }
}
/*临时使用一下*/
MagicalCoder.prototype.print = function(tagClassMapping,rightPanel){
    var coms = [];
    for(var key in tagClassMapping){
        var item = {identifier:key,properties:tagClassMapping[key]}
        var attributes = [];
        item.attributes = attributes;
        for(var i=0;i<rightPanel.length;i++){
            var right = rightPanel[i];
            var content = right.content;
            var newAttr = {title:right.title,active:right.active,width:right.width}
            var newcontent = content[key];
            if(newcontent){
                newAttr.content = newcontent;
                attributes.push(newAttr);
            }
        }
        coms.push(item);
    }
    var str = JSON.stringify(coms)
//    console.log(str)
    var newStr = str.replace(/\{"identifier"/g,"\n{identifier");
    newStr = newStr.replace(/"attributes"/g,"\n attributes");
    console.log(newStr)
}
/*获取安装的组件*/
MagicalCoder.prototype.getComponents = function(){
    return this.components;
}
/*
引入远程资源
imports:[]
例如:["xxx.js","xxx.css"]
*/
MagicalCoder.prototype.import = function(imports){
    var resources = []
    for(var i=0;i<imports.length;i++){
        if(!imports[i]){
            continue;
        }
        if(imports[i].endsWith(".js")){
            resources.push('<script src="'+imports[i]+'" type="text/javascript"></sc' + 'ript>');
        }else if(imports[i].endsWith(".css")){
            resources.push('<link href='+imports[i]+' rel="stylesheet" type="text/css" />');
        }
    }
    document.write(resources.join(''))
}
/*安装插件到constant中*/
MagicalCoder.prototype.installConstantComponents = function(param){
/*左侧拖拽组件合并*/
    var dragItems = param.dragItems;
    for(var i=0;i<this.dragItems.length;i++){
        dragItems.push(this.dragItems[i]);
    }
/*命名空间，右侧属性合并*/
//    var rightPanel = param.rightPanel;//右侧属性:即将废弃
    var rightAttribute = param.rightAttribute;//右侧属性：新版属性
    var tagClassMapping = param.tagClassMapping;//命名空间
    var installedComponents = this.getComponents();
//    var rightPaneSize = rightPanel.length;
    for(var i=0;i<installedComponents.length;i++){
        var identifier = installedComponents[i].identifier;
        var properties = installedComponents[i].properties;
        var attributes = installedComponents[i].attributes;
        //组件空间
        tagClassMapping[identifier] = properties;
        //组件属性
        rightAttribute[identifier] = attributes;

        //右侧属性 注意自定义组件 不要越界
        /*for(var j=0;j<attributes.length;j++){
            if(j<rightPaneSize){
                //这里是合并还是覆盖
                var originConfig = rightPanel[j].content[identifier];
                if(typeof originConfig == 'undefined'){
                    rightPanel[j].content[identifier] = attributes[j];
                }else {
                    for(var n=0;n<attributes[j].length;n++){
                        originConfig.push(attributes[j][n]);//
                    }
                }
            }else{
                console.log(identifier+"组件超越了constant.js配置的this.rightPanel最大长度【已忽略】")
            }
        }*/
    }
}
MagicalCoder.prototype.ajax=function(useCache,originParam,remoteApi,callback){
     var _t  =  this;
     if(useCache){//在布局器内 直接取缓存接口 加快布局器性能
         var cache = this.ajaxCache[remoteApi];
         if(cache){
             console.log("为了提升设计器性能，已为您命中缓存："+remoteApi)
             callback(originParam,cache);
             return;
         }
     }
     //请求
     if(typeof axios!='undefined'){ //用axios请求
         axios.get(remoteApi, {params: {}})
             .then(function (response) {
                 var data = response.data;
                 _t.ajaxCache[remoteApi] = data;
                 callback(originParam,data);
             })
             .catch(function (error) {
                 console.log(error);
             });
     }else{//用jquery
         if(typeof $!='undefined'){
             $.get(remoteApi,{},function(data){
                 _t.ajaxCache[remoteApi] = data;
                 callback(originParam,data);
             })
         }
     }
}
/*自动生成uuid唯一字符串*/
MagicalCoder.prototype.uuid = function(){
    var d = new Date().getTime();
    var uuid = 'uxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}
var MagicalCoder = new MagicalCoder();
