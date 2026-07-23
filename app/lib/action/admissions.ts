'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/app/lib/supabase/server'
import { getCurrentUserRole } from '@/app/lib/action/auth'

export type AdmissionStatus = 'pending' | 'approved' | 'rejected' | 'enrolled'

export interface DbAdmission {
  id: string
  admission_id: string
  student_name: string
  father_name: string
  mother_name: string | null
  gender: string
  dob: string
  blood_group: string | null
  aadhaar: string | null
  photo_path: string | null
  mobile: string
  whatsapp: string
  alt_mobile: string | null
  email: string | null
  village: string
  post_office: string | null
  police_station: string | null
  district: string
  state: string
  pincode: string
  qualification: string
  school_college: string | null
  stream: string | null
  passing_year: string | null
  height: string
  weight: string
  chest_normal: string | null
  chest_expanded: string | null
  running_time: string | null
  long_jump: string | null
  high_jump: string | null
  pushups: string | null
  has_medical_issue: string
  medical_details: string | null
  disability: string | null
  current_medication: string | null
  course: string
  preferred_batch: string
  preferred_joining_date: string | null
  target_recruitment: string
  target_year: string
  current_fitness_level: string
  need_hostel: string
  hostel_type: string | null
  food_required: string | null
  membership_plan: string
  joining_preference: string | null
  daily_available_time: string | null
  distance_from_academy: string | null
  referred_by: string | null
  hear_about_us: string | null
  payment_status: string
  payment_mode: string | null
  transaction_id: string | null
  aadhaar_card_path: string | null
  school_id_path: string | null
  other_id_proof_path: string | null
  previous_certificate_path: string | null
  emergency_name: string
  emergency_relation: string
  emergency_mobile: string
  declare_physically_fit: boolean
  declare_rules_agreement: boolean
  declare_non_refundable: boolean
  declare_attendance: boolean
  declare_media_consent: boolean
  status: AdmissionStatus
  created_at: string
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const MAX_DOC_BYTES = 10 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ALLOWED_DOC_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

async function requireAdmin() {
  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')
}

function generateAdmissionId() {
  const year = new Date().getFullYear()
  const rand = crypto.randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase()
  return `LPA-${year}-${rand}`
}

function str(fd: FormData, key: string) {
  return String(fd.get(key) ?? '').trim()
}
function bool(fd: FormData, key: string) {
  return fd.get(key) === 'true'
}

type ParsedAdmission =
  | { error: string; values?: undefined }
  | { error?: undefined; values: Record<string, unknown> }

/** Mirrors the client-side checks. Never trust the client alone — this is what actually gates the insert. */
function parseAdmissionForm(formData: FormData): ParsedAdmission {
  const v = {
    student_name: str(formData, 'studentName'),
    father_name: str(formData, 'fatherName'),
    mother_name: str(formData, 'motherName') || null,
    gender: str(formData, 'gender'),
    dob: str(formData, 'dob'),
    blood_group: str(formData, 'bloodGroup') || null,
    aadhaar: str(formData, 'aadhaar') || null,
    mobile: str(formData, 'mobile'),
    whatsapp: str(formData, 'whatsapp'),
    alt_mobile: str(formData, 'altMobile') || null,
    email: str(formData, 'email') || null,
    village: str(formData, 'village'),
    post_office: str(formData, 'postOffice') || null,
    police_station: str(formData, 'policeStation') || null,
    district: str(formData, 'district'),
    state: str(formData, 'state'),
    pincode: str(formData, 'pincode'),
    qualification: str(formData, 'qualification'),
    school_college: str(formData, 'schoolCollege') || null,
    stream: str(formData, 'stream') || null,
    passing_year: str(formData, 'passingYear') || null,
    height: str(formData, 'height'),
    weight: str(formData, 'weight'),
    chest_normal: str(formData, 'chestNormal') || null,
    chest_expanded: str(formData, 'chestExpanded') || null,
    running_time: str(formData, 'runningTime') || null,
    long_jump: str(formData, 'longJump') || null,
    high_jump: str(formData, 'highJump') || null,
    pushups: str(formData, 'pushups') || null,
    has_medical_issue: str(formData, 'hasMedicalIssue'),
    medical_details: str(formData, 'medicalDetails') || null,
    disability: str(formData, 'disability') || null,
    current_medication: str(formData, 'currentMedication') || null,
    course: str(formData, 'course'),
    preferred_batch: str(formData, 'preferredBatch'),
    preferred_joining_date: str(formData, 'preferredJoiningDate') || null,
    target_recruitment: str(formData, 'targetRecruitment'),
    target_year: str(formData, 'targetYear'),
    current_fitness_level: str(formData, 'currentFitnessLevel'),
    need_hostel: str(formData, 'needHostel'),
    hostel_type: str(formData, 'hostelType') || null,
    food_required: str(formData, 'foodRequired') || null,
    membership_plan: str(formData, 'membershipPlan'),
    joining_preference: str(formData, 'joiningPreference') || null,
    daily_available_time: str(formData, 'dailyAvailableTime') || null,
    distance_from_academy: str(formData, 'distanceFromAcademy') || null,
    referred_by: str(formData, 'referredBy') || null,
    hear_about_us: str(formData, 'hearAboutUs') || null,
    payment_status: str(formData, 'paymentStatus') || 'Unpaid',
    payment_mode: str(formData, 'paymentMode') || null,
    transaction_id: str(formData, 'transactionId') || null,
    emergency_name: str(formData, 'emergencyName'),
    emergency_relation: str(formData, 'emergencyRelation'),
    emergency_mobile: str(formData, 'emergencyMobile'),
    declare_physically_fit: bool(formData, 'declarePhysicallyFit'),
    declare_rules_agreement: bool(formData, 'declareRulesAgreement'),
    declare_non_refundable: bool(formData, 'declareNonRefundable'),
    declare_attendance: bool(formData, 'declareAttendance'),
    declare_media_consent: bool(formData, 'declareMediaConsent'),
  }

  const required: Array<[keyof typeof v, string]> = [
    ['student_name', 'Student name is required.'],
    ['father_name', "Father's name is required."],
    ['gender', 'Gender is required.'],
    ['dob', 'Date of birth is required.'],
    ['village', 'Village/city is required.'],
    ['district', 'District is required.'],
    ['state', 'State is required.'],
    ['qualification', 'Qualification is required.'],
    ['height', 'Height is required.'],
    ['weight', 'Weight is required.'],
    ['course', 'Course is required.'],
    ['preferred_batch', 'Preferred batch is required.'],
    ['target_recruitment', 'Target recruitment is required.'],
    ['target_year', 'Target year is required.'],
    ['current_fitness_level', 'Current fitness level is required.'],
    ['need_hostel', 'Hostel requirement is required.'],
    ['membership_plan', 'Membership plan is required.'],
    ['emergency_name', 'Emergency contact name is required.'],
    ['emergency_relation', 'Emergency contact relation is required.'],
  ]
  for (const [key, msg] of required) {
    if (!v[key]) return { error: msg }
  }

  if (!/^[0-9]{10}$/.test(v.mobile)) return { error: 'Enter a valid 10-digit mobile number.' }
  if (!/^[0-9]{10}$/.test(v.whatsapp)) return { error: 'Enter a valid 10-digit WhatsApp number.' }
  if (!/^[0-9]{10}$/.test(v.emergency_mobile)) return { error: 'Enter a valid 10-digit emergency contact number.' }
  if (!/^[0-9]{6}$/.test(v.pincode)) return { error: 'Enter a valid 6-digit PIN code.' }
  if (v.aadhaar && !/^[0-9]{12}$/.test(v.aadhaar)) return { error: 'Aadhaar number must be 12 digits.' }
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) return { error: 'Enter a valid email address.' }
  if (
    !v.declare_physically_fit || !v.declare_rules_agreement || !v.declare_non_refundable ||
    !v.declare_attendance || !v.declare_media_consent
  ) {
    return { error: 'All declarations must be accepted to submit.' }
  }

