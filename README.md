# What is this?

**POC of a full stack application utilizing AWS Amplify and AppSync GraphQL APIs**

Resources:

- [LinkedIn Learning Course](https://www.linkedin.com/learning-login/share?account=75072442&forceAccount=false&redirect=https%3A%2F%2Fwww.linkedin.com%2Flearning%2Fbuild-a-full-stack-javascript-application-using-aws-amplify%3Ftrk%3Dshare_ent_url%26shareId%3DrX3UEsaJQpqAEq1vhnACgw%253D%253D)
- https://aws.amazon.com/appsync/
- https://graphql.org/graphql-js/running-an-express-graphql-server/
- https://mobilelive.medium.com/graphql-pitfalls-and-how-we-avoid-them-a-comprehensive-guide-ab11a20d657
- https://docs.amplify.aws/react/build-a-backend/

## How do I run this?

First you will need vite installed globally

`npm install -g vite`

Then you will need to install the dependencies:

`npm install`

Finally, you will need to run dev:

`npm run dev`

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
