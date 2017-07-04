FROM nginx:1.10

ADD vhosts/operam.net.conf /etc/nginx/conf.d/operam.net.conf

ENV TZ=Europe/Prague
RUN echo $TZ > /etc/timezone
