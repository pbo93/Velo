import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  
  // Locators

  // await page.locator('//label[text()="Número do Pedido"]/..//input').fill('VLO-6E2J20')
  // await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-6E2J20')
  // await page.getByLabel('Número do Pedido').fill('VLO-6E2J20')
  // await page.getByPlaceholder('Ex: VLO-ABCD10').fill('VLO-6E2J20')

  // Act
  await page.getByTestId('search-order-id').fill('VLO-EP4AG0')
  // await page.getByTestId('search-order-button').click() => comentado porque o codigo foi alterado para o desafio. A linha de codigo abaixo substitui a linha atual
  // await page.getByRole('button', { name: 'Buscar Pedido' }).click(); => esse e a acao para o mesmo botao porem usando xpath.
  await page.locator('//button[text()="Buscar Pedido"]').click();

  // Assert

  // await page.waitForTimeout(10000) // Thread sleep cy.wait(10000) => fuga do timeout padrao, usa o timeout explicito por funcionalidade citado na linha abaixo.
  // await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 10_000 }) // aqui ele vai ficar tentando até 10 segundos. Se ele conseguir encontrar antes de 10 segundos, ele continua. Se não, ele falha.
  // await expect(page.getByTestId('order-result-id')).toContainText('VLO-EP4AG0') // aqui ele vai verificar se o texto está presente no elemento.


  await expect(page.getByText('VLO-EP4AG0')).toBeVisible()
  await expect(page.getByText('VLO-EP4AG0')).toContainText('VLO-EP4AG0')


  // await expect(page.getByTestId('order-result-status')).toBeVisible() // aqui ele vai verificar se o elemento está visível.
  // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO') // aqui ele vai verificar se o texto está presente no elemento.

  await expect(page.getByText('APROVADO')).toBeVisible()
  await expect(page.getByText('APROVADO')).toContainText('APROVADO')
})
