import { NextResponse } from "next/server"

export default function middleware(request) {
  const authToken = request.cookies.get('authtoken');
  const publicRoutes = ['/signup', '/signin', '/verify', '/reset-password/:path*'];
  const protectedRoutes = ['/profile'];

  if (!authToken && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_HOST + '/signin');
  } else if (authToken && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_HOST + '/profile');
  } else {
    return NextResponse.next();
  }

}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}