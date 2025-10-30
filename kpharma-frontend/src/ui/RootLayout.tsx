import { Link, Outlet, NavLink } from 'react-router-dom';

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg">KPharma</Link>
          <nav className="flex gap-6 text-sm">
            <NavLink to="/pharmacies" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-700'}>Pharmacies</NavLink>
            <NavLink to="/prescription" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-700'}>Prescription</NavLink>
            <NavLink to="/cart" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-700'}>Cart</NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center text-sm text-gray-500">
          © {new Date().getFullYear()} KPharma
        </div>
      </footer>
    </div>
  );
}


