#!/bin/bash

SUPABASE_URL="https://xvnznzcftxsrmzxwxdqq.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bnpuemNmdHhzcm16eHd4ZHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODExNDAsImV4cCI6MjA3NDQ1NzE0MH0.Hjz0zy2P8AxfeGnsMJaCPsM7CstF1QWEFipW9KnQVPA"

echo "Fixing featured movies..."

# Delete 1917 and Rosario
echo "1. Deleting 1917 and Rosario..."
curl -X DELETE "$SUPABASE_URL/rest/v1/movies?title=eq.1917" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY"

curl -X DELETE "$SUPABASE_URL/rest/v1/movies?title=eq.Rosario" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY"

# Get all movies with show_in_featured=true
echo "2. Getting list of featured movies..."
MOVIES=$(curl -s -X GET "$SUPABASE_URL/rest/v1/movies?show_in_featured=eq.true&select=id" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY")

echo "Found $(echo $MOVIES | grep -o '"id"' | wc -l) featured movies"

# Set first movie as only featured
FIRST_ID=$(echo $MOVIES | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "Setting $FIRST_ID as the main featured..."

curl -X PATCH "$SUPABASE_URL/rest/v1/movies?id=eq.$FIRST_ID" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"featured": true}'

# Set all others to false
echo "3. Setting others to not featured..."
for id in $(echo $MOVIES | grep -o '"id":"[^"]*"' | tail -n +2 | cut -d'"' -f4); do
  curl -X PATCH "$SUPABASE_URL/rest/v1/movies?id=eq.$id" \
    -H "apikey: $SUPABASE_KEY" \
    -H "Authorization: Bearer $SUPABASE_KEY" \
    -H "Content-Type: application/json" \
    -d '{"featured": false}' 2>/dev/null
done

# Verify
echo "4. Final check..."
curl -X GET "$SUPABASE_URL/rest/v1/movies?featured=eq.true&select=id,title" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY"

echo ""
echo "✅ Done!"
