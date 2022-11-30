/*这个是iframeUi通用的功能 结尾 不用每个都写一份了*/
/*构造器*/
IframeUi.prototype.construct = function(){

}
/*注入变量前执行*/
IframeUi.prototype.preInject = function(SINGLETON){
    this.fastKey = SINGLETON.getFastKey();
    this.jsonFactory = SINGLETON.getJsonFactory();
    this.globalConstant = SINGLETON.getConstant();
    this.center = SINGLETON.getCenter();
    this.magicalApi = SINGLETON.getMagicalApi();
    if(this.globalConstant.defaultJavascript){
        this.defaultJavascript = this.globalConstant.defaultJavascript;
        this.javascript = this.defaultJavascript;
    }
}
/*vue的ui提供的各种操作脚本和变量的api*/
IframeUi.prototype.vueApi=function () {
    var _t = this;
    var api = {
        getWindow:function(){
            return window;
        },
        //设置vueData数据值
        setVueData:function(fieldName,filedValue){
            _t.vueData[fieldName]=filedValue;
        },
        removeVueData:function(fieldName){
            delete _t.vueData[fieldName];
        },
        getVueData:function(fieldName){
            if(fieldName){
                return _t.vueData[fieldName];
            }else{
                return _t.vueData;
            }
        },
        changeVueData:function(oldName,newName){
            if(typeof _t.vueData[oldName]!='undefined'){
                if(newName.indexOf(".")==-1){
                    _t.vueData[newName]=_t.vueData[oldName];
                }
                delete _t.vueData[oldName];
            }
        },
        //设置vueMethod数据值
        setVueMethod:function(functionName,functionContent){
            _t.vueMethod[functionName]=functionContent;
        },
        removeVueMethod:function(functionName){
            delete _t.vueMethod[functionName];
        },
        getVueMethod:function(functionName){
            return _t.vueMethod[functionName];
        },
        getResetVueMethod:function(){
            return {"focus":"function (e) {try {_t.fastKey._triggerClickElem(e);}catch(e) {}}"};
        },
        getAllVueMethod:function (){
            return _t.vueMethod;
        },
        //设置vueMounted数据值
        /**
         * @param mountedFunctionContent  'function(){...}'
         */
        setVueMounted:function(mountedFunctionContent){
            _t.vueMounted = mountedFunctionContent;
        },
        resetVueMounted:function(){
            _t.vueMounted='function(){}';
        },
        getVueMounted:function(){
            return _t.vueMounted;
        },
        resetAll:function(){
            _t.vueData = {};
            _t.vueMethod = this.getResetVueMethod();
            _t.vueMounted = 'function(){}';
        },
        /*脚本编辑器的数据统一跟page绑定 存一个地方*/
        setMagicalJsCodeDataValue:function (functionName,html,js) {
            _t.vueMethod[functionName]=js;//完美的结合一起
            _t.magicalJsCodeData[functionName] = html;
        },
        getMagicalJsCodeDataValue:function (functionName) {
            return _t.magicalJsCodeData[functionName];
        },
        changeMagicalJsCodeDataKey:function(oldFunctionName,newFunctionName){
            if(_t.vueMethod[oldFunctionName]){
                _t.vueMethod[newFunctionName]=_t.vueMethod[oldFunctionName];
                delete _t.vueMethod[oldFunctionName];
            }
            if(_t.magicalJsCodeData[oldFunctionName]){
                _t.magicalJsCodeData[newFunctionName] = _t.magicalJsCodeData[oldFunctionName];
                delete _t.magicalJsCodeData[oldFunctionName];
            }
        },
        removeMagicalJsCodeDataKey:function (functionName) {
            delete _t.magicalJsCodeData[functionName];
            delete _t.vueMethod[functionName];//同时删除方法变量
        }
    }
    return api;
}
/*jquery的ui提供的各种操作脚本和变量的api*/
IframeUi.prototype.jqueryApi = function(){
    var _t = this;
    var api = {
        getWindow:function(){
            return window;
        },
        //设置vueMethod数据值
        setVueMethod:function(functionName,functionContent){
            _t.vueMethod[functionName]=functionContent;
        },
        removeVueMethod:function(functionName){
            delete _t.vueMethod[functionName];
        },
        getVueMethod:function(functionName){
            return _t.vueMethod[functionName];
        },
        resetAll:function(){
            _t.vueMethod = {};
        },
        /*脚本编辑器的数据统一跟page绑定 存一个地方*/
        setMagicalJsCodeDataValue:function (functionName,html,js) {
            _t.vueMethod[functionName]=js;//完美的结合一起
            _t.magicalJsCodeData[functionName] = html;
        },
        getMagicalJsCodeDataValue:function (functionName) {
            return _t.magicalJsCodeData[functionName];
        },
        changeMagicalJsCodeDataKey:function(oldFunctionName,newFunctionName){
            if(_t.vueMethod[oldFunctionName]){
                _t.vueMethod[newFunctionName]=_t.vueMethod[oldFunctionName];
                delete _t.vueMethod[oldFunctionName];
            }
            if(_t.magicalJsCodeData[oldFunctionName]){
                _t.magicalJsCodeData[newFunctionName] = _t.magicalJsCodeData[oldFunctionName];
                delete _t.magicalJsCodeData[oldFunctionName];
            }
        },
        removeMagicalJsCodeDataKey:function (functionName) {
            delete _t.magicalJsCodeData[functionName];
            delete _t.vueMethod[functionName];//同时删除方法变量
        }
    }
    return api;
}
/*自动创建根节点*/
IframeUi.prototype.autoCreateRootDom = function(){
    return document.body;
}
/**
 * 自动创建样式结构
 * @returns {HTMLElement}
 */
