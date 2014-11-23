$(function() {
        var $waterfall = $("#waterfall");
        var $wind = $("#wind");
        var $windbox = $("#windbox");
        var hasMessages = false;
        
        /* Start wind blowing */
        
        function blow()
        {
            if (hasMessages) {
                $wind.css("left", "-550px");
                $wind.animate(
                    {left: "-5px"},
                    2500,
                    "linear",
                    blow);
            }
        }
        
        /* Keep messages updating every minute */
        
        function loadMessages()
        {
            $.getJSON(
                'json/messages',
                function(messages) {
                    $waterfall.empty();
                    if (messages.length > 0) {
                        hasMessages = true;
                        blow();
                        for (var i=0; i < messages.length; i++) {
                            $("<div></div>").text(messages[i].message).
                                css({
                                        left: (messages[i].progress * 100) + "%",
                                        opacity: 1 - messages[i].progress,
                                        color: "rgb("+messages[i].rgb+")",
                                        fontSize: messages[i].font_size+"pt"
                                }).
                                appendTo($waterfall).
                                animate(
                                    {
                                        left: "100%",
                                        opacity: 0
                                    },
                                    {
                                        duration: messages[i].seconds_left * 1000,
                                        easing: "linear"
                                    });
                        }
                        // match wind height to waterfall height
                        $wind.add($windbox).height($waterfall.height());
                    } else {
                        hasMessages = false;
                    }
                });
        }
        
        loadMessages();
        window.setInterval(loadMessages, 60000); // once per minute
});