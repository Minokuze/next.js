"use client";

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
      <h1 className="text-2xl font-bold mb-5">Uploaded Files</h1>
      <table className="table w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Filename</th>
            <th>Upload Date</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id}>
              <td>{file.id}</td>
              <td>
                <Link href={`/browse/${file.id}`} className="text-blue-500 hover:underline">
                  {file.filename}
                </Link>
              </td>
              <td>{new Date(file.upload_date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrowsePage;
