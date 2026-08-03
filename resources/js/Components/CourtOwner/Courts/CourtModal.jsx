export default function CourtModal({ isOpen, onClose, editingCourt, data, setData, errors, processing, onSubmit }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-extrabold text-gray-900">{editingCourt ? 'Edit Court' : 'Add New Court'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Court Name</label>
                        <input 
                            type="text" 
                            value={data.name} 
                            onChange={e => setData('name', e.target.value)}
                            placeholder="e.g., Court A (Indoor)" 
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                        />
                        {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Surface Type</label>
                        <input 
                            type="text" 
                            value={data.surface_type} 
                            onChange={e => setData('surface_type', e.target.value)}
                            placeholder="e.g., Indoor Acrylic, Concrete" 
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                        />
                        {errors.surface_type && <span className="text-xs text-red-500 mt-1 block">{errors.surface_type}</span>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Hourly Rate (₱)</label>
                        <input 
                            type="number" 
                            step="0.01"
                            value={data.hourly_rate} 
                            onChange={e => setData('hourly_rate', e.target.value)}
                            placeholder="800.00" 
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                        />
                        {errors.hourly_rate && <span className="text-xs text-red-500 mt-1 block">{errors.hourly_rate}</span>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Status</label>
                        <select 
                            value={data.status} 
                            onChange={e => setData('status', e.target.value)}
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#22C55E] focus:outline-none bg-white"
                        >
                            <option value="available">Available / Ready</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Description (Optional)</label>
                        <textarea 
                            value={data.description} 
                            onChange={e => setData('description', e.target.value)}
                            placeholder="Brief amenities or lighting notes..." 
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                            rows="2"
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50">
                            Cancel
                        </button>
                        <button type="submit" disabled={processing} className="rounded-xl bg-[#1B6138] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#154d2c] transition shadow-sm disabled:opacity-50">
                            {processing ? 'Saving...' : (editingCourt ? 'Update Court' : 'Save Court')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}