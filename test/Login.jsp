<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>title</title>
<style type="text/css">
	*{margin: 0;padding: 0;}
	#button{padding: 20px}
	label{font-size:18px;}
	input{width: 160px;height: 20px;font-size:18px;}
	#button input{width: 60px;height: 30px;font-size:18px;margin:15px;}
	form{margin: 0 auto;padding:15px; width: 300px;height:300px;text-align: center;}
	
	.head{padding:150px;}
</style> 
</head> 
<body> 
<div class="wrapper">
	<div class="head"><center><h2>Login page,欢迎您登录!!</h2></center></div>
		<form action="LoginServlet" method="post">
		
			<label>&nbsp;i&nbsp;&nbsp;&nbsp;d&nbsp;:&nbsp;&nbsp;&nbsp;</label>
				<input type="text" name="id"/><br><br>
			<label>密  码：</label>
				<input type="password" name="password"/><br>
			<div id="button">
				<input type="submit" value="登录"/>
				<input type="reset" value="重置"/>
			</div>
		</form> 
	</div>
</body>
</html>