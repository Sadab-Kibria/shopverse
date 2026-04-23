import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log("🔍 API: Fetching users...");
    
    // Simple query to test
    const allUsers = await db.select().from(users);
    
    console.log(`✅ API: Found ${allUsers.length} users`);
    
    // Return the data
    return NextResponse.json({
      success: true,
      count: allUsers.length,
      users: allUsers
    });
    
  } catch (error) {
    console.error('❌ API Error:', error);
    
    // Return a proper error response
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch users',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}