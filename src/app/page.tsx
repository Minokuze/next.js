"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/files", {
      method: "POST",
      body: formData,
    });

    alert("File uploaded successfully!");
  };

  return (
<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
  <div className="card shadow-xl w-full max-w-md bg-white p-6 rounded-lg">
    <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Upload XLSX File</h1>
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
      />
      <button
        className="btn btn-primary w-full mt-4"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  </div>
</div>

  );
}
