/*每一种Ui的个性处理 比如各种组件初始化 重绘 注意剩余接口在iframe-ui-end.js中*/
function IframeUi() {
    this.vueMethod = {};
    this.defaultCss = "";//默认样式
    this.css = this.defaultCss;
    this.javascript="";
    //是否开启javascript调试
    this.debug = false;
    this.vueMethodReg = new RegExp("//functions-begin\n\\{([\\s\\S]*?)\\};\n?//functions-end","g");
    this.splitStr = ",/*别删我*/\n";
    //此正在匹配函数
    this.functionReg = new RegExp("function\\s+(\\w+)\\((\\w+)\\)\\s*\\{([\\s\\S]*)\\}","g");
    /*脚本编辑器的数据functionName:html 方法名:脚本编辑器的可恢复数据*/
    this.magicalJsCodeData = {}
    /*工作区画布基础样式设置 key:样式名 value:样式值*/
    this.canvasStyle = {}
    this.construct();

}
IframeUi.prototype.inject = function(SINGLETON){
    this.preInject(SINGLETON);
}
//提供一系列动态操作脚本的接口 您可以调用API自由控制脚本内容
IframeUi.prototype.api = function(){
    return this.jqueryApi();//具体有哪些可参考ifram-ui-end.js的IframeUi.prototype.jqueryApi
}
/*此方法不要改名 初始化组件的方法 每次代码重绘 会调用此方法 来重新初始化组件*/
IframeUi.prototype.render=function (param) {
//    console.log(param.trigger.triggerChange)
    var c = param.trigger.triggerChange;
    var focusNode = this.magicalApi.getFocusNode();

    if(param.globalConstant.settings.other.speed.fastRender &&
        ( c =='changeAttr' || c == 'centerDrop' || c == 'leftDrop'|| c== 'changeText' || c == 'appendText'
        ||c == 'delete' || c == 'changeStyles' /*|| c == 'duplicate'*/)
    ){
        this.fastRender(param);
    }else{
        if(this.useMagicalCoderRender(param)){
            this.magicalCoderComponentsRender(param);
        }else{
            this.slowRender(param);
        }
    }
    //别管了 调用即可
    param.jsonFactory.resetTrigger();
}
/*把所有html拿出来重绘一遍，简单粗暴，但是当界面结构里有很多ajax请求，就可能会很慢 但是很保险 页面出错率0*/
IframeUi.prototype.slowRender = function(param){
//    console.log("全量刷新")
   var html=param.html,jsonFactory=param.jsonFactory,globalConstant=param.globalConstant;
    if(html==null){
        return;
    }
    var magicalCoderCss = this.autoCreateMagicalCss();
    magicalCoderCss.innerHTML = this.getCss();//设置样式内容

    var magicalDragScene = this.autoCreateRootDom();
    magicalDragScene.innerHTML = html;

    var javascript = this.getJavascript();
    try {
        if(this.debug){
            javascript = "debugger\n" + javascript;
        }
        //使用eval才行 使用全局eval 是全局作用域，更有利于window对象可用
        window.eval(javascript);
    }catch (e) {
        var msgHtml = '<div class="layui-row"><div class="layui-col-xs12" style="font-size: 17px; font-weight: bolder;">'+e.message+'</div><div class="layui-col-xs12" style="color: rgb(221, 32, 32);">'+e.stack+'</div></div>';
        parent.window.layui.layer.open({
            type:1,
            title:"您编写的脚本编译错误-非布局器报错",
            area: ['800px', '400px'],
            shadeClose:true,
            content:msgHtml,
        })
        console.log(e);
    }
    //做一些优化 比如删除一些不需要的结构
    this.fixDynamicDomAfterRender({container:$("#magicalDragScene")});
}
/*
    快速render极致性能：局部更新的方式 建个临时结构来接管 渲染完替换原始位置
    虽然很快，但是针对于界面上有
    @ echarts组件 可以给固定宽度 那就不会空白了
 */
