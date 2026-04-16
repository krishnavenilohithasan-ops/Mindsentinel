import React, { useState, useEffect, useRef } from 'react';

const AIInsights = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I am MindSentinel, your AI Focus Guardian. How are you feeling today?", sender: "ai" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if(!input.trim()) return;
    
    // Optimistic UI update
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text })
      });
      const data = await response.json();
      
      if(response.ok) {
        setMessages(prev => [...prev, { text: data.reply, sender: 'ai' }]);
      } else {
        throw new Error("Failed");
      }
    } catch(err) {
      console.log('API Failed, using intelligent local logical tree for hackathon demo');
      setTimeout(() => {
        let reply = "I'm here to support your focus and productivity. Try meditating for 5 minutes.";
        const mTrim = userMessage.text.toLowerCase();
        
        if (mTrim.includes("tired")) {
            reply = "You seem mentally tired. Let's take a short break and reset your focus. Even small 5 minute breaks help deeply.";
        } else if (mTrim.includes("focus better")) {
            reply = "Start with a distraction-free environment, use focus sessions like 25 minutes, and take regular breaks. Maintaining a good sleep schedule prevents burnout.";
        } else if (mTrim.includes("burned out")) {
            reply = "Take proper rest and reduce your working hours. Protect your mental health above all else right now.";
        }
        
        setMessages(prev => [...prev, { text: reply, sender: 'ai' }]);
        setIsTyping(false);
      }, 1200);
      return; 
    }
    
    setIsTyping(false);
  };

  const handleQuickQuestion = (text) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full max-w-4xl mx-auto rounded-xl overflow-hidden bg-[#1c212a] border border-[#2d3440] shadow-2xl relative shadow-purple-500/5">
      
      {/* HEADER */}
      <div className="bg-[#161a23] px-6 py-4 border-b border-[#2d3440] flex items-center gap-4">
        <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full flex items-center justify-center text-xl shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <i className="fa-solid fa-robot"></i>
        </div>
        <div>
          <h2 className="text-white font-bold text-lg">MindSentinel AI Coach</h2>
          <p className="text-green-400 text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Online & Context Aware
          </p>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 no-scrollbar scroll-smooth">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none shadow-lg'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex justify-start">
             <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
             </div>
           </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* QUICK ACTIONS */}
      <div className="px-6 py-2 flex gap-2 flex-wrap text-xs">
         <span className="text-gray-500 font-bold self-center mr-2">Suggestions:</span>
         {["Why am I tired?", "How to focus better?", "Am I burned out?"].map(q => (
            <button 
              key={q}
              onClick={() => handleQuickQuestion(q)}
              className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              {q}
            </button>
         ))}
      </div>

      {/* INPUT BOX */}
      <div className="p-4 bg-[#161a23] border-t border-[#2d3440]">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about your focus or burnout..."
            className="w-full bg-[#12151e] border border-[#2d3440] text-gray-200 rounded-xl pl-5 pr-14 py-4 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-2 bottom-2 w-10 text-white bg-purple-500 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
