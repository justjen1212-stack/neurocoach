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
  // Understand the situation
  {
    id: 'res_u1',
    section: 'Understand First',
    text: "What's actually changed recently — in workload, environment, team dynamics, or their personal circumstances?",
    nd_note: 'ACAS research: issues often have a root cause that informal conversations can surface before formal action is needed. AuDHD individuals are especially sensitive to environmental and routine changes.',
  },
  {
    id: 'res_u2',
    section: 'Understand First',
    text: 'Is this a capability issue (something getting in the way of performance) or a conduct issue (a deliberate choice being made)?',
    nd_note: 'ACAS finding: employers often conflate capability and misconduct. For AuDHD staff, what looks like conduct is frequently capability — executive dysfunction, sensory overload, or burnout.',
  },
  {
    id: 'res_u3',
    section: 'Understand First',
    text: 'Have you had any informal conversation about this yet? If so, what happened — and if not, what has held you back?',
    nd_note: 'ACAS finding: close-relationship avoidance is the most common reason issues escalate. Naming the avoidance is the first step to addressing it.',
  },
  {
    id: 'res_u4',
    section: 'Understand First',
    text: 'What does the person themselves understand about the current situation? Have expectations been made fully explicit — not just assumed?',
    nd_note: 'AuDHD individuals often miss implied expectations entirely. ACAS research shows staff rarely read policies — explicit verbal clarity is essential.',
  },
  // Before the conversation
  {
    id: 'res_b1',
    section: 'Before the Conversation',
    text: 'What support or adjustments could you offer that might resolve this before a formal process is needed?',
    nd_note: 'ACAS guidance: capability issues should be met with support first. For AuDHD staff this might mean workload adjustments, task restructuring, or communication format changes.',
  },
  {
    id: 'res_b2',
    section: 'Before the Conversation',
    text: 'What is the one specific, concrete change you are asking for — and is it genuinely realistic given their current capacity?',
    nd_note: 'Vague asks ("just try harder") are particularly unhelpful for AuDHD individuals. Specific, measurable asks reduce confusion and increase the chance of success.',
  },
  {
    id: 'res_b3',
    section: 'Before the Conversation',
    text: 'Have you told this person clearly — not just implied — that the current situation cannot continue?',
    nd_note: 'ACAS finding: informal conversations are often too superficial. AuDHD individuals may not pick up on softened or indirect framing as a serious concern.',
  },
  {
    id: 'res_b4',
    section: 'Before the Conversation',
    text: 'What would a fair outcome look like for both of you — not just for the organisation?',
    nd_note: 'ACAS research shows that perceived fairness of process is as important as the outcome. This question helps coaches hold both perspectives.',
  },
  // Having the conversation
  {
    id: 'res_c1',
    section: 'Having the Conversation',
    text: 'How will you open the conversation in a way that feels safe, not threatening — so they can actually hear what you are saying?',
    nd_note: 'AuDHD individuals in threat-detection mode cannot process feedback effectively. Opening with curiosity and care makes the conversation productive rather than defensive.',
  },
  {
    id: 'res_c2',
    section: 'Having the Conversation',
    text: 'What format will work best for them — in-person, written first, or a blend?',
    nd_note: 'Many AuDHD individuals process written information better than verbal in high-stress situations. Offering a written summary after a verbal conversation supports clarity.',
  },
  {
    id: 'res_c3',
    section: 'Having the Conversation',
    text: 'How will you make space for them to share their perspective — not just receive yours?',
    nd_note: 'ACAS finding: one-sided conversations breed grievances. For AuDHD individuals who may need processing time, signposting that their response matters (even if it comes later) is important.',
  },
  {
    id: 'res_c4',
    section: 'Having the Conversation',
    text: 'What does success look like in 2 weeks? What small, observable change would tell you things are improving?',
    nd_note: 'Specific, short-horizon markers are more manageable than open-ended expectations, especially for ADHD brains prone to time-blindness.',
  },
  // Escalation awareness
  {
    id: 'res_e1',
    section: 'Escalation Awareness',
    text: 'At what point — and under what specific circumstances — would you consider moving to a formal process?',
    nd_note: 'ACAS guidance: having a clear threshold in mind prevents both premature escalation and delayed action. Uncertainty here often leads to costly settlements.',
  },
  {
    id: 'res_e2',
    section: 'Escalation Awareness',
    text: 'Is mediation worth exploring — especially if the relationship itself has broken down, not just the task performance?',
    nd_note: 'ACAS finding: mediation is vastly underused in SMEs. It is especially effective when communication breakdown (rather than gross misconduct) is at the root of the issue.',
  },
  {
    id: 'res_e3',
    section: 'Escalation Awareness',
    text: 'Are you keeping adequate records of conversations, agreed actions, and support offered — in case this needs to go further?',
    nd_note: 'ACAS finding: poor record-keeping is a consistent vulnerability for SMEs at tribunal. Even informal conversations should have a brief written follow-up.',
  },
  {
    id: 'res_e4',
    section: 'Escalation Awareness',
    text: 'Do you have access to HR support or advice if this escalates — and do you know when to use it?',
    nd_note: 'ACAS research: manager confidence in handling disputes is the strongest predictor of good outcomes. Knowing when to seek advice is itself a skill.',
  },
]

