import { pharmacies, Pharmacy } from './data';

export interface SearchParams {
  q?: string;
  loc?: string;
  insurance?: string;
}

export async function searchPharmacies(params: SearchParams): Promise<Pharmacy[]> {
  const { q, loc, insurance } = params;
  let results = pharmacies;
  if (loc) {
    results = results.filter(p => p.sector.toLowerCase().includes(loc.toLowerCase()));
  }
  if (insurance) {
    results = results.filter(p => p.accepts.map(a => a.toLowerCase()).includes(insurance.toLowerCase()));
  }
  if (q) {
    results = results.filter(p => p.stocks.some(s => s.name.toLowerCase().includes(q.toLowerCase())));
  }
  // Simulate network
  await new Promise(r => setTimeout(r, 200));
  return results;
}

export async function getPharmacy(id: string): Promise<Pharmacy | undefined> {
  await new Promise(r => setTimeout(r, 150));
  return pharmacies.find(p => p.id === id);
}


