#!/bin/bash

SUPABASE_URL="https://xvnznzcftxsrmzxwxdqq.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bnpuemNmdHhzcm16eHd4ZHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODExNDAsImV4cCI6MjA3NDQ1NzE0MH0.Hjz0zy2P8AxfeGnsMJaCPsM7CstF1QWEFipW9KnQVPA"

echo "Cleaning up featured movies..."

# First delete 1917 and Rosario
echo "1. Deleting 1917 and Rosario..."
curl -X DELETE "$SUPABASE_URL/rest/v1/movies?title=in.(1917,Rosario)" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json"

# Set all featured to false
echo "2. Setting all featured=false..."
curl -X PATCH "$SUPABASE_URL/rest/v1/movies?featured=eq.true" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=minimal" \
  -d '{"featured": false}'

# Set show_in_featured to false for ALL movies
echo "3. Setting all show_in_featured=false..."
curl -X PATCH "$SUPABASE_URL/rest/v1/movies" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=minimal" \
  -d '{"show_in_featured": false}'

# Verify
echo "4. Verifying..."
curl -X GET "$SUPABASE_URL/rest/v1/movies?show_in_featured=eq.true&select=id,title&limit=5" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY"

echo ""
echo "✅ Cleanup complete!"
