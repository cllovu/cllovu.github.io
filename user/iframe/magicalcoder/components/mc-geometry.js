/*几何图形*/
function McGeometry(){
    //___mcUtils参考mc-utils.js
    this.mcUtils = ___mcUtils;
}
/*务必带此render方法：否则组件不会被追踪渲染*/
McGeometry.prototype.render = function(param){
    if(param && param.action=='resize'){
        return;
    }
    this.param = param;
    //圆形
    this.circular();
    //3角形
    this.triangle();
    //6边型
    this.hexagon();
    //圆角矩形
    this.rectwyl();
    //标签
    this.pathwyl();
    //坐标
    this.path2wyl();
    //正方形
    this.square();
    //梯形
    this.trapezoid();
    //平行四边形
    this.parallelogram();
    // X形
    this.xshape()
    // 对话框
    this.dialog()
    //心形
    this.heart()
    //8边形
    this.octagon();
    //12边形
    this.dodecagonal();
    //左箭头
    this.leftArrow();
    // 五角星形
    this.pentacle();
    // 十字架形
    this.cross();
    // 对话框形
    this.dialog();
}
McGeometry.prototype.commonAttrsHtml = function(node){
    var fill = this.mcUtils.attr(node,"fill");
    var strokeWidth = this.mcUtils.attr(node,"stroke-width");
    var stroke = this.mcUtils.attr(node,"stroke");
    return " fill=\""+fill+"\" stroke-width=\""+strokeWidth+"\" stroke=\""+stroke+"\" ";
}

McGeometry.prototype.commonAttrsViewBoxX = function(node){
    var strokeWidth = this.mcUtils.attr(node,"stroke-width");
    if(strokeWidth){
        strokeWidth = parseInt(strokeWidth);
    }else{
        strokeWidth = 0;
    }
    var rx = 0 - strokeWidth;
    return rx;
}

McGeometry.prototype.commonAttrsViewBoxY = function(node){
    var strokeWidth = this.mcUtils.attr(node,"stroke-width");
    if(strokeWidth){
        strokeWidth = parseInt(strokeWidth);
    }else{
        strokeWidth = 0;
    }
    var ry = 100 + strokeWidth * 2;
    return ry;
}

