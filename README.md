# Qorvo x SpaceXAI

Passworded site. A point of view for Qorvo. Grok Bot from SpaceXAI.

## What it is

Three illustrative workflows on one page. Each workflow has a short problem statement, an interactive Grok Bot demo, and a review-ready draft. Below that: a comparison table and six public Grok Bot testimonials.

The workflows are not a confirmed Qorvo need. They stay in draft until a person reviews them.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Set `SITE_PASSWORD=land2expand` in `.env.local`. The site fails closed if that variable is missing.

## Content guard

```bash
npm run check:content
```

The guard scans authored `src`, public text assets, README, package metadata, and `.env.example`. It fails on leftover customer tokens, banned accent hexes, and the U+2014 character.

## Deploy

Preview only under the `jasonwiker` Vercel team, project name `qorvo-gtm`. Set `SITE_PASSWORD=land2expand`. Do not promote to a public production domain until Jason says so.
