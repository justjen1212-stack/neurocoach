'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const { user, loading, signIn, signUp } = useAuth()
  const router = useRouter()

  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      if (mode === 'signin') {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
      router.push('/dashboard')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      setError(msg.replace('Firebase: ', '').replace(/\(auth\/.*\)\.?/, '').trim())
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FDF8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#7A6F68' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FDF8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '48px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 4px 24px rgba(61, 53, 48, 0.08)',
          border: '1px solid #E8E0D8',
        }}
      >
        {/* Logo / Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#A8C5A0',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '28px',
            }}
          >
            🧠
          </div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#3D3530',
              margin: '0 0 8px',
              letterSpacing: '-0.5px',
            }}
          >
            NeuroCoach
          </h1>
          <p style={{ color: '#7A6F68', fontSize: '15px', margin: 0 }}>
            Neurodiversity-informed coaching for teams
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#3D3530',
                marginBottom: '6px',
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1.5px solid #E8E0D8',
                fontSize: '15px',
                color: '#3D3530',
                backgroundColor: '#FDF8F0',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#A8C5A0')}
              onBlur={(e) => (e.target.style.borderColor = '#E8E0D8')}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#3D3530',
                marginBottom: '6px',
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1.5px solid #E8E0D8',
                fontSize: '15px',
                color: '#3D3530',
                backgroundColor: '#FDF8F0',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#A8C5A0')}
              onBlur={(e) => (e.target.style.borderColor = '#E8E0D8')}
            />
          </div>

          {error && (
            <div
              style={{
                backgroundColor: '#FDE8E5',
                border: '1px solid #E8A598',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '16px',
                fontSize: '14px',
                color: '#8B3A30',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: submitting ? '#d4907f' : '#E8A598',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              marginBottom: '16px',
            }}
          >
            {submitting
              ? 'Please wait...'
              : mode === 'signin'
              ? 'Sign In'
              : 'Create Account'}
          </button>
        </form>

        {/* Toggle mode */}
        <div style={{ textAlign: 'center', fontSize: '14px', color: '#7A6F68' }}>
          {mode === 'signin' ? (
            <>
              New to NeuroCoach?{' '}
              <button
                onClick={() => { setMode('signup'); setError('') }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#A8C5A0',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                  textDecoration: 'underline',
                }}
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => { setMode('signin'); setError('') }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#A8C5A0',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                  textDecoration: 'underline',
                }}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
