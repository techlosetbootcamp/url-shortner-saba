// pages/api/change-password.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../libs/prismadb';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    console.log('Request body:', request.body); // Log request body to check what's being sent

    const { token, newPassword } = await request.json();
    
    if (!token || !newPassword) {
      console.error('Token and newPassword are required');
      return NextResponse.json({ message: 'Token and newPassword are required' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({ where: { resetToken: token } });

    if (!user) {
      console.error('Invalid or expired token');
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { hashedPassword, resetToken: null },
    });

    console.log('Password changed successfully');
    return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error changing password:', error); // Log the full error object
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}