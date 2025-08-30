import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import api from "../lib/api";
import { toast } from "react-toastify";

type Note = { _id: string; title: string; };

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch {
        toast.error("Please login again");
        navigate("/signin");
      }
    })();
  }, []);

  const handleCreate = async () => {
    const title = prompt("Note title?");
    if (!title) return;
    try {
      const res = await api.post("/notes", { title });
      setNotes([...notes, res.data]);
    } catch {
      toast.error("Error creating note");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter(n => n._id !== id));
    } catch {
      toast.error("Error deleting note");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 bg-white border-b">
        <div className="container flex justify-between py-3">
          <div className="font-semibold">Dashboard</div>
          <button onClick={handleLogout} className="text-sm text-red-600">Sign out</button>
        </div>
      </header>

      <main className="container py-6 max-w-md">
        <Button onClick={handleCreate}>Create Note</Button>
        <div className="space-y-2 mt-4">
          {notes.map(n => (
            <div key={n._id} className="flex justify-between border p-2 rounded">
              <span>{n.title}</span>
              <button onClick={()=>handleDelete(n._id)} className="text-red-600">Delete</button>
            </div>
          ))}
          {notes.length === 0 && <p className="text-sm text-gray-500">No notes yet.</p>}
        </div>
      </main>
    </div>
  );
}
