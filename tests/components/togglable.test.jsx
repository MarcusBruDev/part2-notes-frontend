import { render , screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from '../../src/components/Togglable.jsx'
import { test ,describe ,expect , vi ,beforeEach } from 'vitest'


describe('<Togglable />', () => {
  let container
  //La funcion beforeEach se ejecuta antes de cada prueba, por lo que se renderiza el componente Togglable antes de cada prueba
  //Esto permite que cada prueba tenga un estado limpio y no se vea afectada por las pruebas anteriores
  beforeEach(() => {
    // container guarda el DOM renderizado del componente Togglable, lo que permite acceder a los elementos del DOM y verificar su estado
    // render es una funcion que renderiza el componente en el DOM virtual de testing-library/react
    // screen es un objeto que contiene los elementos del DOM renderizado, lo que permite acceder a los elementos del DOM y verificar su estado
    // screen es una forma de acceder a los elementos del DOM renderizado sin necesidad de usar container.querySelector
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">
            Togglable content
        </div>
      </Togglable>
    ).container
  })


  test('renders its children',async () => {
    // screen es un objeto que contiene los elementos del DOM renderizado, lo que permite acceder a los elementos del DOM y verificar su estado
    // screen.querySelectorAll es una funcion que busca todos los elementos del DOM que coinciden con el selector CSS pasado como argumento
    await screen.findAllByText('Togglable content')  // espera a que el contenido togglable se renderice

  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('adter clicking the button, children are displayed', async () => {
    const user = userEvent.setup() // simula un usuario que interactua con la aplicacion
    const button = screen.getByText('show...') // busca el boton con el texto 'show...'
    await user.click(button) // simula un click en el boton por el usuario
    const div = container.querySelector('.togglableContent') // busca el div con la clase 'togglableContent'
    expect(div).not.toHaveStyle('display: none') // verifica que el div no tenga el estilo 'display: none'
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('Cancel')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none') // verifica que el div tenga el estilo 'display: none' despues de hacer click en el boton Cancel

  })


})


