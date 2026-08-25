'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { getTeamMember, getSessionsByMember, createSession, TeamMember, Session, Framework } from '@/lib/db'
import { frameworks } from '@/data/questions'

const frameworkColors: Record<string, string> = {
  chemistry: '#A8C5A0',
  clear: '#C4B5E0',
  grow: '#A8C5A0',
  oscar: '#F0C882',
  johari: '#E8A598',
}

const frameworkBg: Record<string, string> = {
  chemistry: '#F0F7EE',
  clear: '#F3F0FA',
  grow: '#F0F7EE',
  oscar: '#FDF5E0',
  johari: '#FDF0EE',
}

export default function NewSessionPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const memberId = params.id as string

  const [member, setMember] = useState<TeamMember | null>(null)
  const [pastSessions, setPastSessions] = useState<Session[]>([])
  const [fetching, setFetching] = useState(true)
  const [creating, setCreating] = useState<Framework | null>(null)

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
        setPastSessions(s)
      } catch (e) {
        console.error(e)
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [user, memberId, router])

  const usedFrameworks = new Set(pastSessions.map((s) => s.framework))

  const handleSelectFramework = async (frameworkId: Framework) => {
    if (!user || creating) return
    setCreating(frameworkId)
    try {
      const sessionNumber = pastSessions.filter((s) => s.framework === frameworkId).length + 1
      const sessionId = await createSession({
        managerId: user.uid,
        memberId,
        framework: frameworkId,
        sessionNumber,
      })
      router.push(`/team/${memberId}/session/${sessionId}`)
    } catch (e) {
      console.error(e)
      setCreating(null)
    }
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
        <Link href={`/team/${memberId}`} style={{ color: '#7A6F68', textDecoration: 'none', fontSize: '14px' }}>
          ← {member.name}
        </Link>
        <span style={{ color: '#E8E0D8' }}>|</span>
        <span style={{ fontSize: '16px', fontWeight: '600', color: '#3D3530' }}>Choose Framework</span>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#3D3530', margin: '0 0 8px' }}>
            Start a session with {member.name}
          </h1>
          <p style={{ color: '#7A6F68', fontSize: '15px', margin: 0 }}>
            Choose the right framework for where {member.name} is right now. They&apos;re ordered by recommended sequence.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {frameworks.map((fw, index) => {
            const used = usedFrameworks.has(fw.id as Framework)
            const isCreating = creating === fw.id
            const color = frameworkColors[fw.id]
            const bg = frameworkBg[fw.id]

            return (
              <button
                key={fw.id}
                onClick={() => handleSelectFramework(fw.id as Framework)}
                disabled={!!creating}
                style={{
                  backgroundColor: isCreating ? bg : 'white',
                  border: `2px solid ${isCreating ? color : '#E8E0D8'}`,
                  borderRadius: '20px',
                  padding: '24px 28px',
                  textAlign: 'left',
                  cursor: creating ? 'wait' : 'pointer',
                  width: '100%',
                  transition: 'all 0.2s',
                  opacity: creating && !isCreating ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!creating) {
                    ;(e.currentTarget as HTMLButtonElement).style.borderColor = color
                    ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = bg
                  }
                }}
                onMouseLeave={(e) => {
                  if (!creating) {
                    ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#E8E0D8'
                    ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'white'
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  {/* Step number + emoji */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        backgroundColor: color + '33',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '22px',
                      }}
                    >
                      {isCreating ? '⏳' : fw.emoji}
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#7A6F68',
                        fontWeight: '500',
                      }}
                    >
                      Step {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '17px', fontWeight: '700', color: '#3D3530' }}>
                        {fw.name}
                      </span>
                      {used && (
                        <span
                          style={{
                            backgroundColor: color + '33',
                            color: '#3D3530',
                            borderRadius: '6px',
                            padding: '2px 8px',
                            fontSize: '11px',
                            fontWeight: '600',
                          }}
                        >
                          Used before
                        </span>
                      )}
                    </div>
                    <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#3D3530', lineHeight: '1.5' }}>
                      {fw.description}
                    </p>
                    <p style={{ margin: 0, fontSize: '13px', color: '#7A6F68', fontStyle: 'italic' }}>
                      {fw.whenToUse}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div
                    style={{
                      fontSize: '20px',
                      color: color,
                      flexShrink: 0,
                      alignSelf: 'center',
                    }}
                  >
                    {isCreating ? '' : '→'}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </main>
    </div>
  )
}
