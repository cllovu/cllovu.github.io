/*dom操作工具类如果有jquery 优先采用jquery 否则使用dom api:此种方式同时支持vue jquery等各类框架*/
function McUtils(){
    this.$ = null;
    if(typeof jQuery !='undefined'){
        this.$ = jQuery;
    }
    if(typeof layui !='undefined'){
        this.$ = layui.jquery;
    }
    if(typeof $ !='undefined'){
        this.$ = $;
    }
    this.ajaxCache = {};
    this.iframeComponents = [];
}
McUtils.prototype={
    /*根据样式名获取结构*/
    getElementsByClassName:function (className,parentDom) {
        if(this.$){
            if(parentDom){
                return $(parentDom).find("."+className);
            }
            return this.$("."+className);
        }
        if (document.getElementsByClassName) {
            if(parentDom && parentDom['getElementsByClassName']){
                return parentDom.getElementsByClassName(className);
            }
            // 使用现有方法
            return document.getElementsByClassName(className);
        } else {
            // 循环遍历所有标签，返回带有相应类名的元素
            var results = [],
                elems = document.getElementsByTagName("*");
            for (var i = 0, len = elems.length; i < len; i++) {
                if (elems[i].className.indexOf(className) != -1) {
                    results[results.length] = elems[i];
                }
            }
            return results;
        }
    },
    /*设置结构内html*/
    html:function(node,html){
        if(this.$){
            this.$(node).html(html);
            return;
        }
        node.innerHTML = html;
    },
    /*设置css*/
    css:function(node,styleName,styleValue){
        if(this.$){
            this.$(node).css(styleName,styleValue);
            return;
        }
        node.style[styleName] = styleValue;
    },
    attr:function(node,attrName,attrValue){
        if(this.$){
            if(typeof attrValue !='undefined'){
                this.$(node).attr(attrName,attrValue);
            }else{
                return this.$(node).attr(attrName);
            }
        }else{
            if(typeof attrValue!='undefined'){
                node.setAttribute(attrName,attrValue);
            }else{
                var attrs = node.attributes;
                for (var i = 0; i < attrs.length; i++) {
                    if(attrs[i].name===attrName){
                        return attrs[i].value;
                    }
                }
                return null;
            }
        }
    },
    escapeHtml:function(str){
        return str.replace(/&quot;/g,"\"").replace(/&lt;/g,"<").replace(/&gt;/g,">")
    },
    ajax:function(useCache,originParam,remoteApi,callback){
        var _t  =  this;
        if(useCache){//是否使用缓存加快速度
            var cache = this.ajaxCache[remoteApi];
            if(cache){
                console.log("为了提升设计器性能，为您命中缓存："+remoteApi)
                callback(originParam,cache);
                return;
            }
        }
        //请求
        if(typeof axios!='undefined'){ //用axios请求
            axios.get(remoteApi, {params: {}})
                .then(function (response) {
                    var dataList = response.data;
                    _t.ajaxCache[remoteApi] = dataList;
                    callback(originParam,dataList);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }else{//用jquery
            if(typeof $!='undefined'){
                $.get(remoteApi,{},function(dataList){
                    _t.ajaxCache[remoteApi] = dataList;
                    callback(originParam,dataList);
                })
            }
        }
    },
    install:function(param){
        this.iframeComponents.push(param.component)
    },
    /*查询应对被处理的dom节点*/
    findNeedDealerElements:function(param,className){
        if(window.iframeUi){//在布局器内 采用局部刷新的方式渲染 完全是为了性能考虑
            if(param && param.action=='hotfixRefresh'){//热刷新
                var magicalApi = window.iframeUi.magicalApi;//获取布局器api
                var focusNodes = magicalApi.getFocusNodes();
                if(focusNodes){
                    var chartsDoms = [];
                    for(var i=0;i<focusNodes.length;i++){
                        var focusNode = focusNodes[i];
                        var clazz = focusNode.attributes['class'];
                        if(clazz && clazz.indexOf(className)!=-1){
                            //查询当前聚焦的jquery 节点
                            var originElem = magicalApi.getElemByMagicalCoderId({id:focusNode.magicalCoder.id});
                            if(originElem.length>0){
                                chartsDoms.push(originElem[0]);
                            }
                        }
                    }
                    if(chartsDoms.length>0){
                        return chartsDoms;
                    }
                }
            }
        }
        //全量更新
        var chartsDoms = this.getElementsByClassName(className);
        return chartsDoms;
    },
    //echarts组件在布局器内是否继续渲染
    ifEchartsContinueRenderInMagicalCoder:function(param,domClass){
        if(param){//布局器内操作
            if(param.action=='resize'){//变更大小
                var charsDoms = this.findNeedDealerElements(this.param,domClass);
                for(var i=0;i<charsDoms.length;i++){
                    echarts.getInstanceByDom(charsDoms[i]).resize()
                }
                return false;
            }
        }
        return true;
    }
}
/*暴漏出来方便给后续组件共享*/
var ___mcUtils = new McUtils();
