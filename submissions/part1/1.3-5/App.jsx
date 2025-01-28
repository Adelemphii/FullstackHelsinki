const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts = {course.parts}/>
      <Total parts={course.parts}/>
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
    props.parts.map(part => (
      <Part part={part.name} exerciseCount={part.exercises}/>
    ))
  )
}

const Total = (props) => {
  let totalExercises = 0
  props.parts.map(part => (
    totalExercises += part.exercises
  ))
  
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