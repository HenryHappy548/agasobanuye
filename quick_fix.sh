#!/bin/bash

SUPABASE_URL="https://xvnznzcftxsrmzxwxdqq.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bnpuemNmdHhzcm16eHd4ZHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODExNDAsImV4cCI6MjA3NDQ1NzE0MH0.Hjz0zy2P8AxfeGnsMJaCPsM7CstF1QWEFipW9KnQVPA"

echo "Quick fix..."

# Check current count
COUNT=$(curl -s -X GET "$SUPABASE_URL/rest/v1/movies?show_in_featured=eq.true&select=id" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" | grep -o '"id"' | wc -l)

echo "Current show_in_featured count: $COUNT"

# Just set 1917 and Rosario as show_in_featured - let website handle fallback
echo "Setting 1917 as featured..."
curl -X PATCH "$SUPABASE_URL/rest/v1/movies?title=ilike.*1917*" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"show_in_featured": true, "featured": true}'

echo "Setting Rosario as show_in_featured..."
curl -X PATCH "$SUPABASE_URL/rest/v1/movies?title=ilike.*Rosario*" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"show_in_featured": true}'

echo "Done - website should work now"
