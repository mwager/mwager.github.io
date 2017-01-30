---
layout: post
title:  "Howler.js - cross platform audio for the modern web"
date:   2014-12-02 10:59:21
categories: javascript
---

Dieser Post stellt die Audio-Library [howler.js](
http://howlerjs.com) vor, eine JavaScript-Bibliothek zur Abstraktion des Abspielens von Audiomaterial auf Basis der [Web Audio API](http://webaudio.github.io/web-audio-api/), mit Fallback auf [HTML5 Audio](https://html.spec.whatwg.org/#the-audio-element). `Howler.js` unterstützt u.a. Caching,  mehrere Dateiformate sowie ein cleveres Konzept um Requests zu minimieren: Audiosprites!



Howler ist eine leichtgewichtige Open-Source JavaScript-Bibliothek ohne externe Abhängigkeiten, veröffentlicht unter der MIT Lizenz. Aufmerksam geworden bin ich auf diese Library als ich auf der Suche nach einem Weg war, das Laden von Audioresourcen zu verringern. Howler unterstützt sog. `Audio-Sprites`. Das sind - ähnlich wie Image-Sprites - einfache Audiodateien, welche aus mehreren Audiodateien zusammengesetzt wurden. Somit kann man die Anzahl der Requests für mehrere Sounds auf Einen reduzieren, was vor allem auf mobilen Geräten und in Zeiten von HTTP1.x immer noch starke Vorteile mit sich bringt. Folgendes Beispiel verdeutlicht dies anhand einer einfachen Datei:

<div>
<button id="play_1">Play E major chord</button>
<button id="play_2">Play F major chord</button>
<span id="play-log"></span>
<p><small>Aufgenommen mit einer Alhambra (Mod. S7C, Kapo im 2. Bund), Audacity und dem integrierten Mikrophon eines MacBooks. Sorry für die schlechte Qualität!</small></p>
</div>

## Erstellen der Audiosprites ##

Das Erstellen der Audiosprites stelle ich hier unter Ubuntu 12.04 LTS vor. Mehr Infos zur Installation auf anderen Betriebssystemen gibt es [hier](https://github.com/tonistiigi/audiosprite#installation). Als Erstes muss Node.js, FFmpeg sowie [audiosprite](https://github.com/tonistiigi/audiosprite) installiert werden:

{% highlight bash %}
# install node.js
$ sudo apt-get install python-software-properties
$ sudo apt-add-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs

# install ffmpeg and audiosprite
$ sudo add-apt-repository -y ppa:jon-severinsson/ffmpeg
$ sudo apt-get update -qq
$ sudo apt-get install -qq ffmpeg libavcodec-extra-53
$ sudo npm install -g audiosprite
{% endhighlight %}

Nun kann eine Audiosprite-Datei aus mehreren Audiodateien erstellt werden. Howler empfielt ogg/webm mit fallback auf mp3 (Internet Explorer):

{% highlight bash %}
$ audiosprite --export ogg,mp3 --samplerate 22050 --bitrate 16 --gap 0 --format howler --output my_sprite *.wav
info: File added OK file=/tmp/audiosprite.47129935142584145, duration=4.049160997732426
info: Silence gap added duration=0.9508390022675739
info: File added OK file=/tmp/audiosprite.5516569190658629, duration=3.621859410430839
info: Silence gap added duration=0.3781405895691612
info: Exported ogg OK file=my_sprite.ogg
info: Exported mp3 OK file=my_sprite.mp3
info: Exported json OK file=my_sprite.json
info: All done

$ ls -lah
total 1.4M
drwxr-xr-x  7 501 dialout  238 Dec  9 10:14 .
drwxr-xr-x 28 501 dialout  952 Dec  9 10:13 ..
-rw-r--r--  1 501 dialout 698K Dec  9 10:13 e.wav
-rw-r--r--  1 501 dialout 625K Dec  9 10:13 f.wav
-rw-rw-r--  1 501 dialout  262 Dec  9 10:14 my_sprite.json
-rw-rw-r--  1 501 dialout  18K Dec  9 10:14 my_sprite.mp3
-rw-rw-r--  1 501 dialout  23K Dec  9 10:14 my_sprite.ogg
{% endhighlight %}

Voraussetzung ist hier, dass sich im aktuellen Verzeichnis mehrere Wav-Dateien befinden. Es wurden aus den beiden Dateien `e.wav` und `f.wav` die Dateien `my_sprite.ogg`, `my_sprite.mp3` sowie eine JSON-Datei namens `my_sprite.json` generiert. Die Datei `my_sprite.json` enthält dank der CLI-Option `--format howler` gleich die zur Initialisierung von Howler notwendigen Sprite-Informationen:

{% highlight json lineos %}
{
  "urls": [
    "my_sprite.ogg",
    "my_sprite.mp3"
  ],
  "sprite": {
    "e": [
      0,
      4049.160997732426
    ],
    "f": [
      5000,
      3621.8594104308386
    ]
  }
}
{% endhighlight %}

Das `sprite`-Objekt in der JSON Datei gibt an, ab wann gewisse Teile der Audiosprite-Datei beginnen und wie lange diese dauern.

## Make it play! ##

Code zum Initialisieren erfolgt dann folgendermaßen:

{% highlight javascript lineos %}
// Note that we use howler.js v2.0 which is still beta (Dec 2014)
var sound = new Howl({
    src: ['/assets/my_sprite.ogg', '/assets/my_sprite.mp3'], // order matters!
    sprite: {
        e: [0, 4049],
        f: [5000, 3621]
    }
});
sound.play('e') // plays the first chord
sound.play('f') // plays the second chord
{% endhighlight %}

__Du kannst diesen Code auch in die DevTools-Console kopieren!__

Die beiden Werte in den Arrays geben die Startpositionen sowie die Längen der Sounds in Millisekunden an und wurden aus der oben genannten JSON-Datei entnommen. Der erste Akkord beginnt bei Position 0 und dauert 4049ms, der zweite Akkord beginnt bei 5000 und dauert 3621ms.

## Zusammenfassung ##

`Howler.js` ist eine schöne Lösung um Audiomaterial browserübergreifend und effizient abspielen zu können. Und es funktioniert sogar in __Phonegap bzw. Cordova__! Zusätzlich unterstützt die Lib auch noch Effekte wie fadein/fadeout, das Abspielen mehrerer Sounds simultan oder Web Audio 3D Sound Positionierung um zB die Wahrnehmung eines Sounds im 3D Effekt zu ermöglichen. Für mich sind diese Effekte bis jetzt nicht relevant, könnten aber zB bei Spielen sehr von Vorteil sein. Ich hatte bisher keine Probleme mit Howler, auch nicht auf diversen Android- und iOS-Geräten. Es lohnt sich also!
