'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from server or localStorage
  const loadCart = useCallback(async () => {
    if (user) {
      try {
        const res = await api.get('/cart');
        setCart(res.data.data);
      } catch { /* ignore */ }
    } else {
      const local = localStorage.getItem('sv-cart');
      if (local) setCart(JSON.parse(local));
    }
  }, [user]);

  useEffect(() => { loadCart(); }, [loadCart]);

  // Save guest cart to localStorage
  useEffect(() => {
    if (!user) localStorage.setItem('sv-cart', JSON.stringify(cart));
  }, [cart, user]);

  const addToCart = async (product, size, quantity = 1) => {
    if (user) {
      try {
        setLoading(true);
        const res = await api.post('/cart', { productId: product._id, size, quantity });
        setCart(res.data.data);
        toast.success('Added to cart!');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to add');
      } finally { setLoading(false); }
    } else {
      setCart(prev => {
        const idx = prev.findIndex(i => i.product?._id === product._id && i.size === size);
        if (idx > -1) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + quantity };
          return updated;
        }
        return [...prev, { product, size, quantity, _id: Date.now().toString() }];
      });
      toast.success('Added to cart!');
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    if (user) {
      try {
        const res = await api.put(`/cart/${itemId}`, { quantity });
        setCart(res.data.data);
      } catch { toast.error('Update failed'); }
    } else {
      setCart(prev => prev.map(i => i._id === itemId ? { ...i, quantity } : i));
    }
  };

  const removeFromCart = async (itemId) => {
    if (user) {
      try {
        const res = await api.delete(`/cart/${itemId}`);
        setCart(res.data.data);
        toast.success('Removed from cart');
      } catch { toast.error('Remove failed'); }
    } else {
      setCart(prev => prev.filter(i => i._id !== itemId));
      toast.success('Removed from cart');
    }
  };

  const clearCart = async () => {
    if (user) {
      try { await api.delete('/cart'); } catch { /* ignore */ }
    }
    setCart([]);
    localStorage.removeItem('sv-cart');
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => {
    const price = i.product?.price || 0;
    return sum + price * i.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal, loadCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

// Day 10: Added server sync for authenticated users