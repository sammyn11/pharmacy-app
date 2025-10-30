import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchPharmacies } from '@/services/api';
import type { Pharmacy } from '@/services/data';
import { MapView } from '@/ui/MapView';

export function Pharmacies() {
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Pharmacy[]>([]);

  const queryParams = useMemo(() => ({
    q: params.get('q') || undefined,
    loc: params.get('loc') || undefined,
    insurance: params.get('insurance') || undefined,
  }), [params]);

  useEffect(() => {
    setLoading(true);
    searchPharmacies(queryParams).then(res => {
      setItems(res);
      setLoading(false);
    });
  }, [queryParams]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Pharmacies</h2>
      <MapView markers={items.map(p => ({ id: p.id, name: p.name, lat: p.lat, lng: p.lng }))} />
      <div className="flex gap-3 text-sm">
        <FilterLink label="All" toParams={{ ...queryParams, insurance: undefined }} active={!queryParams.insurance} />
        <FilterLink label="RSSB" toParams={{ ...queryParams, insurance: 'RSSB' }} active={queryParams.insurance === 'RSSB'} />
        <FilterLink label="Mutuelle" toParams={{ ...queryParams, insurance: 'Mutuelle' }} active={queryParams.insurance === 'Mutuelle'} />
        <FilterLink label="Private-A" toParams={{ ...queryParams, insurance: 'Private-A' }} active={queryParams.insurance === 'Private-A'} />
        <FilterLink label="Private-B" toParams={{ ...queryParams, insurance: 'Private-B' }} active={queryParams.insurance === 'Private-B'} />
      </div>
      {loading ? (
        <div>Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-gray-600">No pharmacies found. Try changing filters.</div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((p) => (
            <li key={p.id} className="bg-white border rounded p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Link to={`/pharmacies/${p.id}`} className="font-medium text-blue-700">{p.name}</Link>
                <span className="text-xs text-gray-600">{p.sector}</span>
              </div>
              <div className="text-sm text-gray-700">Insurance: {p.accepts.join(', ')}</div>
              <div className="text-sm text-gray-700">Delivery: {p.delivery ? 'Yes' : 'No'}</div>
              {queryParams.q ? (
                <div className="text-sm">
                  Matching medicine: {p.stocks.filter(s => s.name.toLowerCase().includes((queryParams.q || '').toLowerCase())).map(s => `${s.name} ${s.strength} — ${s.quantity > 0 ? 'In Stock' : 'Out'}`).join('; ')}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterLink({ label, toParams, active }: { label: string; toParams: Record<string, string | undefined>; active: boolean }) {
  const search = new URLSearchParams();
  if (toParams.q) search.set('q', toParams.q);
  if (toParams.loc) search.set('loc', toParams.loc);
  if (toParams.insurance) search.set('insurance', toParams.insurance);
  const to = `/pharmacies?${search.toString()}`;
  return (
    <Link to={to} className={`px-3 py-1 rounded border ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700'}`}>{label}</Link>
  );
}


