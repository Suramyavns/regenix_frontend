import { NextResponse } from "next/server";
import { auth } from "../Firebase";


const protectedRoutes = ["/home/dashboard",'/home/profile','/home/settings/','/home/tasks'];


export default function middleware(req) {
  if (!auth.currentUser && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}