  return { values: v }
}

async function uploadFile(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File,
  opts: { bucket: string; maxBytes: number; allowedTypes: string[] }
): Promise<{ path?: string; error?: string }> {
  if (!opts.allowedTypes.includes(file.type)) {
    return { error: `Unsupported file type: ${file.type || 'unknown'}` }
  }
  if (file.size > opts.maxBytes) {
    return { error: `File exceeds the ${(opts.maxBytes / 1024 / 1024).toFixed(0)}MB limit` }
  }
  const ext = file.name.split('.').pop() || 'bin'
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from(opts.bucket).upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  })
  if (error) return { error: 'Upload failed: ' + error.message }
  return { path }
}

export async function createAdmission(
  formData: FormData
): Promise<{ success: boolean; admissionId?: string; error?: string }> {
  const supabase = await createClient()

  try {
    const parsed = parseAdmissionForm(formData)
    if (parsed.error) return { success: false, error: parsed.error }

    const photo = formData.get('photo') as File | null
    if (!photo || photo.size === 0) return { success: false, error: 'Student photo is required.' }

    const photoUpload = await uploadFile(supabase, photo, {
      bucket: 'admission-photos',
      maxBytes: MAX_IMAGE_BYTES,
      allowedTypes: ALLOWED_IMAGE_TYPES,
    })
    if (photoUpload.error) return { success: false, error: photoUpload.error }

    const docFields: Array<[string, string]> = [
      ['aadhaarCard', 'aadhaar_card_path'],
      ['schoolId', 'school_id_path'],
      ['otherIdProof', 'other_id_proof_path'],
      ['previousCertificate', 'previous_certificate_path'],
    ]
    const docPaths: Record<string, string | null> = {}
    for (const [formKey, column] of docFields) {
      const file = formData.get(formKey) as File | null
      if (file && file.size > 0) {
        const uploaded = await uploadFile(supabase, file, {
          bucket: 'admission-documents',
          maxBytes: MAX_DOC_BYTES,
          allowedTypes: ALLOWED_DOC_TYPES,
        })
        if (uploaded.error) return { success: false, error: uploaded.error }
        docPaths[column] = uploaded.path ?? null
      } else {
        docPaths[column] = null
      }
    }

    const admissionId = generateAdmissionId()

    const { error } = await supabase.from('admissions').insert({
      admission_id: admissionId,
      ...parsed.values,
      photo_path: photoUpload.path,
      ...docPaths,
      status: 'pending',
    })

    if (error) return { success: false, error: 'Could not save your application: ' + error.message }

    revalidatePath('/admin/admissions')
    return { success: true, admissionId }
  } catch (err) {
    console.error('createAdmission error:', err)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}

export async function getAdmissions(): Promise<DbAdmission[]> {
  await requireAdmin()
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('admissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getAdmissions error:', error)
    return []
  }
  return data ?? []
}

