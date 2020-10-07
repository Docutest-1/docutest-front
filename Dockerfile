FROM node:10-alpine as builder
COPY package.json package-lock.json ./
## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm ci && mkdir /app && mv ./node_modules /app
WORKDIR /app
COPY . .
RUN npm run ng build --prod --aot

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/docutest .
CMD ["nginx", "-g", "daemon off;"]
