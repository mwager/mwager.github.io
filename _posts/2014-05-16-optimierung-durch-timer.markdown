---
layout: post
title:  "JavaScript on Mobile - Einfache Optimierung mit Timern"
date:   2014-05-16 16:43:12
categories: javascript
---

<em>
Ein kleiner Trick um die Benutzeroberfläche bei Benutzereingaben auch bei rechenintensiven Aufgaben benutzbar zu halten. Der Trick dabei ist recht einfach: man verwendet Timer um den UI-Thread des Browsers nicht zu blockieren.
<br><br>
<strong>tl;dr</strong> <a href="http://jsbin.com/dumaxovo/1/edit">Demo</a> auf jsbin.com.
</em>

## The code ##

Ein kleines Codebeispiel um das Problem zu verdeutlichen. Es wird jQuery (oder Zepto) verwendet:

{% highlight javascript linenos %}
$('#some-button').on('click', function() {
    updateUI();

    // blocking
    doHeavyStuff();
});
{% endhighlight %}

Ist die Funktion `doHeavyStuff()` sehr rechenintensiv, so kann dies auf mobilen Geräten dazu führen, dass der Screen für kurze Zeit hängt, da der Browser keine UI Änderungen durchführen kann während JavaScript Code ausgeführt wird. Um dies zu verhindern, kann man rechenintensiven Code innerhalb eines Timers zeitverzögert ausführen:

{% highlight javascript linenos %}
$('#some-button').on('click', function __clickHandler() {
    updateUI();

    // non-blocking
    setTimeout(function __timerHandler() {
        doHeavyStuff();
    }, 250);
});
{% endhighlight %}

Mit Hilfe des Aufrufs `setTimeout` wird die Funktion `__timerHandler()` in die Warteschlange des UI-Threads des Browsers gelegt, d.h. wir registrieren ein Event, welches ab Zeitpunkt des Aufrufs gemessen in 250 Millisekunden ausgeführt werden soll. Das muss jedoch nicht unbedingt exakt sein, den jeder Task kann erst ausgeführt werden wenn der vorherige beendet ist.

Aktualisierungen am User Interface können hier also direkt durchgeführt werden, da kein JavaScript Code den UI Thread blockiert. In Zeile 1 wird die Funktion `__clickHandler()` in die Warteschlange gelegt. Zum Zeitpunkt dessen Ausführung (beim Klick durch den Benutzer) werden nun also zuerst Änderungen am User Interface durchgeführt und danach ein weiterer Task (`__timerHandler()`) registriert. Der Click-Handler wird beendet und der Browser kann die Änderungen am User Interface durchführen __bevor__ die Funktion `doHeavyStuff()` aufgerufen wird.

## Demo ##

<!-- hmm not possible over ssl on gh-pages )-:
<a class="jsbin-embed" href="https://jsbin.com/dumaxovo/1/embed?output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>
-->

Im [Demo auf JSBin.com](http://jsbin.com/dumaxovo/1/edit) kann man das Problem sehr schön nachvollziehen. Man kann dort sehen wie beim Klick auf den ersten Button dieser kurz hängen bleibt und die Ausgabe des Infotexts sowie der Primzahlen  dann in etwa zeitgleich geschient. Je größer der Wert `N`, desto länger hängt der Button.
Bei Klick auf den zweiten Button wird allerdings wie gewünscht zuerst der Infotext angezeigt, dann erst erfolgt die Berechnung mit Ausgabe.


## Zusammenfassung ##

Softwareentwicklung mit JavaScript kann auf mobilen Geräten schnell ungemütlich werden, vor allem wenn man ständig nur auf Desktopbrowsern testet. Entwickler sollten stets auch auf __mobilen Geräten__ testen um sicherzustellen, dass sich die Anwendung auch so verhält wie sie soll.


### Weitere Optimierungen via Timer ###

Die Länge der Ausführung von JavaScript Code ist in modernen Browsern begrenzt. Läuft ein Task zu lang, so kann dies zum Hängen des UI führen oder der Browser bricht die Ausführung ab. Auf iOS kann dies sogar zu einem Absturz des Safari-Browsers führen! Als Daumenregel kann man sagen, dass JS Code nie länger als 100ms laufen soll. Ist dies allerdings nicht zu vermeiden, so kann man die Tasks via Timer in einzelne, kleinere Tasks unterteilen.
Timer haben immer eine Pause im UI Thread zur Folge, da der Browser vom einen zum nächsten Task wechselt. Timer Code setzt erfreulicherweise Browser Limits wie das _long-running script limit_ oder den Call Stack zurück. Dadurch sind Timer der optimale Weg um rechenintensiven JS Code browserunabhängig zu optimieren. Ein anderer Weg wären <a href="http://www.html5rocks.com/de/tutorials/workers/basics/">WebWorker</a>, ein relativ neues Konzept um Nebenläufigkeit mit JavaScript zu erreichen. Dazu vielleicht ein Andermal mehr.


## Quellen ##
* _High performance JavaScript_, Nicholas C. Zakas, ISBN: 978-0-596-80279-0 [(Amazon Link)](http://www.amazon.de/Performance-JavaScript-Faster-Application-Interfaces/dp/059680279X)
