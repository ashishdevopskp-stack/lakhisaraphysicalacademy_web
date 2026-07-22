"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Phone,
  MessageCircle,
  User,
  Contact,
  MapPin,
  GraduationCap,
  Activity,
  Stethoscope,
  Target,
  Trophy,
  Building2,
  Wallet,
  CalendarClock,
  Megaphone,
  CreditCard,
  UploadCloud,
  ShieldCheck,
  FileCheck2,
  ChevronLeft,
  ChevronRight,
  PartyPopper,
  Check,
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { FadeInUp, EASE } from "./_AdmissionMotion";
import { SectionGlow } from "./_shared";
import { whatsappHref } from "../lib/constants";

/* =========================================================
   Form data model
   ========================================================= */
interface AdmissionFormData {
  studentName: string;
  fatherName: string;
  motherName: string;
  gender: string;
  dob: string;
  bloodGroup: string;
  aadhaar: string;
  photo: File | null;
  mobile: string;
  whatsapp: string;
  altMobile: string;
  email: string;
  village: string;
  postOffice: string;
  policeStation: string;
  district: string;
  state: string;
  pincode: string;
  qualification: string;
  schoolCollege: string;
  stream: string;
  passingYear: string;
  height: string;
  weight: string;
  chestNormal: string;
  chestExpanded: string;
  runningTime: string;
  longJump: string;
  highJump: string;
  pushups: string;
  hasMedicalIssue: string;
  medicalDetails: string;
  disability: string;
  currentMedication: string;
  course: string;
  preferredBatch: string;
  preferredJoiningDate: string;
  targetRecruitment: string;
  targetYear: string;
  currentFitnessLevel: string;
  needHostel: string;
  hostelType: string;
  foodRequired: string;
  membershipPlan: string;
  joiningPreference: string;
  dailyAvailableTime: string;
  distanceFromAcademy: string;
  referredBy: string;
  hearAboutUs: string;
  paymentStatus: string;
  paymentMode: string;
  transactionId: string;
  aadhaarCard: File | null;
  schoolId: File | null;
  otherIdProof: File | null;
  previousCertificate: File | null;
  emergencyName: string;
  emergencyRelation: string;
  emergencyMobile: string;
  declarePhysicallyFit: boolean;
  declareRulesAgreement: boolean;
  declareNonRefundable: boolean;
  declareAttendance: boolean;
  declareMediaConsent: boolean;
}

const INITIAL_DATA: AdmissionFormData = {
  studentName: "",
  fatherName: "",
  motherName: "",
  gender: "",
  dob: "",
  bloodGroup: "",
  aadhaar: "",
  photo: null,
  mobile: "",
  whatsapp: "",
  altMobile: "",
  email: "",
  village: "",
  postOffice: "",
  policeStation: "",
  district: "",
  state: "Bihar",
  pincode: "",
  qualification: "",
  schoolCollege: "",
  stream: "",
  passingYear: "",
  height: "",
  weight: "",
  chestNormal: "",
  chestExpanded: "",
  runningTime: "",
  longJump: "",
  highJump: "",
  pushups: "",
  hasMedicalIssue: "No",
  medicalDetails: "",
  disability: "",
  currentMedication: "",
  course: "",
  preferredBatch: "",
  preferredJoiningDate: "",
  targetRecruitment: "",
  targetYear: "",
  currentFitnessLevel: "",
  needHostel: "No",
  hostelType: "",
  foodRequired: "No",
  membershipPlan: "",
  joiningPreference: "",
  dailyAvailableTime: "",
  distanceFromAcademy: "",
  referredBy: "",
  hearAboutUs: "",
  paymentStatus: "Unpaid",
  paymentMode: "",
  transactionId: "",
  aadhaarCard: null,
  schoolId: null,
  otherIdProof: null,
  previousCertificate: null,
  emergencyName: "",
  emergencyRelation: "",
  emergencyMobile: "",
  declarePhysicallyFit: false,
  declareRulesAgreement: false,
  declareNonRefundable: false,
  declareAttendance: false,
  declareMediaConsent: false,
};

