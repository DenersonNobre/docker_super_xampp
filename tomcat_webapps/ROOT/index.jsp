<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Tomcat - Super XAMPP</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #007bff; }
        .info { background: #f0f0f0; padding: 15px; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>Tomcat is Running!</h1>
    <div class="info">
        <p><strong>Server Info:</strong> <%= application.getServerInfo() %></p>
        <p><strong>Servlet Version:</strong> <%= application.getMajorVersion() %>.<%= application.getMinorVersion() %></p>
        <p><strong>Current Time:</strong> <%= new java.util.Date() %></p>
    </div>
    <p><a href="/">Back to Super XAMPP</a></p>
</body>
</html>