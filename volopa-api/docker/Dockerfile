#Download base image ubuntu 20.04
FROM ubuntu:20.04

# LABEL about the custom image
LABEL maintainer="mikydxl@gmail.com"
LABEL version="0.1"
LABEL description="Custom docker image for php and apache"

ARG APP_ENV
ARG APP_USER
ARG APP_GROUP
ARG NODE_VERSION

ENV APP_GROUP="$APP_GROUP"

# Disable Prompt During Packages Installation
ARG DEBIAN_FRONTEND=noninteractive

# Update Ubuntu Software repository
RUN apt update

# Install nginx, php-fpm and supervisord from ubuntu repository
RUN apt install -y zip git unzip curl apache2 supervisor software-properties-common vim dos2unix
RUN add-apt-repository -y ppa:ondrej/php
RUN apt update
RUN apt install -y php8.1 libapache2-mod-php8.1 php8.1-curl php8.1-mysql php8.1-mysqli php8.1-mbstring \
    php8.1-xml php8.1-zip php8.1-gd php8.1-imagick

RUN curl -sL "https://deb.nodesource.com/setup_$NODE_VERSION" | bash - \
    && apt -y install nodejs \
    && ln -s /usr/bin/nodejs /usr/local/bin/node

RUN rm -rf /var/lib/apt/lists/*
RUN apt clean

#Define the ENV variable
ENV apache_vhost_available /etc/apache2/sites-available/default.conf
#ENV apache_vhost_enabled /etc/apache2/sites-enabled/default
ENV supervisor_conf /etc/supervisor/supervisord.conf
#ENV apache_envvars /etc/apache2/envvars

# Enable PHP-fpm on nginx virtualhost configuration
COPY ./volopa-api/docker/apache/default ${apache_vhost_available}
COPY ./volopa-api/docker/apache/default ${apache_vhost_enabled}
#COPY ./config/apache2/envvars ${apache_envvars}

RUN if [ -f /etc/apache2/sites-available/000-default.conf ]; then \
    a2dissite 000-default.conf;  \
    fi
RUN if [ -f /etc/apache2/sites-enabled/000-default.conf ]; then \
    a2dissite 000-default.conf;  \
    fi

RUN a2ensite default.conf
RUN a2enmod rewrite

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

#Copy supervisor configuration
COPY ./volopa-api/docker/supervisord.conf ${supervisor_conf}
RUN dos2unix ${supervisor_conf}
#RUN sed -i -e "s/user=root/user=$APP_USER/g" "$supervisor_conf"

# Copy start.sh script and define default command for the container
COPY ./volopa-api/docker/start.sh /start.sh

RUN dos2unix /wait-for-it.sh
RUN chmod +x /start.sh

# Copy start.sh script and define default command for the container
COPY ./volopa-api/docker/wait-for-it.sh /wait-for-it.sh

RUN dos2unix /start.sh
RUN chmod +x /wait-for-it.sh


COPY ./volopa-api/ /var/www/html/


WORKDIR /var/www/html

#Web docs
RUN mkdir -p /run/php && \
    chown -R www-data:www-data /var/www/html && \
    chown -R www-data:www-data /run/php

# Volume configuration
VOLUME ["/etc/apache/sites-enabled", "/var/log/apache2", "/var/www/html", "/etc/php/8.0/apache2", "/etc/supervisor"]

#USER truvoice

CMD ["/wait-for-it.sh", "volopa-db:3306", "--", "/start.sh"]

# Expose Port for the Application
EXPOSE 80 443
