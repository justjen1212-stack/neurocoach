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

// ─── Early Resolution ─────────────────────────────────────────────────────────

const resolutionQuestions: Question[] = [
  {
    id: 'res_u1',
    section: 'Understand First',
    text: "What's actually changed recently — in workload, environment, team dynamics, or their personal circumstances?",
    nd_note: 'Most issues have a root cause — find it before acting',
  },
  {
    id: 'res_u2',
    section: 'Understand First',
    text: 'Is this a capability issue (something getting in the way) or a conduct issue (a deliberate choice)?',
    nd_note: 'For AuDHD staff, what looks like conduct is often capability',
  },
  {
    id: 'res_u3',
    section: 'Understand First',
    text: 'Have you had any informal conversation about this yet — and if not, what has held you back?',
    nd_note: 'Avoiding the conversation is the most common reason things escalate',
  },
  {
    id: 'res_u4',
    section: 'Understand First',
    text: 'Have expectations been made fully explicit — not just assumed?',
    nd_note: 'AuDHD individuals often miss implied expectations entirely',
  },
  {
    id: 'res_b1',
    section: 'Before the Conversation',
    text: 'What support or adjustments could you offer that might resolve this before a formal process is needed?',
    nd_note: 'Support first — formal action is a last resort',
  },
  {
    id: 'res_b2',
    section: 'Before the Conversation',
    text: 'What is the one specific, concrete change you are asking for — and is it realistic given their capacity?',
    nd_note: 'Vague asks ("just try harder") don\'t work for AuDHD individuals',
  },
  {
    id: 'res_b3',
    section: 'Before the Conversation',
    text: 'Have you told this person clearly — not just implied — that the current situation cannot continue?',
    nd_note: 'AuDHD individuals may not read softened framing as serious',
  },
  {
    id: 'res_b4',
    section: 'Before the Conversation',
    text: 'What would a fair outcome look like for both of you — not just for the organisation?',
    nd_note: 'Perceived fairness matters as much as the outcome itself',
  },
  {
    id: 'res_c1',
    section: 'Having the Conversation',
    text: 'How will you open the conversation in a way that feels safe, not threatening?',
    nd_note: 'AuDHD individuals in threat-detection mode cannot process feedback',
  },
  {
    id: 'res_c2',
    section: 'Having the Conversation',
    text: 'What format will work best for them — in-person, written first, or a blend?',
    nd_note: 'Many AuDHD individuals process written information better under stress',
  },
  {
    id: 'res_c3',
    section: 'Having the Conversation',
    text: 'How will you make space for them to share their perspective — not just receive yours?',
    nd_note: 'One-sided conversations breed grievances',
  },
  {
    id: 'res_c4',
    section: 'Having the Conversation',
    text: 'What small, observable change would tell you things are improving in 2 weeks?',
    nd_note: 'Short-horizon markers work better than open-ended expectations',
  },
  {
    id: 'res_e1',
    section: 'Escalation Awareness',
    text: 'At what point — and under what circumstances — would you move to a formal process?',
    nd_note: 'A clear threshold prevents both premature and delayed escalation',
  },
  {
    id: 'res_e2',
    section: 'Escalation Awareness',
    text: 'Is mediation worth exploring — especially if the relationship itself has broken down?',
    nd_note: 'Mediation is vastly underused and often more effective than formal action',
  },
  {
    id: 'res_e3',
    section: 'Escalation Awareness',
    text: 'Are you keeping records of conversations, agreed actions, and support offered?',
    nd_note: 'Poor record-keeping is a common vulnerability if things escalate',
  },
  {
    id: 'res_e4',
    section: 'Escalation Awareness',
    text: 'Do you have access to HR support or advice if this escalates — and do you know when to use it?',
    nd_note: 'Knowing when to seek advice is itself a management skill',
  },
]

// ─── Reasonable Adjustments ───────────────────────────────────────────────────

