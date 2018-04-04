var keys = require("./keys.js");
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require("twitter");

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var commands = ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"];

var command = process.argv[2].toLowerCase();

if (!commands.includes(command)) {
    console.log("Error, this is not a command");
    process.exit(1);
};

function printTweets() {
    client.get('statuses/home_timeline', function (error, tweets, response) {
        if (error) throw error;
        for (let i = 0; i < tweets.length; i++) {
            const tweet = tweets[i];
            console.log(tweet.text);
        }
    });
}
if (command === "my-tweets") {
    printTweets();
}

function movie(movieTitle) {
    movieTitle = encodeURIComponent(movieTitle);
    request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (error) return console.log(error);

        console.log("The title of the movie is: " + JSON.parse(body).Title);
        console.log("The movie was released in: " + JSON.parse(body).Released);
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        console.log("The movie's Rotten Tomato's rating is: " + JSON.parse(body).Ratings[1].Value);
        console.log("The country the movie was produced is: " + JSON.parse(body).Country);
        console.log("The movie's language is: " + JSON.parse(body).Language);
        console.log("The movie's plot is: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    });
}
if (command === "movie-this") {
    var movieTitle = process.argv[3];
    movie((movieTitle || "Mr. Nobody"));
}

function songInfo(songName) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("The Artist of the song is: " + data.tracks.items[0].artists[0].name);
        console.log("The name of the song is: " + data.tracks.items[0].name);
        console.log("Preview the song: " + data.tracks.items[0].preview_url);
        console.log("The album the song is from: " + data.tracks.items[0].album.name);
    });
}
if (command === "spotify-this-song") {
    var songName = process.argv[3];
    songInfo((songName || "The Sign" ));
}

var fs = require("fs");
fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);
  });

// * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
