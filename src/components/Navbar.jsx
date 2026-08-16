import React from "react";

function Navbar({ currentUser, onLogout, onOpenAuth }) {
  return (
    <header className="w-full bg-white/70 backdrop-blur-md border-b border-amber-200/50 sticky top-0 z-40 mb-8 shadow-xs">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center lg:gap-3">
          <span className="font-serif text-xl font-medium tracking-tight text-gray-900">
            Campus Event Tracker
          </span>
        </div>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center lg:gap-3 lg:pl-3 border-l border-amber-200">
              <span className="text-xs font-medium text-amber-950 bg-amber-100/90 border border-amber-200/80 px-2.5 py-1 rounded-md">
                {currentUser.email}
              </span>
              <button
                onClick={onLogout}
                className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-xs font-medium text-amber-900 bg-amber-100 hover:bg-amber-200/80 px-3.5 py-1.5 rounded-lg border border-amber-200 transition-colors"
            >
              Sign In <span className="hidden sm:block"> / Register </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
