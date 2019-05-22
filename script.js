//AJ's new tab page, you already know the vibes man
//This is a second change

//Variables---------------------------------------------------------------------
//Ball Control
var y = 0;                                                                      //Y Position (Of boredom ball)
var vy = 2;                                                                     //Velocity
var ay = -.01;                                                                  //Downward Acceleration
//Modes
var ballMode = 2;                                                               //Ball mode (Red Blue)
var backMode = 1;                                                               //Back mode (Gray Cream)
var currentScreen = 1;                                                          //What screen your on
var gradState = true;                                                           //Gradients are on
//Numbers to hold
var n;                                                                          //PX to number
var w = window.innerWidth;                                                      //Width of current window
var h = window.innerHeight;                                                     //Height of current window
//Menus (Right/Left)
var rightMenu = false;                                                          //Right trigger is hidden
var leftMenu = false;                                                           //Left trigger is hidden
var propState = false;                                                          //Prop game is not on
//Misc.
var typedString;                                                                //String to hold search bar contents
var highScore;                                                                  //Var to hold current high score

//Functions---------------------------------------------------------------------
var ballup = function (){                                                       //Function for ballup (for click/hover)
  vy += 1.3;                                                                    //Increase Velocity
  ay = -.01;                                                                    //Reset Downward Acceleration
  $("#counter").fadeIn(500);                                                    //Counter fade in for cleanliness
  $(".rightbutton").fadeOut(500);                                               //Fade out the buttons on the right side
  $("#righttrig").hide();                                                       //Fade
  $(".leftbutton").fadeOut(500);                                                //Fade in the buttons the left side
  $("#lefttrig").hide();
  $('input').blur();
}                                                                               //CLOSE OUT FUNCTION
var ballup2 = function (){                                                      //Function for ballup 2 (for typing)
  vy += .4;                                                                     //Increase velocity
  ay = -.01;                                                                    //Reset Downward Acceleration
}                                                                               //CLOSE OUT FUNCTION
function PXtoNumber (s) {                                                       //Function for px to number conversion
  n = Number(s.substr(0,s.length-2))                                            //Actual math
  return n.toFixed(0);                                                          //Return and rounding
}                                                                               //CLOSE OUT FUNCTION
function clearSearch() {                                                        //Function for clearing search bar
  $('input').val('');                                                           //Sets value to 0
  $('input').blur();                                                            //Unfocuses search bar
}                                                                               //CLOSE OUT FUNCTION
function closeHelp() {                                                          //Function for closing help menu
  $(".menutable").fadeOut(500);                                                 //Fade out help menu
}                                                                               //CLOSE OUT FUNCTION
function screenChange (s) {                                                     //Function for screen change, Input: screenChange("#screennumber");
  $("#screenone").fadeOut(500);                                                 //Screen one fade out
  $(s).delay(500).fadeIn(500);                                                  //Fade in whatever screen you choose
}                                                                               //CLOSE OUT FUNCTION
function GetWindowDims() {                                                      //Function for Reassigning window values
  w = window.innerWidth;                                                        //Width of current window
  h = window.innerHeight;                                                       //Height of current window
}                                                                               //CLOSE OUT FUNCTION
function changeGradient() {                                                     //Function for changing to gradient mode
  if(gradState == false){                                                       //If gradient mode is off
    $("#circle").fadeOut(500);                                                  //Fade out the circle
    setTimeout(                                                                 //Wait 500 milliseconds
      function() {                                                              //... (function)
        if(ballMode % 2 == 0){                                                  //If the ball is blue
          $("#circle").addClass("gradientB");                                   //Add the blue gradient
        }                                                                       //Close out if statement
        else{                                                                   //If the ball is red (else)
          $("#circle").addClass("gradientR");                                   //Add the red gradient
        }                                                                       //Close out else statement
        $("#circle").fadeIn(500);                                               //Fade the circle back in
        gradState = true;                                                       //Turn gradient mode on (var)
      }, 500                                                                    //Delay
    );
  }                                                                             //Close out if statement
  else{                                                                         //If gradient mode is on
    $("#circle").fadeOut(500);                                                  //Fade out the circle
    setTimeout(                                                                 //Wait 500 milliseconds
      function() {                                                              //... (function)
        $("#circle").removeClass("gradientB gradientR");                        //Remove any gradients
        $("#circle").fadeIn(500);                                               //Fade the circle back in
        gradState = false;                                                      //Turn gradient mode off (var)
      }, 500                                                                    //Delay
    );
  }                                                                             //Close out else statement
}                                                                               //CLOSE OUT FUNCTION
function startTimer() {                                                         //Function for starting ball timer
  var seconds = 0;                                                              //Start a var for time
  $("#counter").fadeOut(500);                                                   //Hide the counter
  setTimeout(                                                                   //Wait 500 seconds (Until counters gone)
    function() {                                                                //... (function)
        $("#counter").remove();                                                 //Delete the counter completely
    }, 500                                                                      //Delay
  );
  $("#timer").delay(500).fadeIn(500);                                           //Fade in the timer
  setInterval(                                                                  //Run the following code repeatadly
    function() {                                                                //... (function)
      seconds ++;                                                               //Add a second
      if(y <= 0){                                                               //If the ball drops
        seconds = 0;                                                            //Restart the timer
      }                                                                         //Close out if statement
      $("#timer").html(seconds);                                                //Write the current time in the timer div
      //HIGHSCORE SETTING
      highScore = localStorage.getItem('highScore');                            //Get the locally stored high score and save it to high score var
      if(seconds >= highScore){                                                 //If you meet or pass the high score
        highScore = seconds;                                                    //Record curent time
        localStorage.highScore = highScore;                                     //Save current time
      }                                                                         //Close out if statement
    }, 1000                                                                     //Do this every second
  );
  setInterval(                                                                  //Run the following code repeatadly
    function() {                                                                //... (function)
      $("#circle").html(highScore)                                              //Display the height on the ball
    }, 1                                                                        //Do this 1000 times a second
  );
}                                                                               //CLOSE OUT FUNCTION
function resetScore() {                                                         //Function for resetting highscores
  seconds = 0;                                                                  //Reset the current time (probaby unneccessary)
  highScore = 0;                                                                //Resets the high score current val
  localStorage.highScore = 0;                                                   //Resets the saved high score
}                                                                               //CLOSE OUT FUNCTION
function lastClosed() {                                                         //Function for opening the last closed tab
  var lastClosedUrl;                                                            //Var for the last page closed's url
  chrome.sessions.getRecentlyClosed({maxResults:1}, function (results) {        //Find the last closed page
    lastClosedUrl = results[0].tab.url; }                                       //Find and save the URL of that page
  );
  setTimeout(                                                                   //Wait 100 milliseconds
    function() {                                                                //... (function)
      if (lastClosedUrl.indexOf("chrome") == 0) {                               //If the last closed url is a local resource
        console.log("Cannot load local resources")                              //Console log error message
      }                                                                         //Close out if statement
      else{                                                                     //If the last closed url is a webpage (else)
        window.open(lastClosedUrl, '_blank');                                   //Open it in a new window
      }                                                                         //Close out else statement
    }, 100                                                                      //Delay
  );
}                                                                               //CLOSE OUT FUNCTION
function getArray() {                                                           //Save array arr to localStorage
  var savedArray = localStorage.getItem('myArray');
  if (savedArray) {
    return JSON.parse(savedArray);
  } else {
    return []
  }
}                                                                               //CLOSE OUT FUNCTION
function saveArray(arr) {                                                       //Save array arr to localStorage
  localStorage.setItem('myArray', JSON.stringify(arr))
}                                                                               //CLOSE OUT FUNCTION
function freeze() {                                                             //Function for freezing browser
  while(1){}
}                                                                               //CLOSE OUT FUNCTION
// function tabs() {
//   chrome.tabs.getCurrent(
//     function (ctab){
//       chrome.tabs.query(
//         {windowid:ctab.windowid},
//         function (tabs){
//           console.log(tabs);
//         }
//       );
//     }
//   );
// }
var myList = getArray()
// myList.push('new item ' + myList.length)
// console.log('My list is: ', myList)
saveArray(myList);

