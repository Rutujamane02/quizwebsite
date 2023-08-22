


const questionNumber= document.querySelector(".question-number");
const questionText= document.querySelector(".question-text");
const optionContainer= document.querySelector(".option-container");
const answerIndicatorContainer=document.querySelector(".answers-indicators");
const homeBox=document.querySelector(".home-box");
const quizBox=document.querySelector(".quiz-box");
const resultBox=document.querySelector(".result-box");
const questionLimit=5;


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers=0;
let attempt=0;
//push the questions into availableQuestions Arra
function setAvailableQuestions ()
{
const totalQuestion = quiz.length;
for (let i=0; i<totalQuestion; i++)
{
availableQuestions.push(quiz[i]);
}
}

function getNewQuestion ()
{
  console.log(availableQuestions);
    //set question number
    questionNumber.innerHTML ="  Question  "+ (questionCounter+1)   + " of  "   +   questionLimit;  
     //set question text
     //get random question
     const questionIndex = availableQuestions [Math.floor (Math.random ()* availableQuestions.length)]
    //  console.log(questionIndex);
     currentQuestion = questionIndex;
     questionText.innerHTML = currentQuestion.q;
    

    // Get the position of questionindex from the availableQuestion Array
   const index1= availableQuestions.indexOf(questionIndex);
    // Remove the question Index from availableQuestion  Arrays
     availableQuestions.splice(index1,1);

     if(currentQuestion.hasOwnProperty("img")){
      const img=document.createElement("img");
      img.src=currentQuestion.img;
      questionText.appendChild(img);
     }
     console.log(index1);
     console.log(availableQuestions);

      //Set the options
     // Get the  length of options 
     const optionLen=currentQuestion.options.length;
      for(let i=0; i<optionLen; i++)
     {
     availableOptions.push(i)
      }
      optionContainer.innerHTML='';
    let animationDelay=0.15;
    //Create options in html
    
     for(let i=0; i<optionLen; i++){
      //random option
      const optonIndex=availableOptions[Math.floor(Math.random() * availableOptions.length)];
    //get the position fo optionIndex from the available options
    const index2=availableOptions.indexOf(optonIndex);
    availableOptions.splice(index2,1);
     const option = document.createElement("div");
    option.innerHTML= currentQuestion.options[optonIndex];
    option.id =optonIndex;
    option.style.animationDelay=animationDelay + 's';
    animationDelay=animationDelay + 0.2;
      option.className= "option";
      optionContainer.appendChild(option)
      option.setAttribute("onclick","getResult(this)");
     }
     questionCounter++;
    
 }  
 function getResult(element){
  const id= parseInt(element.id);
  if(id===currentQuestion.answer){
    console.log("answer is correct");
    element.classList.add("correct");
    updateAnswerIndicator("correct");
    correctAnswers++;
    console.log("correct:" +correctAnswers);
    
  }
  else
  {
    element.classList.add("wrong");
    updateAnswerIndicator("wrong");
    // if the answer is incorrect then tell the user the correct answer
    const optionLen=optionContainer.children.length;
    for(let i=0;i<optionLen;i++)
    {
      if(parseInt(optionContainer.children[i].id)===currentQuestion.answer)
      {
        optionContainer.children[i].classList.add("correct");

      }
    }
  }
  attempt++;
  unclickableOptions();
 } 
 function unclickableOptions(){
  const optionLen=optionContainer.children.length;
  for(let i=0; i<optionLen; i++)
  {
    optionContainer.children[i].classList.add("already-answered")
  }
 }
   function answersIndicator(){
    answerIndicatorContainer.innerHTML='';
       const totalQuestion=questionLimit;
       for(let i=0; i<totalQuestion;i++)
       {
        const indicator=document.createElement("div");
        answerIndicatorContainer.appendChild(indicator); 

       }
   }
  function updateAnswerIndicator(markType)
  {
    console.log(markType);
    answerIndicatorContainer.children[questionCounter-1].classList.add(markType)
  }
     function next(){
    if(questionCounter ===questionLimit){
     console. log("quiz over");
     quizOver();
     }
     else{
     getNewQuestion();
     } }
     function quizOver(){
      quizBox.classList.add("hide");
      resultBox.classList.remove("hide");
      quizResult();


     }
     function quizResult(){
      resultBox.querySelector(".total-questions").innerHTML=questionLimit;
      resultBox.querySelector(".total-attempt").innerHTML=attempt;
     resultBox.querySelector(".total-correct").innerHTML=correctAnswers;
     resultBox.querySelector(".total-wrong").innerHTML=attempt-correctAnswers;
      const percentage=(correctAnswers/questionLimit)*100;
      resultBox.querySelector(".total-percentage").innerHTML=percentage.toFixed() + "%";
      resultBox.querySelector(".total-score").innerHTML=correctAnswers + " / " + questionLimit;
     }
     function resetQuiz(){
      questionCounter=0;
      correctAnswers=0;
      attempt=0;
      availableQuestions=[];
     }
     function tryAgainQuiz(){
      resultBox.classList.add("hide");
      quizBox.classList.remove("hide");
      resetQuiz();
      startQuiz();
     }
     function goToHome(){
      resultBox.classList.add("hide");
      homeBox.classList.remove("hide");
      resetQuiz();
     }
   function startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();
}
window.onload=function(){
  homeBox.querySelector(".total-question").innerHTML=questionLimit;}