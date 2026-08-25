'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { createTeamMember } from '@/lib/db'

export default function NewTeamMemberPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !user) router.push('/')
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setError('')
    setSubmitting(true)
    try {
      const id = await createTeamMember(user.uid, { name, role, notes })
      router.push(`/team/${id}`)
    } catch (err) {
      setError('Failed to create team member. Please try again.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FDF8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#7A6F68' }}>Loading...</p>
      </div>
    )
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1.5px solid #E8E0D8',
    fontSize: '15px',
    color: '#3D3530',
    backgroundColor: '#FDF8F0',
    outline: 'none',
    fontFamily: 'inherit',
  }

  const labelStyle = {
    display: 'block' as const,
    fontSize: '14px',
    fontWeight: '500' as const,
    color: '#3D3530',
    marginBottom: '6px',
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
          gap: '16px',
        }}
      >
        <Link
          href="/dashboard"
          style={{
            color: '#7A6F68',
            textDecoration: 'none',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ← Back
        </Link>
        <span style={{ color: '#E8E0D8' }}>|</span>
        <span style={{ fontSize: '16px', fontWeight: '600', color: '#3D3530' }}>Add Team Member</span>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px' }}>
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid #E8E0D8',
            boxShadow: '0 2px 12px rgba(61, 53, 48, 0.06)',
          }}
        >
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#3D3530', margin: '0 0 8px' }}>
              New team member
            </h1>
            <p style={{ color: '#7A6F68', fontSize: '15px', margin: 0 }}>
              Add some basic details to get started. You can always update these later.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Alex Johnson"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#A8C5A0')}
                onBlur={(e) => (e.target.style.borderColor = '#E8E0D8')}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Role *</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                placeholder="e.g. Senior Designer"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#A8C5A0')}
                onBlur={(e) => (e.target.style.borderColor = '#E8E0D8')}
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>
                Background notes{' '}
                <span style={{ fontWeight: '400', color: '#7A6F68' }}>(optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any background context that would be useful — communication style, known strengths, things to be mindful of..."
                rows={5}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  lineHeight: '1.6',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#A8C5A0')}
                onBlur={(e) => (e.target.style.borderColor = '#E8E0D8')}
              />
              <p style={{ fontSize: '13px', color: '#7A6F68', margin: '6px 0 0' }}>
                This is private to you. Think of it as your personal coaching notes.
              </p>
            </div>

            {error && (
              <div
                style={{
                  backgroundColor: '#FDE8E5',
                  border: '1px solid #E8A598',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  marginBottom: '20px',
                  fontSize: '14px',
                  color: '#8B3A30',
                }}
              >
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <Link
                href="/dashboard"
                style={{
                  flex: 1,
                  backgroundColor: '#FDF8F0',
                  color: '#3D3530',
                  borderRadius: '12px',
                  padding: '14px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '15px',
                  border: '1px solid #E8E0D8',
                }}
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  flex: 2,
                  backgroundColor: submitting ? '#d4907f' : '#E8A598',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                }}
              >
                {submitting ? 'Adding...' : 'Add Team Member'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
