
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

    // Social media content generation system prompt
    const socialMediaSystemPrompt = `You are an expert social media content creator and marketing strategist specializing in Nigerian market dynamics and social media best practices.

YOUR EXPERTISE:
• Social media platform optimization (Instagram, Twitter, LinkedIn, Facebook)
• Nigerian cultural context and trending topics
• Engagement-driven content creation
• Hashtag research and optimization
• Brand voice development
• Visual content planning

RESPONSE FORMAT FOR SOCIAL MEDIA:
Provide platform-specific content in this JSON format:
{
  "content": {
    "instagram": "Instagram post with emojis and engagement hooks",
    "twitter": "Twitter post within 280 characters",
    "linkedin": "Professional LinkedIn post with business focus",
    "facebook": "Facebook post optimized for engagement"
  },
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"],
  "imagePrompt": "Detailed description for image generation",
  "bestTimes": ["Monday 9AM", "Wednesday 2PM", "Friday 7PM"],
  "engagementTips": ["Tip 1", "Tip 2", "Tip 3"]
}`

    // Business plan generation system prompt
    const businessPlanSystemPrompt = `You are a senior business consultant and strategic advisor with extensive experience in the Nigerian business environment and startup ecosystem.

YOUR EXPERTISE:
• Nigerian business regulations and compliance requirements
• Market analysis and competitive intelligence
• Financial modeling and projections
• Business strategy development
• Investment readiness and funding strategies
• Risk assessment and mitigation

RESPONSE FORMAT FOR BUSINESS PLANS:
Provide comprehensive business plan sections in this JSON format:
{
  "executiveSummary": "Compelling 2-3 paragraph executive summary",
  "marketAnalysis": "Detailed market opportunity and competitive landscape",
  "businessModel": "Revenue streams and operational strategy",
  "financialProjections": {
    "year1Revenue": "₦X.XM",
    "year2Revenue": "₦X.XM", 
    "year3Revenue": "₦X.XM",
    "breakEvenMonth": X,
    "initialInvestment": "₦X.XM"
  },
  "marketingStrategy": "Comprehensive marketing and customer acquisition plan",
  "implementationTimeline": "12-month roadmap with key milestones",
  "riskAnalysis": "Key risks and mitigation strategies"
}`

    // Flyer design system prompt  
    const flyerSystemPrompt = `You are a professional graphic designer specializing in Nigerian market visual communication and promotional design.

YOUR EXPERTISE:
• Visual hierarchy and layout design
• Color psychology and cultural preferences
• Typography for maximum readability and impact
• Nigerian market design trends and preferences
• Event and promotional design best practices

RESPONSE FORMAT FOR FLYER DESIGN:
Provide design specifications in this JSON format:
{
  "design": {
    "layout": "Detailed layout description",
    "colorScheme": {
      "primary": "#hexcode",
      "secondary": "#hexcode", 
      "accent": "#hexcode",
      "text": "#hexcode"
    },
    "typography": {
      "headline": "Font and size for main title",
      "body": "Font and size for body text",
      "accent": "Font for special elements"
    },
    "visualElements": ["Element 1", "Element 2", "Element 3"],
    "callToAction": "Compelling CTA text",
    "designRationale": "Why this design works for the purpose"
  },
  "copywriting": {
    "headline": "Compelling main headline",
    "subheadline": "Supporting subheadline", 
    "bodyText": "Main promotional text",
    "callToAction": "Action-oriented CTA"
  }
}`

    // Email marketing system prompt
    const emailSystemPrompt = `You are an email marketing specialist with expertise in Nigerian consumer behavior and email best practices.

YOUR EXPERTISE:
• Email subject line optimization
• Personalization and segmentation strategies
• Call-to-action optimization
• Nigerian cultural context in email marketing
• Conversion-focused email copywriting

RESPONSE FORMAT FOR EMAIL MARKETING:
Provide email content in this JSON format:
{
  "subject": "Compelling subject line",
  "preheader": "Preview text that complements subject",
  "content": {
    "greeting": "Personalized greeting",
    "introduction": "Opening paragraph",
    "mainContent": "Core message and value proposition",
    "callToAction": "Clear action button text",
    "closing": "Professional closing"
  },
  "personalization": ["Field1", "Field2", "Field3"],
  "testingVariants": {
    "subjectA": "Subject line variant A",
    "subjectB": "Subject line variant B"
  }
}`

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
    const finalSystemPrompt = (() => {
      switch(requestType) {
        case 'logo': return logoSystemPrompt
        case 'social': return socialMediaSystemPrompt
        case 'business-plan': return businessPlanSystemPrompt
        case 'flyer': return flyerSystemPrompt
        case 'email': return emailSystemPrompt
        default: return systemPrompt || defaultSystemPrompt
      }
    })()

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

    // Call Groq API with model optimized for content type
    const model = requestType === 'business-plan' ? 'llama-3.1-70b-versatile' : 'llama-3.1-8b-instant'
    const maxTokens = requestType === 'business-plan' ? 3000 : requestType === 'logo' ? 2000 : 1500
    const temperature = requestType === 'logo' || requestType === 'flyer' ? 0.8 : 0.7

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        max_tokens: maxTokens,
        temperature: temperature,
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
