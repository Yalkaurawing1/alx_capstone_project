const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

// if restartQuiz button clicked
startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

// if quitQuiz button clicked
exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}
// if continueQuiz button clicked
continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    
    showQuetions(0); //calling showQestions function
    questionCounter(1);
    headerScore ();
  }
  
  tryAgainBtn.onclick = () =>{
  quizBox.classList.add('active');
  nextBtn.classList.remove('active');
  resultBox.classList.remove('active');
  
  questionCount = 0;
  questionNumb = 1;
  userScore = 0; 
  showQuetions(questionCount);
  questionCounter(questionNumb);

  headerScore ();

}

goHomeBtn.onclick = () =>{
  quizSection.classList.remove('active');
  nextBtn.classList.remove('active');
  resultBox.classList.remove('active');
  
  questionCount = 0;
  questionNumb = 1;
  userScore = 0; 
  showQuetions(questionCount);
  questionCounter(questionNumb);

  headerScore ();

}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0; 

const nextBtn = document.querySelector('.next-btn');
const questionTotal = document.querySelector('.question-total')

// if Next btn button clicked
nextBtn.onclick = () => {
  if(questionCount < questions.length - 1) {
    questionCount++;
    showQuetions(questionCount);

    questionNumb++;
    questionCounter(questionNumb);

    nextBtn.classList.remove('show');
  }
  else {
    //calling showResult function
    showResultBox();
  }
}

const optionList = document.querySelector(".option-list");

// getting questions and options from array
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<h2>'+ questions[index].numb + ". " + questions[index].question +'</h2>';
    let optionTag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new h2 tag inside que_tag
    optionList.innerHTML = optionTag; //adding new div tag inside option_tag
    
    const option = optionList.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


//if user clicked on option
function optionSelected(answer) {
  // clearInterval(counter); //clear counter
  // clearInterval(counterLine); //clear counterLine
  let userAnswer = answer.textContent; 
  let correctAnswer = questions[questionCount].answer;
let allOptions = optionList.children.length;

  if (userAnswer == correctAnswer) {

     answer.classList.add('correct');
     answer.insertAdjacentHTML("beforeend", tickIconTag);
     userScore += 1;
     headerScore ()
    }
    else {

    answer.classList.add('incorrect');
    answer.insertAdjacentHTML("beforeend", crossIconTag);
    
     // if answer incorrect , auto select correct answer.
     for(i = 0; i < allOptions; i++){
      if(optionList.children[i].textContent == correctAnswer){ //if there is an option which is matched to an array answer 
          optionList.children[i].setAttribute("class", "option correct"); //adding green color to matched option
          optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
      //     console.log("Auto selected correct answer.");
       }
           
       }
     //once user select an option then disabled all options
     for(i = 0; i < allOptions; i++){
      optionList.children[i].classList.add("disabled");
 
     }
     
    }
    nextBtn.classList.add('show');
  }
function questionCounter(index){
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag = + index +' / '+ questions.length +' Questions';
  questionTotal.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

function headerScore () {
   let headerScoreText = document.querySelector('.header-score');
   headerScoreText.textContent = 'Score: '+userScore+' of '+questions.length;
}

function showResultBox() {
   quizBox.classList.remove('active');
   resultBox.classList.add('active');

   const scoreText = document.querySelector(".score_text");
   if (userScore > 3){ // if user scored more than 3
       //creating a new span tag and passing the user score number and total question number
       let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
       scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
   }
   else if(userScore > 1){ // if user scored more than 1
       let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
       scoreText.innerHTML = scoreTag;
   }
   else{ // if user scored less than 1
       let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
       scoreText.innerHTML = scoreTag;
   }
    
  
}

