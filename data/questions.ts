import { Framework } from '@/lib/db'

export interface Question {
  id: string
  text: string
  nd_note?: string
  section?: string
}

export interface FrameworkMeta {
  id: Framework
  name: string
  emoji: string
  description: string
  whenToUse: string
  sections?: string[]
  questions: Question[]
}

// ─── Chemistry Session ────────────────────────────────────────────────────────

const chemistryQuestions: Question[] = [
  {
    id: 'chem_1',
    text: 'What would make this coaching relationship feel genuinely useful to you?',
    nd_note: 'Centres the relationship around their needs, not a template',
  },
  {
    id: 'chem_2',
    text: 'What do you notice about how you work at your best?',
    nd_note: 'Observation-based — avoids "why" which triggers defensiveness',
  },
  {
    id: 'chem_3',
    text: 'What environments help you think most clearly?',
    nd_note: 'Explores sensory and environmental factors often overlooked',
  },
  {
    id: 'chem_4',
    text: 'What should I know about how you communicate that would help me support you better?',
    nd_note: 'Acknowledges communication differences without judgement',
  },
  {
    id: 'chem_5',
    text: 'What gives you energy at work? What tends to drain you?',
    nd_note: 'Energy before productivity — core ND principle',
  },
  {
    id: 'chem_6',
    text: 'What are you most proud of that others might not always notice?',
    nd_note: 'Surfaces hidden strengths often masked by ND presentation',
  },
  {
    id: 'chem_7',
    text: 'What strengths emerge when you stop trying to be like everyone else?',
    nd_note: 'Reframes neurodivergence as a source of strength',
  },
  {
    id: 'chem_8',
    text: 'Where do you feel most like yourself at work?',
    nd_note: 'Begins exploring masking and authentic self',
  },
  {
    id: 'chem_9',
    text: "What would 'success' in this coaching look like if it were designed around how your mind works?",
    nd_note: 'Design success around the individual, not a neurotypical template',
  },
  {
    id: 'chem_10',
    text: 'Is there anything you\'d like me to know about how you prefer to receive feedback or support?',
    nd_note: 'Explicit communication preferences reduce misunderstanding',
  },
]

// ─── CLEAR Model ──────────────────────────────────────────────────────────────

const clearQuestions: Question[] = [
  {
    id: 'clear_c1',
    section: 'Contract',
    text: 'What would a working agreement look like that genuinely suits how you operate?',
    nd_note: 'Contracts should flex around the person, not the other way',
  },
  {
    id: 'clear_c2',
    section: 'Contract',
    text: 'What boundaries or conditions would help you show up fully in our sessions?',
    nd_note: 'Many AuDHD individuals need explicit, predictable structure',
  },
  {
    id: 'clear_l1',
    section: 'Listen',
    text: 'What do you most want me to understand about your experience right now?',
    nd_note: 'Open listening before any goal-setting',
  },
  {
    id: 'clear_l2',
    section: 'Listen',
    text: 'What is your nervous system trying to tell you at the moment?',
    nd_note: 'Connects to body awareness — often disconnected in AuDHD',
  },
  {
    id: 'clear_e1',
    section: 'Explore',
    text: 'What feels most important to focus on, and what feels too overwhelming to approach right now?',
    nd_note: 'Separates importance from capacity — critical for ND',
  },
  {
    id: 'clear_e2',
    section: 'Explore',
    text: 'What do you notice is getting in the way — is it information, energy, or something else?',
    nd_note: 'Distinguishes executive dysfunction from motivation',
  },
  {
    id: 'clear_a1',
    section: 'Action',
    text: 'What feels like a realistic next step given your current energy levels?',
    nd_note: 'Anchors action to capacity, not to an ideal',
  },
  {
    id: 'clear_a2',
    section: 'Action',
    text: 'What would make this step feel more manageable or less overwhelming?',
    nd_note: 'Task initiation is often the barrier, not capability',
  },
  {
    id: 'clear_r1',
    section: 'Review',
    text: "What do you notice about what's working in how we've been working together?",
    nd_note: 'Regular review helps AuDHD individuals calibrate',
  },
  {
    id: 'clear_r2',
    section: 'Review',
    text: 'What needs to shift so these sessions feel more useful for you?',
    nd_note: 'Keeps the coaching relationship adaptive and honest',
  },
]