const adjustmentsQuestions: Question[] = [
  {
    id: 'adj_u1',
    section: 'Understanding the Need',
    text: 'What patterns are you observing that suggest this person might need adjustments?',
    nd_note: 'No diagnosis needed — observable patterns are enough to act',
  },
  {
    id: 'adj_u2',
    section: 'Understanding the Need',
    text: 'Has the employee disclosed anything about their neurodivergence or disability? Have you created space for them to do so?',
    nd_note: 'Many AuDHD employees mask — disclosure needs psychological safety',
  },
  {
    id: 'adj_u3',
    section: 'Understanding the Need',
    text: 'Are you making assumptions about what this person needs — or have you actually asked them?',
    nd_note: 'The employee is the expert on their own experience',
  },
  {
    id: 'adj_u4',
    section: 'Understanding the Need',
    text: 'What specific tasks, environments, or situations seem to be causing the most difficulty?',
    nd_note: 'Pinpoint the barrier before choosing the adjustment',
  },
  {
    id: 'adj_e1',
    section: 'Exploring Options',
    text: 'Have you explored different work methods — numbered steps, alternative formats, extra time?',
    nd_note: 'Clear, sequential instructions reduce executive function demands',
  },
  {
    id: 'adj_e2',
    section: 'Exploring Options',
    text: 'Have you considered workplace changes — quiet spaces, lighting, flexible seating, sensory accommodations?',
    nd_note: 'Sensory needs are a valid and frequently overlooked adjustment area',
  },
  {
    id: 'adj_e3',
    section: 'Exploring Options',
    text: 'Have you explored working arrangement changes — flexible hours, hybrid, staggered breaks, adjusted meetings?',
    nd_note: 'Rigid scheduling is one of the most common indirect discriminators',
  },
  {
    id: 'adj_e4',
    section: 'Exploring Options',
    text: 'Are there tools or technology that could reduce barriers — speech-to-text, visual planners, structured templates?',
    nd_note: 'Access to Work can fund specialist equipment for eligible employees',
  },
  {
    id: 'adj_e5',
    section: 'Exploring Options',
    text: 'What are this person\'s strengths — and can we redesign any part of their role to leverage them?',
    nd_note: 'Strength-based design reduces the need for adjustments entirely',
  },
  {
    id: 'adj_a1',
    section: 'Agreeing & Documenting',
    text: 'Have you agreed these adjustments with the employee — collaboratively, not just communicated them?',
    nd_note: 'Top-down adjustments often miss the point or feel patronising',
  },
  {
    id: 'adj_a2',
    section: 'Agreeing & Documenting',
    text: 'Are the agreed adjustments written down and shared with the employee?',
    nd_note: 'Written confirmation reduces ambiguity and protects both parties',
  },
  {
    id: 'adj_a3',
    section: 'Agreeing & Documenting',
    text: 'Does the employee know how to flag if an adjustment isn\'t working — and feel safe doing so?',
    nd_note: 'Without explicit permission, concerns often go unvoiced',
  },
  {
    id: 'adj_r1',
    section: 'Reviewing',
    text: 'Have you set a specific review date to check whether the adjustments are working?',
    nd_note: 'Adjustments must be reviewed — needs change over time',
  },
  {
    id: 'adj_r2',
    section: 'Reviewing',
    text: 'Could any standard team policies — break times, dress code, communication norms — be creating inadvertent barriers?',
    nd_note: 'Indirect discrimination applies to policies that affect everyone equally',
  },
  {
    id: 'adj_r3',
    section: 'Reviewing',
    text: 'What have you learned that could improve how you support the wider team?',
    nd_note: 'Adjustments for ND employees often benefit the whole team',
  },
]

// ─── Wellbeing Check-in ───────────────────────────────────────────────────────

