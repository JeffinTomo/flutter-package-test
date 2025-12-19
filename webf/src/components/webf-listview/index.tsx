import React, { type CSSProperties, type ReactNode } from 'react';

interface WebFListViewProps {
  children: ReactNode;
  onRefresh?: () => void;
  onLoadmore?: () => void;
  'refresh-style'?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * WebFListView Component
 * 
 * This is a wrapper component that will be replaced by @openwebf/react-core-ui in production.
 * In development, it provides basic scrolling functionality.
 * 
 * For production use, install: npm install @openwebf/react-core-ui
 * Then import from: import { WebFListView } from '@openwebf/react-core-ui';
 */
export function WebFListView({
  children,
  onRefresh,
  onLoadmore,
  className = '',
  style = {}
}: WebFListViewProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [startY, setStartY] = React.useState(0);
  const [pullDistance, setPullDistance] = React.useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current && containerRef.current.scrollTop === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current && containerRef.current.scrollTop === 0 && startY > 0) {
      const currentY = e.touches[0].clientY;
      const distance = currentY - startY;
      if (distance > 0) {
        setPullDistance(Math.min(distance, 100));
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 50 && onRefresh && !isRefreshing) {
      setIsRefreshing(true);
      onRefresh();
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
        setStartY(0);
      }, 1500);
    } else {
      setPullDistance(0);
      setStartY(0);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    // Trigger load more when near bottom
    if (scrollTop + clientHeight >= scrollHeight - 50 && onLoadmore) {
      onLoadmore();
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        position: 'relative',
        ...style
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onScroll={handleScroll}
    >
      {/* Pull to Refresh Indicator */}
      {(isRefreshing || pullDistance > 0) && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: pullDistance,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '14px',
            transition: isRefreshing ? 'none' : 'height 0.3s ease'
          }}
        >
          {isRefreshing ? 'Refreshing...' : pullDistance > 50 ? 'Release to refresh' : 'Pull to refresh'}
        </div>
      )}

      <div style={{ paddingTop: pullDistance > 0 ? pullDistance : 0 }}>
        {children}
      </div>
    </div>
  );
}

