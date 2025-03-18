docker-compose down
# ./genRsaKeys.sh
npm --prefix ./packages/frontend-services/host run build:dev
docker-compose up -d