IframeUi.prototype.autoCreateMagicalCss = function(){
    var cssName = "magicalCoderCss";
    var magicalCoderCss = document.getElementById(cssName);//存储样式的结构
    if(typeof magicalCoderCss == 'undefined' || magicalCoderCss == null){
        var head = document.getElementsByTagName("head")[0];
        var _style = document.createElement("style");
        _style.id=cssName;
        head.appendChild(_style);
    }
    return document.getElementById(cssName);
}
/*是否可以调试*/
IframeUi.prototype.setDebug = function(debug){
    this.debug = debug;
}
/*工具*/
IframeUi.prototype.util = function(){
    var _t  = this;
    var util = {
        pribuildFunction:function(data){
            var str = [];
            for(var key in data){
                str.push(key+" : "+data[key]);//就是拼接方法
            }
            return "{"+str.join(_t.splitStr)+"}";
        },
        searchRegChar:function (source,reg) {
            var result = []
            var exeChar
            while ((exeChar=reg.exec(source))!=null){
                result.push(exeChar)
            }
            return result;
        },
        removeClass:function (elem, str){
            var cName=elem.className;
            var arrClassName=cName.split(" ");
            var newArr=[ ];
            for(var i=0;i<arrClassName.length;i++){
                if(arrClassName[i]!=str){
                    newArr. push(arrClassName[i]);
                }
            }
            var str=newArr.join(" ");
            elem. className =str;
        }
    }
    return util;
}
//处理vue的v-model之类的绑定变量
IframeUi.prototype.dealVmodel = function(node){
    var bind = node.magicalCoder.bind;
    if(typeof bind!='undefined'){
        for(var variableName in bind){
            //默认的变量值 []
            var defaultVariableValue = bind[variableName];
            //用户配置的变量名 userName
            var userConfigVariableName = node.attributes[variableName];
            {//特殊处理来自特殊标签下的变量名 比如v-for
                if (variableName =='v-for'){
                    if(userConfigVariableName){
                        var reg = new RegExp("\\((.*),?(.*)\\)\\s+in\\s+(\\w+)");
                        if(reg.test(userConfigVariableName)){
                            reg.exec(userConfigVariableName);
                            userConfigVariableName = RegExp.$3;
                        }
                    }
                }
            }
            //自动放到vueData
            if(typeof userConfigVariableName !='undefined' && userConfigVariableName!=='' && isNaN(userConfigVariableName)){
                if(typeof this.vueData[userConfigVariableName]!='undefined'){//如果用户通过api设置过值 就不取默认值了
                    continue;
                }
                if(userConfigVariableName.indexOf(".")!=-1){//变量名带. 也不处理
                    continue;
                }
                this.vueData[userConfigVariableName] = defaultVariableValue;
                //根据用户配置的字段属性 修正一下最终的取值类型
                var dbTypePrefix = "mc-db-type-";//此变量对应的数据类型前缀
                var dbTypeAttrName = dbTypePrefix+variableName;//mc-db-type-v-model
                var dbTypeAttrValue = node.attributes[dbTypeAttrName];//str int ...
                if(dbTypeAttrValue!==''){
                    //{"str":"字符串","int":"整数","long":"长整数","decimal":"小数","bool":"真假","date":"日期","array":"数组"}
                    if(typeof defaultVariableValue!='object'){//数组暂时不用改
                        switch (dbTypeAttrValue) {
                            case 'str':
                                if(typeof defaultVariableValue!='string'){//只有当默认值类型与用户所选类型不匹配 才考虑用新默认值
                                    this.vueData[userConfigVariableName] = '""';
                                }
                                break;
                            case 'int':
                            case 'long':
                            case 'decimal':
                                if(typeof defaultVariableValue!='number') {
                                    this.vueData[userConfigVariableName] = "0";
                                }
                                break;
                            case 'bool':
                                if(typeof defaultVariableValue!='boolean'){
                                    this.vueData[userConfigVariableName] = "false";
                                }
                                break;
                        }
                    }
                }
            }
        }
    }
    var children = node.magicalCoder.children;
    for(var i=0;i<children.length;i++){
        this.dealVmodel(children[i]);
    }
}
IframeUi.prototype.realHtml=function(html){
    return html.replace(/(<div.*?>)([\s\S]*)<\/div>/,"$1<template>$2</template></div>");
}

