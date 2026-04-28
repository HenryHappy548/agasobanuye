#!/bin/bash

# Supabase credentials
SUPABASE_URL="https://xvnznzcftxsrmzxwxdqq.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bnpuemNmdHhzcm16eHd4ZHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODExNDAsImV4cCI6MjA3NDQ1NzE0MH0.Hjz0zy2P8AxfeGnsMJaCPsM7CstF1QWEFipW9KnQVPA"

echo "Fixing website..."

# Delete the problematic movies
echo "Deleting 1917 and Rosario..."
curl -X DELETE "$SUPABASE_URL/rest/v1/movies?title=in.(1917,Rosario)" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json"

# Check all movies
echo "Checking movies..."
curl -X GET "$SUPABASE_URL/rest/v1/movies?select=id,title,featured,show_in_featured&limit=10" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY"

echo ""
echo "✅ Fixed!"
