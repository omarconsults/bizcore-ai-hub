
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
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
    const { query, category, sources } = await req.json()
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Fetch resources from multiple sources
    const fetchedResources = []

    // Source 1: Nigerian government and business websites
    if (sources?.includes('government') || !sources) {
      const govResources = await fetchGovernmentResources(query, category)
      fetchedResources.push(...govResources)
    }

    // Source 2: Business guides and articles
    if (sources?.includes('guides') || !sources) {
      const guideResources = await fetchBusinessGuides(query, category)
      fetchedResources.push(...guideResources)
    }

    // Source 3: Templates and documents
    if (sources?.includes('templates') || !sources) {
      const templateResources = await fetchTemplates(query, category)
      fetchedResources.push(...templateResources)
    }

    // Store fetched resources in the database
    if (fetchedResources.length > 0) {
      const { error } = await supabaseClient
        .from('knowledge_resources')
        .upsert(fetchedResources, { onConflict: 'url' })

      if (error) {
        console.error('Error storing resources:', error)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        resources: fetchedResources,
        count: fetchedResources.length 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

async function fetchGovernmentResources(query: string, category: string) {
  const resources = []
  
  // CAC (Corporate Affairs Commission) resources
  if (category === 'compliance' || query?.toLowerCase().includes('cac')) {
    resources.push({
      title: "CAC Business Registration Guide",
      description: "Official guide to registering your business with the Corporate Affairs Commission",
      url: "https://cac.gov.ng/business-registration/",
      type: "guide",
      category: "compliance",
      source: "CAC Nigeria",
      tags: ["CAC", "Registration", "Legal"],
      fetched_at: new Date().toISOString(),
      rating: 4.9
    })
  }

  // FIRS (Federal Inland Revenue Service) resources
  if (category === 'finance' || query?.toLowerCase().includes('tax')) {
    resources.push({
      title: "Tax Guide for Small Businesses",
      description: "Comprehensive tax obligations and procedures for Nigerian businesses",
      url: "https://firs.gov.ng/tax-guide/",
      type: "guide",
      category: "finance",
      source: "FIRS Nigeria",
      tags: ["Tax", "FIRS", "Compliance"],
      fetched_at: new Date().toISOString(),
      rating: 4.7
    })
  }

  return resources
}

async function fetchBusinessGuides(query: string, category: string) {
  const resources = []

  // Add curated business resources
  if (category === 'marketing' || query?.toLowerCase().includes('marketing')) {
    resources.push({
      title: "Digital Marketing for Nigerian Businesses",
      description: "Strategies and best practices for marketing in the Nigerian market",
      url: "https://example.com/digital-marketing-nigeria",
      type: "course",
      category: "marketing",
      source: "Business Nigeria",
      tags: ["Digital Marketing", "Nigeria", "Strategy"],
      fetched_at: new Date().toISOString(),
      rating: 4.6
    })
  }

  if (category === 'hr' || query?.toLowerCase().includes('employment')) {
    resources.push({
      title: "Employment Law in Nigeria",
      description: "Understanding Nigerian employment laws and regulations",
      url: "https://example.com/employment-law-nigeria",
      type: "guide",
      category: "hr",
      source: "Legal Nigeria",
      tags: ["Employment", "Law", "HR"],
      fetched_at: new Date().toISOString(),
      rating: 4.8
    })
  }

  return resources
}

async function fetchTemplates(query: string, category: string) {
  const resources = []

  // Add template resources
  resources.push({
    title: "Nigerian Business Plan Template",
    description: "Comprehensive business plan template tailored for Nigerian startups",
    url: "https://example.com/business-plan-template",
    type: "template",
    category: "operations",
    source: "Startup Nigeria",
    tags: ["Business Plan", "Template", "Startup"],
    fetched_at: new Date().toISOString(),
    rating: 4.5
  })

  if (category === 'hr') {
    resources.push({
      title: "Employment Contract Templates Nigeria",
      description: "Ready-to-use employment contract templates compliant with Nigerian law",
      url: "https://example.com/employment-contracts",
      type: "template",
      category: "hr",
      source: "HR Nigeria",
      tags: ["Contracts", "Employment", "Templates"],
      fetched_at: new Date().toISOString(),
      rating: 4.7
    })
  }

  return resources
}
