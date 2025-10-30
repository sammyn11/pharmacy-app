import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';

export function Cart() {
  const { items, remove, clear, total, setQuantity, add } = useCartStore();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Cart</h2>
      {items.length === 0 ? (
        <div className="text-gray-600">Your cart is empty.</div>
      ) : (
        <>
          <ul className="divide-y bg-white border rounded">
            {items.map((i) => (
              <li key={`${i.pharmacyId}-${i.medicineId}`} className="p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">{i.name}</div>
                  <div className="text-sm text-gray-600">{i.priceRWF.toLocaleString()} RWF each</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 border rounded" onClick={() => setQuantity(i.pharmacyId, i.medicineId, i.quantity - 1)}>-</button>
                  <input className="w-14 border rounded px-2 py-1 text-center" type="number" min={1} value={i.quantity} onChange={(e) => setQuantity(i.pharmacyId, i.medicineId, Number(e.target.value || 1))} />
                  <button className="px-2 py-1 border rounded" onClick={() => add({ ...i, quantity: 1 })}>+</button>
                </div>
                <div className="w-28 text-right font-medium">{(i.priceRWF * i.quantity).toLocaleString()} RWF</div>
                <button className="text-red-600 text-sm" onClick={() => remove(i.pharmacyId, i.medicineId)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <div className="font-medium">Total: {total().toLocaleString()} RWF</div>
            <div className="flex gap-2">
              <button className="px-3 py-2 border rounded" onClick={clear}>Clear</button>
              <Link to="/checkout" className="px-4 py-2 rounded bg-blue-600 text-white">Checkout</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


