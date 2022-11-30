function McTools() {

}
/*左右的tabs*/
McTools.prototype.leftRightTabsHtml = function (param) {
    var container = param.elem;
    var titles = param.titles;//[{html:""}]
    var contents = param.contents;//[{html:""}]
    var html = ["<div class='mc-tools-left-tabs'>"];
    var ul = ["<ul class='mc-tools-left-tabs-titles'>"];
    for(var i=0;i<titles.length;i++){
        var active = "";
        if(i==0){
            active=" class='active'";
        }
        ul.push("<li"+active+">"+titles[i].html+"</li>")
    }
    ul.push("</ul>")
    var contentHtml = ["<div class='mc-tools-left-tabs-contents'>"];
    for(var i=0;i<contents.length;i++){
        var active = "";
        if(i==0){
            active=" class='active'";
        }
        contentHtml.push("<div"+active+">"+contents[i].html+"</div>");
    }
    contentHtml.push("</div>")
    html.push(ul.join(""));
    html.push(contentHtml.join(""))
    html.push("</div>")
    container.html(html.join(""));
    //事件
    container.find(".mc-tools-left-tabs-titles>li").click(function () {
        var index = $(this).index();
        container.find(".mc-tools-left-tabs-titles>li").removeClass("active");
        $(this).addClass("active");
        container.find(".mc-tools-left-tabs-contents>div").removeClass("active");
        container.find(".mc-tools-left-tabs-contents>div").eq(index).addClass("active");
    })

}
