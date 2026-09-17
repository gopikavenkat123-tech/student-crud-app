import { useEffect, useMemo, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/students/";

const emptyForm = {
  student_id: "",
  name: "",
  department: "",
  email: "",
  phone: "",
  year: "1",
};

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Could not load students.");
      const data = await response.json();
      setStudents(data);
      setError("");
    } catch (err) {
      setError("Backend is not running. Start Django and refresh this page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter((student) =>
      [student.student_id, student.name, student.department, student.email]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [students, search]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError("");
    setMessage("");
  };

  const validate = () => {
    if (!form.student_id.trim()) return "Student ID is required.";
    if (!form.name.trim()) return "Name is required.";
    if (!form.department.trim()) return "Department is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email.";
    if (!/^\d{10}$/.test(form.phone)) return "Phone must contain exactly 10 digits.";
    if (![1, 2, 3, 4].includes(Number(form.year))) return "Year must be between 1 and 4.";
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = { ...form, year: Number(form.year) };
    const url = editingId ? `${API_URL}${editingId}/` : API_URL;
    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const firstError = Object.values(data)[0];
        throw new Error(Array.isArray(firstError) ? firstError[0] : "Request failed.");
      }

      setMessage(editingId ? "Student updated successfully." : "Student added successfully.");
      setError("");
      setForm(emptyForm);
      setEditingId(null);
      await loadStudents();
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setForm({
      student_id: student.student_id,
      name: student.name,
      department: student.department,
      email: student.email,
      phone: student.phone,
      year: String(student.year),
    });
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setMessage("");
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await fetch(`${API_URL}${id}/`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed.");
      setMessage("Student deleted successfully.");
      setError("");
      await loadStudents();
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">FULL-STACK CRUD APPLICATION</p>
          <h1>Student Management System</h1>
          <p className="subtitle">React + Django REST Framework + SQLite</p>
        </div>
        <div className="stat">
          <strong>{students.length}</strong>
          <span>Total Students</span>
        </div>
      </header>

      <main className="container">
        <section className="card form-card">
          <div className="section-heading">
            <div>
              <h2>{editingId ? "Edit Student" : "Add Student"}</h2>
              <p>{editingId ? "Update the selected record." : "Enter student details below."}</p>
            </div>
            {editingId && <button className="secondary" onClick={cancelEdit}>Cancel Edit</button>}
          </div>

          {message && <div className="alert success">{message}</div>}
          {error && <div className="alert error">{error}</div>}

          <form onSubmit={handleSubmit} className="form-grid">
            <label>
              Student ID
              <input name="student_id" value={form.student_id} onChange={handleChange} placeholder="STU001" />
            </label>
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} placeholder="Student name" />
            </label>
            <label>
              Department
              <input name="department" value={form.department} onChange={handleChange} placeholder="Computer Science" />
            </label>
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="student@example.com" />
            </label>
            <label>
              Phone
              <input inputMode="numeric" name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" />
            </label>
            <label>
              Year
              <select name="year" value={form.year} onChange={handleChange}>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </label>
            <button className="primary full" type="submit">
              {editingId ? "Update Student" : "Add Student"}
            </button>
          </form>
        </section>

        <section className="card">
          <div className="section-heading list-heading">
            <div>
              <h2>Student Records</h2>
              <p>Search, edit, or delete saved records.</p>
            </div>
            <input className="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..." />
          </div>

          {loading ? (
            <div className="empty">Loading...</div>
          ) : filteredStudents.length === 0 ? (
            <div className="empty">No student records found.</div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td><strong>{student.student_id}</strong></td>
                      <td>{student.name}</td>
                      <td>{student.department}</td>
                      <td>{student.email}</td>
                      <td>{student.phone}</td>
                      <td>{student.year}</td>
                      <td className="actions">
                        <button className="edit" onClick={() => startEdit(student)}>Edit</button>
                        <button className="delete" onClick={() => deleteStudent(student.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <footer>
        Student Management System • CRUD Project
      </footer>
    </div>
  );
}

export default App;
