import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 50; i++) {
    const free = Math.random() < 0.25;
    await prisma.product.create({
      data: {
        id: i + 1,
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.url(),
        description: faker.commerce.productDescription(),
      }
    })
  }


  /*await prisma.team.update({
    where: { Id: 2 },
    data: {
      players: {
        connect: [
          { Id: 2 },
          { Id: 4 },
          { Id: 5 },
          { Id: 10 },
          { Id: 11 },
        ]
      }
    }
  })*/
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
