// require everything need to run this CLA
require("dotenv").config();

var keys = require("./keys.js");
var request = require('request');
var moment = require('moment');
var Spotify = require('node-spotify-api');

// set variables
var spotify = new Spotify(keys.spotify);

var nodeArgs = process.argv;

var liri =  process.argv[2];

var artist = "";



// allow the user to enter in names longer than 1 word 
    // for loop
    // set i = 3 so it will start at index of 3 for command line purposes
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
  
      artist = artist + "+" + nodeArgs[i];
  
    }
  
    else {
  
      artist += nodeArgs[i];
  
    }
  }
//   console.log(artist)

// use Switch to navigate between liri target points in the command line
  switch (liri) {
    case "concert-this":
    if(artist){
        console.log("Okay...I've found these concerts for " + artist + ".")
    findConcert(artist);
    } else {
        console.log("No concert availible")
    }
    break;
}

// function for finding a concert
function findConcert (){
request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
//   if (!error && response.statusCode === 200) {
        for(i=0; i < body.length; i++) {
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("==========================================")
    console.log("Venue: " + JSON.parse(body)[i].venue.name)
    console.log("City: " + JSON.parse(body)[i].venue.city)
    // moment info for the datetime format
    // moment().format(LLLL);
    console.log("Date and Time: " + JSON.parse(body)[i].datetime)
    console.log("==========================================")
        }
        
  }); 

}
// }
