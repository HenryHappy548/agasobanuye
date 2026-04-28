#!/bin/bash

# Supabase credentials
SUPABASE_URL="https://xvnznzcftxsrmzxwxdqq.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bnpuemNmdHhzcm16eHd4ZHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODExNDAsImV4cCI6MjA3NDQ1NzE0MH0.Hjz0zy2P8AxfeGnsMJaCPsM7CstF1QWEFipW9KnQVPA"

echo "Starting movie upload..."

# 1. Unfeature all movies
echo "1. Unfeaturing all movies..."
curl -X PATCH "$SUPABASE_URL/rest/v1/movies?featured=eq.true" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=minimal" \
  -d '{"featured": false, "show_in_featured": false}'

# 2. Insert 1917
echo "2. Inserting 1917..."
curl -X POST "$SUPABASE_URL/rest/v1/movies" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "title": "1917",
    "description": "A British soldier is sent on a mission to deliver a crucial message during World War I.",
    "year": "2019",
    "genre": "War",
    "rating": "Gaheza Simba",
    "category": "movie",
    "poster_url": "https://resizing.flixster.com/hu80cOh-9NU_eottnuVgtP_nW54=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2ZlMTgyZjNiLTIxMDQtNGE4Mi05ZjAxLTlhNjk3YTdkMDYxNi53ZWJw",
    "download_url": "https://www.mediafire.com/file/fsp205e7qa7omks/1917.mp4/file",
    "dubbed": "Gaheza Simba",
    "featured": true,
    "show_in_recent": false,
    "show_in_featured": true
  }'

# 3. Insert Rosario
echo "3. Inserting Rosario..."
curl -X POST "$SUPABASE_URL/rest/v1/movies" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "title": "Rosario",
    "description": "A story about love and sacrifice.",
    "year": "2010",
    "genre": "Drama",
    "rating": "Sankara",
    "category": "movie",
    "poster_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuAa4gtvNbhs-g12VvYFPWXnbKAzZCSTl3GQ&s",
    "download_url": "https://www.mediafire.com/file/qdl63hzvt6rpvwy/Rosario.mp4/file",
    "dubbed": "Sankara",
    "featured": true,
    "show_in_recent": false,
    "show_in_featured": true
  }'

# 4. Verify
echo "4. Verifying..."
curl -X GET "$SUPABASE_URL/rest/v1/movies?title=in.(1917,Rosario)&select=id,title,rating,featured,show_in_featured" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY"

echo ""
echo "✅ Upload complete!"
