import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";

function App() {
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [accountType, setAccountType] = useState("saver");
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  const handleAddEvent = async (newEvent) => {
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      if (res.ok) {
        const savedEvent = await res.json();
        setEvents([savedEvent, ...events]);
      }
    } catch (err) {
      console.error("Failed to add event:", err);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const res = await fetch(`/api/events${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEvents(events.filter((evt) => evt._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const normalEmail = formData.email.trim().toLowerCase();

    if (!normalEmail.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address (e.g., user@gmail.com).");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const userObj = {
      email: normalEmail,
      type: accountType,
    };

    setCurrentUser(userObj);
    localStorage.setItem("currentUser", JSON.stringify(userObj));

    setShowAuthModal(false);
    setFormData({ email: "", password: "" });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const visibleEvents = events.filter((evt) => {
    if (!evt.isPrivate) return true;
    return currentUser && evt.userEmail === currentUser.email;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-orange-100/60 text-gray-800">
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      <main className="max-w-6xl mx-auto px-6 py-4">
        <header className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-900 bg-amber-100/80 px-3 py-1 rounded-full">
            Campus Life
          </span>
          <h1 className="text-4xl font-serif font-medium text-gray-900 mt-3 mb-2">
            Event Directory
          </h1>
          <p className="text-sm text-gray-500">
            Discover upcoming campus activities and manage your personal
            schedule!
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <EventForm onAddEvent={handleAddEvent} currentUser={currentUser} />
          </div>

          <div className="lg:col-span-8">
            <EventList
              events={visibleEvents}
              onDeleteEvent={handleDeleteEvent}
              currentUser={currentUser}
            />
          </div>
        </div>
      </main>

      {showAuthModal && (
        <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl w-full max-w-sm">
            <h2 className="text-xl font-serif font-medium mb-4 text-gray-900">
              Sign In / Register
            </h2>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                  Gmail Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-gray-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="******"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-gray-50/50"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:bg-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-medium text-white bg-amber-900 rounded-lg hover:bg-amber-950 transition-colors"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
