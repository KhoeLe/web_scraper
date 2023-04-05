# using staged builds
FROM node:18-buster as webscraper

# make the directory where the project files will be stored
RUN mkdir -p /usr/src/webscraper

# set it as the working directory so that we don't need to keep referencing it
WORKDIR /usr/src/webscraper

# Copy the package.json file
COPY package.json package.json

# install project dependencies
RUN npm install

# copy project files
# make sure to set up .dockerignore to copy only necessary files
COPY . .

# run the build command which will build and export html files
RUN npm run build

EXPOSE 3000

CMD ["yarn", "dev"]

# # bundle static assets with nginx
# FROM nginx:1.21.0-alpine as production
# ENV NODE_ENV production

# # remove existing files from nginx directory
# RUN rm -rf /usr/share/nginx/html/*

# # copy built assets from 'builder' webscraper
# COPY --from=webscraper /usr/src/webscraper/.next /usr/share/nginx/html

# # add nginx config
# COPY ./config/nginx.conf /etc/nginx/nginx.conf


# # expose port 80 for nginx
# EXPOSE 80
# # start nginx
# CMD ["nginx", "-g", "daemon off;"]
