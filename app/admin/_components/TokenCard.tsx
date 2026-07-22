export type TokenCardData = {
  tokenNo: string | number
  serial: string
  date: string
  studentName: string
  hostelName: string
  roomNumber: string
  bedNumber?: string | null
  slots: string[]
  validMonths: number
}

function ShieldMark() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64">
      <path d="M32 2 58 12v18c0 20-13 30-26 32C19 60 6 50 6 30V12Z" fill="none" stroke="#1a1a5e" strokeWidth="3" />
      <circle cx="32" cy="24" r="6" fill="#1a1a5e" />
      <path d="M20 44c4-8 20-8 24 0" stroke="#1a1a5e" strokeWidth="3" fill="none" />
    </svg>
  )
}

export function TokenCard({ data, academyName = 'LAKHISARAI', academySub = 'PHYSICAL ACADEMY' }: {
  data: TokenCardData
  academyName?: string
  academySub?: string
}) {
  return (
    <div
      style={{
        width: 520,
        border: '2px solid #222',
        borderRadius: 6,
        background: '#fdf6ee',
        overflow: 'hidden',
        fontFamily: "'Trebuchet MS', Arial, sans-serif",
      }}
    >
      <div style={{ padding: '14px 16px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <ShieldMark />
        <div style={{ flex: 1 }}>
          <div style={{ color: '#1a1a5e', fontWeight: 900, fontSize: 28, letterSpacing: 1, lineHeight: 1 }}>
            {academyName}
          </div>
          <div style={{ color: '#0b5d2e', fontWeight: 800, fontSize: 15, marginTop: 4, letterSpacing: 0.5 }}>
            <span style={{ color: '#7a1f1f' }}>★</span> {academySub} <span style={{ color: '#7a1f1f' }}>★</span>
          </div>
        </div>
      </div>

      <div style={{ background: '#0b5d2e', color: '#f5d800', textAlign: 'center', fontWeight: 800, fontSize: 17, padding: '7px 0', letterSpacing: 1 }}>
        ★ HOSTEL BHOJAN TOKEN ★
      </div>

      <div style={{ display: 'flex', borderTop: '1px solid #222' }}>
        <div style={{ width: 110, borderRight: '1px solid #222', textAlign: 'center', padding: '10px 4px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#1a1a5e' }}>TOKEN NO.</div>
          <div style={{ fontSize: 38, fontWeight: 900, color: '#7a1f1f', lineHeight: 1 }}>{data.tokenNo}</div>
        </div>
        <div style={{ flex: 1, padding: '8px 12px', fontSize: 13 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #ddd' }}>
            <span><b style={{ color: '#1a1a5e' }}>Date:</b> {data.date}</span>
            <span style={{ fontWeight: 700 }}>S/N. {data.serial}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #ddd' }}>
            <span><b style={{ color: '#1a1a5e' }}>Student:</b></span>
            <span style={{ fontWeight: 700 }}>{data.studentName}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #ddd' }}>
            <span><b style={{ color: '#1a1a5e' }}>{data.hostelName}:</b></span>
            <span style={{ fontWeight: 700 }}>
              Room {data.roomNumber}{data.bedNumber ? `-${data.bedNumber}` : ''}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 11, color: '#333' }}>
            <span><b style={{ color: '#1a1a5e' }}>Meal Plan:</b></span>
            <span style={{ fontWeight: 700 }}>{data.slots.join(' • ')}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0' }}>
        <div
          style={{
            background: 'linear-gradient(180deg,#d4af37,#b8860b)',
            color: '#1a1a1a',
            fontWeight: 900,
            fontSize: 15,
            padding: '8px 30px',
            clipPath: 'polygon(4% 0,96% 0,100% 50%,96% 100%,4% 100%,0 50%)',
          }}
        >
          VALID FOR {data.validMonths} MONTH{data.validMonths > 1 ? 'S' : ''}
        </div>
      </div>
    </div>
  )
}