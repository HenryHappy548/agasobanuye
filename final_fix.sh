#!/bin/bash

SUPABASE_URL="https://xvnznzcftxsrmzxwxdqq.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bnpuemNmdHhzcm16eHd4ZHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODExNDAsImV4cCI6MjA3NDQ1NzE0MH0.Hjz0zy2P8AxfeGnsMJaCPsM7CstF1QWEFipW9KnQVPA"

echo "Final fix - setting only ONE featured movie..."

# First unfeature ALL movies
echo "1. Unfeaturing all movies..."
curl -X GET "$SUPABASE_URL/rest/v1/movies?featured=eq.true&select=id" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" > /tmp/featured.json

# Count how many
COUNT=$(grep -o '"id"' /tmp/featured.json | wc -l)
echo "Found $COUNT featured movies"

# Set ALL to false (one by one - workaround)
for id in $(grep -o '"id":"[^"]*"' /tmp/featured.json | cut -d'"' -f4); do
  curl -X PATCH "$SUPABASE_URL/rest/v1/movies?id=eq.$id" \
    -H "apikey: $SUPABASE_KEY" \
    -H "Authorization: Bearer $SUPABASE_KEY" \
    -H "Content-Type: application/json" \
    -d '{"featured": false}' 2>/dev/null &
done

wait
echo "All unfeatured"

# Now set 1917 as THE ONLY featured
echo "2. Setting 1917 as THE ONLY featured movie..."
curl -X PATCH "$SUPABASE_URL/rest/v1/movies?title=ilike.*1917*" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"featured": true, "show_in_featured": true}'

# Set Rosario as show_in_featured only (not featured)
echo "3. Setting Rosario as show_in_featured..."
curl -X PATCH "$SUPABASE_URL/rest/v1/movies?title=ilike.*Rosario*" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"show_in_featured": true}'

# Verify only ONE featured
echo "4. Verifying - should be only ONE featured..."
curl -s -X GET "$SUPABASE_URL/rest/v1/movies?featured=eq.true&select=id,title" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY"

echo ""
echo "✅ Done! Website should load now."
