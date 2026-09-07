# 📐 Arquitetura e Especificações Técnicas

Este documento reúne o planejamento de engenharia e modelagem de dados para o projeto **Live** (*Décadas de história a poucos metros dos amplificadores*).

---

## 1. Decisão de Arquitetura

Para priorizar facilidade de manutenção e zero custo de infraestrutura:
- **Abordagem Inicial (Git-based CMS):** Todos os shows são armazenados em um arquivo `data/shows.json`. A compilação estática (SSG/ISR) do Next.js garante carregamento instantâneo e SEO otimizado.
- **Mídias Externas:**
  - **YouTube:** Incorporação via ID ou URL pública com player `iframe`.
  - **Google Fotos:** Links diretos para álbuns compartilhados, evitando dependência de tokens OAuth2 de curta duração da Google Photos Library API.
  - **Mídias Locais:** Ingressos físicos digitalizados e fotos de capa ficam na pasta `public/assets/shows/`.

---

## 2. Esquema de Dados (`data/shows.json`)

Cada registro no arquivo `shows.json` segue o contrato de tipos abaixo:

```json
[
  {
    "id": "2026-03-04-acdc-sp",
    "title": "AC/DC - PWR UP Tour",
    "date": "2026-03-04",
    "city": "São Paulo",
    "state": "SP",
    "country": "Brasil",
    "venue": "Estádio Morumbi",
    "bands": ["AC/DC"],
    "isFestival": false,
    "festivalName": null,
    "coverImage": "/assets/shows/2026-acdc-cover.jpg",
    "story": "Relato detalhado com memórias, com quem fui, perrengues e impressões do show...",
    "setlistUrl": "[https://www.setlist.fm/setlist/acdc/2026/](https://www.setlist.fm/setlist/acdc/2026/)...",
    "media": [
      {
        "type": "youtube_embed",
        "url": "[https://www.youtube.com/watch?v=](https://www.youtube.com/watch?v=)...",
        "author": "Canal Externo / Fã",
        "description": "Abertura gravada da pista"
      },
      {
        "type": "google_photos_link",
        "url": "[https://photos.app.goo.gl/](https://photos.app.goo.gl/)...",
        "label": "Álbum completo no Google Fotos"
      }
    ],
    "newsLinks": [
      {
        "title": "Crítica e cobertura do show no G1",
        "url": "[https://g1.globo.com/](https://g1.globo.com/)..."
      }
    ]
  }
]