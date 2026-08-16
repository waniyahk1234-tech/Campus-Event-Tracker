import React, { useState } from "react";

function EventForm({ onAddEvent, currentUser }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "Academic",
    location: "",
    description: "",
    isPrivate: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please sign in first to create an event!");
      return;
    }

    onAddEvent({
      ...formData,
      userEmail: currentUser.email,
    });

    setFormData({
      title: "",
      date: "",
      category: "Academic",
      location: "",
      description: "",
      isPrivate: false,
    });
  };

  if (!currentUser) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center">
        <h3 className="font-serif text-gray-900 font-bold mb-2">
          Organize Your Schedule
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-4">
          Sign in to add upcoming events to the directory or make private notes!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
      <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">
        Create Event
      </h2>
      <p className="text-xs text-gray-500 mb-6">
        Fill in the details below to create an event.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
            Title
          </label>
          <input
            type="text"
            required
            placeholder="Ex. 'Farewell Party 2026'"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-gray-50/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-gray-400 bg-gray-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-gray-400 bg-gray-50/50"
            >
              <option value="Academic">Academic</option>
              <option value="Tech">Tech</option>
              <option value="Social">Social</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
            Location
          </label>
          <input
            type="text"
            required
            placeholder="Ex. Stadium Road, Karachi"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-gray-400 bg-gray-50/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
            Description
          </label>
          <textarea
            rows="3"
            required
            placeholder="Write a few words about your event!"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-gray-400 bg-gray-50/50"
          ></textarea>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="isPrivate"
            checked={formData.isPrivate}
            onChange={(e) =>
              setFormData({ ...formData, isPrivate: e.target.checked })
            }
            className="rounded border-gray-300 text-amber-900 focus:ring-amber-900"
          />
          <label
            htmlFor="isPrivate"
            className="text-xs text-gray-600 cursor-pointer"
          >
            Keep this event private.
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 text-xs font-medium text-white bg-amber-900 rounded-lg hover:bg-amber-950 transition-colors mt-2"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}

export default EventForm;
