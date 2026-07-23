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
        maxWidth: 600,
        minWidth: 280,
        margin: '0 auto',
        boxSizing: 'border-box',
        border: '2px solid #222',
        borderRadius: 10,
        background: '#fdf6ee',
        fontFamily: "'Trebuchet MS', Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: 'clamp(10px,3vw,16px) clamp(12px,4vw,18px) clamp(6px,2vw,10px)',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(8px,3vw,14px)',
        }}
      >
        <Logo />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: '#1a1a5e',
              fontWeight: 900,
              fontSize: 'clamp(18px,5.5vw,28px)',
              letterSpacing: 1,
              lineHeight: 1.15,
            }}
          >
            {academyName}
          </div>
          <div
            style={{
              color: '#0b5d2e',
              fontWeight: 800,
              fontSize: 'clamp(11px,3vw,14px)',
              marginTop: 4,
              letterSpacing: 0.5,
            }}
          >
            <span style={{ color: '#7a1f1f' }}>★</span> {academySub} <span style={{ color: '#7a1f1f' }}>★</span>
          </div>
          <div style={{ fontSize: 'clamp(9px,2.4vw,11px)', color: '#444', marginTop: 3 }}>
            Contact: 8863081082, 7739776471
          </div>
        </div>
      </div>

      {/* Banner */}
      <div
        style={{
          background: '#0b5d2e',
          color: '#f5d800',
          textAlign: 'center',
          fontWeight: 800,
          fontSize: 'clamp(13px,3.6vw,18px)',
          padding: 'clamp(6px,2vw,8px) 0',
          letterSpacing: 1,
        }}
      >
        ★ HOSTEL BHOJAN TOKEN ★
      </div>

      {/* Body */}
      <div style={{ display: 'flex', borderTop: '1px solid #222' }}>
        <div
          style={{
            width: 'clamp(70px,20%,120px)',
            flexShrink: 0,
            borderRight: '1px solid #222',
            textAlign: 'center',
            padding: 'clamp(8px,3vw,12px) 4px',
          }}
        >
          <div style={{ fontSize: 'clamp(9px,2.4vw,11px)', fontWeight: 700, color: '#1a1a5e' }}>TOKEN NO.</div>
          <div style={{ fontSize: 'clamp(24px,7vw,40px)', fontWeight: 900, color: '#7a1f1f', lineHeight: 1.2 }}>
            {data.tokenNo}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0, padding: 'clamp(6px,2.5vw,10px) clamp(8px,3.5vw,16px)', fontSize: 'clamp(11px,3vw,13.5px)' }}>
          <Row label="S/N.">{data.serial}</Row>
          <Row label="Student:">{data.studentName}</Row>
          <Row label="Hostel:">{data.hostelName}</Row>
          <Row label="Room:">
            {data.roomNumber}
            {data.bedNumber ? `-${data.bedNumber}` : ''}
          </Row>
          <Row label="Meal Plan:" small>
            {data.slots.join(' • ')}
          </Row>
          <Row label="Date of Issue:">{data.issueDate}</Row>
          <Row label="Valid Till:" noBorder>
            <span style={{ color: '#7a1f1f', fontWeight: 800 }}>{data.expiryDate}</span>
          </Row>
        </div>
      </div>

      {/* Hindi notice */}
      <div
        style={{
          borderTop: '1px solid #222',
          padding: 'clamp(8px,3vw,10px) clamp(10px,3.5vw,16px)',
          fontSize: 'clamp(9.5px,2.6vw,11px)',
          color: '#333',
          lineHeight: 1.6,
        }}
      >
        <div style={{ fontWeight: 800, color: '#7a1f1f', marginBottom: 2 }}>नोटः</div>
        <div>• प्रत्येक टोकन केवल एक बार मान्य होगा।</div>
        <div>• भोजन प्राप्त करने के लिए टोकन जमा करना अनिवार्य है।</div>
        <div>• बिना टोकन के भोजन नहीं दिया जाएगा।</div>
        <div>• टोकन खो जाने पर नया टोकन जारी नहीं किया जाएगा।</div>
      </div>

      {/* Footer — director */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 8,
          padding: 'clamp(8px,3vw,10px) clamp(10px,3.5vw,16px)',
          borderTop: '1px solid #222',
          fontSize: 'clamp(10px,2.8vw,12px)',
          background: '#f3ead9',
          borderRadius: '0 0 8px 8px',
        }}
      >
        <span>
          <b style={{ color: '#1a1a5e' }}>Hostel Director:</b> Vikesh Kumar
        </span>
        <span>
          <b style={{ color: '#1a1a5e' }}>Mobile:</b> 9370427046
        </span>
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
        padding: '5px 0',
        borderBottom: noBorder ? 'none' : '1px solid #ddd',
      }}
    >
      <span style={{ flexShrink: 0 }}>
        <b style={{ color: '#1a1a5e' }}>{label}</b>
      </span>
      <span
        style={{
          fontWeight: 700,
          textAlign: 'right',
          wordBreak: 'break-word',
          fontSize: small ? '0.9em' : undefined,
          color: small ? '#333' : undefined,
        }}
      >
        {children}
      </span>
    </div>
  )
}