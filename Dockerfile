FROM golang:1.25-alpine AS builder

RUN apk add --no-cache nodejs npm git

WORKDIR /app

WORKDIR /app/web/default
COPY web/default/package.json web/default/.npmrc ./
RUN npm install --legacy-peer-deps
COPY web/default/ ./
RUN npm run build

WORKDIR /app/web/classic
COPY web/classic/package.json ./
RUN npm install --legacy-peer-deps
COPY web/classic/ ./
RUN npm run build

WORKDIR /app
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
