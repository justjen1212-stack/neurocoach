'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { getTeamMember, getSessionsByMember, TeamMember, Session, Framework } from '@/lib/db'
import { frameworks, getFramework } from '@/data/questions'

const frameworkColors: Record<string, string> = {
  chemistry: '#A8C5A0',
  clear: '#C4B5E0',
  grow: '#A8C5A0',
  oscar: '#F0C882',
  johari: '#E8A598',
}

export default function TeamMemberPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const memberId = params.id as string

  const [member, setMember] = useState<TeamMember | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [fetching, setFetching] = useState(true)

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
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [user, memberId, router])

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

  if (!member) return null

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDF8F0' }}>
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '18px',
                  backgroundColor: '#F0C882',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#3D3530',
                  flexShrink: 0,
                }}
              >
                {member.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: '700', color: '#3D3530' }}>
                  {member.name}
                </h1>
                <p style={{ margin: '0 0 8px', color: '#7A6F68', fontSize: '15px' }}>{member.role}</p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span
                    style={{
                      backgroundColor: '#FDF8F0',
                      border: '1px solid #E8E0D8',
                      borderRadius: '8px',
                      padding: '3px 10px',
                      fontSize: '13px',
                      color: '#7A6F68',
                    }}
                  >
                    {sessions.length} session{sessions.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={`/team/${memberId}/session/new`}
              style={{
                backgroundColor: '#E8A598',
                color: 'white',
                borderRadius: '12px',
                padding: '12px 24px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '15px',
                whiteSpace: 'nowrap',
              }}
            >
              + Start New Session
            </Link>
          </div>

          {member.notes && (
            <div
              style={{
                marginTop: '24px',
                backgroundColor: '#FDF8F0',
                borderRadius: '14px',
                padding: '20px',
                borderLeft: '4px solid #A8C5A0',
              }}
            >
              <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: '600', color: '#7A6F68', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Background Notes
              </p>
              <p style={{ margin: 0, fontSize: '14px', color: '#3D3530', lineHeight: '1.7' }}>
                {member.notes}
              </p>
            </div>
          )}
        </div>

        {/* Framework progress */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid #E8E0D8',
            boxShadow: '0 2px 12px rgba(61, 53, 48, 0.06)',
            marginBottom: '28px',
          }}
        >
          <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '600', color: '#3D3530' }}>
            Framework Progress
          </h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {frameworks.map((fw) => {
              const used = usedFrameworks.has(fw.id as Framework)
              return (
                <div
                  key={fw.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: used ? frameworkColors[fw.id] + '22' : '#FDF8F0',
                    border: `1.5px solid ${used ? frameworkColors[fw.id] : '#E8E0D8'}`,
                    borderRadius: '10px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    color: '#3D3530',
                    fontWeight: used ? '500' : '400',
                  }}
                >
                  <span>{fw.emoji}</span>
                  <span>{fw.name}</span>
                  {used && <span style={{ color: '#4CAF50', fontWeight: '700' }}>✓</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Session history */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid #E8E0D8',
            boxShadow: '0 2px 12px rgba(61, 53, 48, 0.06)',
          }}
        >
          <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '600', color: '#3D3530' }}>
            Session History
          </h2>

          {sessions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#7A6F68' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📋</div>
              <p>No sessions yet. Start your first session above.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sessions.map((session, i) => {
                const fw = getFramework(session.framework)
                const progress = session.completedQuestions.length
                const total = fw?.questions.length ?? 0
                return (
                  <Link
                    key={session.id}
                    href={`/team/${memberId}/session/${session.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px 20px',
                      backgroundColor: '#FDF8F0',
                      borderRadius: '14px',
                      border: '1px solid #E8E0D8',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    {/* Timeline dot */}
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        backgroundColor: fw ? frameworkColors[fw.id] : '#E8E0D8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        flexShrink: 0,
                      }}
                    >
                      {fw?.emoji ?? '📋'}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '600', fontSize: '14px', color: '#3D3530' }}>
                          {fw?.name ?? session.framework}
                        </span>
                        <span style={{ fontSize: '12px', color: '#7A6F68' }}>
                          Session #{session.sessionNumber}
                        </span>
                      </div>
                      {session.notes && (
                        <p
                          style={{
                            margin: '0 0 6px',
                            fontSize: '13px',
                            color: '#7A6F68',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '400px',
                          }}
                        >
                          {session.notes}
                        </p>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            flex: 1,
                            maxWidth: '120px',
                            height: '4px',
                            backgroundColor: '#E8E0D8',
                            borderRadius: '2px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: total > 0 ? `${(progress / total) * 100}%` : '0%',
                              height: '100%',
                              backgroundColor: fw ? frameworkColors[fw.id] : '#A8C5A0',
                              borderRadius: '2px',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '12px', color: '#7A6F68' }}>
                          {progress}/{total} questions
                        </span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '13px', color: '#7A6F68' }}>{formatDate(session)}</div>
                      <div style={{ fontSize: '12px', color: '#A8C5A0', marginTop: '4px' }}>View →</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
