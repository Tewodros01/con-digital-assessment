import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const alice = await prisma.user.create({
    data: {
      username: 'Alice',
      email: 'alice@example.com',
    },
  });

  const bob = await prisma.user.create({
    data: {
      username: 'Bob',
      email: 'bob@example.com',
    },
  });

  // Create room
  const room = await prisma.room.create({
    data: {
      name: 'Private Chat',
      isGroup: false,
    },
  });

  // Add participants to room
  await prisma.roomParticipant.createMany({
    data: [
      { userId: alice.id, roomId: room.id },
      { userId: bob.id, roomId: room.id },
    ],
  });

  // Optional: Add sample message
  await prisma.message.create({
    data: {
      senderId: alice.id,
      roomId: room.id,
      content: 'Hello Bob!',
    },
  });

  console.log('\n Seeded:');
  console.log('Alice ID:', alice.id);
  console.log('Bob ID:  ', bob.id);
  console.log('Room ID: ', room.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
