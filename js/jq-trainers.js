/* jQuery - trainers page 
   Task 4: live coach search (keyup/input, filter, toggleClass, highlighting)
   Task 5: "More about this coach" panels created with jQuery and opened with slideToggle */
(function ($) {
  "use strict";

  $(function () {
    var $cards = $(".trainer-col");
    if (!$cards.length) return;

    /* ---------- Task 5: details panels ---------- */

    var DETAILS = {
      "Daniel Reed": { years: 9, focus: "Squat, bench press and deadlift programming", hours: "Mon-Fri, 07:00-15:00" },
      "Amina Karim": { years: 6, focus: "Mobility, core stability and conditioning", hours: "Tue-Sat, 09:00-17:00" },
      "Timur Sadyk": { years: 8, focus: "Power, jumps and athletic development", hours: "Mon-Thu, 12:00-20:00" },
      "Aigerim Nurlan": { years: 5, focus: "Powerlifting technique for beginners", hours: "Mon-Fri, 10:00-18:00" },
      "Marat Bekov": { years: 7, focus: "Kettlebells, circuits and endurance blocks", hours: "Wed-Sun, 08:00-16:00" },
      "Sofia Lind": { years: 10, focus: "Speed, agility and sport-specific work", hours: "Mon-Sat, 14:00-22:00" }
    };

    $cards.each(function (index) {
      var $card = $(this);
      var name = $card.find(".card-title").text().trim();
      var info = DETAILS[name];
      if (!info) return;

      var panelId = "coach-more-" + index;
      var $panel = $("<ul>", { id: panelId, class: "trainer-more list-unstyled" })
        .append($("<li>").append($("<strong>").text("Experience: "), document.createTextNode(info.years + " years")))
        .append($("<li>").append($("<strong>").text("Focus: "), document.createTextNode(info.focus)))
        .append($("<li>").append($("<strong>").text("Available: "), document.createTextNode(info.hours)))
        .hide();

      var $toggle = $("<button>", {
        type: "button",
        class: "btn btn-outline-light btn-sm mb-2 coach-more-btn",
        "aria-expanded": "false",
        "aria-controls": panelId,
        text: "More about this coach"
      });

      $card.find(".rating-block").after($toggle, $panel);

      $toggle.on("click", function () {
        var opening = $toggle.attr("aria-expanded") === "false";
        $toggle.attr("aria-expanded", String(opening)).text(opening ? "Hide details" : "More about this coach");
        $panel.stop(true, true).slideToggle(250);
        if (typeof GGSound !== "undefined") GGSound.play("click");
      });
    });

    /* ---------- Task 4: live search ---------- */

    var $input = $("#coach-search");
    var $clear = $("#coach-search-clear");
    var $counter = $("#filter-count");
    var $empty = $("<p>", { id: "no-coaches", class: "mt-4", role: "status", text: "No coaches match your search." })
      .hide()
      .insertAfter("#trainer-grid");
    if (!$input.length) return;

    /* remember the original coach names so the highlight can be removed again */
    $cards.find(".card-title").each(function () {
      $(this).data("original", $(this).text());
    });

    function escapeHtml(text) {
      return $("<div>").text(text).html();
    }

    function escapeRegExp(text) {
      return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function highlight($title, query) {
      var original = $title.data("original");
      if (!query) {
        $title.text(original);
        return;
      }
      var pattern = new RegExp("(" + escapeRegExp(escapeHtml(query)) + ")", "gi");
      $title.html(escapeHtml(original).replace(pattern, "<mark>$1</mark>"));
    }

    function runSearch() {
      var query = $.trim($input.val());
      var needle = query.toLowerCase();

      $cards.each(function () {
        var $card = $(this);
        var text = ($card.text() + " " + $card.data("category")).toLowerCase();
        var matches = !needle || text.indexOf(needle) !== -1;
        $card.toggleClass("is-search-hidden", !matches);
        highlight($card.find(".card-title"), query);
      });

      /* count only the cards that pass both the category filter and the search */
      var visible = $cards.filter(function () {
        return $(this).css("display") !== "none";
      }).length;

      var text = "Showing " + visible + " of " + $cards.length + " coaches";
      if (query) text += " for “" + query + "”";
      $counter.text(text);

      $empty.stop(true, true)[visible === 0 ? "fadeIn" : "fadeOut"](200);
      $clear.prop("disabled", !query);
    }

    $input.on("input keyup", runSearch);

    $clear.on("click", function () {
      $input.val("").trigger("input").trigger("focus");
    });

    /* the category buttons (plain JavaScript from Assignment 5) rewrite the counter,
       so the search is applied again after every filter click */
    $(document).on("click", "[data-filter]", runSearch);

    runSearch();
  });
})(jQuery);
