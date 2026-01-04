# OBHelp - Clinical Decision Support for Obstetrics

## Overview

OBHelp is a clinical decision support application for obstetrics and fetal medicine professionals. It provides obstetric calculators, clinical guidelines, cardiotocography (CTG) interpretation with AI analysis, and medication safety information during pregnancy. The application is built as a React SPA with Supabase for authentication and user management, plus Supabase Edge Functions for AI-powered CTG analysis.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6 for fast development and optimized production builds
- **Routing**: React Router DOM 7 for client-side navigation
- **Styling**: Tailwind CSS loaded via CDN with custom configuration for medical-themed colors and design tokens
- **Icons**: Google Material Symbols via web fonts

### Authentication & User Management
- **Provider**: Supabase Auth with email/password and Google OAuth support
- **User Approval System**: New users require admin approval before accessing the app
- **Role-based Access**: Admin and user roles with `UserStatus` (pending, approved, blocked)
- **Protected Routes**: `ProtectedRoute` component enforces authentication and approval status

### Backend Architecture
- **Database & Auth**: Supabase (PostgreSQL) for user profiles and authentication
- **Serverless Functions**: Supabase Edge Functions (Deno runtime) for AI processing
- **CTG Analysis**: Edge function `ctg-analyze` processes cardiotocography images using OpenAI GPT-4o-mini with vision capabilities

### Key Application Features
1. **Gestational Age Calculator** (`/calc/ig`): Calculates gestational age from last menstrual period (DUM) and ultrasound measurements
2. **Cardiotocography Analysis** (`/flow/ctg/start`): AI-powered CTG interpretation following FIGO 2015 guidelines
3. **Medication Database** (`/medications`): FDA risk classification for medications during pregnancy
4. **Clinical Guidelines** (`/guides`): Evidence-based protocols for conditions like pre-eclampsia, diabetes
5. **Fetal Growth Restriction** (`/calc/fgr`): Barcelona classification system
6. **Ultrasound Biometry** (`/calc/usg`): Fetal weight estimation using Hadlock formula

### Data Flow for CTG Analysis
1. User uploads CTG image in frontend
2. Image converted to base64 and sent to Supabase Edge Function
3. Edge function calls OpenAI API with clinical prompt
4. Structured JSON response returned with FIGO classification
5. Frontend displays interpretation with urgency level and recommendations

### State Management
- React Context API for authentication state (`AuthContext`)
- Local component state for form data and UI interactions
- No external state management library needed for current complexity

## External Dependencies

### Supabase Services
- **Authentication**: Email/password, Google OAuth
- **Database**: PostgreSQL for user profiles table with columns: id, email, nome, especialidade, estado, cidade, role, status, created_at
- **Edge Functions**: Deno-based serverless functions for AI processing
- **Environment Variables**: `SUPABASE_ANON_KEY` for client-side access

### AI/ML Services
- **OpenAI API**: GPT-4o-mini with vision for CTG image analysis
- **Environment Variable**: `OPENAI_API_KEY` stored as Supabase secret
- **Gemini API**: Referenced in config but primarily using OpenAI for CTG
- **Environment Variable**: `GEMINI_API_KEY` for potential AI features

### External Fonts & Assets
- Google Fonts: Inter font family
- Google Material Symbols: Icon system

### Deployment
- **Platform**: Configured for Vercel deployment
- **Build Output**: `dist` directory from Vite build
- **SPA Routing**: Rewrites configured for client-side routing