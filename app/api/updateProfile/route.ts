// // app/api/updateProfile/route.ts

// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(request: Request) {
//   try {
//     const { email, newName, newEmail } = await request.json();

//     if (!email || !newName || !newEmail) {
//       return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
//     }

//     const user = await prisma.user.findFirst({ where: { email } });
//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     const updatedUser = await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         name: newName,
//         email: newEmail,
//       },
//     });

//     return NextResponse.json(updatedUser);
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }


// app/api/updateProfile/route.ts

// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(request: Request) {
//   try {
//     const { email, newName, newEmail } = await request.json();

//     if (!email || !newName || !newEmail) {
//       return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
//     }

//     const user = await prisma.user.findFirst({ where: { email } });
//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     const updatedUser = await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         name: newName,
//         email: newEmail,
//       },
//     });

   

//     return NextResponse.json({
//       message: 'Profile updated successfully',
//       user: updatedUser,
   
//     });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }



//  for updation in both user and url

// app/api/updateProfile/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {


    
    const { email, newName, newEmail } = await request.json();

    if (!email || !newName || !newEmail) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Start a transaction
    await prisma.$transaction(async (prisma) => {
      // Update the user's email and name
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: newName,
          email: newEmail,
        },
      });

      // Update URLs associated with the old email
      await prisma.url.updateMany({
        where: { userEmail: email },
        data: { userEmail: newEmail },
      });
    });

    return NextResponse.json({
      message: 'Profile and associated URLs updated successfully',
      user: {
        ...user,
        name: newName,
        email: newEmail,
      },
    });
  } catch (error) {
    console.error('Error updating user and URLs:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
