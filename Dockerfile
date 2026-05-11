FROM calciumion/new-api:latest AS source

FROM nginx:alpine

RUN apk add --no-cache supervisor

COPY --from=source /new-api /new-api
COPY overlay/nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /app/logs /var/log/nginx /run /etc/supervisor/conf.d

COPY overlay/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 3002

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
