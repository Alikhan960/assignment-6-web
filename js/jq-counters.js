/* jQuery - Task 3: animated statistics counters on the home page (author: Yelnur Akhmetzhan)
   Each number counts up from 0 with $.animate() and its step callback. */
(function ($) {
  "use strict";

  $(function () {
    var $counters = $(".stats .count");
    if (!$counters.length) return;

    function format(value) {
      return Math.round(value).toLocaleString("en-US");
    }

    function runCounter($counter) {
      var target = Number($counter.data("target"));
      var suffix = $counter.data("suffix") || "";

      /* an object is animated instead of the element: its "value" property is the number */
      $({ value: 0 }).animate(
        { value: target },
        {
          duration: 1600,
          easing: "swing",
          step: function (now) {
            $counter.text(format(now) + suffix);
          },
          complete: function () {
            $counter.text(format(target) + suffix);
          }
        }
      );
    }

    $counters.each(function () {
      $(this).text("0");
    });

    /* start when the numbers are visible on the screen (once) */
    var started = false;

    function startIfVisible() {
      if (started) return;
      var $box = $(".stats").first();
      var top = $box.offset().top;
      var bottom = top + $box.outerHeight();
      var viewTop = $(window).scrollTop();
      var viewBottom = viewTop + $(window).height();
      if (bottom >= viewTop && top <= viewBottom) {
        started = true;
        $(window).off("scroll.counters resize.counters");
        $counters.each(function (index) {
          var $counter = $(this);
          /* small delay between the three numbers */
          setTimeout(function () {
            runCounter($counter);
          }, index * 200);
        });
      }
    }

    $(window).on("scroll.counters resize.counters", startIfVisible);
    startIfVisible();
  });
})(jQuery);
