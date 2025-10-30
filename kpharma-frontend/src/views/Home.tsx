import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('loc', location);
    navigate(`/pharmacies?${params.toString()}`);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Find medicine in Kigali</h1>
      <form onSubmit={onSearch} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="Search medicine (e.g., Amoxicillin)"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="Location (e.g., Kacyiru)"
        />
        <button className="bg-blue-600 text-white rounded px-4 py-2">Search</button>
      </form>
      <p className="text-gray-600 text-sm">Search results will show stock availability and insurance acceptance before you go.</p>
    </div>
  );
}


