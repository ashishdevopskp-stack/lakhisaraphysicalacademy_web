import { redirect, notFound } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getAdmission, deleteAdmission } from '@/app/lib/action/admissions'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../../_components/AdminSidebar'
import { AdmissionStatusForm, STATUS_STYLES } from '../../_components/AdmissionStatusForm'

function Row({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900 text-right">{value}</span>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">{title}</h3>
      <div className="divide-y divide-gray-50">{children}</div>
    </div>
  )
}

function DocLink({ label, url }: { label: string; url: string | null }) {
  if (!url) return null
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="block text-sm text-indigo-600 hover:underline py-1"
    >
      {label} ↗
    </a>
  )
}

export default async function AdmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const admission = await getAdmission(id)
  if (!admission) notFound()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Admissions" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            {admission.signedUrls.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={admission.signedUrls.photo}
                alt={admission.student_name}
                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
              />
            )}
            <div>
              <h1 className="text-2xl font-semibold mb-1">{admission.student_name}</h1>
              <p className="text-sm text-gray-500">
                {admission.admission_id} · Applied {new Date(admission.created_at).toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs px-2.5 py-1 rounded-full ${STATUS_STYLES[admission.status]}`}>
              {admission.status}
            </span>
            <AdmissionStatusForm id={admission.id} status={admission.status} />
            <form action={deleteAdmission.bind(null, admission.id)}>
              <button type="submit" className="text-sm text-red-600 hover:text-red-700 transition-colors">
                Delete
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Section title="Personal">
            <Row label="Father's Name" value={admission.father_name} />
            <Row label="Mother's Name" value={admission.mother_name} />
            <Row label="Gender" value={admission.gender} />
            <Row label="Date of Birth" value={admission.dob} />
            <Row label="Blood Group" value={admission.blood_group} />
            <Row label="Aadhaar" value={admission.aadhaar} />
          </Section>

          <Section title="Contact">
            <Row label="Mobile" value={admission.mobile} />
            <Row label="WhatsApp" value={admission.whatsapp} />
            <Row label="Alt Mobile" value={admission.alt_mobile} />
            <Row label="Email" value={admission.email} />
          </Section>

          <Section title="Address">
            <Row label="Village/City" value={admission.village} />
            <Row label="Post Office" value={admission.post_office} />
            <Row label="Police Station" value={admission.police_station} />
            <Row label="District" value={admission.district} />
            <Row label="State" value={admission.state} />
            <Row label="Pincode" value={admission.pincode} />
          </Section>

          <Section title="Education">
            <Row label="Qualification" value={admission.qualification} />
            <Row label="School/College" value={admission.school_college} />
            <Row label="Stream" value={admission.stream} />
            <Row label="Passing Year" value={admission.passing_year} />
          </Section>

          <Section title="Physical">
            <Row label="Height" value={admission.height} />
            <Row label="Weight" value={admission.weight} />
            <Row label="Chest (Normal)" value={admission.chest_normal} />
            <Row label="Chest (Expanded)" value={admission.chest_expanded} />
            <Row label="Running Time" value={admission.running_time} />
            <Row label="Long Jump" value={admission.long_jump} />
            <Row label="High Jump" value={admission.high_jump} />
            <Row label="Push-ups" value={admission.pushups} />
          </Section>

          <Section title="Medical">
            <Row label="Has Medical Issue" value={admission.has_medical_issue} />
            <Row label="Details" value={admission.medical_details} />
            <Row label="Disability" value={admission.disability} />
            <Row label="Current Medication" value={admission.current_medication} />
          </Section>

          <Section title="Course & Goals">
            <Row label="Course" value={admission.course} />
            <Row label="Preferred Batch" value={admission.preferred_batch} />
            <Row label="Preferred Joining" value={admission.preferred_joining_date} />
            <Row label="Target Recruitment" value={admission.target_recruitment} />
            <Row label="Target Year" value={admission.target_year} />
            <Row label="Fitness Level" value={admission.current_fitness_level} />
          </Section>

          <Section title="Hostel & Membership">
            <Row label="Need Hostel" value={admission.need_hostel} />
            <Row label="Hostel Type" value={admission.hostel_type} />
            <Row label="Food Required" value={admission.food_required} />
            <Row label="Membership Plan" value={admission.membership_plan} />
          </Section>

          <Section title="Availability & Referral">
            <Row label="Joining Preference" value={admission.joining_preference} />
            <Row label="Daily Available Time" value={admission.daily_available_time} />
            <Row label="Distance from Academy" value={admission.distance_from_academy} />
            <Row label="Referred By" value={admission.referred_by} />
            <Row label="Heard About Us Via" value={admission.hear_about_us} />
          </Section>

          <Section title="Payment">
            <Row label="Status" value={admission.payment_status} />
            <Row label="Mode" value={admission.payment_mode} />
            <Row label="Transaction ID" value={admission.transaction_id} />
          </Section>

          <Section title="Emergency Contact">
            <Row label="Name" value={admission.emergency_name} />
            <Row label="Relation" value={admission.emergency_relation} />
            <Row label="Mobile" value={admission.emergency_mobile} />
          </Section>

          <div className="sm:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Documents</h3>
            <DocLink label="Aadhaar Card" url={admission.signedUrls.aadhaarCard} />
            <DocLink label="School ID" url={admission.signedUrls.schoolId} />
            <DocLink label="Other ID Proof" url={admission.signedUrls.otherIdProof} />
            <DocLink label="Previous Certificate" url={admission.signedUrls.previousCertificate} />
            {!admission.signedUrls.aadhaarCard &&
              !admission.signedUrls.schoolId &&
              !admission.signedUrls.otherIdProof &&
              !admission.signedUrls.previousCertificate && (
                <p className="text-sm text-gray-400">No documents uploaded.</p>
              )}
          </div>

          <div className="sm:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Declarations</h3>
            <p className="text-sm text-gray-600">
              {[
                admission.declare_physically_fit && 'Physically fit',
                admission.declare_rules_agreement && 'Rules agreement',
                admission.declare_non_refundable && 'Non-refundable acknowledged',
                admission.declare_attendance && 'Attendance commitment',
                admission.declare_media_consent && 'Media consent',
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}