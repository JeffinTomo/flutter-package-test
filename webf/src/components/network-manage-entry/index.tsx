import { WebFRouter } from '../../router';

export default function NetworkManageEntry() {
  const handleNavigate = () => {
    WebFRouter.push('/network-manage');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '16px 0',
        gap: '16px',
        width: 'calc(100% - 40px)',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px',
        gap: '6px',
        width: '100%',
        height: '28px'
      }}>
        {/* Left side - Title with Network Icon */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px',
          gap: '6px',
          height: '28px'
        }}>
          {/* Network Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#FAFAF9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M2 17L12 22L22 17" stroke="#FAFAF9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M2 12L12 17L22 12" stroke="#FAFAF9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

          <span style={{
            fontFamily: 'Sora',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '140%',
            color: '#FAFAF9'
          }}>
            Network Manage
          </span>
        </div>

        {/* Right side - Arrow */}
        <div
          onClick={handleNavigate}
          className="cursor-pointer active:opacity-70 transition-opacity"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '0px',
            gap: '4px'
          }}
        >
          <span style={{
            fontFamily: 'Sora',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '140%',
            color: '#838C9C'
          }}>
            Test
          </span>
          {/* Arrow Icon */}
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '99px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
              position: 'absolute',
              margin: "2px 2px 0 0",
              transform: 'rotate(405deg)'
            }}>
              <path d="M0 0L6 0L6 6" stroke="#838C9C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Entry Card */}
      <div
        onClick={handleNavigate}
        className="cursor-pointer active:scale-[0.98] transition-all"
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          width: '100%',
          background: '#1C1917',
          border: '0.5px solid #44403C',
          borderRadius: '12px'
        }}
      >
        {/* Left side - Icon + Text */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px',
          gap: '12px'
        }}>
          {/* Icon */}
          <div style={{
            width: '40px',
            height: '40px',
            background: 'rgba(71, 205, 137, 0.15)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3V10M10 10V17M10 10H17M10 10H3" stroke="#47CD89" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Text Content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '2px'
          }}>
            <span style={{
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '140%',
              color: '#FAFAF9'
            }}>
              Network Manage Test
            </span>
            <span style={{
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '140%',
              color: '#79716B'
            }}>
              Test network_manage package
            </span>
          </div>
        </div>

        {/* Right side - Arrow */}
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.875 12.4248L6.64971 6.6501L0.875 0.875393" stroke="#79716B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

