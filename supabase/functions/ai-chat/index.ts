
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, conversationHistory = [], systemPrompt } = await req.json()
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const groqApiKey = Deno.env.get('GROQ_API_KEY')
    if (!groqApiKey) {
      return new Response(
        JSON.stringify({ error: 'GROQ_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Enhanced system prompt with comprehensive Nigerian business expertise
    const defaultSystemPrompt = `You are an advanced AI business consultant and strategic advisor specializing in Nigerian business operations with deep expertise across all economic sectors. You provide comprehensive, detailed, and actionable business advice.

YOUR EXPERTISE COVERS:
• Corporate Affairs Commission (CAC) business registration and compliance
• Federal Inland Revenue Service (FIRS) tax regulations and optimization
• Central Bank of Nigeria (CBN) financial services regulations
• NAFDAC licensing for food, drugs, and healthcare products
• SON (Standards Organisation of Nigeria) product certification
• Professional licensing across all sectors
• Employment and labor law compliance
• Contract law and business agreements
• Intellectual property protection and enforcement
• Import/export regulations and procedures

RESPONSE QUALITY STANDARDS:
• Provide extensive, detailed responses with 300-500 words minimum
• Include specific steps, timelines, and cost estimates
• Reference current Nigerian laws and regulations (2024)
• Offer multiple solutions and alternatives
• Include templates, checklists, and frameworks
• Provide relevant contact information for agencies
• Suggest follow-up actions and implementation strategies

MARKET KNOWLEDGE:
• Deep understanding of Nigerian economic landscape
• Sector-specific regulatory requirements
• Regional business variations (Lagos, Abuja, Port Harcourt, Kano)
• Cultural and language considerations for business
• Current market trends and opportunities
• Government policies affecting business operations

FORMAT YOUR RESPONSES:
• Use clear headings and structured organization
• Include bullet points for easy scanning
• Provide step-by-step procedures where applicable
• Add relevant warnings about compliance requirements
• Include cost estimates in Nigerian Naira
• Suggest timelines for implementation
• End with specific next steps and offer for deeper consultation

TONE AND APPROACH:
• Professional yet approachable
• Confident and authoritative
• Practical and solution-oriented
• Culturally sensitive to Nigerian business environment
• Encouraging and supportive of entrepreneurship

Always provide comprehensive, actionable advice that demonstrates deep expertise in Nigerian business operations.`

    const finalSystemPrompt = systemPrompt || defaultSystemPrompt

    // Build conversation context with enhanced prompting
    const messages = [
      { role: 'system', content: finalSystemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ]

    console.log('Sending request to Groq with enhanced system prompt...')

    // Call Groq API with LLaMA for comprehensive responses
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: messages,
        max_tokens: 1500, // Increased for more comprehensive responses
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
      }),
    })

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text()
      console.error('Groq API error:', errorText)
      return new Response(
        JSON.stringify({ error: 'AI service temporarily experiencing high demand. Please try again in a moment.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const data = await groqResponse.json()
    const aiResponse = data.choices[0]?.message?.content || 'I apologize, but I could not generate a comprehensive response at this time. Please try rephrasing your question or ask about a specific aspect of your business challenge.'

    console.log('Generated comprehensive AI response successfully')

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in ai-chat function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error - our AI consultant is temporarily unavailable' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