export async function getAdmission(
  id: string
): Promise<(DbAdmission & { signedUrls: Record<string, string | null> }) | null> {
  await requireAdmin()
  const supabase = await createClient()
  const { data, error } = await supabase.from('admissions').select('*').eq('id', id).single()
  if (error || !data) return null

  async function sign(bucket: string, path: string | null) {
    if (!path) return null
    const { data: signed } = await supabase.storage.from(bucket).createSignedUrl(path, 3600)
    return signed?.signedUrl ?? null
  }

  const signedUrls = {
    photo: await sign('admission-photos', data.photo_path),
    aadhaarCard: await sign('admission-documents', data.aadhaar_card_path),
    schoolId: await sign('admission-documents', data.school_id_path),
    otherIdProof: await sign('admission-documents', data.other_id_proof_path),
    previousCertificate: await sign('admission-documents', data.previous_certificate_path),
  }

  return { ...data, signedUrls }
}

export async function updateAdmissionStatus(id: string, status: AdmissionStatus) {
  await requireAdmin()
  const supabase = await createClient()
  const { error } = await supabase.from('admissions').update({ status }).eq('id', id)
  if (error) console.error('updateAdmissionStatus error:', error)
  revalidatePath('/admin/admissions')
  revalidatePath(`/admin/admissions/${id}`)
}

export async function deleteAdmission(id: string) {
  await requireAdmin()
  const supabase = await createClient()

  const { data: existing } = await supabase.from('admissions').select('*').eq('id', id).single()

  const { error } = await supabase.from('admissions').delete().eq('id', id)
  if (error) {
    redirect(`/admin/admissions?error=${encodeURIComponent(error.message)}`)
  }

  if (existing) {
    const photoPaths = [existing.photo_path].filter(Boolean) as string[]
    const docPaths = [
      existing.aadhaar_card_path,
      existing.school_id_path,
      existing.other_id_proof_path,
      existing.previous_certificate_path,
    ].filter(Boolean) as string[]
    if (photoPaths.length) await supabase.storage.from('admission-photos').remove(photoPaths).catch(() => {})
    if (docPaths.length) await supabase.storage.from('admission-documents').remove(docPaths).catch(() => {})
  }

  revalidatePath('/admin/admissions')
  redirect('/admin/admissions')
}