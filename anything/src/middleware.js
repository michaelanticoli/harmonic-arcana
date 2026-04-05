import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-createxyz-project-id", "5d928596-db9e-41cc-9204-967d98da8333");
  requestHeaders.set("x-createxyz-project-group-id", "13c4bd3a-b47f-4527-a091-5a5114146679");


  request.nextUrl.href = `https://www.anything.com/${request.nextUrl.pathname}`;

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}