import { NextResponse } from "next/server";
import pool from "@/lib/db";
import formidable from "formidable";
import fs from "fs/promises";

export const config = { api: { bodyParser: false } };

export async function GET() {
  const [rows] = await pool.query("SELECT id, filename, upload_date FROM files");
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const form = formidable();
  const [fields, files] = await form.parse(req);

  const file = files.file[0];
  const fileData = await fs.readFile(file.filepath);

  await pool.query("INSERT INTO files (filename, file_data) VALUES (?, ?)", [
    file.originalFilename,
    fileData,
  ]);

  return NextResponse.json({ message: "File uploaded successfully!" });
}
