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

            if (imageWidth >= contentWidth) {
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

        var USE3D = false;

        var yOffset = window.pageYOffset;
        var mainHeader = $(".main-header");

        var prefs = ['-webkit', '-moz', '-o', '-ms'];
        function prefix(prop, value) {
            var obj = {};
            for (var pref in prefs) {
                obj[prefs[pref] + "-" + prop] = value;
            }
            return obj;
        }

        function paralaxHandler3d () {
            mainHeader.css(prefix("transform", "translate3d(0," +
                (yOffset * -2) + 'px, 0)'));
        }

        function paralaxHandler2d () {
            mainHeader.css("top", (yOffset * -2) + "px");
        }

        if (USE3D) {
            paralaxHandler3d();
        }
        else {
            paralaxHandler2d();
        }

        $(window).scroll(function () {
            window.requestAnimationFrame(function () {
                yOffset = window.pageYOffset;
                if (yOffset > (window.outerHeight / 2)) {
                    return;
                }
                if (USE3D) {
                    paralaxHandler3d();
                }
                else {
                    paralaxHandler2d();
                }
            });
        });

        var windowHeight;

        function resizeHandler () {
            windowHeight = $(window).height();
            $(".content").css("padding-top", (windowHeight * 0.75) + "px");
        }

        resizeHandler();

        $(window).smartresize(resizeHandler);

        //from accent-image.js
        $(window).smartresize(responsiveBackgroundResize);
    });

    // smartresize
    jQuery.fn[sr] = function(fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery, 'smartresize');
