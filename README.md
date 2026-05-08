# Bichinho Match - Jogo de Memoria Infantil

[![Build & Test](https://github.com/Ronbragaglia/bichinho-match/actions/workflows/build.yml/badge.svg)](https://github.com/Ronbragaglia/bichinho-match/actions/workflows/build.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-green.svg)](https://nodejs.org/)

<!-- screenshots aqui -->

## Sobre

**Bichinho Match** e um jogo da memoria infantil com animais fofos, desenvolvido com Phaser.js. O jogo foi criado para criancas, com interface colorida, animacoes divertidas e progressao por niveis com sistema de estrelas.

O objetivo e simples: encontrar todos os pares de animais virand as cartas. Quanto mais rapido e com menos jogadas, mais estrelas voce ganha!

## Funcionalidades

- **8 niveis progressivos** - de 2x2 (4 cartas) ate 4x6 (24 cartas)
- **12 animais fofos** - Gato, Cachorro, Coelho, Urso, Panda, Leao, Elefante, Macaco, Pinguim, Sapo, Coruja e Raposa
- **Sistema de estrelas** - Ganhe ate 3 estrelas por nivel baseado na sua performance
- **Sistema de combos** - Acerte sequencias para multiplicar seus pontos
- **Confetes e particulas** - Animacoes de celebracao ao completar niveis
- **Temporizador** - Cada nivel tem um limite de tempo
- **Preview das cartas** - As cartas sao mostradas antes de comecar para memorizar
- **Progresso salvo** - Seu progresso e salvo automaticamente no dispositivo
- **100% offline** - Nao requer conexao com a internet
- **COPPA compliant** - Sem coleta de dados, sem anuncios, sem compras in-app
- **Responsivo** - Funciona em celulares, tablets e desktops

## Stack Tecnologica

| Tecnologia | Uso |
|---|---|
| [Phaser.js 3](https://phaser.io/) | Motor do jogo (renderizacao, cenas, tweens, input) |
| [Vite](https://vitejs.dev/) | Bundler e servidor de desenvolvimento |
| [Capacitor](https://capacitorjs.com/) | Build nativo para Android/iOS |
| JavaScript ES2022 | Linguagem principal |
| localStorage | Persistencia de progresso |

## Inicio Rapido

### Pre-requisitos

- [Node.js 20+](https://nodejs.org/)
- npm (incluso com Node.js)

### Instalacao

```bash
# Clone o repositorio
git clone https://github.com/Ronbragaglia/bichinho-match.git
cd bichinho-match

# Instale as dependencias
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O jogo abrira automaticamente em `http://localhost:3000`.

### Scripts Disponiveis

| Comando | Descricao |
|---|---|
| `npm run dev` | Servidor de desenvolvimento na porta 3000 |
| `npm run build` | Build de producao (pasta `dist/`) |
| `npm run preview` | Preview do build de producao |
| `npm run lint` | Verificacao de codigo com ESLint |

## Build para Android

### Pre-requisitos

- [Android Studio](https://developer.android.com/studio) instalado
- JDK 17+

### Passos

```bash
# Build do projeto web
npm run build

# Adicionar plataforma Android (primeira vez)
npm run cap:add

# Sincronizar arquivos
npm run cap:sync

# Abrir no Android Studio
npm run cap:open
```

No Android Studio, conecte um dispositivo ou use o emulador e clique em "Run".

## Estrutura do Projeto

```
bichinho-match/
├── public/
│   └── assets/
│       ├── images/          # Imagens dos animais (placeholder)
│       └── audio/           # Arquivos de audio (placeholder)
├── src/
│   ├── main.js              # Ponto de entrada
│   ├── config/
│   │   ├── gameConfig.js    # Configuracao do Phaser
│   │   ├── levels.js        # Definicao dos 8 niveis
│   │   └── constants.js     # Animais, cores, pontuacao, timing
│   ├── scenes/
│   │   ├── BootScene.js     # Carregamento e assets placeholder
│   │   ├── MenuScene.js     # Tela inicial
│   │   ├── LevelSelectScene.js  # Selecao de nivel
│   │   ├── GameScene.js     # Cena principal do jogo
│   │   └── WinScene.js      # Tela de vitoria
│   ├── objects/
│   │   ├── Card.js          # Componente de carta
│   │   ├── ParticleManager.js   # Particulas e confetes
│   │   └── StarRating.js    # Exibicao de estrelas
│   ├── managers/
│   │   ├── AudioManager.js  # Gerenciamento de audio
│   │   ├── ScoreManager.js  # Calculo de pontuacao
│   │   └── StorageManager.js    # Persistencia localStorage
│   └── utils/
│       ├── shuffle.js       # Fisher-Yates shuffle
│       └── responsive.js    # Utilitarios de escala
├── legal/
│   ├── privacy-policy.html  # Politica de privacidade
│   └── terms-of-service.html    # Termos de servico
├── store-assets/             # Assets para publicacao na loja
├── .github/workflows/
│   └── build.yml            # CI/CD com GitHub Actions
├── capacitor.config.ts      # Configuracao do Capacitor
├── vite.config.js           # Configuracao do Vite
├── package.json
├── index.html
├── .gitignore
└── .eslintrc.json
```

## Design dos Niveis

| Nivel | Grade | Pares | Preview | Tempo |
|---|---|---|---|---|
| 1 | 2x2 | 2 | 3s | 30s |
| 2 | 2x3 | 3 | 2.5s | 45s |
| 3 | 3x2 | 3 | 2.5s | 45s |
| 4 | 3x4 | 6 | 2s | 60s |
| 5 | 4x3 | 6 | 2s | 60s |
| 6 | 4x4 | 8 | 1.5s | 90s |
| 7 | 4x5 | 10 | 1.5s | 120s |
| 8 | 4x6 | 12 | 1s | 150s |

## Contribuindo

Contribuicoes sao bem-vindas! Para contribuir:

1. Faca um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Commit suas alteracoes (`git commit -m 'feat: adiciona minha feature'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

### Diretrizes

- Siga o estilo de codigo existente (ESLint com zero warnings)
- Use commits semanticos (feat, fix, chore, docs)
- Teste suas alteracoes em dispositivos moveis e desktop
- Mantenha a compatibilidade COPPA (sem coleta de dados)

## Licenca

Este projeto esta licenciado sob a [Licenca MIT](https://opensource.org/licenses/MIT).

## Links

- [Politica de Privacidade](legal/privacy-policy.html)
- [Termos de Servico](legal/terms-of-service.html)
- [Repositorio GitHub](https://github.com/Ronbragaglia/bichinho-match)
