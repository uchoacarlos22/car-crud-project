<div align="center">

# 🚗 Car CRUD Project

**Gerenciador de frota veicular construído com Angular 19**

![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

</div>

---

## ✨ Funcionalidades

- ✅ **CRUD completo** — Criar, Listar, Editar e Deletar veículos
- ✅ **Angular 19 Standalone** — sem `NgModule`, arquitetura moderna
- ✅ **Signals** — reatividade nativa do Angular para a lista de carros
- ✅ **Novo Control Flow** — `@for` e `@if` no lugar de `*ngFor`/`*ngIf`
- ✅ **`inject()`** — injeção de dependência funcional (sem construtor)
- ✅ **Proxy configurado** — Angular aponta para o JSON Server via `/api`
- ✅ **UI Dark Premium** — tema escuro com Bootstrap 5 + Bootstrap Icons

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | Angular 19 (Standalone Components) |
| Linguagem | TypeScript 5.6 |
| Estilos | CSS3 + Bootstrap 5.3 |
| Ícones | Bootstrap Icons 1.11 |
| HTTP | Angular HttpClient + RxJS 7.8 |
| Backend | JSON Server (mock REST API) |
| Build | Angular CLI 19 + Esbuild |

---

## 🚀 Como rodar

### Pré-requisitos

- Node.js >= 18
- npm >= 8
- Angular CLI 19: `npm install -g @angular/cli@19`
- JSON Server: `npm install -g json-server`

### Instalação

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/car-crud-project.git
cd car-crud-project

# Instale as dependências
npm install --legacy-peer-deps
```

### Executar

**Terminal 1 — Backend (JSON Server):**
```bash
npx json-server --watch src/assets/data/db.json
# Rodará em http://localhost:3000
```

**Terminal 2 — Frontend (Angular):**
```bash
npm start
# Rodará em http://localhost:4200
```

Acesse: **[http://localhost:4200](http://localhost:4200)**

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── carros/
│   │   ├── carros.component.ts      # Lógica CRUD + Signals
│   │   ├── carros.component.html    # Template com @for/@if
│   │   └── carros.component.css     # UI dark premium
│   ├── models/
│   │   └── car.ts                   # Interface Car
│   ├── services/
│   │   └── car.service.ts           # HttpClient + inject()
│   ├── app.component.ts             # Root component (standalone)
│   └── app.config.ts                # provideHttpClient()
├── assets/data/
│   └── db.json                      # Dados do JSON Server
├── main.ts                          # bootstrapApplication()
├── index.html                       # Bootstrap 5 CDN
└── styles.css                       # Design system global
```

---

## 🔧 Configuração da API

O proxy Angular redireciona `/api/*` → `http://localhost:3000/*`:

```json
// proxy.config.json
{
  "/api": {
    "target": "http://localhost:3000",
    "pathRewrite": { "^/api": "" }
  }
}
```

O `CarService` aponta para `/api/cars` — nenhuma URL hardcoded de `localhost`.

---

## 🐛 Bugs corrigidos (vs versão Angular 10)

| Bug | Descrição | Status |
|---|---|---|
| Loop Infinito | `getCars()` chamava a si mesma dentro do `subscribe` | ✅ Corrigido |
| Cadastro Ausente | `saveCar()` não tinha lógica de criação (POST) | ✅ Corrigido |
| Header errado | `'aplication/json'` (typo) | ✅ Corrigido |
| Proxy ignorado | URL hardcoded `localhost:3000` | ✅ Corrigido |

---

<div align="center">
  <sub>Migrado de Angular 10 → Angular 19 • Desenvolvido com ☕</sub>
</div>
