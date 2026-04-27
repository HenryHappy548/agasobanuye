import React from 'react';

const VignetteAd = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
      <div className="bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-gray-700 hover:border-blue-500 transition-all">
        <a
          href="https://omg10.com/4/10527776"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold hover:text-blue-400 transition-colors"
        >
          Earn with our supporters
        </a>
      </div>
      <div className="bg-green-600 text-white px-5 py-3 rounded-xl shadow-2xl border border-green-700 hover:border-green-500 transition-all">
        <a
          href="https://chat.whatsapp.com/L5TbbJMc77w83kv6JvUvyL"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold hover:text-green-300 transition-colors flex items-center gap-2"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="WhatsApp" 
            className="w-4 h-4"
          />
          Join our WhatsApp
        </a>
      </div>
    </div>
  );
};

export default VignetteAd;