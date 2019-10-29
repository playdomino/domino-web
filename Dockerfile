FROM node:12.2.0-alpine
EXPOSE 3000

WORKDIR /app

COPY . .

ENV PATH /app/node_modules/.bin:$PATH
ENV SASS_PATH=node_modules:src
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm install --silent

CMD ["npm", "start"]