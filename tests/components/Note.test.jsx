import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from '../../src/components/Note.jsx'
import { test } from 'vitest'
import { expect } from 'vitest'
import { vi } from 'vitest'

test('renders contest',async () => {
  const note ={
    content: 'This is a test note',
    important: true
  }

  const toggleImportance = vi.fn()// funcion simulada

  render(<Note note={note} toggleImportance={toggleImportance} />)


  //screen.debug() // Esto imprime el DOM renderizado en la consola para depuración


  const user = userEvent.setup() // simula un usuario que interactua con la aplicacion
  const button = screen.getByText('make not important')// busca el boton con el texto 'make not important'
  await user.click(button) // simula un click en el boton por el usuario

  expect(toggleImportance.mock.calls).toHaveLength(1) // verifica que la funcion toggleImportance se haya llamado una vez
  // las llamadas a la fucnion simulada se alamcean en el array mock.calls, por lo que se puede verificar cuantas veces se ha llamado la funcion simulada
})