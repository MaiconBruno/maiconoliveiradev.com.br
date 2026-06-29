# Desenvolvimento local (Docker)

Tudo roda via Docker — não precisa PHP/Node instalados no host.

## Subir

```bash
docker compose up -d --build
```

## URLs

| Serviço | URL |
|---------|-----|
| Site | http://localhost:3000/pt |
| API | http://localhost:8000/api/v1/profile |
| Admin | http://localhost:8000/login |

**Admin:** `devmaiconrodrigues@gmail.com` / `admin123456`

## Parar

```bash
docker compose down
```

## Logs

```bash
docker compose logs -f web
docker compose logs -f api
```

## Rebuild após mudanças em dependências

```bash
docker compose up -d --build
```

## Variáveis (web)

| Variável | Uso |
|----------|-----|
| `NEXT_PUBLIC_API_URL` | Browser → `http://localhost:8000` |
| `API_INTERNAL_URL` | SSR no container → `http://api:8000` |
