import { useState,useEffect } from "react/cjs/react.development"
import useSound from "use-sound";
import play from '../sounds/play.mp3'
import correct from '../sounds/correct.mp3'
import wrong from '../sounds/wrong.mp3'

export default function Trivia({
    data,
    setStop,
    setQuestionNumber,
    questionNumber
}){

    const [question,setQuestion] = useState(null);
    const [selectedAnwer,setSelectedAnwer] = useState(null);
    const [className,setClassName] = useState("answer");
    const [letsPlay] = useSound(play)
    const [correctAnswer] = useSound(correct)
    const [wrongAnswer] = useSound(wrong)

    // useEffect(() => {
    //     letsPlay();
    //   }, [letsPlay]);

    useEffect(() => {
        setQuestion(data[questionNumber - 1])
           
    }, [data,questionNumber])
    const delay = (duration,callback) => {
        setTimeout(() => {
            callback()
        }, duration);
    }
    const handleClick = (a) => {
        setSelectedAnwer(a);
        setClassName("answer active");
        delay(3000,()=> {
            setClassName(`answer ${a.correct?"correct":"wrong"}`)
        });
        delay(5000,()=> {
            if(a.correct){
                correctAnswer()
                delay(1000,()=>{
                    setQuestionNumber(prev => prev+1);
                    setSelectedAnwer(null)
                })
                
            }else{
                wrongAnswer()

                delay(1000,()=>{
                    setStop(true)

                })
            }
        });
      
    }
    return (
        <div className="trivia">
            <div className="question">
                {question?.question}
            </div>
            <div className="answers">
                {question?.answers.map(a => (
                    <div key={a.text} className={selectedAnwer === a? className: "answer"} onClick={() => handleClick(a)}>
                    {a.text}
                    </div>
                ))}
                
                
            </div>
        </div>
    )
}
