FROM golang:1.8 as builder
ENV GOPATH /home/julianibarz/go
ADD . $GOPATH/src/hello-app
RUN go get golang.org/x/crypto/acme/autocert
RUN go install hello-app

FROM alpine:latest
ENV GOPATH /home/julianibarz/go
COPY --from=builder $GOPATH/bin/hello-app .
ADD server* ./
ENV PORT 8443
CMD ["./hello-app"]
