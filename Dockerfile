FROM oven/bun:1.1.0 AS build-default
WORKDIR /app/web/default
COPY web/default/package.json web/default/bun.lock web/default/.npmrc ./
RUN bun install
COPY web/default/ ./
RUN bun run build

FROM golang:1.24-alpine AS builder
RUN apk add --no-cache git ca-certificates tzdata busybox
ENV GOPROXY=https://goproxy.cn,direct
ENV GO111MODULE=on
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN mkdir -p data web/classic/dist && touch data/.keep && \
    echo '<!doctype html><html><head><title></title></head><body></body></html>' > web/classic/dist/index.html
COPY --from=build-default /app/web/default/dist ./web/default/dist
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-extldflags "-static" -s -w' -o new-api .

FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /bin/busybox /bin/busybox
ENV TZ=Asia/Shanghai
COPY --from=builder /app/new-api /new-api
COPY --from=builder /app/data /data
COPY --from=builder /app/web/default/dist /web/default/dist
COPY --from=builder /app/web/classic/dist /web/classic/dist
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD /bin/busybox wget -q -O- http://localhost:3000/api/status || exit 1
ENTRYPOINT ["/new-api"]
