
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Minimize2 } from 'lucide-react';

const AICopilot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "Hi! I'm your AI business assistant. I can help you with CAC registration, tax compliance, business planning, and more. What would you like to work on today?"
    }
  ]);

  const suggestions = [
    "Help me register my business with CAC",
    "What licenses do I need for my restaurant?",
    "Generate a business plan template",
    "Create an invoice template"
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages([...messages, 
      { type: 'user', content: message },
      { type: 'ai', content: "I understand you need help with that. Let me guide you through the process step by step..." }
    ]);
    setMessage('');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-14 h-14 shadow-lg"
        >
          <MessageCircle size={24} />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 w-80 md:w-96 transition-all duration-300 ${isMinimized ? 'h-14' : 'h-96'}`}>
      <Card className="h-full shadow-xl border-emerald-200">
        <CardHeader className="bg-emerald-600 text-white p-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageCircle size={16} />
              AI Business Assistant
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-emerald-700 h-6 w-6 p-0"
              >
                <Minimize2 size={12} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-emerald-700 h-6 w-6 p-0"
              >
                <X size={12} />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-64">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-2 rounded-lg text-sm ${
                    msg.type === 'user' 
                      ? 'bg-blue-900 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
                <div className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(suggestion)}
                      className="block w-full text-left text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded border text-gray-700"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about your business..."
                  className="flex-1 text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  <Send size={14} />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default AICopilot;
