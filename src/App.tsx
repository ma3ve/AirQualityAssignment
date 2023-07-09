import { Container, Form } from 'semantic-ui-react'
import './App.css'
import CityForm from './CityForm'

function App() {
  return (
    <>
      <Container>
        <h1>Air Quality Assessment Tool</h1>
        <div className="twoCityForm">
          <CityForm />
          <CityForm />
        </div>
      </Container>
    </>
  )
}

export default App
