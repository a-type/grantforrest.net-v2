/**
 * Main JS file for A-Type behaviours
 */

/* globals jQuery, document */
(function ($, sr, undefined) {
    "use strict";

    var $document = $(document),

        // debouncing function from John Hann
        // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        debounce = function (func, threshold, execAsap) {
            var timeout;

            return function debounced () {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap) {
                        func.apply(obj, args);
                    }
                    timeout = null;
                }

                if (timeout) {
                    clearTimeout(timeout);
                } else if (execAsap) {
                    func.apply(obj, args);
                }

                timeout = setTimeout(delayed, threshold || 100);
            };
        };

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        function updateImageWidth() {
            var $this = $(this),
                contentWidth = $postContent.outerWidth(), // Width of the content
                imageWidth = this.naturalWidth; // Original image resolution

            if (imageWidth >= contentWidth && !$this.hasClass("author-thumb")) {
                $this.addClass('full-img');
            } else {
                $this.removeClass('full-img');
            }
        }

        var $img = $("img").on('load', updateImageWidth);
        function casperFullImg() {
            $img.each(updateImageWidth);
        }

        casperFullImg();
        $(window).smartresize(casperFullImg);

        var mainHeader = $(".main-header");

        mainHeader.css("top", (window.pageYOffset * -2) + "px");
        $(window).scroll(function () {
            // short circuit
            if (window.pageYOffset > (window.outerHeight / 2)) {
                return;
            }
            mainHeader.css("top", (window.pageYOffset * -2) + "px");
        });

        var windowHeight = $(window).height();
        $(".content").css("padding-top", (windowHeight * 0.75) + "px");

        $(window).resize(debounce(function () {
            var windowHeight = $(window).height();
            $(".content").css("padding-top", (windowHeight * 0.75) + "px");
        }));
    });

    // smartresize
    jQuery.fn[sr] = function(fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery, 'smartresize');
