#!/usr/bin/env python3
"""
Upload featured movies with poster URLs using the approach from the recent method.

Movies:
1. 1917 - Gaheza Simba version
2. Rosario - Sankara version

Poster URLs from the recent approach:
- 1917: https://resizing.flixster.com/hu80cOh-9NU_eottnuVgtP_nW54=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2ZlMTgyZjNiLTIxMDQtNGE4Mi05ZjAxLTlhNjk3YTdkMDYxNi53ZWJw
- Rozario: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuAa4gtvNbhs-g12VvYFPWXnbKAzZCSTl3GQ&s
"""

import os
import datetime

SUPABASE_URL = os.getenv('VITE_SUPABASE_URL', 'https://xvnznzcftxsrmzxwxdqq.supabase.co')
SUPABASE_ANON_KEY = os.getenv('VITE_SUPABASE_PUBLISHABLE_KEY', '')

if not SUPABASE_ANON_KEY:
    print("❌ Error: Set VITE_SUPABASE_PUBLISHABLE_KEY environment variable")
    exit(1)

from supabase import create_client

supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

print("🔄 Uploading featured movies with poster URLs...")
print("="*60)

# Unfeature all first
supabase.table('movies').update({'featured': False}).execute()

# Upload 1917 with poster URL
movie1 = supabase.table('movies').insert([{
    'title': '1917',
    'description': 'A British soldier is sent on a mission to deliver a crucial message during World War I.',
    'year': '2019',
    'genre': 'War',
    'rating': 'Gaheza Simba',
    'category': 'movie',
    'poster_url': 'https://resizing.flixster.com/hu80cOh-9NU_eottnuVgtP_nW54=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2ZlMTgyZjNiLTIxMDQtNGE4Mi05ZjAxLTlhNjk3YTdkMDYxNi53ZWJw',
    'video_url': None,
    'download_url': 'https://www.mediafire.com/file/fsp205e7qa7omks/1917.mp4/file',
    'dubbed': 'Gaheza Simba',
    'featured': True,
    'show_in_recent': False,
    'show_in_featured': True,
    'created_at': datetime.datetime.now().isoformat()
}]).execute()

if movie1.error:
    print(f"❌ 1917 error: {movie1.error}")
else:
    print("✅ 1917 uploaded with poster URL")

# Upload Rozario with poster URL
movie2 = supabase.table('movies').insert([{
    'title': 'Rosario',
    'description': 'A story about love and sacrifice.',
    'year': '2010',
    'genre': 'Drama',
    'rating': 'Sankara',
    'category': 'movie',
    'poster_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuAa4gtvNbhs-g12VvYFPWXnbKAzZCSTl3GQ&s',
    'video_url': None,
    'download_url': 'https://www.mediafire.com/file/qdl63hzvt6rpvwy/Rosario.mp4/file',
    'dubbed': 'Sankara',
    'featured': True,
    'show_in_recent': False,
    'show_in_featured': True,
    'created_at': datetime.datetime.now().isoformat()
}]).execute()

if movie2.error:
    print(f"❌ Rozario error: {movie2.error}")
else:
    print("✅ Rozario uploaded with poster URL")

print("\n" + "="*60)
print("✅ Featured movies with poster URLs uploaded successfully!")
print("="*60)
