# Rwaflix - Rwanda's Premier Streaming Platform

## 📋 Project Overview

**Rwaflix** is a full-stack streaming platform designed specifically for Rwandan audiences, featuring Kinyarwanda-dubbed movies, TV shows, and an integrated e-commerce shop. The platform combines Netflix-style UI with local content and language support.

**Live URL**: https://rwaflix.com  
**Platform**: Lovable Cloud  
**Target Audience**: Rwandan viewers seeking entertainment in Kinyarwanda

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI library for building interactive interfaces |
| **TypeScript** | Latest | Type-safe JavaScript development |
| **Vite** | Latest | Fast build tool and dev server |
| **Tailwind CSS** | Latest | Utility-first CSS framework |
| **shadcn/ui** | Latest | Accessible component library |
| **React Router DOM** | 6.30.1 | Client-side routing |
| **React Query** | 5.83.0 | Data fetching and caching |
| **Framer Motion** | - | Animations (via Tailwind) |
| **Lucide React** | 0.462.0 | Icon library |
| **React Helmet Async** | 2.0.5 | SEO meta tag management |

### Backend (Lovable Cloud / Supabase)
| Technology | Purpose |
|------------|---------|
| **PostgreSQL** | Relational database |
| **Supabase Auth** | User authentication |
| **Row Level Security (RLS)** | Data access control |
| **Edge Functions (Deno)** | Serverless API endpoints |
| **Supabase Storage** | File storage for media |

### External Integrations
| Service | Purpose |
|---------|---------|
| **AliExpress API** | Affiliate product imports |
| **TMDB API** | Movie metadata fetching |
| **IndexNow** | Search engine indexing |
| **WhatsApp API** | Customer support links |

---

## 📁 Project Structure

```
src/
├── assets/           # Static images (movie posters, logos)
├── components/       # Reusable UI components
│   ├── admin/        # Admin panel components
│   └── ui/           # shadcn/ui components
├── data/             # Static data files
├── hooks/            # Custom React hooks
├── integrations/     # External service integrations
├── lib/              # Utility functions
├── pages/            # Page components (routes)
supabase/
├── config.toml       # Supabase configuration
├── functions/        # Edge functions
│   ├── aliexpress-api/
│   ├── indexnow/
│   └── sitemap/
public/
├── favicon.png       # Site favicon
├── robots.txt        # Search engine crawl rules
├── sitemap.xml       # Dynamic sitemap
```

---

## 🗄️ Database Schema

### Tables

| Table | Description | RLS |
|-------|-------------|-----|
| `movies` | Movie/TV show catalog | ✅ Public read, Admin write |
| `videos` | Streaming embed codes | ✅ Public read, Admin write |
| `download_links` | Download options per video | ✅ Public read, Admin write |
| `comments` | User comments on movies | ✅ Public read/write |
| `products` | Affiliate shop products | ✅ Public read, Admin write |
| `affiliate_clicks` | Click tracking | ✅ Public insert, Admin read |
| `contact_messages` | User support messages | ✅ Public insert, Admin read |
| `poll_votes` | Series voting system | ✅ Public insert, Admin read |
| `profiles` | User profile data | ✅ User-scoped access |
| `user_roles` | Admin/moderator roles | ✅ Admin only |

### Key Database Functions
- `has_role(user_id, role)` - Check user role
- `is_admin()` - Verify admin status
- `poll_get_results()` - Aggregate poll votes
- `poll_has_voted(session_id)` - Check voting status
- `handle_new_user()` - Auto-create profiles
- `limit_comments_to_50()` - Comment moderation

---

## 🔐 Security Features

### Authentication
- Email/password authentication
- Admin role-based access control
- Auto-confirm email signups enabled

### Row Level Security (RLS)
All tables have RLS enabled with policies:
- **Public content**: Movies, videos, products (read-only)
- **User content**: Comments, poll votes (insert allowed)
- **Admin only**: User roles, contact messages (full access)
- **Sensitive data**: Protected via `has_role()` function

### Storage Buckets
| Bucket | Public | Purpose |
|--------|--------|---------|
| `movie-posters` | ✅ | Movie poster images |
| `movie-videos` | ✅ | Video content storage |

---

