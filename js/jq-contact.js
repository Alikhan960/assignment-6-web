/* jQuery - contact page (author: Alikhan Yertaiuly)
   Task 9: live character counter for the message and a phone field that slides in
   when "Phone" is chosen as the preferred contact. */
(function ($) {
  "use strict";

  $(function () {
    var $message = $("#message");
    var $resetButton = $("#contact-reset");
    if (!$message.length) return;

    /* ---------- character counter ---------- */

    var LIMIT = 300;
    var $counter = $("<div>", { id: "message-counter", class: "char-counter", "aria-live": "polite" });
    $message.attr("maxlength", LIMIT).after($counter);

    function updateCounter() {
      var used = $message.val().length;
      $counter
        .text(used + " / " + LIMIT + " characters")
        .toggleClass("near-limit", used >= LIMIT * 0.9 && used < LIMIT)
        .toggleClass("at-limit", used >= LIMIT);
    }

    $message.on("input keyup", updateCounter);
    updateCounter();

    /* ---------- phone field ---------- */

    var $phoneBox = $("<div>", { class: "col-12 phone-field" })
      .append($("<label>", { class: "form-label", for: "phone", text: "Phone number" }))
      .append($("<input>", { class: "form-control", id: "phone", name: "phone", type: "tel", autocomplete: "tel", placeholder: "+7 700 000 00 00" }))
      .append($("<div>", { class: "error-text", id: "phone-error", role: "alert" }))
      .hide();
    var $phone = $phoneBox.find("#phone");
    var $phoneError = $phoneBox.find("#phone-error");

    $("fieldset").first().after($phoneBox);

    $('input[name="contact"]').on("change", function () {
      if ($(this).val() === "phone") {
        $phoneBox.stop(true, true).slideDown(250, function () {
          $phone.trigger("focus");
        });
      } else {
        $phoneBox.stop(true, true).slideUp(250);
      }
    });

    /* keep only characters that can be part of a phone number */
    $phone.on("input", function () {
      $phone.val($phone.val().replace(/[^\d+()\s-]/g, ""));
    });

    $phone.on("blur", function () {
      var value = $.trim($phone.val());
      var digits = value.replace(/\D/g, "");
      var valid = digits.length >= 10 && digits.length <= 15;
      if (!value) {
        $phone.removeClass("is-valid is-invalid");
        $phoneError.text("");
        return;
      }
      $phone.toggleClass("is-valid", valid).toggleClass("is-invalid", !valid);
      $phoneError.text(valid ? "" : "Enter 10 to 15 digits, for example +7 700 000 00 00.");
    });

    /* "Reset form" (contact-reset.js) puts the radio buttons back without a change event,
       so the extra jQuery parts are reset here as well */
    $resetButton.on("click", function () {
      $phone.val("").removeClass("is-valid is-invalid");
      $phoneError.text("");
      $phoneBox.stop(true, true).slideUp(250);
      updateCounter();
    });
  });
})(jQuery);
