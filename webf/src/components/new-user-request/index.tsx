import { useEffect } from 'react';
import type { ActivityItem } from '../../api/types';

export default function NewUserRequest() {
  const activity = {
    'activity-id': '123',
    logo: 'https://via.placeholder.com/150',
    title: 'Purchase crypto more than $50',
    tx_time: '2021-01-01',
    status: 'available',
    points: 100
  };

  useEffect(() => {
  }, []);


  const handleActivityClick = (activity: ActivityItem) => {
    // Handle activity action
    console.log('Activity clicked:', activity);
    // In a real app, this would trigger the activity completion flow
  };

  return (
    <div
      className="mx-auto my-[30px]"
      style={{
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '2px 0px',
        gap: '6px',
        height: '28px'
      }}>
        {/* Medal Icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="#FAFAF9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="#FAFAF9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px',
          gap: '4px'
        }}>
          <span style={{
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '140%',
            color: '#FAFAF9'
          }}>
            New user quest
          </span>

          {/* Question Icon */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7" cy="7" r="6" stroke="#79716B" strokeWidth="1.16667" />
            <path d="M7 6V7M7 10H7.01" stroke="#79716B" strokeWidth="1.16667" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Quest Cards */}
      <div
        key={activity['activity-id']}
        onClick={() => handleActivityClick(activity)}
        className="cursor-pointer active:scale-[0.98] transition-all"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '22px 20px',
          isolation: 'isolate',
          marginTop: '20px',
          width: '100%',
          height: '101px',
          background: 'linear-gradient(180deg, #421E06 0%, #713C12 100%)',
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >

        {/* Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '0px',
          gap: '60px',
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '2px',
            flex: 1
          }}>
            <div style={{
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '140%',
              color: '#FEEC8A'
            }}>
              Get {activity.points} Points
            </div>
            <div style={{
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '140%',
              color: '#FAFAF9'
            }}>
              {activity.title}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleActivityClick(activity);
            }}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px',
              gap: '4px',
              width: '32px',
              height: '32px',
              background: '#EAAC08',
              borderRadius: '99px',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.12868 6.58363L9.53674e-07 6.58363V5.08363L9.12868 5.08363L5.1057 1.06066L6.16635 -2.54997e-07L12 5.83363L6.16635 11.6673L5.1057 10.6066L9.12868 6.58363Z" fill="black" />
            </svg>

          </button>
        </div>
      </div>
    </div>
  );
}

