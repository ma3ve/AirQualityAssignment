import { Button, Container, Form } from 'semantic-ui-react'
import './App.css'
import CityForm from './CityForm'
import { useState } from 'react'

function App() {
  const [value1, setValue1] = useState<any>()
  const [value2, setValue2] = useState<any>()
  const [showComparison, setShowComparison] = useState(false)

  console.log({ value1, value2 })
  const compare = () => {
    if (value1.parameters[0].count === value2.parameters[0].count)
      return 'both cities are equal'
    if (value1.parameters[0].count > value2.parameters[0].count) {
      return `${value2.city} is better than ${value1.city} by ${
        value1.parameters[0].count - value2.parameters[0].count
      } ${value1.parameters[0].unit}`
    } else {
      return `${value1.city} is better than ${value2.city} by ${
        value2.parameters[0].count - value1.parameters[0].count
      } ${value1.parameters[0].unit}`
    }
  }
  return (
    <>
      <Container>
        <h1>Air Quality Assessment Tool</h1>
        <div className="twoCityForm">
          <CityForm onUpdate={(value) => setValue1(value)} />
          <CityForm onUpdate={(value) => setValue2(value)} />
        </div>
        <Button onClick={() => value1 && value2 && setShowComparison(true)}>
          COMPARE
        </Button>
        <h1>{showComparison && value1 && value2 && compare()}</h1>
      </Container>
    </>
  )
}

export default App
