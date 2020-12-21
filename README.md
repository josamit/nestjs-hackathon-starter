# nestjs-hackathon-starter
Hackathon starter repo for nestjs based backend and nextjs frontend.

# Getting started
Install required dependencies
```shell
npm install 
lerna bootstrap
```

Run following command to start docker based mysql database that backend will talk to.
```shell
make local-deps
```

Run following command to start frontend express server
```shell
cd frontend
yarn dev
```

Run following command to start backend server
```shell
cd backend
yarn dev
```
