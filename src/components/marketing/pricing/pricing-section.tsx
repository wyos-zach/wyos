'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Check } from "lucide-react"

const benefits = [
  "Access to curated Knowledge section",
  "Access to vetted Resources section",
  "Access to the Community section",
  "Regular content updates",
  "Priority support",
]

export function PricingSection() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
      {/* Monthly Plan */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Monthly</CardTitle>
          <CardDescription>Pay month-to-month, cancel anytime</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="mb-6">
            <span className="text-4xl font-bold">$29.99</span>
            <span className="text-muted-foreground ml-1">/month</span>
          </div>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg">
            Get Started Monthly
          </Button>
        </CardFooter>
      </Card>

      {/* Annual Plan */}
      <Card className="flex flex-col relative before:absolute before:inset-0 before:border-2 before:border-primary before:rounded-lg before:-m-[2px]">
        <CardHeader>
          <CardTitle>Annual</CardTitle>
          <CardDescription>Our most popular plan</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="mb-6">
            <span className="text-4xl font-bold">$360</span>
            <span className="text-muted-foreground ml-1">/year</span>
            <div className="text-sm text-muted-foreground mt-1">
              $30/month, billed annually
            </div>
          </div>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg" variant="default">
            Get Started Annually
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
