---
layout: post
title:  "Phonegap: Custom Android API Level"
date:   2014-10-21 10:20:41
categories: javascript
---

In einem aktuellen Phonegap-Projekt musste ich das minimale Android API Level erhöhen, wobei sich herausstellte, dass Phonegap dies leider nicht von Haus aus unterstützt und somit eine eigene Lösung notwendig ist. Dieser Post zeigt eine mögliche Lösung des Problems via Cordova-Hooks.

## Das Problem ##

Native Apps für Android besitzen eine Config-Datei namens `AndroidManifest.xml`, in welcher Entwickler globale Konfigurationen einer Android App (wie zB die App-Version oder Berechtigungen) definieren können. In dieser Datei ist es auch möglich, die min-sdk Version [zu konfigurieren](http://developer.android.com/guide/topics/manifest/uses-sdk-element.html). Die `minsdk-Version` gibt dabei an, welche Android Version mindestens notwendig ist um die App ausführen zu können. Will man also zB Android v4.0 - v4.4+ unterstützen, so müsste man folgendes in die `AndroidManifest.xml` eintragen:

{% highlight xml %}
...
<uses-sdk android:minSdkVersion="15" android:targetSdkVersion="19" />
...
{% endhighlight %}

Das Problem dabei ist, dass diese Datei nach jedem Phonegap Build wieder mit den Default-Werten überschrieben wird: (aktuell: phonegap v3.5.0-0.21.18)

{% highlight xml %}
...
<uses-sdk android:minSdkVersion="10" android:targetSdkVersion="19" />
...
{% endhighlight %}

Nun ging ich davon aus, dass es mit Hilfe Phonegaps' `config.xml` möglich sein sollte, diese Werte einzutragen wobei Phonegap diese dann beim Build übernimmt, ähnlich wie zB die App-Version.

Der [Phonegap Cloud-Build Service](https://build.phonegap.com/) unterstützt dies sogar:

{% highlight xml %}
<!-- config.xml -->
...
<preference name="android-minSdkVersion" value="19" />
<preference name="android-targetSdkVersion" value="19" />
...
{% endhighlight %}

Wie ich feststellen musste hat dies jedoch leider keine Auswirkungen auf lokale Builds, in der `AndroidManifest.xml` steht nach jedem Build wieder `android:minSdkVersion="10"`.


## Die Lösung ##

Eine mögliche Lösung ist nun, eine eigene Cordova-Hook anzulegen. [Cordova-Hooks](https://github.com/apache/cordova-lib/blob/master/cordova-lib/templates/hooks-README.md) sind Skripte, welche es ermöglichen bei Bedarf die Cordova CLI Tools um individuelle Logik zu erweitern. Wir wollen hier einfach nur die min-sdk Version ersetzen, wofür ich folgendes Skript erstellt habe:

`$CORDOVA_ROOT/hooks/before_compile/index`

Dieses Skript ist einfach nur ein kleines Bash-Skript, welches vor der Kompilierung der Quellen ausgeführt wird und via find & replace die minsdk-Version ersetzt:

{% highlight bash %}
#!/bin/bash
# Script replaces minSDKversion in the AndroidManifest.xml

MANIFEST="platforms/android/AndroidManifest.xml"

sed -i '' 's/android:minSdkVersion="10"/android:minSdkVersion="19"/g' $MANIFEST

echo ">>>>> OK, replaced the sdk versions."
{% endhighlight %}

Ich konnte bei meinen Recherchen keine überzeugende Lösung finden, weshalb ich mich entschieden habe diesen kleinen Post darüber zu schreiben. Warum Phonegap/Cordova diese Konfiguration nicht out-of-the-box unterstützt ist mir bis jetzt noch unklar. Dennoch ist dieses Problem wohl nichts Neues für die Phonegap-Community: Es existiert sogar ein grunt-Task, welcher dieses Problem ähnlich löst: [grunt-phonegap](https://github.com/logankoester/grunt-phonegap).
