#!/bin/bash
set -e

until mysqladmin ping -h db -u app -papp_password --silent; do
  echo "Ожидание MySQL..."
  sleep 2
done

bundle exec rails db:migrate

exec rails server -b 0.0.0.0     
