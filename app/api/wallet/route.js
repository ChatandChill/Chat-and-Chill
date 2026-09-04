import { NextResponse } from 'next/server';
export async function POST(req){
  const body = await req.json();
  const userId = body.userId;
  return NextResponse.json({ userId: userId, balance_naira: 500000, type: 'Benefit Not Bank' });
}
export async function GET(){
  return NextResponse.json({ ok: true });
}
