(function() {

  var correct,
      total,
      stockPrice,
      reverseConversion,
      strike,
      parity,
      lesser,
      greater,
      put,
      call,
      hidden,
      solution;

  $(document).ready(function() {
    correct = 0;
    total = 0;
    generateNewApp();
    listenForSubmissions();
  });

  function generateNewApp() {
    $("#submission").val("");
    generateNewVars();
    populateApp();
    $(".app").fadeIn("fast");
  }

  function generateNewVars() {
    stockPrice = Math.floor(Math.random() * 8999 + 1000) / 100;
    reverseConversion = Math.floor(Math.random() * 400 - 200) / 100;
    strike = Math.floor(stockPrice / 5 + Math.floor(Math.random() * 2 - 1)) * 5;
    parity = Math.abs(stockPrice + reverseConversion - strike);
    lesser = Math.floor(Math.random() * 450 + 50) / 100;
    greater = lesser + parity;
    if ((stockPrice + reverseConversion) > strike) {
      call = greater;
      put = lesser;
    }
    else {
      call = lesser;
      put = greater;
    }
    if (Math.random() < 0.5) {
      hidden = "call";
      solution = call;
    }
    else {
      hidden = "put";
      solution = put;
    }
  }

  function populateApp() {
    removeHidden();
    $("#correct").html(correct);
    $("#total").html(total);
    $("#stockPrice").html(stockPrice.toFixed(2));
    $("#reverseConversion").html(reverseConversion.toFixed(2));
    $("#call").html(call.toFixed(2));
    $("#strike").html(strike);
    $("#put").html(put.toFixed(2));
    applyHidden();
  }

  function removeHidden() {
    $("#call").parent().removeClass("hidden");
    $("#put").parent().removeClass("hidden");
    $("#call-label").removeClass("goal");
    $("#put-label").removeClass("goal");
  }

  function applyHidden() {
    if (hidden === "call") {
      $("#call-label").addClass("goal");
      $("#call").parent().addClass("hidden");
    }
    else if (hidden === "put") {
      $("#put-label").addClass("goal");
      $("#put").parent().addClass("hidden");
    }
  }

  function listenForSubmissions() {
    $("#submission").keyup(function (event) {
      if (event.which === 13 && $("#submission").val() !== "" ) {
        total++;
        $(".app").fadeOut("fast", function() {
          if ($("#submission").val() === solution.toFixed(2)) {
            correct++;
            renderNotification("Correct! The solution was: $ " + solution.toFixed(2) + ".");
          }
          else renderNotification("Incorrect. The solution was: $ " + solution.toFixed(2) + ".");
          generateNewApp();
        });
      }
    });
  }

  function renderNotification(message) {
    $("#notifications").html(message);
  }

}());
