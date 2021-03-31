DOCKER_IMAGE_NAME := saucelabs/stt-testcafe-gherkin-node

docker:
	docker build -t $(DOCKER_IMAGE_NAME):latest .