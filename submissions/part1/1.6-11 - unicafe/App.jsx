import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const header = 'Give Feedback'

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header={header}/>
      <Button onClick={handleGood} text='Good'/>
      <Button onClick={handleNeutral} text='Neutral'/>
      <Button onClick={handleBad} text='Bad'/>
      <Header header='Statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let sum = good + neutral + bad
  let average = ((good * 1) + (neutral * 0) + (bad * -1)) / sum
  let positive = `${((good / sum) * 100)}%`

  if(sum === 0) {
    return(
      <p>No feedback has been given.</p>
    )
  }

  return(
    <table>
      <tbody>
        <StatisticLine text='Good' value={good}/>
        <StatisticLine text='Neutral' value={neutral}/>
        <StatisticLine text='Bad' value={bad}/>
        <StatisticLine text='Total' value={sum}/>
        <StatisticLine text='Average' value={average}/>
        <StatisticLine text="Positive" value={positive} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Header = ({header}) => {
  return(
    <h1>
      {header}
    </h1>
  )
}

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}



export default App