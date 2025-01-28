const Course = ({ course }) => {
  return(
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const Content = ({ parts }) => {
  return(
    <ul>
      {parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </ul>
  )
}

const Part = ({ part }) => (
  <li>
    {part.name} {part.exercises}
  </li>
)

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Total of {totalExercises} exercises</p>
}

export default Course