// ─── Reasonable Adjustments ───────────────────────────────────────────────────

const adjustmentsQuestions: Question[] = [
  {
    id: 'adj_u1',
    section: 'Understanding the Need',
    text: 'What patterns are you observing that suggest this person might need adjustments?',
    nd_note: 'ACAS: No diagnosis is required. Employers must act when they know — or could reasonably be expected to know — that someone is struggling. Observable patterns are enough.',
  },
  {
    id: 'adj_u2',
    section: 'Understanding the Need',
    text: 'Has the employee disclosed anything about their neurodivergence or disability? If not, have you created genuine space for them to do so?',
    nd_note: 'Many AuDHD employees mask at work. Employees are not required to disclose — but employers remain liable if they could reasonably have known. Psychological safety enables honest conversation.',
  },
  {
    id: 'adj_u3',
    section: 'Understanding the Need',
    text: 'Are you making assumptions about what this person needs — or have you actually asked them?',
    nd_note: 'ACAS: "Work with the employee to identify adjustments" — never prescribe. What helps one autistic or ADHD person may not help another. The employee is the expert on their own experience.',
  },
  {
    id: 'adj_u4',
    section: 'Understanding the Need',
    text: 'What specific tasks, environments, or situations seem to be causing the most difficulty?',
    nd_note: 'Pinpointing the barrier helps identify the right adjustment. For AuDHD employees, difficulty is often context-specific — open-plan noise, ambiguous instructions, or unstructured time are common culprits.',
  },
  {
    id: 'adj_e1',
    section: 'Exploring Options',
    text: 'Have you explored different work methods — breaking tasks into numbered steps, alternative formats, extra time for written responses?',
    nd_note: 'ACAS explicitly lists these as adjustment categories. Clear, sequential instructions reduce cognitive load and executive function demands for AuDHD employees.',
  },
  {
    id: 'adj_e2',
    section: 'Exploring Options',
    text: 'Have you considered workplace changes — quiet spaces, lighting adjustments, flexible seating, sensory accommodations?',
    nd_note: 'ACAS neurodiversity guidance: noise-cancelling headphones, low-stimulation spaces, and advance notice of environment changes are all reasonable adjustments. Sensory needs are frequently overlooked.',
  },
  {
    id: 'adj_e3',
    section: 'Exploring Options',
    text: 'Have you explored working arrangement changes — flexible hours, hybrid working, staggered breaks, or adjusted meeting loads?',
    nd_note: 'Rigid scheduling is one of the most common indirect discriminators for AuDHD employees. Predictable, flexible structures often make the biggest practical difference.',
  },
  {
    id: 'adj_e4',
    section: 'Exploring Options',
    text: 'Are there tools or technology that could reduce barriers — speech-to-text, visual planners, coloured document overlays, structured templates?',
    nd_note: 'ACAS lists technology as a valid adjustment category. The government\'s Access to Work scheme can fund specialist equipment for eligible employees — worth signposting to the employee.',
  },
  {
    id: 'adj_e5',
    section: 'Exploring Options',
    text: 'What are this person\'s strengths — and can we redesign any part of their role to leverage them?',
    nd_note: 'ACAS neurodiversity page: "Some neurodivergent people have areas of strength such as attention to detail, problem-solving, or verbal communication." Strength-based role design reduces the need for adjustments by working with the brain rather than against it.',
  },
  {
    id: 'adj_a1',
    section: 'Agreeing & Documenting',
    text: 'Have you agreed these adjustments with the employee — collaboratively, not just communicated to them?',
    nd_note: 'ACAS: adjustments must be agreed with the employee. A top-down approach misses what actually helps and may create adjustments that feel patronising or miss the point entirely.',
  },
  {
    id: 'adj_a2',
    section: 'Agreeing & Documenting',
    text: 'Are the agreed adjustments written down and shared with the employee?',
    nd_note: 'Written records serve two purposes: they provide clarity and certainty for AuDHD employees (who often prefer written confirmation), and they protect both parties if adjustments are later questioned.',
  },
  {
    id: 'adj_a3',
    section: 'Agreeing & Documenting',
    text: 'Does the employee know how to flag if an adjustment isn\'t working — and do they feel safe doing so?',
    nd_note: 'AuDHD employees may struggle to raise concerns without explicit permission. Building in a clear feedback mechanism reduces the chance of an adjustment failing silently while the employee\'s situation worsens.',
  },
  {
    id: 'adj_r1',
    section: 'Reviewing',
    text: 'Have you set a specific review date to check whether the adjustments are actually working?',
    nd_note: 'ACAS: adjustments must be actively reviewed — not assumed to be permanent or perfect. Needs change with workload, life events, and role evolution. A review date makes this a process, not a one-off.',
  },
  {
    id: 'adj_r2',
    section: 'Reviewing',
    text: 'Could any of your team\'s standard policies — break times, dress code, communication norms — be inadvertently creating barriers?',
    nd_note: 'ACAS disability discrimination guidance: indirect discrimination applies to policies that disadvantage disabled people even if they apply to everyone. Zero-tolerance conduct rules and rigid attendance policies are common examples.',
  },
  {
    id: 'adj_r3',
    section: 'Reviewing',
    text: 'What have you learned from this process that could improve how you support the wider team?',
    nd_note: 'Adjustments made for neurodivergent employees often benefit everyone — clearer instructions, flexible hours, and written summaries improve conditions for all. This is known as the "curb cut effect."',
  },
]

