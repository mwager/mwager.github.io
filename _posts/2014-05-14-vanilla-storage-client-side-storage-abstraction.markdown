---
layout: post
title:  "VanillaStorage.js - cross-browser HTML5 storage"
date:   2014-05-14 15:17:42
categories: javascript
---

<em>
[HTML5 Storage](http://www.html5rocks.com/en/features/storage) ist verwirrend und anstrengend.
LocalStorage ist ok, wenn man mit 2-5MB an Speicherplatz leben kann [1]. Erfordert eine Software
allerdings mehr, so steht man erstmal recht blöd da, denn auf iOS und Android existiert nur die
als @deprecated eingestufte WebSQL Datenbank, will man allerdings auch Firefox und Internet Explorer
(beide auch mobile) unterstützen kann man die aktuell noch in der Entwicklung befindliche IndexedDB-API
verwenden, welche auf iOS und teilweise Android noch nicht unterstützt wird. Aus diesen Gründen habe
ich meine eigene kleine Lib zur Abstraktion der dahinterliegenden Storagetechniken geschrieben:
<a href="https://github.com/mwager/VanillaStorage" target="_blank" >VanillaStorage.js</a>
</em>


### TODOs ###
* DAMN LOCAL FORAGE !!!!!!!!!!!!!!!!!!!!!!!!!!
* Intro-Bild? vanilla...?
* in den tests zeigen bis jetzt das key/value performant genug ist wenn man große daten speichert!? hmm..
* evtl erst wenn vanilla mal in production ist/war !? dann kann ich schreiben dass in
* http://nolanlawson.com/2014/04/26/web-sql-database-in-memoriam/
* IMPLEMENTIERUNG VERGLEICHEN:
    => https://github.com/mozilla/localForage

<div class="fancy-images-in-grid pure-g">
    <div class="pure-u-1-3">
        <a href="/images/vanilla/caniuse-idb.png" class="fancybox" rel="caniuse-images">
            <img src="/images/vanilla/caniuse-idb.png">
        </a>
    </div>
    <div class="pure-u-1-3">
         <a href="/images/vanilla/caniuse-websql.png" class="fancybox" rel="caniuse-images">
            <img src="/images/vanilla/caniuse-websql.png">
        </a>
    </div>
    <div class="pure-u-1-3">
         <a href="/images/vanilla/caniuse-local-storage.png" class="fancybox" rel="caniuse-images">
            <img src="/images/vanilla/caniuse-local-storage.png">
        </a>
    </div>
</div>
<small>Caniuse-Screenshots für IndexedDB, WebSQL und Local Storage (Klicken/Tippen zum Vergrößern)</small>


### WTF? ###

Sieht man sich die 3 Bilder von _Caniuse_ an, so wird schnell klar dass man mit __LocalStorage__ problemlos alle Plattformen unterstützen kann wenn man _kleinere_ Mengen an Daten speichern möchte - wir sprechen dennoch von ca. 2-5 MB was im Vergleich zu Cookies (ca 4KB TODO?) bereits einen beachtlichen Unterschied darstellt. Mit LocalStorage bieten die Browser allerdings nur eine asynchrone (= blockierende) API und die Performance ist aufgrund des Dateisystemzugriffs bei jeder Lese- und Schreiboperation auch bedenklich. Für geringe Mengen eben ok. Benötigt man aber mehr Platz um zB wahren __Offline Support__ via [HTML5 AppCache](https://developer.mozilla.org/en/docs/HTML/Using_the_application_cache) bereitzustellen, so stößt man mit dieser API schnell an die Grenzen.



### WebSQL stirbt, IndexedDB noch in Entwicklung ###

Vergleicht man nun die Caniuse-Tabellen für __IndexedDB__ und __WebSQL__, so sollte schnell auffallen, dass für wahre Plattformunabhängigkeit wohl der Einsatz beider Technologien notwendig zu sein scheint. Firefox und Internet Explorer unterstützen WebSQL nicht, wichtige mobile Plattformen wie Android und iOS unterstützen nur WebSQL (Chrome für Android kann allerdings bereits IndexedDB).

_Aber WebSQL ist doch als veraltet eingestuft?_ Stimmt, die starke Verbreitung zwingt die Browserhersteller allerdings aktuell noch dazu die Technologie zu unterstützen. Firefox hat sich von Anfang an gegen die Implementierung von WebSQL gewehrt (TODO link/quelle!) und unterstützt IndexedDB schon länger. Auch der Internet Explorer ist ab Version XXX TODO gut dabei wie man hier sehen kann.


### VanillaStorage.js ###

Um diese Ganzen Probleme zu umgehen habe ich eine einfaches Tool zur Abstraktion der verfügbaren Speichermechanismen geschrieben. `VanillaStorage.js` ermöglicht die Browserübergreifende key/value-Speicherung von Daten. IndexedDB wird bevorzugt, sofern jedoch nicht verfügbar wird WebSQL Support geprüft und ggf. verwendet. Sind beide Methoden aus irgendwelchen Gründen nicht verfügbar (zB IE <= 9) oder geht beim Initialisieren etwas schief, so wird dem Initialisierungs-Callback ein Fehler übergeben. VanillaStorage.js ist also im Endeffekt nichts weiter als ein Frontend der dahinterliegenden Klassen `IndexDBStorage` und `WebSQLStorage`, welche beide das selbe öffentliche Interface implementieren - aber auch selbstständig verwendet werden können.


### Einsatz in der Praxis ###

Das Tool entstand hauptsächlich weil ich in einem Projekt eine einfache key/value basierte Storage Lösung benötigt habe, welche wirklich Crossbrowser (ab IE9) lauffähig ist. VanilaStorage.js kann sogar ohne Weiteres in Cordova/Phonegap verwendet werden.

Zum aktuellen Zeitpunkt läuft `Vanilla` in einer App im __Beta-Status im Produktivbetrieb mit ca. 15000 Zugriffen pro Tag__ - und das erstaunlich stabil! __(TODO! zahlen tobe?)__ In der App müssen vor allem sehr große JSON Objekte für Offline-Support (i.d.R. einmalig) persistiert werden. Datensätze zu durchsuchen oder einzeln zu aktualisieren war keine Anforderungen weshalb dafür bis jetzt auch keine Unterstützung vorhanden ist. Simpler `key/value Style`.


#### Ausprobieren?  ####

Es existiert ein [JSFiddle zur Demonstration](http://jsfiddle.net/G8h2V/10/). Die UNIT Tests kann man sich <a href="http://mwager.github.io/VanillaStorage/test/">hier</a> ansehen.

<blockquote>
Tipp: In Chrome kann man in den Dev-Tools unter dem `Resources`-Tab die WebSQL- bzw. IndexedDB Daten herrlich einfach untersuchen.
</blockquote>

Code und Dokumentation ist auf Github [verfügbar](https://github.com/mwager/VanillaStorage), Feedback, Bugreports etc. natürlich herzlich Willkommen.


##### Quellen #####

* [1](http://dev-test.nemikor.com/web-storage/support-test/](http://dev-test.nemikor.com/web-storage/support-test/)
* [http://blog.oharagroup.net/post/16394604653/a-performance-comparison-websql-vs-indexeddb](http://blog.oharagroup.net/post/16394604653/a-performance-comparison-websql-vs-indexeddb)
* [TaffyDB](http://www.taffydb.com/)
* [PouchDB](http://pouchdb.com/)
