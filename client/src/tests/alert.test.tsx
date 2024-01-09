import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Alert from '../components/alert'
import { SetStateAction } from 'react'

test('renders alert', () => {
  render(<Alert dismissAlert={function (value: SetStateAction<boolean>): void {} } message={'Alert Triggered!'} />)

  const element = screen.getByText('Alert Triggered!')

  expect(element).toBeDefined()

})

test('clicking the button on the alert calls event handler once', async () => {
    const mockHandler = jest.fn()
  
    render(<Alert dismissAlert={mockHandler} message={'Alert Triggered!'} />)

  
    const user = userEvent.setup()
    const button = screen.getByTestId('alertButton')
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)

  })