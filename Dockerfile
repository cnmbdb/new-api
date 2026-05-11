FROM calciumion/new-api:latest AS source

FROM nginx:alpine

COPY --from=source /new-api /new-api
COPY overlay/nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /app/logs

EXPOSE 3002

CMD ["/new-api", "--log-dir", "/app/logs"]
