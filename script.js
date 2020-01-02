////Copyright AJ Simao 2019

//Variables --------------------------------------------------------------------
//Ball Control
var y = 0;                                                                      //Y Position (Of boredom ball)
var vy = 2;                                                                     //Velocity
var ay = -.01;                                                                  //Downward Acceleration

//Modes
var ballMode;                                                                   //Ball mode to hold what color the ball is
var backMode = 1;                                                               //Back mode (Gray Cream)
var currentScreen = 1;                                                          //What screen your on

//Numbers to hold
var n;                                                                          //PX to number
var w = window.innerWidth;                                                      //Width of current window
var h = window.innerHeight;                                                     //Height of current window

//Misc.
var typedString;                                                                //String to hold search bar contents
var highScore;                                                                  //Var to hold current high score
var propState = false;                                                          //Prop game is not on
var searchFocus = false;                                                        //Search bar is unfocused

//Functions --------------------------------------------------------------------
var ballup = function (){                                                       //Function for ballup (for click/hover)
  vy += 2;                                                                    //Increase Velocity
  ay = -.01;                                                                    //Reset Downward Acceleration
  $('#counter').fadeIn(500);                                                    //Counter fade in for cleanliness
  $('.rightbutton').fadeOut(500);                                               //Fade out the buttons on the right side
  $('.leftbutton').fadeOut(500);                                                //Fade in the buttons the left side
  $('input').blur();                                                            //Unfocus any search bar
}                                                                               //Close out function
var ballup2 = function (){                                                      //Function for ballup 2 (for typing)
  vy += .4;                                                                     //Increase velocity
  ay = -.01;                                                                    //Reset Downward Acceleration
}                                                                               //Close out function
function PXtoNumber (s) {                                                       //Function for px to number conversion
  n = Number(s.substr(0,s.length-2))                                            //Actual math
  return n.toFixed(0);                                                          //Return and rounding
}                                                                               //Close out function
function clearSearch() {                                                        //Function for clearing search bar
  $('input').val('').blur();                                                    //Clear search bar and then unfocuses search bar
}                                                                               //Close out function
function closeHelp() {                                                          //Function for closing help menu
  $('.menutable').children().fadeOut(150);                                      //Fade out the contents of a help menu
  setTimeout(                                                                   //Wait until the last step is complete
    function() {                                                                //... (function)
      $('.menutable').animate({                                                 //Animate the remaining part of the menu by...
        width: '0px'}, 350,                                                     //Shrinking the width to 0 in .35 seconds
          function() {                                                          //Once the animation is done... (function)
            $('#search').focus();                                               //Focus on the search
          }                                                                     //Close out function
      );
    }, 150                                                                      //Delay
  );
}                                                                               //Close out function                                                                               //Close out function
function screenChange(s) {//Input: screenChange('#screennumber');               //Function for screen change
  closePane();                                                                  //Cloes the panes (Covering screen)
  setTimeout(                                                                   //Wait until the panes are closed
    function() {                                                                //... (function)
        $('#game').nextAll().hide();                                            //Hide everything
        $(s).show();                                                            //Show whatever screen you called on
        openPane();                                                             //Open the panes (To show screen)
    }, 400                                                                      //Delay
  );
}                                                                               //Close out function
function GetWindowDims() {                                                      //Function for Reassigning window values
  w = window.innerWidth;                                                        //Width of current window
  h = window.innerHeight;                                                       //Height of current window
  console.log('Width is', w, 'Height is', h);                                   //Log the new height and width
}                                                                               //Close out function
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
      highScore = localStorage.getItem('highScore');                            //Get the locally stored high score & save it
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
}                                                                               //Close out function
function resetScore() {                                                         //Function for resetting highscores
  seconds = 0;                                                                  //Reset the current time (probaby unneccessary)
  highScore = 0;                                                                //Resets the high score current val
  localStorage.highScore = 0;                                                   //Resets the saved high score
}                                                                               //Close out function
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
}                                                                               //Close out function
function getArray() {                                                           //Function for grabbing notes array from local storage
  var savedArray = localStorage.getItem('myArray');                             //Make a temporary var and grab the array thats stringified
  if (savedArray) {                                                             //If it exists
    return JSON.parse(savedArray);                                              //Re-arrayify it
  }                                                                             //Close out if statement
  else {                                                                        //If it doesn't exist (else)
    return []                                                                   //Start an empty array
  }                                                                             //Close out else statement
}                                                                               //Close out function
function saveArray(arr) {                                                       //Save array arr to localStorage
  localStorage.setItem('myArray', JSON.stringify(arr));                         //Stringify and then save all notes
}                                                                               //Close out function
function freeze() {                                                             //Function for freezing browser
  while(1){}                                                                    //Freeze it!
}                                                                               //Close out function
function removeTabs() {                                                         //Function for removing tabs
  chrome.tabs.getCurrent(                                                       //Hey chrome get me a list of tabs
    function(ctab) {                                                            //When you got it...
      chrome.tabs.query(                                                        //Take a query of...
        {windowId:ctab.windowId},                                               //All tabs in the current window
        function (tabs){                                                        //When you got it...
          tabs.forEach(                                                         //For each tab...
            function(tab) {                                                     //Run a function
              if(ctab.index > tab.index){                                       //If the tab comes before the current one
                setTimeout(                                                     //Wait 100 milliseconds
                  function() {                                                  //... (function)
                    chrome.tabs.remove(tab.id);                                 //Remove it
                  }, 300                                                        //Delay
                );
              }                                                                 //Close out if statement
            }                                                                   //C.O.F.
          );
        }                                                                       //C.O.F.
      );
    }                                                                           //C.O.F.
  );
}                                                                               //Close out function
function removeTabsIgnoreLast() {                                               //Function for removing all tabs except last one
  clearSearch();                                                                //Clear the search bar
  closePane();                                                                  //Close the pane
  setTimeout(                                                                   //Wait 500 milliseconds
    function() {                                                                //... (function)
      chrome.tabs.getCurrent(                                                   //Hey Chrome get the current tabs info
        function(currentTab){                                                   //With that information
          chrome.tabs.move(currentTab.id, { 'index': currentTab.index - 1 });   //Move it back one
        }
      );
      setTimeout(                                                               //Wait another 500 milliseconds
        function() {                                                            //... (function)
          removeTabs();                                                         //Remove all the tabs
          setTimeout(                                                           //Wait another 500 milliseconds
            function() {                                                        //... (function)
              vy += 2;                                                          //Ballup
              ay = -.01;                                                        //Ballup
              openPane();                                                       //Open the panes
              setTimeout(                                                       //Wait until the panes are open
                function() {                                                    //... (function)
                  chrome.tabs.getCurrent(                                       //Hey Chrome get the current tabs info
                    function(currentTab){                                       //With that information
                      chrome.tabs.move(currentTab.id, { 'index': currentTab.index + 1 });  //Move the tab up one
                    }
                  );
                  setTimeout(                                                   //Wait 250 milliseconds
                    function() {                                                //... (function)
                      chrome.tabs.getCurrent(                                   //Hey chrome get me a list of tabs
                        function(ctab) {                                        //When you got it...
                          chrome.tabs.query(                                    //Take a query of...
                            {windowId:ctab.windowId},                           //All tabs in the current window
                            function (tabs){                                    //When you got it...
                              var updateProperties = { 'active': true };        //Prepare the active update
                              chrome.tabs.update(tabs[0].id, updateProperties, (tab) => { });  //Update the special tab to focus it
                            }
                          );
                        }
                      );
                    }, 250                                                      //C.O.F. & Delay
                  );
                }, 800                                                          //C.O.F. & Delay
              );
            }, 500                                                              //C.O.F. & Delay
          );
        }, 500                                                                  //C.O.F. & Delay
      );
    }, 500                                                                      //C.O.F. & Delay
  );
}                                                                               //Close out function
function testTabs() {                                                           //Function for opening tabs for testing
  removeTabs();                                                                 //Close all previous tabs
  setTimeout(                                                                   //Wait half a second
    function() {                                                                //... (function)
      window.open('https:www.google.com/');                                 //Open a test tab
      window.open('https:www.amazon.com/');                                 //Open a test tab
      window.open('https:www.innovationcharter.org/');                      //Open a test tab
      window.open('https:repl.it/repls');                                   //Open a test tab
      window.open('https:github.com/');                                     //Open a test tab
      window.open('https:drive.google.com/drive/u/0/my-drive');             //Open a test tab
      chrome.tabs.create({});                                                   //Make a new tab
      chrome.tabs.getCurrent(                                                   //Hey chrome get me a list of tabs
        function (ctab){                                                        //When you got it...
          chrome.tabs.query(                                                    //Take a query of...
            {windowId:ctab.windowId},                                           //All tabs in the current window
            function (tabs){                                                    //When you got it...
              var firstItem = tabs[0];                                          //Make a temporary variable
              chrome.tabs.remove(firstItem.id);                                 //Remove the first tab (The original one)
            }                                                                   //C.O.F.
          );
        }                                                                       //C.O.F.
      );
    }, 500                                                                      //Delay
  );
}                                                                               //Close out function
function blurOn() {                                                             //Function for blurring the screen
  $('#screenone').addClass('screenone--blur');                                  //Blur the background
  console.log('Blur turning on');                                               //Debugging
}                                                                               //Close out function
function blurOff() {                                                            //Function for unblurring the screen
  $('#screenone').removeClass('screenone--blur');                               //Unblur the background
  console.log('Blur turning off');                                              //Debugging
}                                                                               //Close out function
function openPane() {                                                           //Function for opening the panes
  $('#leftIntroPane').animate({                                                 //Animate the left pane by...
     height: '100vh'                                                            //Increasing the height
  }, { duration: 200, queue: false });                                          //Duration, and false queue (for flush animation)
  $('#rightIntroPane').animate({                                                //Animate the right pane by...
     height: '100vh'                                                            //Increasing the height
  }, { duration: 200, queue: false });                                          //Duration, and false queue (for flush animation)
  setTimeout(                                                                   //Wait 200 milliseconds
    function() {                                                                //... (function)
      $('#backupPane').hide();                                                  //Hide the backup pane
    }, 200                                                                      //Delay
  );
  setTimeout(                                                                   //Wait half a second (for looks)
    function() {                                                                //... (function)
      $('#leftIntroPane').animate({                                             //Animate the left pane by...
         left: '-846px'                                                         //Move the pane out of sight
      }, { duration: 300, queue: false });                                      //Duration, and false queue (for flush animation)
      $('#rightIntroPane').animate({                                            //Animate the right pane by...
         right: '-846px'                                                        //Move the pane out of sight
      }, { duration: 300, queue: false });                                      //Duration, and false queue (for flush animation)
    }, 400                                                                      //Delay
  );
  setTimeout(                                                                   //Once those panes are out of sight
    function() {                                                                //... (function)
      $('.introPane').hide();                                                   //Hide the panes
    }, 800                                                                      //Delay
  );
}                                                                               //Close out function
function closePane() {                                                          //Function for page load animation
  $('.introPane').show();                                                       //Show the panes
    $('#leftIntroPane').animate({                                               //Animate the left pane by...
       left: '0px'                                                              //Moving the pane to half screen
    }, { duration: 300, queue: false });                                        //Duration, and false queue (for flush animation)
    $('#rightIntroPane').animate({                                              //Animate the right pane by...
       right: '0px'                                                             //Moving the pane to half screen
    }, { duration: 300, queue: false });                                        //Duration, and false queue (for flush animation)
    setTimeout(                                                                 //Wait 100 milliseconds after the panes are closed
      function() {                                                              //... (function)
        $('#backupPane').show();                                                //Show the backup pane
        $('#leftIntroPane').animate({                                           //Animate the left pane by...
           height: '0px'                                                        //Decreasing the height
        }, { duration: 200, queue: false });                                    //Duration, and false queue (for flush animation)
        $('#rightIntroPane').animate({                                          //Animate the right pane by...
           height: '0px'                                                        //Decreasing the height
        }, { duration: 200, queue: false });                                    //Duration, and false queue (for flush animation)
      }, 400                                                                    //Delay
    );
}                                                                               //Close out function
function currentTime() {                                                        //Function for grabbing and writing the time
  var today = new Date();                                                       //Create a new day
  var hour = today.getHours();                                                  //Get the current hour
  if(hour>12){                                                                  //If it is greater then 12
    hour-=12;                                                                   //Subtract twelve
  }                                                                             //Close out if statement
  var minute = today.getMinutes();                                              //Get the current minute
  hour = toWords(hour);                                                         //Translate hour # to string
  minute = toWords(minute);                                                     //Translate minute # to string
  if (['one','two','three','four','five','six','seven','eight','nine'].indexOf(minute) > -1){  //If the minute is a single digit
    minute = "O\' " + minute;                                                   //Add the O in front of it
  }                                                                             //Close out if statement
  if (minute == 'zero'){                                                        //If the time is on the hour (no minutes)
    minute = "O\'Clock";                                                        //Make it say 'OClock'
  }                                                                             //Close out if statement
  if (hour == 'zero'){                                                          //If the time is 12 AM (first hour of a new day)
    hour = 'twelve'                                                             //Change the hour to 'twelve', as it was previously 'zero'
  }                                                                             //Close out if statement
  $('#wrapper').html(hour + ' ' + minute);                                      //Write the time
}                                                                               //CLOSE OUT FUNCITON
function changeBall(colorToChange, addedClass, buttonColorCode, speed){         //Function for changing the ball color
  if(speed == 'fast'){                                                          //If it was listed as fast
    speed = 1;                                                                  //Change the speed var to 1 millisecond
  }                                                                             //Close out if statement
  else{                                                                         //If it was listed as 'normal', or wasn't listed at all
    speed = 500;                                                                //Change the speed to 500 milliseconds (default time)
  }                                                                             //Close out else statement
  $("#circle").fadeOut(speed);                                                  //Hide the ball at the speed listed
  ballMode = colorToChange;                                                     //Change ballMode to the color you want it to be
  setTimeout(                                                                   //Wait the speed listed
    function() {                                                                //... (function)
      $('#circle').removeClass().addClass(addedClass);                          //Take off any gradient that may be on then apply the new one
      $('#switchball').animate({backgroundColor:buttonColorCode});              //Animate the button to whatever colorcode listed
      $('#circle').fadeIn(speed);                                               //Fade the ball back in at whatever speed listed
    }, speed                                                                    //Delay with 'speed' variable
  );
  localStorage.setItem('ballColor', colorToChange);                             //Locally store the new color of the ball
}                                                                               //Close out function

