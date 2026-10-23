import { test } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'

import { LandingPage } from '../support/pages/LandingPage'
import { OrderLockupPage } from '../support/pages/OrderLockupPage'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange
    const landingPage = new LandingPage(page)
    const orderLockupPage = new OrderLockupPage(page)

    await landingPage.goto()
    await landingPage.navbar.goToOrderLookup()
    await orderLockupPage.expectLoaded()
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-EP4AG0',
      status: 'APROVADO' as const,
      color: 'Glacier Blue',
      wheels: 'sport Wheels',
      customer: {
        name: 'pedro Oliveira',
        email: 'teste@teste.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-F3Y649',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'John Cena',
        email: 'test@123.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-412O06',
      status: 'EM_ANALISE' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Kendrick Lamar',
        email: 'Kendrick@test.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()

    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order)


    await orderLockupPage.validateOrderNotFound()

  })
})