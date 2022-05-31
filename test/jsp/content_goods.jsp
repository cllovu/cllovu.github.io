<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>title</title>
<style type="text/css">
.img{width:100%;height:280px;}
</style>
<link rel="stylesheet" type="text/css" href="./css/succulent.css">
</head> 
<body>
<div class="layui-body">
<div class="layui-carousel" id="test1">
  <div carousel-item>
    <div> <img src="images/head.jpg" class="img" alt="">欢迎光临</div>
    <div> <img src="images/head.jpg" class="img" alt="">这是小店</div>
    <div> <img src="images/head.jpg" class="img" alt="">不晓得电</div>
    <div> <img src="images/head.jpg" class="img" alt="">少买点电</div>
    <div> <img src="images/head.jpg" class="img" alt="">啊什么电</div>
  </div>
</div>
<!-- 条目中可以是任意内容，如：<img src=""> -->

<script>
layui.use('carousel', function(){
  var carousel = layui.carousel;
  //建造实例
  carousel.render({
    elem: '#test1'
    ,width: '100%' //设置容器宽度
    ,arrow: 'always' //始终显示箭头
    //,anim: 'updown' //切换动画方式
  });
});
</script>

    
    <div class="border-radius">最新菜式</div>
    <div class="main">
        <div class="view">
            <img src="images/1.jpg" alt="">
            <div class="hover">
                <h3>多肉仙人掌</h3>
                <p>多肉植物防辐射 肉肉植物花卉绿植盆栽</p>
            </div>
        </div>
        <div class="view">
            <img src="images/7.jpg" alt="">
            <div class="hover">
                <h3>创意组合</h3>
                <p>多肉组合盆栽净化空气办公桌礼物套餐</p>
            </div>
        </div>
        <div class="view">
            <img src="images/3.jpg" alt="">
            <div class="hover">
                <h3>创意组合</h3>
                <p>多肉组合盆栽净化空气办公桌礼物套餐</p>
            </div>
        </div>
        <div class="view">
            <img src="images/4.jpg" alt="">
            <div class="hover">
                <h3>创意组合</h3>
                <p>多肉组合盆栽净化空气办公桌礼物套餐</p>
            </div>
        </div>
        <div class="view">
            <img src="images/5.jpg" alt="">
            <div class="hover">
                <h3>创意组合</h3>
                <p>多肉组合盆栽净化空气办公桌礼物套餐</p>
            </div>
        </div>
        <div class="view">
            <img src="images/6.jpg" alt="">
            <div class="hover">
                <h3>创意组合</h3>
                <p>多肉组合盆栽净化空气办公桌礼物套餐</p>
            </div>
        </div>
            <div class="view">
            <img src="images/2.jpg" alt="">
            <div class="hover">
                <h3>多肉仙人掌</h3>
                <p>多肉植物防辐射 肉肉植物花卉绿植盆栽</p>
            </div>
        </div>
        <div class="view">
            <img src="images/8.jpg" alt="">
            <div class="hover">
                <h3>创意组合</h3>
                <p>多肉组合盆栽净化空气办公桌礼物套餐</p>
            </div>
        </div>
    </div>
   
    <footer>
        <p>偏安一偶  静静生活</p>
        <div class="services">品质保障|七天无理由退换货|特色服务体验 </div>
    </footer>
   </div>
</body>
</html>