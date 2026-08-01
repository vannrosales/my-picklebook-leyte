import { Link } from '@inertiajs/react';

export default function Navbar({ auth }) {
    return (
        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
            <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#22C55E] tracking-tight hover:opacity-90 transition-opacity cursor-pointer">
                    PickleBook Leyte
                </span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="/browse-courts" className="text-black hover:text-[#22C55E] transition-colors duration-200">Browse Courts</a>
                <a href="#subscription" className="hover:text-[#22C55E] transition-colors duration-200">Subscription</a>
            </nav>
            <div className="flex items-center gap-4">
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                        className="rounded-lg bg-[#22C55E] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1eb053] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="text-sm font-medium text-black hover:text-[#22C55E] transition-colors duration-200"
                        >
                            Login
                        </Link>
                        <Link
                            href={route('register')}
                            className="rounded-full bg-[#22C55E] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1eb053] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}