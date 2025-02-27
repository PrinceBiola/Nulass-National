import React, { useState } from 'react';
import { FaTimes, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { createEvent } from '../../api/event';

function AddEventModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateImageUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate image URL
    if (!validateImageUrl(formData.image)) {
      setError('Please enter a valid image URL');
      setLoading(false);
      return;
    }

    try {
      await createEvent(formData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-4xl my-8">
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b sticky top-0 bg-white rounded-t-xl z-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Create New Event</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            aria-label="Close modal"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Event Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent transition-all"
                  required
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Conference">Conference</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Meetup">Meetup</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent transition-all resize-none"
                  required
                  placeholder="Enter event description"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaCalendarAlt className="inline mr-2" />
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent transition-all"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaClock className="inline mr-2" />
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent transition-all"
                  required
                  placeholder="Enter event location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent transition-all"
                  required
                  placeholder="Enter image URL"
                />
                {formData.image && (
                  <div className="mt-2 rounded-lg overflow-hidden">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        setError('Invalid image URL');
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="hidden lg:block">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preview
              </label>
              <div className="border rounded-lg p-4">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Event preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image URL provided
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold">{formData.title || 'Event Title'}</h3>
                  <p className="text-sm text-gray-600 mt-2">{formData.description || 'Event description will appear here'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 pt-4 border-t sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2 bg-customGreen text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                'Create Event'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEventModal;
