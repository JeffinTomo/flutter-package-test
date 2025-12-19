import { WebFRouter } from '../../router';

interface ActivityItemProps {
  title: string;
  time: string;
  points: number;
}

function ActivityItem({ title, time, points }: ActivityItemProps) {
  return (
    <div
      className="cursor-pointer active:scale-[0.98] transition-all"
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Left side - Title and Time */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '2px'
      }}>
        <span style={{
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '140%',
          color: '#FAFAF9'
        }}>
          {title}
        </span>
        <span style={{
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '140%',
          color: '#79716B'
        }}>
          {time}
        </span>
      </div>

      {/* Right side - Points */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}>
        <span style={{
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          color: '#47CD89'
        }}>
          +{points}
        </span>
      </div>
    </div>
  );
}

export default function Activities() {
  const handleSeeMore = () => {
    // Use WebFRouter.push() for better compatibility
    WebFRouter.push('/points-records');
  };

  // Mock activity data
  const activities = [
    { id: '1', title: 'Buy/sell crypto', time: '9:00 AM', points: 2 },
    { id: '2', title: 'Buy/sell crypto', time: '8:00 AM', points: 60 },
    { id: '3', title: 'Buy/sell crypto', time: '8:00 AM', points: 100 }
  ];

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
        {/* Left side - Title with Clock Icon */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px',
          gap: '6px',
          height: '28px'
        }}>
          {/* Clock Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8.33" stroke="#FAFAF9" strokeWidth="2.08" fill="none" />
            <path d="M12 6.88V12L15 15" stroke="#FAFAF9" strokeWidth="2.08" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <span style={{
            fontFamily: 'Sora',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '140%',
            color: '#FAFAF9'
          }}>
            Activity
          </span>
        </div>

        {/* Right side - See more link */}
        <div
          onClick={handleSeeMore}
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
            See more
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

      {/* Activity List Card */}
      <div style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '8px 0px',
        width: '100%',
        background: '#1C1917',
        border: '0.5px solid #44403C',
        borderRadius: '12px'
      }}>
        {activities.map((activity) => (
          <ActivityItem
            key={activity.id}
            title={activity.title}
            time={activity.time}
            points={activity.points}
          />
        ))}
      </div>
    </div>
  );
}