// ─── Wellbeing Check-in ───────────────────────────────────────────────────────

const wellbeingQuestions: Question[] = [
  {
    id: 'wb_h1',
    section: 'How Are You Really?',
    text: 'How has your energy been over the past few weeks — at work and generally?',
    nd_note: 'ACAS mental health guidance: energy depletion is one of the first observable signs of a mental health concern. For AuDHD employees, masking and executive function demands make everyday work far more energy-intensive than it appears from the outside.',
  },
  {
    id: 'wb_h2',
    section: 'How Are You Really?',
    text: 'What does a good day look like for you right now — and how often are you having one?',
    nd_note: 'Asking about good days rather than bad ones opens the conversation without threat. It also surfaces what conditions support this person — practical information for managers.',
  },
  {
    id: 'wb_h3',
    section: 'How Are You Really?',
    text: 'What is taking the most out of you at the moment?',
    nd_note: 'ACAS flags workload, relationships, and environment as key wellbeing stressors. For AuDHD employees, the drain is often invisible — sensory overload, context-switching, and masking fatigue may not be visible to others.',
  },
  {
    id: 'wb_h4',
    section: 'How Are You Really?',
    text: 'Is there anything you\'re carrying at work that I don\'t know about?',
    nd_note: 'Creates explicit permission to disclose without requiring the employee to raise it themselves. Many AuDHD employees carry significant invisible load — undiagnosed conditions, masking fatigue, fear of being seen as difficult.',
  },
  {
    id: 'wb_w1',
    section: 'What\'s Getting in the Way?',
    text: 'Is there anything about how we work together, or the team environment, that\'s making things harder?',
    nd_note: 'ACAS uses the social model of disability: barriers are environmental, not personal. This question helps the manager hear about structural issues rather than assuming the problem lies with the individual.',
  },
  {
    id: 'wb_w2',
    section: 'What\'s Getting in the Way?',
    text: 'Are there any tasks or situations that feel particularly overwhelming or draining right now?',
    nd_note: 'Overwhelm is a specific AuDHD experience — distinct from stress or disengagement. Naming it without pathologising it opens the door to practical solutions.',
  },
  {
    id: 'wb_w3',
    section: 'What\'s Getting in the Way?',
    text: 'Is there anything you\'re spending energy managing or hiding at work?',
    nd_note: 'ACAS neurodiversity guidance: masking — concealing neurodivergent traits — causes exhaustion, isolation, and mental health deterioration. This question names the phenomenon without requiring the employee to have language for it.',
  },
  {
    id: 'wb_w4',
    section: 'What\'s Getting in the Way?',
    text: 'What would make the biggest difference to how you feel at work right now?',
    nd_note: 'Hands the agenda to the employee. ACAS consistently emphasises collaborating with employees to find solutions rather than prescribing them. The answer often surprises managers.',
  },
  {
    id: 'wb_s1',
    section: 'Support & Adjustments',
    text: 'Is there any support you need that you don\'t currently have?',
    nd_note: 'ACAS: employers have a duty of care for mental and physical health equally. This question fulfils that duty in conversation — and creates a record that support was offered, not just assumed.',
  },
  {
    id: 'wb_s2',
    section: 'Support & Adjustments',
    text: 'Are there any adjustments we haven\'t explored yet that might help?',
    nd_note: 'ACAS reasonable adjustments guidance: adjustments should be actively reviewed and expanded over time — not treated as a one-off conversation. Needs evolve with workload, life events, and role changes.',
  },
  {
    id: 'wb_s3',
    section: 'Support & Adjustments',
    text: 'Do you feel comfortable raising concerns with me when things aren\'t working?',
    nd_note: 'Psychological safety is the foundation of early problem identification. For AuDHD employees, this question may need to be asked directly — they may not raise concerns without explicit permission to do so.',
  },
  {
    id: 'wb_s4',
    section: 'Support & Adjustments',
    text: 'Is there anything I could do differently as your manager to make things easier?',
    nd_note: 'Places responsibility on the manager, not the employee. Shifts the frame from "what\'s wrong with you?" to "what can I do better?" — foundational to neurodivergent-affirming management.',
  },
  {
    id: 'wb_f1',
    section: 'Looking Forward',
    text: 'What would a sustainable week look like for you — one you could maintain without burning out?',
    nd_note: 'Autistic burnout is a real, serious condition — distinct from general stress. ACAS mental health guidance emphasises designing work around realistic capacity. This question helps identify a sustainable baseline rather than an aspirational one.',
  },
  {
    id: 'wb_f2',
    section: 'Looking Forward',
    text: 'What gives you energy at work right now — what are you looking forward to?',
    nd_note: 'Strength and interest-based questions counterbalance deficit framing. For ADHD employees especially, interest and motivation are neurologically linked — identifying what engages them is practical management information.',
  },
  {
    id: 'wb_f3',
    section: 'Looking Forward',
    text: 'What\'s one small thing we could put in place before our next check-in?',
    nd_note: 'Small, specific, immediate actions suit AuDHD brains better than open-ended long-term goals. Closing a check-in with a concrete next step makes it meaningful rather than a box-ticking exercise.',
  },
  {
    id: 'wb_f4',
    section: 'Looking Forward',
    text: 'What does success look like for you over the next month — on your own terms?',
    nd_note: 'ACAS performance guidance: goals should be meaningful to the employee. Inviting them to define their own success metric reduces the neurotypical benchmark problem and builds genuine motivation.',
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
    description: 'ACAS-informed framework for navigating performance concerns, difficult conversations, and early dispute prevention — before issues escalate.',
    whenToUse: 'When there is a performance, conduct, or relationship concern that needs addressing. Use this before reaching for a formal process.',
    sections: ['Understand First', 'Before the Conversation', 'Having the Conversation', 'Escalation Awareness'],
    questions: resolutionQuestions,
  },
  {
    id: 'adjustments',
    name: 'Reasonable Adjustments',
    emoji: '🛠️',
    description: 'ACAS and Equality Act-informed framework for identifying, agreeing, documenting, and reviewing workplace adjustments for neurodivergent employees.',
    whenToUse: 'When an employee may need support or adjustments — with or without a formal diagnosis. Use proactively, not just reactively.',
    sections: ['Understanding the Need', 'Exploring Options', 'Agreeing & Documenting', 'Reviewing'],
    questions: adjustmentsQuestions,
  },
  {
    id: 'wellbeing',
    name: 'Wellbeing Check-in',
    emoji: '💚',
    description: 'A structured, ND-informed wellbeing conversation — based on ACAS mental health at work guidance — to spot early warning signs and co-design support.',
    whenToUse: 'For regular wellbeing conversations, especially with employees showing signs of stress, burnout, or disengagement. Use before concerns become formal.',
    sections: ['How Are You Really?', "What's Getting in the Way?", 'Support & Adjustments', 'Looking Forward'],
    questions: wellbeingQuestions,
  },
]

export function getFramework(id: Framework): FrameworkMeta | undefined {
  return frameworks.find((f) => f.id === id)
}

export function getFrameworkQuestions(id: Framework): Question[] {
  return getFramework(id)?.questions ?? []
}
