"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FileContent {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

const FileContentsPage = ({ params }: { params: { id: string } }) => {
  const fileId = params.id;
  const [fileData, setFileData] = useState<FileContent[]>([]);
  const [editedData, setEditedData] = useState<FileContent[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchFileData() {
      const response = await fetch(`/api/files/${fileId}`);
      const data = await response.json();
      setFileData(data);
      setEditedData(data); // Copy for editing
    }

    fetchFileData();
  }, [fileId]);

  const handleEdit = (index: number, key: keyof FileContent, value: string) => {
    const updated = [...editedData];
    updated[index][key] = value;
    setEditedData(updated);
  };

  const saveChanges = async () => {
    await fetch(`/api/files/${fileId}/update`, {
      method: "POST",
      body: JSON.stringify(editedData),
      headers: { "Content-Type": "application/json" },
    });
    router.refresh();
  };

  return (
    <div className="container mx-auto my-10 p-5">
      <h1 className="text-2xl font-bold mb-5">Edit File Data</h1>
      <table className="table w-full border">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name (Editable)</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {editedData.map((row, index) => (
            <tr key={row.id}>
              <td>{row.first_name}</td>
              <td>
                <input
                  className="border p-2 w-full"
                  value={row.last_name}
                  onChange={(e) => handleEdit(index, "last_name", e.target.value)}
                />
              </td>
              <td>{row.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary mt-4" onClick={saveChanges}>
        Save Changes
      </button>
    </div>
  );
};

export default FileContentsPage;
