const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst(); // Encontra o primeiro usuário no banco de dados

  if (!user) {
    console.error("Nenhum usuário encontrado no banco de dados.");
    return;
  }

  await prisma.donation.deleteMany();

  const donations = new Array(40).fill(null).map((_, i) => ({
    title: "Doação " + i,
    species: "DOG",
    sex: "MALE",
    age: "ADULT",
    description: "Descrição da doação " + i,
    zipCode: "12345",
    status: "WAITING",
    userId: user.id,
  }));

  // Cria as doações no banco de dados
  for (let donation of donations) {
    await prisma.donation.create({
      data: donation,
    });
  }

  console.log("Seed de doações concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
