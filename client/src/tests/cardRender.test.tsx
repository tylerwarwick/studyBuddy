import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CardRender from '../components/cardRender'
import { ICard } from '../types/card'

const Card : ICard = {
    id : 'someId',
    question : "How old is the earth?",
    answer : "4.5 billion years",
    isKnown : false,
    deck : "history"
  }


test('renders card', () => {
  render(<CardRender displayText={Card.question} func={()=>{}}/>)

  const element = screen.getByText('How old is the earth?')

  expect(element).toBeDefined()

})

test('clicking the card calls the event handler', async () => {
    const mockHandler = jest.fn()
  
    render(<CardRender displayText={Card.question} func={mockHandler}/>)
  
    const user = userEvent.setup()
    const button = screen.getByTestId('cardToggle')
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  })