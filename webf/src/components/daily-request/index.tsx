import { useEffect, useState } from 'react';

export default function DailyRequest() {
  const [timeLeft, setTimeLeft] = useState({ hours: 10, minutes: 36 });

  useEffect(() => {
    // Countdown timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes } = prev;
        if (minutes > 0) {
          minutes--;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
        }
        return { hours, minutes };
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleActivityClick = (activityId: string) => {
    console.log('Activity clicked:', activityId);
  };

  return (
    <div
      className="mx-auto my-[30px]"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '20px',
        width: '100%',
        padding: '20px',
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
        width: '100%',
        height: '28px'
      }}>
        {/* Left side - Title */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '2px 0px',
          gap: '6px',
          height: '28px'
        }}>
          {/* Calendar Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="#FAFAF9" strokeWidth="2" fill="none" />
            <path d="M16 2V6M8 2V6M3 10H21" stroke="#FAFAF9" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 14L10 16L13 13" stroke="#FAFAF9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <span style={{
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '140%',
            whiteSpace: 'nowrap',
            color: '#FAFAF9'
          }}>
            Daily quest
          </span>
        </div>

        {/* Right side - Timer */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px',
          gap: '6px',
          height: '17px'
        }}>
          {/* Time Icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="6.67" stroke="#FFD83A" strokeWidth="1.33" fill="none" />
            <path d="M8 4.67V8L10.67 10.67" stroke="#FFD83A" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <span style={{
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '140%',
            whiteSpace: 'nowrap',
            color: '#FFD83A'
          }}>
            {timeLeft.hours}H：{String(timeLeft.minutes).padStart(2, '0')}M
          </span>
        </div>
      </div>

      {/* Activity Cards */}
      {/* Card 1: Purchase crypto - Completed */}
      <ActivityCard
        icon="purchase"
        iconText="69"
        title="Purchase crypto"
        subtitle=""
        progress={{ current: 340, total: 340 }}
        status="completed"
        onClick={() => handleActivityClick('purchase')}
      />

      {/* Card 2: Keep $1000+ in Savings - In Progress */}
      <ActivityCard
        icon="savings"
        title="Keep $1000+ in Savings"
        subtitle=""
        progress={{ current: 12, total: 340 }}
        status="active"
        onClick={() => handleActivityClick('savings')}
      />

      {/* Card 3: Keep $1000+ balance - In Progress */}
      <ActivityCard
        icon="balance"
        title="Keep $1000+ balance"
        subtitle=""
        progress={{ current: 212, total: 340 }}
        status="active"
        onClick={() => handleActivityClick('balance')}
      />
    </div>
  );
}

// Activity Card Component
interface ActivityCardProps {
  icon: string;
  iconText?: string;
  title: string;
  subtitle?: string;
  progress: { current: number; total: number };
  status: 'completed' | 'active' | 'locked';
  onClick: () => void;
}

function ActivityCard({ icon, iconText, title, progress, status, onClick }: ActivityCardProps) {
  const progressPercent = (progress.current / progress.total) * 100;
  const isCompleted = status === 'completed';
  // const isActive = status === 'active';

  return (
    <div
      onClick={onClick}
      className="cursor-pointer active:scale-[0.98] transition-all"
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '16px',
        gap: '10px',
        width: '100%',
        height: '74px',
        background: '#201D1B',
        borderRadius: '12px'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px',
        gap: '60px',
        width: '100%',
        height: '42px'
      }}>
        {/* Left side - Icon + Text */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px',
          gap: '10px',
          width: 'calc(100% - 132px)',
          height: '42px'
        }}>
          {/* Icon */}
          {renderIcon(icon, iconText)}

          {/* Text Content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            height: '42px',
            gap: '2px'
          }}>
            <div style={{
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '140%',
              color: isCompleted ? '#D9D9D9' : '#FAFAF9'
            }}>
              {title}
            </div>

            {/* Progress Bar */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px',
              gap: '10px',
              height: '15px',
              width: 'calc(100% - 2px)'
            }}>
              {/* Progress Bar Background */}
              <div style={{
                position: 'relative',
                width: '130px',
                height: '6px',
                background: isCompleted ? '#2C2C36' : '#44403C',
                border: isCompleted ? '1px solid #292524' : 'none',
                borderRadius: '8px'
              }}>
                {/* Progress Fill */}
                {progressPercent > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: `${progressPercent}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #E7AC08 0%, #FFD664 100%)',
                    borderRadius: '8px'
                  }} />
                )}
              </div>

              {/* Progress Text */}
              <span style={{
                fontWeight: 500,
                fontSize: '11px',
                lineHeight: '140%',
                color: '#79716B',
                whiteSpace: 'nowrap'
              }}>
                {progress.current} / {progress.total}
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Action Button */}
        {isCompleted ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12L10 17L20 7" stroke="#47CD89" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.875 12.4248L6.64971 6.6501L0.875 0.875393" stroke="#79716B" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

        )}
      </div>
    </div>
  );
}

// Icon renderer function
function renderIcon(icon: string, iconText?: string) {
  const iconSize = { width: '40px', height: '40px' };

  if (icon === 'purchase') {
    return (
      <div style={{
        ...iconSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#292524',
        borderRadius: '4px'
      }}>
        <span style={{ fontSize: '16px', fontWeight: '500', color: '#FFFFFF' }}>
          {iconText || '69'}
        </span>
      </div>
    );
  }

  if (icon === 'savings') {
    return (
      <div style={{
        ...iconSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#292524',
        borderRadius: '88.8889px',
        position: 'relative'
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          <path d="M12 6V12L16 14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  if (icon === 'balance') {
    return (
      <div style={{
        ...iconSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#292524',
        borderRadius: '88.8889px',
        position: 'relative'
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="16" height="12" rx="2" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          <path d="M8 8V6C8 4.89543 8.89543 4 10 4H14C15.1046 4 16 4.89543 16 6V8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="14" r="2" stroke="#FFFFFF" strokeWidth="2" fill="none" />
        </svg>
      </div>
    );
  }

  return null;
}

