# CONFIGURAÇÕES DO PROJETO FILM-REACT

## VITE
 - Instalando Vite e a pasta do projeto.
 - Escolha nome do projeto e depois JavaScript.
```
1. npm create vite@latest
2. npm install
3. npm run dev
```
## Tailwind CSS
 - [Instale o Tailwind css](https://tailwindcss.com/docs/installation/using-vite)
```
npm install tailwindcss @tailwindcss/vite
```
 - Configure o vite.config.js:
```
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```
## API DE FILME - TMDB
[API DE FILME](https://developer.themoviedb.org/docs/getting-started)
 - Entre com sua Conta.
 - Vai em <> Api Reference.
 - Procure no Pesquisador **Movie**.
 - Escolha o **Discorver - Movie**.
 - Language - **Node**.