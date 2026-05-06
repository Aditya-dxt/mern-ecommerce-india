'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlineSearch } from 'react-icons/hi';
import api from '@/lib/api';
import Image from 'next/image';

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/search/autocomplete?q=${encodeURIComponent(query)}`);
        setResults(res.data.data);
      } catch { setResults([]); }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timerRef.current);
  }, [query]);

  const handleSelect = (id) => {
    router.push(`/products/${id}`);
    onClose?.();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
      onClose?.();
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <HiOutlineSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
        <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search sneakers, brands..."
          className="input pl-11 pr-4" style={{ borderRadius: 'var(--radius-full)' }} />
      </form>
      {results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 rounded-xl overflow-hidden glass-strong"
          style={{ border: '1px solid var(--border-color)', maxHeight: 360, overflowY: 'auto' }}>
          {results.map(p => (
            <button key={p._id} onClick={() => handleSelect(p._id)}
              className="flex items-center gap-3 w-full p-3 text-left hover:bg-[var(--surface-hover)] transition-colors">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
                style={{ background: 'var(--surface)' }}>
                <div className="w-full h-full flex items-center justify-center text-xs" style={{ color: 'var(--muted)' }}>
                  {p.brand?.charAt(0)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{p.name}</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{p.brand} · ${p.price}</p>
              </div>
            </button>
          ))}
        </div>
      )}
      {loading && query.length >= 2 && (
        <div className="absolute top-full mt-2 left-0 right-0 p-4 text-center text-sm rounded-xl glass-strong"
          style={{ color: 'var(--muted)', border: '1px solid var(--border-color)' }}>
          Searching...
        </div>
      )}
    </div>
  );
}
