import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const tewodros = await prisma.user.create({
    data: {
      username: 'Tewodros',
      email: 'tewodros@example.com',
    },
  });

  const josi = await prisma.user.create({
    data: {
      username: 'Josi',
      email: 'josi@example.com',
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
      { userId: tewodros.id, roomId: room.id },
      { userId: josi.id, roomId: room.id },
    ],
  });

  // Add sample message
  await prisma.message.create({
    data: {
      senderId: tewodros.id,
      roomId: room.id,
      content: 'Hello Josi!',
    },
  });

  console.log('\nSeeded:');
  console.log('Tewodros ID:', tewodros.id);
  console.log('Josi ID:  ', josi.id);
  console.log('Room ID: ', room.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
