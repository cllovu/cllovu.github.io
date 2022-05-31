<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>title</title>
  <link rel='stylesheet' href='./layui/css/layui.css'>
</head> 
<body> 
 
     
      <div class="layui-header">
        <div class="layui-logo">在线订餐系统</div>
        <!-- 头部区域（可配合layui已有的水平导航） -->
        <ul class="layui-nav layui-layout-left">
          <li class="layui-nav-item"><a href="demo_control.jsp">控制台</a></li>
          <li class="layui-nav-item"><a href="demo_goods.jsp">商品管理</a></li>
          <li class="layui-nav-item"><a href="demo_user.jsp">用户</a></li>
          <li class="layui-nav-item">
            <a href="javascript:;">其它系统</a>
            <dl class="layui-nav-child">
              <dd><a href="">邮件管理</a></dd>
              <dd><a href="">消息管理</a></dd>
              <dd><a href="">授权管理</a></dd>
            </dl>
          </li>
        </ul>
        <ul class="layui-nav layui-layout-right">
          <li class="layui-nav-item">
            <a href="javascript:;">
              <img src="#" class="layui-nav-img" />
              个人
            </a>
            <dl class="layui-nav-child">
              <dd><a href="">基本资料</a></dd>
              <dd><a href="">安全设置</a></dd>
            </dl>
          </li>
          <li class="layui-nav-item"><a href="">退了</a></li>
        </ul>
      </div>
 
</body>
<script>
      //JavaScript代码区域
      layui.use('element', function() {
        var element = layui.element
      })
    </script>
<!-- partial -->
  <script src='./layui/layui.js'></script>
</html>