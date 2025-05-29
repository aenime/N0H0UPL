import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of available routes in the application
const AVAILABLE_ROUTES = [
  '/',
  '/about',
  '/animals',
  '/animals/injured',
  '/gaushala',
  '/child-welfare',
  '/environmental',
  '/donate',
  '/thank-you',
  '/jobs',
  '/volunteer',
  '/contact',
  '/admin',
  '/maintenance',
  '/environment-protection',
  '/community-outreach',
  '/adoption',
  '/advocacy'
];

// Routes that are temporarily under maintenance
const UNDER_MAINTENANCE = [
  '/medical-care',
  '/hunger-relief',
  '/animal-rescue'
];

// API routes don't need to be redirected
const API_ROUTES = ['/api', '/_next', '/images', '/favicon'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip for API routes, static files, etc.
  if (API_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Skip for dynamic animal routes
  if (pathname.startsWith('/animals/') && pathname !== '/animals/injured') {
    return NextResponse.next();
  }

  // Check if the route is under maintenance
  const isUnderMaintenance = UNDER_MAINTENANCE.some(route => 
    route === pathname || 
    (route.endsWith('/') && pathname === route.slice(0, -1)) ||
    (!route.endsWith('/') && pathname === route + '/')
  );

  if (isUnderMaintenance) {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.redirect(url);
  }
  
  // Check if the route is available
  const isAvailable = AVAILABLE_ROUTES.some(route => 
    route === pathname || 
    (route.endsWith('/') && pathname === route.slice(0, -1)) ||
    (!route.endsWith('/') && pathname === route + '/')
  );
  
  // If route is not available and not the maintenance page itself, redirect to maintenance
  if (!isAvailable && pathname !== '/maintenance') {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except for API routes, static files, etc.
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};