FROM node

WORKDIR /app
ADD package.json /app/
ADD . /app

RUN npm install

CMD []
ENTRYPOINT ["npm", "start"]

EXPOSE 1337