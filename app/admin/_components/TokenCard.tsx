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

function Logo({ size = 44 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Logo"
      width={size}
      height={size}
      style={{ objectFit: 'contain', flexShrink: 0, borderRadius: '50%', width: size, height: size }}
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
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
      }}
    >
      {/* Premium Navy Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
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
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
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
            WebkitPrintColorAdjust: 'exact',
            printColorAdjust: 'exact',
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
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
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
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
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

/** 12-Per-Page A4 Compact Grid Token Card — Optimized for 3×4 A4 Print & PDF export */
export function A4GridTokenCard({
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
        height: '100%',
        boxSizing: 'border-box',
        border: '1.5px solid #1e293b',
        borderRadius: 6,
        background: '#ffffff',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
      }}
    >
      {/* Header — Navy with logo + title + contact */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
          color: '#ffffff',
          padding: '6px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          minHeight: 38,
          boxSizing: 'border-box',
        }}
      >
        <Logo size={24} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            style={{
              color: '#fef08a',
              fontWeight: 900,
              fontSize: 10,
              letterSpacing: '0.3px',
              lineHeight: '13px',
            }}
          >
            {academyName} {academySub}
          </div>
          <div style={{ fontSize: 7.5, color: '#e2e8f0', marginTop: 1, lineHeight: '10px' }}>
            <b>Contact:</b> 7739776471, 7903594008
          </div>
        </div>
      </div>

      {/* Emerald Banner */}
      <div
        style={{
          background: 'linear-gradient(90deg, #047857 0%, #059669 100%)',
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
          color: '#ffffff',
          textAlign: 'center',
          fontWeight: 800,
          fontSize: 8.5,
          padding: '3px 0',
          letterSpacing: '0.5px',
          lineHeight: '12px',
        }}
      >
        ★ HOSTEL BHOJAN TOKEN ★
      </div>

      {/* Main Details Body */}
      <div style={{ display: 'flex', flex: 1, borderTop: '1px solid #e2e8f0', alignItems: 'stretch' }}>
        {/* Token # Badge */}
        <div
          style={{
            width: 65,
            flexShrink: 0,
            background: '#f8fafc',
            WebkitPrintColorAdjust: 'exact',
            printColorAdjust: 'exact',
            borderRight: '1px solid #e2e8f0',
            textAlign: 'center',
            padding: '4px 2px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 7.5, fontWeight: 800, color: '#475569', letterSpacing: '0.3px' }}>
            TOKEN NO.
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: '#b91c1c',
              lineHeight: '24px',
              marginTop: 1,
            }}
          >
            {data.tokenNo}
          </div>
          <div style={{ fontSize: 7, color: '#64748b', marginTop: 1, fontWeight: 600 }}>
            S/N: {data.serial}
          </div>
        </div>

        {/* Student Information Rows */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: '4px 7px',
            fontSize: 8.5,
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 1.5 }}>
            <span style={{ fontWeight: 800, color: '#1e293b', flexShrink: 0, marginRight: 4 }}>Name:</span>
            <span style={{ fontWeight: 800, color: '#0f172a', textAlign: 'right', wordBreak: 'break-word' }}>{data.studentName}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 1.5 }}>
            <span style={{ fontWeight: 800, color: '#1e293b', flexShrink: 0, marginRight: 4 }}>Meal Date:</span>
            <span style={{ color: '#047857', fontWeight: 900, textAlign: 'right' }}>{displayDate}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 1.5 }}>
            <span style={{ fontWeight: 800, color: '#1e293b', flexShrink: 0, marginRight: 4 }}>Hostel:</span>
            <span style={{ fontWeight: 700, color: '#0f172a', textAlign: 'right', wordBreak: 'break-word' }}>{data.hostelName}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, color: '#1e293b', flexShrink: 0, marginRight: 4 }}>Room/Bed:</span>
            <span style={{ fontWeight: 700, color: '#0f172a', textAlign: 'right' }}>
              Room {data.roomNumber}
              {data.bedNumber ? ` (Bed ${data.bedNumber})` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Hindi Notice Box */}
      <div
        style={{
          borderTop: '1px dashed #cbd5e1',
          background: '#fffbeb',
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
          padding: '3px 7px',
          fontSize: 7,
          color: '#1e293b',
          lineHeight: '10.5px',
        }}
      >
        <div style={{ fontWeight: 800, color: '#b91c1c', marginBottom: 1, fontSize: 7.5 }}>नोटः</div>
        <div>• यह टोकन केवल निर्दिष्ट तारीख ({displayDate}) के लिए मान्य है।</div>
        <div>• बिना टोकन के भोजन नहीं दिया जाएगा।</div>
        <div>• टोकन खो जाने पर नया टोकन जारी नहीं किया जाएगा।</div>
      </div>

      {/* Director Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          padding: '3px 7px',
          background: '#0f172a',
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
          color: '#f8fafc',
          fontSize: 7.2,
          lineHeight: '10px',
        }}
      >
        <span>
          <b>Director:</b> Vikesh Kumar
        </span>
        <span>
          <b>Mob:</b> 9370427046
        </span>
      </div>
    </div>
  )
}

export function CompactTokenCard({ data }: { data: TokenCardData }) {
  return <A4GridTokenCard data={data} />
}