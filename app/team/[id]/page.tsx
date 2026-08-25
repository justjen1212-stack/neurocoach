'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import {
  getTeamMember,
  getSessionsByMember,
  updateTeamMember,
  deleteTeamMember,
  deleteSession,
  TeamMember,
  Session,
  Framework,
} from '@/lib/db'
import { frameworks, getFramework } from '@/data/questions'

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

export default function TeamMemberPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const memberId = params.id as string

  const [member, setMember] = useState<TeamMember | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')

  // Edit state
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editRole, setEditRole] = useState('')
  const [editNotes, setEditNotes] = useState('')
  const [saving, setSaving] = useState(false)

  // Delete member state
  const [confirmDeleteMember, setConfirmDeleteMember] = useState(false)
  const [deletingMember, setDeletingMember] = useState(false)

  // Delete session state
  const [confirmDeleteSession, setConfirmDeleteSession] = useState<string | null>(null)
  const [deletingSession, setDeletingSession] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/')
  }, [user, loading, router])

  useEffect(() => {
    if (!user || !memberId) return
    async function load() {
      setFetching(true)
      try {
        const [m, s] = await Promise.all([
          getTeamMember(memberId),
          getSessionsByMember(memberId),
        ])
        if (!m || m.managerId !== user!.uid) {
          router.push('/dashboard')
          return
        }
        setMember(m)
        setSessions(s)
      } catch (e) {
        console.error(e)
        setError('Failed to load team member. Please go back and try again.')
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [user, memberId, router])

  const openEdit = () => {
    if (!member) return
    setEditName(member.name)
    setEditRole(member.role)
    setEditNotes(member.notes)
    setEditing(true)
  }

  const handleSaveEdit = async () => {
    if (!member) return
    setSaving(true)
    try {
      await updateTeamMember(member.id, { name: editName, role: editRole, notes: editNotes })
      setMember({ ...member, name: editName, role: editRole, notes: editNotes })
      setEditing(false)
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteMember = async () => {
    if (!member) return
    setDeletingMember(true)
    try {
      await Promise.all(sessions.map((s) => deleteSession(s.id)))
      await deleteTeamMember(member.id)
      router.push('/dashboard')
    } catch (e) {
      console.error(e)
      setDeletingMember(false)
    }
  }

  const handleDeleteSession = async (sessionId: string) => {
    setDeletingSession(true)
    try {
      await deleteSession(sessionId)
      setSessions((prev) => prev.filter((s) => s.id !== sessionId))
      setConfirmDeleteSession(null)
    } catch (e) {
      console.error(e)
    } finally {
      setDeletingSession(false)
    }
  }

  const usedFrameworks = new Set(sessions.map((s) => s.framework))

  const formatDate = (session: Session) => {
    if (!session.createdAt) return '—'
    return session.createdAt.toDate().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  if (loading || !user || fetching) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FDF8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#7A6F68' }}>Loading...</p>
      </div>
    )
  }

  if (error) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDF8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#8B3A30', marginBottom: '16px' }}>{error}</p>
        <Link href="/dashboard" style={{ color: '#A8C5A0', textDecoration: 'underline' }}>← Back to dashboard</Link>
      </div>
    </div>
  )

  if (!member) return null

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1.5px solid #E8E0D8',
    fontSize: '14px',
    color: '#3D3530',
    backgroundColor: '#FDF8F0',
    outline: 'none',
    fontFamily: 'inherit',
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDF8F0' }}>
      {/* Delete member confirmation modal */}
      {confirmDeleteMember && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(61,53,48,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '36px', maxWidth: '420px', width: '100%', boxShadow: '0 8px 32px rgba(61,53,48,0.15)' }}>
            <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: '700', color: '#3D3530' }}>Delete {member.name}?</h2>
            <p style={{ color: '#7A6F68', fontSize: '14px', margin: '0 0 24px', lineHeight: '1.6' }}>
              This will permanently delete {member.name} and all {sessions.length} of their sessions. This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setConfirmDeleteMember(false)}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #E8E0D8', backgroundColor: '#FDF8F0', color: '#3D3530', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteMember}
                disabled={deletingMember}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#E8A598', color: 'white', fontSize: '14px', fontWeight: '600', cursor: deletingMember ? 'not-allowed' : 'pointer' }}
              >
                {deletingMember ? 'Deleting...' : 'Yes, delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete session confirmation modal */}
      {confirmDeleteSession && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(61,53,48,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '36px', maxWidth: '420px', width: '100%', boxShadow: '0 8px 32px rgba(61,53,48,0.15)' }}>
            <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: '700', color: '#3D3530' }}>Delete this session?</h2>
            <p style={{ color: '#7A6F68', fontSize: '14px', margin: '0 0 24px', lineHeight: '1.6' }}>
              All notes, question progress, and feedback for this session will be permanently deleted.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setConfirmDeleteSession(null)}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #E8E0D8', backgroundColor: '#FDF8F0', color: '#3D3530', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteSession(confirmDeleteSession)}
                disabled={deletingSession}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#E8A598', color: 'white', fontSize: '14px', fontWeight: '600', cursor: deletingSession ? 'not-allowed' : 'pointer' }}
              >
                {deletingSession ? 'Deleting...' : 'Yes, delete'}
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
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Link href="/dashboard" style={{ color: '#7A6F68', textDecoration: 'none', fontSize: '14px' }}>
          ← Dashboard
        </Link>
        <span style={{ color: '#E8E0D8' }}>|</span>
        <span style={{ fontSize: '16px', fontWeight: '600', color: '#3D3530' }}>{member.name}</span>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Profile card */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '36px',
            border: '1px solid #E8E0D8',
            boxShadow: '0 2px 12px rgba(61, 53, 48, 0.06)',
            marginBottom: '28px',
          }}
        >
          {editing ? (
            /* ── Edit form ── */
            <div>
              <h2 style={{ margin: '0 0 24px', fontSize: '18px', fontWeight: '600', color: '#3D3530' }}>Edit team member</h2>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#7A6F68', marginBottom: '6px' }}>Name</label>
                <input value={editName} onChange={(e) => setEditName(e.target.value)} style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#A8C5A0')}
                  onBlur={(e) => (e.target.style.borderColor = '#E8E0D8')} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#7A6F68', marginBottom: '6px' }}>Role</label>
                <input value={editRole} onChange={(e) => setEditRole(e.target.value)} style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#A8C5A0')}
                  onBlur={(e) => (e.target.style.borderColor = '#E8E0D8')} />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#7A6F68', marginBottom: '6px' }}>Background notes</label>
                <textarea value={editNotes} onChange={(e) => setEditNotes(e.target.value)} rows={4}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
                  onFocus={(e) => (e.target.style.borderColor = '#A8C5A0')}
                  onBlur={(e) => (e.target.style.borderColor = '#E8E0D8')} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setEditing(false)}
                  style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #E8E0D8', backgroundColor: '#FDF8F0', color: '#3D3530', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button onClick={handleSaveEdit} disabled={saving || !editName || !editRole}
                  style={{ flex: 2, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: saving ? '#d4907f' : '#E8A598', color: 'white', fontSize: '14px', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer' }}>
                  {saving ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </div>
          ) : (
            /* ── Profile view ── */
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '18px', backgroundColor: '#F0C882', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '700', color: '#3D3530', flexShrink: 0 }}>
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: '700', color: '#3D3530' }}>{member.name}</h1>
                    <p style={{ margin: '0 0 8px', color: '#7A6F68', fontSize: '15px' }}>{member.role}</p>
                    <span style={{ backgroundColor: '#FDF8F0', border: '1px solid #E8E0D8', borderRadius: '8px', padding: '3px 10px', fontSize: '13px', color: '#7A6F68' }}>
                      {sessions.length} session{sessions.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={openEdit}
                    style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #E8E0D8', backgroundColor: 'white', color: '#3D3530', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                    Edit
                  </button>
                  <Link href={`/team/${memberId}/session/new`}
                    style={{ padding: '10px 18px', borderRadius: '10px', border: 'none', backgroundColor: '#E8A598', color: 'white', fontSize: '14px', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                    + New Session
                  </Link>
                  <button onClick={() => setConfirmDeleteMember(true)}
                    style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #E8E0D8', backgroundColor: 'white', color: '#8B3A30', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                    Delete
                  </button>
                </div>
              </div>

              {member.notes && (
                <div style={{ marginTop: '24px', backgroundColor: '#FDF8F0', borderRadius: '14px', padding: '20px', borderLeft: '4px solid #A8C5A0' }}>
                  <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: '600', color: '#7A6F68', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Background Notes</p>
                  <p style={{ margin: 0, fontSize: '14px', color: '#3D3530', lineHeight: '1.7' }}>{member.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Framework progress */}
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '28px', border: '1px solid #E8E0D8', boxShadow: '0 2px 12px rgba(61, 53, 48, 0.06)', marginBottom: '28px' }}>
          <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '600', color: '#3D3530' }}>Framework Progress</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {frameworks.map((fw) => {
              const used = usedFrameworks.has(fw.id as Framework)
              return (
                <div key={fw.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: used ? frameworkColors[fw.id] + '22' : '#FDF8F0', border: `1.5px solid ${used ? frameworkColors[fw.id] : '#E8E0D8'}`, borderRadius: '10px', padding: '8px 14px', fontSize: '13px', color: '#3D3530', fontWeight: used ? '500' : '400' }}>
                  <span>{fw.emoji}</span>
                  <span>{fw.name}</span>
                  {used && <span style={{ color: '#4CAF50', fontWeight: '700' }}>✓</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Session history */}
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '28px', border: '1px solid #E8E0D8', boxShadow: '0 2px 12px rgba(61, 53, 48, 0.06)' }}>
          <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '600', color: '#3D3530' }}>Session History</h2>

          {sessions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#7A6F68' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📋</div>
              <p>No sessions yet. Start your first session above.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sessions.map((session) => {
                const fw = getFramework(session.framework)
                const progress = session.completedQuestions.length
                const total = fw?.questions.length ?? 0
                return (
                  <div key={session.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', backgroundColor: '#FDF8F0', borderRadius: '14px', border: '1px solid #E8E0D8' }}>
                    {/* Framework icon */}
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: fw ? frameworkColors[fw.id] : '#E8E0D8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                      {fw?.emoji ?? '📋'}
                    </div>

                    {/* Info — clickable */}
                    <Link href={`/team/${memberId}/session/${session.id}`} style={{ flex: 1, minWidth: 0, textDecoration: 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '600', fontSize: '14px', color: '#3D3530' }}>{fw?.name ?? session.framework}</span>
                        <span style={{ fontSize: '12px', color: '#7A6F68' }}>Session #{session.sessionNumber}</span>
                      </div>
                      {session.notes && (
                        <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#7A6F68', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '400px' }}>
                          {session.notes}
                        </p>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, maxWidth: '120px', height: '4px', backgroundColor: '#E8E0D8', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: total > 0 ? `${(progress / total) * 100}%` : '0%', height: '100%', backgroundColor: fw ? frameworkColors[fw.id] : '#A8C5A0', borderRadius: '2px' }} />
                        </div>
                        <span style={{ fontSize: '12px', color: '#7A6F68' }}>{progress}/{total} questions</span>
                      </div>
                    </Link>

                    {/* Date + delete */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                      <div style={{ fontSize: '13px', color: '#7A6F68' }}>{formatDate(session)}</div>
                      <button
                        onClick={() => setConfirmDeleteSession(session.id)}
                        style={{ background: 'none', border: 'none', color: '#B0A8A0', fontSize: '13px', cursor: 'pointer', padding: '2px 6px', borderRadius: '6px' }}
                        title="Delete session"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
