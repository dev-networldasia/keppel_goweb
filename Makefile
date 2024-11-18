include .env
export

.PHONY:  run-win run-linux build-win build-linux server

help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

server: 
	go run main.go
build-win:
	GOOS=windows GOARCH=amd64 go build -o webhtml.exe main.go
build-linux:
	GOOS=linux GOARCH=amd64 go build -o webhtml main.go
run-win:
	./webhtml.exe
run-linux:
	./webhtml