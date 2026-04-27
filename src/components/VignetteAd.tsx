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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.233 1.977 12.309 1.975 2.422 4.734 3.423 7.678 3.423 2.89 0 5.516-1.003 7.548-3.423 2.435-2.682 3.518-6.731 1.795-11.933-1.65-3.016-4.51-4.185-6.872-4.185-1.775 0-3.458.47-5.093 1.345m5.725 5.195c1.727.108 3.323.685 4.454 1.786 1.243 1.225 1.926 2.805 1.793 4.456-.135 1.65-.855 3.167-2.143 4.334-1.285 1.165-3.013 1.652-4.886 1.652-1.892 0-3.645-.487-4.943-1.652-1.305-1.167-2.008-2.678-2.175-4.334-.165-1.65.552-3.23 1.793-4.456 1.131-1.102 2.727-1.679 4.454-1.786M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5.034l-1.11 3.982 4.111-.957c1.437.448 2.968.683 4.531.683 5.523 0 10-4.477 10-10 0-5.522-4.477-10-10-10"/>
          </svg>
          Join our WhatsApp
        </a>
      </div>
    </div>
  );
};

export default VignetteAd;