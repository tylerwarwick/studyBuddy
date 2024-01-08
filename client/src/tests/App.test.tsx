import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders content', () => {

  render(<App/>)

  const element = screen.getByText('Login')
  expect(element).toBeDefined()
})