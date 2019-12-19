FROM node:12.2.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV development

COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

ADD . /app
VOLUME /app /app/node_modules
CMD ["npm", "start"]

EXPOSE 3000


