import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';

export function Checkout() {
  const { total, clear } = useCartStore();
  const [delivery, setDelivery] = useState(true);
  const [address, setAddress] = useState('');
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState(false);

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setPlacing(true);
    await new Promise(r => setTimeout(r, 600));
    clear();
    setDone(true);
    setPlacing(false);
  }

  if (done) return <div className="space-y-2"><div className="text-green-700 font-medium">Order placed!</div><div className="text-sm text-gray-600">You will receive a confirmation from the pharmacy shortly.</div></div>;

  return (
    <form onSubmit={placeOrder} className="space-y-4 max-w-xl">
      <h2 className="text-xl font-semibold">Checkout</h2>
      <div className="flex gap-3 items-center">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={delivery} onChange={(e) => setDelivery(e.target.checked)} />
          Home Delivery
        </label>
      </div>
      {delivery && (
        <input value={address} onChange={(e) => setAddress(e.target.value)} required className="border rounded px-3 py-2 w-full" placeholder="Delivery address" />
      )}
      <div className="font-medium">Total: {total().toLocaleString()} RWF</div>
      <button disabled={placing} className="bg-blue-600 text-white rounded px-4 py-2">{placing ? 'Placing…' : 'Place Order'}</button>
    </form>
  );
}


