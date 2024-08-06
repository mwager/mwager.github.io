---
layout: page
title: About me
permalink: /about/
---

<div style="text-align:center;">
    <a href="javascript:;" id="launcher">
        <img src="/images/me/me0.jpg" class="selfie-about">
    </a>
</div>

In 2011 I successfully graduated from the <a target="_blank" href="https://www.hs-augsburg.de/">University Applied Sciences</a> in Augsburg with a bachelor degree in Computer Science, specializing in Software Engineering and Web Development. For 10+ years I worked and consulted as a freelance web developer with main focus on Fullstack-JavaScript development, automation of quality assurance and knowledge transfer.

In April 2020 I started my Master's degree in <a href="https://www.hs-augsburg.de/en/Electrical-Engineering/Industrial-Security-and-Safety-MSc.html" target=_blank>Industrial Security and Safety</a> at the <a target="_blank" href="https://www.hs-augsburg.de/">University of Applied Sciences</a> in Augsburg and in May 2022 I started a <a target="_blank" href="https://www.secure-io.de/">permanent position</a> as a Cyber Security Consultant, focussing on DevSecOps and application security.

<!--
I particularly value quality assurance methods like test-driven development, code reviews, the use of version control or tools for static code analysis. Furthermore, I am a convinced user of open source software and <a target="_blank" href="https://github.com/mwager/">engage myself</a> in this area as well, if my time allows it.
-->

<div style="display:none">
    <div class="fancy-images-in-grid pure-g">
        <div class="pure-u-1-3">
            <a href="/images/me/master.jpg" class="fancybox" rel="me-images">
                <img src="/images/me/master.jpg" />
            </a>
        </div>
				<div class="pure-u-1-3">
            <a href="/images/me/me0.jpg" class="fancybox" rel="me-images">
                <img src="/images/me/me0.jpg" />
            </a>
        </div>
        <div class="pure-u-1-3">
            <a href="/images/me/me1.jpg" class="fancybox" rel="me-images">
                <img src="/images/me/me1.jpg" />
            </a>
        </div>
        <div class="pure-u-1-3">
            <a href="/images/me/me2.jpg" class="fancybox" rel="me-images">
                <img src="/images/me/me2.jpg" />
            </a>
        </div>
    </div>
    <div class="fancy-images-in-grid pure-g">
        <div class="pure-u-1-3">
            <a href="/images/me/me3.jpg" class="fancybox" rel="me-images">
                <img src="/images/me/me3.jpg" />
            </a>
        </div>
        <div class="pure-u-1-3">
            <a href="/images/me/me4.jpg" class="fancybox" rel="me-images">
                <img src="/images/me/me4.jpg" />
            </a>
        </div>
        <div class="pure-u-1-3">
            <a href="/images/me/me5.jpg" class="fancybox" rel="me-images">
                <img src="/images/me/me5.jpg" />
            </a>
        </div>
    </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function(event) {
  $("#launcher").on("click", function() {
      console.log($(".fancybox"));
        $(".fancybox").eq(0).trigger("click");
    });
});
</script>

### Contact

<!-- Good software is usually created in small, motivated teams. I love doing what I do. Interested in working with me? Don't hesitate to send me an email. -->

E-Mail: <a href="mailto:{{ site.email }}">{{ site.email }}</a> (<a href="/assets/mwager.asc">PGP public key</a>)<br/>
