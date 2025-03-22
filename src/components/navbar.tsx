"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSession, signOut } from "next-auth/react"
import { Menu, X, Briefcase } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 md:mr-8">
          <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold">
            <Briefcase className="h-6 w-6 text-primary" />
            <span>Jobify</span>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="ml-auto md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <Link
            href="/jobs"
            className={`relative px-3 py-1.5 rounded-md transition-all duration-200 hover:text-primary hover:bg-primary/5 ${
              pathname === "/jobs" 
                ? "text-primary bg-primary/5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" 
                : "text-foreground/60 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
            }`}
          >
            Jobs
          </Link>
          <Link
            href="/companies"
            className={`relative px-3 py-1.5 rounded-md transition-all duration-200 hover:text-primary hover:bg-primary/5 ${
              pathname === "/companies" 
                ? "text-primary bg-primary/5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" 
                : "text-foreground/60 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
            }`}
          >
            Companies
          </Link>
          {session && (
            <Link
              href="/applications"
              className={`relative px-3 py-1.5 rounded-md transition-all duration-200 hover:text-primary hover:bg-primary/5 ${
                pathname === "/applications" 
                  ? "text-primary bg-primary/5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" 
                  : "text-foreground/60 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
              }`}
            >
              My Applications
            </Link>
          )}
          <Link
            href="/post-a-job"
            className={`relative px-3 py-1.5 rounded-md transition-all duration-200 hover:text-primary hover:bg-primary/5 ${
              pathname === "/post-a-job" 
                ? "text-primary bg-primary/5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" 
                : "text-foreground/60 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
            }`}
          >
            Post a Job
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex ml-auto items-center space-x-4">
          <ThemeToggle />
          {session ? (
            <>
              <Button
                variant="ghost"
                className="text-foreground/60 hover:text-foreground/80"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
              <Link href="/dashboard">
                {/* <Button>Dashboard</Button> */}
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/jobs"
                className={`relative px-3 py-1.5 rounded-md transition-all duration-200 hover:text-primary hover:bg-primary/5 ${
                  pathname === "/jobs" 
                    ? "text-primary bg-primary/5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" 
                    : "text-foreground/60 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
                }`}
                onClick={toggleMenu}
              >
                Jobs
              </Link>
              <Link
                href="/companies"
                className={`relative px-3 py-1.5 rounded-md transition-all duration-200 hover:text-primary hover:bg-primary/5 ${
                  pathname === "/companies" 
                    ? "text-primary bg-primary/5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" 
                    : "text-foreground/60 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
                }`}
                onClick={toggleMenu}
              >
                Companies
              </Link>
              {session && (
                <Link
                  href="/applications"
                  className={`relative px-3 py-1.5 rounded-md transition-all duration-200 hover:text-primary hover:bg-primary/5 ${
                    pathname === "/applications" 
                      ? "text-primary bg-primary/5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" 
                      : "text-foreground/60 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
                  }`}
                  onClick={toggleMenu}
                >
                  My Applications
                </Link>
              )}
              <Link
                href="/post-a-job"
                className={`relative px-3 py-1.5 rounded-md transition-all duration-200 hover:text-primary hover:bg-primary/5 ${
                  pathname === "/post-a-job" 
                    ? "text-primary bg-primary/5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" 
                    : "text-foreground/60 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
                }`}
                onClick={toggleMenu}
              >
                Post a Job
              </Link>
            </nav>
            <div className="flex flex-col space-y-4">
              <ThemeToggle />
              {session ? (
                <>
                  <Button
                    variant="ghost"
                    className="text-foreground/60 hover:text-foreground/80"
                    onClick={() => {
                      signOut()
                      toggleMenu()
                    }}
                  >
                    Sign Out
                  </Button>
                  <Link href="/dashboard" onClick={toggleMenu}>
                    <Button className="w-full">Dashboard</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" onClick={toggleMenu}>
                    <Button variant="ghost" className="w-full">Login</Button>
                  </Link>
                  <Link href="/auth/signup" onClick={toggleMenu}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 