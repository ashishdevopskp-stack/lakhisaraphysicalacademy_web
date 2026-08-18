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
          background: '#fffbeb',
          padding: '8px 16px',
          fontSize: 'clamp(10px, 2.5vw, 11px)',
          color: '#1e293b',
          lineHeight: 1.4,
        }}
      >
        <div style={{ fontWeight: 800, color: '#b91c1c', marginBottom: 2 }}>नोटः</div>
        <div>• यह टोकन केवल निर्दिष्ट तारीख ({displayDate}) के लिए मान्य है।</div>
        <div>• बिना टोकन के भोजन नहीं दिया जाएगा।</div>
        <div>• टोकन खो जाने पर नया टोकन जारी नहीं किया जाएगा।</div>
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
        border: '1.5px dashed #475569',
        borderRadius: 8,
        background: '#ffffff',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          borderBottom: '2px solid #ea580c',
          flexShrink: 0,
        }}
      >
        <img
          src="/logo.png"
          alt="LPA Logo"
          width={22}
          height={22}
          style={{ objectFit: 'contain', borderRadius: '50%', flexShrink: 0 }}
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: '#fde047',
              fontWeight: 900,
              fontSize: 9.5,
              lineHeight: '11px',
              letterSpacing: '0.3px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            LAKHISARAI PHYSICAL ACADEMY
          </div>
          <div style={{ color: '#34d399', fontWeight: 900, fontSize: 8, lineHeight: '10px', marginTop: 1 }}>
            ★ HOSTEL BHOJAN TOKEN ★
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          padding: '6px 8px',
          gap: 8,
          alignItems: 'stretch',
          background: '#ffffff',
        }}
      >
        {/* Token # Box */}
        <div
          style={{
            width: 62,
            background: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderLeft: '3px solid #dc2626',
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            padding: '4px 2px',
            boxSizing: 'border-box',
          }}
        >
          <span style={{ fontSize: 7.5, fontWeight: 800, color: '#475569', letterSpacing: '0.3px', lineHeight: '9px' }}>
            TOKEN NO.
          </span>
          <span style={{ fontSize: 24, fontWeight: 900, color: '#dc2626', lineHeight: '24px', margin: '2px 0' }}>
            {data.tokenNo}
          </span>
          <span style={{ fontSize: 7, color: '#64748b', fontWeight: 700, lineHeight: '8px' }}>
            S/N: {data.serial}
          </span>
        </div>

        {/* Student Meta Details */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 3,
            fontSize: 9,
            color: '#1e293b',
          }}
        >
          {/* Name Row */}
          <div style={{ display: 'flex', alignItems: 'center', minHeight: 15, lineHeight: '13px' }}>
            <span style={{ fontWeight: 800, color: '#0f172a', flexShrink: 0, marginRight: 4 }}>Name:</span>
            <span
              style={{
                fontWeight: 800,
                color: '#1e1b4b',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data.studentName}
            </span>
          </div>

          {/* Meal Date Row */}
          <div style={{ display: 'flex', alignItems: 'center', minHeight: 17, lineHeight: '13px' }}>
            <span style={{ fontWeight: 800, color: '#0f172a', flexShrink: 0, marginRight: 4 }}>Meal Date:</span>
            <span
              style={{
                display: 'inline-block',
                background: '#dcfce7',
                color: '#15803d',
                padding: '1px 5px',
                borderRadius: 4,
                fontWeight: 900,
                fontSize: 8.5,
                lineHeight: '11px',
                border: '1px solid #86efac',
              }}
            >
              {displayDate}
            </span>
          </div>

          {/* Hostel Row */}
          <div style={{ display: 'flex', alignItems: 'center', minHeight: 15, lineHeight: '13px' }}>
            <span style={{ fontWeight: 800, color: '#0f172a', flexShrink: 0, marginRight: 4 }}>Hostel:</span>
            <span
              style={{
                fontWeight: 700,
                color: '#334155',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data.hostelName}
            </span>
          </div>

          {/* Room/Bed Row */}
          <div style={{ display: 'flex', alignItems: 'center', minHeight: 15, lineHeight: '13px' }}>
            <span style={{ fontWeight: 800, color: '#0f172a', flexShrink: 0, marginRight: 4 }}>Room/Bed:</span>
            <span
              style={{
                fontWeight: 700,
                color: '#334155',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data.roomNumber} {data.bedNumber ? `(Bed ${data.bedNumber})` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Hindi Notice Box */}
      <div
        style={{
          background: '#fffbeb',
          borderTop: '1px dashed #fcd34d',
          borderBottom: '1px dashed #fcd34d',
          padding: '3px 8px',
          fontSize: 7.5,
          color: '#1e293b',
          flexShrink: 0,
        }}
      >
        <div style={{ fontWeight: 800, color: '#b91c1c', fontSize: 8, lineHeight: '10px', marginBottom: 1 }}>नोट:</div>
        <div style={{ lineHeight: '10.5px' }}>1. यह टोकन केवल निर्दिष्ट तारीख ({displayDate}) के लिए मान्य है।</div>
        <div style={{ lineHeight: '10.5px' }}>2. बिना टोकन के भोजन नहीं दिया जाएगा।</div>
        <div style={{ lineHeight: '10.5px' }}>3. टोकन खो जाने पर नया टोकन जारी नहीं किया जाएगा।</div>
      </div>

      {/* Footer Cut & Rules Strip */}
      <div
        style={{
          background: '#0f172a',
          color: '#ffffff',
          padding: '3px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 7.5,
          lineHeight: '9.5px',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        <span style={{ color: '#cbd5e1' }}>✂️ Cut along dotted lines</span>
        <span style={{ color: '#fef08a', fontWeight: 800 }}>LPA Hostel</span>
      </div>
    </div>
  )
}

export function CompactTokenCard({ data }: { data: TokenCardData }) {
  return <A4GridTokenCard data={data} />
}