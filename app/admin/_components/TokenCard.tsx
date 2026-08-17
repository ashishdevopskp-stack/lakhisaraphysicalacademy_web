export type TokenCardData = {
  tokenNo: string | number
  serial: string
  issueDate: string
  expiryDate: string
  mealDate?: string
  studentName: string
  hostelName: string
  roomNumber: string
  bedNumber?: string | null
  slots?: string[]
}

function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Logo"
      width={44}
      height={44}
      style={{ objectFit: 'contain', flexShrink: 0, borderRadius: '50%', maxWidth: '16%', height: 'auto' }}
      onError={(e) => {
        ;(e.target as HTMLImageElement).style.visibility = 'hidden'
      }}
    />
  )
}

function Row({
  label,
  children,
  small,
  noBorder,
}: {
  label: string
  children: React.ReactNode
  small?: boolean
  noBorder?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '2px 10px',
        padding: '4px 0',
        borderBottom: noBorder ? 'none' : '1px solid #f1f5f9',
      }}
    >
      <span style={{ flexShrink: 0 }}>
        <b style={{ color: '#1e293b' }}>{label}</b>
      </span>
      <span
        style={{
          fontWeight: 700,
          textAlign: 'right',
          wordBreak: 'break-word',
          fontSize: small ? '0.9em' : undefined,
          color: small ? '#333' : '#0f172a',
        }}
      >
        {children}
      </span>
    </div>
  )
}

export function TokenCard({
  data,
  academyName = 'LAKHISARAI',
  academySub = 'PHYSICAL ACADEMY',
}: {
  data: TokenCardData
  academyName?: string
  academySub?: string
}) {
  const displayDate = data.mealDate || data.expiryDate || data.issueDate

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 580,
        minWidth: 280,
        margin: '0 auto',
        boxSizing: 'border-box',
        border: '2px solid #1e293b',
        borderRadius: 12,
        background: '#ffffff',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Premium Navy Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
          color: '#ffffff',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <Logo />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: '#fef08a',
              fontWeight: 900,
              fontSize: 'clamp(16px, 4.5vw, 22px)',
              letterSpacing: 1,
              lineHeight: 1.1,
            }}
          >
            {academyName} {academySub}
          </div>
          <div style={{ fontSize: 'clamp(10px, 2.5vw, 12px)', color: '#e2e8f0', marginTop: 4 }}>
            <b>Contact:</b> 7739776471, 7903594008
          </div>
        </div>
      </div>

      {/* Emerald Banner */}
      <div
        style={{
          background: 'linear-gradient(90deg, #047857 0%, #059669 100%)',
          color: '#ffffff',
          textAlign: 'center',
          fontWeight: 800,
          fontSize: 'clamp(12px, 3.2vw, 15px)',
          padding: '6px 0',
          letterSpacing: 1,
        }}
      >
        ★ HOSTEL BHOJAN TOKEN ★
      </div>

      {/* Main Details Body */}
      <div style={{ display: 'flex', borderTop: '1px solid #e2e8f0' }}>
        {/* Token # Badge */}
        <div
          style={{
            width: 'clamp(90px, 28%, 130px)',
            flexShrink: 0,
            background: '#f8fafc',
            borderRight: '1px solid #e2e8f0',
            textAlign: 'center',
            padding: '14px 8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 10.5, fontWeight: 800, color: '#475569', letterSpacing: 0.5 }}>
            TOKEN NO.
          </div>
          <div
            style={{
              fontSize: 'clamp(28px, 8vw, 40px)',
              fontWeight: 900,
              color: '#b91c1c',
              lineHeight: 1.1,
              marginTop: 2,
            }}
          >
            {data.tokenNo}
          </div>
          <div style={{ fontSize: 9.5, color: '#64748b', marginTop: 4, fontWeight: 600 }}>
            S/N: {data.serial}
          </div>
        </div>

        {/* Student Information Rows */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: '12px 16px',
            fontSize: 'clamp(11px, 3vw, 13px)',
            background: '#ffffff',
          }}
        >
          <Row label="Student Name:">{data.studentName}</Row>
          <Row label="Meal Date:">
            <span style={{ color: '#047857', fontWeight: 900 }}>{displayDate}</span>
          </Row>
          <Row label="Hostel:">{data.hostelName}</Row>
          <Row label="Room & Bed:" noBorder>
            Room {data.roomNumber}
            {data.bedNumber ? ` (Bed ${data.bedNumber})` : ''}
          </Row>
        </div>
      </div>

      {/* Hindi Notice Box */}
      <div
        style={{
          borderTop: '1px dashed #cbd5e1',
          background: '#fafafa',
          padding: '8px 16px',
          fontSize: 'clamp(10px, 2.5vw, 11px)',
          color: '#334155',
          lineHeight: 1.4,
        }}
      >
        <div style={{ fontWeight: 800, color: '#b91c1c', marginBottom: 2 }}>नोटः</div>
        <div>• यह टोकन केवल निर्दिष्ट तारीख ({displayDate}) के लिए मान्य है।</div>
        <div>• भोजन प्राप्त करने के लिए टोकन जमा करना अनिवार्य है।</div>
      </div>

      {/* Director Footer */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 8,
          padding: '7px 16px',
          background: '#0f172a',
          color: '#f8fafc',
          fontSize: 'clamp(10px, 2.5vw, 11px)',
        }}
      >
        <span>
          <b>Hostel Director:</b> Vikesh Kumar
        </span>
        <span>
          <b>Mobile:</b> 9370427046
        </span>
      </div>
    </div>
  )
}

