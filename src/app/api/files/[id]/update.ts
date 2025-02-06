import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const fileId = params.id;
  const data = await req.json();

  // Update the modified rows
  for (const row of data) {
    await pool.query(
      "UPDATE file_contents SET last_name = ? WHERE id = ?",
      [row.last_name, row.id]
    );
  }

  return NextResponse.json({ success: true });
}
