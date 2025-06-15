
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
    const { reference } = await req.json()
    
    const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY')
    if (!paystackSecretKey) {
      throw new Error('Paystack secret key not configured')
    }

    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json()
    
    if (!data.status) {
      throw new Error(data.message || 'Failed to verify payment')
    }

    // Update payment record in database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const paymentStatus = data.data.status === 'success' ? 'completed' : 'failed'
    
    await supabase
      .from('payments')
      .update({
        status: paymentStatus,
        verified_at: new Date().toISOString(),
        paystack_response: data.data
      })
      .eq('reference', reference)

    // If payment is successful, update invoice status
    if (paymentStatus === 'completed') {
      const invoiceId = data.data.metadata?.invoiceId
      if (invoiceId) {
        // Note: This would require a more complex invoice update in the Operations component
        console.log(`Payment completed for invoice: ${invoiceId}`)
      }
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
