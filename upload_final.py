#!/usr/bin/env python3
"""
Final script to upload featured movies to the database using project credentials.
Movies to upload:
1. 1917 - dubbed by Gaheza Simba, rating: Gaheza Simba
2. Rosario - dubbed by Sankara, rating: Sankara
"""

import os
import datetime

# Get credentials from environment
SUPABASE_URL = os.getenv('VITE_SUPABASE_URL', 'https://xvnznzcftxsrmzxwxdqq.supabase.co')
SUPABASE_ANON_KEY = os.getenv('VITE_SUPABASE_PUBLISHABLE_KEY', '')

if not SUPABASE_ANON_KEY:
    print("❌ Error: VITE_SUPABASE_PUBLISHABLE_KEY not found")
    exit(1)

try:
    from supabase import create_client
    
    supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
    
    print("🔄 Starting to upload featured movies...")
    print("="*60)
    
    # Step 1: Unfeature all existing movies
    print("\n1. Unfeaturing all existing movies...")
    response = supabase.table('movies').update({'featured': False}).execute()
    if response.error:
        print(f"❌ Error: {response.error}")
        exit(1)
    print("   ✓ All movies unfeatured")
    
    # Step 2: Insert 1917
    print("\n2. Uploading 1917...")
    movie1_response = supabase.table('movies').insert([
        {
            'title': '1917',
            'description': 'A British soldier is sent on a mission to deliver a crucial message during World War I.',
            'year': '2019',
            'genre': 'War',
            'rating': 'Gaheza Simba',
            'category': 'movie',
            'poster_url': None,
            'video_url': None,
            'download_url': 'https://www.mediafire.com/file/fsp205e7qa7omks/1917.mp4/file',
            'dubbed': 'Gaheza Simba',
            'featured': True,
            'show_in_recent': False,
            'show_in_featured': True,
            'created_at': datetime.datetime.now().isoformat()
        }
    ]).execute()
    
    if movie1_response.error:
        print(f"❌ Error uploading 1917: {movie1_response.error}")
    else:
        print("   ✓ 1917 uploaded successfully!")
    
    # Step 3: Insert Rosario
    print("\n3. Uploading Rosario...")
    movie2_response = supabase.table('movies').insert([
        {
            'title': 'Rosario',
            'description': 'A story about love and sacrifice.',
            'year': '2010',
            'genre': 'Drama',
            'rating': 'Sankara',
            'category': 'movie',
            'poster_url': None,
            'video_url': None,
            'download_url': 'https://www.mediafire.com/file/qdl63hzvt6rpvwy/Rosario.mp4/file',
            'dubbed': 'Sankara',
            'featured': True,
            'show_in_recent': False,
            'show_in_featured': True,
            'created_at': datetime.datetime.now().isoformat()
        }
    ]).execute()
    
    if movie2_response.error:
        print(f"❌ Error uploading Rosario: {movie2_response.error}")
    else:
        print("   ✓ Rosario uploaded successfully!")
    
    print("\n" + "="*60)
    print("✅ All featured movies uploaded successfully!")
    print("✅ Featured movies have been pinned to homepage!")
    print("="*60)
    
except ImportError as e:
    print(f"❌ Error importing supabase: {e}")
    print("\nInstall with: pip install supabase")
    exit(1)
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)