IframeUi.prototype.fastRender=function (param) {
//    console.log("局部刷新")
    var focusNode = this.magicalApi.getFocusNode();
    var html = focusNode!=null ? this.magicalApi.nodeToHtml({node:focusNode,pure:true}):"";

    var c = param.trigger.triggerChange,triggerOperateNodes=param.trigger.triggerOperateNodes;
    //原始结构
    var originElem = null;
    if(c == 'leftDrop'){
        originElem = $("#magicalDragScene").find(".magicalcoder-page-drag-item-label");
    }else if(c == 'delete'){
        if(triggerOperateNodes){
            for(var i=0;i<triggerOperateNodes.length;i++){
                var elem = this.magicalApi.getElemByMagicalCoderId({id:triggerOperateNodes[i].magicalCoder.id});
                if(elem){
                    elem.remove();
                }
            }
        }
        return;
    }else{
        originElem = this.magicalApi.getElemByMagicalCoderId({id:focusNode.magicalCoder.id});
    }
    //body里增加一个临时结构
    $("body").append("<div id='magicalDragSceneGhost'></div>");

    var magicalDragScene = $("#magicalDragSceneGhost");
    //由于vue框架不支持body做根 并且<template></template>标签在html里会自动变成虚无 所以我们正则替换一下 自动加上让vue渲染
    var html = "<template>"+html+"</template>";
    magicalDragScene[0].innerHTML=html;

    var javascript = this.getJavascript();

    try {
        //使用eval才行
        var newJs = javascript.replace("new Ctor().$mount('#magicalDragScene')","new Ctor().$mount('#magicalDragSceneGhost')");
        eval(newJs);
    }catch (e) {
        var msgHtml = '<div class="layui-row"><div class="layui-col-xs12" style="font-size: 17px; font-weight: bolder;">'+e.message+'</div><div class="layui-col-xs12" style="color: rgb(221, 32, 32);">'+e.stack+'</div></div>';
        parent.window.layui.layer.open({
            type:1,
            title:"您编写的脚本编译错误-非布局器报错",
            area: ['800px', '400px'],
            shadeClose:true,
            content:msgHtml,
        })
        console.log(e);
        eval("var Ctor = Vue.extend({});new Ctor().$mount('#magicalDragSceneGhost');");//兼容一下js错误 给出渲染界面
    }
    //做一些优化 比如删除一些不需要的结构
    this.fixDynamicDomAfterRender({container:$("#magicalDragSceneGhost")});
    var children =  $("#magicalDragSceneGhost").children();
    originElem.replaceWith(children);
    //删除临时结构即可
    $("#magicalDragSceneGhost").remove();
}

