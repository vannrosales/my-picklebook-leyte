export default function AuthCard({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#F8FAF6]">
            <div className="w-full sm:max-w-md mt-6 px-8 py-8 bg-white shadow-lg border border-gray-100 overflow-hidden sm:rounded-2xl">
                {children}
            </div>
        </div>
    );
}