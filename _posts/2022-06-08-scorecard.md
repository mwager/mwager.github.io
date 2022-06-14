---
layout: post
title: "Scorecard​ - rate the security of your OSS🃏"
date: 2022-06-08 12:36:11
categories: cyber_security
---

This post presents "[Scorecard](https://github.com/ossf/scorecard)" - a pretty interesting tool for evaluating the overall security status of an open source software component. It is a project by the [Open Source Security Foundation](https://openssf.org).

## Introduction​

<img src="/images/software-infra-oss.png"/>

Almost all software products depend on so called open source libraries. And just like code written by yourself, these libraries can have security vulnerabilities too! For example, I bet you heard about log4j, a logging library for Java which is widely used in applications worldwide. This library had a [critical security issue](https://nvd.nist.gov/vuln/detail/CVE-2021-44228), thus affecting millions of applications. Another example of so called supply chain attacks is seen in the NPM pakage "[ua-parser.js](https://blog.sonatype.com/npm-project-used-by-millions-hijacked-in-supply-chain-attack)". The NPM account of the original maintainer had been hijacked and the malicious threat actor then added some malware to do cryptomining on the affected machines. These machines could be local developer machines, staging or even production servers! So you see, securing open source components is a very important part of the SSDLC.

<img src="/images/log4j-meme.png"/>

Fact is: Libraries will be used, so what can we do? How can we decide if a library meets certain criteria related security?

- Manual research​
- Software Composition Analysis (SCA)
- Running a SAST scan manually against the library source code
- And... use Scorecard!

## Intro to the [Open Source Security Foundation](https://openssf.org/) (OpenSSF)

The OpenSSF is a cross-industry forum for a collaborative effort to improve open source software security​. Founding board members include Google, IBM, JPMorgan Chase, Microsoft, and more. They have lots of interesting projects on Github​:

- [Scorecard Repo](https://github.com/ossf/scorecard)
- [WG Securing Critical Projects](https://github.com/ossf/wg-securing-critical-projects) (e.g. angular, laravel, Wordpress, OpenVPN, MySQL, etc.)​
- [Web Application Definition 1.0.0](https://github.com/ossf/wg-security-tooling/wiki/WebAppDefn) - Open standard for the integration of DAST in OSS ​

## What is Scorecard?​

- CLI tool written in go ​
- Idea: give consumers of OSS a way to judge whether their dependencies are safe​
- Uses heuristics (called "checks") related to software security ​
- Each check has a score of 0-10 (higher -> better)​
- Usage: via CLI manually or access already scanned projects: [Angular example](https://deps.dev/npm/%40angular%2Fcore/11.0.0-next.1)

#### CHECKS:

- 16 checks implemented​
- Examples:​

  - CI-Tests: "tests executed before pull requests are merged?" (technical debt == security debt)​
  - Dependency-Update-Tool: "project uses a dependency update tool?"​
  - SAST: "project integrates static application security testing?"​
  - Vulnerabilities: "Does the project has open, unfixed vulnerabilities?" using the OSV ([Open Source Vulnerabilities](https://osv.dev/)) service
    ​

You can find documentation of all implemented checks here: [https://github.com/ossf/scorecard/blob/main/docs/checks.md​](https://github.com/ossf/scorecard/blob/main/docs/checks.md)

## Demo​

We are going to demonstrate the usage against "[Jacksum](https://github.com/jonelo/jacksum)" - an integrity verification library for java.

Note that for runs against a github repo a token must be created first.
The demo uses the osx compiled binary "scorecard-darwin-amd64" with one parameter: the direct github url of the java library: [https://github.com/jonelo/jacksum/​](https://github.com/jonelo/jacksum/​)

{% highlight bash %}
export GITHUB_AUTH_TOKEN=$TOKEN​
./scorecard-darwin-amd64 --repo https://github.com/jonelo/jacksum/​
Starting [Dependency-Update-Tool]​
Starting [SAST]​
Starting [Vulnerabilities]​
…​
Finished [Dependency-Update-Tool]​
Finished [SAST]​
Finished [Vulnerabilities]​
​
RESULTS​
-------​
Aggregate score: 4.9 / 10
...
{% endhighlight %}

## Conclusion

Scorecard is a very interesting project. As I've been a developer myself for more than 10 years, I now how hard it is to evaluate new dependencies​. The checks of scorecard also look for quality assurance (e.g. CI Tests or Code-Review) which is a nice thing for sure! So the usage of scorecards gives developers a quick way to decide​ if a certain project is worth looking into more.

Also, it provides security analysts with a solid base for decision making when asked if a certain library can be included into an application.

It's worth checking out the project (and all of OpenSSF)​!
​
