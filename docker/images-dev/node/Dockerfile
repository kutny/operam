FROM node:8

RUN apt-get update && apt-get -y install nano

ENV TZ=Europe/Prague
RUN echo $TZ > /etc/timezone

CMD ["npm", "run", "start:watch"]
