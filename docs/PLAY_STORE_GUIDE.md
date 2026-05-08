# Guia Completo: Publicar Bichinho Match na Google Play Store

## Indice

1. [Pre-requisitos](#1-pre-requisitos)
2. [Preparar o projeto](#2-preparar-o-projeto)
3. [Gerar o Android App Bundle](#3-gerar-o-android-app-bundle)
4. [Criar conta no Google Play Console](#4-criar-conta-no-google-play-console)
5. [Preparar assets da loja](#5-preparar-assets-da-loja)
6. [Configurar a ficha da loja](#6-configurar-a-ficha-da-loja)
7. [Classificacao de conteudo](#7-classificacao-de-conteudo)
8. [Politica de privacidade](#8-politica-de-privacidade)
9. [Upload e revisao](#9-upload-e-revisao)
10. [Families Policy (apps infantis)](#10-families-policy-apps-infantis)
11. [Apos a publicacao](#11-apos-a-publicacao)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Pre-requisitos

Antes de comecar, voce precisa de:

- **Node.js** (v18 ou superior) - [nodejs.org](https://nodejs.org)
- **Android Studio** (versao mais recente) - [developer.android.com/studio](https://developer.android.com/studio)
- **JDK 17** (geralmente ja vem com o Android Studio)
- **Conta Google Play Console** - custa $25 (taxa unica, paga uma vez so)

### Instalar Android Studio

1. Baixe e instale o Android Studio
2. Na primeira execucao, aceite instalar o Android SDK
3. Va em **SDK Manager > SDK Platforms** e instale o Android 14 (API 34)
4. Va em **SDK Manager > SDK Tools** e marque:
   - Android SDK Build-Tools
   - Android SDK Command-line Tools
   - Android Emulator (opcional, para testar)

---

## 2. Preparar o projeto

### 2.1 Clonar o repositorio

```bash
git clone https://github.com/Ronbragaglia/bichinho-match.git
cd bichinho-match
```

### 2.2 Instalar dependencias

```bash
npm install
```

### 2.3 Substituir assets placeholder

Os arquivos de arte estao em `public/assets/`. Voce precisa substituir os placeholders por arte real:

**Imagens dos animais** (recomendado 256x256 PNG cada):
- Gato, Cachorro, Coelho, Urso, Panda, Leao
- Elefante, Macaco, Pinguim, Sapo, Coruja, Raposa

**Dica:** Sites com arte gratuita para jogos:
- [OpenGameArt.org](https://opengameart.org)
- [Kenney.nl](https://kenney.nl)
- [itch.io/game-assets](https://itch.io/game-assets/free)
- Ou use IA (DALL-E, Midjourney) para gerar as imagens

**Audio** (opcional mas recomendado):
- Musica de fundo (loop, formato .mp3 ou .ogg)
- Som de flip de carta
- Som de match (acerto)
- Som de erro
- Som de vitoria

### 2.4 Build do projeto web

```bash
npm run build
```

Isso gera a pasta `dist/` com o jogo compilado.

### 2.5 Adicionar plataforma Android

```bash
npx cap add android
npx cap sync
```

Isso cria a pasta `android/` com o projeto nativo.

---

## 3. Gerar o Android App Bundle

### 3.1 Abrir no Android Studio

```bash
npx cap open android
```

O Android Studio vai abrir com o projeto. Aguarde o Gradle sincronizar (pode levar alguns minutos na primeira vez).

### 3.2 Personalizar o app

No Android Studio, edite os seguintes arquivos:

**android/app/src/main/res/values/strings.xml:**
```xml
<string name="app_name">Bichinho Match</string>
```

**Icone do app:**
1. Clique direito em `app/src/main/res`
2. **New > Image Asset**
3. Selecione sua imagem de icone (512x512 PNG)
4. O Android Studio gera automaticamente todos os tamanhos

### 3.3 Criar Keystore (MUITO IMPORTANTE)

A keystore e a "chave" que identifica voce como dono do app. **Se perder, nunca mais consegue atualizar o app.**

1. No Android Studio: **Build > Generate Signed Bundle / APK**
2. Selecione **Android App Bundle**
3. Clique em **Create new...**
4. Preencha:
   - **Key store path:** escolha um local seguro (ex: `C:/keys/bichinho-match.jks`)
   - **Password:** crie uma senha forte
   - **Key alias:** `bichinho-match`
   - **Key password:** pode ser a mesma
   - **Validity:** 25 anos (padrao)
   - **Certificate:** preencha seu nome
5. Clique OK

**GUARDE A KEYSTORE E AS SENHAS EM LUGAR SEGURO!**
- Faca backup em pendrive, Google Drive, etc.
- Anote as senhas em lugar seguro
- Sem a keystore = impossivel atualizar o app

### 3.4 Gerar o AAB

1. Selecione a keystore que acabou de criar
2. Preencha as senhas
3. Selecione **release** como build variant
4. Clique **Finish**
5. O arquivo `.aab` sera gerado em `android/app/release/app-release.aab`

---

## 4. Criar conta no Google Play Console

1. Acesse [play.google.com/console](https://play.google.com/console)
2. Faca login com sua conta Google
3. Pague a taxa de $25 (unica)
4. Preencha os dados do desenvolvedor:
   - Nome do desenvolvedor (aparece na loja)
   - Email de contato (publico)
   - Telefone (para verificacao)

---

## 5. Preparar assets da loja

Voce vai precisar dos seguintes arquivos:

| Asset | Tamanho | Formato | Obrigatorio |
|-------|---------|---------|-------------|
| Icone do app | 512 x 512 px | PNG (32-bit) | Sim |
| Feature graphic | 1024 x 500 px | PNG ou JPG | Sim |
| Screenshots (celular) | min 320px, max 3840px | PNG ou JPG | Sim (min 2) |
| Screenshots (tablet 7") | mesmas regras | PNG ou JPG | Recomendado |
| Screenshots (tablet 10") | mesmas regras | PNG ou JPG | Recomendado |

### Como tirar screenshots

Opcao 1 - Emulador Android Studio:
1. Rode o app no emulador
2. Clique no icone de camera na barra do emulador

Opcao 2 - Navegador:
1. `npm run dev`
2. Abra no Chrome
3. F12 > Toggle Device Toolbar > Selecione um celular
4. Tire print (Win+Shift+S)

### Dicas para screenshots atraentes

- Mostre diferentes telas: menu, jogo em andamento, tela de vitoria
- Use molduras de celular (mockups) - [mockuphone.com](https://mockuphone.com)
- Adicione textos curtos destacando funcionalidades

---

## 6. Configurar a ficha da loja

No Google Play Console, crie um novo app e preencha:

### Detalhes do app

- **Nome do app:** Bichinho Match - Jogo da Memoria
- **Descricao curta (80 chars):**
  ```
  Jogo da memoria com animais fofos! 8 niveis, estrelas e muita diversao!
  ```
- **Descricao longa (4000 chars):**
  ```
  Bichinho Match e um jogo da memoria super divertido para criancas!

  Encontre os pares de animais fofos virando as cartas. Sao 12 bichinhos
  adoraveis esperando por voce: gato, cachorro, coelho, urso, panda, leao,
  elefante, macaco, pinguim, sapo, coruja e raposa!

  CARACTERISTICAS:
  - 8 niveis progressivos (do facil ao desafiador)
  - 12 animais fofos com nomes em portugues
  - Sistema de estrelas (ganhe ate 3 estrelas por nivel!)
  - Combos para multiplicar seus pontos
  - Animacoes divertidas e confete na vitoria
  - Totalmente offline - jogue em qualquer lugar
  - Sem anuncios e sem compras no app
  - Seguro para criancas (COPPA compliant)

  Perfeito para criancas desenvolverem a memoria, concentracao e
  reconhecimento de padroes enquanto se divertem!

  Nenhuma conexao com internet necessaria.
  Nenhum dado pessoal coletado.
  ```

### Categoria e tags

- **Tipo:** Jogo
- **Categoria:** Educativo
- **Tags:** memoria, infantil, animais, educativo, criancas

---

## 7. Classificacao de conteudo

O Google exige que voce preencha um questionario de classificacao. Para o Bichinho Match:

1. Va em **Politica > Classificacao de conteudo do app**
2. Inicie o questionario
3. Responda:
   - Violencia: **Nao**
   - Conteudo sexual: **Nao**
   - Linguagem: **Nao**
   - Substancias controladas: **Nao**
   - Conteudo gerado por usuario: **Nao**
   - Anuncios: **Nao**
   - Compras digitais: **Nao**
   - Compartilhamento de localizacao: **Nao**

O resultado sera **Classificacao Livre** em todas as regioes.

---

## 8. Politica de privacidade

A Play Store exige politica de privacidade, especialmente para apps infantis.

### Opcao 1: GitHub Pages (gratis)

1. No repositorio do GitHub, va em **Settings > Pages**
2. Em Source, selecione **Deploy from a branch**
3. Selecione **main** e pasta **/ (root)**
4. Salve
5. Sua politica ficara em:
   ```
   https://ronbragaglia.github.io/bichinho-match/legal/privacy-policy.html
   ```

### Opcao 2: Usar o link direto do GitHub

```
https://github.com/Ronbragaglia/bichinho-match/blob/main/legal/privacy-policy.html
```

Use essa URL no campo "Politica de Privacidade" do Google Play Console.

---

## 9. Upload e revisao

### 9.1 Upload do AAB

1. No Play Console, va em **Producao > Criar nova versao**
2. Faca upload do arquivo `.aab`
3. Adicione notas da versao:
   ```
   Versao 1.0.0 - Lancamento inicial
   - 8 niveis de jogo da memoria
   - 12 animais fofos
   - Sistema de estrelas e combos
   ```
4. Clique **Salvar** e depois **Revisar versao**

### 9.2 Checklist antes de enviar

Verifique se tudo esta preenchido:

- [ ] Ficha da loja (nome, descricao, screenshots, icone, feature graphic)
- [ ] Classificacao de conteudo preenchida
- [ ] Politica de privacidade com URL valida
- [ ] Preco e distribuicao (Gratis, todos os paises)
- [ ] App bundle (.aab) uploaded
- [ ] Notas da versao preenchidas

### 9.3 Enviar para revisao

Clique em **Iniciar lancamento para Producao**.

**Tempo de revisao:**
- Primeira vez: **3 a 7 dias uteis**
- Atualizacoes futuras: **1 a 3 dias**
- Pode demorar mais em periodos de alta demanda

---

## 10. Families Policy (apps infantis)

Como o Bichinho Match e voltado para criancas, o Google aplica regras extras:

### O que o Google exige

- **Sem anuncios** direcionados a criancas (nosso app nao tem ads - OK!)
- **Sem coleta de dados** pessoais (nosso app e 100% offline - OK!)
- **Sem links externos** que levem a conteudo inadequado
- **Sem compras no app** sem supervisao parental (nosso app e gratis - OK!)
- **Politica de privacidade** que mencione conformidade com COPPA (ja incluida!)

### Formulario Families

No Play Console:
1. Va em **Publico-alvo e conteudo**
2. Selecione a faixa etaria: **Ate 5 anos** e **6 a 8 anos**
3. Confirme que o app segue a Families Policy
4. O app pode aparecer na aba "Criancas" da Play Store

---

## 11. Apos a publicacao

### Monitorar

- **Play Console > Estatisticas:** downloads, avaliacoes, retencao
- **Play Console > Avaliacoes:** responda avaliacoes dos usuarios
- **Android Vitals:** crashes e performance

### Atualizar o app

Para publicar atualizacoes:

1. Faca as mudancas no codigo
2. Incremente a versao em `package.json`
3. Rode:
   ```bash
   npm run build
   npx cap sync
   npx cap open android
   ```
4. No Android Studio, aumente o `versionCode` em `android/app/build.gradle`
5. Gere novo AAB (use a MESMA keystore!)
6. Upload no Play Console > Producao > Nova versao

### Ideias para atualizacoes futuras

- Novos temas de animais (marinhos, fazenda, dinossauros)
- Modo desafio com tempo
- Animacoes e sons reais dos animais
- Mais niveis
- Modo multiplayer local

---

## 12. Troubleshooting

### "Gradle sync failed"
- Verifique se o JDK 17 esta instalado
- File > Invalidate Caches and Restart

### "SDK not found"
- Abra SDK Manager e instale Android 14 (API 34)
- Verifique o `local.properties` no projeto android

### "Keystore password incorrect"
- Verifique se esta usando a senha correta
- Maiusculas/minusculas importam

### "App rejected by Google"
- Leia o email de rejeicao com atencao
- Motivos mais comuns: metadados incompletos, screenshots ruins, politica de privacidade faltando
- Corrija e reenvie

### "Build failed"
- Rode `npx cap sync` novamente
- Limpe o build: **Build > Clean Project** no Android Studio
- Verifique se `npm run build` roda sem erros antes do `cap sync`

---

## Resumo rapido (TL;DR)

```bash
# 1. Clone e instale
git clone https://github.com/Ronbragaglia/bichinho-match.git
cd bichinho-match && npm install

# 2. Substitua os assets placeholder por arte real

# 3. Build e prepare o Android
npm run build
npx cap add android
npx cap sync
npx cap open android

# 4. No Android Studio: Build > Generate Signed Bundle
#    Crie keystore, gere o .aab

# 5. No Google Play Console ($25):
#    Upload .aab, preencha ficha, envie para revisao

# 6. Aguarde 3-7 dias - seu jogo estara na Play Store!
```

---

*Guia criado para o projeto Bichinho Match - github.com/Ronbragaglia/bichinho-match*
