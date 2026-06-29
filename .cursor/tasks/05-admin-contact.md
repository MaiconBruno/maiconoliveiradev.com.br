# Task 05 — Admin: Contato e redes

**ID do agente:** `admin-contact`  
**Depende de:** Task 01 (padrão formulário)

---

## Objetivo

Tela de edição do **Contact** (singleton) — e-mail, redes sociais e links.

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/content-models.md` (seção 5. Contato e redes)

## Escopo

### Backend
- `ContactController` com `edit` + `update`
- Campos: `email`, `telefone`, `linkedin`, `github`, `portfolio`, `outros` (array JSON)
- Validar URLs e e-mail

### Frontend
- `Admin/Contact/Edit.tsx`
- Repeater para `outros` ({ label, url, icone? })

## Arquivos principais

```
apps/api/app/Http/Controllers/Admin/ContactController.php  (criar)
apps/api/app/Http/Requests/UpdateContactRequest.php        (criar)
apps/api/app/Models/Contact.php
apps/api/resources/js/Pages/Admin/Contact/Edit.tsx         (criar)
apps/api/routes/web.php
```

## Não mexer em

- Formulário público de contato (`POST /api/v1/contact`) — já existe
- Site Next.js (só validar que dados fluem)

## Teste

```bash
curl http://localhost:8000/api/v1/contact
# Site /pt/contato — links e e-mail
```

## Critério de pronto

- [ ] Admin edita contato e salva
- [ ] `/api/v1/contact` atualizado
- [ ] Página `/contato` exibe links corretos
