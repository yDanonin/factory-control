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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customerData: any = {
    status: 1,
    phone: "11968901260",
    cel_number: "11968901260",
    store_name: "Magalu",
    deliver: 1,
    pontalti: false,
    secondary_line: true,
    cpf: "52910452808",
    credit_limit: 1000,
    addressId: 1,
    collect: false
  };

  for (let i = 0; i < 10; i++) {
    customerData.email = `email${i}@gmail.com`;
    customerData.name = `customer${i}`;

    await dbClient.customers.create({
      data: customerData
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
