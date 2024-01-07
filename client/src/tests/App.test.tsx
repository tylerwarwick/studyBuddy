import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders App', () => {
  render(<App/>)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})