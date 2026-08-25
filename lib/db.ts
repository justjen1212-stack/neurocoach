import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string
  managerId: string
  name: string
  role: string
  notes: string
  createdAt: Timestamp | null
}

export type Framework = 'chemistry' | 'clear' | 'grow' | 'oscar' | 'johari'

export interface Session {
  id: string
  managerId: string
  memberId: string
  framework: Framework
  sessionNumber: number
  notes: string
  completedQuestions: string[]
  createdAt: Timestamp | null
  updatedAt: Timestamp | null
}

// ─── Team Members ─────────────────────────────────────────────────────────────

export async function createTeamMember(
  managerId: string,
  data: { name: string; role: string; notes: string }
): Promise<string> {
  const ref = await addDoc(collection(db, 'teamMembers'), {
    managerId,
    name: data.name,
    role: data.role,
    notes: data.notes,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function getTeamMembers(managerId: string): Promise<TeamMember[]> {
  const q = query(
    collection(db, 'teamMembers'),
    where('managerId', '==', managerId),
    orderBy('createdAt', 'asc')
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as TeamMember))
}

export async function getTeamMember(memberId: string): Promise<TeamMember | null> {
  const snap = await getDoc(doc(db, 'teamMembers', memberId))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as TeamMember
}

// ─── Sessions ─────────────────────────────────────────────────────────────────

export async function createSession(data: {
  managerId: string
  memberId: string
  framework: Framework
  sessionNumber: number
}): Promise<string> {
  const ref = await addDoc(collection(db, 'sessions'), {
    managerId: data.managerId,
    memberId: data.memberId,
    framework: data.framework,
    sessionNumber: data.sessionNumber,
    notes: '',
    completedQuestions: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateSession(
  sessionId: string,
  data: Partial<Pick<Session, 'notes' | 'completedQuestions'>>
): Promise<void> {
  await updateDoc(doc(db, 'sessions', sessionId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const snap = await getDoc(doc(db, 'sessions', sessionId))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Session
}

export async function getSessionsByMember(memberId: string): Promise<Session[]> {
  const q = query(
    collection(db, 'sessions'),
    where('memberId', '==', memberId),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Session))
}
