#!/bin/bash

SUPABASE_URL="https://xvnznzcftxsrmzxwxdqq.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bnpuemNmdHhzcm16eHd4ZHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODExNDAsImV4cCI6MjA3NDQ1NzE0MH0.Hjz0zy2P8AxfeGnsMJaCPsM7CstF1QWEFipW9KnQVPA"

# First, get the IDs of 1917 and Rosario
echo "Getting movie IDs..."
MOVIES=$(curl -s -X GET "$SUPABASE_URL/rest/v1/movies?title=ilike.*1917*&select=id,title" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY")

ID1917=$(echo $MOVIES | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "1917 ID: $ID1917"

# Set 1917 as featured (only one!)
if [ -n "$ID1917" ]; then
  echo "Setting 1917 as featured..."
  curl -X PATCH "$SUPABASE_URL/rest/v1/movies?id=eq.$ID1917" \
    -H "apikey: $SUPABASE_KEY" \
    -H "Authorization: Bearer $SUPABASE_KEY" \
    -H "Content-Type: application/json" \
    -d '{"featured": true, "show_in_featured": true}'
fi

# Get Rosario ID
MOVIES2=$(curl -s -X GET "$SUPABASE_URL/rest/v1/movies?title=ilike.*Rosario*&select=id,title" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY")

IDROSARIO=$(echo $MOVIES2 | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Rosario ID: $IDROSARIO"

# Also set Rosario as show_in_featured (but not featured - only one main featured)
if [ -n "$IDROSARIO" ]; then
  echo "Setting Rosario as show_in_featured..."
  curl -X PATCH "$SUPABASE_URL/rest/v1/movies?id=eq.$IDROSARIO" \
    -H "apikey: $SUPABASE_KEY" \
    -H "Authorization: Bearer $SUPABASE_KEY" \
    -H "Content-Type: application/json" \
    -d '{"show_in_featured": true}'
fi

# Verify
echo "Verifying..."
curl -s -X GET "$SUPABASE_URL/rest/v1/movies?featured=eq.true&select=id,title" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY"

echo ""
curl -s -X GET "$SUPABASE_URL/rest/v1/movies?title=ilike.*Rosario*&select=id,title,featured,show_in_featured" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY"

echo ""
echo "✅ Done!"