/** 12-Per-Page A4 Compact Grid Token Card — Optimized for 3 Columns x 4 Rows A4 Sheet with Cutting Guidelines */
export function A4GridTokenCard({ data }: { data: TokenCardData }) {
  const displayDate = data.mealDate || data.expiryDate || data.issueDate

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        border: '1.5px dashed #64748b',
        borderRadius: 8,
        background: '#ffffff',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          background: '#0f172a',
          color: '#ffffff',
          padding: '6px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          borderBottom: '2px solid #ea580c',
        }}
      >
        <img
          src="/logo.png"
          alt="LPA Logo"
          width={24}
          height={24}
          style={{ objectFit: 'contain', borderRadius: '50%', flexShrink: 0 }}
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <div style={{ flex: 1, minWidth: 0, lineHeight: 1.1 }}>
          <div style={{ color: '#fde047', fontWeight: 900, fontSize: 10, letterSpacing: 0.3 }}>
            LAKHISARAI PHYSICAL ACADEMY
          </div>
          <div style={{ color: '#059669', fontWeight: 900, fontSize: 8.5, marginTop: 1 }}>
            ★ HOSTEL BHOJAN TOKEN ★
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div style={{ flex: 1, display: 'flex', padding: '6px 8px', gap: 6, alignItems: 'center' }}>
        {/* Token # Box */}
        <div
          style={{
            width: 64,
            height: '100%',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            padding: 2,
          }}
        >
          <span style={{ fontSize: 7.5, fontWeight: 800, color: '#475569', letterSpacing: 0.3 }}>
            TOKEN NO.
          </span>
          <span style={{ fontSize: 24, fontWeight: 900, color: '#dc2626', lineHeight: 1 }}>
            {data.tokenNo}
          </span>
          <span style={{ fontSize: 7, color: '#64748b', fontWeight: 700, marginTop: 2 }}>
            S/N: {data.serial}
          </span>
        </div>

        {/* Student Meta Details */}
        <div style={{ flex: 1, minWidth: 0, fontSize: 9.5, lineHeight: 1.3, color: '#1e293b' }}>
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <b style={{ color: '#0f172a' }}>Name: </b>
            <span style={{ fontWeight: 800, color: '#1e1b4b' }}>{data.studentName}</span>
          </div>

          <div style={{ marginTop: 2 }}>
            <b style={{ color: '#0f172a' }}>Meal Date: </b>
            <span
              style={{
                background: '#dcfce7',
                color: '#15803d',
                padding: '1px 4px',
                borderRadius: 4,
                fontWeight: 900,
                fontSize: 9,
                border: '1px solid #86efac',
              }}
            >
              {displayDate}
            </span>
          </div>

          <div style={{ marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <b style={{ color: '#0f172a' }}>Hostel: </b>
            <span style={{ fontWeight: 700 }}>{data.hostelName}</span>
          </div>

          <div style={{ marginTop: 2 }}>
            <b style={{ color: '#0f172a' }}>Room/Bed: </b>
            <span style={{ fontWeight: 700 }}>
              {data.roomNumber} {data.bedNumber ? `(Bed ${data.bedNumber})` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Cut & Rules Strip */}
      <div
        style={{
          background: '#f1f5f9',
          padding: '3px 8px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 7.5,
          color: '#475569',
          fontWeight: 700,
        }}
      >
        <span>✂️ Cut along dotted lines</span>
        <span style={{ color: '#dc2626', fontWeight: 800 }}>बिना टोकन भोजन नहीं</span>
      </div>
    </div>
  )
}

export function CompactTokenCard({ data }: { data: TokenCardData }) {
  return <A4GridTokenCard data={data} />
}