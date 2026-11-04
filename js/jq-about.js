/* jQuery - Task 10: team cards on the About page (author: Yelnur Akhmetzhan)
   The card under the pointer (or with keyboard focus) stays bright, the other cards fade with fadeTo(). */
(function ($) {
  "use strict";

  $(function () {
    var $cards = $(".row-cols-md-3 .gym-card");
    if (!$cards.length) return;

    function focusCard($active) {
      $cards.not($active).stop(true).fadeTo(200, 0.45);
      $active.stop(true).fadeTo(200, 1);
    }

    function resetCards() {
      $cards.stop(true).fadeTo(200, 1);
    }

    $cards.attr("tabindex", "0").hover(
      function () {
        focusCard($(this));
      },
      resetCards
    );
    $cards.on("focus", function () {
      focusCard($(this));
    });
    $cards.on("blur", resetCards);
  });
})(jQuery);
