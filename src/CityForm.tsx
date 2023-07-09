import { Button, Form, Message } from 'semantic-ui-react'
import { useState } from 'react'
import axios from 'axios'
const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join(' ')
}

interface Props {
  onUpdate: (value: any) => void
}

function CityForm({ onUpdate }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [ApiCallError, setApiCallError] = useState('')
  const [resp, setResp] = useState<any>()

  const handleSubmit = async () => {
    if (!value) {
      setError('Please enter a city')
      return
    }
    try {
      setLoading(true)
      setApiCallError('')
      const resp = await axios.get(
        `https://api.openaq.org/v2/locations?city=${value}&city=${toTitleCase(
          value
        )}`,
        {
          params: {
            limit: 1,
          },
        }
      )
      if (resp.data.results.length === 0) {
        setApiCallError('No results found')
      } else {
        setApiCallError('')
        setResp(resp.data.results[0])
        onUpdate(resp.data.results[0])
      }
    } catch (error: any) {
      if (error.response) {
        setApiCallError(error.response.data.error as string)
      } else {
        setApiCallError((error.message as string) || 'something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="cityForm">
      <Form onSubmit={handleSubmit} error={!!ApiCallError} loading={loading}>
        <Form.Group widths="equal">
          <Form.Input
            error={error || false}
            fluid
            label="City 1"
            placeholder="Vancouver"
            onChange={(e) => {
              setError('')
              setValue(e.target.value)
            }}
          />
        </Form.Group>
        <Message error header="Error" content={ApiCallError} />
        <Form.Button>Get Air Quality</Form.Button>
      </Form>

      {resp && (
        <div className="cityForm">
          <h2>City: {resp.city}</h2>
          <h2>Country: {resp.country}</h2>
          {resp.parameters.map((param: any, i: number) => (
            <h2 key={i}>
              {param.displayName}: {param.count}
            </h2>
          ))}
        </div>
      )}
    </div>
  )
}

export default CityForm
