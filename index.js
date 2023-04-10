
$(document).ready(function () { 

  // Variables ==================================================

    var currentScoreVal = 0;
    var lastScoreVal = 0;
    var sessionScoreVal = 0;

    var gameStatus = false;
    
    var secondsVal = 10;
    var mQVal = 1 + 1;
    var inputAnswer = 0;

    var plusStatus = true;
    var minusStatus = false;
    var multStatus = false;
    var divStatus = false;
    var mathOps = ["+"];

    var numRangeVal = 10;

    var mQAnswer = 0;

  // Selectors ==================================================

    // 'ScoreList'
    var currentScore = $('#CurrentScore');
    var lastScore = $('#LastScore');
    var sessionScore = $('#SessionScore');

    // 'GameSection'
    var secondsCounter = $('#SecondsCounter');
    var mQ = $('#mQ');
    var inpAnsw = $('.InputAnswer');

    // 'CheckBoxRow'
    var plus = $("#Plus");
    var minus = $('#Minus');
    var multiply = $('#Multiply');
    var divide = $('#Divide');

    // 'Range'
    var rangeCounter = $('#RangeCounter');
    var numberRange = $('#NumberRange');

  // Methods ====================================================

    var genNewMQ = () => {

      // var maxAns = (numRangeVal * numRangeVal); // ex. 100 or 2500 
      // var mathOps = ["+", "-", "*", "/"];
      var mathRandOp = mathOps[Math.floor(Math.random() * mathOps.length)];
      var firstDigit = Math.floor(Math.random() * numRangeVal + 1);
      var secondDigit = 1;
      var secondDigArr = [];

      if (mathRandOp === "/") {

        for (i = 0; i <= numRangeVal; i++) {

          if ((firstDigit / i) % 1 === 0) {

            secondDigArr.push(i);
            continue;

          } else {

            continue;

          };

        };

        secondDigit = secondDigArr[Math.floor(Math.random() * secondDigArr.length)];

      } else if (mathRandOp === "-") {

        secondDigit = Math.floor(Math.random() * firstDigit + 1);

      } else {

        var secondDigit = Math.floor(Math.random() * numRangeVal + 1);
        
      };

      mQVal = firstDigit + " " + mathRandOp + " " + secondDigit;
      $(mQ).text(mQVal);
      mQAnswer = eval(firstDigit + mathRandOp + secondDigit);

    };
    genNewMQ();

    var checkAnsw = () => {

      if (inputAnswer == mQAnswer) {

        secondsVal += 2;
        $(secondsCounter).text(secondsVal);

        currentScoreVal += 1;
        currentScore.text(currentScoreVal);

        genNewMQ();

      } else {};

    };

    var startGame = () => {

      var disableOptions = () => {

        plus.prop('disabled', true);
        minus.prop('disabled', true);
        multiply.prop('disabled', true);
        divide.prop('disabled', true);
        numberRange.prop('disabled', true);

      };
      disableOptions();

      secondsVal = 10;
      secondsCounter.text(secondsVal);

      var secInt = setInterval(function() {

        secondsVal -= 1;
        secondsCounter.text(secondsVal);

        if (secondsVal == 0) {

          clearInterval(secInt);
          endGame();

        } else if (secondsVal <= 3) {

          secondsCounter.css('color', 'red');

        } else if (secondsVal > 10) {

          var hexColor = '#00f5d0';
          secondsCounter.css('color', hexColor);

        } else {

          secondsCounter.css('color', 'white');

        };

      }, 995);

    };

    var endGame = () => {

      var enableOptions = () => {

        plus.prop('disabled', false);
        minus.prop('disabled', false);
        multiply.prop('disabled', false);
        divide.prop('disabled', false);
        numberRange.prop('disabled', false);

      };
      enableOptions();

      lastScoreVal = currentScoreVal;
      lastScore.text(lastScoreVal);

      if (lastScoreVal > sessionScoreVal) {

        sessionScoreVal = lastScoreVal;
        sessionScore.text(lastScoreVal);

      } else {};
      
      currentScoreVal = 0;
      currentScore.text(currentScoreVal);

      gameStatus = false;
      secondsVal = 10;
      secondsCounter.text(secondsVal);
      secondsCounter.css('color', 'white');

    };

  // Event Listeners ============================================

    $(document).on('keyup', inpAnsw, function () {

      if (gameStatus === false) {

        gameStatus = true;
        startGame();

      } else if (gameStatus === true) {

        inputAnswer = $(inpAnsw).val();
        checkAnsw();

      } else {};

    });

    $(plus).on('click', function () {

      if (!(plus.prop('checked'))) {

        plusStatus = false;
        mathOps = mathOps.filter(e => e !== "+");

      } else if (plus.prop('checked')) {

        plusStatus = true;
        mathOps.push("+");

      };

    });

    $(minus).on('click', function () {

      if (!(minus.prop('checked'))) {

        minusStatus = false;
        mathOps = mathOps.filter(e => e !== "-");

      } else if (minus.prop('checked')) {

        minusStatus = true;
        mathOps.push("-");

      };

    });

    $(multiply).on('click',
    function () {

      if (!(multiply.prop('checked'))) {

        multStatus = false;
        mathOps = mathOps.filter(e => e !== "*");

      } else if (multiply.prop('checked')) {

        multStatus = true;
        mathOps.push("*");

      };

    });

    $(divide).on('click', function () {

      if (!(divide.prop('checked'))) {

        divStatus = false;
        mathOps = mathOps.filter(e => e !== "/");

      } else if (divide.prop('checked')) {

        divStatus = true;
        mathOps.push("/");

      };

    });

    $(document).on('change', numberRange, function () {

      numRangeVal = $(numberRange).val();
      
      $(rangeCounter).text(numRangeVal);
      
    });

});
