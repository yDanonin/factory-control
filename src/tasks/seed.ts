// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require("@prisma/client");

const dbClient = new PrismaClient();

async function seed() {
  const addressesData = [
    {
      zip_code: "12345-678",
      neighborhood: "Bairro1",
      public_place: "Rua A",
      city: "Cidade1",
      state: "Estado1"
    }
  ];

  for (const address of addressesData) {
    await dbClient.adresses.create({
      data: address
    });
  }
}

seed()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await dbClient.$disconnect();
    process.exit(0);
  });
