export default function ProProgressCard() {
    return (
        <div className="rounded-2xl bg-[#1B6138] p-6 text-white shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
            {/* Background design glow element */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>

            <span className="text-[9px] font-extrabold uppercase tracking-widest text-white/70">PRO PROGRESS</span>
            <h3 className="text-2xl font-black mt-1 mb-3">Level 4</h3>
            
            <div className="w-full bg-black/20 rounded-full h-2 mb-3 overflow-hidden">
                <div className="bg-[#22C55E] h-2 rounded-full transition-all duration-1000 group-hover:w-[75%]" style={{ width: '65%' }}></div>
            </div>
            
            <p className="text-[11px] text-white/80">150 XP until Level 5 Master</p>
        </div>
    );
}