//修复一下动态创建的结构跑偏问题 有些ui设计的比较差 动态没用的结构很多，我们设置简介标签上的属性样式无法继承 所以就需要我们修复一下
IframeUi.prototype.fixDynamicDomAfterRender = function(param){
    var container = param.container;
}
IframeUi.prototype.getJavascript = function(){
    return this.getJqueryScript();
}
IframeUi.prototype.setJavascript = function(javascript){
    this.setJqueryScript(javascript);
}
/*扩展可选图标icon*/
IframeUi.prototype.iconList = function(){
    if(window.location.href.indexOf("from=icon_list")!=-1){
        $("body").css("overflow-y","scroll")
        var util = this.util();
        var iconArr = ["layui-icon-rate-half","layui-icon-rate","layui-icon-rate-solid","layui-icon-cellphone","layui-icon-vercode","layui-icon-login-wechat","layui-icon-login-qq","layui-icon-login-weibo","layui-icon-password","layui-icon-username","layui-icon-refresh-3","layui-icon-auz","layui-icon-spread-left","layui-icon-shrink-right","layui-icon-snowflake","layui-icon-tips","layui-icon-note","layui-icon-home","layui-icon-senior","layui-icon-refresh","layui-icon-refresh-1","layui-icon-flag","layui-icon-theme","layui-icon-notice","layui-icon-website","layui-icon-console","layui-icon-face-surprised","layui-icon-set","layui-icon-template-1","layui-icon-app","layui-icon-template","layui-icon-praise","layui-icon-tread","layui-icon-male","layui-icon-female","layui-icon-camera","layui-icon-camera-fill","layui-icon-more","layui-icon-more-vertical","layui-icon-rmb","layui-icon-dollar","layui-icon-diamond","layui-icon-fire","layui-icon-return","layui-icon-location","layui-icon-read","layui-icon-survey","layui-icon-face-smile","layui-icon-face-cry","layui-icon-cart-simple","layui-icon-cart","layui-icon-next","layui-icon-prev","layui-icon-upload-drag","layui-icon-upload","layui-icon-download-circle","layui-icon-component","layui-icon-file-b","layui-icon-user","layui-icon-find-fill","layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop","layui-icon-loading-1 layui-anim layui-anim-rotate layui-anim-loop","layui-icon-add-1","layui-icon-play","layui-icon-pause","layui-icon-headset","layui-icon-video","layui-icon-voice","layui-icon-speaker","layui-icon-fonts-del","layui-icon-fonts-code","layui-icon-fonts-html","layui-icon-fonts-strong","layui-icon-unlink","layui-icon-picture","layui-icon-link","layui-icon-face-smile-b","layui-icon-align-left","layui-icon-align-right","layui-icon-align-center","layui-icon-fonts-u","layui-icon-fonts-i","layui-icon-tabs","layui-icon-radio","layui-icon-circle","layui-icon-edit","layui-icon-share","layui-icon-delete","layui-icon-form","layui-icon-cellphone-fine","layui-icon-dialogue","layui-icon-fonts-clear","layui-icon-layer","layui-icon-date","layui-icon-water","layui-icon-code-circle","layui-icon-carousel","layui-icon-prev-circle","layui-icon-layouts","layui-icon-util","layui-icon-templeate-1","layui-icon-upload-circle","layui-icon-tree","layui-icon-table","layui-icon-chart","layui-icon-chart-screen","layui-icon-engine","layui-icon-triangle-d","layui-icon-triangle-r","layui-icon-file","layui-icon-set-sm","layui-icon-add-circle","layui-icon-404","layui-icon-about","layui-icon-up","layui-icon-down","layui-icon-left","layui-icon-right","layui-icon-circle-dot","layui-icon-search","layui-icon-set-fill","layui-icon-group","layui-icon-friends","layui-icon-reply-fill","layui-icon-menu-fill","layui-icon-log","layui-icon-picture-fine","layui-icon-face-smile-fine","layui-icon-list","layui-icon-release","layui-icon-ok","layui-icon-help","layui-icon-chat","layui-icon-top","layui-icon-star","layui-icon-star-fill","layui-icon-close-fill","layui-icon-close","layui-icon-ok-circle","layui-icon-add-circle-fine","layui-icon-table","layui-icon-upload","layui-icon-slider"]
        var html = [];
        html.push('<ul class="magicalcoder-extend-icons">')
        for(var i=0;i<iconArr.length;i++){
            html.push("<li><i class='layui-icon "+iconArr[i]+"'></i></li>")
        }
        html.push('</ul>')
        document.body.innerHTML = html.join('');

        var lis = document.getElementsByTagName("li");
        for(var i=0;i<lis.length;i++){
            lis[i].addEventListener('click',function () {
                var icon = this.childNodes[0]
                var active = true;
                if(icon.className.indexOf("active")==-1){
                    active = false;
                }
                var actives = document.getElementsByClassName("active");
                for(var j=0;j<actives.length;j++){
                    util.removeClass(actives[j],"active");
                }
                if(!active){
                    icon.className = icon.className +" active";
                }

            })
        }
        return true;
    }
    return false;
}
//下载按钮下载的内容
IframeUi.prototype.download = function(html){
    var source = [
        '<meta charset="UTF-8">','<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">',
        '<title>Bootstrap4-由www.magicalcoder.com可视化布局器生成</title>',
        '<script type="text/javascript" src="assets/drag/js/user/iframe/bootstrap/4.0.0/components/import.js"></script>'
    ]
    //设置样式
    var style = [];
    for(var key in this.canvasStyle){
        style.push(key+":"+this.canvasStyle[key]);
    }
    var css = '\n<style>\n'+this.getCss()+'\n</style>\n';
    var head = '<head>'+source.join('\n')+css+'\n</head>\n';
    var body = '<body style="'+style.join(";").replace(/\"/g,"'")+'">\n'+html+'\n<script>\n'+this.getJavascript()+'\n</script>\n</body>\n';
    return {
        htmlBefore:"<!DOCTYPE html>\n<html><!--代码由www.magicalcoder.com可视化布局器拖拽生成 资源请自行下载到本地-->\n",
        head:head,
        body:body,
        htmlEnd:"\n</html>",
    }
}

