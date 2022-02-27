import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { useState, useEffect } from "react"

export default function Quiz() {
    const [quiz, setQuiz] = useState([]);
    const [number, setNumber] = useState(0);
    const [points, setPoints] = useState(0);

    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

    const pickAnswer = (e) => {
        let userAnswer = e.target.outerText;
        if (quiz[number].answer === userAnswer) setPoints(points + 1);
        setNumber(number + 1);
    }

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
            .then(res => res.json())
            .then(data => {
                setQuiz(data.results.map(item => (
                    {
                        question: item.question,
                        options: shuffle([...item.incorrect_answers, item.correct_answer]),
                        answer: item.correct_answer
                    }
                )));
            })
            .catch(err => console.error(err))
    }, []);


  return (
    <div>
        {quiz[number] &&
        <>
        <h1 dangerouslySetInnerHTML={{__html: quiz[number].question}}></h1>
        {quiz[number].options.map((item, index) =>(
            <h2 key={index} dangerouslySetInnerHTML={{__html: item}} onClick={pickAnswer}></h2>
            ))}
        </>
        }
    </div>
  )
}
