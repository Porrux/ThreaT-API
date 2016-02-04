FROM node

WORKDIR /app
ADD package.json /app/
ADD . /app

CMD []
ENTRYPOINT ["npm", "start"]

EXPOSE 1337