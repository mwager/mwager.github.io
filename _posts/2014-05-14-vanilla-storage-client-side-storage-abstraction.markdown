---
layout: post
title:  "VanillaStorage.js - cross-browser HTML5 storage"
date:   2014-04-14 15:17:42
categories: javascript
---

[HTML5 Storage](http://www.html5rocks.com/en/features/storage) ist verwirrend.
LocalStorage ist ok, wenn man mit 2-5MB an Speicherplatz leben kann [1]. Erfordert eine Software allerdings mehr, so steht man erstmal recht blöd da, denn auf iOS und Android existiert nur die als @deprecated eingestufte WebSQL Datenbank, will man allerdings auch Firefox und Internet Explorer
(beide auch mobile) unterstützen, muss man allerdings IndexedDB verwenden, welche auf iOS und teilweise Android (noch) nicht unterstützt wird. Aus diesen Gründen habe ich meine eigene kleine Lib zur Abstraktion der dahinterliegenden Storagetechniken geschrieben: <a href="https://github.com/mwager/VanillaStorage" target="_blank" >VanillaStorage.js</a>.

__UPDATE: Da ich nun [localForage](http://mozilla.github.io/localForage/) von Mozilla verwende, habe ich jegliche Wartung für dieses Tool eingestellt!__


<div class="fancy-images-in-grid pure-g">
    <div class="pure-u-1-3">
        <a href="/images/vanilla/caniuse-idb.png" class="fancybox" rel="caniuse-images" title="IndexedDB">
            <img src="/images/vanilla/caniuse-idb.png">
        </a>
    </div>
    <div class="pure-u-1-3">
         <a href="/images/vanilla/caniuse-websql.png" class="fancybox" rel="caniuse-images" title="WebSQL">
            <img src="/images/vanilla/caniuse-websql.png">
        </a>
    </div>
    <div class="pure-u-1-3">
         <a href="/images/vanilla/caniuse-local-storage.png" class="fancybox" rel="caniuse-images" title="LocalStorage">
            <img src="/images/vanilla/caniuse-local-storage.png">
        </a>
    </div>
</div>
<small>Caniuse-Screenshots für IndexedDB, WebSQL und Local Storage (Klicken/Tippen zum Vergrößern)</small>


## WTF? ##

Sieht man sich die 3 Bilder von _Caniuse_ an, so wird schnell klar dass man mit __LocalStorage__ problemlos alle Plattformen unterstützen kann wenn man _kleinere_ Mengen an Daten speichern möchte - wir sprechen dennoch von ca. 2-5 MB was im Vergleich zu Cookies (~4KB) bereits einen beachtlichen Unterschied darstellt. Mit LocalStorage bieten die Browser allerdings nur eine synchrone (= blockierende) API, was bei Schreib- oder Leseoperationen größerer Datenmengen zu Performanceproblemen führen kann, speziell auf mobilen Geräten. Für geringe Mengen eben ok. Benötigt man aber mehr Platz, so stößt man mit dieser API schnell an die Grenzen.


## WebSQL deprecated? ##

Vergleicht man nun die Caniuse-Tabellen für __IndexedDB__ und __WebSQL__, so sollte schnell auffallen, dass für wahre Plattformunabhängigkeit wohl der Einsatz beider Technologien notwendig zu sein scheint, zumindest zum jetzigen Zeitpunkt. Firefox und Internet Explorer unterstützen WebSQL nicht, wichtige mobile Plattformen wie Android und iOS unterstützen nur WebSQL (Chrome für Android kann allerdings bereits IndexedDB).

_Aber WebSQL ist doch als veraltet eingestuft?_ Stimmt, die starke Verbreitung zwingt die Browserhersteller allerdings aktuell noch dazu die Technologie zu unterstützen. Firefox hat sich von Anfang an gegen die Implementierung von WebSQL gewehrt und die W3C hat die Spezifikation als [decrecated eingestuft](http://www.w3.org/TR/webdatabase/).


## VanillaStorage.js ##

Um diese Probleme zu umgehen habe ich ein einfaches Tool zur Abstraktion der verfügbaren Speichermechanismen geschrieben. `VanillaStorage.js` ermöglicht die browserübergreifende Persistenz von Daten im key/value-Style. IndexedDB wird bevorzugt, sofern jedoch nicht verfügbar wird WebSQL Support geprüft und ggf. verwendet. Sind beide Methoden aus irgendwelchen Gründen nicht verfügbar (zB IE <= 9 oder Browser im private Mode) oder geht beim Initialisieren etwas schief, so wird dem Initialisierungs-Callback ein Fehler übergeben. VanillaStorage.js ist also im Endeffekt nichts weiter als ein Frontend der dahinterliegenden Klassen `IndexDBStorage` und `WebSQLStorage`, welche beide das selbe öffentliche Interface implementieren - aber auch selbstständig verwendet werden können.


## Einsatz in der Praxis ##

Das Tool entstand dadurch, dass ich in einem Projekt eine einfache key/value basierte Storage-Lösung benötigt habe, welche wirklich crossbrowser (ab IE10) lauffähig ist. VanillaStorage.js kann sogar ohne Weiteres in Cordova/Phonegap verwendet werden!

Zum aktuellen Zeitpunkt (Mai 2014) läuft `Vanilla.js` in einer App im __Beta-Status im Produktivbetrieb mit >5000 Zugriffen pro Tag__ - und das erstaunlich stabil! In der App müssen vor allem sehr große JSON Objekte für Offline-Support (i.d.R. einmalig) persistiert werden. Datensätze zu durchsuchen oder einzeln zu aktualisieren war keine Anforderung weshalb dafür bis jetzt auch keine Unterstützung vorhanden ist. Eben einfach nur `key/value`-Style - nicht mehr und nicht weniger.


### Ausprobieren? ###

Es existiert ein [JSFiddle zur Demonstration](http://jsfiddle.net/G8h2V/10/). Die UNIT Tests kann man sich <a href="http://mwager.github.io/VanillaStorage/test/">hier</a> ansehen.

<blockquote>
Tipp: In Chrome kann man in den Dev-Tools unter dem `Resources`-Tab die WebSQL- bzw. IndexedDB Daten herrlich einfach untersuchen.
</blockquote>

Code und Dokumentation ist auf Github [verfügbar](https://github.com/mwager/VanillaStorage), Feedback, Bugreports etc. natürlich herzlich Willkommen.


## Quellen und weiterführende Informationen ##

* [1] [http://dev-test.nemikor.com/web-storage/support-test/](http://dev-test.nemikor.com/web-storage/support-test/)
* [http://nolanlawson.com/2014/04/26/web-sql-database-in-memoriam/](http://nolanlawson.com/2014/04/26/web-sql-database-in-memoriam/)
* [http://blog.oharagroup.net/post/16394604653/a-performance-comparison-websql-vs-indexeddb](http://blog.oharagroup.net/post/16394604653/a-performance-comparison-websql-vs-indexeddb)
* [https://hacks.mozilla.org/2014/02/localforage-offline-storage-improved/](https://hacks.mozilla.org/2014/02/localforage-offline-storage-improved/)
* [PouchDB](http://pouchdb.com/)
