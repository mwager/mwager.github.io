window.onerror = function(m, f, l) {
    log('GLOBAL ERROR: ' + m + ' in ' + f + ' on ' + l);
};




(function() {

    function initHelloWorldExample() {
        var $hello = $('#hello-world');

        if($hello.length === 0) {
            return;
        }

        var text = $hello.html().split('');
        var len  = text.length;
        var i    = 0;
        var t    = 30;

        $hello.html('').show();

        function set() {
            // log(i, text, text[i])
            $hello.append(text[i]);

            if(i < len) {
                setTimeout(function() {
                    i++;
                    set();
                }, t);
            }
            // else {
            //     log("DONE")
            // }
        }

        setTimeout(set, t);
    }

    /**
     * We want to convert all jekyyl dates '.jdate' elements to german dates,
     * as there is no nice way to do this with jekyyl (is it?)
     */
    function doDateWorkaround() {
        var germanMonths = [
            'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ];
        var $dates = $('.jdate');

        if($dates.length === 0) {
            return;
        }

        $dates.each(function() {
            var newDate;
            var $d          = $(this);
            var itemsOfDate = $d.html().split('.');

            // trim each value
            for(var i in itemsOfDate) {
                itemsOfDate[i] = $.trim(itemsOfDate[i]);
            }

            var month = parseInt(itemsOfDate[1], 10) - 1;

            // log("month of item is: " + germanMonths[month])

            newDate = itemsOfDate[0] + '. ' + germanMonths[month] + ' ' + itemsOfDate[2];

            $d.html(newDate);
        });
    }


    function init() {
        log('Thanks for stopping by!');
        initHelloWorldExample();
        doDateWorkaround();

        $('.fancybox').fancybox({
            autoPlay: false,
            maxWidth: 1024
        });
    }

    $(init);
})();
