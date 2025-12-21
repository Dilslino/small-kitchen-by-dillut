import React, { useEffect } from 'react';
import type { MochiVariant } from '../constants';
import { X, Minus, Plus } from 'lucide-react';

type Quantities = Record<string, number>;

function formatRupiah(amount: number) {
  return `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;
}

function clampQty(next: number) {
  if (!Number.isFinite(next)) return 0;
  return Math.max(0, Math.min(99, Math.floor(next)));
}

export const MochiOrderModal: React.FC<{
  open: boolean;
  variants: MochiVariant[];
  quantities: Quantities;
  onChangeQty: (variantId: string, nextQty: number) => void;
  onClose: () => void;
  onOrder: () => void;
}> = ({ open, variants, quantities, onChangeQty, onClose, onOrder }) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const items = variants
    .map((v) => {
      const qty = quantities[v.id] ?? 0;
      const lineTotal = qty * v.price;
      return { ...v, qty, lineTotal };
    })
    .filter((v) => v.qty > 0);

  const totalQty = items.reduce((sum, v) => sum + v.qty, 0);
  const grandTotal = items.reduce((sum, v) => sum + v.lineTotal, 0);
  const canOrder = totalQty > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative w-full max-w-md mx-auto bg-white/80 backdrop-blur-2xl border border-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.18)] rounded-t-[28px] sm:rounded-[28px] p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-heading text-xl font-bold text-brand-dark">Pilih Mochi</h2>
            <p className="font-sans text-xs text-gray-500 mt-1">Pilih varian dan jumlah, lalu klik pesan.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/60 border border-white/70 shadow-sm flex items-center justify-center active:scale-95 transition"
            aria-label="Tutup"
          >
            <X size={18} className="text-brand-dark" />
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {variants.map((v) => {
            const qty = quantities[v.id] ?? 0;
            return (
              <div
                key={v.id}
                className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-br from-white/70 to-white/40 border border-white/70"
              >
                <div className="min-w-0">
                  <div className="font-heading font-bold text-brand-dark truncate">{v.label}</div>
                  <div className="font-sans text-xs text-gray-500 mt-0.5">{formatRupiah(v.price)} / pcs</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onChangeQty(v.id, clampQty(qty - 1))}
                    className="w-10 h-10 rounded-full bg-white/70 border border-white/70 shadow-sm flex items-center justify-center active:scale-95 transition"
                    aria-label={`Kurangi ${v.label}`}
                  >
                    <Minus size={16} className="text-brand-dark" />
                  </button>

                  <input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={qty}
                    onChange={(e) => onChangeQty(v.id, clampQty(Number(e.target.value)))}
                    className="w-14 h-10 rounded-xl bg-white/70 border border-white/70 text-center font-heading font-bold text-brand-dark outline-none"
                    aria-label={`Jumlah ${v.label}`}
                  />

                  <button
                    type="button"
                    onClick={() => onChangeQty(v.id, clampQty(qty + 1))}
                    className="w-10 h-10 rounded-full bg-white/70 border border-white/70 shadow-sm flex items-center justify-center active:scale-95 transition"
                    aria-label={`Tambah ${v.label}`}
                  >
                    <Plus size={16} className="text-brand-dark" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-white/70 to-white/40 border border-white/70">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs text-gray-500">Total item</span>
            <span className="font-heading font-bold text-brand-dark">{totalQty}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="font-sans text-xs text-gray-500">Total harga</span>
            <span className="font-heading font-bold text-pink-500">{formatRupiah(grandTotal)}</span>
          </div>

          {items.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/70">
              <div className="font-sans text-[11px] text-gray-500 mb-2">Rincian</div>
              <div className="space-y-1">
                {items.map((it) => (
                  <div key={it.id} className="flex items-center justify-between gap-3">
                    <span className="font-sans text-xs text-gray-700 truncate">{it.label} x{it.qty}</span>
                    <span className="font-sans text-xs text-gray-700 whitespace-nowrap">{formatRupiah(it.lineTotal)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onOrder}
          disabled={!canOrder}
          className={
            "mt-5 w-full h-12 rounded-2xl font-heading font-bold text-sm tracking-wide transition-all " +
            (canOrder
              ? "bg-gradient-to-br from-pink-400 via-rose-400 to-orange-300 text-white shadow-lg active:scale-[0.99]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed")
          }
        >
          Pesan via WhatsApp
        </button>
      </div>
    </div>
  );
};
