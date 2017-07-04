FROM php:7.0.12-fpm

ADD php.ini /usr/local/etc/php/
ENV TZ=Europe/Prague

RUN apt-get update && apt-get install -y git libpng12-dev libjpeg-dev libpq-dev libxml2-dev libmcrypt-dev libbz2-dev build-essential libtool libyaml-dev \
	&& docker-php-ext-install gd mbstring pdo pdo_mysql pdo_pgsql zip json pcntl opcache bcmath bz2 mcrypt soap \
	&& rm -rf /var/lib/apt/lists/* \
	&& pecl install -o apcu-5.1.7 \
    && pecl install -o -f redis-3.0.0 \
    && rm -rf /tmp/pear \
    && echo "extension=apcu.so" > /usr/local/etc/php/conf.d/apcu.ini \
    && echo "extension=redis.so" > /usr/local/etc/php/conf.d/redis.ini \
    && echo $TZ > /etc/timezone

ENV NOTVISIBLE "in users profile"
COPY keys/id_rsa /root/.ssh/id_rsa
COPY keys/id_rsa.pub /root/.ssh/authorized_keys

RUN apt-get update && apt-get install -y rubygems openssh-server supervisor wget vim nano mysql-client \
    && rm -rf /var/lib/apt/lists/* \
    && gem install capistrano -v 3.6.1 \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    && pecl install xdebug-2.4.1 \
    && echo "xdebug.cli_color=1\nxdebug.remote_autostart=1\nxdebug.remote_connect_back=1\nxdebug.idekey=PHPSTORM\nxdebug.remote_enable=1\nxdebug.remote_log=/tmp/xdebug_remote.log" > /usr/local/etc/php/conf.d/xdebug.ini \
    && mkdir /var/run/sshd \
    && echo 'root:root' | chpasswd \
    && sed -i 's/PermitRootLogin without-password/PermitRootLogin yes/' /etc/ssh/sshd_config \
    && sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd \
    && echo "export VISIBLE=now" >> /etc/profile \
    && chmod 600 /root/.ssh/id_rsa && chmod 600 /root/.ssh/authorized_keys \
    && echo 'eval $(ssh-agent) ssh-add \n' >> /root/.bash_profile \
    && touch /root/.ssh/known_hosts \
    && ssh-keyscan github.com >> /root/.ssh/known_hosts \
    && echo "PS1='\[\033[0;33m\](operam) \w\[\033[0m\]\[\033[37m\]$ \[\033[0m\]'\n" >> /root/.bash_profile \
    && echo "cd /app\n" >> /root/.bash_profile

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /app
EXPOSE 22
CMD ["/usr/bin/supervisord"]