
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
    const { message, conversationHistory = [], systemPrompt, requestType = 'chat' } = await req.json()
    
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

    // Logo generation system prompt
    const logoSystemPrompt = `You are an expert logo designer and brand identity specialist with deep knowledge of design principles, typography, color theory, and visual branding.

YOUR EXPERTISE:
• Logo design principles (scalability, simplicity, memorability)
• Typography selection and pairing
• Color psychology and brand color schemes
• SVG code generation for geometric and text-based logos
• Brand identity development
• Industry-specific design conventions
• Nigerian market preferences and cultural considerations

RESPONSE FORMAT FOR LOGO GENERATION:
Provide exactly 3 distinct logo concepts in this JSON format:
{
  "logos": [
    {
      "id": 1,
      "style": "Logo Style Name",
      "description": "Detailed description of the concept",
      "colors": {
        "primary": "#hexcode",
        "secondary": "#hexcode",
        "text": "#hexcode"
      },
      "typography": "Font recommendation",
      "svgCode": "Complete SVG code for the logo",
      "rationale": "Why this design works for the business"
    }
  ],
  "brandGuidelines": {
    "colorPalette": ["#hex1", "#hex2", "#hex3"],
    "typography": "Primary font recommendation",
    "usage": "Guidelines for logo usage"
  }
}

LOGO DESIGN REQUIREMENTS:
• Generate actual SVG code that creates professional logos
• Use proper typography, geometric shapes, and design principles
• Consider scalability (logos must work at 16px and 300px)
• Include color variations (full color, monochrome, reversed)
• Provide meaningful rationale for each design choice
• Consider the Nigerian business environment and target market

SVG GUIDELINES:
• Use viewBox="0 0 200 60" for horizontal logos
• Keep designs clean and scalable
• Use proper typography and spacing
• Include business name in the design
• Make it professional and industry-appropriate`

    // Enhanced business consultation system prompt  
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

Always provide comprehensive, actionable advice that demonstrates deep expertise in Nigerian business operations.`

    // Choose system prompt based on request type
    const finalSystemPrompt = requestType === 'logo' ? logoSystemPrompt : (systemPrompt || defaultSystemPrompt)

    // Build conversation context
    const messages = [
      { role: 'system', content: finalSystemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ]

    console.log(`Sending ${requestType} request to Groq...`)

    // Call Groq API
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: messages,
        max_tokens: requestType === 'logo' ? 2000 : 1500,
        temperature: requestType === 'logo' ? 0.8 : 0.7,
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
    const aiResponse = data.choices[0]?.message?.content || 'I apologize, but I could not generate a response at this time. Please try again.'

    console.log(`Generated ${requestType} response successfully`)

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
