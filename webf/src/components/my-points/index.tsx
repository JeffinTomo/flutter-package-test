interface MyPointsProps {
  points: number;
}

export default function MyPoints({ points }: MyPointsProps) {
  return (
    <div
      className="mx-auto mb-4 rounded-lg"
      style={{
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      {/* Title - My WLFI Points */}
      <div
        className="pt-[70px]"
        style={{
          width: '100%',
          height: '20px',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '140%',
          textAlign: 'center',
          color: '#79716B'
        }}
      >
        My WLFI Points
      </div>

      {/* Points display with icon */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0px',
          gap: '8px',
          width: '100%',
          height: '55px'
        }}
      >
        {/* Icon: Badge with hexagon and star */}
        <div style={{ width: '40px', height: '40px', position: 'relative', flexShrink: 0 }}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hexagon base */}
            <path
              d="M20 3.5L33 10.5V26.5L20 33.5L7 26.5V10.5L20 3.5Z"
              fill="#EAAC08"
            />
            {/* Inner gradient hexagon */}
            <path
              d="M20 6L30 12V28L20 34L10 28V12L20 6Z"
              fill="url(#hexGradient)"
            />
            {/* Four-pointed star */}
            <path
              d="M20 14 L21.5 18.5 L26 20 L21.5 21.5 L20 26 L18.5 21.5 L14 20 L18.5 18.5 Z"
              fill="url(#starGradient)"
            />
            <defs>
              <linearGradient id="hexGradient" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse">
                <stop offset="-1.44%" stopColor="#CA8404" />
                <stop offset="101.44%" stopColor="#A15D07" />
              </linearGradient>
              <linearGradient id="starGradient" x1="20" y1="14" x2="20" y2="26" gradientUnits="userSpaceOnUse">
                <stop offset="-5.04%" stopColor="#FEF7C3" />
                <stop offset="105.04%" stopColor="#FDDA47" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Points number */}
        <div
          style={{
            height: '55px',
            fontWeight: 600,
            fontSize: '36px',
            lineHeight: '120%',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: '#FFD83A'
          }}
        >
          {points.toLocaleString()}
        </div>
      </div>
    </div>
  );
}

