# Featured Movies Upload Guide

## Overview
This guide documents the process of uploading featured movies to the play-go-see database.

## Movies to Upload

### 1. 1917
- **Dubbed by:** Gaheza Simba
- **Rating:** Gaheza Simba
- **Download Link:** https://www.mediafire.com/file/fsp205e7qa7omks/1917.mp4/file
- **Embed Code:** <iframe src="https://rwaflix.embedseek.com/#cgj1v" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>

### 2. Rosario
- **Dubbed by:** Sankara
- **Rating:** Sankara
- **Download Link:** https://www.mediafire.com/file/qdl63hzvt6rpvwy/Rosario.mp4/file
- **Embed Code:** <iframe src="https://rwaflix.embedseek.com/#vl8cw" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>

## Database Schema

The `movies` table contains the following relevant columns:
- `title` (string) - Movie title
- `description` (text) - Movie description
- `year` (string) - Release year
- `genre` (string) - Movie genre
- `rating` (string) - Rating/dubber name
- `category` (string) - Category (e.g., 'movie')
- `download_url` (text) - Download/embed link
- `dubbed` (string) - Dubbing artist/version
- `featured` (boolean) - Featured status
- `show_in_featured` (boolean) - Show in featured carousel
- `show_in_recent` (boolean) - Show in recent movies
- `created_at` (timestamp) - Creation date

## SQL Commands

### Option 1: Direct SQL Execution

```sql
-- Step 1: Unfeature all existing movies
UPDATE movies SET featured = false;

-- Step 2: Insert 1917
INSERT INTO movies (title, description, year, genre, rating, category, 
                     poster_url, video_url, download_url, dubbed, featured, 
                     show_in_recent, show_in_featured, created_at)
VALUES ('1917', 
        'A British soldier is sent on a mission to deliver a crucial message during World War I.',
        '2019', 
        'War', 
        'Gaheza Simba', 
        'movie', 
        NULL, 
        NULL, 
        'https://www.mediafire.com/file/fsp205e7qa7omks/1917.mp4/file',
        'Gaheza Simba',
        true,
        false,
        true,
        NOW());

-- Step 3: Insert Rosario
INSERT INTO movies (title, description, year, genre, rating, category, 
                     poster_url, video_url, download_url, dubbed, featured, 
                     show_in_recent, show_in_featured, created_at)
VALUES ('Rosario',
        'A story about love and sacrifice.',
        '2010',
        'Drama',
        'Sankara',
        'movie',
        NULL,
        NULL,
        'https://www.mediafire.com/file/qdl63hzvt6rpvwy/Rosario.mp4/file',
        'Sankara',
        true,
        false,
        true,
        NOW());
```

### Option 2: Using Supabase Client (Node.js/Python)

#### Node.js Script
File: `upload_featured_movies.js`
```javascript
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://play-go-see-bf7fb576.supabase.co',
  process.env.SUPABASE_ANON_KEY
);

async function upload() {
  await supabase.from('movies').update({ featured: false });
  
  await supabase.from('movies').insert([
    {
      title: '1917',
      description: 'A British soldier is sent on a mission to deliver a crucial message during World War I.',
      year: '2019',
      genre: 'War',
      rating: 'Gaheza Simba',
      category: 'movie',
      download_url: 'https://www.mediafire.com/file/fsp205e7qa7omks/1917.mp4/file',
      dubbed: 'Gaheza Simba',
      featured: true,
      show_in_recent: false,
      show_in_featured: true
    },
    {
      title: 'Rosario',
      description: 'A story about love and sacrifice.',
      year: '2010',
      genre: 'Drama',
      rating: 'Sankara',
      category: 'movie',
      download_url: 'https://www.mediafire.com/file/qdl63hzvt6rpvwy/Rosario.mp4/file',
      dubbed: 'Sankara',
      featured: true,
      show_in_recent: false,
      show_in_featured: true
    }
  ]);
}

upload();
```

#### Python Script
File: `upload_movies_fixed.py`
```python
from supabase import create_client
import datetime

supabase = create_client(
    'https://play-go-see-bf7fb576.supabase.co',
    os.getenv('SUPABASE_ANON_KEY')
)

# Unfeature all
supabase.table('movies').update({'featured': False}).execute()

# Insert movies
supabase.table('movies').insert([
    {
        'title': '1917',
        'description': 'A British soldier is sent on a mission to deliver a crucial message during World War I.',
        'year': '2019',
        'genre': 'War',
        'rating': 'Gaheza Simba',
        'category': 'movie',
        'download_url': 'https://www.mediafire.com/file/fsp205e7qa7omks/1917.mp4/file',
        'dubbed': 'Gaheza Simba',
        'featured': True,
        'show_in_recent': False,
        'show_in_featured': True,
        'created_at': datetime.datetime.now().isoformat()
    },
    {
        'title': 'Rosario',
        'description': 'A story about love and sacrifice.',
        'year': '2010',
        'genre': 'Drama',
        'rating': 'Sankara',
        'category': 'movie',
        'download_url': 'https://www.mediafire.com/file/qdl63hzvt6rpvwy/Rosario.mp4/file',
        'dubbed': 'Sankara',
        'featured': True,
        'show_in_recent': False,
        'show_in_featured': True,
        'created_at': datetime.datetime.now().isoformat()
    }
]).execute()
```

## Admin Portal Access
- **Admin URL:** www.rwaflix.store/admin
- **Email:** admin@admin.com
- **Password:** henryhappy

## Verification
After uploading, verify the movies are featured by:
1. Logging into the admin portal
2. Navigating to the Movie List section
3. Confirming both movies have the "featured" checkbox enabled
4. Checking the homepage to verify they appear in the featured carousel

## Notes
- Only one movie can be featured at a time (the `featured` column acts as a singleton)
- The `show_in_featured` column controls display in the homepage carousel
- The `show_in_recent` column controls display in the "Nshya Zashyizweho" sidebar
- Both movies should have `show_in_recent: false` to keep the featured section clean
