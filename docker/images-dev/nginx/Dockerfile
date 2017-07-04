FROM nginx:1.10

ADD vhosts/operam.dev.conf /etc/nginx/conf.d/operam.dev.conf

ENV TZ=Europe/Prague
RUN echo $TZ > /etc/timezone
