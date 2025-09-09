FROM node:18




WORKDIR /app




COPY . .



WORKDIR /app/src



RUN npm install




CMD ["npm", "start"]