const wellbeingQuestions: Question[] = [
  {
    id: 'wb_h1',
    section: 'How Are You Really?',
    text: 'How has your energy been over the past few weeks — at work and generally?',
    nd_note: 'Energy depletion is one of the first signs of burnout in AuDHD employees',
  },
  {
    id: 'wb_h2',
    section: 'How Are You Really?',
    text: 'What does a good day look like for you right now — and how often are you having one?',
    nd_note: 'Good days reveal what conditions support this person',
  },
  {
    id: 'wb_h3',
    section: 'How Are You Really?',
    text: 'What is taking the most out of you at the moment?',
    nd_note: 'The drain is often invisible — sensory load and masking don\'t show up on a dashboard',
  },
  {
    id: 'wb_h4',
    section: 'How Are You Really?',
    text: 'Is there anything you\'re carrying at work that I don\'t know about?',
    nd_note: 'Creates permission to disclose without requiring the employee to raise it first',
  },
  {
    id: 'wb_w1',
    section: 'What\'s Getting in the Way?',
    text: 'Is there anything about how we work together, or the team environment, that\'s making things harder?',
    nd_note: 'Barriers are often environmental — not personal',
  },
  {
    id: 'wb_w2',
    section: 'What\'s Getting in the Way?',
    text: 'Are there any tasks or situations that feel particularly overwhelming or draining right now?',
    nd_note: 'Overwhelm is a specific AuDHD experience, distinct from stress or disengagement',
  },
  {
    id: 'wb_w3',
    section: 'What\'s Getting in the Way?',
    text: 'Is there anything you\'re spending energy managing or hiding at work?',
    nd_note: 'Masking causes exhaustion — naming it is the first step to reducing it',
  },
  {
    id: 'wb_w4',
    section: 'What\'s Getting in the Way?',
    text: 'What would make the biggest difference to how you feel at work right now?',
    nd_note: 'Hand the agenda back — the answer often surprises managers',
  },
  {
    id: 'wb_s1',
    section: 'Support & Adjustments',
    text: 'Is there any support you need that you don\'t currently have?',
    nd_note: 'Asking creates a record that support was offered, not just assumed',
  },
  {
    id: 'wb_s2',
    section: 'Support & Adjustments',
    text: 'Are there any adjustments we haven\'t explored yet that might help?',
    nd_note: 'Needs evolve — adjustments should be revisited regularly',
  },
  {
    id: 'wb_s3',
    section: 'Support & Adjustments',
    text: 'Do you feel comfortable raising concerns with me when things aren\'t working?',
    nd_note: 'AuDHD employees may need explicit permission before they\'ll raise concerns',
  },
  {
    id: 'wb_s4',
    section: 'Support & Adjustments',
    text: 'Is there anything I could do differently as your manager to make things easier?',
    nd_note: 'Shifts the frame from "what\'s wrong with you?" to "what can I do better?"',
  },
  {
    id: 'wb_f1',
    section: 'Looking Forward',
    text: 'What would a sustainable week look like for you — one you could maintain without burning out?',
    nd_note: 'Autistic burnout is serious and distinct from general stress — design for sustainability',
  },
  {
    id: 'wb_f2',
    section: 'Looking Forward',
    text: 'What gives you energy at work right now — what are you looking forward to?',
    nd_note: 'For ADHD employees, interest and motivation are neurologically linked',
  },
  {
    id: 'wb_f3',
    section: 'Looking Forward',
    text: 'What\'s one small thing we could put in place before our next check-in?',
    nd_note: 'Small, specific actions beat open-ended goals for AuDHD brains',
  },
  {
    id: 'wb_f4',
    section: 'Looking Forward',
    text: 'What does success look like for you over the next month — on your own terms?',
    nd_note: 'Invite them to define success — not measure against a neurotypical benchmark',
  },
]

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
  {
    id: 'resolution',
    name: 'Early Resolution',
    emoji: '🤝',
    description: 'ACAS-informed framework for navigating performance concerns and difficult conversations before issues escalate.',
    whenToUse: 'When there is a performance, conduct, or relationship concern. Use before reaching for a formal process.',
    sections: ['Understand First', 'Before the Conversation', 'Having the Conversation', 'Escalation Awareness'],
    questions: resolutionQuestions,
  },
  {
    id: 'adjustments',
    name: 'Reasonable Adjustments',
    emoji: '🛠️',
    description: 'ACAS and Equality Act-informed framework for identifying, agreeing, and reviewing workplace adjustments.',
    whenToUse: 'When an employee may need support or adjustments — with or without a formal diagnosis.',
    sections: ['Understanding the Need', 'Exploring Options', 'Agreeing & Documenting', 'Reviewing'],
    questions: adjustmentsQuestions,
  },
  {
    id: 'wellbeing',
    name: 'Wellbeing Check-in',
    emoji: '💚',
    description: 'A structured, ND-informed wellbeing conversation to spot early warning signs and co-design support.',
    whenToUse: 'For regular wellbeing conversations, especially with employees showing signs of stress or burnout.',
    sections: ['How Are You Really?', "What\'s Getting in the Way?", 'Support & Adjustments', 'Looking Forward'],
    questions: wellbeingQuestions,
  },
]

export function getFramework(id: Framework): FrameworkMeta | undefined {
  return frameworks.find((f) => f.id === id)
}

export function getFrameworkQuestions(id: Framework): Question[] {
  return getFramework(id)?.questions ?? []
}
