//Copyright AJ Simao 2019 Version 1.0

//Variables --------------------------------------------------------------------
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

//Functions --------------------------------------------------------------------
var ballup = function (){                                                       //Function for ballup (for click/hover)
  vy += 1.3;                                                                    //Increase Velocity
  ay = -.01;                                                                    //Reset Downward Acceleration
  $('#counter').fadeIn(500);                                                    //Counter fade in for cleanliness
  $('.rightbutton').fadeOut(500);                                               //Fade out the buttons on the right side
  $('.leftbutton').fadeOut(500);                                                //Fade in the buttons the left side
  $('input').blur();                                                            //Unfocus any search bar
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
  $('.menutable').children().fadeOut(150);                                      //Fade out the contents of a help menu
  setTimeout(                                                                   //Wait until the last step is complete
    function() {                                                                //... (function)
      $('.menutable').animate({                                                 //Animate the remaining part of the menu by...
        width: '0px'}, 350,                                                     //Shrinking the width to 0 in .35 seconds
          function() {                                                          //Once the animation is done... (function)
            $('#search').focus();                                               //Focus on the search
          }                                                                     //CLOSE OUT FUNCTION
      );
    }, 150                                                                      //Delay
  );
}                                                                               //CLOSE OUT FUNCTION
function closeQuick() {                                                         //Function for closing quick menu
  $('#quickMenu').fadeOut(250);                                                 //Hide the quick menu
  setTimeout(                                                                   //Wait until quick menu is gone
    function() {                                                                //... (function)
      blurOff();                                                                //Unblur the background
    }, 250                                                                      //Delay (500)
  );
}                                                                               //CLOSE OUT FUNCTION
function screenChange(s) {                                                      //Function for screen change, Input: screenChange('#screennumber');
  closePane();                                                                  //Cloes the panes (Covering screen)
  setTimeout(                                                                   //Wait until the panes are closed
    function() {                                                                //... (function)
        $('#game').nextAll().hide();                                            //Hide everything
        $(s).show();                                                            //Show whatever screen you called on
        openPane();                                                             //Open the panes (To show screen)
    }, 400                                                                      //Delay
  );
}                                                                               //CLOSE OUT FUNCTION
function GetWindowDims() {                                                      //Function for Reassigning window values
  w = window.innerWidth;                                                        //Width of current window
  h = window.innerHeight;                                                       //Height of current window
  console.log('Width is', w, 'Height is', h);                                   //Log the new height and width
}                                                                               //CLOSE OUT FUNCTION
function changeGradient() {                                                     //Function for changing to gradient mode
  if(gradState == false){                                                       //If gradient mode is off
    $('#circle').fadeOut(500);                                                  //Fade out the circle
    setTimeout(                                                                 //Wait 500 milliseconds
      function() {                                                              //... (function)
        if(ballMode % 2 == 0){                                                  //If the ball is blue
          $('#circle').addClass('gradientB');                                   //Add the blue gradient
        }                                                                       //Close out if statement
        else{                                                                   //If the ball is red (else)
          $('#circle').addClass('gradientR');                                   //Add the red gradient
        }                                                                       //Close out else statement
        $('#circle').fadeIn(500);                                               //Fade the circle back in
        gradState = true;                                                       //Turn gradient mode on (var)
      }, 500                                                                    //Delay
    );
  }                                                                             //Close out if statement
  else{                                                                         //If gradient mode is on
    $('#circle').fadeOut(500);                                                  //Fade out the circle
    setTimeout(                                                                 //Wait 500 milliseconds
      function() {                                                              //... (function)
        $('#circle').removeClass('gradientB gradientR');                        //Remove any gradients
        $('#circle').fadeIn(500);                                               //Fade the circle back in
        gradState = false;                                                      //Turn gradient mode off (var)
      }, 500                                                                    //Delay
    );
  }                                                                             //Close out else statement
}                                                                               //CLOSE OUT FUNCTION
function startTimer() {                                                         //Function for starting ball timer
  var seconds = 0;                                                              //Start a var for time
  $('#counter').fadeOut(500);                                                   //Hide the counter
  setTimeout(                                                                   //Wait 500 seconds (Until counters gone)
    function() {                                                                //... (function)
        $('#counter').remove();                                                 //Delete the counter completely
    }, 500                                                                      //Delay
  );
  $('#timer').delay(500).fadeIn(500);                                           //Fade in the timer
  setInterval(                                                                  //Run the following code repeatadly
    function() {                                                                //... (function)
      seconds ++;                                                               //Add a second
      if(y <= 0){                                                               //If the ball drops
        seconds = 0;                                                            //Restart the timer
      }                                                                         //Close out if statement
      $('#timer').html(seconds);                                                //Write the current time in the timer div
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
      $('#circle').html(highScore)                                              //Display the height on the ball
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
      if (lastClosedUrl.indexOf('chrome') == 0) {                               //If the last closed url is a local resource
        console.log('Cannot load local resources')                              //Console log error message
      }                                                                         //Close out if statement
      else{                                                                     //If the last closed url is a webpage (else)
        window.open(lastClosedUrl, '_blank');                                   //Open it in a new window
      }                                                                         //Close out else statement
    }, 100                                                                      //Delay
  );
}                                                                               //CLOSE OUT FUNCTION
function getArray() {                                                           //Function for grabbing notes array from local storage
  var savedArray = localStorage.getItem('myArray');                             //Make a temporary var and grab the array thats stringified
  if (savedArray) {                                                             //If it exists
    return JSON.parse(savedArray);                                              //Re-arrayify it
  }                                                                             //Close out if statement
  else {                                                                        //If it doesn't exist (else)
    return []                                                                   //Start an empty array
  }                                                                             //Close out else statement
}                                                                               //CLOSE OUT FUNCTION
function saveArray(arr) {                                                       //Save array arr to localStorage
  localStorage.setItem('myArray', JSON.stringify(arr))                          //Stringify and then save all notes
}                                                                               //CLOSE OUT FUNCTION
function freeze() {                                                             //Function for freezing browser
  while(1){}
}                                                                               //CLOSE OUT FUNCTION
function removeTabs() {                                                         //Function for removing tabs
  chrome.tabs.getCurrent(                                                       //Hey chrome get me a list of tabs
    function(ctab) {                                                            //When you got it...
      chrome.tabs.query(                                                        //Take a query of...
        {windowId:ctab.windowId},                                               //All tabs in the current window
        function (tabs){                                                        //When you got it...
          tabs.forEach(                                                         //For each tab...
            function(tab) {                                                     //Run a function
              if(ctab.index > tab.index){                                       //If the tab comes before the current one
                chrome.tabs.remove(tab.id);                                     //Remove it
              }
            }
          );
        }
      );
    }
  );
}                                                                               //CLOSE OUT FUNCTION
function removeTabIgnoreLast() {
  chrome.tabs.getCurrent(
    function(currentTab){
      chrome.tabs.move(currentTab.id, { 'index': currentTab.index - 1 });
    }
  );
  removeTabs();
}
function testTabs() {                                                           //Function for opening tabs for testing
  removeTabs();                                                                 //Close all previous tabs
  setTimeout(                                                                   //Wait half a second
    function() {                                                                //... (function)
      window.open('https://www.google.com/');                                   //Open a test tab
      window.open('https://www.amazon.com/');                                   //Open a test tab
      window.open('https://www.innovationcharter.org/');                        //Open a test tab
      window.open('https://repl.it/repls');                                     //Open a test tab
      window.open('https://github.com/');                                       //Open a test tab
      window.open('https://drive.google.com/drive/u/0/my-drive');               //Open a test tab
      chrome.tabs.create({});                                                   //Make a new tab
        chrome.tabs.getCurrent(                                                 //Hey chrome get me a list of tabs
          function (ctab){                                                      //When you got it...
            chrome.tabs.query(                                                  //Take a query of...
              {windowId:ctab.windowId},                                         //All tabs in the current window
              function (tabs){                                                  //When you got it...
                var firstItem = tabs[0];                                        //Make a temporary variable
                chrome.tabs.remove(firstItem.id);                               //Remove the first tab (The original one)
              }
            );
          }
        );
    }, 500                                                                      //Delay
  );
}                                                                               //CLOSE OUT FUNCTION
function blurOn() {                                                             //Function for blurring the screen
  $('#screenone').addClass('screenone--blur');                                  //Blur the background
  console.log('Blur turning on');                                               //Debugging
}                                                                               //CLOSE OUT FUNCTION
function blurOff() {                                                            //Function for unblurring the screen
  $('#screenone').removeClass('screenone--blur');                               //Unblur the background
  console.log('Blur turning off');                                              //Debugging
}                                                                               //CLOSE OUT FUNCTION
function openPane() {                                                           //Function for page load animation
  setTimeout(                                                                   //Wait half a second (for looks)
    function() {                                                                //... (function)
      $('#leftIntroPane').animate({                                             //Animate the left pane by...
         left: '-846px'                                                         //Move the pane out of sight
      }, { duration: 300, queue: false });                                      //Duration, and false queue (for flush animation)
      $('#rightIntroPane').animate({                                            //Animate the right pane by...
         right: '-846px'                                                        //Move the pane out of sight
      }, { duration: 300, queue: false });                                      //Duration, and false queue (for flush animation)
    }, 500                                                                      //Delay
  );
  setTimeout(                                                                   //Once those panes are out of sight
    function() {                                                                //... (function)
      $('.introPane').hide();                                                   //Hide the panes
    }, 800                                                                      //Delay
  );
}                                                                               //CLOSE OUT FUNCTION
function closePane() {                                                          //Function for page load animation
  $('.introPane').show();                                                       //Show the panes
    $('#leftIntroPane').animate({                                               //Animate the left pane by...
       left: '0px'                                                              //Moving the pane to half screen
    }, { duration: 300, queue: false });                                        //Duration, and false queue (for flush animation)
    $('#rightIntroPane').animate({                                              //Animate the right pane by...
       right: '0px'                                                             //Moving the pane to half screen
    }, { duration: 300, queue: false });                                        //Duration, and false queue (for flush animation)
}                                                                               //CLOSE OUT FUNCTION

