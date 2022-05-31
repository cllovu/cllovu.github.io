<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>title</title>
</head> 
<body> 
<div class="layui-layout">

      <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
          <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
          <ul class="layui-nav layui-nav-tree" >
            <li class="layui-nav-item ">
              <a href="javascript:;">菜单</a>
              <dl class="layui-nav-child">
                <dd><a href="javascript:;">菜品</a></dd>
                <dd><a href="javascript:;">主食</a></dd>
                <dd><a href="javascript:;">饮料</a></dd>
                <dd><a href="">其他</a></dd>
              </dl>
            </li>
            <li class="layui-nav-item">
              <a href="javascript:;">其他</a>
              <dl class="layui-nav-child">
                <dd><a href="javascript:;">列表一</a></dd>
                <dd><a href="javascript:;">列表二</a></dd>
                <dd><a href="">超链接</a></dd>
              </dl>
            </li>
            <li class="layui-nav-item"><a href="">空格</a></li>
            <li class="layui-nav-item"><a href="">发布留言</a></li>
          </ul>
        </div>
      </div>

       <%@ include file="content_goods.jsp" %>
    
      <div class="layui-footer">
        <!-- 底部固定区域 -->
       <center> © 第九组 </center>
      </div>
    </div>  
</body>
</html>