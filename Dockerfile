FROM node:18.6.0-alpine

WORKDIR /code

COPY package*.json ./

RUN npm ci --omit=dev

COPY . ./

EXPOSE 5050

CMD sh -c "npm run admin-project && npm run prod"
