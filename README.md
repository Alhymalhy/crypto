# it-code-hw6-crypto

Создать:
Детальная страница одного элемента с подробной информацией об элементе (прим. Товар, репозиторий итд) (данные для элемента брать из АПИ без запроса и пока положить в переменную в компоненте)

Страница списка элементов (список брать из апи без запроса и скопировать в переменную), клик по элементу должен прокидывать на детальную страницу товара

Роутинг. В вашем приложении должна быть реализована маршрутизация

Хедер приложения должен быть вынесен за роутер и отрисовываться независимо от страницы, на которой мы находимся, так же на детальной странице элемента в хедере должна быть ссылка на страницу списка элементов

В проекте должна быть соблюдена структура, рассказанная в 7 лекции

https://docs.google.com/spreadsheets/d/1dD1D19P7F7fcE5xuD1ThYoc923-YVeCes_j3Kd0mw1o/edit?usp=sharing

Срок до 15 мая включительно

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
