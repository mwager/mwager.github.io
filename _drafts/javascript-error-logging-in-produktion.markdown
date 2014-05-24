---
layout: post
title:  "JavaScript Error-Logging in Produktion"
date:   2014-01-17 19:17:42
categories: javascript
---

<em>
Wie fängt man Javascript-Fehler bzw kommt diese überhaupt mit? Die Benutzer einer WebApplikation werden sich kaum die Mühe machen, Fehler zu berichten. Dieser Post zeigt einige Möglichkeiten der server-seitigen Loggings für JavaScript Applikationen, erläutert Probleme usw blaaaaaaaaa
</em>

hmm erfodert erstmal derb recherche wat es so gibt...
evtl UNSERE erfahrungen beschreiben !


### The easy way

Der einfachste Weg ist wohl das self-made ajax logging. Man schreibt siche eine Funktion zum Loggen von Fehlern zum eigenen Server via AJAX:

TODO syntax high
function logError(msg) {

    // using jQuery/zepto
    $.ajax({
        url: /api/logs TODO
        usw
    })
}

// Aufruf:
logError('Hier ist ein Fehler aufgetreten')

Diese Methode kann man dann in allen Fällen von schwerwiegenden Fehlern und AUsnahmen verwneden-.
In Verbindung mit dem globalen `window.onerror` Handler eine tolle Sache

BSP: TODO sytax highlight
window.onerror = function(msg, file, line) {
    logError(msg + ' in file ' + file + ' on line ' + line);
};

TODO PROBLEME darlegen!


### Logging via google analytics/piwik etc...



### TODOs

- berichte aus meiner erfahrung: window.onerror: gut aber catcht auch shit von 3-party plugins usw.... blaa
- traceKit vorstellen, erfahrungen damit in production darlegen
- easy way auch via google analytics (TODO link nur ganz kurz) oder via piwik?(TODO bsp)
- dann noch via anbieter wie https://errorception.com/ TODO was gabs da noch??
   -> google nach "window.onerror plugins" ...
