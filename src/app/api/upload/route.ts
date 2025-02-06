import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read the file as a buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Store file in `files` table
    const [fileResult]: any = await pool.query(
      "INSERT INTO files (filename, upload_date, file_data) VALUES (?, NOW(), ?)",
      [file.name, buffer]
    );

    const fileId = fileResult.insertId;

    // Parse XLSX file and store data in `file_contents`
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.worksheets[0];

    const rows = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header
      rows.push([fileId, row.getCell(1).value, row.getCell(2).value, row.getCell(3).value]);
    });

    await pool.query(
      "INSERT INTO file_contents (file_id, first_name, last_name, email) VALUES ?",
      [rows]
    );

    return NextResponse.json({ message: "File uploaded successfully", fileId });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
