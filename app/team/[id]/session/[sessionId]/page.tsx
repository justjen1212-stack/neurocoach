'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { getSession, getTeamMember, updateSession, deleteSession, TeamMember, Session, SessionFeedback } from '@/lib/db'
import { getFramework, FrameworkMeta, Question } from '@/data/questions'

const frameworkColors: Record<string, string> = {
  chemistry: '#A8C5A0',
  clear: '#C4B5E0',
  grow: '#A8C5A0',
  oscar: '#F0C882',
  johari: '#E8A598',
  resolution: '#A0B8C8',
  adjustments: '#C8A8D4',
  wellbeing: '#A0C8B8',
}

function NDTooltip({ note }: { note: string }) {
  const [open, setOpen] = useState(false)
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        title="ND rationale"
        style={{
          background: 'none',
          border: '1.5px solid #C4B5E0',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '11px',
          color: '#8B7DB0',
          fontWeight: '700',
          lineHeight: 1,
          padding: 0,
          verticalAlign: 'middle',
          flexShrink: 0,
        }}
      >
        ?
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            backgroundColor: '#3D3530',
            color: 'white',
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '13px',
            lineHeight: '1.5',
            width: '220px',
            zIndex: 100,
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          }}
        >
          <div style={{ fontWeight: '600', marginBottom: '4px', color: '#C4B5E0', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            ND Rationale
          </div>
          {note}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #3D3530',
            }}
          />
        </div>
      )}
    </span>
  )
}

function QuestionItem({
  question,
  checked,
  onToggle,
  color,
}: {
  question: Question
  checked: boolean
  onToggle: (id: string) => void
  color: string
}) {
  return (
    <div
      onClick={() => onToggle(question.id)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 16px',
        borderRadius: '12px',
        backgroundColor: checked ? color + '15' : 'transparent',
        border: `1.5px solid ${checked ? color : 'transparent'}`,
        cursor: 'pointer',
        transition: 'all 0.15s',
        marginBottom: '8px',
      }}
    >
      <div
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '6px',
          border: `2px solid ${checked ? color : '#C0B8B0'}`,
          backgroundColor: checked ? color : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '1px',
          transition: 'all 0.15s',
        }}
      >
        {checked && (
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
            <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontSize: '14px',
            color: checked ? '#7A6F68' : '#3D3530',
            lineHeight: '1.5',
            textDecoration: checked ? 'line-through' : 'none',
          }}
        >
          {question.text}
        </span>
      </div>
      {question.nd_note && (
        <div onClick={(e) => e.stopPropagation()}>
          <NDTooltip note={question.nd_note} />
        </div>
      )}
    </div>
  )
}

