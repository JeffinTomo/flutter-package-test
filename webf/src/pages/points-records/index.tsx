import { useState } from 'react';
import { WebFListView } from '../../components/webf-listview';
import { WebFRouter } from '../../router';

export default function PointsRecordsPage() {
  const handleBack = () => {
    // Use WebFRouter.back() for better compatibility
    WebFRouter.back();
  };

  // Mock data for demonstration
  const initialRecordsData = [
    {
      date: '12/07/2024',
      records: [
        { id: '1', icon: 'checking', title: 'Daily Checking', subtitle: 'Check in', status: 'pending', points: 20 },
        { id: '2', icon: 'wallet', title: 'Keep Balance', subtitle: 'Check in', status: 'pending', points: 20 },
        { id: '3', icon: 'swap', title: 'Swap', subtitle: 'Check in', points: 50 },
        { id: '4', icon: 'forward', title: 'Invite new friend', subtitle: 'Check in', subtext: 'Check in', points: 100 },
      ]
    },
    {
      date: '09/07/2024',
      records: [
        { id: '5', icon: 'swap-fill', title: 'Hold & Earn', subtitle: 'Check in', points: 50 },
        { id: '6', icon: 'add-money', title: 'Purchase crypto', subtitle: 'Check in', points: 30 },
        { id: '7', icon: 'stake', title: 'Deposit USD1', subtitle: 'Check in', points: 20 },
        { id: '8', icon: 'friend', title: 'Invite Friend', subtitle: 'Check in', points: 20 },
        { id: '9', icon: 'link', title: 'Link social media', subtitle: 'Check in', points: 20 },
      ]
    }
  ];

  const [recordsData, setRecordsData] = useState(initialRecordsData);

  const handleRefresh = () => {
    console.log('Refreshing points records...');
    // Simulate refresh - reset to initial data
    setTimeout(() => {
      setRecordsData(initialRecordsData);
      console.log('Refresh complete');
    }, 1000);
  };

  const handleLoadMore = () => {
    console.log('Loading more records...');
    // Simulate loading more data
    setTimeout(() => {
      const newSection = {
        date: '05/07/2024',
        records: [
          { id: `${Date.now()}-1`, icon: 'checking', title: 'Daily Checking', subtitle: 'Check in', points: 20 },
          { id: `${Date.now()}-2`, icon: 'wallet', title: 'Keep Balance', subtitle: 'Check in', points: 30 },
        ]
      };
      setRecordsData([...recordsData, newSection]);
      console.log('Loaded more items');
    }, 1000);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      overflow: 'hidden'
    }}>
      {/* Top Navigation Bar */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        gap: '8px',
        width: '100%',
        height: '48px',
        boxSizing: 'border-box',
        flexShrink: 0
      }}>
        {/* Back Button - Left */}
        <div
          onClick={handleBack}
          style={{
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
          className="active:opacity-70 transition-opacity"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Title - Center */}
        <span style={{
          fontFamily: 'Sora',
          fontWeight: 600,
          fontSize: '18px',
          lineHeight: '140%',
          display: 'flex',
          alignItems: 'center',
          color: '#D9D9D9'
        }}>
          History
        </span>

        {/* Placeholder - Right (hidden) */}
        <div style={{
          width: '24px',
          height: '24px',
          visibility: 'hidden',
          flexShrink: 0
        }} />
      </div>

      {/* Content with WebFListView */}
      <WebFListView
        onRefresh={handleRefresh}
        onLoadmore={handleLoadMore}
        refresh-style="customCupertino"
        style={{
          flex: 1,
          width: '100%',
          height: 'calc(100vh - 48px)'
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '24px 0px',
          gap: '24px',
          width: 'calc(100% - 40px)',
          margin: '0 auto'
        }}>
          {recordsData.map((section, sectionIndex) => (
            <div key={sectionIndex} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              width: '100%'
            }}>
              {/* Date Header */}
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 20px',
                width: '100%',
                height: '40px',
                boxSizing: 'border-box'
              }}>
                <span style={{
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '140%',
                  color: '#79716B'
                }}>
                  {section.date}
                </span>
              </div>

              {/* Records */}
              {section.records.map((record) => (
                <RecordItem key={record.id} {...record} />
              ))}
            </div>
          ))}
        </div>
      </WebFListView>
    </div>
  );
}

// Record Item Component
interface RecordItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  subtext?: string;
  status?: string;
  points: number;
}

function RecordItem({ icon, title, subtitle, subtext, status, points }: RecordItemProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 20px',
      width: '100%',
      height: status ? '80px' : '80px',
      boxSizing: 'border-box'
    }}>
      {/* Left side - Icon + Text */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0px',
        gap: '12px'
      }}>
        {/* Icon */}
        {renderRecordIcon(icon)}

        {/* Text Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '2px'
        }}>
          {/* Title with optional status */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px',
            gap: '4px'
          }}>
            <span style={{
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '140%',
              color: '#D9D9D9'
            }}>
              {title}
            </span>

            {status && (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '4px 6px',
                gap: '2px',
                background: 'rgba(223, 145, 0, 0.1)',
                borderRadius: '6px'
              }}>
                <span style={{
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '140%',
                  color: '#FFAD32'
                }}>
                  Pending
                </span>
              </div>
            )}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <span style={{
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '140%',
              color: '#79716B'
            }}>
              {subtitle}
            </span>
          )}

          {/* Additional subtext */}
          {subtext && (
            <span style={{
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '140%',
              color: '#79716B'
            }}>
              {subtext}
            </span>
          )}
        </div>
      </div>

      {/* Right side - Points */}
      <span style={{
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '140%',
        color: points >= 0 ? '#47CD89' : '#FF4D4D'
      }}>
        {points > 0 ? '+' : ''}{points}
      </span>
    </div>
  );
}

// Icon renderer function
function renderRecordIcon(icon: string) {
  const iconSize = { width: '40px', height: '40px' };
  const iconStyle = {
    ...iconSize,
    background: 'rgba(255, 255, 255, 0.09)',
    borderRadius: '88.8889px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0
  };

  return (
    <div style={iconStyle}>
      {getIconSVG(icon)}
    </div>
  );
}

function getIconSVG(icon: string) {
  const svgProps = {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };

  switch (icon) {
    case 'checking':
      return (
        <svg {...svgProps}>
          <path d="M3 2H17V16H3V2Z" stroke="#FAFAF9" strokeWidth="1.5" fill="none" />
          <path d="M6 8L9 11L14 6" stroke="#FAFAF9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'wallet':
      return (
        <svg {...svgProps}>
          <rect x="2" y="5" width="16" height="12" rx="2" stroke="#FAFAF9" strokeWidth="1.5" fill="none" />
          <path d="M5 5V3C5 2 6 1 7 1H13C14 1 15 2 15 3V5" stroke="#FAFAF9" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="11" r="1.5" stroke="#FAFAF9" strokeWidth="1.5" fill="none" />
        </svg>
      );

    case 'swap':
      return (
        <svg {...svgProps}>
          <path d="M7 13V3M7 3L4 6M7 3L10 6M13 7V17M13 17L16 14M13 17L10 14" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'forward':
      return (
        <svg {...svgProps}>
          <path d="M3 10L17 3L10 17L9 11L3 10Z" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'swap-fill':
      return (
        <svg {...svgProps}>
          <circle cx="10" cy="10" r="8" stroke="#D9D9D9" strokeWidth="1.5" fill="none" />
          <path d="M7 10H13M10 7V13" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'add-money':
      return (
        <svg {...svgProps}>
          <rect x="2" y="5" width="16" height="10" rx="2" stroke="#FAFAF9" strokeWidth="1.5" fill="none" />
          <path d="M6 5V3H14V5M10 8V12" stroke="#FAFAF9" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'stake':
      return (
        <svg {...svgProps}>
          <circle cx="10" cy="5" r="2.5" stroke="#FAFAF9" strokeWidth="1.5" fill="none" />
          <path d="M10 7.5V15M7 12.5L10 15L13 12.5" stroke="#FAFAF9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'friend':
      return (
        <svg {...svgProps}>
          <circle cx="10" cy="6" r="3" stroke="#D9D9D9" strokeWidth="1.5" fill="none" />
          <path d="M3 17C3 14 6 12 10 12C14 12 17 14 17 17" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'link':
      return (
        <svg {...svgProps}>
          <path d="M8 12L12 8M8 8H10C11.5 8 13 9.5 13 11V12C13 13.5 11.5 15 10 15H8C6.5 15 5 13.5 5 12V11C5 9.5 6.5 8 8 8Z" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    default:
      return null;
  }
}

