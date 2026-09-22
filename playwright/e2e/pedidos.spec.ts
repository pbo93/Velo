import { test, expect } from '@playwright/test'

test('deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  
  // Checkpoint 1: Verificar se o título da página está presente
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()

  // Checkpoint 2: Verificar se a página de consulta de pedido está presente
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  await page.getByTestId('search-order-id').fill('VLO-EP4AG0')

  await page.getByTestId('search-order-button').click()

  await expect(page.getByTestId('order-result-id')).toContainText('VLO-EP4AG0')

  await expect(page.getByTestId('order-result-status')).toBeVisible()

  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
})
