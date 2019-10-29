FROM node:12.2.0-alpine
EXPOSE 3000
WORKDIR /app
COPY . .
RUN npm install --prod
CMD ["npm", "start"]