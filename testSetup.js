import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

import '@testing-library/jest-dom/vitest'


afterEach(() => {
  cleanup() // Limpiar el DOM después de cada prueba para evitar efectos secundarios entre pruebas
})