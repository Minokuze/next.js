// app/api/delete/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const fileId = params.id;

  await pool.query("DELETE FROM files WHERE id = ?", [fileId]);

  return NextResponse.json({ message: "File deleted successfully." });
}
