# Super XAMPP - Test Script (Windows Host)

$pass = 0
$fail = 0

function Test-Something {
    param($name, $result)
    if ($result) {
        Write-Host "OK $name" -ForegroundColor Green
        $script:pass++
    } else {
        Write-Host "FAIL $name" -ForegroundColor Red
        $script:fail++
    }
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   Super XAMPP - Teste Completo (Host)" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "--- Portas ---" -ForegroundColor Yellow
Test-Something "Apache :80" (Test-NetConnection localhost -Port 80 -InformationLevel Quiet)
Test-Something "MySQL :3306" (Test-NetConnection localhost -Port 3306 -InformationLevel Quiet)
Test-Something "Node.js :3000" (Test-NetConnection localhost -Port 3000 -InformationLevel Quiet)
Test-Something "Tomcat :8080" (Test-NetConnection localhost -Port 8080 -InformationLevel Quiet)
Write-Host ""

Write-Host "--- HTTP Requests ---" -ForegroundColor Yellow
$mainPage = (Invoke-WebRequest -Uri "http://localhost/" -UseBasicParsing -TimeoutSec 5).StatusCode
Test-Something "Main page" ($mainPage -eq 200)

$phpmyadmin = (Invoke-WebRequest -Uri "http://localhost/phpmyadmin/" -UseBasicParsing -TimeoutSec 5).StatusCode
Test-Something "phpMyAdmin" ($phpmyadmin -eq 200)

$api = (Invoke-WebRequest -Uri "http://localhost:3000/" -UseBasicParsing -TimeoutSec 5).StatusCode
Test-Something "Node.js API" ($api -eq 200)

$apiStatus = (Invoke-WebRequest -Uri "http://localhost:3000/api/status" -UseBasicParsing -TimeoutSec 5).Content
Test-Something "API /api/status" ($apiStatus -like "*online*")

$tomcat = (Invoke-WebRequest -Uri "http://localhost:8080/" -UseBasicParsing -TimeoutSec 5).StatusCode
Test-Something "Tomcat" ($tomcat -eq 200)
Write-Host ""

Write-Host "--- Container Status ---" -ForegroundColor Yellow
$container = docker ps --filter "name=super_xampp" --format "{{.Names}}"
Test-Something "Container running" ($container -eq "super_xampp")
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   Resultado: $pass passed, $fail failed" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

if ($fail -eq 0) {
    Write-Host "All Systems Online!" -ForegroundColor Green
} else {
    Write-Host "Some tests failed" -ForegroundColor Red
}