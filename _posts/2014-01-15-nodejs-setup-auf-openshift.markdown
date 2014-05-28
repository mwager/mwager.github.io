---
layout: post
title:  "Node.js Hosting bei Openshift == A.W.E.S.O.M.-O"
date:   2014-01-15 13:02:17
categories: javascript
---

<em>
Dieser Post zeigt, wie man eine Node.js Applikation mit dem freien Account bei [Openshift](https://openshift.com) aufsetzen kann, mit Git-Deployment, SSH-Zugang uvm. In Verbindung mit einer eigenen Domain eignet sich das hervorragend für das Hosting kleinerer Projekte, Kundendemonstrationen, als Testumgebung oder Spielwiese.
</em>

<img class="openshift-asciimo" src="/images/node/node-openshift-2.png">
<small class="image-cap">Cartman als "asciimo" ausgeliefert via Node.js @ Openshift <a href="#pic1">[Quelle]</a></small>

## Was ist Openshift? ##

Openshift ist eine Cloud-Plattform von RedHat und bietet Hosting in der Cloud (_Platform as a service_, _PaaS_) mit Unterstützung für diverse Softwarestacks basierend auf verschiedenen Programmiersprachen wie Java, Ruby, PHP oder auch __JavaScript__ via __Node.js__. Es existiert ein kostenfreier Account bei welchem drei sog. _Gears_ zur Verfügung stehen. Ein _Gear_, oder auch _Application_ genannt, ist eine Art Container mit einer begrenzten Anzahl RAM und Speicherplatz, welcher die verschiedenen Komponenten (_Cartridges_) verwaltet.
Eine _Cartridge_ ist eine austauschbare Komponente, welche neben Anderen innerhalb einer Applikation verwendet werden kann. Mindestanforderung ist eine Sprachumgebung wie z.B. PHP, danach können weitere Komponenten hinzugefügt werden, von Datenbanksystemen wie MySQL oder MongoDB bis hin zur Unterstützung für kontinuierliche Integration mit Jenkins.


## Node.js Hosting ##

Viele Standard Hosting Pakete bieten im Allgemeinen nicht viel Kontrolle über die auf dem Server installierte Software. Im Zeitalter von Vagrant und Co. sind es Entwickler allerdings gewohnt, eine Maschine per Knopfdruck mit genau definiertem Softwarestack zu erstellen und zum Laufen zu bringen.

Recht ähnlich verhält es sich bei Openshift, nur in der Cloud, und mit Git. Es wird [von Haus aus Node.js unterstützt](https://www.openshift.com/developers/node-js) und das Erstellen/Verwalten von Apps sowie das Deployment (via Git) ist kinderleicht.

<abbr>Eine schöne Liste zum Thema Hosting von Node.js Apps findet sich auf [JSNews.de](http://jsnews.de/node-js-hosting-liste/).</abbr>


## Hands on! ##

Mit Hilfe weniger Kommandos hat man eine neue App erstellt, welche dann auch sofort weltweit erreichbar ist. Ein Account bei Openshift sowie die lokale Installation einiger Abhängigkeiten (Ruby mit rhc tool, Git) sind die Voraussetzung. Mehr Informationen dazu auf <a target="_blank" href="https://www.openshift.com/get-started">openshift.com/get-started</a>.

Das Erstellen einer App bei Openshift, sowie das Hinzufügen von Cartridges kann man von der Kommandozeile aus oder per Webinterface erledigen, ich verwende die Kommandozeile, eine Node.js App erstellt man mit dem Openshift Kommandozeilen-Tool `rhc` wie folgt:

{% highlight bash %}
$ rhc app create MyApp Node.js-0.10
$ rhc cartridge add mongodb-2.2 -a MyApp
{% endhighlight %}

Der erste Befehl erstellt eine neue App mit dem Namen `MyApp` basierend auf der Node.js Version 0.10. Im zweiten Befehl wird dieser App dann auch gleich eine Datenbank-Cartridge hinzugefügt: mit MongoDB in Version 2.2.

Zwei Minuten später:

<p class="text-center">
    <img class="openshift-node" src="/images/node/node-openshift-1.png">
</p>

Openshift URLs bestehen aus dem Namen der App, sowie einem globalen Namespace, welchen man selbst einmalig vergeben kann: (hier _mwager_)

_http(s)://appname-namespace.rhcloud.com_

Für jede App wird automatisch ein Git-Repository initialisiert. Zugriff erhält man per SSH Public-Key Authentifizierung, der Public Key wurde beim CLI Setup bereits an Openshift übermittelt. Die URL hat die Form:

`ssh://APP_KEY@appname-namespace.rhcloud.com/~/git/appname.git/`

Zugriff via SSH ist übrigens auch möglich:

{% highlight bash %}
$ ssh APP_KEY@appname-namespace.rhcloud.com
{% endhighlight %}

Ein Commit existiert bereits:

{% highlight bash %}
$ cd myapp/
$ git log

commit b73b7375c8ae53b3d678ccd1255fa95c1bef3c51
Author: Template builder <builder@example.com>
Date:   Tue Jan 14 12:50:12 2014 -0500

Creating template
{% endhighlight %}

Im Repo befindet sich eine einfache, auf dem <a href="http://expressjs.com" target="_blank">Express Framework</a> basierende, Node.js-App in der Datei `server.js`. Diese App reagiert auf 2 Routes: `/`, sowie `/asciimo`. Unter Letzterer erscheint Cartman als `asciimo` wie im Introbild zu sehen ist - eine nette Anspielung auf Southpark's Folge 116 aus Staffel 8 (Quelle:  <a href="http://en.wikipedia.org/wiki/AWESOM-O" target="_blank">Wikipedia</a>), in der Cartman sich als Roboter namens __A.W.E.S.O.M.-O 4000__ verkleidet um an Butters' peinliche Geheimnisse zu gelangen und ihn damit aufzuziehen.


## Deployment ##

Nach Änderungen im Repo reicht nun ein `git push` und die neue Version ist live. Zusammen mit einer eigenen Domain und einer DNS Weiterleitung ist das eine feine Sache. Weitere Ideen wären das Hosting eines Blogs oder privaten Continuous Integration Servers.


## Quellen ##

* [www.openshift.com](https://www.openshift.com/developers/node-js)
* [OpenShift Origin Documentation](http://openshift.github.io/documentation/oo_system_architecture_guide.html)
* <div id="pic1">[Bild-1] <a href="http://i.imgur.com/kmbjB.png">Cartman-Bild</a></div>
