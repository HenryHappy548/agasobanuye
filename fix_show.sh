#!/bin/bash

SUPABASE_URL="https://xvnznzcftxsrmzxwxdqq.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bnpuemNmdHhzcm16eHd4ZHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODExNDAsImV4cCI6MjA3NDQ1NzE0MH0.Hjz0zy2P8AxfeGnsMJaCPsM7CstF1QWEFipW9KnQVPA"

echo "Getting all show_in_featured movies..."

# Get all show_in_featured movie IDs  
curl -s -X GET "$SUPABASE_URL/rest/v1/movies?show_in_featured=eq.true&select=id" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" > /tmp/show_ids.json

COUNT=$(grep -o '"id"' /tmp/show_ids.json | wc -l)
echo "Found $COUNT movies with show_in_featured=true"

# Unfeature all except 1917 and Rosario
echo "Unfeaturing all except 1917 and Rosario..."

# First unfeature ALL
for id in $(grep -o '"id":"[^"]*"' /tmp/show_ids.json | cut -d'"' -f4); do
  curl -s -X PATCH "$SUPABASE_URL/rest/v1/movies?id=eq.$id" \
    -H "apikey: $SUPABASE_KEY" \
    -H "Authorization: Bearer $SUPABASE_KEY" \
    -H "Content-Type: application/json" \
    -d '{"show_in_featured": false, "featured": false}' &
done

wait

echo "All unfeatured"

# Now set 1917 as show_in_featured  
curl -X PATCH "$SUPABASE_URL/rest/v1/movies?title=ilike.*1917*" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"show_in_featured": true, "featured": true}'

# Set Rosario as show_in_featured
curl -X PATCH "$SUPABASE_URL/rest/v1/movies?title=ilike.*Rosario*" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"show_in_featured": true}'

echo ""
echo "Final check - show_in_featured movies:"
curl -s -X GET "$SUPABASE_URL/rest/v1/movies?show_in_featured=eq.true&select=id,title" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" | head -c 500

echo ""
echo "✅ Done!"
