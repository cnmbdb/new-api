FROM golang:1.22-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o new-api .

FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /app
COPY --from=builder /app/new-api .
COPY --from=builder /app/data ./data
COPY --from=builder /app/web ./web

EXPOSE 3000

CMD ["./new-api"]
