$(document).ready(function () {
    var qArray = [ 
        {
            question: "Which player has the most NBA Championships?",
            guesses:["Bill Russell", "Tim Duncan", "Robert Horry", "Michael Jordan"],
            answer: 0,
           },
       
        {
            question: "What college did Lebron James attend?",
            guesses:["Ohio State", "Duke", "UCLA", "None"],
            answer: 3,
           },
       
            {
            question: "The 1992 US Men's Olympic Basketball team is known as the:",
            guesses:["Redeem Team", "Greatest Team Ever", "Dream Team", "Legends Forever"],
            answer: 2,
           },
       
            {
            question: "What team was Kobe Bryant originally drafted from?",
            guesses:["Lakers", "Hornets", "Trailblazers", "Grizzlies"],
            answer: 1,
           },
       
            {
            question: "Which player is the All-Time Scoring Leader in the NBA?",
            guesses:["Kobe Bryant", "Michael Jordan", "Kareem Abdul-Jabbar", "Karl Malone"],
            answer: 2,
           },
       
            {
            question: "Which player is the All-Time Assists Leader in the NBA?",
            guesses:["John Stockton", "Jason Kidd", "Magic Johnson", "Steve Nash"],
            answer: 0,
           },
       
            {
            question: "Which player is the All-Time Rebounding Leader in the NBA?",
            guesses:["Elvin Hayes", "Dennis Rodman", "Moses Malone", "Wilt Chamberlain"],
            answer: 3,
           },
       
            {
            question: "Which player is the All-Time Steals Leader in the NBA?",
            guesses:["Gary Payton", "Mo Cheeks", "Scottie Pippen", "John Stockton"],
            answer: 3,
           },
       
            {
            question: "Which player is the All-Time Blocks Leader in the NBA?",
            guesses:["Dikembe Mutumbo", "Hakeem Olajuwan", "Mark Eaton", "David Robinson"],
            answer: 1,
           },
       
            {
            question: "Which NBA player's nickname is, The Iceman?",
            guesses:["Steph Curry", "George Gervin", "Paul Pierce", "Jason Richardson"],
            answer: 1,
           }];

var correct = 0;
var incorrect = 0;
var noAnswer = 0;
var counter = 60;
var counterSpeed;
var myGuess="";
var countDown = false;
var allQuestions = qArray.length;
var select;
var randomNumber;
var place = [];



// PAGE LOAD/RELOAD
$("#restart").hide();

// BUTTON TO START GAME
$("#start").on("click", function () {
		$("#start").hide();
		randomQuestion();
		counterGo();
		for(var i = 0; i < qArray.length; i++) {
	place.push(qArray[i]);
}
    })
    
// COUNTER STARTS, INTERVAL SET TO SECONDS.
function counterGo(){
	if (!countDown) {
	counterSpeed = setInterval(loseSeconds, 10); 
	countDown = true;
	}
}

// COUNTER COUNTDOWN. EACH SECOND THAT PASSES, SUBTRACT 1.
function loseSeconds() {
	$("#Time").html("<h3>Time remaining: " + counter + "</h3>");
	counter --;

// COUNTER STOPS WHEN IT REACHES 0 SECONDS
	if (counter === 0) {
        noAnswer++;
        stop(counter);
        clearInterval(counter);
		$("#Answer").html("<p>AIRBALL! " + select.guesses[select.answer] + "</p>");
		gameScore();
	}	
}

// FUNCTION TO STOP
function stop() {
	countDown = false;
	clearInterval(counterSpeed);
}

//DISPLAYS QUESTIONS RANDOMLY BUT DOES NOT CHOOSE SAME QUESTION TWICE
function randomQuestion() {

	randomNumber = Math.floor(Math.random()*qArray.length);
	select = qArray[randomNumber];

		$("#Questions").html("<h2>" + select.question + "</h2>");
		for(var i = 0; i < select.guesses.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(select.guesses[i]);

			userChoice.attr("data-guessvalue", i);
			$("#Answer").append(userChoice);
        }



// FUNCTION FOR SELECTING ANSWERS & THEIR OUTCOMES
$(".answerchoice").on("click", function () {
	
	myGuess= parseInt($(this).attr("data-guessvalue"));

	
	if (myGuess=== select.answer) {
		stop();
		correct++;
		myGuess="";
		$("#Answer").html("<p>Correct!</p>");
		gameScore();

	} else {
		stop();
		incorrect++;
		myGuess="";
		$("#Answer").html("<p>Wrong! The correct answer is: " + select.guesses[select.answer] + "</p>");
		gameScore();
	}
})
}

// FUNCTION TO PROJECT SCORE ON SCREEN FOR USER TO SEE

function gameScore () {
	

	
	if ((incorrect + correct + noAnswer) === allQuestions) {
		$("#Questions").empty();
		$("#Questions").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#Answer").append("<h4> Correct: " + correct + "</h4>" );
		$("#Answer").append("<h4> Incorrect: " + incorrect + "</h4>" );
		$("#Answer").append("<h4> Unanswered: " + noAnswer + "</h4>" );
		$("#restart").show();
		correct = 0;
		incorrect = 0;
		noAnswer = 0;

	} else {
		counterGo();
        randomQuestion();
        $("#restart").hide();
    
        

    }
}
	


// RESET BUTTON
$("#restart").on("click", function() {
	$("#restart").hide();
	$("#Answer").empty();
	$("#Questions").empty();
	for(var i = 0; i < place.length; i++) {
		qArray.push(place[i]);
	}
	counterGo();
    randomQuestion();
    clearInterval(counter);

})

})