# STAGE 1.Build static assets
FROM node:16-alpine AS builder

# Set env variables to pass into react app
ARG REACT_APP_BASE_API_URL
ARG REACT_APP_DBMS_DEFAULT_DATABASE=market
ARG REACT_APP_UPDATE_ORDER_BOOK_INTERVAL=5000
ENV REACT_APP_BASE_API_URL=$REACT_APP_BASE_API_URL \
  REACT_APP_DBMS_DEFAULT_DATABASE=$REACT_APP_DBMS_DEFAULT_DATABASE \
  REACT_APP_UPDATE_ORDER_BOOK_INTERVAL=$REACT_APP_UPDATE_ORDER_BOOK_INTERVAL

WORKDIR /app
COPY . .
RUN npm set-script prepare "" && npm install --omit=dev && npm run build

# STAGE 2. Serve static files with nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
