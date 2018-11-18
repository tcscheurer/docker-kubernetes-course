FROM node:alpine

WORKDIR /usr/app

# We do this to make sure we aren't re-running npm install when changes aren't made 
# to the dependencies
COPY ./package.json ./
RUN npm i

COPY ./ ./

CMD ["npm", "start"]