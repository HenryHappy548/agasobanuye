#!/bin/bash

SUPABASE_URL="https://xvnznzcftxsrmzxwxdqq.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bnpuemNmdHhzcm16eHd4ZHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODExNDAsImV4cCI6MjA3NDQ1NzE0MH0.Hjz0zy2P8AxfeGnsMJaCPsM7CstF1QWEFipW9KnQVPA"

echo "Getting all featured movie IDs..."

# Get all featured movie IDs
curl -s -X GET "$SUPABASE_URL/rest/v1/movies?featured=eq.true&select=id" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" > /tmp/featured_ids.json

cat /tmp/featured_ids.json

echo ""
echo "Now unfeaturing each one individually..."

# Extract IDs and unfeature each
ID1=$(grep -o '"id":"[^"]*"' /tmp/featured_ids.json | head -1 | cut -d'"' -f4)
ID2=$(grep -o '"id":"[^"]*"' /tmp/featured_ids.json | head -2 | tail -1 | cut -d'"' -f4)
ID3=$(grep -o '"id":"[^"]*"' /tmp/featured_ids.json | head -3 | tail -1 | cut -d'"' -f4)
# ... and so on

# Let's do this properly - use POST to update multiple
echo "Unfeaturing all movies one by one..."

for id in $(grep -o '"id":"[^"]*"' /tmp/featured_ids.json | cut -d'"' -f4); do
  curl -s -X PATCH "$SUPABASE_URL/rest/v1/movies?id=eq.$id" \
    -H "apikey: $SUPABASE_KEY" \
    -H "Authorization: Bearer $SUPABASE_KEY" \
    -H "Content-Type: application/json" \
    -d '{"featured": false}' &
done

wait

echo "All unfeatured. Now setting 1917 as featured..."

# Now set 1917 as the only featured
curl -X PATCH "$SUPABASE_URL/rest/v1/movies?title=ilike.*1917*" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"featured": true, "show_in_featured": true}'

echo ""
echo "Final check - should show ONLY 1917 as featured:"
curl -s -X GET "$SUPABASE_URL/rest/v1/movies?featured=eq.true&select=id,title" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY"

echo ""
echo "✅ Done!"