## 📄 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Index | Homepage with featured content |
| `/movies` | Movies | Movies catalog |
| `/tv-shows` | TVShows | TV series catalog |
| `/popular` | Popular | Trending content |
| `/watch/:slug/:id` | MovieDetail | Video player page |
| `/shop` | Shop | Affiliate products |
| `/faq` | FAQ | Help center |
| `/contact` | Contact | Support form |
| `/about` | About | Company info |
| `/privacy-policy` | PrivacyPolicy | Legal |
| `/terms-of-service` | TermsOfService | Legal |
| `/auth` | Auth | Login/signup |
| `/admin` | Admin | Admin dashboard |

---

## 🎨 Design System

### Color Palette (HSL)
```css
--primary: 0 75% 55%      /* Rwaflix Red */
--background: 0 0% 8%      /* Dark background */
--foreground: 0 0% 95%     /* Light text */
--card: 0 0% 12%           /* Card backgrounds */
--muted: 0 0% 14%          /* Subtle elements */
--border: 0 0% 20%         /* Borders */
```

### UI Features
- Dark theme optimized for streaming
- Netflix-inspired card layouts
- GPU-accelerated animations
- Lazy loading with shimmer placeholders
- Mobile-first responsive design

---

## 🚀 Key Features

### Content Delivery
- ✅ Embedded video player (iFrame)
- ✅ Multiple video quality options
- ✅ Download links management
- ✅ Season/episode organization
- ✅ Related content recommendations

### User Engagement
- ✅ Movie-specific comments
- ✅ Series polling system
- ✅ Contact admin messaging
- ✅ WhatsApp support integration

### Admin Panel
- ✅ Movie CRUD operations
- ✅ Video/download link management
- ✅ Product management
- ✅ Message inbox
- ✅ Featured movie pinning

### E-commerce (Shop)
- ✅ AliExpress product imports
- ✅ Category filtering
- ✅ Search functionality
- ✅ Affiliate click tracking
- ✅ Price conversion (USD → RWF)

### SEO Optimization
- ✅ Dynamic sitemap generation
- ✅ IndexNow integration
- ✅ Meta tags per page
- ✅ Kinyarwanda keyword targeting
- ✅ JSON-LD structured data ready

---

## 📊 Statistics

| Metric | Count |
|--------|-------|
| Total Movies/Series | 60 |
| Total Products | 1,052 |
| Static Video Entries | 200+ |
| UI Components | 50+ |
| Admin Features | 6 tabs |

---

## 🌍 Localization

**Primary Language**: Kinyarwanda  
**Secondary Language**: English

### Key Translations
| English | Kinyarwanda |
|---------|-------------|
| Loading... | Tegereza gato... |
| Welcome to Rwaflix | Murakaza Neza kuri Rwaflix |
| Recently Added | Nshya Zashyizweho |
| Top 10 Now | Top 10 Ubu |
| Watch Now | Reba Nonaha |
| Download | Kuramo |

---

## 🔧 Edge Functions

### `/sitemap`
Generates dynamic XML sitemap with all movies and products.

### `/aliexpress-api`
Fetches and imports products from AliExpress with price conversion.

### `/indexnow`
Notifies search engines of new content for faster indexing.

---

## 📱 Performance Optimizations

- ✅ Lazy loading (React.lazy + Suspense)
- ✅ Image lazy loading (IntersectionObserver)
- ✅ React Query caching (5 min stale time)
- ✅ Component memoization (React.memo)
- ✅ GPU-accelerated animations
- ✅ Code splitting per route

---

## 🛡️ Environment Variables

| Variable | Purpose |
|----------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public API key |
| `ALIEXPRESS_APP_KEY` | AliExpress API key |
| `ALIEXPRESS_APP_SECRET` | AliExpress secret |
| `TMDB_API_KEY` | TMDB API access |
| `LOVABLE_API_KEY` | Lovable AI gateway |

---

## 📞 Support Channels

- **WhatsApp**: +250 788 633 280
- **Email**: ruaborwaflix@gmail.com
- **In-app**: Contact form → Admin inbox

---

## 🏗️ Deployment

**Platform**: Lovable Cloud  
**Frontend**: Auto-deployed on code changes  
**Backend**: Edge functions deploy automatically  
**Database**: Managed PostgreSQL via Supabase  

---

## 📝 License

All rights reserved. Content is provided for personal viewing only.

---

*Last Updated: January 2026*
*Built with ❤️ for Rwanda*
