FROM calciumion/new-api:latest AS source

FROM nginx:alpine

COPY --from=source /app/new-api /app/new-api
COPY overlay/nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /app/logs

EXPOSE 3002

CMD ["sh", "-c", "/app/new-api --log-dir /app/logs & nginx -g 'daemon off;'"]
