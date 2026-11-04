/* jQuery - prices page
   Task 6: monthly / yearly price switch with fade 
   Task 7: click a table row to choose the plan in the form (author: Alikhan Yertaiuly)
   Task 8: "Expand all / Collapse all" for the FAQ (author: Alikhan Yertaiuly) */
(function ($) {
  "use strict";

  function formatPrice(value) {
    return "₸" + Math.round(value).toLocaleString("en-US");
  }

  function playSound(name) {
    if (typeof GGSound !== "undefined") GGSound.play(name);
  }

  $(function () {
    /* ---------- Task 6: price period switch ---------- */

    var YEARLY_DISCOUNT = 0.15;
    var $cells = $("td.price-cell");
    var $heading = $("#price-heading");
    var $periodButtons = $("[data-period]");

    function priceFor(monthly, period) {
      return period === "yearly" ? monthly * 12 * (1 - YEARLY_DISCOUNT) : monthly;
    }

    function showPeriod(period) {
      $periodButtons.each(function () {
        var active = $(this).data("period") === period;
        $(this).toggleClass("active", active).attr("aria-pressed", String(active));
      });

      /* opacity is animated (not fadeOut) so the table cells keep their layout */
      $cells.stop(true, true).each(function () {
        var $cell = $(this);
        $cell.animate({ opacity: 0 }, 150, function () {
          $cell.text(formatPrice(priceFor(Number($cell.data("monthly")), period))).animate({ opacity: 1 }, 150);
        });
      });
      $heading.text(period === "yearly" ? "Per year (-15%)" : "Monthly");
    }

    $periodButtons.on("click", function () {
      var period = $(this).data("period");
      if ($(this).hasClass("active")) return;
      showPeriod(period);
      playSound("click");
      GGToast.show(period === "yearly" ? "Showing yearly prices with a 15% discount." : "Showing monthly prices.");
    });

    /* ---------- Task 7: table row selects the plan ---------- */

    var $rows = $("tbody tr.plan-row");

    function choosePlan($row) {
      var plan = $row.data("plan");
      $rows.removeClass("row-selected").attr("aria-selected", "false");
      $row.addClass("row-selected").attr("aria-selected", "true");

      /* click() on the radio button also fires the "change" event used by the membership form script */
      var $radio = $('input[name="plan"][value="' + plan + '"]');
      if (!$radio.prop("checked")) $radio.trigger("click");

      playSound("success");
      GGToast.show($row.find("td:first").text() + " plan selected in the join form.");

      var $target = $("#join-title");
      if ($target.length) {
        GGScrollTo($target.offset().top - 90, 600);
      }
    }

    $rows
      .attr({ tabindex: "0", title: "Click to choose this plan", "aria-selected": "false" })
      .on("click", function () {
        choosePlan($(this));
      })
      .on("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          choosePlan($(this));
        }
      })
      .hover(
        function () {
          $(this).addClass("row-hover");
        },
        function () {
          $(this).removeClass("row-hover");
        }
      );

    /* ---------- Task 8: expand / collapse all FAQ answers ---------- */

    /* the accordion itself is plain JavaScript (Assignment 4); here its buttons are clicked one by one */
    function toggleAll(open) {
      var state = open ? "false" : "true";
      var $questions = $('.accordion-question[aria-expanded="' + state + '"]');
      if (!$questions.length) {
        GGToast.show(open ? "All answers are already open." : "All answers are already closed.");
        return;
      }
      $questions.each(function (index) {
        $(this)
          .delay(index * 120)
          .queue(function (next) {
            $(this).trigger("click");
            next();
          });
      });
      GGToast.show(open ? "All answers opened." : "All answers closed.");
    }

    $("#faq-expand").on("click", function () {
      toggleAll(true);
    });
    $("#faq-collapse").on("click", function () {
      toggleAll(false);
    });
  });
})(jQuery);
