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
      state: "Estado1",
      complement: "Complemento1",
      address_number: 1
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
    deliver: true,
    pontalti: false,
    secondary_line: true,
    credit_limit: 1000,
    addressId: 1
  };

  for (let i = 0; i < 10; i++) {
    customerData.email = `${i}email${i}@gmail.com`;
    customerData.name = `John Snow ${i}`;
    customerData.document = `1555555555${i}`;

    await dbClient.customers.create({
      data: customerData
    });
  }
}

seed()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await dbClient.$disconnect();
    process.exit(0);
  });
