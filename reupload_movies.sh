#!/bin/bash

SUPABASE_URL="https://xvnznzcftxsrmzxwxdqq.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bnpuemNmdHhzcm16eHd4ZHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODExNDAsImV4cCI6MjA3NDQ1NzE0MH0.Hjz0zy2P8AxfeGnsMJaCPsM7CstF1QWEFipW9KnQVPA"

echo "Checking Merlin series naming..."

# Get examples of movie titles
curl -s -X GET "$SUPABASE_URL/rest/v1/movies?title=ilike.*Merlin*&select=title" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" | head -c 500

echo ""
echo "---"

# First, delete any existing 1917 and Rosario
echo "Deleting existing 1917 and Rosario..."
curl -X DELETE "$SUPABASE_URL/rest/v1/movies?title=eq.1917" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" 2>/dev/null

curl -X DELETE "$SUPABASE_URL/rest/v1/movies?title=eq.Rosario" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" 2>/dev/null

# Set only 1 featured movie (first one)
echo "Setting one featured movie..."
curl -X PATCH "$SUPABASE_URL/rest/v1/movies?id=eq.1644ee3e-600d-4369-bfc6-65f91045dace" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"featured": true}' 2>/dev/null

# Insert 1917 with SEO naming
echo "Inserting 1917..."
curl -X POST "$SUPABASE_URL/rest/v1/movies" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1917 {{Gaheza Simba}}",
    "description": "A British soldier is sent on a mission to deliver a crucial message during World War I.",
    "year": "2019",
    "genre": "War",
    "rating": "Gaheza Simba",
    "category": "movie",
    "poster_url": "https://resizing.flixster.com/hu80cOh-9NU_eottnuVgtP_nW54=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2ZlMTgyZjNiLTIxMDQtNGE4Mi05ZjAxLTlhNjk3YTdkMDYxNi53ZWJw",
    "download_url": "https://www.mediafire.com/file/fsp205e7qa7omks/1917.mp4/file",
    "dubbed": "Gaheza Simba",
    "featured": false,
    "show_in_recent": false,
    "show_in_featured": false
  }'

echo "Inserting Rosario..."
curl -X POST "$SUPABASE_URL/rest/v1/movies" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Rosario {{Sankara}}",
    "description": "A story about love and sacrifice.",
    "year": "2010",
    "genre": "Drama",
    "rating": "Sankara",
    "category": "movie",
    "poster_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuAa4gtvNbhs-g12VvYFPWXnbKAzZCSTl3GQ&s",
    "download_url": "https://www.mediafire.com/file/qdl63hzvt6rpvwy/Rosario.mp4/file",
    "dubbed": "Sankara",
    "featured": false,
    "show_in_recent": false,
    "show_in_featured": false
  }'

echo "Done!"
