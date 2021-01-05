import {MainMenu} from './MainMenu.js';

class Question {
    constructor(questions) {
        this.currentQuestion;
        this.questions = questions
    }

    getQuestion() {
        const index = Math.floor(Math.random() * this.questions.length)
        this.currentQuestion = this.questions[index];
        this.questions.splice(index, 1);
        console.log(this.questions);
        const data = fetch(`https://api.spoonacular.com/recipes/guessNutrition?title=${this.currentQuestion.apiTitle}&apiKey=08dba6e965974fdb9c6a8cc7b0f8f4f0`)
            .then( res => res.json() )
            .then ( data => {
                const calories = data.calories.value
                this.currentQuestion.calories = calories
                this.currentQuestion.minCalories = calories - 0.1 * calories
                this.currentQuestion.maxCalories = calories + 0.1 * calories
                console.log(this.currentQuestion)
            })
            .catch( error => console.log(error))
        return this.currentQuestion
    }
    
    checkAnswer(answer) {
        if (this.currentQuestion.calories == "undefined") console.log('za szybko')
        answer = parseInt(answer)
        const minCalories = this.currentQuestion.minCalories
        const maxCalories = this.currentQuestion.maxCalories
        if (answer > minCalories && answer < maxCalories) return true
        else return false
    }

    getPoints(answer) {
        const difference = Math.round(this.currentQuestion.calories - this.currentQuestion.minCalories)
        const points = Math.abs(Math.round(Math.abs(answer - this.currentQuestion.calories) / difference * 100) - 100)
        console.log(difference, points)
        return points
    }
}


class Stats {
    constructor(points) {
        this.points = points
    }

    addPoints(newPoints) {
        let i = 0;
        const addingPoints = setInterval(() => {
            if (i === newPoints - 1) clearInterval(addingPoints);
            i++;
            this.points++;
            document.querySelector(".score").textContent = this.points;  
        }, 15)
    }
}

class Timer {
    constructor(time) {
        this.time = time
        this.timeLeft = this.time
        this.timer
    }

    startTimer(question) {
        document.querySelector(".timer").classList.add("active")
        this.timer = setInterval( () => {
            this.timeLeft -= 1
            if (this.timeLeft === 0) {
                this.stopTimer()
                game.getResult(question)
                return true
            }
        }, 1000)
    }
    getTimeLeft() {
        return this.timeLeft
    }

    stopTimer() {
        clearInterval(this.timer)
        document.querySelector(".timer").classList.remove("active")
    }
}

class Game {
    constructor() {
        MainMenu()
        this.questions = [
            {"name":"Banana bread","imgSrc":"/static/assets/img/banana-bread.jpg","apiTitle":"banana+bread"},
            {"name":"Spaghetti carbonara","imgSrc":"/static/assets/img/carbonara.jpg","apiTitle":"spaghetti+carbonara"},
            {"name":"Cheesecake","imgSrc":"/static/assets/img/cheesecake.jpg","apiTitle":"cheesecake"},
            {"name":"Chicken pad thai","imgSrc":"/static/assets/img/chicken-pad-thai.jpg","apiTitle":"chicken+pad+thai"},
            {"name":"Chocolate brownie","imgSrc":"/static/assets/img/chocolate-brownie.jpg","apiTitle":"chocolate+brownie"},
            {"name":"Hamburger","imgSrc":"/static/assets/img/hamburger.jpg","apiTitle":"Hamburger"},
            {"name":"Spaghetti aglio et olio","imgSrc":"/static/assets/img/spaghetti-aglio-olio.jpg","apiTitle":"spaghetti+aglio+olio"},
            {"name":"Spaghetti bolognese","imgSrc":"/static/assets/img/spaghetti-bolognese.jpg","apiTitle":"spaghetti+bolognese"},
            {"name":"Strawberry shake","imgSrc":"/static/assets/img/strawberry-shake.jpg","apiTitle":"strawberry+shake"},
            {"name":"Vanilla ice cream","imgSrc":"/static/assets/img/vanilla-ice-cream.jpg","apiTitle":"vanilla+ice+cream"},
        ]
        this.startBtn = document.querySelector(".start")
        this.questionSection = document.querySelector(".question")
        this.imgInput = document.querySelector(".dish-img")
        this.dishNameInput = document.querySelector(".dish-name")
        this.checkBtn = document.querySelector(".submit")
        this.answerInput = document.querySelector(".answer")
        this.correctAnswer = document.querySelector(".correct-answer")

        this.stats = new Stats(0)
        
        this.startBtn.addEventListener("click", this.startRound.bind(this), {once: true})

        // this.sumUpRoundFunction
    }

    showQuestionSection() {
        this.questionSection.classList.add("active")
    }

    startRound() {
        this.reset()
        const question = new Question(this.questions)
        const timer = new Timer(15)
        if (!this.questionSection.classList.contains("active")) this.showQuestionSection()
        const currentQuestion = question.getQuestion()
        this.imgInput.src = currentQuestion.imgSrc
        this.dishNameInput.textContent = currentQuestion.name
        timer.startTimer(question)

        this.sumUpRoundFunction = this.sumUpRound.bind(this, question, timer)
        this.checkBtn.addEventListener("click", this.sumUpRoundFunction, {once: true})  
    }

    sumUpRound(question, timer, e) {
        e.preventDefault();
        timer.stopTimer();
        const result = question.checkAnswer(this.answerInput.value)
        const timeLeft = timer.getTimeLeft()
        this.getResult(question, result)
    }

    getResult(question, result) {
        this.checkBtn.removeEventListener("click", this.sumUpRoundFunction)
        if (result) {
            this.correctAnswer.textContent = `Correct answer is: ${question.currentQuestion.calories}.`
            this.imgInput.classList.add("true")
            const points = question.getPoints(+this.answerInput.value)
            console.log(points)
            this.stats.addPoints(points)
            if (this.questions.length < 1) console.log("koniec gry")
            else setTimeout(this.startRound.bind(this), points * 15 + 1000)
        } else {
            this.imgInput.classList.add("false")
            this.correctAnswer.textContent = `Correct answer is: ${question.currentQuestion.calories}.`
            if (this.questions.length < 1) console.log("koniec gry")
            else setTimeout(this.startRound.bind(this), 1000)
        }
    }

    reset() {
        this.correctAnswer.textContent = "";
        this.answerInput.value = "";
        this.imgInput.classList.remove("false");
        this.imgInput.classList.remove("true");
    }
}

const game = new Game() 