FROM calciumion/new-api:latest AS source

FROM nginx:alpine

RUN apk add --no-cache supervisor

COPY --from=source /new-api /new-api
COPY overlay/nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /app/logs /var/log/nginx /run

RUN echo $'[supervisord]\n\
nodaemon=true\n\
logfile=/var/log/supervisord.log\n\
pidfile=/var/run/supervisord.pid\n\
[program:new-api]\n\
command=/new-api --log-dir /app/logs --port 8080\n\
autostart=true\n\
autorestart=true\n\
stderr_logfile=/app/logs/new-api.err.log\n\
stdout_logfile=/app/logs/new-api.out.log\n\
[program:nginx]\n\
command=/usr/sbin/nginx -g "daemon off;"\n\
autostart=true\n\
autorestart=true\n\
stderr_logfile=/var/log/nginx/error.log\n\
stdout_logfile=/var/log/nginx/access.log\n\
' > /etc/supervisor/conf.d/supervisord.conf

EXPOSE 3002

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
