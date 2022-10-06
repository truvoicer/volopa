#!/bin/bash

WEB_ROOT=/var/www/html
SCRIPTS_DIR=/var/scripts
APACHE_VHOSTS_AVAIL_DIR=/etc/apache2/sites-available
APACHE_VHOSTS_ENABLED_DIR=/etc/apache2/sites-enabled
LETSENCRYPT_CERT_DIR=/etc/letsencrypt/live
PLUGIN_TASK_COMPOSER="composer"
PLUGIN_TASK_NPM="npm"
APACHE_USER="www-data"

function FileStringReplace {
  sed -i "s/$1/$2/g" "$3"
}

function InstallComposerDeps {
  echo "Installing composer dependencieths"
  if [ "$APP_ENV" == "production" ]; then
    composer install --optimize-autoloader --no-dev
  else
    composer install
  fi
}

cd "$WEB_ROOT" || exit

InstallComposerDeps

echo "USER: $USER, ID: $(id -u)"
echo "CUR GROUPS: $(groups)"

echo "Setting directory permissions:"
find . -type d -exec chmod 755 {} \;
find . -type d -exec chmod ug+s {} \;
find . -type f -exec chmod 644 {} \;

chown -R www-data:www-data .

chmod -R 777 ./storage
chmod -R 777 ./bootstrap/cache/

php artisan config:cache

/usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf
