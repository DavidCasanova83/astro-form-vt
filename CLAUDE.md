# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:4321 |
| `npm run build` | Build production site to ./dist/ |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## Project Architecture

This is an Astro-based form collection application for tourism data, deployed on Vercel with AWS DynamoDB backend.

### Core Structure
- **Multi-step forms**: Three-step form process (`form1.astro`, `form2.astro`, `form3.astro`) for different cities
- **Dynamic routing**: Forms are generated for each city using `[city]/` dynamic routes
- **Data persistence**: Forms save to AWS DynamoDB via serverless API endpoints
- **Statistics dashboard**: Real-time charts and analytics for form submissions

### Key Components
- **City-based forms**: Each city has its own form flow with city-specific routing
- **LocalStorage**: Client-side form data persistence between steps
- **API endpoints**: `/api/saveAnswer.js` for form submission, `/api/getAllForms.js` for data retrieval
- **AlpineJS**: Frontend interactivity and form state management
- **Chart.js**: Data visualization for statistics dashboard

### Data Flow
1. User selects city → Dynamic form pages generated from `cities.json`
2. Form data stored in localStorage between steps
3. Final submission sends data to DynamoDB via API
4. Statistics page aggregates and visualizes all submissions

### Key Files
- `src/data/cities.json`: Defines available cities for form generation
- `src/pages/[city]/form*.astro`: Dynamic form templates
- `src/pages/statistiques.astro`: Dashboard with data visualization
- `api/saveAnswer.js`: DynamoDB write operations
- `api/getAllForms.js`: DynamoDB read operations for statistics

### Technologies
- **Astro**: Static site generation with dynamic routes
- **TailwindCSS**: Utility-first CSS framework
- **AlpineJS**: Lightweight JavaScript framework
- **AWS DynamoDB**: NoSQL database for form storage
- **Vercel**: Deployment platform with serverless functions

### Environment Variables
- `AWS_REGION`: AWS region for DynamoDB
- `DYNAMODB_TABLE`: DynamoDB table name for storing form data