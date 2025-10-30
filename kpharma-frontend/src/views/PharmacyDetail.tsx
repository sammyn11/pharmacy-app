import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPharmacy } from '@/services/api';
import { useCartStore } from '@/store/cartStore';
import { MapView } from '@/ui/MapView';

export function PharmacyDetail() {
  const { id } = useParams();
  const [pharmacy, setPharmacy] = useState<any>();
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore(s => s.add);
  const [qtyByMed, setQtyByMed] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPharmacy(id).then(p => { setPharmacy(p as any); setLoading(false); });
  }, [id]);

  if (loading) return <div>Loading…</div>;
  if (!pharmacy) return <div>Not found</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{pharmacy.name}</h2>
        <Link to="/pharmacies" className="text-blue-700 text-sm">Back</Link>
      </div>
      <div className="text-sm text-gray-700">Sector: {pharmacy.sector}</div>
      <div className="text-sm text-gray-700">Insurance: {pharmacy.accepts.join(', ')}</div>
      <div className="text-sm text-gray-700">Delivery: {pharmacy.delivery ? 'Yes' : 'No'}</div>
      <MapView markers={[{ id: pharmacy.id, name: pharmacy.name, lat: pharmacy.lat, lng: pharmacy.lng }]} height={240} />
      <h3 className="font-medium mt-4">Available Medicines</h3>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2 border">Name</th>
            <th className="text-left p-2 border">Strength</th>
            <th className="text-left p-2 border">Price (RWF)</th>
            <th className="text-left p-2 border">Prescription</th>
            <th className="text-left p-2 border">Stock</th>
            <th className="text-left p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {pharmacy.stocks.map((s: any) => (
            <tr key={s.id} className="border-t align-middle">
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border">{s.strength}</td>
              <td className="p-2 border">{s.priceRWF.toLocaleString()}</td>
              <td className="p-2 border">{s.requiresPrescription ? 'Required' : 'No'}</td>
              <td className="p-2 border">{s.quantity > 0 ? `${s.quantity} in stock` : 'Out of stock'}</td>
              <td className="p-2 border">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={Math.max(1, s.quantity)}
                    value={qtyByMed[s.id] ?? 1}
                    onChange={(e) => setQtyByMed(prev => ({ ...prev, [s.id]: Math.max(1, Number(e.target.value || 1)) }))}
                    className="w-16 border rounded px-2 py-1"
                  />
                  <button
                    disabled={s.quantity <= 0}
                    onClick={() => addToCart({
                      pharmacyId: pharmacy.id,
                      medicineId: s.id,
                      name: `${s.name} ${s.strength}`,
                      priceRWF: s.priceRWF,
                      quantity: qtyByMed[s.id] ?? 1
                    })}
                    className={`px-3 py-1 rounded ${s.quantity <= 0 ? 'bg-gray-300 text-gray-600' : 'bg-blue-600 text-white'}`}
                  >Add to cart</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