// ─── GROW Model ───────────────────────────────────────────────────────────────

const growQuestions: Question[] = [
  {
    id: 'grow_g1',
    section: 'Goal',
    text: "What would feel like a good outcome from today's conversation?",
    nd_note: 'Small, session-scoped goals reduce overwhelm',
  },
  {
    id: 'grow_g2',
    section: 'Goal',
    text: 'What do you want to feel differently about after we talk?',
    nd_note: 'Emotional outcomes matter as much as task outcomes',
  },
  {
    id: 'grow_r1',
    section: 'Reality',
    text: 'What do you notice is happening right now — in your work and in yourself?',
    nd_note: 'Observation before interpretation — avoids "why" questions',
  },
  {
    id: 'grow_r2',
    section: 'Reality',
    text: 'What happened when you sat down to begin this task?',
    nd_note: 'Explores task initiation without implying blame',
  },
  {
    id: 'grow_r3',
    section: 'Reality',
    text: 'What feels overwhelming right now?',
    nd_note: 'Names the experience without assuming the cause',
  },
  {
    id: 'grow_o1',
    section: 'Options',
    text: "What might be possible if capacity weren't a constraint?",
    nd_note: 'Separates creativity from current energy state',
  },
  {
    id: 'grow_o2',
    section: 'Options',
    text: 'What is making this difficult to start — and what might make it easier?',
    nd_note: 'Focuses on the barrier, not the person',
  },
  {
    id: 'grow_o3',
    section: 'Options',
    text: 'What would a version of this that works for your brain look like?',
    nd_note: 'Designing tasks around neurodivergent strengths',
  },
  {
    id: 'grow_w1',
    section: 'Way Forward',
    text: 'What feels manageable to commit to this week, given your current bandwidth?',
    nd_note: 'Bandwidth-aware commitment prevents boom-bust cycles',
  },
  {
    id: 'grow_w2',
    section: 'Way Forward',
    text: 'What would tell you that this week has gone well enough?',
    nd_note: '"Good enough" framing counters perfectionism common in AuDHD',
  },
]

// ─── OSCAR Model ──────────────────────────────────────────────────────────────

const oscarQuestions: Question[] = [
  {
    id: 'oscar_o1',
    section: 'Outcome',
    text: "What would long-term success look like if it were designed around your brain rather than someone else's?",
    nd_note: 'The most powerful reframe — success on their terms',
  },
  {
    id: 'oscar_o2',
    section: 'Outcome',
    text: 'What do people naturally come to you for? How does that connect to your development goals?',
    nd_note: 'Anchors growth in existing, often unrecognised strengths',
  },
  {
    id: 'oscar_s1',
    section: 'Situation',
    text: 'What is your nervous system telling you about where you are right now?',
    nd_note: 'Somatic awareness is often the most honest data point',
  },
  {
    id: 'oscar_s2',
    section: 'Situation',
    text: "What does your current energy look like — and what's consuming it?",
    nd_note: 'Energy audit before development planning',
  },
  {
    id: 'oscar_c1',
    section: 'Choices',
    text: 'What options feel energising vs. draining when you consider them?',
    nd_note: 'Energy response is a valid decision-making tool',
  },
  {
    id: 'oscar_c2',
    section: 'Choices',
    text: 'What expectations are you carrying that might not actually belong to you?',
    nd_note: 'Helps separate internalised neurotypical standards from genuine goals',
  },
  {
    id: 'oscar_a1',
    section: 'Actions',
    text: 'What small step would feel sustainable rather than overwhelming?',
    nd_note: 'Sustainable > ambitious for long-term AuDHD wellbeing',
  },
  {
    id: 'oscar_a2',
    section: 'Actions',
    text: 'What conditions or environment would help you take this step?',
    nd_note: 'Environmental design matters enormously for ND individuals',
  },
  {
    id: 'oscar_r1',
    section: 'Review',
    text: "What are you noticing about your own patterns, strengths and needs?",
    nd_note: 'Self-knowledge over self-criticism',
  },
  {
    id: 'oscar_r2',
    section: 'Review',
    text: 'What has shifted in how you understand yourself since we began?',
    nd_note: 'Tracks growth in self-awareness, not just task completion',
  },
]

// ─── Johari's Window ──────────────────────────────────────────────────────────

