import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import pool from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const fileId = params.id;

  // Fetch filtered data
  const [rows] = await pool.query("SELECT first_name, last_name, email FROM file_contents WHERE file_id = ?", [fileId]);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Filtered Data");

  // Add headers
  worksheet.addRow(["First Name", "Last Name", "Email"]);

  // Add data rows
  rows.forEach((row: any) => {
    worksheet.addRow([row.first_name, row.last_name, row.email]);
  });

  // Convert to buffer
  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Disposition": `attachment; filename="filtered_data.xlsx"`,
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  });
}
