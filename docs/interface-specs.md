# 🎨 Especificações de Interface e Protótipo (Stitch)

Diretrizes de design e estrutura visual da aplicação **Live** (*Décadas de história a poucos metros dos amplificadores*).

---

## 1. Identidade Visual

- **Tema Principal:** Dark Mode imersivo.
- **Paleta de Cores:**
  - Fundo: Carvão/Grafite escuro (`#121212` a `#1E1E1E`).
  - Superfícies / Cards: Cinza chumbo (`#242424`).
  - Destaques (Accents): Tons quentes/âmbar ou neon roxo, remetendo a iluminação de palco.
- **Tipografia:**
  - Interface: Sans-serif moderna (Inter, Geist ou Roboto).
  - Títulos: Tipografia display marcante e encorpada.

---

## 2. Componentes da Interface

### A. Cabeçalho (Header)
- Identidade visual com o título "Live" e subtítulo "Décadas de história a poucos metros dos amplificadores".
- Barra de busca global (filtra por banda, cidade, local ou ano).
- Filtros rápidos em pills clicáveis (Anos, Cidades, Festivais).
- Badges de estatísticas consolidadas (Total de shows, bandas vistas, festivais e cidades).

### B. Linha do Tempo (Interactive Timeline)
- Eixo cronológico vertical com nós marcando cada show.
- Card resumido para cada show contendo:
  - Data em destaque e tag do tipo de evento.
  - Imagem de capa (palco ou ingresso).
  - Localização e local do evento.
  - Prévia do relato pessoal.
  - Ações rápidas: botão de vídeos (YouTube), álbum (Google Fotos) e setlist.

### C. Modal de Detalhes
- Visualização expandida ao clicar no card da timeline:
  - Aba de Memórias e Histórias completas.
  - Galeria de fotos e embeds de vídeo.
  - Setlist detalhado.
  - Links de notícias e reportagens de época.

---

## 3. Prompt para Geração no Stitch

Copie o prompt abaixo para prototipar a interface no Stitch:

```text
Crie o protótipo de alta fidelidade para uma aplicação web moderna chamada "Live" (com o subtítulo "Décadas de história a poucos metros dos amplificadores"), um diário visual e cronológico interativo de todos os shows e festivais de música que já participei.

Estilo Visual e Tema:
- Tema Dark Mode moderno e imersivo (tons escuros como grafite/carvão, detalhes em roxo/neon ou amarelo âmbar para dar clima de palco/iluminação de show).
- Tipografia limpa, moderna e bem legível (sans-serif para interface e títulos marcantes).
- Layout responsivo com design limpo, focado em mídia e narrativa pessoal.

Estrutura da Interface:

1. Cabeçalho (Header):
   - Título/Logo: "Live" (com subtítulo "Décadas de história a poucos metros dos amplificadores").
   - Barra de busca global rápida (para buscar por banda, cidade, local ou ano).
   - Filtros rápidos em pills/chips clicáveis: Anos (ex: 2026, 2024, 2019...), Cidades, e Festivais.
   - Painel de estatísticas resumidas no topo (Stat Badges): "48 Shows", "32 Bandas Diferentes", "6 Cidades", "12 Festivais".

2. Linha do Tempo Central (Interactive Timeline):
   - Eixo vertical cronológico conectando os eventos (do mais recente para o mais antigo).
   - Cards de eventos ricos e visuais para cada show contendo:
     * Data destacada e indicador de linha do tempo.
     * Nome da banda principal e subtítulo da turnê ou festival.
     * Local (ex: Estádio Morumbi, São Paulo - SP).
     * Imagem de destaque (foto do palco, ingresso ou pôster da turnê).
     * Tag de status ou tipo de evento (ex: "Festival", "Turnê Solo", "Histórico").
     * Trecho da história pessoal/relato com botão "Ler história completa".
     * Ações e links externos em formato de botões elegantes com ícones:
       - Botão para assistir vídeos (YouTube embed/link).
       - Botão com ícone para "Álbum de Fotos" (link externo Google Fotos).
       - Botão para "Setlist oficial" (Setlist.fm).
       - Links com ícone para matérias e notícias da época.

3. Modal / Visualização de Detalhes do Show (Expanded Card):
   - Ao abrir um show da timeline, exibir um modal amplo:
     * Galeria de fotos e embeds de vídeo (próprios e de terceiros).
     * Aba de "História & Memórias": texto detalhado sobre os bastidores.
     * Aba de "Repertório (Setlist)": lista de músicas tocadas no dia.
     * Seção de "Notícias e Críticas": links clicáveis sobre a repercussão do show.

Apresente a tela principal da timeline com cards de exemplo bem preenchidos e o modal de detalhes aberto para validação da experiência.
```