/*设置css*/
IframeUi.prototype.setCss = function(css){
    if(css==null){
        css = this.defaultCss;
    }
    this.css = css;
}
IframeUi.prototype.getCss = function(){
    return this.css;
}
IframeUi.prototype.setMagicalJsCodeData = function(magicalJsCodeData){
    if(magicalJsCodeData==null){
        magicalJsCodeData = {};
    }
    if(typeof magicalJsCodeData == 'string'){
        magicalJsCodeData = JSON.parse(magicalJsCodeData);
    }
    this.magicalJsCodeData = magicalJsCodeData;
}
IframeUi.prototype.getMagicalJsCodeData = function(){
    return this.magicalJsCodeData;
}
IframeUi.prototype.setCanvasStyle = function (canvasStyle) {
    if(canvasStyle==null){
        canvasStyle = {};
    }
    if(typeof canvasStyle == 'string'){
        canvasStyle = JSON.parse(canvasStyle);
    }
    this.canvasStyle = canvasStyle;
    //设置样式
    var style = [];
    for(var key in canvasStyle){
        style.push(key+":"+canvasStyle[key]);
    }
    document.body.setAttribute("style",style.join(";"));
}
IframeUi.prototype.getCanvasStyle = function () {
    return this.canvasStyle;
}

IframeUi.prototype.setVueScript=function(javascript){
    if(javascript==null){//恢复一下默认脚本
        javascript = this.defaultJavascript;
    }
    this.api().resetAll();
    //分离 脚本中的变量
    //1 查找vueData
    var dataArr = this.util().searchRegChar(javascript,this.vueDataReg);
    if(dataArr.length>0){
        var vueDataArr = dataArr[0][1].split(this.splitStr);
        for(var i=0;i<vueDataArr.length;i++){
            var findArr = this.util().searchRegChar(vueDataArr[i],this.functionReg);
            if(findArr.length>0){
                this.api().setVueData(findArr[0][1],findArr[0][2]);
            }
        }
    }

    //2 查找vueMethod
    var methodsArr = this.util().searchRegChar(javascript,this.vueMethodReg);
    if(methodsArr.length>0){
        var vueMethodArr = methodsArr[0][1].split(this.splitStr);
        for(var i=0;i<vueMethodArr.length;i++){
            var findArr = this.util().searchRegChar(vueMethodArr[i],this.functionReg);
            if(findArr.length>0){
                this.api().setVueMethod(findArr[0][1],findArr[0][2]);
            }
        }
    }
    //3 查找vueMounted
    var mountedArr = this.util().searchRegChar(javascript,this.vueMountedReg);
    if(mountedArr.length>0){
        this.api().setVueMounted(mountedArr[0][1]);
    }

    this.javascript = javascript;
}
IframeUi.prototype.getVueScript=function(){
    /*自动获取当前结构的跟节点*/
    var root = this.jsonFactory.getRoot();
    this.dealVmodel(root);
    var mountedStr = (typeof this.vueMounted =='undefined') ? 'function(){}' : this.vueMounted;
    this.javascript = this.javascript.replace(this.vueDataReg,"var vueData = "+this.util().pribuildFunction(this.vueData)+";\nvar vueMethod");
    this.javascript = this.javascript.replace(this.vueMethodReg,"var vueMethod = "+this.util().pribuildFunction(this.vueMethod)+";\nvar vueMounted");
    this.javascript = this.javascript.replace(this.vueMountedReg,"var vueMounted = "+mountedStr+"\n/*注意以上代码由系统维护,非专业人士请勿修改*/");
    return this.javascript;
}
IframeUi.prototype.setJqueryScript=function(javascript){
    if(javascript==null){//恢复一下默认脚本
        javascript = this.defaultJavascript;
    }
    this.api().resetAll();
    //分离 脚本中的变量
    //2 查找vueMethod
    var methodsArr = this.util().searchRegChar(javascript,this.vueMethodReg);
    if(methodsArr.length>0){
        var vueMethodArr = methodsArr[0][1].split(this.splitStr);
        for(var i=0;i<vueMethodArr.length;i++){
            var findArr = this.util().searchRegChar(vueMethodArr[i],this.functionReg);
            if(findArr.length>0){
                this.api().setVueMethod(findArr[0][1],findArr[0][2]);
            }
        }
    }
    this.javascript = javascript;
}
IframeUi.prototype.getJqueryScript=function(){
    this.javascript = this.javascript.replace(this.vueMethodReg,"var vueMethod = "+this.util().pribuildFunction(this.vueMethod)+";\nvar vueMounted");
    return this.javascript;
}
/*截屏数据：返回promise对象,参考html2canvas*/
IframeUi.prototype.getScreenShotPromise = function(){
    return html2canvas(document.getElementById("magicalDragScene"));
}
IframeUi.prototype.__existIdentifier = function(identifier,prefixArr){
    for(var i=0;i<prefixArr.length;i++){
        if(new RegExp(prefixArr[i]).test(identifier)){
            return true;
        }
    }
    return false;
}
/*是否采用magicalCoder渲染模式：智能模式*/
IframeUi.prototype.useMagicalCoderRender = function(param){
    var triggerOperateNodes=param.trigger.triggerOperateNodes;
    var c = param.trigger.triggerChange;
    var prefixArr = param.globalConstant.settings.other.speed.magicalCoderRenderPrefixArray;
    if(param.globalConstant.settings.other.speed.magicalCoderRender){
        if(prefixArr && prefixArr.length>0){
            if(c=='delete' || c == 'cut' ){//删除,剪切 操作可能有多个
                if(triggerOperateNodes){
                    for(var i=0;i<triggerOperateNodes.length;i++){
                        var identifier = triggerOperateNodes[i].magicalCoder.identifier;
                        if(!this.__existIdentifier(identifier,prefixArr)){
                            return false;
                        }
                    }
                    return true;
                }
            }else if(c=='slideToggle'){
                return true;
            }else if(c =='changeAttr' || c=='centerDrop' || c == 'leftDrop' || c=='changeStyles'|| c=='changeStyle' ||c=='duplicate' || c == 'paste'){
                 var focusNodes = this.magicalApi.getFocusNodes();
                 if(focusNodes && focusNodes.length>0){
                      for(var n=0;n<focusNodes.length;n++){//有一个组件不再动态渲染范畴内就不智能渲染
                            var focusNode = focusNodes[n];
                            var identifier = focusNode.magicalCoder.identifier;
                            if(!this.__existIdentifier(identifier,prefixArr)){
                                return false;
                            }
                      }
                      return true;
                 }
            }
        }
    }
    return false;
}
/*局部渲染magicalCoder的组件*/
IframeUi.prototype.magicalCoderComponentsRender=function (param) {
    var c = param.trigger.triggerChange
    var triggerOperateNodes=param.trigger.triggerOperateNodes;
    if(c == 'delete' || c == 'cut'){//删除 剪切
        if(triggerOperateNodes){
            for(var i=0;i<triggerOperateNodes.length;i++){
                var elem = this.magicalApi.getElemByMagicalCoderId({id:triggerOperateNodes[i].magicalCoder.id});
                if(elem&&elem.length>0){
                    elem.remove();
                }
            }
        }
        return;
    }else if(c == 'slideToggle'){//reload一下echarts组件
        new IframeComponents().execute({action:"resize"});//自适应大小
        return;
    }else if(c == 'leftDrop'){//左侧往中间放
         originElem = $("#magicalDragScene").find(".magicalcoder-page-drag-item-label");
         var focusNode = this.magicalApi.getFocusNode();
         var html = focusNode!=null ? this.magicalApi.nodeToHtml({node:focusNode,pure:true}):"";
         originElem.replaceWith(html);
     }else if(c == 'duplicate'|| c=='paste'){//向下复制 粘贴
         if(triggerOperateNodes){
             for(var i=0;i<triggerOperateNodes.length;i++){
                var originNode = triggerOperateNodes[i];
                var parentId = originNode.magicalCoder.parentId;
                var parentElem = this.magicalApi.getElemByMagicalCoderId({id:parentId});
                if(parentElem.length>0){//把html暂时追加到父亲节点内
                    var html = originNode!=null ? this.magicalApi.nodeToHtml({node:originNode,pure:true}):"";
                    parentElem.append(html);
                }
             }
         }
     }else{//其他场景
        var focusNodes = this.magicalApi.getFocusNodes();
        for(var i=0;i<focusNodes.length;i++){
            var focusNode =focusNodes[i];
            var html = focusNode!=null ? this.magicalApi.nodeToHtml({node:focusNode,pure:true}):"";
            var originElem = this.magicalApi.getElemByMagicalCoderId({id:focusNode.magicalCoder.id});
            originElem.replaceWith(html);
        }
    }
    //执行js
    new IframeComponents().execute({action:"hotfixRefresh"});//热更新
}

var MAGICAL_CODER_API = null;
/*给父窗口调用 初始化一个实例*/
window.onload = function () {
    //必须放置onload里 否则iframe的body可能未加载出来 布局器就认为加载完毕
    window.iframeUi = new IframeUi();
    //打开icon面板
    window.iframeUi.iconList();
    MAGICAL_CODER_API = window.iframeUi.magicalApi;
    window.MAGICAL_CODER_API = MAGICAL_CODER_API;
}
