var friends = require("../data/friends");






module.exports = function(app) {

    //when user navigates to the /api/friends URL, this "get" will serve the JSON for all of the friends located in the data/friends.js
    app.get("/api/friends", function(req, res){
        res.json(friends);
        
    })

    app.post("/api/friends", function(req, res) {
        
        //this object will hold the best match of the database of friends that gets pushed 
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
        };

        
        //userData variable takes the the user data from the form filled out on the survey.html in req.body and stores in variable "userData"
        var userData = req.body;

        //this variable stores an array of scores for the user that pushes his/her data from the survey.html questions
        var userScores = userData.scores;

        for (var i =0; i < friends.length; i++) {
            //this variable stores the the friend over which we are currently iterated
            var currentFriend = friends[i];
            totalDifference = 0;
            //this console log should log each friend name to the terminal
            console.log(currentFriend.name);
            //we have to create a nested for loop with this because the first for loop is only iterating through the friends objects..within each friends object we have an array of scores that we have to iterate through as well
            for (var j = 0; j < currentFriend.scores.length;  j++) {
                //this creates a variable for each scores array of each friend object and stores each scores array for each friend per iteration
                
                var currentFriendScore = currentFriend.scores[j];
                //this iterates over the scores array of the most recent user post object and stores the array in a currentUserScore variable

                var currentUserScore = userScores[j];


                totalDifference += Math.abs(parseInt(currentUserScore))- parseInt(currentFriendScore);
            }

            //this is still in the friends objet for-loop, so if the totalDifference bw currentuser scores and the database of friends scores <= the friendDifference property, then the bestMatch object will be updated with bestMatch from the friends database
            //for example, the first iteration over the first friends object will store that friend in the bestMatch object because the friendDifference property = infinity
            //however, the first friend will be replaced with most recent friend as the loop iterates over the second friend object in the database if totalDifference is <= to the previous friend
            if (totalDifference <= bestMatch.friendDifference) {


                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDifference = totalDifference;
            }
        }

        friends.push(userData);

        res.json(bestMatch);


    });

};