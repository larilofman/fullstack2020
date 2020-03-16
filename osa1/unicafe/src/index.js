import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const StatisticLine = ({ text, value }) => (
    <tr>
        <td>{text} </td>
        <td> {value}</td>
    </tr>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
    return (
        <div>
            <h1>Statistics</h1>
            {all === 0 ? <p>No feedback given</p> :
                <table>
                    <tbody>
                        <StatisticLine text="Good" value={good} />
                        <StatisticLine text="Neutral" value={neutral} />
                        <StatisticLine text="Bad" value={bad} />
                        <StatisticLine text="All" value={all} />
                        <StatisticLine text="Average" value={average} />
                        <StatisticLine text="Positive" value={positive} />
                    </tbody>
                </table>
            }
        </div>
    )
}



const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const all = good + neutral + bad
    const average = ((good - bad) / all).toFixed(1) || 0
    const positive = (good / all * 100).toFixed(1) + " %" || 0

    return (
        <div>
            <h1>Give feedback</h1>
            <Button onClick={() => setGood(good + 1)} text="Good" />
            <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
            <Button onClick={() => setBad(bad + 1)} text="Bad" />

            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                all={all}
                average={average}
                positive={positive} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

