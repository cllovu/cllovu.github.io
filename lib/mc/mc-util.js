function McUtil(){
    /*是否格式化html*/
    this.formatHtml=false;
}
/**/
McUtil.prototype.nodesToHtml = function (nodes,htmlWithMagicalCoderAttr) {
    var htmlArr = [];
    var defaultCengJi = 1;
    if(nodes){
        for(var i=0;i<nodes.length;i++){
            if(nodes[i]){
                this.nodeToHtml(htmlArr,null,nodes[i],htmlWithMagicalCoderAttr,defaultCengJi,_t.formatHtml);
            }
        }
    }
    if(htmlArr.length>0 && htmlArr[0]=='\n'){
        htmlArr[0]='';
    }
    return htmlArr.join("");
}
McUtil.prototype.priTabStr = function(cengJi){
    var sb = [];
    for(var i=1;i<cengJi;i++){
        sb.push("\t");
    }
    return sb.join('');
}
McUtil.prototype.nodeToHtml = function (htmlArr,parentNode,node,htmlWithMagicalCoderAttr,cengJi,format) {
    if(format){
        var children = node.magicalCoder.children;
        var hasChildren = children.length>0;
        var nodeType = node.magicalCoder.nodeType;
        var tabStr=format?this.priTabStr(cengJi):"";
        var startTagHtml = this.nodeToStartTag(parentNode,node,htmlWithMagicalCoderAttr);
        if(nodeType==_t.constants.nodeType.text){
            htmlArr.push(startTagHtml);
        }else {
            htmlArr.push("\n");
            htmlArr.push(tabStr);
            htmlArr.push(startTagHtml);
        }
        this.priAddNetLineHtml(htmlArr,node,htmlWithMagicalCoderAttr);
        if(children.length>0){
            for(var i=0;i<children.length;i++){
                this.nodeToHtml(htmlArr,node,children[i],htmlWithMagicalCoderAttr,cengJi+1,format);
            }
        }

        var endTagHtml = this.nodeToEndTag(parentNode,node,htmlWithMagicalCoderAttr);
        if(nodeType==_t.constants.nodeType.text){

        }else {
            if(hasChildren){
                //是不是就一个文本孩子
                if(children.length==1){
                    if(children[0].magicalCoder.nodeType == _t.constants.nodeType.text){
                        htmlArr.push(endTagHtml);
                    }else {
                        htmlArr.push("\n");
                        htmlArr.push(tabStr);
                        htmlArr.push(endTagHtml);
                    }
                }else {
                    htmlArr.push("\n");
                    htmlArr.push(tabStr);
                    htmlArr.push(endTagHtml);
                }
            }else {
                htmlArr.push(endTagHtml);
            }
        }
    }else {
        htmlArr.push(this.nodeToStartTag(parentNode,node,htmlWithMagicalCoderAttr));
        this.priAddNetLineHtml(htmlArr,node,htmlWithMagicalCoderAttr);
        var children = node.magicalCoder.children;
        if(children.length>0){
            for(var i=0;i<children.length;i++){
                this.nodeToHtml(htmlArr,node,children[i],htmlWithMagicalCoderAttr,cengJi+1,format);
            }
        }
        htmlArr.push(this.nodeToEndTag(parentNode,node,htmlWithMagicalCoderAttr));
    }
}
