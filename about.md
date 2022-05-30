---
layout: page
title: About me
permalink: /about/
---

<div style="text-align:center;">
    <a href="javascript:;" id="launcher">
        <img src="/images/me.jpg" class="selfie-about">
    </a>
</div>

In 2011 I successfully graduated from the <a target="_blank" href="https://www.hs-augsburg.de/">University Applied Sciences</a> in Augsburg with a bachelor degree in Computer Science, specializing in Software Engineering and Web Development, and have been living in Augsburg ever since. I'm sporty, play the guitar since I am 15 and also have quite a few years of band experience.

For 10+ years I worked as a freelance web developer with focus on Fullstack and JavaScript development. I supported clients from conception to delivery and always made sure to use contemporary technologies responsibly as well as not forgetting the needs of end users.

In April 2020 I started my Master's degree in <a href="https://www.hs-augsburg.de/en/Electrical-Engineering/Industrial-Security-and-Safety-MSc.html" target=_blank>Industrial Security and Safety</a> at the <a target="_blank" href="https://www.hs-augsburg.de/">University of Applied Scienses</a> in Augsburg and in May 2022 I started a permanent position as a Cyber Security Consultant.

<!--
I particularly value quality assurance methods like test-driven development, code reviews, the use of version control or tools for static code analysis. Furthermore, I am a convinced user of open source software and <a target="_blank" href="https://github.com/mwager/">engage myself</a> in this area as well, if my time allows it.
-->

<div style="display:none">
    <div class="fancy-images-in-grid pure-g">
        <div class="pure-u-1-3">
            <a href="/images/me.jpg" class="fancybox" rel="me-images">
                <img src="/images/me.jpg" />
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
