import React, { useState, useEffect } from 'react';

// The API URL points to our backend service.
const API_URL = 'http://localhost:4000/api';

function App() {
  const [softwareList, setSoftwareList] = useState([]);
  const [name, setName] = useState('');
  const [licenses, setLicenses] = useState('');
  const [cost, setCost] = useState('');

  // Function to fetch the list of software from the backend
  const fetchSoftware = async () => {
    try {
      const response = await fetch(`${API_URL}/software`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setSoftwareList(data);
    } catch (error) {
      console.error("Failed to fetch software:", error);
    }
  };

  // This tells React to run fetchSoftware() once when the page loads
  useEffect(() => {
    fetchSoftware();
  }, []);

  // Function to handle submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    const newSoftware = { name, licenses: parseInt(licenses), cost: parseFloat(cost) };

    await fetch(`${API_URL}/software`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSoftware),
    });

    // Clear the form fields and refresh the list from the backend
    setName('');
    setLicenses('');
    setCost('');
    fetchSoftware();
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1>Simple Software Asset Management</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', gap: '10px' }}>
        <input type="text" placeholder="Software Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Licenses" value={licenses} onChange={(e) => setLicenses(e.target.value)} required />
        <input type="number" step="0.01" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} required />
        <button type="submit">Add Software</button>
      </form>
      <h2>Existing Software</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Licenses</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Cost</th>
          </tr>
        </thead>
        <tbody>
          {softwareList.map((software) => (
            <tr key={software.id}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{software.name}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{software.licenses}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>${parseFloat(software.cost).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;