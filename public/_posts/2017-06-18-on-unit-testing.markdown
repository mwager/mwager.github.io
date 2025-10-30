---
layout: post
title:  "On UNIT Testing 🔨"
date:   2017-06-18 18:27:21
categories: software_engineering
---

So you don't write tests, eh? This is what I think about it.

<div class="responsive-video">
  <iframe
    class="test-your-shit-iframe"
    width="560"
    height="315"
    src="https://www.youtube.com/embed/H7C0vd-L5lg"
    frameborder="0"
    allowfullscreen></iframe>
</div>

In a lot of projects I work in, the people just don't write tests, especially in the frontend. And everytime the reasons are as follows:

* _It takes so much time!_
* _It is much more code than the code I need to write for the app!_
* _We don't need tests (because of reasons)!_

And everytime the consequences are:

* _SO MUCH SENSELESS BUGS!!! (😭😭😭)_




## Some examples

#### 1. The following line of code was added, without tests:

{% highlight javascript %}
function doStuff(metaInfo) {
  // Context: The developer introduced a new flag which should be `true` by default
  metaInfo.sendPrintjob = metaInfo.sendPrintjob || true;
  ...
}
{% endhighlight %}

Question: what's the value of `metaInfo.sendPrintjob` if `metaInfo.sendPrintjob === false` ?

Yeah, it's `true` 😞. Bug in production. A simple test most probably got that covered...

You could argue that the developer was stupid. But we all make mistakes. Writing tests allows us to execute that code VERY FAST and get IMMEDIATE RESPONSE. Without reloading the page, adding `console.log`s, clicking through X screens just to get there and manually test it, maybe only once, like in this case with `metaInfo.sendPrintjob = true`


#### 2. Following code was changed:

{% highlight javascript %}
  // before:
  headers: options.headers.toJSON(),
  // after:
  headers: options.headers // Don't call toJSON
{% endhighlight %}

This change led to a bug in production. I had to fix the bug ticket in a new project. And it did cost me hours of debugging to find it. As there were no tests at all, this means starting the app, clicking through lots of pages, and setting breakpoints just to get to the point I could reproduce... (this was a big codebase and I was new to the project)

Nevermind the frustation and lost of motivation on that day... But hey, thanks to the comment `Don't call toJSON`!

If there was a simple test which expects that `toJSON` has to be called, it wouldn't be a problem at all..



## Some arguments for testing

1. Tests are (living) __documentation__ (= specification) - this means they are __executable code documentation__ - see [BDD on wikipedia](https://en.wikipedia.org/wiki/Behavior-driven_development) <br> -> Do you always update the code docs when changing code?! (If your answer is yes: 😂)

2. Time! If you have no __automated__ tests you need to __manually__ test the whole app if you are making changes because you cannot know which parts you broke ;)

3. Refactoring: How can you refactor and clean up some code without automated tests? Manually test everthing? Good luck!

4. After updating dependencies tests can show you if something broke.

5. Better Code-Design - if you are writing tests, you think more about the structure of your code resulting in more clean and readable code

6. Fast feedback of code execution: You can run code without having to run the whole app. This can even speed up the development of a certain feature, especially UI related code. Who wants to click through 5 pages just to visit the part of the app you are working on?

7. Less bugs will go to production because with tests they are detected much earlier.

8. I hate to manually test my apps (of course I do it) but it's just boring and error prone.

9. Writing tests will give you more confidence about your code.

10. 🤺 ...and yes you will have more test-code that production-code, but:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">TDD is like Mr. Miyagi getting you to wash his car and paint his fence - seems like a lot of unnecessary work, but the payoff comes later <a href="https://t.co/7U9nbENXEU">pic.twitter.com/7U9nbENXEU</a></p>&mdash; Joshua Morony (@joshuamorony) <a href="https://twitter.com/joshuamorony/status/874962761196765184">June 14, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


## Some links

* [Writing unit tests for personal projects? - FunFunFunction #29 @ YouTube](https://youtu.be/ib2Pt9_zciA) -> _"Code without tests is buggy and bad code"_

* [Eric Elliott - 5 Questions Every Unit Test Must Answer](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d) -> _"Most Developers Don’t Know How to Test"_

* [Eric Elliott - 5 Common Misconceptions About TDD & Unit Tests](https://medium.com/javascript-scene/5-common-misconceptions-about-tdd-unit-tests-863d5beb3ce9) -> _"TDD is too Time Consuming"_

* [Ryan Hayes - How to Introduce TDD to Your Team With No Unit Testing Experience](https://ryanhayes.net/how-to-introduce-tdd-to-your-team-with-no-unit-testing-experience/)

* [Martin Fowler - Mocks Aren't Stubs](http://martinfowler.com/articles/mocksArentStubs.html)


## So, always remember:

<img class="test-your-shit" src="/images/test-your-shit.jpg">
