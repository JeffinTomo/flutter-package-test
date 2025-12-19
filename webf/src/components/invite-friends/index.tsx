import { useState, useEffect } from 'react';

export default function InviteFriends() {
  const [friendsReferred] = useState(0);
  const [pointsEarned] = useState(0);
  const [timer, setTimer] = useState({ days: 6, hours: 23, minutes: 36, seconds: 51 });

  // Timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInvite = async () => {
    // Call Flutter system module to share app link + current user code
    if (window.webf && window.webf.invokeNative) {
      try {
        const userCode = 'USER123'; // This should come from user context
        const appLink = `https://app.example.com/invite?code=${userCode}`;
        await window.webf.invokeNative('share', {
          text: `Join me on this app! Use my code: ${userCode}`,
          url: appLink,
        });
      } catch (error) {
        console.error('Failed to share:', error);
        // Fallback: copy to clipboard
        const userCode = 'USER123';
        const appLink = `https://app.example.com/invite?code=${userCode}`;
        navigator.clipboard.writeText(appLink);
        alert('Link copied to clipboard!');
      }
    } else {
      // Fallback for web
      const userCode = 'USER123';
      const appLink = `https://app.example.com/invite?code=${userCode}`;
      navigator.clipboard.writeText(appLink);
      alert('Link copied to clipboard!');
    }
  };

  const handleEnterCode = () => {
    // Handle referral code entry
    console.log('Enter referral code clicked');
  };

  return (
    <div
      id="invite-friends"
      style={{
        width: 'calc(100% - 40px)',
        height: '233px',
        display: 'flex',
        boxSizing: 'border-box',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '40px auto 20px',
        padding: '20px',
        gap: '20px',
        background: 'linear-gradient(121.99deg, rgba(37, 24, 6, 0.43) 0%, rgba(60, 47, 23, 0.75) 99.79%)',
        border: '1.5px solid #FFB23A',
        boxShadow: '2px 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(35px)',
        borderRadius: '12px',
        isolation: 'isolate'
      }}
    >
      {/* Top Section - Referral Statistics */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '20px', width: '295px', height: '55px' }}>
        {/* Left Column - Friends referred */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px', gap: '4px', width: '127.5px', height: '55px', flexGrow: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '28px', lineHeight: '120%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#FFFFFF' }}>
            {friendsReferred}
          </div>
          <div style={{ fontWeight: 400, fontSize: '12px', lineHeight: '140%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#969696' }}>
            Friends referred
          </div>
        </div>

        {/* Vertical divider */}
        <div style={{ width: '0px', height: '43.5px', border: '1px solid rgba(255, 255, 255, 0.05)' }}></div>

        {/* Right Column - Points earned */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px', gap: '4px', width: '127.5px', height: '55px', flexGrow: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '28px', lineHeight: '120%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#FFFFFF' }}>
            {pointsEarned}
          </div>
          <div style={{ fontWeight: 400, fontSize: '12px', lineHeight: '140%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#969696' }}>
            Points earned
          </div>
        </div>
      </div>

      {/* Middle Section - Invite Button */}
      <button
        onClick={handleInvite}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px 16px',
          gap: '8px',
          width: '100%',
          height: '50px',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0) 100%), #EAAC08',
          border: '1px solid #FAC515',
          boxShadow: 'inset 0px -2px 0px rgba(0, 0, 0, 0.4), inset 0px 2px 0px rgba(255, 255, 255, 0.4)',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.16683 0.833008L16.6668 8.33301L9.16683 15.4163V10.833C3.3335 10.833 0.833496 17.083 0.833496 17.083C0.833496 9.99967 2.91683 5.41634 9.16683 5.41634V0.833008Z" fill="#171412" stroke="#171412" stroke-width="1.66667" stroke-linejoin="round" />
        </svg>

        <span style={{ fontWeight: 600, fontSize: '16px', lineHeight: '140%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#171412' }}>
          Invite friend
        </span>
      </button>

      {/* Bottom Section - Referral Code Entry & Timer */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0px', gap: '8px', width: '295px', height: '48px' }}>
        {/* Enter referral code */}
        <div
          onClick={handleEnterCode}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px',
            gap: '4px',
            width: '295px',
            height: '20px',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontWeight: 500, fontSize: '14px', lineHeight: '140%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#FAFAF9' }}>
            Enter referral code
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="#A9A29D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Timer */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '8px', width: '157px', height: '20px' }}>
          {/* Days */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '4px', height: '20px' }}>
            <div style={{ width: '20px', height: '20px', background: '#292524', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#FAFAF9' }}>
                {String(timer.days).padStart(2, '0')}
              </span>
            </div>
            <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#A9A29D' }}>D</span>
          </div>

          {/* Hours */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '4px', height: '20px' }}>
            <div style={{ width: '20px', height: '20px', background: '#292524', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#FAFAF9' }}>
                {String(timer.hours).padStart(2, '0')}
              </span>
            </div>
            <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#A9A29D' }}>H</span>
          </div>

          {/* Minutes */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '4px', height: '20px' }}>
            <div style={{ width: '20px', height: '20px', background: '#292524', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#FAFAF9' }}>
                {String(timer.minutes).padStart(2, '0')}
              </span>
            </div>
            <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#A9A29D' }}>M</span>
          </div>

          {/* Seconds */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '4px', height: '20px' }}>
            <div style={{ width: '20px', height: '20px', background: '#292524', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#FAFAF9' }}>
                {String(timer.seconds).padStart(2, '0')}
              </span>
            </div>
            <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#A9A29D' }}>S</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Extend window type for WebF
declare global {
  interface Window {
    webf?: any;
  }
}

