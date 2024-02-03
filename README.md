# market-price-api


```bash
cp .env.example .env
```

```bash
docker compose up -d
docker compose exec app npm run migration:generate
docker compose exec app npm run migration:migrate
```
