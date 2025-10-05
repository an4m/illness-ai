# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Personal Healthcare Assistant** web application - a patient triage tool designed to guide users through structured health checkups for 10 common diseases. The app does NOT diagnose, but collects symptom data, routes users through disease-specific question flows, and classifies outcomes using a RAG system (Red-Amber-Green).

**Critical Safety Requirements:**
- Safety-first logic: default to AMBER/RED when uncertain
- Never provide medical diagnoses - this is a triage tool only
- Follow conservative thresholds for risk classification
- All emergency (RED) outcomes must generate consultation codes accessible at `/emergency/[code]`

## Architecture

### Core User Flow
1. **Landing Page** → 10 disease category buttons (+ general GP fallback)
2. **Hidden 11-Step Questionnaire** → SOCRATES framework (Site, Onset, Character, Radiation, Associations, Timing, Exacerbating/Relieving, Severity)
3. **ICE Integration** → Ideas, Concerns, Expectations questions
4. **API-Driven Clarifiers** → Up to 10 additional questions based on red flags
5. **RAG Triage Engine** → Classify as RED/AMBER/GREEN
6. **Follow-up** → SMS monitoring for GREEN cases (12h check-in)

### Disease Categories
1. Chest Pain / Heart Concerns
2. High Blood Pressure
3. Breathing Problems
4. Stomach & Bowel Symptoms
5. Headache & Neurology
6. Mood, Anxiety & Sleep
7. Back, Joint & Muscle Pain
8. Skin & Moles
9. Urinary & Kidney
10. Diabetes & Blood Sugar

### RAG Outcome System
- **GREEN**: "Everything looks good" + lifestyle advice + 12h SMS follow-up ("Have symptoms improved? YES/NO")
  - YES → Case closed
  - NO → Escalate to AMBER (mild) or RED (red flags/worsening)
- **AMBER**: "Call NHS 111" or "Book GP appointment soon"
- **RED**: "Call 999 immediately" + generate consultation code for emergency services

### Emergency Code System
- Each consultation generates unique alphanumeric code (e.g., ABC123)
- RED outcomes display: "Call 999 now. Share code ABC123"
- Clinicians access full summary at `/emergency/[code]` with: timestamp, disease category, key symptoms, severity, red flags, RAG outcome

## Tech Stack

**Framework:** Next.js (App Router recommended for latest features)
- Frontend: React components with wizard-style questionnaire
- Backend: Next.js API routes (API handling, RAG engine, code generation)
- Database: PostgreSQL (anonymized consultations + codes)
- SMS: Twilio or NHS-approved SMS provider
- Hosting: Vercel (recommended) or AWS/Azure

**Current State:** Early stage - migrating to Next.js

## Common Commands

```bash
# Development
npm run dev          # Start Next.js dev server (http://localhost:3000)

# Building
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run test suite
npm run test:watch   # Run tests in watch mode

# Linting
npm run lint         # Run ESLint
```

## Development Phases

**Phase 1 (MVP):**
- 5 disease buttons: Chest, Breathing, Headache, Stomach, Urinary
- Static RAG rules
- Emergency code system

**Phase 2:**
- All 10 disease buttons
- API clarifiers
- `/emergency/[code]` clinician pages
- SMS follow-up for GREEN outcomes

**Phase 3:**
- Multi-language support
- AI-driven triage refinement
- NHS/Telehealth integration
- Media uploads (skin photos)

## Question Flow Design

Each disease flow must:
- Collect all SOCRATES components tailored to that disease (e.g., chest pain → radiation to arm/jaw; skin → mole changes)
- Include ICE framework questions before final summary
- Use 1-5 scales, yes/no, and multiple choice formats
- Trigger API clarifiers based on red flags or unclear responses
- Package answers as: `{ disease_type, demographics, SOCRATES_answers, ICE_answers, severity, red_flags }`

## Non-Functional Requirements

- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: <2s load time per step
- **Privacy**: Anonymized consultation codes, GDPR-compliant storage, minimal data collection
- **Security**: HTTPS, encrypted DB, audit logging for emergency page access
- **Monitoring**: Error tracking (Sentry), uptime monitoring

## Important Constraints

- Never give false reassurance - conservative thresholds are critical
- Use gentle, supportive wording for RED/AMBER outcomes with clear next steps
- Emergency code system must be reliable and secure (clinicians depend on it)
- SMS follow-up is only for GREEN outcomes
- All data must be anonymized and encrypted
