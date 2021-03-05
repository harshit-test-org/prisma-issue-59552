const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
	const child = await prisma.child.upsert({
		where: { id: 789 },
		update: {},
		create: {
			id: 789,
		},
	});

	const child2 = await prisma.child.upsert({
		where: { id: 1111 },
		update: {},
		create: {
			id: 1111,
		},
	});
	const parent = await prisma.parent.upsert({
		where: { id: 123456 },
		update: {},
		create: {
			id: 123456,
			childId: 789,
		},
	});
	const parent2 = await prisma.parent.upsert({
		where: { id: 22222 },
		update: {},
		create: {
			id: 22222,
			childId: 1111,
		},
	});

	console.log({ parent, parent2, child, child2 });
}
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
