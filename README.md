# TrucoRS - Aprenda Truco Gaudério

Uma aplicação web progressiva (PWA) para aprender e praticar Truco Gaudério, o jogo de cartas tradicional do Rio Grande do Sul, Brasil.

## Características

- 📖 **Referência de Regras**: Guia completo das regras do Truco Gaudério, incluindo Flor
- 🎓 **Tutorial Interativo**: Aprenda passo a passo com módulos interativos
- 🎮 **Modo Prática**: Pratique contra IA com diferentes níveis de dificuldade
- 🎯 **Guia de Estratégias**: Aprenda técnicas avançadas e táticas
- 📊 **Estatísticas**: Acompanhe seu desempenho e revise seus jogos
- 📱 **PWA**: Instalável e funciona offline

## Tecnologias

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Zustand (gerenciamento de estado)
- React Router
- Vite PWA Plugin

## Instalação

```bash
npm install
```

## Configuração de Imagens das Cartas (Opcional)

Para usar imagens reais de cartas espanholas em vez dos gráficos SVG gerados:

1. Baixe ou crie imagens de cartas com naipes espanhóis (Ouros, Copas, Espadas, Bastos)
2. Coloque as imagens na pasta `public/images/cards/` seguindo a convenção de nomes especificada em `public/images/cards/README.md`
3. As imagens devem ter proporção 3:4 (ex: 200x300 pixels)

Se as imagens não forem encontradas, o app usará automaticamente representações SVG autênticas.

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Estrutura do Projeto

```
TrucoRS/
├── src/
│   ├── components/     # Componentes React reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── store/          # Estado global (Zustand)
│   ├── utils/          # Funções utilitárias e lógica do jogo
│   ├── data/           # Dados estáticos (regras, tutoriais, etc.)
│   └── hooks/          # Custom hooks
├── public/             # Arquivos estáticos
└── package.json
```

## Funcionalidades Implementadas

### Iteração 1: Setup e Exibição de Cartas
- Projeto configurado com Vite + React + TypeScript
- Componente de cartas visual
- Exibição de todas as 44 cartas do baralho

### Iteração 2: Referência de Regras
- Página completa de regras
- Busca nas regras
- Exemplos visuais

### Iteração 3: Tutorial Interativo
- Módulo 1: Hierarquia das Cartas
- Sistema de progresso
- Quizzes interativos

### Iteração 4: Estado do Jogo e Turnos
- Gerenciamento de estado do jogo
- Distribuição de cartas
- Sistema de turnos

### Iteração 5: Jogar Cartas e Lógica de Rodadas
- Jogar cartas
- Comparação de cartas
- Determinação de vencedor da rodada

### Iteração 6: Sistema de Apostas
- Truco, Retruco, Vale Quatro
- Aceitar/Recusar desafios
- Multiplicadores de pontos

### Iteração 7: IA Básica
- IA com diferentes níveis de dificuldade
- Jogadas automáticas da IA
- Estratégias básicas

### Iteração 8: Modo Prática
- Seletor de dificuldade
- Sistema de dicas
- Sugestões de jogadas

### Iteração 9: Módulos de Tutorial Completos
- 4 módulos de tutorial
- Sistema de progresso
- Badges de conquistas

### Iteração 10: Guia de Estratégias
- Conteúdo de estratégias avançadas
- Exemplos interativos
- Quizzes de estratégia

### Iteração 11: Estatísticas e Replay
- Estatísticas de jogos
- Sistema de replay
- Histórico de partidas

### Iteração 12: PWA e Polimento
- Manifest PWA
- Service Worker
- Error boundaries
- Loading states

### Iteração 13: Sistema de Flor
- Detecção automática de Flor (3 cartas do mesmo naipe)
- Sistema de pontuação para Flor
- IA que declara e responde a Flor
- Regras e tutorial atualizados para Flor

## Licença

Este projeto é de código aberto.
- Sistema de turnos

### Iteração 5: Jogar Cartas e Lógica de Rodadas
- Jogar cartas
- Comparação de cartas
- Determinação de vencedor da rodada

### Iteração 6: Sistema de Apostas
- Truco, Retruco, Vale Quatro
- Aceitar/Recusar desafios
- Multiplicadores de pontos

### Iteração 7: IA Básica
- IA com diferentes níveis de dificuldade
- Jogadas automáticas da IA
- Estratégias básicas

### Iteração 8: Modo Prática
- Seletor de dificuldade
- Sistema de dicas
- Sugestões de jogadas

### Iteração 9: Módulos de Tutorial Completos
- 4 módulos de tutorial
- Sistema de progresso
- Badges de conquistas

### Iteração 10: Guia de Estratégias
- Conteúdo de estratégias avançadas
- Exemplos interativos
- Quizzes de estratégia

### Iteração 11: Estatísticas e Replay
- Estatísticas de jogos
- Sistema de replay
- Histórico de partidas

### Iteração 12: PWA e Polimento
- Manifest PWA
- Service Worker
- Error boundaries
- Loading states

## Licença

Este projeto é de código aberto.

