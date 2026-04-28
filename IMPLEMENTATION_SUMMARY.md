# Featured Movies Upload - Implementation Summary

## Movies to Upload to Featured Section

### 1. Movie: 1917
- **Dubbed by:** Gaheza Simba
- **Rating:** Gaheza Simba
- **Poster URL:** https://resizing.flixster.com/hu80cOh-9NU_eottnuVgtP_nW54=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2ZlMTgyZjNiLTIxMDQtNGE4Mi05ZjAxLTlhNjk3YTdkMDYxNi53ZWJw
- **Download Link:** https://www.mediafire.com/file/fsp205e7qa7omks/1917.mp4/file
- **Embed Code:** `<iframe src="https://rwaflix.embedseek.com/#cgj1v" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`

### 2. Movie: Rosario
- **Dubbed by:** Sankara
- **Rating:** Sankara
- **Poster URL:** https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuAa4gtvNbhs-g12VvYFPWXnbKAzZCSTl3GQ&s
- **Download Link:** https://www.mediafire.com/file/qdl63hzvt6rpvwy/Rosario.mp4/file
- **Embed Code:** `<iframe src="https://rwaflix.embedseek.com/#vl8cw" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`

## Database Schema (movies table)

| Column | Type | Description |
|--------|------|-------------|
| id | string | Movie ID (UUID) |
| title | string | Movie title |
| description | text | Movie description |
| year | string | Release year |
| genre | string | Movie genre |
| rating | string | Rating/dubber name |
| category | string | Category (movie) |
| poster_url | text | Poster image URL |
| video_url | text | Video URL |
| download_url | text | Download/embed link |
| dubbed | string | Dubbing artist/version |
| featured | boolean | Featured status |
| show_in_recent | boolean | Show in recent movies |
| show_in_featured | boolean | Show in featured carousel |
| created_at | timestamp | Creation date |
| updated_at | timestamp | Last update |

## Upload Scripts Created

### 1. upload_with_urls.py (Recommended)
Uses the recent approach with poster URLs:
```bash
export VITE_SUPABASE_PUBLISHABLE_KEY="your_key_here"
python3 upload_with_urls.py
```

### 2. upload_final.py
Uses environment variables for credentials:
```bash
export VITE_SUPABASE_PUBLISHABLE_KEY="your_key_here"
python3 upload_final.py
```

### 3. upload_movies_fixed.py
Python script with datetime fix:
```bash
python3 upload_movies_fixed.py
```

## SQL Commands (Alternative)

If direct SQL execution is needed:

```sql
-- Step 1: Unfeature all existing movies
UPDATE movies SET featured = false;

-- Step 2: Insert 1917 with poster URL
INSERT INTO movies (title, description, year, genre, rating, category, 
                     poster_url, video_url, download_url, dubbed, 
                     featured, show_in_recent, show_in_featured, created_at)
VALUES ('1917',
        'A British soldier is sent on a mission to deliver a crucial message during World War I.',
        '2019',
        'War',
        'Gaheza Simba',
        'movie',
        'https://resizing.flixster.com/hu80cOh-9NU_eottnuVgtP_nW54=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2ZlMTgyZjNiLTIxMDQtNGE4Mi05ZjAxLTlhNjk3YTdkMDYxNi53ZWJw',
        NULL,
        'https://www.mediafire.com/file/fsp205e7qa7omks/1917.mp4/file',
        'Gaheza Simba',
        true,
        false,
        true,
        NOW());

-- Step 3: Insert Rosario with poster URL
INSERT INTO movies (title, description, year, genre, rating, category,
                     poster_url, video_url, download_url, dubbed,
                     featured, show_in_recent, show_in_featured, created_at)
VALUES ('Rosario',
        'A story about love and sacrifice.',
        '2010',
        'Drama',
        'Sankara',
        'movie',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuAa4gtvNbhs-g12VvYFPWXnbKAzZCSTl3GQ&s',
        NULL,
        'https://www.mediafire.com/file/qdl63hzvt6rpvwy/Rosario.mp4/file',
        'Sankara',
        true,
        false,
        true,
        NOW());
```

## Admin Portal Access

**URL:** www.rwaflix.store/admin  
**Email:** admin@admin.com  
**Password:** henryhappy

## Verification Steps

After uploading, verify in the admin portal:
1. Navigate to Admin → Movies
2. Confirm both movies have "featured" checkbox enabled
3. Check that poster URLs are displayed correctly
4. Verify on www.rwaflix.store that movies appear in featured carousel

## Key Points

- Only one movie can have `featured: true` at a time (database constraint)
- Both movies should have `show_in_recent: false` to avoid cluttering recent section
- The `show_in_featured: true` enables display in the homepage featured carousel
- Poster URLs are now included for better visual presentation
- The unfeature-all-then-insert approach ensures only one featured movie exists
