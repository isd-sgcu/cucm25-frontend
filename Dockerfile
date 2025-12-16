FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm clean-install

COPY . .
ENV VITE_API_ROOT_PROD=
RUN npm run build

FROM nginx:1.29-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