//Notes pre-work ---------------------------------------------------------------
var myList = getArray()                                                         //Create a var for holding notes array
saveArray(myList);                                                              //Then save it for safekeeping

//JQuery -----------------------------------------------------------------------
$(document).ready(                                                              //Starts up JQuery
  function() {                                                                  //Main function
		$('.menutable').children().hide();                                          //Hide the contents of the menus
    if(localStorage.getItem(stringLights) == 'true'){                           //If String Lights are on
      $('#stringLights').show();                                                //Show the lights
      localStorage.setItem(stringLights, 'true');                               //Set the string lights state as on
    }                                                                           //Close out if statement
    else{                                                                       //If String Lights are off, null, or undefined
      localStorage.setItem(stringLights, 'false');                              //Set the string light state as off
    }                                                                           //Close out else statement
    openPane();
    setInterval(                                                                //Run the following function repeatadly (MAIN BALL CONTROL)
      function () {                                                             //... (Function)
        $('#circle').css({bottom:y});                                           //Change the bottom for Y pos
        y += vy;                                                                //Dynamics
        vy += ay;                                                               //Dynamics
        n = $('#circle').css('bottom');                                         //Assign pixel count from bottom to 'n'
        n = PXtoNumber (n);                                                     //Uses function (PXtoNumber)
        $('#counter').html(n);                                                  //Write the 'n' in the #counter div
        if (y <= 0) {                                                           //If it goes under or is at 0...
          vy = 0;                                                               //Make it still
          ay = 0;                                                               //Make it still
          y = 0;                                                                //Make it still
          seconds = 0;
        }                                                                       //Close out if statement
      },1                                                                       //Run this entire function every millisecond
    );

//Color Switches ---------------------------------------------------------------
    $('#switchball').click(                                                     //When you click on ball switch
      function() {                                                              //... (function)
        ballMode = ballMode + 1;                                                //Change ballMode EVEN IS BLUE / ODD IS RED
        if(ballMode % 2 == 0 && gradState == false){                            //If ballMode is even
          $('#circle').animate({backgroundColor:'#22bee0'});                    //Make ball blue
          $(this).animate({backgroundColor:'#22bee0'});                         //Make ball switch blue
        }                                                                       //Close out if statement
        if(ballMode % 2 == 0 && gradState == true){                             //If ballMode is even and gradient is on
          $('#circle').fadeOut(500);                                            //Hide the circle
          setTimeout(                                                           //Wait 500 milliseconds
            function() {                                                        //... (function)
              $('#circle').removeClass('gradientR');                            //Take off red gradient
              $('#circle').addClass('gradientB')                                //Put on blue gradient
              $('#circle').fadeIn(500);                                         //Bring circle back
              $('#switchball').animate({backgroundColor:'#22bee0'});            //Make ball switch blue
            }, 500);                                                            //Delay
        }                                                                       //Close out if statement
        if(ballMode % 2 == 1 && gradState == false){                            //If ballMode is odd
          $('#circle').animate({backgroundColor:'#e04422'});                    //Make ball red
          $(this).animate({backgroundColor:'#e04422'});                         //Make ball switch red
        }                                                                       //Close out if statement
        if(ballMode % 2 == 1 && gradState == true){                             //If ballmode is odd and gradient is on
          $('#circle').fadeOut(500);                                            //Hide the circle
          setTimeout(                                                           //Wait 500 milliseconds
            function() {                                                        //... (function)
              $('#circle').removeClass('gradientB');                            //Take off Blue gradient
              $('#circle').addClass('gradientR')                                //Put on red gradient
              $('#circle').fadeIn(500);                                         //Bring circle back
              $('#switchball').animate({backgroundColor:'#e04422'});            //Make ball switch blue
            }, 500);                                                            //Delay
        }                                                                       //Close out if statement
      }                                                                         //CLOSE OUT FUNCTION
    );
    $('#switchback').click(                                                     //When you click on back switch
      function() {                                                              //... (function)
        backMode = backMode + 1;                                                //Change backMode
        if(backMode % 2 == 0){                                                  //If backMode is even
          $('body,#wrapper').animate({backgroundColor:'#fffaf4'});              //Brighten background
          $(this).animate({backgroundColor:'#333333'});                         //Darken button
          $('#counter').animate({color:'#333333'});                             //Darken counter
          $('.corner').animate({borderColor:'#333333'});                        //Darken corner
        }                                                                       //Close out if statement
        else{                                                                   //If backMode is odd (else)
          $('body,#wrapper').animate({backgroundColor:'#333333'});              //Darken background
          $(this).animate({backgroundColor:'#fffaf4'});                         //Brighten button
          $('#counter').animate({color:'#fffaf4'});                             //Darken counter
          $('.corner').animate({borderColor:'#fffaf4'});                        //Darken corner
        }                                                                       //Close out else statement
      }                                                                         //CLOSE OUT FUNCTION
    );
    $('.switch').mouseover(                                                     //When you hover over a switch icon
      function() {                                                              //... (function)
        $(this).animate({                                                       //Animate it to...
          bottom: '15px'                                                        //Go up 5 px
        },150);                                                                 //In 150 milliseconds
      }                                                                         //CLOSE OUT FUNCTION
    ).mouseleave(                                                               //When you take your mouse out
      function() {                                                              //... (function)
        $(this).animate({                                                       //Animate it to...
          bottom: '10px'                                                        //Go back down 5 px
        },150);                                                                 //In 150 milliseconds
      }                                                                         //CLOSE OUT FUNCTION
    );
    $('#circle').click(                                                         //When you click on the circle
      function() {                                                              //... (function)
        changeGradient();                                                       //Click uses function (changeGradient)
      }                                                                         //CLOSE OUT FUNCTION
    );
    $('#counter').click(                                                        //When you click on the height counter
      function() {                                                              //...(function)
        startTimer();                                                           //Start the timer
      }                                                                         //CLOSE OUT FUNCITON
    );

//Ballup Function Activations --------------------------------------------------
    $('#wrapper').click(                                                        //When you click on the wrapper
      ballup                                                                    //Click uses function (ballup)
    );
    $('body').keyup(                                                            //When you type in search bar
      ballup2                                                                   //Keyup uses function (ballup2)
    );
    $('#circle').mouseover(                                                     //When you hover over circle
      ballup                                                                    //Mouseover uses function (ballup)
    );

//SECRET CODE SETUP ------------------------------------------------------------
    function secretCode() {                                                     //Check for secret codes
      typedString = $('#search').val();
      //Code: ??        Event: Open help pop up           Not included in itself
      if (typedString == '??') {
        $('#help').animate({
          width: '90%'},350);
          setTimeout(
          	function() {
          		$('#help').children().fadeIn(150);
          	}, 350
          );
        setTimeout(clearSearch, 150);
      }
      //Code: disco     Event: Start disco effect on ball                   Chec
      if (typedString == 'disco') {
        $('#circle').fadeOut(500);
        setTimeout(
          function() {
            $('#circle').removeClass('gradientB gradientR');
            $('#circle').fadeIn(500);
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
      if (typedString == 'fulldisco') {
        $('#circle').fadeOut(500);
        setTimeout(
          function() {
            $('#circle').removeClass('gradientB gradientR');
            $('#circle').fadeIn(500);
          }, 500
        );
        $('input, #switchball, #switchback, .corner, #stringLights').fadeOut(500);
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
      if (typedString == 'pong') {
        window.location = 'http://stewd.io/pong/';
      }
      //Code: opentab   Event: Open tabs for testing                        Chec
      if (typedString == 'opentab') {
        testTabs();
        clearSearch();
      }
      //Code: byesearch Event: Remove search bar                            Chec
      if (typedString == 'byesearch') {
        $('Input').fadeOut(500);
      }
      //Code load      Event: Show loading screen                          Chec
      if (typedString == 'load') {
        screenChange('#screentwo');
        currentScreen = 2;
      }
      //Code: whatkey   Event: Open Key checker                             Chec
      if (typedString == 'whatkey') {
        window.location = 'https://keycode.info/';
      }
      //Code: debug     Event: Open Debug menu                              Chec
      if (typedString == 'debug') {
        $('#debug').css({display: 'block'});
        $('#search').animate(
          {width: '0px',border: '0px',padding: '0px', 'box-shadow': '0px 0px 0px 0px rgba(0, 0, 0, 0.54)'},350,
          function() {
            $('#search').css({'box-shadow': 'none'});
            $('#debug').css({'box-shadow': '1px 14px 65px 8px rgba(0, 0, 0, 0.54)', border: '1px solid #474747'});
          }
        );
        $('#counter, #timer').fadeOut(250);
        setTimeout(function() {
          $('#counter, #timer').remove();
          $('#debug').animate(
            {width: '37.5%','padding-left': '40px'}, 350,
              function() {
                $('#debug').focus();
              }
          );
        }, 250);
      }
      //Code: timer     Event: Start the timer                              Chec
      if (typedString == 'timer') {
        startTimer();
        clearSearch();
      }
      //Code: gradee    Event: Open schedule                                Chec
      if (typedString == 'class') {
        $('#schedule').fadeIn(500);
        clearSearch();
      }
      //Code: shownote  Event: Show all currently stored notes              Chec
      if (typedString == 'shownote') {
        $('.note').fadeIn(500).css('display', 'inline-block');
        clearSearch();
      }
      //Code: note      Event: Add a new note                               Chec
      if (typedString == 'note') {
        $('#search').fadeOut(250);
        $('#counter, #timer').fadeOut(250);
        setTimeout(function() {
          $('#counter, #timer').remove();
        }, 500);
        $('#notetaker').delay(250).fadeIn(250);
        setTimeout(
          function() {
            $('#notetaker').focus();
          }, 500
        );
      }
      //Code: prop      Event: Open prop hunt game                          Chec
      if (typedString == 'prop') {
        $('#game').html("<iframe src='https://game216148.konggames.com/gamez/0021/6148/live/game.html' id='propGame' allowfullscreen='true' webkitallowfullscreen='true' mozallowfullscreen='true' msallowfullscreen='true' marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no' width='100%' height='100%'></iframe>");
        propState = true;
        setTimeout(
          function() {
            $('#propGame').fadeIn(500);
            clearSearch();
          }, 200
        );
      }
      //Code: mosh      Event: Open Javascript tutorial                     Chec
      if (typedString == 'mosh') {
        window.location = 'https://codewithmosh.com/courses/enrolled/324741'
      }
      //Code: shortket  Event: Open new tab shortcuts                       Chec
      if (typedString == 'shortkey') {
        $('#chromeshortcuts').animate({
          width: '90%'},350);
        setTimeout(
        	function() {
        		$('#chromeshortcuts').children().fadeIn(150);
        	}, 350
        );
        setTimeout(clearSearch, 150);
      }
      //Code: byescore  Event: Reset the ball scores                        Chec
      if (typedString == 'byescore') {
        resetScore();
        clearSearch();
      }
      //Code: lightshow Event: Show string lights                           Chec
      if (typedString == 'lightshow') {
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
      if (typedString == 'frz') {
        if(window.confirm('Freeze?') == true){
          freeze();
        }
        else{
          console.log('Not frozen');
        }
      }
      //Code: tab       Event: Close all prev tabs                          Chec
      if (typedString == 'tab') {
        removeTabs();
        closePane();
        setTimeout(
          function() {
            location.reload();
          }, 750
        );
      }
      //Code: ltab      Event: Close all prev tab but last                  Chec
      if (typedString == 'ltab') {
        removeTabIgnoreLast();
      }
      //Code: recent    Event: See last 9 closed tabs                       Chec
      if(typedString == 'recent') {
        $('#recentlyClosedMenu').animate({
          width: '90%'},350);
        setTimeout(
        	function() {
        		$('#recentlyClosedMenu').children().fadeIn(150);
        	}, 350
        );
        clearSearch();
      }
      //Code: >         Event: Open quick menu                              Chec
      if(typedString == '>') {
        blurOn();                                                               //Blur the background
        setTimeout(                                                             //Wait until background is blurred
          function() {                                                          //... (function)
            $('#quickMenu').fadeIn(250);                                        //Show the quick menu
          }, 250                                                                //Delay (500)
        );
        clearSearch();
      }
      //Code: pkg       Event: Open package tracker
      if(typedString == 'pkg') {
        $('#pkg').css({display: 'block'});
        $('#search').animate(
          {width: '0px',border: '0px',padding: '0px', 'box-shadow': '0px 0px 0px 0px rgba(0, 0, 0, 0.54)'},350,
          function() {
            $('#search').css({'box-shadow': 'none'});
            $('#pkg').css({'box-shadow': '1px 14px 65px 8px rgba(0, 0, 0, 0.54)', border: '1px solid #474747'});
          }
        );
        $('#counter, #timer').fadeOut(250);
        setTimeout(function() {
          $('#counter, #timer').remove();
          $('#pkg').animate(
            {width: '37.5%','padding-left': '40px'}, 350,
              function() {
                $('#pkg').focus();
              }
          );
        }, 250);
      }
    }

//Secret Code running ----------------------------------------------------------
    $('#search').keyup(                                                         //When you type in the search bar
      function() {                                                              //... (function)
          secretCode();                                                         //Check for any codewords
      }                                                                         //CLOSE OUT FUNCTION
    );

//Schedule ---------------------------------------------------------------------
    $('#schedule').click(                                                       //When you click on the schedule
      function() {                                                              //... (function)
        $(this).fadeOut(500);                                                   //Fade out the schedule
      }                                                                         //CLOSE OUT FUNCTION
    );

//Help Menu --------------------------------------------------------------------
    $('.xbuttons').click(                                                       //When you click on the X button on the help menu
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

//Keyboard Shortcuts -----------------------------------------------------------
    $(document).keyup(                                                          //When any key goes up
      function(e) {                                                             //... (function)
        if (e.key === 'Escape') {                                               //If the key you pressed is escape...
          closeHelp();                                                          //Fade out the help menu
          closeQuick();                                                         //Close quick menu
        }                                                                       //Close out if statement                                                                     //Close out if statement
      }                                                                         //CLOSE OUT FUNCTION
    );

//Second Screen (Loading) ------------------------------------------------------
    $('#screentwo').mouseover(                                                  //When you click on the second screen (Loading)
      function() {                                                              //... (function)
        location.reload();                                                      //Reload the page
      }                                                                         //CLOSE OUT FUNCTION
    );

//Window Dimensions ------------------------------------------------------------
    $(window).resize(                                                           //When you resize the window
      function() {                                                              //... (function)
        GetWindowDims();                                                        //Function for grabbing and assigning window dimensions
      }                                                                         //Close out function
    );

//Debug Menu -------------------------------------------------------------------
    $('#debug').keyup(                                                          //When you type in the debug menu
      function(e) {                                                             //... (function)
        var debugString = $(this).val();                                        //Store typed text to debugString var
        if(e.keyCode == 13){                                                    //If you click enter
          eval(debugString);                                                    //Run the typed string as code
            clearSearch();                                                      //Clear all inputs
        }                                                                       //Close out if statement
      }                                                                         //CLOSE OUT FUNCTIOn
    );

//Hot Corners ------------------------------------------------------------------
    $('.corner').mouseover(                                                     //When you mouse over a hot corner...
      function() {                                                              //... (function)
        lastClosed();                                                           //Open the last closed website
      }                                                                         //CLOSE OUT FUNCTION
    );

//Notes ------------------------------------------------------------------------
    new Vue({                                                                   //Run a Vue app for notes
      el: '#notesApp',                                                          //Run the app on the correct id
      data: {                                                                   //The following are the app Variables (Data)
        myList: myList,                                                         //My notes (retrieved from the local storage vault)
      },                                                                        //Close out Data
      methods: {                                                                //The following are the functions that can be run (Methods)
        removeItem: function (itm) {                                            //When you click on a note in the app
          this.myList.splice(                                                   //Grab the current array
            myList.indexOf(itm),                                                //Get index of clicked item
            1);                                                                 //Remove it
          saveArray(this.myList)                                                //Save the array
        }                                                                       //Close out method
      }                                                                         //Close out methods
    });                                                                         //Close out Vue
    $('#notetaker').on('keypress',function(e) {                                 //When you type in the note taker input bar
      if(e.which == 13) {                                                       //If you clicked enter...
        var currentNote  = $('#notetaker').val();                               //Make a temporary variable that holds what you typed
        myList.push(currentNote);                                               //Throw it on to your array of notes
        saveArray(myList);                                                      //Save your notes list to local storage
        $('input').val('');                                                     //Empty out the note taker input bar (to prep next note)
        setTimeout(                                                             //Wait one millisecond, then
          function() {                                                          //... (function)
            $('.note').show().css('display','inline-block');                    //Refresh the shown notes
          },1                                                                   //Delay
        );
      }                                                                         //Close out if statement
    });                                                                         //CLOSE OUT FUNCTION

//Prop Hunt Reload -------------------------------------------------------------
    $('#wrapper').click(                                                        //When you click outside during prop hunt
      function() {                                                              //... (function)
        if(propState == true){                                                  //If prop hunt is on
          location.reload();                                                    //Reload the page
        }                                                                       //Close out if statement
      }                                                                         //CLOSE OUT FUNCTION
    );

//Chrome Shortcuts -------------------------------------------------------------
    $('tr').mouseover(                                                          //When you have your mouse over a table row
      function() {                                                              //... (function)
        $(this).css('color','#e72763');                                         //Make the text purple
      }                                                                         //CLOSE OUT FUNCTION
    );
    $('tr').mouseout(                                                           //When you have your mouse leave a table row
      function() {                                                              //... (function)
        $(this).css('color','black');                                           //Make the text black
      }                                                                         //CLOSE OUT FUNCTION
    );
    $('.chromeShortcutDivs').click(                                             //When you click on a header in the chrome menu
      function() {                                                              //... (function)
        window.location='https://support.google.com/chrome/answer/157179?hl=en';//Go to the official website with chrome shortcuts
      }                                                                         //CLOSE OUT FUNCTION
    );

//Recent Menu ------------------------------------------------------------------
    new Vue({                                                                   //Run a Vue app that displays these websites
      el: '#recentlyClosedMenu',                                                //Run the app on the correct id
      data: {                                                                   //The following are the app Variables (Data)
        gotLast9:[]                                                             //Initialize a empty array for the websites
      },                                                                        //Close out Data
      methods: {                                                                //The following are the functions that can be run (Methods)
        closeHelp: function() {                                                 //When you call on closeHelp in Vue
          $('.menutable').fadeOut(500);                                         //Fade out the help menu
        },                                                                      //Close out method
        openSite: function(url) {                                               //When you call on openSite & pass through a url
          window.location = url;                                                //Open that url
        },                                                                      //Close out method
      },                                                                        //Close out Methods
      created: function() {                                                     //The following function will be run when the Vue is successfully built
        chrome.sessions.getRecentlyClosed({}, (results)=>{                      //Hey chrome get my 25 last closed tabs
          results = results.filter(                                             //Filter out...
            (r)=>r.tab && r.tab.title != 'New Tab'                              //Anything matching new tab
          );
          var gotLast9 = results.map((r) => {                                   //Create a array that...
            return{TITLE: r.tab.title, URL: r.tab.url}                          //Contains only the title and url of each object
          });                                                                   //Close out array creation
          if (gotLast9.length > 9){                                             //If the list is over 9 (it always is)
            gotLast9 = gotLast9.slice(0, 9);                                    //Cut it down to only 9 websites
          }                                                                     //Close out if statement
          this.gotLast9 = gotLast9;                                             //Submit final array to Vue
        });                                                                     //Close out Chrome arrow function
      }                                                                         //CLOSE OUT FUNCTION
    });                                                                         //Close out Vue

//Quick Menu  ------------------------------------------------------------------
    $('#search').dblclick(                                                      //When you double click on the search bar
      function() {                                                              //... (function)
        blurOn();                                                               //Blur the background
        setTimeout(                                                             //Wait until background is blurred
          function() {                                                          //... (function)
            $('#quickMenu').fadeIn(250);                                        //Show the quick menu
          }, 250                                                                //Delay (500)
        );
      }                                                                         //CLOSE OUT FUNCTION
    );
    $('#quickMenuCloser').click(                                                //When you click outside of the quick menu
      function() {                                                              //... (function)
        $('input').focus();                                                     //Focus on the search bar
        closeQuick();                                                           //Close the quick menu
      }                                                                         //CLOSE OUT FUNCTION
    );
    $('#quickIcon1').click(                                                     //Quick icon link
      function() {
        window.location = 'https://amazon.com/'
      }
    );
    $('#quickIcon2').click(                                                     //Quick icon link
      function() {
        window.location = 'https://www.santanderbank.com/us/personal'
      }
    );
    $('#quickIcon3').click(                                                     //Quick icon link
      function() {
        window.location = 'https://ma-innovation.myfollett.com/aspen/logon.do'
      }
    );
    $('#quickIcon4').click(                                                     //Quick icon link
      function() {
        window.location = 'https://repl.it/repls'
      }
    );
    $('#quickIcon5').click(                                                     //Quick icon link
      function() {
        window.location = 'https://github.com/'
      }
    );
    $('#quickIcon6').click(                                                     //Quick icon link
      function() {
        window.location = 'https://mail.google.com/mail/u/0/'
      }
    );
    $('#quickIcon7').click(                                                     //Quick icon link
      function() {
        window.location = 'https://www.youtube.com/'
      }
    );
    $('#quickIcon8').click(                                                     //Quick icon link
      function() {
        window.location = 'https://drive.google.com/drive/u/0/my-drive'
      }
    );
    $('#quickIcon9').click(                                                     //Quick icon link
      function() {
        window.location = 'https://www.netflix.com/browse'
      }
    );
  }                                                                             //Close out Main Function
);