const johariQuestions: Question[] = [
  {
    id: 'johari_open1',
    section: 'Open Area',
    text: 'What do you feel others see clearly about you at work — strengths and ways of working?',
    nd_note: 'The open area — known to self and others',
  },
  {
    id: 'johari_open2',
    section: 'Open Area',
    text: 'What do you feel easy and natural sharing about how you work?',
    nd_note: 'Establishes the baseline of self-disclosure',
  },
  {
    id: 'johari_blind1',
    section: 'Blind Spot',
    text: 'What feedback have you received that genuinely surprised you — positive or challenging?',
    nd_note: 'Blind spots — known to others, unknown to self',
  },
  {
    id: 'johari_blind2',
    section: 'Blind Spot',
    text: 'What do you think others might observe about you that you might not fully see yourself?',
    nd_note: 'Gentle exploration without shame',
  },
  {
    id: 'johari_hidden1',
    section: 'Hidden Area',
    text: "What are you carrying at work that others don't know about?",
    nd_note: 'Hidden area — often where masking lives',
  },
  {
    id: 'johari_hidden2',
    section: 'Hidden Area',
    text: 'What are you spending energy hiding or managing in work situations?',
    nd_note: 'Masking is exhausting — naming it is the first step',
  },
  {
    id: 'johari_hidden3',
    section: 'Hidden Area',
    text: 'Where do you feel you are performing rather than being yourself?',
    nd_note: 'Performance vs authenticity — common AuDHD experience',
  },
  {
    id: 'johari_unknown1',
    section: 'Unknown Area',
    text: "Where do you sense there might be untapped potential you haven't had space to explore?",
    nd_note: 'Unknown area — what neither self nor others yet see',
  },
  {
    id: 'johari_unknown2',
    section: 'Unknown Area',
    text: 'What do you become deeply absorbed in when given the freedom to choose?',
    nd_note: 'Hyperfocus as a window into the unknown area',
  },
  {
    id: 'johari_unknown3',
    section: 'Unknown Area',
    text: 'What would change if you stopped working against yourself and started working with yourself?',
    nd_note: 'Opens the door to the unknown with curiosity not pressure',
  },
]

// ─── Framework Registry ───────────────────────────────────────────────────────

export const frameworks: FrameworkMeta[] = [
  {
    id: 'chemistry',
    name: 'Chemistry Session',
    emoji: '✨',
    description: 'Initial rapport building — getting to know how someone thinks, works and thrives.',
    whenToUse: 'Use first, before any other framework. Sets the foundation.',
    questions: chemistryQuestions,
  },
  {
    id: 'clear',
    name: 'CLEAR Model',
    emoji: '🔵',
    description: 'Contracting, listening, exploring, action and review — structured yet flexible.',
    whenToUse: 'When you need to (re)establish a working agreement or go deeper.',
    sections: ['Contract', 'Listen', 'Explore', 'Action', 'Review'],
    questions: clearQuestions,
  },
  {
    id: 'grow',
    name: 'GROW Model',
    emoji: '🌱',
    description: 'Goal, reality, options, way forward — great for day-to-day challenges.',
    whenToUse: 'For daily or recurring tasks, blockers, and practical goal-setting.',
    sections: ['Goal', 'Reality', 'Options', 'Way Forward'],
    questions: growQuestions,
  },
  {
    id: 'oscar',
    name: 'OSCAR Model',
    emoji: '🌟',
    description: 'Outcome, situation, choices, actions, review — for longer-term growth.',
    whenToUse: 'When focusing on career development and longer-term goals.',
    sections: ['Outcome', 'Situation', 'Choices', 'Actions', 'Review'],
    questions: oscarQuestions,
  },
  {
    id: 'johari',
    name: "Johari's Window",
    emoji: '🪟',
    description: 'Open, blind spot, hidden and unknown — a self-awareness deep dive.',
    whenToUse: 'When exploring identity, masking, and authentic self at work.',
    sections: ['Open Area', 'Blind Spot', 'Hidden Area', 'Unknown Area'],
    questions: johariQuestions,
  },
]

export function getFramework(id: Framework): FrameworkMeta | undefined {
  return frameworks.find((f) => f.id === id)
}

export function getFrameworkQuestions(id: Framework): Question[] {
  return getFramework(id)?.questions ?? []
}
