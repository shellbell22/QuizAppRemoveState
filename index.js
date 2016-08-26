// state object
var state = {
'currentquestion': 0,
'currentscore': 0,
};

//function to modify state
var nextQuestion = function(state, answer) {
  if (state.currentquestion == QUESTIONS.length)
    return;
  var question = QUESTIONS[state.currentquestion];
  if (answer == question.correct)
    state.currentscore += 1;
  state.currentquestion += 1;
};

//function to reset state
var resetGame = function (state) {
  state.currentquestion = 0;
  state.currentscore = 0;
};



var QUESTIONS = [
    {
        text: '<:48:x<:65:=<:6C:$=$=$$~<:03:+$~<:ffffffffffffffbd:+$<:ffffffffffffffb1:+$<:57:~$~<:18:x+$~<:03:+$~<:06:x-$x<:0e:x-$=x<:43:x-$',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 0
    },
    {
        text: '+0+0+0+0+0+0+0+2)+0+0+9)+7))+3)-0-0-0-0-0-0-0-9)+0+0+0+0+0+0+0+0+7)-8)+3)-6)-8)-7-0-0-0-0-0-0)',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 1
    },
    {
        text: '*6*3p*4*3*2*0p*2*1*0pp>0*1*0p*5*4*0p*5*4*2*1*0p*4*3p*1*0p/+0p+0*6*5*2p+0*5*0p',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 2
    },
    {
        text: ']xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhxjjjxxjjjjjjjxjhhhhxjhhhhhhhhjjjhh~',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 3
    }
];

var questionsPageElement = $('.questions-page');
var questionCurrentElement = $('.question-current');
var questionsTotalElement = $('.questions-total');
var questionElement = $('.question');
var answersElement = $('.answers');

var resultsPageElement = $('.results-page');
var scoreElement = $('.score');
var restartButtonElement = $('.restart-button');

//render function
var renderQuestion = function(state, element) {
  if (state.currentquestion > 3) {
    return;
  }
  var questiontext = QUESTIONS[state.currentquestion].text;
  element.html(questiontext);


};

var renderAnswer = function (state, element) {
  if (state.currentquestion > 3) {
    return;
  }
  element.empty();
  var answertext = QUESTIONS[state.currentquestion].answers;
  for (var i=0; i<answertext.length; i++) {
      var answer = answertext[i];
      element.append('<li><button type="button">' + answer + '</button></li>');
    }
};

var renderScore = function (state, element, belement) {
  if (state.currentquestion < 4) {
  var currentquestion = state.currentquestion + 1;
  belement.html(currentquestion);
  var score = state.currentscore;
  element.html(score);
  var questiontotal = 4;
  questionsTotalElement.html(questiontotal);
}
else {
  showResults();
}
};

var showResults = function() {
    questionsPageElement.hide();
    resultsPageElement.show();
};

answersElement.on('click', 'button', function() {
    var choice = $(this).parent().index();
    nextQuestion(state, choice);
    renderQuestion(state, questionElement);
    renderAnswer(state, answersElement);
    renderScore(state, scoreElement, questionCurrentElement);
});

restartButtonElement.click(function() {
  resetGame(state);
  renderQuestion(state, questionElement);
  renderAnswer(state, answersElement);
  renderScore(state, scoreElement, questionCurrentElement);
  questionsPageElement.show();
  resultsPageElement.hide();

});

$(document).ready(function() {
    renderQuestion(state, questionElement);
    renderAnswer(state, answersElement);
    renderScore(state, scoreElement, questionCurrentElement);
});
