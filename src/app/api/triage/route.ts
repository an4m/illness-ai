import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

interface TriageRequest {
  diseaseCategory: string;
  answers: Record<string, any>;
}

interface TriageResponse {
  ragStatus: 'green' | 'amber' | 'red';
  reasoning: string;
  advice: string;
  urgencyLevel: string;
  redFlags: string[];
  followUpRequired: boolean;
  emergencyCode?: string;
  symptomSummary?: string;
  possibleDiagnosis?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: TriageRequest = await req.json();
    const { diseaseCategory, answers } = body;

    // Build the prompt from questionnaire answers
    const prompt = buildTriagePrompt(diseaseCategory, answers);

    // Call OpenAI using Vercel AI SDK
    const { text } = await generateText({
      model: openai('gpt-4-turbo'),
      prompt,
      temperature: 0.3, // Lower temperature for more consistent medical triage
    });

    // Parse the AI response
    const triageResult = parseAIResponse(text);

    // Generate emergency code if RED status
    if (triageResult.ragStatus === 'red') {
      triageResult.emergencyCode = generateEmergencyCode();
      // TODO: Store consultation in database with emergency code
    }

    return NextResponse.json(triageResult);
  } catch (error) {
    console.error('Triage API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process triage request',
        ragStatus: 'amber', // Default to amber on error for safety
        advice: 'We encountered an issue processing your responses. Please call NHS 111 for advice.',
        reasoning: 'System error occurred during assessment',
        urgencyLevel: 'same-day',
        redFlags: [],
        followUpRequired: true,
        symptomSummary: 'We were unable to fully process your symptom information due to a technical issue.',
        possibleDiagnosis: 'A healthcare professional should review your symptoms to provide proper assessment.',
      },
      { status: 500 }
    );
  }
}

function buildTriagePrompt(diseaseCategory: string, answers: Record<string, any>): string {
  const socratesData = {
    site: answers.site || 'Not specified',
    onset: answers.onset || 'Not specified',
    character: Array.isArray(answers.character) ? answers.character.join(', ') : 'Not specified',
    radiation: answers.radiation || 'Not specified',
    associations: Array.isArray(answers.associations) ? answers.associations.join(', ') : 'Not specified',
    timing: answers.timing || 'Not specified',
    exacerbating: Array.isArray(answers.exacerbating) ? answers.exacerbating.join(', ') : 'Not specified',
    severity: answers.severity || 'Not specified',
  };

  const iceData = {
    ideas: answers.ice_ideas || 'Not specified',
    concerns: answers.ice_concerns || 'Not specified',
    expectations: answers.ice_expectations || 'Not specified',
  };

  return `You are a medical triage AI assistant helping to classify patient symptoms using a RAG (Red-Amber-Green) system. This is NOT a diagnostic tool, but a triage system to determine urgency of care.

CRITICAL SAFETY REQUIREMENTS:
- Default to AMBER or RED when uncertain
- Never minimize emergency symptoms
- Follow conservative thresholds for risk classification
- RED outcomes require immediate emergency care (999)
- AMBER outcomes require same-day medical attention (NHS 111 or GP)
- GREEN outcomes are low-risk with follow-up monitoring

DISEASE CATEGORY: ${diseaseCategory}

PATIENT SYMPTOMS (SOCRATES Framework):
- Site: ${socratesData.site}
- Onset: ${socratesData.onset}
- Character: ${socratesData.character}
- Radiation: ${socratesData.radiation}
- Associated symptoms: ${socratesData.associations}
- Timing: ${socratesData.timing}
- Exacerbating/Relieving factors: ${socratesData.exacerbating}
- Severity (1-10): ${socratesData.severity}

PATIENT CONTEXT (ICE Framework):
- Patient's ideas: ${iceData.ideas}
- Concern level (1-5): ${iceData.concerns}
- Expectations: ${iceData.expectations}

Based on these symptoms, provide a RAG classification with the following JSON structure:
{
  "ragStatus": "red" | "amber" | "green",
  "reasoning": "Brief clinical reasoning for the classification",
  "advice": "Clear, supportive advice for the patient based on RAG status. Format as bullet points separated by newlines, with each point starting with '* ' (asterisk and space). Each bullet point should be a complete, actionable recommendation.",
  "urgencyLevel": "immediate" | "same-day" | "routine" | "self-care",
  "redFlags": ["list", "of", "concerning", "symptoms", "if any"],
  "followUpRequired": true | false,
  "symptomSummary": "A natural, empathetic 2-3 sentence summary of what the patient reported (e.g., 'You have reported a severe headache that started suddenly. You mentioned it's throbbing in nature and you're very worried about it.')",
  "possibleDiagnosis": "A brief, non-definitive explanation of what this could indicate (e.g., 'This could be a tension headache, migraine, or in rare cases, something more serious. Further assessment is needed to determine the exact cause.')"
}

RED FLAG CRITERIA (must be RED):
- Chest pain with radiation to arm/jaw, breathlessness, or severe severity (>7/10)
- Sudden severe headache ("thunderclap")
- Difficulty breathing at rest
- Loss of consciousness or confusion
- Severe abdominal pain with vomiting or fever
- Signs of stroke (facial drooping, arm weakness, speech difficulty)
- Severe bleeding or trauma
- Suicidal thoughts or severe mental health crisis

AMBER CRITERIA:
- Moderate severity (4-7/10) with concerning features
- Symptoms worsening over hours/days
- Patient highly concerned (concern level 4-5)
- Unclear diagnosis requiring same-day assessment

GREEN CRITERIA:
- Mild symptoms (1-3/10)
- Chronic/stable condition
- Self-limiting illness
- No red flags or concerning features

Respond ONLY with valid JSON. No additional text.`;
}

function parseAIResponse(text: string): TriageResponse {
  try {
    // Remove markdown code blocks if present
    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleanedText);

    // Validate required fields
    if (!parsed.ragStatus || !['red', 'amber', 'green'].includes(parsed.ragStatus)) {
      throw new Error('Invalid RAG status');
    }

    return {
      ragStatus: parsed.ragStatus,
      reasoning: parsed.reasoning || 'No reasoning provided',
      advice: parsed.advice || 'Please seek medical advice',
      urgencyLevel: parsed.urgencyLevel || 'same-day',
      redFlags: parsed.redFlags || [],
      followUpRequired: parsed.followUpRequired ?? true,
      symptomSummary: parsed.symptomSummary || 'Unable to generate summary',
      possibleDiagnosis: parsed.possibleDiagnosis || 'Unable to provide assessment',
    };
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    // Default to amber for safety if parsing fails
    return {
      ragStatus: 'amber',
      reasoning: 'Unable to properly assess risk level',
      advice: 'Please call NHS 111 for a proper assessment of your symptoms.',
      urgencyLevel: 'same-day',
      redFlags: [],
      followUpRequired: true,
      symptomSummary: 'We encountered an issue processing your symptom information.',
      possibleDiagnosis: 'A healthcare professional should review your symptoms.',
    };
  }
}

function generateEmergencyCode(): string {
  // Generate a unique 6-character alphanumeric code (e.g., ABC123)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
