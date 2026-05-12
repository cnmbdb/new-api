FROM golang:1.25-alpine AS builder

RUN apk add --no-cache nodejs npm git

WORKDIR /app

COPY web/default/package.json web/default/bun.lock web/default/.npmrc /app/web/default/
WORKDIR /app/web/default
RUN npm install --legacy-peer-deps
COPY web/default/ ./
RUN npm run build

WORKDIR /app
RUN mkdir -p web/classic/dist && \
    echo '<!doctype html><html><head><title>New API</title></head><body><div id="root"></div></body></html>' > web/classic/dist/index.html

COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-extldflags "-static"' -o new-api .

FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /app/new-api /new-api
COPY --from=builder /app/data /data
COPY --from=builder /app/web/default/dist /web/default/dist
COPY --from=builder /app/web/classic/dist /web/classic/dist
EXPOSE 3000
ENTRYPOINT ["/new-api"]
