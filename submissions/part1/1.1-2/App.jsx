const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    'Fundamentals of React',
    'Using props to pass data',
    'State of a component'
  ]
  const exerciseCounts = [10, 7, 14]

  return (
    <div>
      <Header course={course}/>
      <Content 
        parts = {parts}
        exercises = {exerciseCounts}
      />
      <Total exerciseCounts={exerciseCounts}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    props.parts.map((part, index) => (
      <Part part={part} exerciseCount={props.exercises[index]}/>
    ))
  )
}

const Total = (props) => {
  const totalExercises = props.exerciseCounts.reduce((sum, count) => sum + count, 0);
  
  return (
    <p>Number of exercises {totalExercises}</p>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exerciseCount}</p>
  )
}

export default App