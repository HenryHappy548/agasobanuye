import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    console.log('Creating admin user...');

    // Create admin user
    const { data: adminUser, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@admin.com',
      password: 'Henryhappy250',
      email_confirm: true,
      user_metadata: {
        username: 'admin'
      }
    });

    if (userError) {
      console.error('Error creating admin user:', userError);
      return new Response(
        JSON.stringify({ error: 'Failed to create admin user: ' + userError.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Admin user created successfully:', adminUser.user?.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Admin user created successfully!',
        userId: adminUser.user?.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in create-admin function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});