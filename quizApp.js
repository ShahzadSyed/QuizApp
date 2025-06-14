const quizQuestions = [
    {
        id: 1,
        question: "HTML stands for?",
        options: {
            a: "Hyper Text Markup Language",
            b: "Hyper Text Programming Language",
            c: "Hyper Text Styling Language",
            d: "Hyper Text Scripting Language"
        },
        answer: "Hyper Text Markup Language"
    },
    {
        id: 2,
        question: "Which language is used for styling web pages?",
        options: {
            a: "HTML",
            b: "CSS",
            c: "JavaScript",
            d: "PHP"
        },
        answer: "CSS"
    },
    {
        id: 3,
        question: "Which of these is a JavaScript framework?",
        options: {
            a: "Django",
            b: "React",
            c: "Laravel",
            d: "Bootstrap"
        },
        answer: "React"
    },
    {
        id: 4,
        question: "Which tag is used to define a hyperlink in HTML?",
        options: {
            a: "link",
            b: "a",
            c: "href",
            d: "url"
        },
        answer: "a"
    },
    {
        id: 5,
        question: "Which company developed JavaScript?",
        options: {
            a: "Microsoft",
            b: "Netscape",
            c: "Oracle",
            d: "Sun Microsystems"
        },
        answer: "Netscape"
    }
]

let indexNumber = 0;
const count = document.getElementById("count");
count.innerHTML =`${indexNumber +1 } / ${quizQuestions.length}`
const nextbtn = document.getElementById("nextbtn")
let correctAnsCount = 0;
let wrongAnsCount =0;

function uiRender(){
    const question = document.getElementById("question")
    const options = document.getElementById("options")

    // console.log("uiRender",uiRender)
    question.innerHTML = quizQuestions[indexNumber].question;
    // options.innerHTML= `<li class="option-btn">Hyper Text Markup Language</li>
    //       <li class="option-btn">Hyper Text Programming Language</li>
    //       <li class="option-btn">Hyper Text Styling Language</li>
    //       <li class="option-btn">Hyper Text Scripting Language</li>`
    const optionList = quizQuestions[indexNumber].options;
    
    options.innerHTML = "";
    for(var key in optionList)
        {
            // console.log(optionList[key])
            options.innerHTML += `<li class="option-btn" onclick="checkAns(this)">${optionList[key]}</li>`
        }
}

function nextQuestion()
{
    indexNumber++;
    if(indexNumber < quizQuestions.length )
    {
        uiRender();
        count.innerHTML =`${indexNumber +1 } / ${quizQuestions.length}`
    }
    else{
        console.log("FINISH")
        console.log("correctAnsCount", correctAnsCount)
        console.log("wrongAnsCount",wrongAnsCount)
        console.log("Total No. of Question", quizQuestions.length)
        console.log("percentage", (correctAnsCount / quizQuestions.length)*100 )

        const percent = (correctAnsCount / quizQuestions.length)*100
        let rank;
        if(percent < 60 )
        {
            console.log("F")
            rank ="F"
        }
        else{
            rank="P"
            console.log("P")
        }

        const reportObj={
            totalQues : quizQuestions.length,
            correctAnsCount,
            wrongAnsCount,
            percent,
            rank,
        }
        console.log("ReportObj", reportObj)
        localStorage.setItem("report", JSON.stringify(reportObj))
        window.location.replace("./reportCard.html")



    }
    nextbtn.disabled = true;
    
}

function checkAns(ele)
{
    const allLi = document.getElementById("options").children;
    const userSelection = ele.innerHTML;
    const correctAns = quizQuestions[indexNumber].answer;

    if(userSelection === correctAns)
    {
        correctAnsCount++;
        ele.style.background = "green";
        
    }
    else
    {    
        wrongAnsCount++;
        ele.style.background = "red"; 

         for(var i=0; i<allLi.length; i++){
            if(allLi[i].innerHTML == correctAns)
            {
                allLi[i].style.background="green";
                break;
            }
         }
    

    }

    
    for(var i=0; i<allLi.length; i++)
    {
        allLi[i].style.pointerEvents = "none"
    }
    
    nextbtn.disabled=false;
    
}

function handleUserDetail()
{
    const user = JSON.parse(localStorage.getItem("user"))
    const userName = document.querySelector("#userName")
    const userEmail = document.querySelector("#userEmail")
    userName.innerHTML = user.name 
    userEmail.innerHTML = user.email 

    
}