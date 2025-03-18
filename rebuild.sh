docker-compose down
# ./genRsaKeys.sh
npx tsc user-microservice/src/*.ts --outDir user-microservice/dist --downlevelIteration
docker build -t user_microservice:1.0 ./user-microservice

npx tsc transaction-microservice/src/*.ts --outDir transaction-microservice/dist --downlevelIteration
docker build -t transaction_microservice:1.0 ./transaction-microservice

npm --prefix ./front-host build:dev

docker-compose up -d