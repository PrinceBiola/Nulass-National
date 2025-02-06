import React from 'react';
import { Dialog } from '@headlessui/react';
import { CheckCircleIcon, AlertTriangle, X } from 'lucide-react';

const StatusModal = ({ isOpen, onClose, type = 'success', message }) => {
  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex flex-col items-center">
            {/* Icon */}
            <div className={`rounded-full p-2 ${
              type === 'success' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {type === 'success' ? (
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-red-600" />
              )}
            </div>

            {/* Title */}
            <Dialog.Title className={`mt-4 text-xl font-semibold ${
              type === 'success' ? 'text-green-900' : 'text-red-900'
            }`}>
              {type === 'success' ? 'Success!' : 'Oops!'}
            </Dialog.Title>

            {/* Message */}
            <div className="mt-2 text-center">
              <p className="text-gray-600">{message}</p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                  type === 'success' 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {type === 'success' ? 'Done' : 'Try Again'}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default StatusModal; 