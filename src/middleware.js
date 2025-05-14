import { NextResponse } from "next/server"

export default function middleware(request) {
  const authToken = request.cookies.get('authtoken');
  const publicRoutes = ['/signup', '/signin'];
  const protectedRoutes = ['/profile'];

  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname) || request.nextUrl.pathname.startsWith('/reset-password');
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

  if (!authToken && isProtectedRoute) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_HOST + '/signin');
  } else if (authToken && isPublicRoute) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_HOST + '/profile');
  } else {
    return NextResponse.next();
  }

}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}