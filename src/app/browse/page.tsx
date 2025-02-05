"use client"; // Ensure it runs in the browser

import { useEffect, useState } from "react";
import Link from "next/link";

interface File {
  id: number;
  filename: string;
  upload_date: string;
}

const BrowsePage = () => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    async function fetchFiles() {
      const response = await fetch("/api/files");
      const data = await response.json();
      setFiles(data);
    }

    fetchFiles();
  }, []);

  return (
    <div className="container mx-auto my-10 p-5">
      <h1 className="text-3xl font-bold mb-6 text-center">📁 Uploaded Files</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-blue-500 text-white text-lg">
              <th>ID</th>
              <th>Filename</th>
              <th>Upload Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id} className="hover">
                <td>{file.id}</td>
                <td>
                  <Link href={`/browse/${file.id}`} className="text-blue-600 hover:underline">
                    {file.filename}
                  </Link>
                </td>
                <td>{new Date(file.upload_date).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-primary">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrowsePage;
