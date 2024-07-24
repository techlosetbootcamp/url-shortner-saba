// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '../../../libs/prismadb';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/libs/AuthOptions';

// export async function POST(req: NextRequest) {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user || !session.user.email) {
//     return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
//   }

//   const { email, name } = await req.json();

//   if (!email || !name) {
//     return NextResponse.json({ message: 'Email and name are required' }, { status: 400 });
//   }

//   try {
//     // Fetch the user by email
//     const user = await prisma.user.findUnique({
//       where: { email: session.user.email as string },
//     });

//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     // Update user in the database by ID
//     await prisma.user.update({
//       where: { id: user.id },
//       data: { email, name },
//     });

//     // Respond with success message
//     return NextResponse.json({ message: 'User updated successfully. Please log in again.' }, { status: 200 });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }
