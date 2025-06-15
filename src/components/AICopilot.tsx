
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Minimize2, Coins, Loader2 } from 'lucide-react';
import { useTokens } from '@/hooks/useTokens';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  type: 'user' | 'ai';
  content: string;
}

const AICopilot = () => {
  const { user } = useAuth();
  const { tokenBalance, consumeTokens } = useTokens();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content: "Hi! I'm your AI business assistant powered by LLaMA. I can help you with CAC registration, tax compliance, business planning, and more. What would you like to work on today?"
    }
  ]);

  const suggestions = [
    "Help me register my business with CAC",
    "What licenses do I need for my restaurant?",
    "Generate a business plan template",
    "Create an invoice template"
  ];

  const callAIService = async (userMessage: string, conversationHistory: Message[]) => {
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: userMessage,
          conversationHistory: conversationHistory.slice(-10) // Keep last 10 messages for context
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error('Failed to get AI response');
      }

      return data.response;
    } catch (error) {
      console.error('AI service error:', error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    if (!user) {
      setMessages(prev => [...prev, 
        { type: 'user', content: message },
        { type: 'ai', content: "Please log in to use the AI assistant. AI features require authentication and consume tokens." }
      ]);
      setMessage('');
      return;
    }

    const canConsume = await consumeTokens(1, 'ai_copilot', `AI Copilot message: "${message.substring(0, 50)}..."`);
    
    if (!canConsume) {
      setMessages(prev => [...prev, 
        { type: 'user', content: message },
        { type: 'ai', content: "Sorry, you don't have enough tokens to send this message. Please purchase more tokens or upgrade your subscription." }
      ]);
      setMessage('');
      return;
    }

    const userMessage = message;
    setMessage('');
    setIsLoading(true);

    // Add user message immediately
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    try {
      // Get AI response
      const aiResponse = await callAIService(userMessage, messages);
      
      // Add AI response
      setMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment. If the issue persists, our AI service might be temporarily unavailable." 
      }]);

      toast({
        title: "AI Service Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
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
              AI Assistant (LLaMA)
              {user && (
                <div className="flex items-center gap-1 text-xs bg-emerald-700 px-2 py-1 rounded">
                  <Coins size={12} />
                  {tokenBalance.availableTokens}
                </div>
              )}
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
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-2 rounded-lg text-sm flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" />
                    AI is thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Quick suggestions (1 token each):</p>
                <div className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded border text-gray-700"
                      disabled={!user || tokenBalance.availableTokens < 1}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 border-t bg-gray-50">
              {!user && (
                <div className="mb-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                  Please log in to use AI features
                </div>
              )}
              {user && tokenBalance.availableTokens < 5 && (
                <div className="mb-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                  Low token balance! Purchase more tokens to continue.
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={user ? "Ask me anything... (1 token)" : "Please log in first"}
                  className="flex-1 text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={!user || tokenBalance.availableTokens < 1 || isLoading}
                />
                <Button 
                  onClick={handleSendMessage} 
                  size="sm" 
                  className="bg-emerald-600 hover:bg-emerald-700"
                  disabled={!user || tokenBalance.availableTokens < 1 || isLoading || !message.trim()}
                >
                  {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
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
