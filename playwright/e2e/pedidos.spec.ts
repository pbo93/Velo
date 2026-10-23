import { generateOrderCode } from '../support/helpers'

import { test } from '../support/fixtures'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ app }) => {
    // Arrange
    await app.orderLookup.open()
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {

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
    await app.orderLookup.searchOrder(order.number)

    // Assert
    await app.orderLookup.validateOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await app.orderLookup.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ app }) => {

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
    await app.orderLookup.searchOrder(order.number)

    // Assert
    await app.orderLookup.validateOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {

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
    await app.orderLookup.searchOrder(order.number)

    // Assert
    await app.orderLookup.validateOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {

    const order = generateOrderCode()

    await app.orderLookup.searchOrder(order)


    await app.orderLookup.validateOrderNotFound()

  })
})
