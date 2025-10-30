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

Hi, I'm Michael.

I’m a cybersecurity consultant with a strong background in software engineering and over a decade of hands-on experience in fullstack development and consulting. I earned my Bachelor’s degree in Computer Science from the <a target="_blank" href="https://www.hs-augsburg.de/">University Applied Sciences</a> in Augsburg in 2011, specializing in Software Engineering and Web Development. For 10 years, I worked as a freelance consultant, focusing on quality assurance, automation and effective knowledge sharing.

Being always curious, in 2019, I decided to shift my focus toward cybersecurity. I began a Master’s degree in <a href="https://www.hs-augsburg.de/en/Electrical-Engineering/Industrial-Security-and-Safety-MSc.html" target="_blank">Industrial Security and Safety</a>, and from May 2022 until September 2025, I worked full-time as a Cybersecurity Consultant with <a href="https://secure-io.de">secureIO</a>. My work centered on Application Security, DevSecOps and embedding security into modern development pipelines and agile teams. I also supported large organizations in achieving compliance and in building secure software development practices from the ground up.

In October 2025, a new professional chapter began for me at <a href="https://about.gitlab.com/">GitLab</a>, where I joined as a <a href="https://about.gitlab.com/professional-services/">Senior Professional Services Engineer</a> with Security Focus.


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
