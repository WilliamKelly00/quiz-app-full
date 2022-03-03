import { useState, useEffect } from "react"
import styles from '../styles/Quiz.module.css'

export default function Quiz() {
    const [quiz, setQuiz] = useState([]);
    const [number, setNumber] = useState(0);
    const [points, setPoints] = useState(0);

    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

    const pickAnswer = (e) => {
        e.preventDefault();
        let userAnswer = e.target.elements.answers.value;
        if (quiz[number].answer === userAnswer) setPoints(points + 50);
        setNumber(number + 1);
    }

    const getData = () =>{
        fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
            .then(res => res.json())
            .then(data => {
                console.log("api called!");
                setQuiz(data.results.map(item => (
                    {
                        question: item.question,
                        options: shuffle([...item.incorrect_answers, item.correct_answer]),
                        answer: item.correct_answer
                    }
                )));
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getData();
    }, []);


  return (
    <div>
        {quiz[number] &&
        <form className={styles.form} onSubmit={pickAnswer}>
        <div className={styles.question}>
        <h1 dangerouslySetInnerHTML={{__html: quiz[number].question}}></h1>
        </div>
        <h2>Points: {points}</h2>
            {quiz[number].options.map((item, index) =>(
                <label className={styles.btn} key={index}>
                    <input type="radio" name="answers" key={index} value={item}></input>
                    {item}
                </label>
            ))}
        <button className={styles.submitBtn} type="submit">Submit</button>
        </form>
        }

    </div>
  )
}
