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
      content: `🎯 Welcome to your Advanced AI Business Assistant powered by LLaMA 3.1!

I'm your comprehensive business companion specialized in the Nigerian market. Here's how I can transform your business operations:

🏢 **Business Registration & Compliance**
• Complete CAC registration guidance with step-by-step instructions
• Tax compliance strategies and FIRS requirements
• Business licensing for all sectors (NAFDAC, SON, CBN, etc.)
• Annual returns and regulatory filings

📊 **Strategic Business Planning**
• Market analysis and competitor research
• Business model development and validation
• Financial projections and budgeting
• Growth strategies and expansion planning

🔧 **Operational Excellence**
• HR policies and employment law guidance
• Process optimization and workflow design
• Quality management systems
• Risk assessment and mitigation strategies

💼 **Marketing & Sales**
• Digital marketing strategies for Nigerian audiences
• Brand positioning and messaging
• Sales funnel optimization
• Customer acquisition and retention tactics

📈 **Financial Management**
• Cash flow management and forecasting
• Investment guidance and funding options
• Cost optimization strategies
• Financial reporting and analysis

Ready to elevate your business? Ask me anything - from complex strategic questions to quick operational tips. Every response is tailored specifically for the Nigerian business environment with actionable insights you can implement immediately!

What business challenge shall we tackle together today? 🚀`
    }
  ]);

  const suggestions = [
    "Create a comprehensive CAC registration plan for my tech startup with all required documents and timelines",
    "Develop a complete business license checklist for opening a restaurant in Lagos with NAFDAC requirements",
    "Generate a detailed business plan template for an e-commerce platform targeting Nigerian consumers",
    "Design a professional invoice template with Nigerian tax compliance features and payment terms",
    "Create an HR handbook template covering Nigerian employment law and company policies",
    "Develop a marketing strategy for launching a fintech product in the Nigerian market"
  ];

  const callAIService = async (userMessage: string, conversationHistory: Message[]) => {
    try {
      const enhancedSystemPrompt = `You are an advanced AI business consultant specializing in Nigerian business operations with deep expertise across all sectors. Your responses should be:

COMPREHENSIVE & DETAILED:
- Provide extensive, actionable advice with specific steps
- Include relevant legal references and compliance requirements
- Offer multiple options and alternatives when applicable
- Give context about Nigerian market conditions and regulations

PRACTICAL & ACTIONABLE:
- Break down complex processes into clear steps
- Provide templates, checklists, and frameworks
- Include timelines and cost estimates where relevant
- Suggest specific tools, platforms, and resources

SECTOR-SPECIFIC EXPERTISE:
- Technology & Software (regulatory compliance, IP protection)
- E-commerce & Retail (licensing, consumer protection)
- Financial Services (CBN regulations, licensing)
- Healthcare (NAFDAC, professional licensing)
- Food & Beverage (NAFDAC, SON standards)
- Manufacturing (SON, environmental compliance)
- Professional Services (professional body requirements)

CURRENT & ACCURATE:
- Reference latest Nigerian business regulations (2024)
- Include current tax rates and compliance requirements
- Mention recent policy changes and their impact
- Provide updated contact information for regulatory bodies

FORMAT YOUR RESPONSES:
- Use clear headings and bullet points
- Include step-by-step procedures
- Add relevant templates or sample documents
- Provide cost estimates and timelines
- Include contact information for relevant agencies
- Suggest follow-up actions and next steps

Always end with specific next steps and offer to dive deeper into any aspect of your advice.`;

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: userMessage,
          conversationHistory: conversationHistory.slice(-10),
          systemPrompt: enhancedSystemPrompt
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
        { type: 'ai', content: "🔐 Authentication Required\n\nTo access our advanced AI business assistant with comprehensive Nigerian market insights, please log in to your account. Our AI features require authentication to provide personalized advice and consume tokens for premium responses.\n\n✨ Once logged in, you'll get:\n• Detailed, actionable business advice\n• Nigerian market-specific guidance\n• Legal compliance insights\n• Industry-specific recommendations\n• Professional document templates\n\nSign in now to unlock the full potential of your AI business consultant!" }
      ]);
      setMessage('');
      return;
    }

    const canConsume = await consumeTokens(1, 'ai_copilot', `AI Copilot consultation: "${message.substring(0, 50)}..."`);
    
    if (!canConsume) {
      setMessages(prev => [...prev, 
        { type: 'user', content: message },
        { type: 'ai', content: "💰 Token Balance Insufficient\n\nI'd love to provide you with comprehensive business advice, but you've run low on tokens. Our detailed AI responses require tokens to ensure you receive the highest quality, personalized guidance.\n\n🎯 What you're missing:\n• In-depth business analysis\n• Step-by-step implementation guides\n• Nigerian market insights\n• Professional templates and checklists\n• Regulatory compliance guidance\n\nUpgrade your plan or purchase additional tokens to continue receiving premium AI business consulting that can transform your operations!" }
      ]);
      setMessage('');
      return;
    }

    const userMessage = message;
    setMessage('');
    setIsLoading(true);

    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    try {
      const aiResponse = await callAIService(userMessage, messages);
      setMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: "🔧 Technical Difficulty - Temporary Service Interruption\n\nI apologize, but I'm experiencing technical difficulties connecting to our advanced AI systems. This appears to be a temporary issue with our LLaMA 3.1 processing engine.\n\n🔄 **What's happening:**\n• High server demand affecting response times\n• Temporary connectivity issues with our AI infrastructure\n• System maintenance may be in progress\n\n⚡ **Immediate solutions:**\n• Please try your question again in 30-60 seconds\n• For urgent business queries, check our Knowledge Hub for instant resources\n• Critical issues can be escalated through our support channels\n\n🛠️ **If this persists:**\nOur technical team is automatically notified of service interruptions. We typically resolve AI service issues within minutes. Your tokens have been preserved and not consumed for this failed request.\n\nThank you for your patience as we maintain our high-quality AI advisory services!" 
      }]);

      toast({
        title: "AI Service Temporarily Unavailable",
        description: "Our AI consultant is experiencing high demand. Please try again in a moment.",
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
              AI Business Consultant (LLaMA 3.1)
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
            <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-64">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg text-sm whitespace-pre-wrap ${
                    msg.type === 'user' 
                      ? 'bg-blue-900 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg text-sm flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" />
                    AI Consultant analyzing your request...
                  </div>
                </div>
              )}
            </div>

            {messages.length === 1 && !isLoading && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Professional business consultation examples (1 token each):</p>
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

            <div className="p-3 border-t bg-gray-50">
              {!user && (
                <div className="mb-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                  🔐 Sign in for comprehensive AI business consulting
                </div>
              )}
              {user && tokenBalance.availableTokens < 5 && (
                <div className="mb-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                  ⚠️ Low token balance! Upgrade for continued professional advice.
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={user ? "Ask your business question... (1 token)" : "Please sign in for AI consultation"}
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
