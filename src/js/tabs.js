import jQuery from "jQuery";
import "../scss/styles.scss";
// import customSelect from "custom-select";

(function($) {
    "use strict";

    /**
     * Табы
     */
    $.fn.tabs = function() {
        var $self = $(this);
        var $tabHeaders = $self
            .find(".js-tab-header")
            .filter(function(index, el) {
                return $(el).parentsUntil($self).length === 1;
            });
        var $selectHeaders = $self.find(".js-select-header");
        var $wrapHeaders = $self.find(".tab-header-wrap");
        var $tabContent = $self
            .find(".js-tab-content")
            .filter(function(index, el) {
                return $(el).parentsUntil($self).length === 1;
            });

        /**
         * Активация таба по его индексу
         * @param {Number} index - индекс таба, который нужно активировать
         */
        var selectTab = function(index, flag) {
            if (flag) {
                $selectHeaders[0][index].selected = true;
            }
            $selectHeaders.addClass("hide-desktop hide-tablet");

            // $(document).ready(function() {
            //     $(".chosen").chosen();
            // });
            // console.log($selectHeaders[0]);
            // customSelect('select');

            $wrapHeaders.addClass("hide-mobile");
            $tabHeaders
                .removeClass("active")
                .eq(index)
                .addClass("active");
            $tabContent
                .removeClass("active")
                .eq(index)
                .addClass("active");
        };

        /**
         * Инициализаиця
         */
        var init = function() {
            selectTab(2, true);

            // Обработка событий
            $tabHeaders.on("click", function() {
                selectTab($(this).index(), true);
            });
            $selectHeaders.change(function() {
                selectTab(+$(this).val());
            });
        };

        init();

        this.selectTab = selectTab;

        return this;
    };

    // Инициализируем табы на всех блоках с классом 'js-tabs'
    $(".js-tabs").each(function() {
        $(this).data("tabs", $(this).tabs());
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1) {
            $("header").addClass("glide");
        } else {
            $("header").removeClass("glide");
        }
    });

    function dragScroll() {
        var curDown = false,
            prevX = 0,
            prevY = 0,
            curYPos = 0,
            curXPos = 0;

        $(".container").mousemove(function(event) {
            if (curDown) {
                var a =
                    getXDirection(event.pageX) *
                    Math.abs(curXPos - event.pageX) *
                    0.03;
                var b =
                    getYDirection(event.pageY) *
                    Math.abs(curYPos - event.pageY) *
                    0.03;
                $(".container")[0].scrollBy(a, b);
            }
        });

        function getXDirection(realXPos) {
            if (prevX > realXPos) {
                prevX = realXPos;
                return 1;
            } else if (prevX === realXPos) {
                prevX = realXPos;
                return 0;
            } else {
                prevX = realXPos;
                return -1;
            }
        }

        function getYDirection(realYPos) {
            if (prevY > realYPos) {
                prevY = realYPos;
                return 1;
            } else if (prevY === realYPos) {
                prevY = realYPos;
                return 0;
            } else {
                prevY = realYPos;
                return -1;
            }
        }

        $(".container").mousedown(function(event) {
            event.stopPropagation();
            event.preventDefault();
            curYPos = event.pageY;
            curXPos = event.pageX;
            curDown = true;
        });

        $(".container").mouseleave(function(event) {
            curDown = false;
        });

        $(".container").mouseup(function() {
            curDown = false;
        });
    }

    dragScroll();

    function dragScroll2() {
        var curDown = false,
            curYPos = 0,
            curXPos = 0;

        $(".container2").mouseenter(function(event) {
            curYPos =
                $(".container2")[0].getBoundingClientRect().top +
                $(".container2")[0].getBoundingClientRect().height / 2;
            curXPos =
                $(".container2")[0].getBoundingClientRect().left +
                $(".container2")[0].getBoundingClientRect().width / 2;
            curDown = true;
        });

        $(".container2").mousemove(function(event) {
            if (curDown) {
                $(".container2")[0].scrollBy(
                    (Math.sign(-curXPos + event.pageX) *
                        3 *
                        $(".dragscroll2")[0].getBoundingClientRect().height) /
                        $(".container2")[0].getBoundingClientRect().height,
                    (Math.sign(-curYPos + event.pageY) *
                        3 *
                        $(".dragscroll2")[0].getBoundingClientRect().height) /
                        $(".container2")[0].getBoundingClientRect().height
                );
            }
        });

        $(".container2").mouseleave(function(event) {
            curDown = false;
        });

        $(".container2").mouseup(function() {
            curDown = false;
        });
    }

    dragScroll2();
})(jQuery);
