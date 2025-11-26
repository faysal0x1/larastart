"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ComingSoon() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Set launch date (30 days from now)
  const launchDate = new Date()
  launchDate.setDate(launchDate.getDate() + 30)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      console.log("[v0] Email submitted:", email)
      // Here you would typically send the email to your backend
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-12">
        {/* Logo/Brand */}
        <div className="space-y-2">
          <div className="inline-block">
            <div className="w-16 h-16 bg-accent rounded-lg mx-auto mb-6" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance">
            Something amazing is coming soon
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            We're working hard to bring you an incredible experience. Be the first to know when we launch.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-4xl md:text-5xl font-bold text-foreground font-mono">
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <div className="text-sm text-muted-foreground mt-2">Days</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-4xl md:text-5xl font-bold text-foreground font-mono">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="text-sm text-muted-foreground mt-2">Hours</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-4xl md:text-5xl font-bold text-foreground font-mono">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="text-sm text-muted-foreground mt-2">Minutes</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-4xl md:text-5xl font-bold text-foreground font-mono">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className="text-sm text-muted-foreground mt-2">Seconds</div>
          </div>
        </div>

        {/* Email Signup */}
        <div className="max-w-md mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-card border-border text-foreground placeholder:text-muted-foreground"
                />
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Notify Me
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">We'll send you an email when we launch. No spam, promise.</p>
            </form>
          ) : (
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-accent text-4xl mb-2">✓</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">You're on the list!</h3>
              <p className="text-muted-foreground">
                We'll notify you at <span className="text-foreground font-medium">{email}</span> when we launch.
              </p>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 pt-8">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
