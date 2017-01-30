---
layout: post
title:  "TypeScript via NPM"
date:   2016-12-22 14:15:21
categories: javascript
---

Dieser kurze Post zeigt eine mögliche Lösung, TypeScript-basierte Repositories via NPM zu installieren.

In einem aktuellen Projekt sollen TypeScript-basierte Repositories per NMP installiert werden können. Es existiert jedoch kein privater NPM Registry Server, d.h. die Repos werden einfach via git installiert:

`package.json` eines konsumierenden Projekts:

{% highlight json %}
"my-repo": "git+https://example.com/scm/foo/my-repo.git#1.0.0"
{% endhighlight %}

Daraus folgt, dass der kompilierte JavaScript-Code zusätzlich im Repo liegen muss. Diesen Seite-an-Seite mit dem TypeScript Code zu legen wollten wir jedoch vermeiden.

Der TypeScript Compiler unterstützt glücklicherweise eine Funktion namens "outDir", welche es ermöglicht die generierten JavaScript Dateien in ein eigenes Verzeichnis zu legen.

Daraus ergab sich bei uns folgende Verzeichnisstruktur:

{% highlight bash %}
src/
  some-file.ts
  some-file.spec.ts
  index.ts

js/
  some-file.js
  some-file.js.map
  index.js
  index.js.map
...
tsconfig.json
tslint.json
{% endhighlight %}

`index.ts` enthält alle notwendigen exports:

{% highlight javascript %}
export { SomeClass } from './some-file';
{% endhighlight %}

Die `tsconfig.json` sieht folgendermaßen aus:

{% highlight json lineos %}
{
  "compilerOptions": {
    "declaration": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "lib": ["es6", "dom"],
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "es5",
    "sourceMap": true,
    "typeRoots": [
      "./node_modules/@types"
    ],
    "outDir": "js",
    "noUnusedParameters": true,
    "noUnusedLocals": true
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "src/**/*.spec.ts",
    "src/test-setup.ts"
  ],
  "compileOnSave": false,
  "atom": {
    "rewriteTsconfig": false
  }
}
{% endhighlight %}

Jetzt muss man nur noch in der package.json das "main" property angeben:

{% highlight json %}
"main": "js/index.js"
{% endhighlight %}

Somit kann man in anderen Repositories dieses via NPM installieren und importieren:

{% highlight javascript %}
import { SomeClass } from "my-repo";
{% endhighlight %}
