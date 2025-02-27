# WYOS Project Brief

## Overview

WYOS (Writing Your Own Story) is a membership-based platform designed to help people cut through the noise of misinformation, manipulative tactics, and overwhelming choices online. It combines **curated knowledge**, **valuable resources**, and an **authentic community** into one cohesive application. WYOS empowers individuals to find what works for them, save time, and make meaningful progress in their lives. The platform is built using modern web technologies with a focus on maintainability, performance, and security.

## Core Features

### 1. Knowledge Section

- A curated library of the best ideas, insights, and wisdom from diverse sources (e.g., articles, videos, summaries).
- Topics include mindset, productivity, entrepreneurship, personal growth, and more.
- Features:
  - Category-based navigation for easy discovery.
  - Member comments on entries to share thoughts or insights.
  - Infinite scrolling for seamless exploration.

### 2. Resources Section

- A carefully curated collection of tools that actually work, such as apps, books, courses, podcasts, software, and YouTube channels.
- Features:
  - Ratings system where members can rate resources (1–5 stars).
  - Comments on resources to share opinions or experiences.
  - Focused lists (e.g., "Top 5") to reduce overwhelm.

### 3. Community

- Powered by Discourse forums but integrated with single sign-on (SSO) to feel like part of the same platform.
- A space for real conversations, collaboration, and accountability.
- Members can connect through forums and private messaging.

## **Membership Model**

- WYOS is a **paid subscription platform** using Stripe for payment processing.
- Benefits of membership:
  - Full access to the entire WYOS platform - Knowledge Hub, Resource Library, and Community.
  - Ability to comment on knowledge and resource entries and rate resources.
  - Participation in the community forums.
  - Members are the ones shaping the future of the platform.

## **Technical Architecture**

- Built with **Next.js 15** (App Router) for scalability and performance.
- Backend powered by **Appwrite**, handling authentication (email/password & OAuth), database management, and file storage.
- State management with **Zustand** and server state handled by **TanStack Query**.
- UI components from Shadcn styled using Tailwind CSS and animations using Motion (motion/react)

## **Design Philosophy**

- Inspired by platforms like Resend for a clean, modern, and premium aesthetic.
- Dark mode by default with glassmorphism effects and subtle gradients.
- Focus on simplicity and ease of navigation to avoid overwhelming users.

## **Unique Value Proposition**

WYOS is not just some self-help application or resource aggregation platform. It’s an honest, transparent space where members can find what they need when they need it without worrying about manipulation or any other bs:

1. **Curated Knowledge**: Actionable insights without fluff or manipulation.
2. **Trusted Resources**: Tools that work—vetted for quality and effectiveness.
3. **Authentic Community**: A supportive network that thrives on collaboration.

Unlike traditional platforms that prioritize quantity over quality or rely on manipulative tactics for profit, WYOS focuses on empowering its members to define their own success.

## **Target Audience**

WYOS is for:

- Individuals aged 18–35 who feel stuck or overwhelmed by traditional paths to success.
- People ready to take ownership of their lives but unsure where to start.
- Those seeking actionable advice without generic fluff or hidden agendas.

## **Why WYOS Exists**

The internet is full of fake content, manipulative tactics, and overwhelming choices. WYOS was created as a response—a place free from the noise where people can find real solutions that work for them. It’s not about telling users what to do; it’s about equipping them with the tools they need to write their own story.
