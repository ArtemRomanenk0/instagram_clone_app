#!/bin/bash
set -e

until mysqladmin ping -h db -P 3306 -u app -papp_password --ssl=0 --ssl-verify-server-cert=0 --silent; do
  echo "Ожидание MySQL..."
  sleep 2
done

bundle exec rails db:migrate

exec rails server -b 0.0.0.0     
