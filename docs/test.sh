#!/bin/bash
# Teste completo do Super XAMPP
# Uso: docker exec super_xampp /bin/bash /test.sh

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASS=0
FAIL=0

test_service() {
    local name=$1
    local result=$2
    
    if [ "$result" -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $name"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $name"
        ((FAIL++))
    fi
}

echo "=========================================="
echo "   Super XAMPP - Teste Completo"
echo "=========================================="
echo ""

echo "--- Processos ---"
test_service "Apache2" "$(pgrep -x apache2 > /dev/null && echo 0 || echo 1)"
test_service "MySQL" "$(pgrep -x mysqld > /dev/null && echo 0 || echo 1)"
test_service "Node.js" "$(pgrep -f 'node.*server.js' > /dev/null && echo 0 || echo 1)"
test_service "Tomcat" "$(pgrep -f 'catalina' > /dev/null && echo 0 || echo 1)"
test_service "Supervisor" "$(pgrep -x supervisord > /dev/null && echo 0 || echo 1)"
echo ""

echo "--- HTTP Requests (verifica portas) ---"
test_service "Apache :80" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost/ | grep -q '200' && echo 0 || echo 1)"
test_service "MySQL :3306" "$(mysql -h 127.0.0.1 -u root -proot -e 'SELECT 1' > /dev/null 2>&1 && echo 0 || echo 1)"
test_service "Node.js :3000" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/ | grep -q '200' && echo 0 || echo 1)"
test_service "Tomcat :8080" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:8080/ | grep -q '200' && echo 0 || echo 1)"
echo ""

echo "--- HTTP Requests ---"
test_service "Main page" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost/ | grep -q '200' && echo 0 || echo 1)"
test_service "phpMyAdmin" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost/phpmyadmin/ | grep -q '200' && echo 0 || echo 1)"
test_service "Node.js API" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/ | grep -q '200' && echo 0 || echo 1)"
test_service "Node.js /api/status" "$(curl -s http://localhost:3000/api/status | grep -q 'online' && echo 0 || echo 1)"
test_service "Tomcat" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:8080/ | grep -q '200' && echo 0 || echo 1)"
echo ""

echo "--- MySQL ---"
test_service "MySQL socket" "$(mysql -u root -proot -e 'SELECT 1' > /dev/null 2>&1 && echo 0 || echo 1)"
test_service "MySQL TCP" "$(mysql -h 127.0.0.1 -u root -proot -e 'SELECT 1' > /dev/null 2>&1 && echo 0 || echo 1)"
test_service "root@localhost" "$(mysql -u root -proot -e "SELECT 1" > /dev/null 2>&1 && echo 0 || echo 1)"
test_service "root@%" "$(mysql -h 127.0.0.1 -u root -proot -e "SELECT 1" > /dev/null 2>&1 && echo 0 || echo 1)"
test_service "bind-address=0.0.0.0" "$(grep 'bind-address.*0.0.0.0' /etc/mysql/mysql.conf.d/mysqld.cnf > /dev/null && echo 0 || echo 1)"
test_service "phpMyAdmin DB" "$(mysql -u root -proot -e "USE phpmyadmin; SELECT 1" > /dev/null 2>&1 && echo 0 || echo 1)"
echo ""

echo "--- Node.js Endpoints ---"
API_STATUS=$(curl -s http://localhost:3000/api/status)
API_TIME=$(curl -s http://localhost:3000/api/time)
API_RANDOM=$(curl -s http://localhost:3000/api/random)

test_service "API /api/status" "$(echo "$API_STATUS" | grep -q 'online' && echo 0 || echo 1)"
test_service "API /api/time" "$(echo "$API_TIME" | grep -q 'timestamp' && echo 0 || echo 1)"
test_service "API /api/random" "$(echo "$API_RANDOM" | grep -q 'number' && echo 0 || echo 1)"
echo ""

echo "=========================================="
echo "   Resultado: $PASS passed, $FAIL failed"
echo "=========================================="

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}All Systems Online!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed${NC}"
    exit 1
fi