McGeometry.prototype.circular = function(){
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-circular");
    for(var i=0;i<nodes.length;i++){
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        this.mcUtils.css(elem,"filter","blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        var strokeWidth = this.mcUtils.attr(elem,"stroke-width");
        if(strokeWidth){
            strokeWidth = parseInt(strokeWidth);
        }else{
            strokeWidth = 0;
        }
        var rx = 50 - strokeWidth;
        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 100" style="margin: 0px;"><g transform="translate(0 0)"><g><svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox="0,0,100,100" opacity="1"><defs></defs><ellipse rx="'+rx+'" ry="'+rx+'" cx="50" cy="50" '+ attrsHtml +' "></ellipse></svg></g></g></svg>')
    }
}
McGeometry.prototype.triangle = function(){
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-triangle");
    for(var i=0;i<nodes.length;i++){
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        var rx = this.commonAttrsViewBoxX(elem);
        var ry = this.commonAttrsViewBoxY(elem);
        this.mcUtils.css(elem,"filter","blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" style="margin: 0px;"><g transform="translate(0 0)"><g id="_6045df20c2fb0f001047f398"><svg id="SvgjsSvg1882" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" opacity="1"><defs id="SvgjsDefs1883"></defs><polygon id="SvgjsPolygon1884" points="50,0 0,100 100,100" '+attrsHtml+'></polygon></svg></g></g></svg>')
    }
}
McGeometry.prototype.hexagon = function(){
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-hexagon");
    for(var i=0;i<nodes.length;i++){
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        var rx = this.commonAttrsViewBoxX(elem);
        var ry = this.commonAttrsViewBoxY(elem);
        this.mcUtils.css(elem,"filter","blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" style="margin: 0px;"><g transform="translate(0 0)"><g id="_604a2bd83ac89c0010ed6f5c"><svg id="SvgjsSvg1657" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" opacity="1"><defs id="SvgjsDefs1658"></defs><polygon id="SvgjsPolygon1659" points="50,0 80,10 100,35 100,70 80,90 50,100 20,90 0,70 0,35 20,10" '+attrsHtml+'></polygon></svg></g></g></svg>')
//        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0,0,168,169" style="margin: 0px;" class=""><g transform="translate(0 0)"><g><svg width="168" height="169" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox="0,0,168,169" opacity="1" ><defs></defs> <polygon points="84,0 134.4,16.900000000000002 168,59.15 168,118.3 134.4,152.1 84,169 33.6,152.1 0,118.3 0,59.15 33.6,16.900000000000002" '+attrsHtml+'></polygon></svg></g></g></svg>')
    }
}

McGeometry.prototype.rectwyl = function(){
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-rectwyl");
    for(var i=0;i<nodes.length;i++){
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        var rx = this.commonAttrsViewBoxX(elem);
        var ry = this.commonAttrsViewBoxY(elem);
        this.mcUtils.css(elem,"filter","blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" style="margin: 0px;"><g transform="translate(0 0)"><g id="_6049716a3ac89c0010ed614d"><svg id="SvgjsSvg1012" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" opacity="1"><defs id="SvgjsDefs1013"></defs><rect id="SvgjsRect1014" width="100" height="100" rx="30" ry="30"  '+ attrsHtml +' ></rect></svg></g></g></svg>')
    }
}

McGeometry.prototype.pathwyl = function(){
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-pathwyl");
    for(var i=0;i<nodes.length;i++){
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
//        var rx = this.commonAttrsViewBoxX(elem);
//        var ry = this.commonAttrsViewBoxY(elem);
        this.mcUtils.css(elem,"filter","blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0,0,100,100" style="margin: 0px;"><g transform="translate(0 0)"><g id="_60497b1f3ac89c0010ed6201"><svg id="SvgjsSvg1022" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox="0,0,100,100" opacity="1"><defs id="SvgjsDefs1023"></defs><path id="SvgjsPath1024" d="M290.17945 125.041878M376.757295 499.17695C309.914934 498.953869 255.567142 444.326714 255.86697099999998 377.665479C256.16475299999996 311.063595 310.447054 257.157871 377.08986999999996 257.277598C444.41523099999995 257.40346500000004 498.123457 311.669392 497.812372 379.25058C497.509473 445.318298 442.92018 499.393891 376.757295 499.17695L376.757295 499.17695ZM376.737852 438.488753C410.148799 438.59108399999997 437.41990999999996 411.48984199999995 437.454702 378.160759C437.490518 345.138668 410.406673 317.879837 377.425514 317.736575C343.912236 317.594335 316.721967 344.348676 316.391439 377.790323C316.068074 410.956699 343.338161 438.382329 376.737852 438.488753L376.737852 438.488753ZM376.737852 438.488753M928.817686 524.408611C798.773887 394.33309 668.763858 264.224824 538.56861 134.299729C522.063704 117.83575600000002 506.08887100000004 100.97269300000002 486.844575 87.103824C466.80517000000003 72.66702000000001 445.99930800000004 64.283072 421.411307 64.397683C377.72431900000004 64.607461 334.039377 64.458058 290.35341200000005 64.458058C290.35341200000005 64.470338 290.35341200000005 64.48875699999999 290.34727200000003 64.50513C244.78558700000002 64.50513 199.214692 64.10604099999999 153.65710000000004 64.61359999999999C102.62789000000004 65.181535 63.58364200000004 105.06796399999999 63.52326700000005 156.092058C63.42912300000005 246.381434 63.44549600000005 336.677973 63.59489800000004 426.971442C63.608201000000044 434.011789 64.44628900000005 441.172885 65.92087300000004 448.06178300000005C71.25536800000005 472.95882300000005 86.46886100000005 492.69328300000006 103.53044600000004 509.86436100000003C243.61697100000004 650.857536 384.29496800000004 791.2674260000001 524.9494280000001 931.700852C562.0401840000002 968.725094 623.4211600000001 968.4784770000001 660.5620590000001 931.408186C750.5096510000001 841.63865 840.3866340000001 751.794412 930.0241640000002 661.706628C937.1238620000001 654.5793 943.3005390000002 645.948736 947.8337850000001 636.9661540000001C966.804858 599.405699 958.935634 554.523489 928.817686 524.408611ZM874.813724 611.651604C809.002856 676.7471810000001 742.5135359999999 743.328599 678.212044 807.717072C655.433248 830.5255440000001 632.654452 853.335039 609.860306 876.1271380000001C604.481809 881.5056350000001 598.497514 884.3473570000001 592.5510820000001 884.3473570000001C586.6721880000001 884.3473570000001 580.7748740000001 881.5568010000001 575.496661 876.2785880000001L500.71344400000004 801.5066270000001C388.639926 689.454598 272.750499 573.58973 158.95885 459.452203C151.687236 452.160123 145.48804700000002 442.494996 140.01949900000002 433.967785C139.28374200000002 432.819635 138.53058800000002 430.01373 138.52444900000003 426.887529C138.33411400000003 347.59971799999994 138.29727500000004 261.55296999999996 138.40983900000003 156.09000999999995C138.42007200000003 145.64409999999995 144.85462100000004 139.63217599999996 156.06289400000003 139.59431399999994C170.70742900000002 139.54212499999994 186.66793600000003 139.51858899999993 206.29494900000003 139.51858899999993C217.13790100000003 139.51858899999993 227.98290100000003 139.52575199999993 238.82790000000003 139.53291499999995C249.678016 139.54007799999994 260.527108 139.54724099999996 271.37313 139.54724099999996L290.17945100000003 139.54724099999996C302.119388 139.54724099999996 314.05830100000003 139.55645099999995 325.99721500000004 139.56566099999995C337.94329200000004 139.57487099999994 349.890391 139.58510399999994 361.836468 139.58510399999994C385.173989 139.58510399999994 404.06319800000006 139.54621799999995 421.28134800000004 139.46537699999993L421.43279700000005 139.46537699999993C428.00139900000005 139.46537699999993 433.36045400000006 141.56417799999994 441.2030730000001 147.20975799999994C464.58152600000005 164.02779499999994 484.1399780000001 184.50517599999995 504.8465790000001 206.18391799999995C512.559238 214.25882699999994 520.5338630000001 222.60900599999994 528.652774 230.66856499999994L701.073728 402.674059C757.958296 459.56579 816.77896 518.392594 874.86182 576.041572C879.352088 580.49807 881.9236559999999 586.983785 881.91854 593.836867C881.913423 600.696088 879.323435 607.188966 874.813724 611.651604Z " transform="scale(0.09765625 0.09765625)" '+ attrsHtml +'></path></svg></g></g></svg>')
    }
}
McGeometry.prototype.path2wyl = function(){
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-path2wyl");
    for(var i=0;i<nodes.length;i++){
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
//        var rx = this.commonAttrsViewBoxX(elem);
//        var ry = this.commonAttrsViewBoxY(elem);
        this.mcUtils.css(elem,"filter","blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0,0,100,100" style="margin: 0px;"><g transform="translate(0 0)"><g id="_60497dd83ac89c0010ed6210"><svg id="SvgjsSvg1091" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox="0,0,100,100" opacity="1"><defs id="SvgjsDefs1092"></defs><path id="SvgjsPath1093" d="M511.999488 64.303538C355.462292 64.303538 228.56516 191.201693 228.56516 347.737866C228.56516 395.36356 240.45393099999998 440.160835 261.201465 479.576543L261.09811099999996 479.62770800000004L512.000511 959.696461L759.8012699999999 485.163794C782.456246 444.453604 795.4348379999999 397.62915799999996 795.4348379999999 347.737865C795.433816 191.201693 668.536684 64.303538 511.999488 64.303538ZM511.999488 445.800275C463.863164 445.800275 424.82300999999995 406.76012000000003 424.82300999999995 358.589004C424.82300999999995 310.45268 463.863165 271.41252599999996 511.99948799999993 271.41252599999996C560.1695809999999 271.41252599999996 599.2107589999999 310.452681 599.2107589999999 358.58900399999993C599.209736 406.759097 560.169581 445.800275 511.999488 445.800275Z " transform="scale(0.09765625 0.09765625)"  '+ attrsHtml +' ></path></svg></g></g></svg>')
    }
}
McGeometry.prototype.square = function(){
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-square");
    for(var i=0;i<nodes.length;i++){
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        var rx = this.commonAttrsViewBoxX(elem);
        var ry = this.commonAttrsViewBoxY(elem);
        this.mcUtils.css(elem,"filter","blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" style="margin: 0px;"><g transform="translate(0 0)"><g id="_604a0fc03ac89c0010ed6e57"><svg id="SvgjsSvg1480" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" opacity="1"><defs id="SvgjsDefs1481"></defs><polygon id="SvgjsPolygon1482" points="0,0 100,0 100,100 0,100"  '+attrsHtml+'></polygon></svg></g></g></svg>')
    }
}
McGeometry.prototype.trapezoid = function(){
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-trapezoid");
    for(var i=0;i<nodes.length;i++){
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        var rx = this.commonAttrsViewBoxX(elem);
        var ry = this.commonAttrsViewBoxY(elem);
        this.mcUtils.css(elem,"filter","blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" style="margin: 0px;"><g transform="translate(0 0)"><g id="_604a0fdf3ac89c0010ed6e58"><svg id="SvgjsSvg1504" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" opacity="1"><defs id="SvgjsDefs1505"></defs><polygon id="SvgjsPolygon1506" points="20,0 80,0 100,100 0,100"  '+attrsHtml+'></polygon></svg></g></g></svg>')
    }
}
McGeometry.prototype.parallelogram = function(){
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-parallelogram");
    for(var i=0;i<nodes.length;i++){
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        var rx = this.commonAttrsViewBoxX(elem);
        var ry = this.commonAttrsViewBoxY(elem);
        this.mcUtils.css(elem,"filter","blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" style="margin: 0px;"><g transform="translate(0 0)"><g id="_604a0cfd3ac89c0010ed6e33"><svg id="SvgjsSvg1456" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none"  viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'"  opacity="1"><defs id="SvgjsDefs1457"></defs><polygon id="SvgjsPolygon1458" points="25,0 100,0 75,100 0,100"  '+attrsHtml+'></polygon></svg></g></g></svg>')
    }
}
McGeometry.prototype.xshape = function () {
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-xshape");
    for (var i = 0; i < nodes.length; i++) {
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        var rx = this.commonAttrsViewBoxX(elem);
        var ry = this.commonAttrsViewBoxY(elem);
        this.mcUtils.css(elem, "filter", "blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem, '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0,0,100,100" style="margin: 0px;"><g transform="translate(0 0)"><g id="_6048242a3ac89c0010ed49ff"><svg id="SvgjsSvg1408" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox="0,0,100,100" opacity="1"><defs id="SvgjsDefs1409"></defs><polygon id="SvgjsPolygon1410" points="20,0 0,20 30,50 0,80 20,100 50,70 80,100 100,80 70,50 100,20 80,0 50,30" ' + attrsHtml + ' fill="rgba(205,31,78,1)" stroke-width="0" stroke="rgba(213,32,81,1)"></polygon></svg></g></g></svg>')
    }
}
McGeometry.prototype.dialog = function () {
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-dialog");
    for (var i = 0; i < nodes.length; i++) {
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        this.mcUtils.css(elem, "filter", "blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem, '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0,0,100,100" style="margin: 0px;"><g transform="translate(0 0)"><g id="_604832493ac89c0010ed4b10"><svg id="SvgjsSvg1594" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox="0,0,100,100" opacity="1"><defs id="SvgjsDefs1595"></defs><path id="SvgjsPath1596" d="M361.16569 895.704009C351.078961 895.704009 342.097402 891.564735 335.870584 884.035248C330.449108 877.484042 324.796364 865.4100520000001 328.680835 844.976674L347.94969100000003 742.972489C348.91262200000006 737.876424 347.95992400000006 733.200938 345.273745 729.9601269999999C342.695013 726.8462059999999 338.748121 725.112726 333.86183400000004 725.112726L140.466172 725.112726C105.17336499999999 725.112726 79.56512699999999 698.306197 79.56512699999999 661.1028769999999L79.565127 171.491793C79.565127 136.380111 103.465467 113.805976 140.466172 113.805976L910.3229610000001 113.805976C949.0827300000001 113.805976 974.9181410000001 136.9153 974.9181410000001 171.491793L974.9181410000001 661.101853C974.9181410000001 697.087439 946.661587 725.111702 910.3229610000001 725.111702L656.142911 725.111702C636.947733 725.111702 605.579305 735.291552 589.004815 746.7679310000001L390.379035 885.120976C380.288213 892.118344 370.475729 895.704009 361.16569 895.704009L361.16569 895.704009Z " ' + attrsHtml + ' transform="scale(0.09765625 0.09765625)" stroke-width="0" stroke="rgba(213,32,81,1)" fill="rgba(205,31,78,1)"></path></svg></g></g></svg>')
    }
}
McGeometry.prototype.heart = function () {
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-heart");
    for (var i = 0; i < nodes.length; i++) {
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        this.mcUtils.css(elem, "filter", "blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem, '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0,0,100,100" style="margin: 0px;"><g transform="translate(0 0)"><g id="_6048470b3ac89c0010ed4d89"><svg id="SvgjsSvg1636" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox="0,0,100,100" opacity="1"><defs id="SvgjsDefs1637"></defs><path id="SvgjsPath1638" d="M750.155587 103.522772C641.959376 103.522772 549.403377 170.468487 511.632122 265.191848C473.86188999999996 170.46848599999998 381.30896099999995 103.522772 273.11070399999994 103.522772C131.34186299999993 103.522772 16.41639099999992 218.44926800000002 16.41639099999992 360.217085C16.41639099999992 440.096367 53.52863699999992 510.00046 110.11849299999992 561.801243L511.6331459999999 953.4184789999999L756.1982109999999 718.152198C796.2094829999999 681.730684 833.6133719999999 645.938503 866.3806589999999 612.158142L912.5788409999999 567.715954C969.6465809999999 516.000105 1006.850925 440.358334 1006.850925 360.217086C1006.850923 218.448244 891.924427 103.522772 750.155587 103.522772Z " ' + attrsHtml + ' transform="scale(0.09765625 0.09765625)" stroke-width="0" stroke="rgba(213,32,81,1)" fill="rgba(205,31,78,1)"></path></svg></g></g></svg>')
    }
}
McGeometry.prototype.octagon = function(){
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-octagon");
    for(var i=0;i<nodes.length;i++){
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        var rx = this.commonAttrsViewBoxX(elem);
        var ry = this.commonAttrsViewBoxY(elem);
        this.mcUtils.css(elem,"filter","blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="'+ rx + ',' + rx + ',' + ry + ',' + ry +'" style="margin: 0px;"><g transform="translate(0 0)"><g id="_604787e33ac89c0010ed4782"><svg id="SvgjsSvg1453" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox="'+ rx + ',' + rx + ',' + ry + ',' + ry +'" opacity="1"><defs id="SvgjsDefs1454"></defs><polygon id="SvgjsPolygon1455" points="20,0 80,0 100,20 100,80 80,100 20,100 0,80 0,20" '+attrsHtml+'></polygon></svg></g></g></svg>')
    }
}
McGeometry.prototype.dodecagonal = function(){
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-dodecagonal");
    for(var i=0;i<nodes.length;i++){
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        var rx = this.commonAttrsViewBoxX(elem);
        var ry = this.commonAttrsViewBoxY(elem);
        this.mcUtils.css(elem,"filter","blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="'+ rx + ',' + rx + ',' + ry + ',' + ry +'" style="margin: 0px;"><g transform="translate(0 0)"><g id="_6047896a3ac89c0010ed479c"><svg id="SvgjsSvg1519" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox="'+ rx + ',' + rx + ',' + ry + ',' + ry +'" opacity="1"><defs id="SvgjsDefs1520"></defs><polygon id="SvgjsPolygon1521" points="0,15 15,15 15,0 85,0 85,15 100,15 100,85 85,85 85,100 15,100 15,85 0,85" '+attrsHtml+'></polygon></svg></g></g></svg>')
    }
}

McGeometry.prototype.leftArrow = function(){
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-leftarrow");
    for(var i=0;i<nodes.length;i++){
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        var rx = this.commonAttrsViewBoxX(elem);
        var ry = this.commonAttrsViewBoxY(elem);
        this.mcUtils.css(elem,"filter","blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="'+ rx + ',' + rx + ',' + ry + ',' + ry +'" style="margin: 0px;"><g transform="translate(0 0)"><g id="_604784633ac89c0010ed477c"><svg id="SvgjsSvg1447" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox="'+ rx + ',' + rx + ',' + ry + ',' + ry +'" opacity="1"><defs id="SvgjsDefs1448"></defs><polygon id="SvgjsPolygon1449" points="40,0 40,20 100,20 100,80 40,80 40,100 0,50" '+attrsHtml+'></polygon></svg></g></g></svg>')
    }
}
McGeometry.prototype.pentacle = function(){
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-pentacle");
    for(var i=0;i<nodes.length;i++){
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        var rx = this.commonAttrsViewBoxX(elem);
        var ry = this.commonAttrsViewBoxY(elem);
        this.mcUtils.css(elem,"filter","blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" style="margin: 0px;"><g transform="translate(0 0)"><g id="_604acfa83ac89c0010ed7284"><svg id="SvgjsSvg1408" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" opacity="1"><defs id="SvgjsDefs1409"></defs><polygon id="SvgjsPolygon1410" points="50,0 61,35 98,35 68,56.99999999999999 79,91 50,70 21,91 32,56.99999999999999 2,35 39,35" '+attrsHtml+'></polygon></svg></g></g></svg>')
    }
}
McGeometry.prototype.cross = function(){
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-cross");
    for(var i=0;i<nodes.length;i++){
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        var rx = this.commonAttrsViewBoxX(elem);
        var ry = this.commonAttrsViewBoxY(elem);
        this.mcUtils.css(elem,"filter","blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" style="margin: 0px;"><g transform="translate(0 0)"><g id="_604acfa83ac89c0010ed7284"><svg id="SvgjsSvg1408" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" opacity="1"><defs id="SvgjsDefs1409"></defs><polygon id="SvgjsPolygon1410" points="10,25 35,25 35,0 65,0 65,25 90,25 90,50 65,50 65,100 35,100 35,50 10,50" '+attrsHtml+'></polygon></svg></g></g></svg>')
    }
}
McGeometry.prototype.dialog = function(){
    var nodes = this.mcUtils.findNeedDealerElements(this.param,"mc-ui-geometry-dialog");
    for(var i=0;i<nodes.length;i++){
        var elem = nodes[i];
        var attrsHtml = this.commonAttrsHtml(elem);
        var rx = this.commonAttrsViewBoxX(elem);
        var ry = this.commonAttrsViewBoxY(elem);
        this.mcUtils.css(elem,"filter","blur(0px) drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px);");
        this.mcUtils.html(elem,'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" style="margin: 0px;"><g transform="translate(0 0)"><g id="_604acfa83ac89c0010ed7284"><svg id="SvgjsSvg1408" width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox=" '+ rx + ',' + rx + ',' + ry + ',' + ry +'" opacity="1"><defs id="SvgjsDefs1409"></defs><polygon id="SvgjsPolygon1410" points="0,0 100,0 100,75 75,75 75,100 50,75 0,75" '+attrsHtml+'></polygon></svg></g></g></svg>')
    }
}
/*把组件安装一下*/
___mcUtils.install({component:new McGeometry()})
