#!/bin/bash

SUPABASE_URL="https://xvnznzcftxsrmzxwxdqq.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bnpuemNmdHhzcm16eHd4ZHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODExNDAsImV4cCI6MjA3NDQ1NzE0MH0.Hjz0zy2P8AxfeGnsMJaCPsM7CstF1QWEFipW9KnQVPA"

echo "Cleaning up ALL show_in_featured movies..."

# Get first 50 IDs
curl -s -X GET "$SUPABASE_URL/rest/v1/movies?show_in_featured=eq.true&select=id&limit=50" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" > /tmp/show_ids.json

# Unfeature first 50 sequentially
for id in $(grep -o '"id":"[^"]*"' /tmp/show_ids.json | cut -d'"' -f4); do
  curl -s -X PATCH "$SUPABASE_URL/rest/v1/movies?id=eq.$id" \
    -H "apikey: $SUPABASE_KEY" \
    -H "Authorization: Bearer $SUPABASE_KEY" \
    -H "Content-Type: application/json" \
    -d '{"show_in_featured": false}' > /dev/null
  echo -n "."
done

echo ""

# Get next 50
curl -s -X GET "$SUPABASE_URL/rest/v1/movies?show_in_featured=eq.true&select=id&limit=50&offset=50" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" > /tmp/show_ids2.json

for id in $(grep -o '"id":"[^"]*"' /tmp/show_ids2.json | cut -d'"' -f4); do
  curl -s -X PATCH "$SUPABASE_URL/rest/v1/movies?id=eq.$id" \
    -H "apikey: $SUPABASE_KEY" \
    -H "Authorization: Bearer $SUPABASE_KEY" \
    -H "Content-Type: application/json" \
    -d '{"show_in_featured": false}' > /dev/null
  echo -n "."
done

echo ""

# Get remaining
curl -s -X GET "$SUPABASE_URL/rest/v1/movies?show_in_featured=eq.true&select=id&limit=50&offset=100" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" > /tmp/show_ids3.json

for id in $(grep -o '"id":"[^"]*"' /tmp/show_ids3.json | cut -d'"' -f4); do
  curl -s -X PATCH "$SUPABASE_URL/rest/v1/movies?id=eq.$id" \
    -H "apikey: $SUPABASE_KEY" \
    -H "Authorization: Bearer $SUPABASE_KEY" \
    -H "Content-Type: application/json" \
    -d '{"show_in_featured": false}' > /dev/null
  echo -n "."
done

echo ""
echo "All cleaned!"

# Now set 1917 and Rosario as featured
echo "Setting 1917 and Rosario as featured..."

curl -X PATCH "$SUPABASE_URL/rest/v1/movies?title=ilike.*1917*" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"show_in_featured": true, "featured": true}' > /dev/null

curl -X PATCH "$SUPABASE_URL/rest/v1/movies?title=ilike.*Rosario*" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"show_in_featured": true}' > /dev/null

echo "Final check:"
curl -s -X GET "$SUPABASE_URL/rest/v1/movies?show_in_featured=eq.true&select=id,title" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY"

echo ""
echo "✅ DONE!"
