FROM node:16

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/app/

COPY package*.json ./
# Installing dependencies
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN rm -f .npmrc

# Copying source files
COPY . .

# Running the app
CMD [ "node", "src/server/index.js" ]