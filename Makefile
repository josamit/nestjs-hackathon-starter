deploy:
	make copy-files
	make docker-build
	make docker-up

docker-up:
	ssh root@<your-box-ip> "cd ~/projects/booking-manager && docker-compose up -d --remove-orphans"

copy-files:
	rsync -avz . root@<your-box-ip>:~/projects/booking-manager --filter=':- .gitignore' --filter=':- .deployignore'  --delete

docker-build:
	ssh root@<your-box-ip> "DOCKER_BUILDKIT=1 docker build -f ~/projects/booking-manager/Dockerfile -t booking-manager:latest ~/projects/booking-manager"

local-deps:
	docker-compose -f docker-compose.dev.yml up
