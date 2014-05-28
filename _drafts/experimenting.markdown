---
layout: post
title:  "Experimenting with jekyll"
date:   2014-01-17 19:17:42
categories: default
---

Some experiments using jekyyl...


## Syntax Highlighting

### Line numbers

{% highlight ruby linenos %}
def foo
  puts 'foo'
end
{% endhighlight %}

### Some JavaScript (-;

{% highlight javascript linenos %}
function foo(a) {
    return a * 2;
}
function Test() {
    this.foo = 1;
}
Test.prototype.bar = function() {
    return 42;
};
var a = foo(2);
var b = new Test(),
    c = new Test();

c.bar();

{% endhighlight %}