/* =========================================================
   Small styled form primitives
   ========================================================= */
function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <label className="font-body mb-1.5 block text-[13px] font-medium text-text">
      {label} {required && <span className="text-signal-strong">*</span>}
    </label>
  );
}

const inputClasses =
  "font-body w-full rounded-lg border border-line bg-bg px-4 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal-strong placeholder:text-text-faint";

function TextInput({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={inputClasses}
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={3}
        className={`${inputClasses} resize-none`}
      />
    </div>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={inputClasses}
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function RadioGroup({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`font-body rounded-lg border px-4 py-2 text-[13px] font-medium transition-colors ${
              value === o
                ? "border-signal-strong bg-signal text-on-signal"
                : "border-line bg-bg text-text-muted hover:border-line-strong"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function FileInput({
  label,
  file,
  onChange,
  required,
}: {
  label: string;
  file: File | null;
  onChange: (f: File | null) => void;
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <label className="font-body flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-line bg-bg px-4 py-3 text-[13px] text-text-muted transition-colors hover:border-signal-strong">
        <UploadCloud size={16} className="shrink-0 text-signal-strong" />
        <span className="truncate">
          {file ? file.name : "Click to upload a file"}
        </span>
        <input
          type="file"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
    </div>
  );
}

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="card-flat flex w-full items-start gap-3 px-4 py-3 text-left"
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
          checked
            ? "border-signal-strong bg-signal text-on-signal"
            : "border-line-strong bg-bg"
        }`}
      >
        {checked && <Check size={13} />}
      </span>
      <span className="font-body text-[13px] text-text">{label}</span>
    </button>
  );
}

/* =========================================================
   Step definitions
   ========================================================= */
const STEPS = [
  { title: "Personal Details", icon: User },
  { title: "Contact Details", icon: Contact },
  { title: "Address Details", icon: MapPin },
  { title: "Educational Details", icon: GraduationCap },
  { title: "Physical Details", icon: Activity },
  { title: "Medical Information", icon: Stethoscope },
  { title: "Course Selection", icon: ClipboardList },
  { title: "Goal Details", icon: Target },
  { title: "Hostel Requirement", icon: Building2 },
  { title: "Membership Plan", icon: Wallet },
  { title: "Availability", icon: CalendarClock },
  { title: "Referral & Marketing", icon: Megaphone },
  { title: "Payment", icon: CreditCard },
  { title: "Document Upload", icon: UploadCloud },
  { title: "Emergency Contact", icon: Phone },
  { title: "Declaration", icon: ShieldCheck },
] as const;

const COURSES = [
  "Army Preparation",
  "Bihar Police Constable",
  "Bihar Daroga (SI)",
  "SSC GD",
  "CISF",
  "CRPF",
  "BSF",
  "General Physical Fitness",
];

/* =========================================================
   Hero
   ========================================================= */
function AdmissionHero() {
  return (
    <section className="relative overflow-hidden pb-12 pt-14 sm:pb-16 sm:pt-20">
      <SectionGlow variant={1} />
      <Container>
        <FadeInUp className="max-w-[62ch]">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
            Admission 2026
          </p>
          <h1 className="font-display mt-5 max-w-[20ch] text-[32px] font-bold leading-[1.14] sm:text-[42px] lg:text-[48px]">
            Online{" "}
            <span className="text-gradient-brand">Admission</span> Form
          </h1>
          <p className="font-body mt-5 max-w-[54ch] text-[15px] leading-relaxed text-text-muted">
            Fill in your details across the sections below. Our admission
            team will review your application and reach out on WhatsApp and
            email with your Admission ID and next steps.
          </p>
          <div className="mt-6">
            <Button href={whatsappHref()} variant="ghost" icon={MessageCircle}>
              Need help? Message us on WhatsApp
            </Button>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

/* =========================================================
   Step progress bar
   ========================================================= */
function StepProgress({ current }: { current: number }) {
  const pct = ((current + 1) / STEPS.length) * 100;
  return (
    <div>
      <div className="font-body flex items-center justify-between text-[12px] text-text-muted">
        <span>
          Step {current + 1} of {STEPS.length}
        </span>
        <span className="font-mono uppercase tracking-[0.1em] text-text-faint">
          {STEPS[current].title}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-bg-raised-2">
        <motion.div
          className="h-full rounded-full bg-signal"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   Success screen
   ========================================================= */
function SuccessScreen({
  admissionId,
  name,
  course,
  batch,
}: {
  admissionId: string;
  name: string;
  course: string;
  batch: string;
}) {
  return (
    <FadeInUp className="card-flat mx-auto max-w-[60ch] px-6 py-14 text-center sm:px-14">
      <PartyPopper size={28} className="mx-auto text-signal-strong" />
      <h2 className="font-display mt-4 text-[26px] font-bold sm:text-[32px]">
        Congratulations!
      </h2>
      <p className="font-body mt-3 text-[15px] leading-relaxed text-text-muted">
        Your admission request has been submitted successfully. Our
        admission team will review your application and contact you shortly.
        Please complete the admission fee after approval to confirm your
        seat.
      </p>

      <div className="font-body mt-8 space-y-2 rounded-xl border border-line bg-bg p-5 text-left text-[13px] text-text-muted">
        <p>
          <span className="font-medium text-text">Admission ID:</span>{" "}
          {admissionId}
        </p>
        <p>
          <span className="font-medium text-text">Student Name:</span>{" "}
          {name || "—"}
        </p>
        <p>
          <span className="font-medium text-text">Selected Course:</span>{" "}
          {course || "—"}
        </p>
        <p>
          <span className="font-medium text-text">Batch:</span>{" "}
          {batch || "—"}
        </p>
        <p>
          <span className="font-medium text-text">Admission Status:</span>{" "}
          Pending Verification
        </p>
      </div>

      <p className="font-body mt-6 text-[13px] text-text-muted">
        A confirmation has been sent to your WhatsApp and email with these
        details. Our team will contact you soon.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href={whatsappHref()} variant="whatsapp" icon={MessageCircle}>
          Chat with Admission Team
        </Button>
        <Button href="#top" variant="ghost" icon={ChevronLeft}>
          Back to Top
        </Button>
      </div>
    </FadeInUp>
  );
}

/* =========================================================
   Main form
   ========================================================= */
export default function AdmissionForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AdmissionFormData>(INITIAL_DATA);
  const [submitted, setSubmitted] = useState<{
    admissionId: string;
  } | null>(null);

  const update = <K extends keyof AdmissionFormData>(
    key: K,
    value: AdmissionFormData[K]
  ) => setData((prev) => ({ ...prev, [key]: value }));

  const isLastStep = step === STEPS.length - 1;

  const declarationsComplete =
    data.declarePhysicallyFit &&
    data.declareRulesAgreement &&
    data.declareNonRefundable &&
    data.declareAttendance &&
    data.declareMediaConsent;

  const admissionId = useMemo(
    () => `LPA-2026-${String(Math.floor(1000 + Math.random() * 9000))}`,
    []
  );

  function handleNext() {
    if (isLastStep) {
      if (!declarationsComplete) return;
      setSubmitted({ admissionId });
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <section className="relative overflow-hidden py-16 sm:py-24">
        <SectionGlow variant={3} />
        <Container>
          <SuccessScreen
            admissionId={submitted.admissionId}
            name={data.studentName}
            course={data.course}
            batch={data.preferredBatch}
          />
        </Container>
      </section>
    );
  }

  const StepIcon = STEPS[step].icon;

  return (
    <>
      <AdmissionHero />

      <section id="admission" className="relative overflow-hidden py-12 sm:py-16">
        <SectionGlow variant={2} />
        <Container>
          <div className="card-flat mx-auto max-w-[760px] p-6 sm:p-9">
            <StepProgress current={step} />

            <div className="mt-8 flex items-center gap-3 border-b border-line pb-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-bg-raised-2">
                <StepIcon size={17} className="text-signal-strong" />
              </span>
              <h2 className="font-display text-[20px] font-semibold text-text">
                {STEPS[step].title}
              </h2>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2"
              >
                {step === 0 && (
                  <>
                    <TextInput label="Student Full Name" required value={data.studentName} onChange={(v) => update("studentName", v)} />
                    <TextInput label="Father's Name" required value={data.fatherName} onChange={(v) => update("fatherName", v)} />
                    <TextInput label="Mother's Name" value={data.motherName} onChange={(v) => update("motherName", v)} />
                    <RadioGroup label="Gender" required value={data.gender} onChange={(v) => update("gender", v)} options={["Male", "Female", "Other"]} />
                    <TextInput label="Date of Birth" required type="date" value={data.dob} onChange={(v) => update("dob", v)} />
                    <SelectInput label="Blood Group" value={data.bloodGroup} onChange={(v) => update("bloodGroup", v)} options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} />
                    <TextInput label="Aadhaar Number" value={data.aadhaar} onChange={(v) => update("aadhaar", v)} placeholder="Optional" />
                    <FileInput label="Student Photo" required file={data.photo} onChange={(f) => update("photo", f)} />
                  </>
                )}

                {step === 1 && (
                  <>
                    <TextInput label="Mobile Number" required type="tel" value={data.mobile} onChange={(v) => update("mobile", v)} />
                    <TextInput label="WhatsApp Number" required type="tel" value={data.whatsapp} onChange={(v) => update("whatsapp", v)} />
                    <TextInput label="Alternate Mobile Number" type="tel" value={data.altMobile} onChange={(v) => update("altMobile", v)} />
                    <TextInput label="Email Address" type="email" value={data.email} onChange={(v) => update("email", v)} placeholder="Optional" />
                  </>
                )}

                {step === 2 && (
                  <>
                    <TextInput label="Village / City" required value={data.village} onChange={(v) => update("village", v)} />
                    <TextInput label="Post Office" value={data.postOffice} onChange={(v) => update("postOffice", v)} />
                    <TextInput label="Police Station" value={data.policeStation} onChange={(v) => update("policeStation", v)} />
                    <TextInput label="District" required value={data.district} onChange={(v) => update("district", v)} />
                    <TextInput label="State" required value={data.state} onChange={(v) => update("state", v)} />
                    <TextInput label="PIN Code" required value={data.pincode} onChange={(v) => update("pincode", v)} />
                  </>
                )}

                {step === 3 && (
                  <>
                    <SelectInput label="Qualification" required value={data.qualification} onChange={(v) => update("qualification", v)} options={["Below 10th", "10th Pass", "12th Pass", "Graduate", "Post Graduate"]} />
                    <TextInput label="School / College Name" value={data.schoolCollege} onChange={(v) => update("schoolCollege", v)} />
                    <TextInput label="Stream" value={data.stream} onChange={(v) => update("stream", v)} placeholder="Science / Arts / Commerce" />
                    <TextInput label="Passing Year" type="number" value={data.passingYear} onChange={(v) => update("passingYear", v)} />
                  </>
                )}

                {step === 4 && (
                  <>
                    <TextInput label="Height (cm)" required type="number" value={data.height} onChange={(v) => update("height", v)} />
                    <TextInput label="Weight (kg)" required type="number" value={data.weight} onChange={(v) => update("weight", v)} />
                    <TextInput label="Chest (Normal, cm)" type="number" value={data.chestNormal} onChange={(v) => update("chestNormal", v)} />
                    <TextInput label="Chest (Expanded, cm)" type="number" value={data.chestExpanded} onChange={(v) => update("chestExpanded", v)} />
                    <TextInput label="1600m Running Time" value={data.runningTime} onChange={(v) => update("runningTime", v)} placeholder="mm:ss" />
                    <TextInput label="Long Jump Distance" value={data.longJump} onChange={(v) => update("longJump", v)} placeholder="Optional" />
                    <TextInput label="High Jump Height" value={data.highJump} onChange={(v) => update("highJump", v)} placeholder="Optional" />
                    <TextInput label="Push-ups Count" type="number" value={data.pushups} onChange={(v) => update("pushups", v)} placeholder="Optional" />
                  </>
                )}

                {step === 5 && (
                  <>
                    <RadioGroup label="Any Medical Issue?" required value={data.hasMedicalIssue} onChange={(v) => update("hasMedicalIssue", v)} options={["Yes", "No"]} />
                    <TextInput label="Disability (If Any)" value={data.disability} onChange={(v) => update("disability", v)} />
                    <div className="sm:col-span-2">
                      <TextArea label="Medical Details" value={data.medicalDetails} onChange={(v) => update("medicalDetails", v)} placeholder="Describe any medical condition, if applicable" />
                    </div>
                    <div className="sm:col-span-2">
                      <TextInput label="Current Medication" value={data.currentMedication} onChange={(v) => update("currentMedication", v)} placeholder="Optional" />
                    </div>
                  </>
                )}

                {step === 6 && (
                  <>
                    <SelectInput label="Course" required value={data.course} onChange={(v) => update("course", v)} options={COURSES} />
                    <SelectInput label="Preferred Batch" required value={data.preferredBatch} onChange={(v) => update("preferredBatch", v)} options={["Morning Batch", "Afternoon Batch", "Evening Batch"]} />
                    <TextInput label="Preferred Joining Date" type="date" value={data.preferredJoiningDate} onChange={(v) => update("preferredJoiningDate", v)} />
                  </>
                )}

                {step === 7 && (
                  <>
                    <SelectInput label="Target Recruitment" required value={data.targetRecruitment} onChange={(v) => update("targetRecruitment", v)} options={["Army", "Bihar Police", "Daroga (SI)", "SSC GD", "CISF", "CRPF", "BSF"]} />
                    <TextInput label="Target Year" required type="number" value={data.targetYear} onChange={(v) => update("targetYear", v)} placeholder="2026" />
                    <SelectInput label="Current Fitness Level" required value={data.currentFitnessLevel} onChange={(v) => update("currentFitnessLevel", v)} options={["Beginner", "Intermediate", "Advanced"]} />
                  </>
                )}

                {step === 8 && (
                  <>
                    <RadioGroup label="Need Hostel?" required value={data.needHostel} onChange={(v) => update("needHostel", v)} options={["Yes", "No"]} />
                    <SelectInput label="Hostel Type" value={data.hostelType} onChange={(v) => update("hostelType", v)} options={["Shared Room", "Single Room", "Dormitory"]} />
                    <RadioGroup label="Food Required?" value={data.foodRequired} onChange={(v) => update("foodRequired", v)} options={["Yes", "No"]} />
                  </>
                )}

                {step === 9 && (
                  <div className="sm:col-span-2">
                    <RadioGroup label="Membership Plan" required value={data.membershipPlan} onChange={(v) => update("membershipPlan", v)} options={["1 Month", "3 Months", "6 Months", "12 Months"]} />
                  </div>
                )}

                {step === 10 && (
                  <>
                    <SelectInput label="Joining Preference" value={data.joiningPreference} onChange={(v) => update("joiningPreference", v)} options={["Immediate", "Within a Week", "Within a Month"]} />
                    <TextInput label="Daily Available Time" value={data.dailyAvailableTime} onChange={(v) => update("dailyAvailableTime", v)} placeholder="e.g. 5:00 AM - 7:00 AM" />
                    <TextInput label="Distance from Academy" value={data.distanceFromAcademy} onChange={(v) => update("distanceFromAcademy", v)} placeholder="e.g. 3 km" />
                  </>
                )}

                {step === 11 && (
                  <>
                    <TextInput label="Referred By" value={data.referredBy} onChange={(v) => update("referredBy", v)} placeholder="Optional" />
                    <SelectInput label="How did you hear about us?" value={data.hearAboutUs} onChange={(v) => update("hearAboutUs", v)} options={["WhatsApp", "YouTube", "Instagram", "Facebook", "Friend / Referral", "Walk-in", "Other"]} />
                  </>
                )}

                {step === 12 && (
                  <>
                    <SelectInput label="Payment Status" required value={data.paymentStatus} onChange={(v) => update("paymentStatus", v)} options={["Unpaid", "Paid", "Partially Paid"]} />
                    <SelectInput label="Payment Mode" value={data.paymentMode} onChange={(v) => update("paymentMode", v)} options={["Cash", "UPI", "Bank Transfer"]} />
                    <TextInput label="Transaction ID" value={data.transactionId} onChange={(v) => update("transactionId", v)} placeholder="Optional" />
                  </>
                )}

                {step === 13 && (
                  <>
                    <FileInput label="Aadhaar Card" file={data.aadhaarCard} onChange={(f) => update("aadhaarCard", f)} />
                    <FileInput label="School ID" file={data.schoolId} onChange={(f) => update("schoolId", f)} />
                    <FileInput label="Other ID Proof" file={data.otherIdProof} onChange={(f) => update("otherIdProof", f)} />
                    <FileInput label="Previous Certificate" file={data.previousCertificate} onChange={(f) => update("previousCertificate", f)} />
                  </>
                )}

                {step === 14 && (
                  <>
                    <TextInput label="Contact Person Name" required value={data.emergencyName} onChange={(v) => update("emergencyName", v)} />
                    <TextInput label="Relation" required value={data.emergencyRelation} onChange={(v) => update("emergencyRelation", v)} />
                    <TextInput label="Mobile Number" required type="tel" value={data.emergencyMobile} onChange={(v) => update("emergencyMobile", v)} />
                  </>
                )}

                {step === 15 && (
                  <div className="flex flex-col gap-3 sm:col-span-2">
                    <CheckboxRow label="I confirm that I am physically fit to undergo training at the academy." checked={data.declarePhysicallyFit} onChange={(v) => update("declarePhysicallyFit", v)} />
                    <CheckboxRow label="I agree to follow all academy rules and code of conduct." checked={data.declareRulesAgreement} onChange={(v) => update("declareRulesAgreement", v)} />
                    <CheckboxRow label="I understand that fees paid are non-refundable." checked={data.declareNonRefundable} onChange={(v) => update("declareNonRefundable", v)} />
                    <CheckboxRow label="I agree to maintain regular attendance as per the academy schedule." checked={data.declareAttendance} onChange={(v) => update("declareAttendance", v)} />
                    <CheckboxRow label="I consent to the academy using my photos/videos for promotional purposes." checked={data.declareMediaConsent} onChange={(v) => update("declareMediaConsent", v)} />
                    {!declarationsComplete && (
                      <p className="font-body text-[12px] text-signal-strong">
                        Please accept all declarations to submit your application.
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between gap-3 border-t border-line pt-6">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="font-body flex items-center gap-1.5 text-[14px] font-medium text-text-muted transition-colors hover:text-text disabled:opacity-0"
              >
                <ChevronLeft size={16} />
                Back
              </button>

              {isLastStep ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!declarationsComplete}
                  className="font-body flex items-center gap-2 rounded-lg bg-signal px-5 py-2.5 text-[14px] font-medium text-on-signal transition-opacity disabled:opacity-40"
                >
                  <ClipboardList size={16} />
                  Submit Admission Request
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="font-body flex items-center gap-2 rounded-lg bg-signal px-5 py-2.5 text-[14px] font-medium text-on-signal"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}