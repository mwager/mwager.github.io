---
layout: post
title:  "JavaScript und Mobile - Keeping the ui responsive at all times"
date:   2014-05-16 16:43:12
categories: javascript
---

<em>
Ein kleiner Tipp um die Benutzeroberfläche bei Benutzereingaben auch bei rechenintensiven Aufgaben benutzbar zu halten. Der Trick dabei ist recht einfach: man verwendet Timer um den UI-Thread des Browsers nicht zu blockieren (TODO better - SEE BOOK!)
</em>

## TODOs ##
* ==> nochmal book Kapitel über "timers" lesen, paar sätze umformulieren... nice.
* bilder ??? UI Thread usw..
* DONE!

## The code ##

Ein kleines Codebeispiel um das Problem zu verdeutlichen. Es wird jQuery (oder Zepto) verwendet:

{% highlight javascript linenos %}
$('#some-button').on('click', function() {
    changeUI();

    // blocking
    doHeavyStuff();
}
{% endhighlight %}

Ist die Funktion `doHeavyStuff()` sehr rechenintensiv, so kann man diese mit Hilfe eines Timers ausführen: (TODO better formulieren)

{% highlight javascript linenos %}
$('#some-button').on('click', function() {
    changeUI();

    // non-blocking
    setTimeout(function() {
        doHeavyStuff();
    }, 25)
}
{% endhighlight %}

Nun kann `changeUI()` ausgeführt werden, der Click-Handler wird beendet und BLAAA (TODO BOOK!). Nice.


## Zusammenfassung ##

Softwareentwicklung mit JavaScript kann auf mobilen Geräten schnell ungemütlich werden, vor allem wenn man ständig nur auf Desktopbrowsern testet. Entwickler sollten stets auch auf __mobilen Geräten__ testen um sicherzustellen, dass sich die Anwendung auch so verhält wie sie soll.


## Quellen ##
* _High performance JavaScript_, Nicholas C. Zakas, ISBN: 978-0-596-80279-0 [(Amazon Link)](http://www.amazon.de/Performance-JavaScript-Faster-Application-Interfaces/dp/059680279X)
