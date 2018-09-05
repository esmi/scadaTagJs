#!/bin/bash
SERVER_PORT=8000
cat << EOF

use your browser look at "http://localhost:$SERVER_PORT/"


EOF
php -S localhost:$SERVER_PORT
