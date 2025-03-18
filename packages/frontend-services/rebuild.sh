docker compose down
npm --prefix ./host run build:dev
npm --prefix ./microfront run build:dev
docker compose up -d