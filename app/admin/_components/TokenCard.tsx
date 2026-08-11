export type TokenCardData = {
  tokenNo: string | number
  serial: string
  issueDate: string
  expiryDate: string
  studentName: string
  hostelName: string
  roomNumber: string
  bedNumber?: string | null
  slots: string[]
}

function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Logo"
      width={56}
      height={56}
      style={{ objectFit: 'contain', flexShrink: 0, borderRadius: '50%', maxWidth: '15%', height: 'auto' }}
      onError={(e) => {
        ;(e.target as HTMLImageElement).style.visibility = 'hidden'
      }}
    />
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
              fontSize: 'clamp(18px, 5vw, 24px)',
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
          fontSize: 'clamp(13px, 3.5vw, 16px)',
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
            width: 'clamp(80px, 25%, 120px)',
            flexShrink: 0,
            background: '#f8fafc',
            borderRight: '1px solid #e2e8f0',
            textAlign: 'center',
            padding: '16px 8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: '#475569', letterSpacing: 0.5 }}>
            TOKEN NO.
          </div>
          <div
            style={{
              fontSize: 'clamp(28px, 8vw, 42px)',
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
          <Row label="Hostel:">{data.hostelName}</Row>
          <Row label="Room & Bed:">
            Room {data.roomNumber}
            {data.bedNumber ? ` (Bed ${data.bedNumber})` : ''}
          </Row>
          <Row label="Meal Plan:" small>
            <span
              style={{
                background: '#fef3c7',
                color: '#92400e',
                padding: '2px 6px',
                borderRadius: 4,
                fontWeight: 700,
              }}
            >
              {data.slots.join(' • ')}
            </span>
          </Row>
          <Row label="Date of Issue:">{data.issueDate}</Row>
          <Row label="Valid Till:" noBorder>
            <span style={{ color: '#b91c1c', fontWeight: 800 }}>{data.expiryDate}</span>
          </Row>
        </div>
      </div>

      {/* Hindi Notice Box */}
      <div
        style={{
          borderTop: '1px dashed #cbd5e1',
          background: '#fafafa',
          padding: '10px 16px',
          fontSize: 'clamp(10px, 2.7vw, 11px)',
          color: '#334155',
          lineHeight: 1.5,
        }}
      >
        <div style={{ fontWeight: 800, color: '#b91c1c', marginBottom: 2 }}>नोटः</div>
        <div>• प्रत्येक टोकन केवल एक बार मान्य होगा।</div>
        <div>• भोजन प्राप्त करने के लिए टोकन जमा करना अनिवार्य है।</div>
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
          padding: '8px 16px',
          background: '#0f172a',
          color: '#f8fafc',
          fontSize: 'clamp(10px, 2.7vw, 11.5px)',
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

/** Compact A4 Print Token Card — Exactly 12 cards fit on 1 A4 page (3 cols x 4 rows) */
export function CompactTokenCard({ data }: { data: TokenCardData }) {
  return (
    <div
      style={{
        width: 178,
        height: 194,
        boxSizing: 'border-box',
        border: '1.5px solid #1e293b',
        borderRadius: 6,
        background: '#ffffff',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
          color: '#ffffff',
          padding: '3px 4px',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Logo />
        <div style={{ flex: 1, minWidth: 0, lineHeight: 1.1 }}>
          <div style={{ fontSize: 7.5, fontWeight: 900, color: '#fef08a', letterSpacing: 0.2 }}>
            LAKHISARAI PHYSICAL ACADEMY
          </div>
          <div style={{ fontSize: 5.8, color: '#cbd5e1', marginTop: 1 }}>
            ★ BHOJAN TOKEN ★ • 7739776471
          </div>
        </div>
      </div>

      {/* Token Number Banner */}
      <div
        style={{
          background: 'linear-gradient(90deg, #047857 0%, #059669 100%)',
          color: '#ffffff',
          padding: '2px 5px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ fontSize: 6.5, fontWeight: 800, color: '#e2e8f0' }}>TOKEN:</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: '#fef08a', lineHeight: 1 }}>
            {data.tokenNo}
          </span>
        </div>
        <span
          style={{
            fontSize: 6,
            fontWeight: 700,
            background: 'rgba(255,255,255,0.2)',
            padding: '1px 3px',
            borderRadius: 3,
          }}
        >
          S/N: {data.serial}
        </span>
      </div>

      {/* Details Box */}
      <div style={{ padding: '3px 5px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div
            style={{
              fontWeight: 800,
              fontSize: 8.5,
              color: '#0f172a',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {data.studentName}
          </div>
          <div style={{ fontSize: 6.8, color: '#475569', marginTop: 1 }}>
            <b>Hostel:</b> {data.hostelName} | <b>Room:</b> {data.roomNumber}
            {data.bedNumber ? `-${data.bedNumber}` : ''}
          </div>
          <div style={{ marginTop: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <span
              style={{
                background: '#fef3c7',
                color: '#92400e',
                border: '0.5px solid #fcd34d',
                padding: '0.5px 3px',
                borderRadius: 3,
                fontSize: 5.8,
                fontWeight: 800,
              }}
            >
              {data.slots.join(' • ')}
            </span>
          </div>
          <div style={{ fontSize: 6.8, color: '#334155', marginTop: 2 }}>
            <b>Valid:</b> {data.issueDate} →{' '}
            <span style={{ color: '#b91c1c', fontWeight: 800 }}>{data.expiryDate}</span>
          </div>
        </div>

        {/* Hindi Rules Notice */}
        <div
          style={{
            background: '#f8fafc',
            borderTop: '1px dashed #cbd5e1',
            borderBottom: '1px dashed #cbd5e1',
            padding: '2px 4px',
            fontSize: 5.8,
            lineHeight: 1.15,
            color: '#334155',
            marginTop: 2,
          }}
        >
          <span style={{ fontWeight: 800, color: '#b91c1c' }}>नोट: </span>
          <span>1 टोकन 1 बार मान्य • भोजन हेतु जमा अनिवार्य • बिना टोकन भोजन नहीं • खोने पर नया नहीं</span>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          background: '#0f172a',
          color: '#f8fafc',
          padding: '2px 4px',
          fontSize: 6,
          fontWeight: 700,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>Dir: Vikesh Kumar</span>
        <span>Mob: 9370427046</span>
      </div>
    </div>
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