//JQuery------------------------------------------------------------------------
$(document).ready(                                                              //Starts up JQuery
  function() {                                                                  //Main function
    if(localStorage.getItem(stringLights) == 'true'){                           //If String Lights are on
      $('#stringLights').show();                                                //Show the lights
      localStorage.setItem(stringLights, 'true');                               //Set the string lights state as on
    }                                                                           //Close out if statement
    else{                                                                       //If String Lights are off, null, or undefined
      localStorage.setItem(stringLights, 'false');                              //Set the string light state as off
    }                                                                           //Close out else statement
    setInterval(                                                                //Run the following function repeatadly (MAIN BALL CONTROL)
      function () {                                                             //... (Function)
        $('#circle').css({bottom:y});                                           //Change the bottom for Y pos
        y += vy;                                                                //Dynamics
        vy += ay;                                                               //Dynamics
        n = $("#circle").css("bottom");                                         //Assign pixel count from bottom to "n"
        n = PXtoNumber (n);                                                     //Uses function (PXtoNumber)
        $("#counter").html(n);                                                  //Write the "n" in the #counter div
        if (y <= 0) {                                                           //If it goes under or is at 0...
          vy = 0;                                                               //Make it still
          ay = 0;                                                               //Make it still
          y = 0;                                                                //Make it still
          seconds = 0;
        }                                                                       //Close out if statement
      },1                                                                       //Run this entire function every millisecond
    );

//Links/Bookmarks---------------------------------------------------------------
    $("#drivebutton").click(                                                    //When you click on drive
      function() {                                                              //... (function)
        window.location = "https://drive.google.com/drive/u/0/my-drive";        //Open it
      }                                                                         //CLOSE OUT FUNCTION
    );
    $("#aspenbutton").click(                                                    //When you click on X2
      function() {                                                              //... (function)
        window.location = "https://ma-innovation.myfollett.com/aspen/logon.do"; //Open it
      }                                                                         //CLOSE OUT FUNCTION
    );
    $("#replbutton").click(                                                     //When you click on Repl
      function() {                                                              //... (function)
        window.location = "https://repl.it/repls";                              //Open it
      }                                                                         //CLOSE OUT FUNCTION
    );
    $("#netflixbutton").click(                                                  //When you click on Netflix
      function() {                                                              //... (function)
        window.location = "https://www.netflix.com/browse";                     //Open it
      }                                                                         //CLOSE OUT FUNCTION
    );
    $("#youtubebutton").click(                                                  //When you click on youtube
      function() {                                                              //... (function)
        window.location = "https://www.youtube.com/";                           //Open it
      }                                                                         //CLOSE OUT FUNCTION
    );
    $("#gmailbutton").click(                                                    //When you click on Gmail
      function() {                                                              //... (function)
        window.location = "https://mail.google.com/mail/u/0/";                  //Open it
      }                                                                         //CLOSE OUT FUNCTION
    );

//Color Switches----------------------------------------------------------------
    $("#switchball").click(                                                     //When you click on ball switch
      function() {                                                              //... (function)
        ballMode = ballMode + 1;                                                //Change ballMode EVEN IS BLUE / ODD IS RED
        if(ballMode % 2 == 0 && gradState == false){                            //If ballMode is even
          $("#circle").animate({backgroundColor:"#22bee0"});                    //Make ball blue
          $(this).animate({backgroundColor:"#22bee0"});                         //Make ball switch blue
        }                                                                       //Close out if statement
        if(ballMode % 2 == 0 && gradState == true){                             //If ballMode is even and gradient is on
          $("#circle").fadeOut(500);                                            //Hide the circle
          setTimeout(                                                           //Wait 500 milliseconds
            function() {                                                        //... (function)
              gradState = false;                                                //Gradients are off
              $("#circle").removeClass("gradientB gradientR");                  //Turn off gradients
              $("#circle").animate({backgroundColor:"#22bee0"});                //Make ball blue
              $("#switchball").animate({backgroundColor:"#22bee0"});            //Make ball switch blue
              $("#circle").fadeIn(500);                                         //Bring circle back
            }, 500);                                                            //Delay
        }                                                                       //Close out if statement
        if(ballMode % 2 == 1 && gradState == false){                            //If ballMode is odd
          $("#circle").animate({backgroundColor:"#e04422"});                    //Make ball red
          $(this).animate({backgroundColor:"#e04422"});                         //Make ball switch red
        }                                                                       //Close out if statement
        if(ballMode % 2 == 1 && gradState == true){                             //If ballmode is odd and gradient is on
          $("#circle").fadeOut(500);                                            //Hide the circle
          setTimeout(                                                           //Wait 500 milliseconds
            function() {                                                        //... (function)
              gradState = false;                                                //Gradients are off
              $("#circle").removeClass("gradientB gradientR");                  //Turn off gradients
              $("#circle").animate({backgroundColor:"#e04422"});                //Make ball blue
              $("#switchball").animate({backgroundColor:"#e04422"});            //Make ball switch blue
              $("#circle").fadeIn(500);                                         //Bring circle back
            }, 500);                                                            //Delay
        }                                                                       //Close out if statement
      }                                                                         //CLOSE OUT FUNCTION
    );
    $("#switchback").click(                                                     //When you click on back switch
      function() {                                                              //... (function)
        backMode = backMode + 1;                                                //Change backMode
        if(backMode % 2 == 0){                                                  //If backMode is even
          $("body,#wrapper").animate({backgroundColor:"#fffaf4"});              //Brighten background
          $(this).animate({backgroundColor:"#333333"});                         //Darken button
          $("#counter").animate({color:"#333333"});                             //Darken counter
          $(".corner").animate({borderColor:"#333333"});                        //Darken corner
        }                                                                       //Close out if statement
        else{                                                                   //If backMode is odd (else)
          $("body,#wrapper").animate({backgroundColor:"#333333"});              //Darken background
          $(this).animate({backgroundColor:"#fffaf4"});                         //Brighten button
          $("#counter").animate({color:"#fffaf4"});                             //Darken counter
          $(".corner").animate({borderColor:"#fffaf4"});                        //Darken corner
        }                                                                       //Close out else statement
      }                                                                         //CLOSE OUT FUNCTION
    );
    $("#circle").click(                                                         //When you click on the circle
      function() {                                                              //... (function)
        changeGradient();                                                       //Click uses function (changeGradient)
      }                                                                         //CLOSE OUT FUNCTION
    );
    $("#counter").click(                                                        //When you click on the height counter
      function() {                                                              //...(function)
        startTimer();                                                           //Start the timer
      }                                                                         //CLOSE OUT FUNCITON
    );

//Ballup Function Activations---------------------------------------------------
    $("#wrapper").click(                                                        //When you click on the wrapper
      ballup                                                                    //Click uses function (ballup)
    );
    $("body").keyup(                                                            //When you type in search bar
      ballup2                                                                   //Keyup uses function (ballup2)
    );
    $("#circle").mouseover(                                                     //When you hover over circle
      ballup                                                                    //Mouseover uses function (ballup)
    );

//SECRET CODE SETUP-------------------------------------------------------------
    function secretCode() {
      typedString = $('#search').val();
      //Code: ??        Event: Open help pop up           Not included in itself
      if (typedString == "??") {
        $("#help").fadeIn(500);
        setTimeout(clearSearch, 150);
      }
      //Code: disco     Event: Start disco effect on ball                   Chec
      if (typedString == "disco") {
        $("#circle").fadeOut(500);
        setTimeout(
          function() {
            $("#circle").removeClass("gradientB gradientR");
            $("#circle").fadeIn(500);
          }, 500
        );
        setInterval(
          function() {
            $('#circle').animate({
                backgroundColor: '#e72763'
              }, 500)
              .animate({
                backgroundColor: '#a0da00'
              }, 500)
              .animate({
                backgroundColor: '#00a0da'
              }, 500);
          }, 1000
        );
        clearSearch();
      }
      //Code: fulldisco Event: Start disco effect and hide all else         Chec
      if (typedString == "fulldisco") {
        $("#circle").fadeOut(500);
        setTimeout(
          function() {
            $("#circle").removeClass("gradientB gradientR");
            $("#circle").fadeIn(500);
          }, 500
        );
        $("Input").fadeOut(500);
        $("#switchball").fadeOut(500);
        $("#switchback").fadeOut(500);
        $(".corner").fadeOut(500);
        $('#stringLights').fadeOut(500);
        setInterval(function() {
          $('#circle').animate({
              backgroundColor: '#e72763'
            }, 500)
            .animate({
              backgroundColor: '#a0da00'
            }, 500)
            .animate({
              backgroundColor: '#00a0da'
            }, 500);
        }, 1000);
      }
      //Code: pong      Event: Open browser pong                            Chec
      if (typedString == "pong") {
        window.location = "http://stewd.io/pong/";
      }
      //Code: grde      Event: Open X2 aspen                                Chec
      if (typedString == "grade") {
        window.location = "https://ma-innovation.myfollett.com/aspen/logon.do";
      }
      //Code: testemp   Event: Clear screen for testing                     Chec
      if (typedString == "testemp") {
        $("#screenone").fadeOut(500);
        $("body").delay(500).animate({
          backgroundColor: "#fffaf4"
        }, 500);
        clearSearch();
      }
      //Code: byesearch Event: Remove search bar                            Chec
      if (typedString == "byesearch") {
        $("Input").fadeOut(500);
      }
      //Code loadd      Event: Show loading screen                          Chec
      if (typedString == "loadd") {
        screenChange("#screentwo");
        currentScreen = 2;
      }
      //Code: whatkey   Event: Open Key checker                             Chec
      if (typedString == "whatkey") {
        window.location = "https://keycode.info/";
      }
      //Code: debug     Event: Open Debug menu                              Chec
      if (typedString == "debug") {
        $("#search").fadeOut(250);
        $("#counter, #timer").fadeOut(250);
        setTimeout(function() {
          $("#counter, #timer").remove();
        }, 250);
        $("#debug").delay(250).fadeIn(250);
        setTimeout(
          function() {
            $("#debug").focus();
          }, 500
        );
      }
      //Code: timer     Event: Start the timer                              Chec
      if (typedString == "timer") {
        startTimer();
        clearSearch();
      }
      //Code: gradee    Event: Open schedule                                Chec
      if (typedString == "class") {
        $("#schedule").fadeIn(500);
        clearSearch();
      }
      //Code: shownote  Event: Show all currently stored notes              Chec
      if (typedString == "shownote") {
        $(".note").fadeIn(500).css("display", "inline-block");
        clearSearch();
      }
      //Code: note      Event: Add a new note                               Chec
      if (typedString == "note") {
        $("#search").fadeOut(250);
        $("#counter, #timer").fadeOut(250);
        setTimeout(function() {
          $("#counter, #timer").remove();
        }, 500);
        $("#notetaker").delay(250).fadeIn(250);
        setTimeout(
          function() {
            $("#notetaker").focus();
          }, 500
        );
      }
      //Code: prop      Event: Open prop hunt game                          Chec
      if (typedString == "prop") {
        $("#game").html('<iframe src="https://game216148.konggames.com/gamez/0021/6148/live/game.html" id="propGame" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" msallowfullscreen="true" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" width="100%" height="100%"></iframe>');
        propState = true;
        setTimeout(
          function() {
            $("#propGame").fadeIn(500);
            clearSearch();
          }, 200
        );
      }
      //Code: mosh      Event: Open Javascript tutorial                     Chec
      if (typedString == "mosh") {
        window.location = "https://codewithmosh.com/courses/enrolled/324741"
      }
      //Code: bank      Event: Open Santander Bank                          Chec
      if (typedString == "bank") {
        window.location = "https://www.santanderbank.com/us/personal"
      }
      //Code: tabkey    Event: Open new tab shortcuts                       Chec
      if (typedString == "tabkey") {
        $("#chromeshortcuts").fadeIn(500);
        setTimeout(clearSearch, 150);
      }
      //Code: byescore  Event: Reset the ball scores                        Chec
      if (typedString == "byescore") {
        resetScore();
        clearSearch();
      }
      //Code: lightshow Event: Show string lights                           Chec
      if (typedString == "lightshow") {
        if(localStorage.getItem(stringLights) == 'true'){
          // alert('Turning Lights off');
          localStorage.setItem(stringLights, 'false');
          $('#stringLights').fadeOut(250);
        }
        else{
          // alert('Turning Lights on');
          localStorage.setItem(stringLights, 'true');
          $('#stringLights').fadeIn(250);
        }
        clearSearch();
      }
      //Code: freeze    Event: Freeze the browser                           Chec
      if (typedString == "frz") {
        if(window.confirm('Freeze?') == true){
          freeze();
        }
        else{
          console.log('Not frozen');
        }
      }
    }

//Secret Code running-----------------------------------------------------------
    $("#search").keyup(                                                         //When you type in the search bar
      function() {                                                              //... (function)
          secretCode();                                                         //Check for any codewords
      }                                                                         //CLOSE OUT FUNCTION
    );

//Schedule----------------------------------------------------------------------
    $("#schedule").click(                                                       //When you click on the schedule
      function() {                                                              //... (function)
        $(this).fadeOut(500);                                                   //Fade out the schedule
      }                                                                         //CLOSE OUT FUNCTION
    );

//Help Menu---------------------------------------------------------------------
    $("#helpx").click(                                                          //When you click on the X button on the help menu
      function() {                                                              //... (function)
        closeHelp();                                                            //Run closeHelp function;
      }                                                                         //CLOSE OUT FUNCTION
    );
    $('.secretCode').click(                                                     //When you click on any of the secret codes in help
      function() {                                                              //... (function)
        $('#search').val(this.innerText);                                       //Put whatever you clicked on in the search bar
        closeHelp();                                                            //Close the help menu
        secretCode();                                                           //Check for any codewords
      }                                                                         //CLOSE OUT FUNCTION
    );

//Keyboard Shortcuts------------------------------------------------------------
    $(document).keyup(                                                          //When any key goes up
      function(e) {                                                             //... (function)
        if (e.key === "Escape") {                                               //If the key you pressed is escape...
          closeHelp();                                                          //Fade out the help menu
          $("#search").focus();                                                 //Refocus on input
        }                                                                       //Close out if statement
        if (e.keyCode === 192) {                                                //If the key you pressed is `...
          $("#search").focus();                                                 //Focus on input
        }                                                                       //Close out if statement
      }                                                                         //CLOSE OUT FUNCTION
    );

//Second Screen (Loading)-------------------------------------------------------
    $("#screentwo").mouseover(                                                  //When you click on the second screen (Loading)
      function() {                                                              //... (function)
        location.reload();                                                      //Reload the page
      }                                                                         //CLOSE OUT FUNCTION
    );

//Window Dimensions-------------------------------------------------------------
    $(window).resize(                                                           //When you resize the window
      function() {                                                              //... (function)
        GetWindowDims();                                                        //Function for grabbing and assigning window dimensions
      }                                                                         //Close out function
    );

//Debug Menu--------------------------------------------------------------------
    $("#debug").keyup(                                                          //When you type in the debug menu
      function(e) {                                                             //... (function)
        var debugString = $(this).val();                                        //Store typed text to debugString var
        if(e.keyCode == 13){                                                    //If you click enter
          eval(debugString);                                                    //Run the typed string as code
            clearSearch();                                                     //Clear all inputs
        }                                                                       //Close out if statement
      }                                                                         //CLOSE OUT FUNCTIOn
    );

//Right Button Hiding-----------------------------------------------------------
    $("#switchback").mouseenter(                                                //When your mouse goes over the switch back button on the right
      function() {                                                              //... (function)
        $(".rightbutton").fadeIn(500);                                          //Fade in the buttons on the right side
        $("#righttrig").show();                                                 //Fade in the border on the right side
      }                                                                         //CLOSE OUT FUNCTION
    );
    $(".rightbutton, #switchback").mouseover(                                   //When your mouse goes over a right side button
      function() {                                                              //... (function)
        rightMenu = true;                                                       //Set rightMenu to true
      }                                                                         //CLOSE OUT FUNCTION
    );
    $(".rightbutton, #switchback").mouseout(                                    //When your mouse goes out of a right side button
      function() {                                                              //... (function)
        rightMenu = false;                                                      //Set rightMenu to false
      }                                                                         //CLOSE OUT FUNCTION
    );
    $("#righttrig").mouseout(                                                   //When you leave the border
      function() {                                                              //... (function)
        setTimeout(                                                             //Set a timeout
          function() {                                                          //For the following function...
            if(rightMenu == false){                                             //If rightMenu is false
              $(".rightbutton").fadeOut(500);                                   //Fade out the buttons on the right side
              $("#righttrig").hide();                                           //Fade out the border on the right side
            }                                                                   //Close out if statement
          }, 500                                                                //Wait 250 milliseconds after leaving the border
        );
      }                                                                         //CLOSE OUT FUNCTION
    );

//Left Button Hiding------------------------------------------------------------
    $("#switchball").mouseenter(                                                //When your mouse goes over the switch ball button on the left
      function() {                                                              //... (function)
        $(".leftbutton").fadeIn(500);                                           //Fade in the buttons the left side
        $("#lefttrig").show();                                                  //Fade in the border on the left side
      }                                                                         //CLOSE OUT FUNCTION
    );
    $(".leftbutton, #switchball").mouseover(                                    //When your mouse goes over a left side button
      function() {                                                              //... (function)
        leftMenu = true;                                                        //Set leftMenu to true
      }                                                                         //CLOSE OUT FUNCTION
    );
    $(".leftbutton, #switchball").mouseout(                                     //When your mouse goes out of a left side button
      function() {                                                              //... (function)
        leftMenu = false;                                                       //Set leftMenu to false
      }                                                                         //CLOSE OUT FUNCTION
    );
    $("#lefttrig").mouseout(                                                    //When you leave the border
      function() {                                                              //... (function)
        setTimeout(                                                             //Set a timeout
          function() {                                                          //For the following function...
            if(leftMenu == false){                                              //If leftMenu is false
              $(".leftbutton").fadeOut(500);                                    //Fade out the buttons on the left sideee
              $("#lefttrig").hide();                                            //Fade out the border on the left side
            }                                                                   //Close out if statement
          }, 500                                                                //Wait 250 milliseconds after leaving the border
        );
      }                                                                         //CLOSE OUT FUNCTION
    );

//Hot Corners-------------------------------------------------------------------
    $(".corner").mouseover(                                                     //When you mouse over a hot corner...
      function() {                                                              //... (function)
        lastClosed();                                                           //Open the last closed website
      }                                                                         //CLOSE OUT FUNCTION
    );

//Notes-------------------------------------------------------------------------
    v = new Vue({
      el: '#app',
      data: {
        myList: myList,
      },
      methods: {
        removeItem: function (itm) {
          this.myList.splice(
            myList.indexOf(itm), // get index of current item
            1); // remove one
          saveArray(this.myList)// save the array
        }
      }
    });
    $("#notetaker").on('keypress',function(e) {
      if(e.which == 13) {
        var currentNote  = $("#notetaker").val();
          myList.push(currentNote);
          saveArray(myList);
          $("input").val('');
          $(".note").show().css("display","inline-block");
          setTimeout(function() {          $(".note").show().css("display","inline-block");
          },1);

      }
    });

//Prop Hunt Reload--------------------------------------------------------------
    $("#wrapper").click(                                                        //When you click outside during prop hunt
      function() {                                                              //... (function)
        if(propState == true){                                                  //If prop hunt is on
          location.reload();                                                    //Reload the page
        }                                                                       //Close out if statement
      }                                                                         //CLOSE OUT FUNCTION
    );

//Chrome Shortcuts -------------------------------------------------------------
    $('#shortcutsx').click(                                                     //When you click on the X
      function() {                                                              //... (function)
        closeHelp();                                                            //Close the help menu
      }                                                                         //CLOSE OUT FUNCTION
    );
    $('tr').mouseover(                                                          //When you have your mouse over a table row
      function() {                                                              //... (function)
        $(this).css("color","darkmagenta");                                     //Make the text purple
      }                                                                         //CLOSE OUT FUNCTION
    );
    $('tr').mouseout(                                                           //When you have your mouse leave a table row
      function() {                                                              //... (function)
        $(this).css("color","black");                                           //Make the text black
      }                                                                         //CLOSE OUT FUNCTION
    );
    $('.chromeShortcutDivs').click(                                             //When you click on a header in the chrome menu
      function() {                                                              //... (function)
        window.location='https://support.google.com/chrome/answer/157179?hl=en';//Go to the official website with chrome shortcuts
      }                                                                         //CLOSE OUT FUNCTION
    );

//Future Development -----------------------------------------------------------

  }                                                                             //Close out Main Function
);
