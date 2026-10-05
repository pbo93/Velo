import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'


// AAA - Arrange, Act, Assert


test.describe('Consulta Pedido', () => {

  test.beforeEach(async ({ page }) => {

    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    // const order = 'VLO-EP4AG0'

    const order = {
      number: 'VLO-EP4AG0',
      status: 'APROVADO',
      color: 'Glacier Blue',
      wheels: 'sport Wheels',
      customer: {
        name: 'pedro Oliveira',
        email: 'teste@teste.com'
      },
      payment: 'À Vista'
    }

    // Locators

    // await page.locator('//label[text()="Número do Pedido"]/..//input').fill('VLO-6E2J20')
    // await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-6E2J20')
    // await page.getByLabel('Número do Pedido').fill('VLO-6E2J20')
    // await page.getByPlaceholder('Ex: VLO-ABCD10').fill('VLO-6E2J20')

    // Act
    await page.getByTestId('search-order-id').fill(order.number)
    // await page.getByTestId('search-order-button').click() => comentado porque o codigo foi alterado para o desafio. A linha de codigo abaixo substitui a linha atual
    // await page.getByRole('button', { name: 'Buscar Pedido' }).click(); => esse e a acao para o mesmo botao porem usando xpath.
    await page.locator('//button[text()="Buscar Pedido"]').click()

    // Assert

    // await page.waitForTimeout(10000) // Thread sleep cy.wait(10000) => fuga do timeout padrao, usa o timeout explicito por funcionalidade citado na linha abaixo.
    // await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 10_000 }) // aqui ele vai ficar tentando até 10 segundos. Se ele conseguir encontrar antes de 10 segundos, ele continua. Se não, ele falha.
    // await expect(page.getByTestId('order-result-id')).toContainText('VLO-EP4AG0') // aqui ele vai verificar se o texto está presente no elemento.


    // await expect(page.getByText('VLO-EP4AG0')).toBeVisible()
    //await expect(page.getByText('VLO-EP4AG0')).toContainText(order)

    // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VL0-6E2J20"]')
    // await expect(orderCode).toBeVisible({timeout: 10_000})

    // const containerPedido = page.getByRole('paragraph')
    //  .filter({ hasText: /^Pedido$/ })
    //  .locator('..') //Sobe para o elemento pai (a div que agrupa ambos)

    // await expect(containerPedido).toContainText('VLO-EP4AG0', { timeout: 10_000 })


    // await expect(page.getByTestId('order-result-status')).toBeVisible() // aqui ele vai verificar se o elemento está visível.
    // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO') // aqui ele vai verificar se o texto está presente no elemento.

    // await expect(page.getByText('APROVADO')).toBeVisible()
    // await expect(page.getByText('APROVADO')).toContainText('APROVADO')

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    const statusBadge = page.getByRole('status').filter({ hasText: order.status })

    await expect(statusBadge).toHaveClass(/bg-green-100/)
    await expect(statusBadge).toHaveClass(/text-green-700/) // as barrinhas significam contem 

    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide lucide-circle-check-big/)
  })

  test('deve exibir mensagem quando o pedido nao e encontrado', async ({ page }) => {

    const order = generateOrderCode()

    // Act
    await page.getByTestId('search-order-id').fill(order)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // Assert
    // await expect(page.locator('#root')).toContainText('Pedido não encontrado'); o locator usando #root nao e confiavel
    // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente'); o locator usando #root nao e confiavel

    const title = page.getByRole('heading', { name: 'Pedido não encontrado' })
    await expect(title).toBeVisible()

    // const message = page.locator('//p[text()="Verifique o número do pedido e tente novamente"]') estrategia usando xpath puro
    const menssage = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente' }) // mesma coisa que o xpath porem um sintaxe nativa do playwrite
    await expect(menssage).toBeVisible()
    //esse metodo e o snapshot do codegen. e a mesma validacao do passo anterior mas e uma outra estrategia
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    // const order = 'VLO-F3Y649'

    const order = {
      number: 'VLO-F3Y649',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'John Cena',
        email: 'test@123.com'
      },
      payment: 'À Vista'
    }


    // Act
    await page.getByTestId('search-order-id').fill(order.number)
    await page.locator('//button[text()="Buscar Pedido"]').click()

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    const statusBadge = page.getByRole('status').filter({ hasText: order.status })

    await expect(statusBadge).toHaveClass(/bg-red-100/)
    await expect(statusBadge).toHaveClass(/text-red-700/) // as barrinhas significam contem 

    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide lucide-circle-x/)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data
    // const order = 'VLO-F3Y649'

    const order = {
      number: 'VLO-12TVZ8',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Kendrick Lamar',
        email: 'Kendrick@test.com'
      },
      payment: 'À Vista'
    }


    // Act
    await page.getByTestId('search-order-id').fill(order.number)
    await page.locator('//button[text()="Buscar Pedido"]').click()

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    const statusBadge = page.getByRole('status').filter({ hasText: order.status })

    await expect(statusBadge).toHaveClass(/bg-amber-100/)
    await expect(statusBadge).toHaveClass(/text-amber-700/) // as barrinhas significam contem 

    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide-clock-icon/)
  })
})


