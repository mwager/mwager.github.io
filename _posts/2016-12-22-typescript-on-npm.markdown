---
layout: post
title:  "TypeScript via NPM"
date:   2016-12-22 14:15:21
categories: javascript
---

Dieser kurze Post zeigt eine mögliche Lösung, TypeScript-basierte Repositories via NPM zu installieren.

In einem aktuellen Projekt sollen TypeScript-basierte Repositories per NPM installiert werden können. Es existiert jedoch kein privater NPM Registry Server, d.h. die Repos werden einfach via git installiert:

`package.json` eines konsumierenden Projekts:

{% highlight json %}
"my-repo": "git+https://example.com/scm/foo/my-repo.git#1.0.0"
{% endhighlight %}

Der kompilierten JavaScript Quellen müssen sich zusätzlich im Repository befinden. Diese Seite-an-Seite zu den TypeScript Quellen zu legen wollten wir jedoch vermeiden.

Der TypeScript Compiler unterstützt glücklicherweise eine Funktion namens "outDir", welche es ermöglicht die generierten JavaScript Dateien in ein eigenes Verzeichnis zu legen.

Daraus ergab sich bei uns folgende Verzeichnisstruktur:

{% highlight bash %}
src/
  some-class.ts
  some-class.spec.ts
  index.ts

js/
  some-class.js
  some-class.js.map
  some-class.d.ts
  index.js
  index.js.map
  index.d.ts
...
tsconfig.json
{% endhighlight %}

`index.ts` enthält alle notwendigen exports:

{% highlight javascript %}
export { SomeClass } from './some-class';
{% endhighlight %}

Die `tsconfig.json` sieht folgendermaßen aus:

{% highlight json lineos %}
{
  "compilerOptions": {
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
    "declaration": true,
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

Die Quellen werden dadurch zusammen mit den Declaration-Dateien im `js` Verzeichnis abgelegt. Jetzt muss man nur noch in der `package.json` das `"main"`-, sowie das `"types"`-Property angeben:

{% highlight json %}
"main": "./js/index.js",
"types": "./js/index.d.ts",
{% endhighlight %}

Somit kann man in anderen Repositories dieses via NPM installieren und importieren:

{% highlight javascript %}
import { SomeClass } from "my-repo";
{% endhighlight %}


## Links

* [https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)
