---
title: 配置
order: 2
type: v2/frame/ts
---

## tslint.json
```js
{
  "extends": ["tslint:latest"],
  "rules": {
    "no-submodule-imports": false,
    "object-literal-sort-keys": false,
    "no-implicit-dependencies": false
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx"
  ]
}
```

## tsconfig.json
```js
{
  "compilerOptions": {
    "strictNullChecks": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowJs": true,
    "experimentalDecorators": true,
    "jsx": "preserve",
    "noUnusedParameters": true,
    "noUnusedLocals": true,
    "noImplicitAny": true,
    "target": "es6",
    "lib": ["dom", "es2017"],
    "baseUrl": "src",
    "outDir": "dist",
    "paths": {
      "@/*": ["*"],
      "antd-mobile": ["node_modules/@lianjia/antd-mobile"],
      "services": ["services"],
      "pages": ["pages"],
      "stores": ["stores"],
      "utils": ["utils"],
      "components": ["components"],
      "assets": ["assets"]
    }
  },
  "exclude": ["node_modules", "dll", "webpack", "dist"],
}
```