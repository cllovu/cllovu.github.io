/*每一种Ui的个性处理 比如各种组件初始化 重绘 注意剩余接口在iframe-ui-end.js中*/
function IframeUi() {
    this.ieVersion = ieVersion();
    this.vueData = {};
    this.vueMethod = this.api().getResetVueMethod();
    this.vueMounted = 'function(){}';
    this.defaultCss = "";//默认样式
    this.css = this.defaultCss;
    this.javascript="";
    //是否开启javascript调试
    this.debug = false;
    this.vueDataReg = new RegExp("var vueData = \\{([\\s\\S]*?)\\};\n*var vueMethod","g");
    this.vueMethodReg = new RegExp("var vueMethod = \\{([\\s\\S]*?)\\};\n*var vueMounted","g");
    this.vueMountedReg = new RegExp("var vueMounted = ([\\s\\S]*?)\n*\\/\\*注意以上代码由系统维护,非专业人士请勿修改\\*\\/","g");
    this.splitStr = ",/*别删我*/\n";
    //此正在匹配函数
    this.functionReg = new RegExp("\"?(\\w+)\"?\\s*:\\s*([\\s\\S]*)","g");
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
    return this.vueApi();//具体有哪些可参考ifram-ui-end.js的IframeUi.prototype.vueApi
}
/*此方法不要改名 初始化组件的方法 每次代码重绘 会调用此方法 来重新初始化组件*/
IframeUi.prototype.render=function (param) {
    //console.log(param.trigger.triggerChange)
    var c = param.trigger.triggerChange;

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
    //由于vue框架不支持body做根 并且<template></template>标签在html里会自动变成虚无 所以我们正则替换一下 自动加上让vue渲染
    var html = this.realHtml(html);
    magicalDragScene.innerHTML = html;

    var javascript = this.getJavascript();
    try {
        if(this.debug){
            javascript = "debugger\n" + javascript;
        }
        //使用eval才行 使用全局eval 是全局作用域，更有利于window对象可用
        eval(javascript);
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
        eval("var Ctor = Vue.extend({});new Ctor().$mount('#magicalDragScene');new IframeComponents().execute();");//兼容一下js错误 给出渲染界面
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
    /*修复form-item 内部没东西的时候 拖拽不准确*/
    container.find(".el-form-item__content").each(function(idx,item){
        var children = $(this).children();
        if(children.length<=0){
            $(this).remove();
        }
    })

    //写好标记死结构 就是为了打开弹窗的
    var dragMcPane = this.jsonFactory.api().pubGetDragMcPaneName();
    var magicalCoderIdAttrName = this.jsonFactory.api().getMagicalCoderIdAttrName();
    var _t = this;
    container.find(".mc-open-dialog-btn").click(function(){
        setTimeout(function(){
            container.find(".el-dialog").each(function(idx,item){
                var body = $(this).find(".el-dialog__body");
                if(body.length>0){//elementui 你为啥开始不创建这个结构烦死
                    var elDialogWrapper = $(this).parent();
                    var mcId = elDialogWrapper.attr(magicalCoderIdAttrName);
                    elDialogWrapper.removeAttr(magicalCoderIdAttrName)
                    body.attr(magicalCoderIdAttrName,mcId);
                    body.addClass(dragMcPane);
                    //刷新拖拽事件
                    _t.center.refreshDragEvent();
                }
            })
        },500);
    })
    //修复下card
    container.find(".el-card").each(function(){
        $(this).removeClass(dragMcPane);
        var cardBody = $(this).find(".el-card__body");
        var mcId = $(this).attr(magicalCoderIdAttrName);
        if(cardBody.length<=0){
            $(this).append("<div class='el-card__body "+dragMcPane+"'"+mcId+"'></div>")
        }else{
            cardBody.addClass(dragMcPane)
        }
    })
    //修复图片 等懒加载代码执行完再取img 否则取不到东西
    setTimeout(function(){
        container.find(".el-image").each(function(){
            var img = $(this).find("img");
            var mcId = img.attr(magicalCoderIdAttrName)
            img.removeAttr(magicalCoderIdAttrName);
            $(this).attr(magicalCoderIdAttrName,mcId)
        })

    },200)

    //修正input
    container.find(".el-input").each(function(){
        var innerInput = $(this).find("input");
        var mcId = innerInput.attr(magicalCoderIdAttrName);
        $(this).attr(magicalCoderIdAttrName,mcId);
        innerInput.removeAttr(magicalCoderIdAttrName);
    })
    //修正表格重复id
    container.find(".mc-vxe-table").find(".vxe-table").removeAttr(magicalCoderIdAttrName);
}

IframeUi.prototype.getJavascript = function(){
    return this.getVueScript();
}
IframeUi.prototype.setJavascript = function(javascript){
    this.setVueScript(javascript);
}
/*扩展可选图标icon*/
IframeUi.prototype.iconList = function(){
    if(window.location.href.indexOf("from=icon_list")!=-1){
        $("body").css("overflow-y","scroll")
        var util = this.util();
        var iconArr = ['el-icon-platform-eleme','el-icon-eleme','el-icon-delete-solid','el-icon-delete','el-icon-s-tools','el-icon-setting','el-icon-user-solid','el-icon-user','el-icon-phone','el-icon-phone-outline','el-icon-more','el-icon-more-outline','el-icon-star-on','el-icon-star-off','el-icon-s-goods','el-icon-goods','el-icon-warning','el-icon-warning-outline','el-icon-question','el-icon-info','el-icon-remove','el-icon-circle-plus','el-icon-success','el-icon-error','el-icon-zoom-in','el-icon-zoom-out','el-icon-remove-outline','el-icon-circle-plus-outline','el-icon-circle-check','el-icon-circle-close','el-icon-s-help','el-icon-help','el-icon-minus','el-icon-plus','el-icon-check','el-icon-close','el-icon-picture','el-icon-picture-outline','el-icon-picture-outline-round','el-icon-upload','el-icon-upload2','el-icon-download','el-icon-camera-solid','el-icon-camera','el-icon-video-camera-solid','el-icon-video-camera','el-icon-message-solid','el-icon-bell','el-icon-s-cooperation','el-icon-s-order','el-icon-s-platform','el-icon-s-fold','el-icon-s-unfold','el-icon-s-operation','el-icon-s-promotion','el-icon-s-home','el-icon-s-release','el-icon-s-ticket','el-icon-s-management','el-icon-s-open','el-icon-s-shop','el-icon-s-marketing','el-icon-s-flag','el-icon-s-comment','el-icon-s-finance','el-icon-s-claim','el-icon-s-custom','el-icon-s-opportunity','el-icon-s-data','el-icon-s-check','el-icon-s-grid','el-icon-menu','el-icon-share','el-icon-d-caret','el-icon-caret-left','el-icon-caret-right','el-icon-caret-bottom','el-icon-caret-top','el-icon-bottom-left','el-icon-bottom-right','el-icon-back','el-icon-right','el-icon-bottom','el-icon-top','el-icon-top-left','el-icon-top-right','el-icon-arrow-left','el-icon-arrow-right','el-icon-arrow-down','el-icon-arrow-up','el-icon-d-arrow-left','el-icon-d-arrow-right','el-icon-video-pause','el-icon-video-play','el-icon-refresh','el-icon-refresh-right','el-icon-refresh-left','el-icon-finished','el-icon-sort','el-icon-sort-up','el-icon-sort-down','el-icon-rank','el-icon-loading','el-icon-view','el-icon-c-scale-to-original','el-icon-date','el-icon-edit','el-icon-edit-outline','el-icon-folder','el-icon-folder-opened','el-icon-folder-add','el-icon-folder-remove','el-icon-folder-delete','el-icon-folder-checked','el-icon-tickets','el-icon-document-remove','el-icon-document-delete','el-icon-document-copy','el-icon-document-checked','el-icon-document','el-icon-document-add','el-icon-printer','el-icon-paperclip','el-icon-takeaway-box','el-icon-search','el-icon-monitor','el-icon-attract','el-icon-mobile','el-icon-scissors','el-icon-umbrella','el-icon-headset','el-icon-brush','el-icon-mouse','el-icon-coordinate','el-icon-magic-stick','el-icon-reading','el-icon-data-line','el-icon-data-board','el-icon-pie-chart','el-icon-data-analysis','el-icon-collection-tag','el-icon-film','el-icon-suitcase','el-icon-suitcase-1','el-icon-receiving','el-icon-collection','el-icon-files','el-icon-notebook-1','el-icon-notebook-2','el-icon-toilet-paper','el-icon-office-building','el-icon-school','el-icon-table-lamp','el-icon-house','el-icon-no-smoking','el-icon-smoking','el-icon-shopping-cart-full','el-icon-shopping-cart-1','el-icon-shopping-cart-2','el-icon-shopping-bag-1','el-icon-shopping-bag-2','el-icon-sold-out','el-icon-sell','el-icon-present','el-icon-box','el-icon-bank-card','el-icon-money','el-icon-coin','el-icon-wallet','el-icon-discount','el-icon-price-tag','el-icon-news','el-icon-guide','el-icon-male','el-icon-female','el-icon-thumb','el-icon-cpu','el-icon-link','el-icon-connection','el-icon-open','el-icon-turn-off','el-icon-set-up','el-icon-chat-round','el-icon-chat-line-round','el-icon-chat-square','el-icon-chat-dot-round','el-icon-chat-dot-square','el-icon-chat-line-square','el-icon-message','el-icon-postcard','el-icon-position','el-icon-turn-off-microphone','el-icon-microphone','el-icon-close-notification','el-icon-bangzhu','el-icon-time','el-icon-odometer','el-icon-crop','el-icon-aim','el-icon-switch-button','el-icon-full-screen','el-icon-copy-document','el-icon-mic','el-icon-stopwatch','el-icon-medal-1','el-icon-medal','el-icon-trophy','el-icon-trophy-1','el-icon-first-aid-kit','el-icon-discover','el-icon-place','el-icon-location','el-icon-location-outline','el-icon-location-information','el-icon-add-location','el-icon-delete-location','el-icon-map-location','el-icon-alarm-clock','el-icon-timer','el-icon-watch-1','el-icon-watch','el-icon-lock','el-icon-unlock','el-icon-key','el-icon-service','el-icon-mobile-phone','el-icon-bicycle','el-icon-truck','el-icon-ship','el-icon-basketball','el-icon-football','el-icon-soccer','el-icon-baseball','el-icon-wind-power','el-icon-light-rain','el-icon-lightning','el-icon-heavy-rain','el-icon-sunrise','el-icon-sunrise-1','el-icon-sunset','el-icon-sunny','el-icon-cloudy','el-icon-partly-cloudy','el-icon-cloudy-and-sunny','el-icon-moon','el-icon-moon-night','el-icon-dish','el-icon-dish-1','el-icon-food','el-icon-chicken','el-icon-fork-spoon','el-icon-knife-fork','el-icon-burger','el-icon-tableware','el-icon-sugar','el-icon-dessert','el-icon-ice-cream','el-icon-hot-water','el-icon-water-cup','el-icon-coffee-cup','el-icon-cold-drink','el-icon-goblet','el-icon-goblet-full','el-icon-goblet-square','el-icon-goblet-square-full','el-icon-refrigerator','el-icon-grape','el-icon-watermelon','el-icon-cherry','el-icon-apple','el-icon-pear','el-icon-orange','el-icon-coffee','el-icon-ice-tea','el-icon-ice-drink','el-icon-milk-tea','el-icon-potato-strips','el-icon-lollipop','el-icon-ice-cream-square','el-icon-ice-cream-round']
        var html = [];
        html.push('<ul class="magicalcoder-extend-icons">')
        for(var i=0;i<iconArr.length;i++){
            html.push("<li><i class='"+iconArr[i]+"'></i></li>")
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
        '<title>element-由www.magicalcoder.com可视化布局器生成</title>',
        '<script type="text/javascript" src="assets/drag/js/user/iframe/element/2.10.1/components/import.js"></script>'
    ]
    //设置样式
    var style = [];
    for(var key in this.canvasStyle){
        style.push(key+":"+this.canvasStyle[key]);
    }
    var css = '\n<style>\n'+this.getCss()+'\n</style>\n';
    var head = '<head>'+source.join('\n')+css+'\n</head>\n';
    var body = '<body style="'+style.join(";").replace(/\"/g,"'")+'">\n'+this.realHtml(html)+'\n<script>\n'+this.getJavascript()+'\n</script>\n</body>\n';
    return {
        htmlBefore:"<!DOCTYPE html><html>\n<!--代码由www.magicalcoder.com可视化布局器拖拽生成 资源请自行下载到本地-->\n",
        head:head,
        body:body,
        htmlEnd:"\n</html>",
    }
}
