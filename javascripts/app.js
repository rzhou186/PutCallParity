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
      call_label,
      put_label,
      straddle,
      hidden,
      choice,
      straddleColumn,
      solution,
      startTime,
      timer;

  $(document).ready(function() {
    correct = 0;
    total = 0;
    timer = 0;
    generateNewApp();
    listenForSubmissions();
  });

  function generateNewApp() {
    $("#submission").val("");
    $("#notifications").val("");
    generateNewVars();
    populateApp();
    $(".app").fadeIn("fast");
  }

  function generateNewVars() {
    straddleQuestion = false;
    startTime = Date.now();
    stockPrice = Math.floor(Math.random() * 8999 + 1000) / 100;
    reverseConversion = Math.floor(Math.random() * 100 - 50) / 100;
    strike = Math.floor(stockPrice / 2.5 + Math.floor(Math.random() * 3 - 1)) * 2.5;
    parity = Math.abs(stockPrice + reverseConversion - strike);
    lesser = Math.floor(Math.random() * 450 + 50) / 100;
    greater = lesser + parity;
    straddle = lesser + greater;
    if ((stockPrice + reverseConversion) > strike) {
      call = greater;
      put = lesser;
    } else {
      call = lesser;
      put = greater;
    }

    // Random chance of replacing one of the columns with a straddle
    straddleColumn = Math.floor(Math.random() * 3);
    if (straddleColumn == 0) {
      call = straddle;
      call_label = "Straddle";
    } else if (straddleColumn == 1) {
      put = straddle;
      put_label = "Straddle";
    }

    // Choose which column is hidden
    if (Math.random() < 0.5) {
      hidden = "call";
      solution = call;
    } else {
      hidden = "put";
      solution = put;
    }
  }

  function populateApp() {
    removeHidden();
    $("#correct").html(correct);
    $("#total").html(total);
    $("#timer").html(timer/1000);
    $("#stockPrice").html(stockPrice.toFixed(2));
    $("#reverseConversion").html(reverseConversion.toFixed(2));
    $("#call-label").html(call_label);
    $("#put-label").html(put_label);
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

// Relabel something as Straddle, if necessary
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
        timer += Date.now() - startTime;
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