//Notes pre-work ---------------------------------------------------------------
var myList = getArray()                                                         //Create a var for holding notes array
saveArray(myList);                                                              //Then save it for safekeeping

//JQuery -----------------------------------------------------------------------
setTimeout(                                                                     //Wait half a second (to avoid lag)
  function() {                                                                  //... (function)
    $(document).ready(                                                          //Starts up JQuery
      function() {                                                              //Main function
        $('.menutable').children().hide();                                      //Hide the contents of the menus
        ballMode = localStorage.getItem('ballColor');                           //Grab the last logged ball color
        switch(ballMode){                                                       //With that last logged ball color
          case "red":                                                           //Check if it was red
            changeBall('red','gradientR','#e04422', 'fast');                    //Restore the color
          break;                                                                //Break out of the switch
          case "green":                                                         //Check if it was green
            changeBall('green','gradientG','#81c000', 'fast');                  //Restore the color
          break;                                                                //Break out of the switch
          case "blue":                                                          //Check if it was blue
            changeBall('blue','gradientB','#22bee0', 'fast');                   //Restore the color
          break;                                                                //Break out of the switch
          case"bluegreen":                                                      //Check if it was bluegreen
            changeBall('bluegreen','gradientBlueGreen','#48e4ce', 'fast');      //Restore the color
          break;                                                                //Break out of the switch
          case"oceanblue":                                                      //Check if it was oceanblue
            changeBall('oceanblue','gradientOceanBlue','#0e649d', 'fast');      //Restore the color
          break;                                                                //Break out of the switch
          case"lilly":                                                          //Check if it was lilly
            changeBall('lilly','gradientLilly','#a198eb', 'fast');              //Restore the color
          break;                                                                //Break out of the switch
        }                                                                       //Close out switch statement
        if(localStorage.getItem(stringLights) == 'true'){                       //If String Lights are on
          $('#stringLights').show();                                            //Show the lights
          localStorage.setItem(stringLights, 'true');                           //Set the string lights state as on
        }                                                                       //Close out if statement
        else{                                                                   //If String Lights are off, null, or undefined
          localStorage.setItem(stringLights, 'false');                          //Set the string light state as off
        }                                                                       //Close out else statement
        currentTime();                                                          //Grab the current time
        setInterval(                                                            //Then after every 10 seconds
          function() {                                                          //... (function)
            currentTime();                                                      //Grab the current time
          }, 10000                                                              //...  every 10 seconds
        );
        openPane();                                                             //Open the panes
        setInterval(                                                            //Run the following function repeatadly (MAIN BALL CONTROL)
          function () {                                                         //... (Function)
            $('#circle').css({bottom:y});                                       //Change the bottom for Y pos
            y += vy;                                                            //Dynamics
            vy += ay;                                                           //Dynamics
            n = $('#circle').css('bottom');                                     //Assign pixel count from bottom to 'n'
            n = PXtoNumber (n);                                                 //Uses function (PXtoNumber)
            $('#counter').html(n);                                              //Write the 'n' in the #counter div
            if (y <= 0) {                                                       //If it goes under or is at 0...
              vy = 0;                                                           //Make it still
              ay = 0;                                                           //Make it still
              y = 0;                                                            //Make it still
              seconds = 0;
            }                                                                   //Close out if statement
          },3                                                                   //Run this entire function every millisecond
        );

//Color Switches ---------------------------------------------------------------
        $('#switchball').click(                                                 //When you click on the ball switch button
          function() {                                                          //... (function)
            switch(ballMode){                                                   //Grab the ballMode var to compare against
              case "red":                                                       //If the ball is red
                changeBall('green','gradientG','#81c000', 'normal');            //Change it to green
                console.log('Changing ballmode to green');
              break;                                                            //Break out of the switch
              case "green":                                                     //If the ball is green
                changeBall('blue','gradientB','#22bee0', 'normal');             //Change it to blue
                console.log('Changing ballmode to blue');
              break;                                                            //Break out of the switch
              case "blue":                                                      //If the ball is blue
                changeBall('red','gradientR','#e04422', 'normal');              //Change it to red
                console.log('Changing ballmode to red');
              break;                                                            //Break out of the switch
              default:                                                          //If the color isn't one of the main 3
                changeBall('blue','gradientB','#22bee0', 'normal');             //Change it to blue (default)
                console.log('No preset value, changing ballMode to blue');
              break;                                                            //Break out of the switch
            }                                                                   //Close out switch statement
          }                                                                     //Close out function
        );
        $('#switchback').click(                                                 //When you click on back switch
          function() {                                                          //... (function)
            backMode = backMode + 1;                                            //Change backMode
            if(backMode % 2 == 0){                                              //If backMode is even
              $('body,#wrapper').animate({backgroundColor:'#fffaf4'});          //Brighten background
              $(this).animate({backgroundColor:'#333333'});                     //Darken button
              $('#counter').animate({color:'#333333'});                         //Darken counter
              $('.corner').animate({borderColor:'#333333'});                    //Darken corner
              $("#wrapper").animate({color: 'rgba(1, 1, 1, 0.05)'});            //Darken clock
            }                                                                   //Close out if statement
            else{                                                               //If backMode is odd (else)
              $('body,#wrapper').animate({backgroundColor:'#333333'});          //Darken background
              $(this).animate({backgroundColor:'#fffaf4'});                     //Brighten button
              $('#counter').animate({color:'#fffaf4'});                         //Brighten counter
              $('.corner').animate({borderColor:'#fffaf4'});                    //Brighten corner
              $("#wrapper").animate({color: 'rgba(255, 255, 255, 0.05)'});      //Brighten clock
            }                                                                   //Close out else statement
          }                                                                     //Close out function
        );
        $('.switch').mouseover(                                                 //When you hover over a switch icon
          function() {                                                          //... (function)
            $(this).animate({                                                   //Animate it to...
              bottom: '15px'                                                    //Go up 5 px
            },150);                                                             //In 150 milliseconds
          }                                                                     //Close out function
        ).mouseleave(                                                           //When you take your mouse out
          function() {                                                          //... (function)
            $(this).animate({                                                   //Animate it to...
              bottom: '10px'                                                    //Go back down 5 px
            },150);                                                             //In 150 milliseconds
          }                                                                     //Close out function
        );
        $('#counter').click(                                                    //When you click on the height counter
          function() {                                                          //...(function)
            startTimer();                                                       //Start the timer
          }                                                                     //CLOSE OUT FUNCITON
        );

//Ballup Function Activations --------------------------------------------------
        $('#wrapper').click(                                                    //When you click on the wrapper
          ballup                                                                //Click uses function (ballup)
        );
        $('body').keyup(                                                        //When you type in search bar
          ballup2                                                               //Keyup uses function (ballup2)
        );
        $('#circle').mouseover(                                                 //When you hover over circle
          ballup                                                                //Mouseover uses function (ballup)
        );

//SECRET CODE SETUP ------------------------------------------------------------
        function secretCode() {                                                 //Check for secret codes
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
                $('#circle').removeClass().css({background:'#e72763'});
                $('#switchball').animate({
                    backgroundColor: '#e72763'
                  }, 500);
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
            setInterval(
              function() {
                $('#switchball').animate({
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
                $('#circle').removeClass().css({background:'#e72763'}).fadeIn(500);
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
      //Code load      Event: Show loading screen                           Chec
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
                clearSearch();
                $('#search').css({'box-shadow': 'none'});
                $('#search').css({'display': 'none'});
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
      //Code: shortkey  Event: Open new tab shortcuts                       Chec
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
            removeTabsIgnoreLast();
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
      //Code: pkg       Event: Open package tracker                         Chec
          if(typedString == 'pkg') {
            $('#pkg').css({display: 'block'});
            $('#search').animate(
              {width: '0px',border: '0px',padding: '0px', 'box-shadow': '0px 0px 0px 0px rgba(0, 0, 0, 0.54)'},350,
              function() {
                clearSearch();
                $('#search').css({'box-shadow': 'none'});
                $('#search').css({'display': 'none'});
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
      //Code: grd-bg     Event: Activate blue green gradient                Chec
          if(typedString == 'grd-bg') {
            changeBall('bluegreen','gradientBlueGreen','#48e4ce', 'normal');
            clearSearch();
          }
      //Code: grd-ob     Event: Activate ocean blue gradient                Chec
          if(typedString == 'grd-ob') {
            changeBall('oceanblue','gradientOceanBlue','#0e649d', 'normal');
            clearSearch();
          }
      //Code: grd-l     Event: Activate Lilly gradient                      Chec
          if(typedString == 'grd-l') {
            changeBall('lilly','gradientLilly','#a198eb', 'normal');
            clearSearch();
          }
      //Code: mcc       Event: Open MCC Website                             Chec
          if (typedString == 'mcc') {
            window.location = 'https://www.middlesex.mass.edu/'
          }
      //Code: mymcc       Event: Open MyMCC Website                         Chec
          if (typedString == 'mymcc') {
            window.location = 'https://auth.middlesex.mass.edu/adfs/ls?wa=wsignin1.0&wtrealm=urn%3asharepoint%3a2016&wctx=https%3a%2f%2fmymcc.middlesex.mass.edu%2f_layouts%2f15%2fAuthenticate.aspx%3fSource%3d%252F&wreply=https%3a%2f%2fmymcc.middlesex.mass.edu%2f_trust%2fdefault.aspx'
          }
      //Code: blkb        Event: Open Blackboard                            Chec
          if (typedString == 'blkb') {
            window.location = 'https://blackboard.middlesex.mass.edu/webapps/login/'
          }
      //Code: div         Event: Rename tab for dividing                    Chec
          if(typedString == 'div') {
            $('#divider').css({display: 'block'});
            $('#search').animate(
              {width: '0px',border: '0px',padding: '0px', 'box-shadow': '0px 0px 0px 0px rgba(0, 0, 0, 0.54)'},350,
              function() {
                clearSearch();
                $('#search').css({'box-shadow': 'none'});
                $('#search').css({'display': 'none'});
                $('#divider').css({'box-shadow': '1px 14px 65px 8px rgba(0, 0, 0, 0.54)', border: '1px solid #474747'});
              }
            );
            $('#counter, #timer').fadeOut(250);
            setTimeout(function() {
              $('#counter, #timer').remove();
              $('#divider').animate(
                {width: '37.5%','padding-left': '40px'}, 350,
                  function() {
                    $('#divider').focus();
                  }
              );
            }, 250);
          }
          if(typedString == 'lofi'){
              $('#game').html("<iframe id='lofi' width='560' height='315' src='https://www.youtube.com/embed/hHW1oY26kxQ?controls=0' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>");
              setTimeout(
              function() {
                $('#lofi').fadeIn(500);
                clearSearch();
                document.title = "Lofi Beats";
              }, 200
            );
          }
        }                                                                           //Close out function

//Secret Code running ----------------------------------------------------------
        $('#search').keyup(                                                     //When you type in the search bar
          function() {                                                          //... (function)
              secretCode();                                                     //Check for any codewords
          }                                                                     //Close out function
        );

//Schedule ---------------------------------------------------------------------
        $('#schedule').click(                                                   //When you click on the schedule
          function() {                                                          //... (function)
            $(this).fadeOut(500);                                               //Fade out the schedule
          }                                                                     //Close out function
        );

//Help Menu --------------------------------------------------------------------
        $('.xbuttons').click(                                                   //When you click on the X button on the help menu
          function() {                                                          //... (function)
            closeHelp();                                                        //Run closeHelp function;
          }                                                                     //Close out function
        );
        $('.secretCode').click(                                                 //When you click on any of the secret codes in help
          function() {                                                          //... (function)
            $('#search').val(this.innerText);                                   //Put whatever you clicked on in the search bar
            closeHelp();                                                        //Close the help menu
            secretCode();                                                       //Check for any codewords
          }                                                                     //Close out function
        );
        $('#circle').click(                                                     //When you click on the ball
    	    function() {                                                          //... (function)
    		    $('#search').val('grd-').focus();                                   //Write the gradient change and then focus it
    	    }                                                                     //Close out function
        );

//Keyboard Shortcuts -----------------------------------------------------------
        $(document).keyup(                                                      //When any key goes up
          function(e) {                                                         //... (function)
            if (e.key === 'Escape') {                                           //If the key you pressed is escape...
              closeHelp();                                                      //Fade out the help menu
            }                                                                   //Close out if statement                                                                 //Close out if statement
          }                                                                     //Close out function
        );

//Second Screen (Loading) ------------------------------------------------------
        $('#screentwo').mouseover(                                              //When you click on the second screen (Loading)
          function() {                                                          //... (function)
            location.reload();                                                  //Reload the page
          }                                                                     //Close out function
        );

//Window Dimensions ------------------------------------------------------------
        $(window).resize(                                                       //When you resize the window
          function() {                                                          //... (function)
            GetWindowDims();                                                    //Function for grabbing and assigning window dimensions
          }                                                                     //Close out function
        );

//Debug Menu -------------------------------------------------------------------
        $('#debug').keyup(                                                      //When you type in the debug menu
          function(e) {                                                         //... (function)
            var debugString = $(this).val();                                    //Store typed text to debugString var
            if(e.keyCode == 13){                                                //If you click enter
              eval(debugString);                                                //Run the typed string as code
                clearSearch();                                                  //Clear all inputs
            }                                                                   //Close out if statement
          }                                                                     //Close out function
        );

//Hot Corners ------------------------------------------------------------------
        $('.corner').click(                                                     //When you click a a hot corner...
          function() {                                                          //... (function)
            lastClosed();                                                       //Open the last closed website
          }                                                                     //Close out function
        );

//Notes ------------------------------------------------------------------------
        new Vue({                                                               //Run a Vue app for notes
          el: '#notesApp',                                                      //Run the app on the correct id
          data: {                                                               //The following are the app Variables (Data)
            myList: myList,                                                     //My notes (retrieved from the local storage vault)
          },                                                                    //Close out Data
          methods: {                                                            //The following are the functions that can be run (Methods)
            removeItem: function (itm) {                                        //When you click on a note in the app
              this.myList.splice(                                               //Grab the current array
                myList.indexOf(itm),                                            //Get index of clicked item
                1);                                                             //Remove it
              saveArray(this.myList)                                            //Save the array
            }                                                                   //Close out method
          }                                                                     //Close out methods
        });                                                                     //Close out Vue
        $('#notetaker').on('keypress',function(e) {                             //When you type in the note taker input bar
          if(e.which == 13) {                                                   //If you clicked enter...
            var currentNote  = $('#notetaker').val();                           //Make a temporary variable that holds what you typed
            myList.push(currentNote);                                           //Throw it on to your array of notes
            saveArray(myList);                                                  //Save your notes list to local storage
            $('input').val('');                                                 //Empty out the note taker input bar (to prep next note)
            setTimeout(                                                         //Wait one millisecond, then
              function() {                                                      //... (function)
                $('.note').show().css('display','inline-block');                //Refresh the shown notes
              },1                                                               //Delay
            );
          }                                                                     //Close out if statement
        });                                                                     //Close out function

//Prop Hunt Reload -------------------------------------------------------------
        $('#wrapper').click(                                                    //When you click outside during prop hunt
          function() {                                                          //... (function)
            if(propState == true){                                              //If prop hunt is on
              location.reload();                                                //Reload the page
            }                                                                   //Close out if statement
          }                                                                     //Close out function
        );

//Chrome Shortcuts -------------------------------------------------------------
        $('tr').mouseover(                                                      //When you have your mouse over a table row
          function() {                                                          //... (function)
            $(this).css('color','#e72763');                                     //Make the text purple
          }                                                                     //Close out function
        );
        $('tr').mouseout(                                                       //When you have your mouse leave a table row
          function() {                                                          //... (function)
            $(this).css('color','black');                                       //Make the text black
          }                                                                     //Close out function
        );
        $('.chromeShortcutDivs').click(                                         //When you click on a header in the chrome menu
          function() {                                                          //... (function)
            window.location='https://support.google.com/chrome/answer/157179?hl=en';//Go to the official website with chrome shortcuts
          }                                                                     //Close out function
        );

//Recent Menu ------------------------------------------------------------------
        new Vue({                                                               //Run a Vue app that displays these websites
          el: '#recentlyClosedMenu',                                            //Run the app on the correct id
          data: {                                                               //The following are the app Variables (Data)
            gotLast9:[]                                                         //Initialize a empty array for the websites
          },                                                                    //Close out Data
          methods: {                                                            //The following are the functions that can be run (Methods)
            closeHelp: function() {                                             //When you call on closeHelp in Vue
              $('.menutable').fadeOut(500);                                     //Fade out the help menu
            },                                                                  //Close out method
            openSite: function(url) {                                           //When you call on openSite & pass through a url
              window.location = url;                                            //Open that url
            },                                                                  //Close out method
          },                                                                    //Close out Methods
          created: function() {                                                 //The following function will be run when the Vue is successfully built
            chrome.sessions.getRecentlyClosed({}, (results)=>{                  //Hey chrome get my 25 last closed tabs
              results = results.filter(                                         //Filter out...
                (r)=>r.tab && r.tab.title != 'New Tab'                          //Anything matching new tab
              );
              var gotLast9 = results.map((r) => {                               //Create a array that...
                return{TITLE: r.tab.title, URL: r.tab.url}                      //Contains only the title and url of each object
              });                                                               //Close out array creation
              if (gotLast9.length > 9){                                         //If the list is over 9 (it always is)
                gotLast9 = gotLast9.slice(0, 9);                                //Cut it down to only 9 websites
              }                                                                 //Close out if statement
              this.gotLast9 = gotLast9;                                         //Submit final array to Vue
            });                                                                 //Close out Chrome arrow function
          }                                                                     //Close out function
        });                                                                     //Close out Vue

//Search Animations  ------------------------------------------------------------------

        $('#search').hover(
          function() {
            $('#search').animate({'width':'35%'},350);
          },
          function() {
            if(searchFocus == false){
              $('#search').stop(true).animate({'width':'15%'},350);
            }
          }
        ).focus(
          function() {
            searchFocus = true;
            $('#search').animate({'width':'35%'},350);
          }
        ).blur(
          function() {
            searchFocus = false;
            $('#search').stop(true).animate({'width':'15%'},350);
          }
        );

//Divider Menu  ----------------------------------------------------------------
        $('#divider').keyup(                                                    //When you type in the debug menu
          function(e) {                                                         //... (function)
            var divideString = $(this).val();                                   //Store typed text to debugString var
            if(e.keyCode == 13){                                                //If you click enter
              document.title = divideString;                                    //Run the typed string as code
                clearSearch();                                                  //Clear all inputs
            }                                                                   //Close out if statement
          }                                                                     //Close out function
        );
      }                                                                         //Close out Main Function
    );
  }, 500                                                                        //Delay
);
