import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  const [rows] = await pool.query("SELECT id, filename, upload_date FROM files ORDER BY upload_date DESC");
  return NextResponse.json(rows);
}
