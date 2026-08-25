'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { getTeamMembers, getSessionsByMember, TeamMember, Session } from '@/lib/db'
import { frameworks } from '@/data/questions'

interface MemberWithMeta extends TeamMember {
  lastSession: Session | null
  sessionCount: number
}

const frameworkColors: Record<string, string> = {
  chemistry: '#A8C5A0',
  clear: '#C4B5E0',
  grow: '#A8C5A0',
  oscar: '#F0C882',
  johari: '#E8A598',
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [members, setMembers] = useState<MemberWithMeta[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    async function load() {
      setFetching(true)
      try {
        const raw = await getTeamMembers(user!.uid)
        const enriched = await Promise.all(
          raw.map(async (m) => {
            const sessions = await getSessionsByMember(m.id)
            return {
              ...m,
              lastSession: sessions[0] ?? null,
              sessionCount: sessions.length,
            }
          })
        )
        setMembers(enriched)
      } catch (e) {
        console.error(e)
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [user])

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FDF8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#7A6F68' }}>Loading...</p>
      </div>
    )
  }

  const formatDate = (session: Session | null) => {
    if (!session?.createdAt) return 'No sessions yet'
    const d = session.createdAt.toDate()
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const getFrameworkLabel = (session: Session | null) => {
    if (!session) return null
    return frameworks.find((f) => f.id === session.framework)
  }

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
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#A8C5A0',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            🧠
          </div>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#3D3530' }}>NeuroCoach</span>
        </div>
        <button
          onClick={() => signOut().then(() => router.push('/'))}
          style={{
            background: 'none',
            border: '1px solid #E8E0D8',
            borderRadius: '8px',
            padding: '8px 16px',
            color: '#7A6F68',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Sign out
        </button>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Title row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#3D3530', margin: '0 0 4px' }}>
              Your Team
            </h1>
            <p style={{ color: '#7A6F68', margin: 0, fontSize: '15px' }}>
              {members.length} team member{members.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/team/new"
            style={{
              backgroundColor: '#E8A598',
              color: 'white',
              borderRadius: '12px',
              padding: '12px 24px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '15px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            + Add Team Member
          </Link>
        </div>

        {/* Members grid */}
        {fetching ? (
          <div style={{ color: '#7A6F68', textAlign: 'center', padding: '60px 0' }}>
            Loading team members...
          </div>
        ) : members.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 24px',
              backgroundColor: 'white',
              borderRadius: '20px',
              border: '1px solid #E8E0D8',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌱</div>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#3D3530', marginBottom: '8px' }}>
              No team members yet
            </h2>
            <p style={{ color: '#7A6F68', marginBottom: '24px', fontSize: '15px' }}>
              Add your first team member to start coaching.
            </p>
            <Link
              href="/team/new"
              style={{
                backgroundColor: '#E8A598',
                color: 'white',
                borderRadius: '12px',
                padding: '12px 24px',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              Add a team member
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {members.map((member) => {
              const fw = getFrameworkLabel(member.lastSession)
              return (
                <div
                  key={member.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '28px',
                    border: '1px solid #E8E0D8',
                    boxShadow: '0 2px 12px rgba(61, 53, 48, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  {/* Member header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        backgroundColor: '#F0C882',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#3D3530',
                        flexShrink: 0,
                      }}
                    >
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 style={{ margin: '0 0 2px', fontSize: '17px', fontWeight: '600', color: '#3D3530' }}>
                        {member.name}
                      </h3>
                      <p style={{ margin: 0, fontSize: '13px', color: '#7A6F68' }}>{member.role}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        backgroundColor: '#FDF8F0',
                        borderRadius: '10px',
                        padding: '10px 12px',
                      }}
                    >
                      <div style={{ fontSize: '18px', fontWeight: '700', color: '#3D3530' }}>
                        {member.sessionCount}
                      </div>
                      <div style={{ fontSize: '12px', color: '#7A6F68' }}>
                        session{member.sessionCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 2,
                        backgroundColor: '#FDF8F0',
                        borderRadius: '10px',
                        padding: '10px 12px',
                      }}
                    >
                      <div style={{ fontSize: '12px', color: '#7A6F68', marginBottom: '2px' }}>Last session</div>
                      <div style={{ fontSize: '13px', fontWeight: '500', color: '#3D3530' }}>
                        {formatDate(member.lastSession)}
                      </div>
                    </div>
                  </div>

                  {/* Framework badge */}
                  {fw && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          backgroundColor: frameworkColors[fw.id] + '33',
                          color: '#3D3530',
                          borderRadius: '8px',
                          padding: '4px 10px',
                          fontSize: '12px',
                          fontWeight: '500',
                        }}
                      >
                        {fw.emoji} {fw.name}
                      </span>
                      <span style={{ fontSize: '12px', color: '#7A6F68' }}>last used</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                    <Link
                      href={`/team/${member.id}/session/new`}
                      style={{
                        flex: 1,
                        backgroundColor: '#E8A598',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '10px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                      }}
                    >
                      Start Session
                    </Link>
                    <Link
                      href={`/team/${member.id}`}
                      style={{
                        flex: 1,
                        backgroundColor: '#FDF8F0',
                        color: '#3D3530',
                        borderRadius: '10px',
                        padding: '10px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '14px',
                        border: '1px solid #E8E0D8',
                      }}
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
