import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const fileId = params.id;
  const [rows] = await pool.query("SELECT * FROM file_contents WHERE file_id = ?", [fileId]);

  if (!rows.length) {
    return NextResponse.json({ error: "No data found" }, { status: 404 });
  }

  return NextResponse.json(rows);
}
