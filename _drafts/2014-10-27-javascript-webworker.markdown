---
layout: post
title:  "WebWorkers - Nebenläufigkeit im Browser"
date:   2014-10-27 11:32:12
categories: javascript
---

Die [Web-Workers Spezifikation](https://html.spec.whatwg.org/multipage/workers.html) definiert eine JavaScript API um länger laufende Prozesse im Hintergrund auszuführen, ohne dabei die Benutzeroberfläche zu unterbrechen. Sowas ähnliches wie Threads im Browser also. Browsersupport ist mittlerweile äußerst [weit verbreitet](http://caniuse.com/#feat=webworkers) und somit ist diese API durchaus reif für den Produktivbetrieb. Dieser Post gibt einen Überblick über Funktionsweise, Einsatzmöglichkeiten sowie Vor- und Nachteile der Web Workers API.

## Struktur ##
1. einleitung, was sind webworker (kurz)
2. was ist mögliuch? kein "window" !!! ABER: ajax, evtl auch storage bald.. ETC!?
2. supporting old browsers? fallback wäre möglich - jedoch performance?
3. parallel.js vorstellen
4. bsp mit primzahlen und webworker - NO UI FREEZE! (ref auf timer post!)
5. zusammenfassung
6. quellen
7. "In short: Pretty much any situation where you find yourself thinking “Hey, I need to split this task apart using timers” – that’s where Web Workers can step in." -> http://ejohn.org/blog/web-workers/

## TODOs ##
* HMM!??!?: http://www.html5rocks.com/de/tutorials/workers/basics/
* evtl diesen Post hier bewerben: https://www.xing.com/net/pri04daf0x/javascript/questions-answers-89861/webworker-api-46616286/
*

## Einleitung ##

Workerscripte befinden sich in einer eigenen Datei und werden mit Hilfe des `Worker` Konstruktors geladen und initialisiert:

__main.js__

{% highlight javascript linenos %}
var worker = new Worker('worker.js');
worker.onmessage = function (event) {
   // result data from worker can be found in event.data
};
{% endhighlight %}

Die Datei `worker.js` muss sich im selben Verzeichnis wie `main.js` befinden. In diesem Beispiel wird einfach die nächst höchste Primzahl berechnet, und via der Methode `postMessage(data)` wieder an den `onmessage`-Callback im Host-Skript zurückgegeben:

__worker.js__

{% highlight javascript linenos %}
var n = 1;
search: while (true) {
  n += 1;
  for (var i = 2; i <= Math.sqrt(n); i += 1)
    if (n % i == 0)
     continue search;
  // found a prime!
  postMessage(n);
}
{% endhighlight %}

Jedesmal wenn nun eine neue Primzahl berechnet wurde, kann diese zB auf dem Bildschirm angezeigt werden. Ein Beispiel befindet sich [hier](https://whatwg.org/demos/workers/primes/page.html). Beachte, dass der Browser die ganze Zeit responsiv bleibt, also nicht anfängt zu "hängen". Man kann zB ohne Weiteres den DOM inspizieren. Würde man dieses Beispiel direkt in der `main.js` ausführen, so würde jeder Browser schnell an seine Grenzen stoßen und die Seite wäre nicht mehr nutzbar, ja könnte sogar crashen, vor allem auf den Browsern mobiler Geräte.

## Einschränkungen ##

Die wichtigste Einschränkung ist, dass kein Zugriff auf `window` innerhalb eines Workers möglich ist. Worker sind also hauptsächlich dafür ausgelegt, rohe Daten hineinzugeben und ein Ergebnis zu erhalten. Nichtsdestotrotz sind ein paar globale APIs innerhalb von Workern möglich, wie zB `XMLHttpRequest`
