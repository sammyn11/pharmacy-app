import { useState } from 'react';

export function Prescription() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'verifying' | 'approved'>('idle');

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setStatus('uploading');
    await new Promise(r => setTimeout(r, 500));
    setStatus('verifying');
    await new Promise(r => setTimeout(r, 1000));
    setStatus('approved');
  }

  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="text-xl font-semibold">Prescription Upload</h2>
      <input type="file" accept="image/*,application/pdf" onChange={onUpload} />
      {fileName && (
        <div className="text-sm text-gray-700">File: {fileName}</div>
      )}
      {status !== 'idle' && (
        <div className="text-sm">
          Status: {status === 'uploading' && 'Uploading…'}{status === 'verifying' && 'Verifying with pharmacy…'}{status === 'approved' && 'Approved'}
        </div>
      )}
    </div>
  );
}


