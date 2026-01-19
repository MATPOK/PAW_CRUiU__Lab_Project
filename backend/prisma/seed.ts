import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const departmentNames = [
  'IT',
  'HR',
  'Sprzedaz',
  'Marketing',
  'Logistyka',
  'Finanse',
  'Administracja',
  'R&D',
  'Dzial Prawny',
  'Obsluga Klienta',
];

const firstNames = ['Adam', 'Piotr', 'Krzysztof', 'Tomasz', 'Pawel', 'Michal', 'Maciej', 'Jakub', 'Anna', 'Maria', 'Katarzyna', 'Malgorzata', 'Agnieszka', 'Barbara', 'Ewa', 'Krystyna'];
const lastNames = ['Nowak', 'Kowalski', 'Wisniewski', 'Wojcik', 'Kowalczyk', 'Kaminski', 'Lewandowski', 'Zielinski', 'Krepa', 'Wozniak'];

const deviceTypes = [
  { type: 'Laptop (Dell XPS)', price: 9000 },
  { type: 'Laptop (MacBook Pro)', price: 12000 },
  { type: 'Laptop (ThinkPad)', price: 7500 },
  { type: 'Monitor (Dell 27)', price: 1500 },
  { type: 'Monitor (LG Ultrawide)', price: 2200 },
  { type: 'Telefon (iPhone 15)', price: 4500 },
  { type: 'Telefon (Samsung S24)', price: 4200 },
  { type: 'Tablet (iPad)', price: 3000 },
  { type: 'Drukarka', price: 1200 },
  { type: 'Myszka + Klawiatura', price: 600 },
];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  await prisma.device.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.department.deleteMany();

  const departments: any[] = []; 
  
  for (let i = 0; i < 10; i++) {
    const dept = await prisma.department.create({
      data: {
        name: departmentNames[i],
        location: `Pietro ${getRandomInt(1, 5)}`,
      },
    });
    departments.push(dept);
  }


  const employees: any[] = [];

  for (let i = 0; i < 50; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const dept = getRandomElement(departments);

    const emp = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@firma.pl`,
        departmentId: dept.id,
      },
    });
    employees.push(emp);
  }


  for (let i = 0; i < 100; i++) {
    const deviceTemplate = getRandomElement(deviceTypes);
    const isAssigned = Math.random() > 0.2; 
    let employeeId = null;

    if (isAssigned) {
      const randomEmployee = getRandomElement(employees);
      employeeId = randomEmployee.id;
    }

    await prisma.device.create({
      data: {
        serialNumber: `SN-${1000 + i}`,
        type: deviceTemplate.type,
        price: deviceTemplate.price,
        purchaseDate: new Date(2023, getRandomInt(0, 11), getRandomInt(1, 28)),
        employeeId: employeeId,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });