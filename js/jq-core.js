/* jQuery - shared helpers on every page (author: Yelnur Akhmetzhan)
   Task 1: reading progress bar + animated "back to top" button
   Task 2: toast notifications (GGToast.show) used by the other jQuery scripts */
(function ($) {
  "use strict";

  /* respect the "reduce motion" setting: with $.fx.off every animation finishes at once */
  $.fx.off = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Task 2: toast notifications ---------- */

  var MAX_TOASTS = 3;
  var $toastBox = $("<div>", { id: "toast-box", role: "status", "aria-live": "polite" });

  var GGToast = {
    show: function (message) {
      /* keep the screen tidy: remove the oldest toast when there are too many */
      var $old = $toastBox.children(".gg-toast");
      if ($old.length >= MAX_TOASTS) $old.first().stop(true, true).remove();

      $("<div>", { class: "gg-toast", text: message })
        .hide()
        .appendTo($toastBox)
        .fadeIn(200)
        .delay(2400)
        .fadeOut(400, function () {
          $(this).remove();
        });
    }
  };
  window.GGToast = GGToast;

  /* smooth scrolling with $.animate(); the CSS "scroll-behavior" is switched off while it runs,
     otherwise the browser would smooth every single step again and the animation would lag */
  window.GGScrollTo = function (top, duration) {
    var $root = $("html");
    $root.css("scroll-behavior", "auto");
    $("html, body")
      .stop(true)
      .animate({ scrollTop: top }, duration || 600, "swing", function () {
        $root.css("scroll-behavior", "");
      });
  };

  $(function () {
    $toastBox.appendTo("body");

    /* ---------- Task 1: progress bar and back-to-top button ---------- */

    var $bar = $("<div>", { id: "read-progress", "aria-hidden": "true" }).appendTo("body");
    var $topButton = $("<button>", {
      id: "to-top",
      type: "button",
      "aria-label": "Back to top",
      html: "&#8679;"
    })
      .hide()
      .appendTo("body");

    var $window = $(window);
    var topVisible = false;

    function updateScroll() {
      var scrollTop = $window.scrollTop();
      var maxScroll = $(document).height() - $window.height();
      var percent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      $bar.css("width", percent + "%");

      var shouldShow = scrollTop > 400;
      if (shouldShow !== topVisible) {
        topVisible = shouldShow;
        $topButton.stop(true, true)[shouldShow ? "fadeIn" : "fadeOut"](250);
      }
    }

    $window.on("scroll resize", updateScroll);
    updateScroll();

    $topButton.on("click", function () {
      if (typeof GGSound !== "undefined") GGSound.play("click");
      GGScrollTo(0, 600);
    });
  });
})(jQuery);
