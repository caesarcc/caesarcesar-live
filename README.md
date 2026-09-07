# 🎸 Live

### *Décadas de história a poucos metros dos amplificadores*

Diário visual, interativo e cronológico de todos os shows e festivais de música que assisti ao vivo. O projeto reúne histórias de bastidores, fotos, vídeos (próprios e de terceiros da plateia), registros de ingressos e matérias jornalísticas de época.

> **Deploy planejado:** [live.caesarcesar.com.br](https://live.caesarcesar.com.br)

---

## ⚡ Principais Funcionalidades

- **Timeline Cronológica:** Navegação vertical intuitiva da data mais recente até os primeiros shows.
- **Filtros e Busca Rápida:** Filtros dinâmicos por ano, banda/artista, festival e cidade.
- **Mídias Integradas:** Suporte a vídeos incorporados do YouTube e links diretos para álbuns do Google Fotos.
- **Painel de Estatísticas:** Contagem total de shows vistos, cidades percorridas e bandas distintas.
- **Detalhamento do Show:** Modal completo com relato de histórias pessoais, setlist e matérias de imprensa.

---

## 🛠️ Stack Tecnológica

- **Framework:** Next.js (React + TypeScript)
- **Estilização:** Tailwind CSS
- **Animações / Timeline:** Framer Motion
- **Fonte de Dados:** Formato JSON (`data/shows.json`) versionado via Git

---

## 📂 Estrutura do Repositório

```text
live/
├── docs/
│   ├── specs.md            # Arquitetura, modelo de dados e decisões técnicas
│   └── interface-specs.md  # Especificação de UI, componentes e prompt do Stitch
├── data/
│   └── shows.json          # Base de dados estruturada dos shows
├── public/
│   └── assets/shows/       # Fotos, ingressos escaneados e pôsteres
├── src/                    # Código-fonte da aplicação
└── README.md
```
