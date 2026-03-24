'use client';

import React, { useState } from 'react'; 

export default function Home() {
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation for CyberTrace format
    if (!flag.match(/^CyberTrace\{.*\}$/)) {
      setMessage('Invalid flag format. Expected: CyberTrace{...}');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');
    
    try {
      // Hash the user's input using Web Crypto API
      const encoder = new TextEncoder();
      const data = encoder.encode(flag.trim());
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Target hash for: CyberTrace{M4st3r_0f_N3tw0rk_F0r3ns1cs}
      const targetHash = '761903e986141b003b7a870c6ca3e0e38be0c8d6ff320a4c64180840d736a8f1';
      
      if (hashHex === targetHash) {
        setMessage('SUCCESS: Flag validated! You are a Master of Network Forensics.');
      } else {
        setMessage('ERROR: Invalid flag. Try again.');
      }
    } catch (error) {
      setMessage('ERROR: Validation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      {/* Matrix-style background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500 to-transparent animate-pulse"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-green-300 mb-4 tracking-wider">
            PHANTOM SEQUENCE
          </h1>
          <p className="text-gray-400 text-lg">Network Forensics CTF Challenge</p>
          <div className="w-full h-1 bg-green-500 mt-4"></div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          {/* Lore Section */}
          <section className="bg-gray-800 border border-green-500 p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-green-300">MISSION BRIEFING</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Welcome, Agent. You have been selected to investigate a critical security breach 
                at CyberTrace Corporation. Our network monitoring systems detected anomalous 
                traffic patterns that suggest a sophisticated data exfiltration attempt.
              </p>
              <p>
                The attackers used advanced steganographic techniques, TCP smuggling, and 
                AI-generated obfuscation to hide their tracks. Your mission is to analyze 
                the captured network traffic and uncover the hidden payload.
              </p>
              <p className="text-yellow-400">
                <strong>OBJECTIVE:</strong> Extract the hidden flag from the network artifacts 
                and submit it in the format: <span className="text-green-400">{"CyberTrace{...}"}</span>
              </p>
            </div>
          </section>
          {/* Download Section */}
          <section className="bg-gray-800 border border-green-500 p-6 mb-8 text-center">
            <h2 className="text-xl font-bold mb-4 text-green-300">CASE EVIDENCE</h2>
            <p className="text-gray-300 mb-6">
              Download the intercepted network traffic below to begin your investigation.
            </p>
            <a 
              href="/trace.pcapng" 
              download 
              className="inline-block px-8 py-4 bg-green-900 border-2 border-green-500 hover:bg-green-600 text-white font-bold tracking-widest transition-all animate-pulse"
            >
              [ DOWNLOAD TRACE.PCAPNG ]
            </a>
          </section>
          {/* Flag Submission */}
          <section className="bg-gray-800 border border-green-500 p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-300">FLAG VALIDATION</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="flag" className="block text-gray-300 mb-2">
                  Enter Flag:
                </label>
                <input
                  type="text"
                  id="flag"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-green-400 font-mono focus:outline-none focus:border-green-400"
                  placeholder="CyberTrace{your_flag_here}"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green-600 hover:bg-green-500 text-black font-bold transition-colors"
              >
                VALIDATE FLAG
              </button>
            </form>
            
            {message && (
              <div className={`mt-4 p-3 border text-center ${
                message.startsWith('SUCCESS') 
                  ? 'bg-green-900 border-green-600 text-green-300' 
                  : 'bg-red-900 border-red-600 text-red-300'
              }`}>
                {message}
              </div>
            )}
          </section>

        </main>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500 text-sm font-mono flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-4">
            <span>AUTHOR: Bouazzi</span>
            <span className="text-gray-700">|</span>
            <span>DIFFICULTY: <span className="text-yellow-500">INTERMEDIATE</span></span>
          </div>
        </footer>
      </div>
    </div>
  );
}