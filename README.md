# Car Dealer App

A Next.js application that allows users to search for vehicles by make and year, displaying detailed model information.

## Features

- Filter vehicles by make and model year
- Beautiful, responsive UI using Tailwind CSS and shadcn/ui components
- Server-side generation of static paths for optimal performance
- Error handling and loading states
- Modern, production-ready design

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
```

## Technology Stack

- Next.js 13.5
- React 18
- Tailwind CSS
- shadcn/ui Components
- TypeScript

## API Integration

The application integrates with the NHTSA Vehicle API to fetch:
- Vehicle makes
- Vehicle models by make ID and year

## Project Structure

- `app/page.tsx` - Home page with vehicle search filters
- `app/result/[makeId]/[year]/page.tsx` - Results page showing vehicle models
- `app/result/[makeId]/[year]/vehicle-results.tsx` - Vehicle results component
- Components from shadcn/ui for UI elements

## Features

- Responsive design
- Loading states with Suspense
- Error handling
- Type-safe with TypeScript
- Modern UI with smooth transitions
- SEO-friendly with static generation