export default function ActiveSessionPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const memberId = params.id as string
  const sessionId = params.sessionId as string

  const [member, setMember] = useState<TeamMember | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [framework, setFramework] = useState<FrameworkMeta | null>(null)
  const [fetching, setFetching] = useState(true)

  const [notes, setNotes] = useState('')
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([])
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')
  const [completing, setCompleting] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [feedback, setFeedback] = useState<SessionFeedback>({
    energyRating: 0,
    takeaway: '',
    nextAction: '',
    additionalNotes: '',
  })
  const [savingFeedback, setSavingFeedback] = useState(false)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!loading && !user) router.push('/')
  }, [user, loading, router])

  useEffect(() => {
    if (!user || !memberId || !sessionId) return
    async function load() {
      setFetching(true)
      try {
        const [m, s] = await Promise.all([
          getTeamMember(memberId),
          getSession(sessionId),
        ])
        if (!m || m.managerId !== user!.uid || !s || s.managerId !== user!.uid) {
          router.push('/dashboard')
          return
        }
        setMember(m)
        setSession(s)
        setNotes(s.notes)
        setCompletedQuestions(s.completedQuestions)
        setFramework(getFramework(s.framework) ?? null)
      } catch (e) {
        console.error(e)
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [user, memberId, sessionId, router])

  const saveToFirestore = useCallback(
    async (newNotes: string, newCompleted: string[]) => {
      setSaveStatus('saving')
      try {
        await updateSession(sessionId, {
          notes: newNotes,
          completedQuestions: newCompleted,
        })
        setSaveStatus('saved')
      } catch (e) {
        console.error(e)
        setSaveStatus('unsaved')
      }
    },
    [sessionId]
  )

  const scheduleAutoSave = useCallback(
    (newNotes: string, newCompleted: string[]) => {
      setSaveStatus('unsaved')
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        saveToFirestore(newNotes, newCompleted)
      }, 500)
    },
    [saveToFirestore]
  )

  const handleNotesChange = (val: string) => {
    setNotes(val)
    scheduleAutoSave(val, completedQuestions)
  }

  const handleToggleQuestion = (id: string) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter((q) => q !== id)
      : [...completedQuestions, id]
    setCompletedQuestions(updated)
    scheduleAutoSave(notes, updated)
  }

  const handleCompleteSession = async () => {
    setCompleting(true)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    await saveToFirestore(notes, completedQuestions)
    setCompleting(false)
    setShowFeedback(true)
  }

  const handleSubmitFeedback = async () => {
    setSavingFeedback(true)
    try {
      await updateSession(sessionId, { feedback })
    } catch (e) {
      console.error(e)
    }
    router.push(`/team/${memberId}`)
  }

  const handleSkipFeedback = () => {
    router.push(`/team/${memberId}`)
  }

  const handleDeleteSession = async () => {
    setDeleting(true)
    try {
      await deleteSession(sessionId)
      router.push(`/team/${memberId}`)
    } catch (e) {
      console.error(e)
      setDeleting(false)
    }
  }

  if (loading || !user || fetching) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FDF8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#7A6F68' }}>Loading session...</p>
      </div>
    )
  }

  if (!member || !session || !framework) return null

  const energyEmojis = ['', '😔', '😐', '🙂', '😊', '🤩']
  const energyLabels = ['', 'Drained', 'Low', 'Okay', 'Good', 'Energised']

  if (showFeedback) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FDF8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ width: '100%', maxWidth: '560px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌿</div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#3D3530', margin: '0 0 8px' }}>
              Session complete
            </h1>
            <p style={{ color: '#7A6F68', fontSize: '15px', margin: 0 }}>
              Take a moment to capture how {member.name} is leaving this session.
            </p>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '36px', border: '1px solid #E8E0D8', boxShadow: '0 2px 12px rgba(61,53,48,0.06)' }}>

            {/* Energy check-in */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '15px', fontWeight: '600', color: '#3D3530', marginBottom: '6px' }}>
                How is {member.name} feeling leaving this session?
              </label>
              <p style={{ fontSize: '13px', color: '#7A6F68', margin: '0 0 14px' }}>Energy check-in</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setFeedback((f) => ({ ...f, energyRating: n }))}
                    style={{
                      flex: 1,
                      padding: '12px 6px',
                      borderRadius: '12px',
                      border: `2px solid ${feedback.energyRating === n ? '#A8C5A0' : '#E8E0D8'}`,
                      backgroundColor: feedback.energyRating === n ? '#A8C5A022' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span style={{ fontSize: '22px' }}>{energyEmojis[n]}</span>
                    <span style={{ fontSize: '11px', color: '#7A6F68' }}>{energyLabels[n]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Takeaway */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '15px', fontWeight: '600', color: '#3D3530', marginBottom: '4px' }}>
                What was {member.name}&apos;s main takeaway?
              </label>
              <p style={{ fontSize: '13px', color: '#7A6F68', margin: '0 0 10px' }}>The thing they most want to hold onto from this session</p>
              <textarea
                value={feedback.takeaway}
                onChange={(e) => setFeedback((f) => ({ ...f, takeaway: e.target.value }))}
                placeholder="e.g. I realised I work best in short bursts with breaks built in..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid #E8E0D8',
                  fontSize: '14px',
                  color: '#3D3530',
                  backgroundColor: '#FDF8F0',
                  outline: 'none',
                  resize: 'vertical',
                  lineHeight: '1.6',
                  fontFamily: 'inherit',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#A8C5A0')}
                onBlur={(e) => (e.target.style.borderColor = '#E8E0D8')}
              />
            </div>

            {/* Next action */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '15px', fontWeight: '600', color: '#3D3530', marginBottom: '4px' }}>
                One thing {member.name} will do before the next session
              </label>
              <p style={{ fontSize: '13px', color: '#7A6F68', margin: '0 0 10px' }}>Keep it small and specific</p>
              <textarea
                value={feedback.nextAction}
                onChange={(e) => setFeedback((f) => ({ ...f, nextAction: e.target.value }))}
                placeholder="e.g. Block 30 mins on Tuesday to draft the project brief..."
                rows={2}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid #E8E0D8',
                  fontSize: '14px',
                  color: '#3D3530',
                  backgroundColor: '#FDF8F0',
                  outline: 'none',
                  resize: 'vertical',
                  lineHeight: '1.6',
                  fontFamily: 'inherit',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#A8C5A0')}
                onBlur={(e) => (e.target.style.borderColor = '#E8E0D8')}
              />
            </div>

            {/* Additional notes */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '15px', fontWeight: '600', color: '#3D3530', marginBottom: '4px' }}>
                Anything else to note? <span style={{ fontWeight: '400', color: '#7A6F68' }}>(optional)</span>
              </label>
              <textarea
                value={feedback.additionalNotes}
                onChange={(e) => setFeedback((f) => ({ ...f, additionalNotes: e.target.value }))}
                placeholder="Any observations, things to follow up on, or moments worth remembering..."
                rows={2}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid #E8E0D8',
                  fontSize: '14px',
                  color: '#3D3530',
                  backgroundColor: '#FDF8F0',
                  outline: 'none',
                  resize: 'vertical',
                  lineHeight: '1.6',
                  fontFamily: 'inherit',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#A8C5A0')}
                onBlur={(e) => (e.target.style.borderColor = '#E8E0D8')}
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleSkipFeedback}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1px solid #E8E0D8',
                  backgroundColor: '#FDF8F0',
                  color: '#7A6F68',
                  fontSize: '15px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Skip
              </button>
              <button
                onClick={handleSubmitFeedback}
                disabled={savingFeedback}
                style={{
                  flex: 2,
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: savingFeedback ? '#d4907f' : '#E8A598',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: savingFeedback ? 'not-allowed' : 'pointer',
                }}
              >
                {savingFeedback ? 'Saving...' : 'Save Feedback'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const color = frameworkColors[framework.id] ?? '#A8C5A0'
  const totalQuestions = framework.questions.length
  const completedCount = completedQuestions.length
  const progressPercent = totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0

  // Group questions by section (if applicable)
  const sections = framework.sections
  const questionsBySection: Record<string, Question[]> = {}

  if (sections && sections.length > 0) {
    for (const section of sections) {
      questionsBySection[section] = framework.questions.filter((q) => q.section === section)
    }
  } else {
    questionsBySection['Questions'] = framework.questions
  }

  const sectionKeys = sections && sections.length > 0 ? sections : ['Questions']

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDF8F0' }}>
      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(61,53,48,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '36px', maxWidth: '420px', width: '100%', boxShadow: '0 8px 32px rgba(61,53,48,0.15)' }}>
            <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: '700', color: '#3D3530' }}>Delete this session?</h2>
            <p style={{ color: '#7A6F68', fontSize: '14px', margin: '0 0 24px', lineHeight: '1.6' }}>
              All notes, question progress, and feedback will be permanently deleted.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setConfirmDelete(false)}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #E8E0D8', backgroundColor: '#FDF8F0', color: '#3D3530', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleDeleteSession} disabled={deleting}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#E8A598', color: 'white', fontSize: '14px', fontWeight: '600', cursor: deleting ? 'not-allowed' : 'pointer' }}>
                {deleting ? 'Deleting...' : 'Yes, delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header
        style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #E8E0D8',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href={`/team/${memberId}`} style={{ color: '#7A6F68', textDecoration: 'none', fontSize: '14px' }}>
            ← {member.name}
          </Link>
          <span style={{ color: '#E8E0D8' }}>|</span>
          <span style={{ fontSize: '15px', fontWeight: '600', color: '#3D3530' }}>
            {framework.emoji} {framework.name} — Session #{session.sessionNumber}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Save status */}
          <span
            style={{
              fontSize: '13px',
              color:
                saveStatus === 'saved'
                  ? '#A8C5A0'
                  : saveStatus === 'saving'
                  ? '#F0C882'
                  : '#E8A598',
            }}
          >
            {saveStatus === 'saved' ? '✓ Saved' : saveStatus === 'saving' ? '⏳ Saving...' : '● Unsaved'}
          </span>

          <button
            onClick={() => setConfirmDelete(true)}
            style={{ background: 'none', border: '1px solid #E8E0D8', borderRadius: '10px', padding: '10px 16px', color: '#7A6F68', fontSize: '14px', cursor: 'pointer' }}
          >
            Delete
          </button>
          <button
            onClick={handleCompleteSession}
            disabled={completing}
            style={{
              backgroundColor: completing ? '#d4907f' : '#E8A598',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 20px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: completing ? 'not-allowed' : 'pointer',
            }}
          >
            {completing ? 'Saving...' : 'Complete Session'}
          </button>
        </div>
      </header>

      {/* Progress bar */}
      <div style={{ backgroundColor: '#E8E0D8', height: '4px' }}>
        <div
          style={{
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: color,
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Main content — split layout */}
      <div
        style={{
          display: 'flex',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '32px 24px',
          gap: '28px',
          alignItems: 'flex-start',
        }}
      >
        {/* Left: Questions */}
        <div style={{ flex: '0 0 420px', minWidth: 0 }}>
          {/* Progress summary */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '16px 20px',
              border: '1px solid #E8E0D8',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: color + '33',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
              }}
            >
              {framework.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', color: '#7A6F68', marginBottom: '4px' }}>
                {completedCount} of {totalQuestions} questions explored
              </div>
              <div
                style={{
                  height: '6px',
                  backgroundColor: '#E8E0D8',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    backgroundColor: color,
                    borderRadius: '3px',
                    transition: 'width 0.3s',
                  }}
                />
              </div>
            </div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#3D3530',
              }}
            >
              {Math.round(progressPercent)}%
            </div>
          </div>

          {/* Questions grouped by section */}
          {sectionKeys.map((section) => {
            const qs = questionsBySection[section] ?? []
            if (qs.length === 0) return null
            return (
              <div key={section} style={{ marginBottom: '20px' }}>
                {sections && sections.length > 0 && (
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: color,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '10px',
                      padding: '0 4px',
                    }}
                  >
                    {section}
                  </div>
                )}
                <div
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '12px',
                    border: '1px solid #E8E0D8',
                  }}
                >
                  {qs.map((q) => (
                    <QuestionItem
                      key={q.id}
                      question={q}
                      checked={completedQuestions.includes(q.id)}
                      onToggle={handleToggleQuestion}
                      color={color}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: Notes */}
        <div style={{ flex: 1, minWidth: 0, position: 'sticky', top: '90px' }}>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              border: '1px solid #E8E0D8',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(61, 53, 48, 0.06)',
            }}
          >
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #E8E0D8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h2 style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: '600', color: '#3D3530' }}>
                  Session Notes
                </h2>
                <p style={{ margin: 0, fontSize: '13px', color: '#7A6F68' }}>
                  Auto-saves as you type
                </p>
              </div>
              <span style={{ fontSize: '20px' }}>📝</span>
            </div>
            <textarea
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder={`Notes for this ${framework.name} session with ${member.name}...\n\nCapture key themes, reflections, commitments and any follow-up you want to remember.`}
              style={{
                width: '100%',
                minHeight: '480px',
                padding: '24px',
                border: 'none',
                outline: 'none',
                resize: 'vertical',
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#3D3530',
                backgroundColor: 'transparent',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Saved feedback summary */}
          {session.feedback && (
            <div
              style={{
                marginTop: '16px',
                backgroundColor: '#F0FAF0',
                borderRadius: '14px',
                padding: '20px',
                border: '1px solid #A8C5A0',
              }}
            >
              <p style={{ margin: '0 0 12px', fontSize: '12px', fontWeight: '700', color: '#5A8A52', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Coachee Feedback
              </p>
              {session.feedback.energyRating > 0 && (
                <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#3D3530' }}>
                  <strong>Energy leaving session:</strong> {['', '😔 Drained', '😐 Low', '🙂 Okay', '😊 Good', '🤩 Energised'][session.feedback.energyRating]}
                </p>
              )}
              {session.feedback.takeaway && (
                <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#3D3530' }}>
                  <strong>Main takeaway:</strong> {session.feedback.takeaway}
                </p>
              )}
              {session.feedback.nextAction && (
                <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#3D3530' }}>
                  <strong>Next action:</strong> {session.feedback.nextAction}
                </p>
              )}
              {session.feedback.additionalNotes && (
                <p style={{ margin: 0, fontSize: '14px', color: '#3D3530' }}>
                  <strong>Notes:</strong> {session.feedback.additionalNotes}
                </p>
              )}
            </div>
          )}

          {/* ND tip */}
          <div
            style={{
              marginTop: '16px',
              backgroundColor: '#F3F0FA',
              borderRadius: '14px',
              padding: '16px 20px',
              border: '1px solid #C4B5E0',
            }}
          >
            <p
              style={{
                margin: '0 0 4px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#8B7DB0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              ND Coaching Tip
            </p>
            <p style={{ margin: 0, fontSize: '14px', color: '#3D3530', lineHeight: '1.6' }}>
              {framework.id === 'chemistry' && 'Go at their pace. You\'re building trust, not ticking boxes. Some questions may spark 20 minutes of conversation.'}
              {framework.id === 'clear' && 'Clarity before action. AuDHD brains often need to feel heard before they can plan effectively.'}
              {framework.id === 'grow' && 'Focus on barriers, not blame. "What got in the way?" is always more useful than "why didn\'t you...?"'}
              {framework.id === 'oscar' && 'Think in terms of sustainable growth, not rapid change. Small, consistent steps beat ambitious leaps.'}
              {framework.id === 'johari' && 'Go gently into the blind spots and hidden areas. This is deep self-awareness work — take your time.'}
              {framework.id === 'resolution' && 'Capability before conduct. Most AuDHD performance concerns are about barriers, not behaviour. Lead with curiosity and support — formal processes are the last resort, not the first.'}
              {framework.id === 'adjustments' && 'No diagnosis is required to act. If you can observe the barrier, you can address it. The best adjustment is the one the employee helped design — not the one you assumed would help.'}
              {framework.id === 'wellbeing' && 'Masking costs energy. An AuDHD employee who appears "fine" may be expending enormous effort to look that way. A genuine check-in — not a tick-box — is one of the most protective things a manager can do.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
