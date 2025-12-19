import { type ReactNode } from 'react';

interface YellowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  width?: string;
  margin?: string;
}

/**
 * Yellow Button Component
 * 公共的黄色按钮组件，用于统一按钮样式
 */
export default function YellowButton({
  children,
  onClick,
  icon,
  width = 'calc(100% - 40px)',
  margin = '20px auto'
}: YellowButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '15px 16px',
        width,
        height: '50px',
        margin,
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0) 100%), #EAAC08',
        border: '1px solid #FAC515',
        borderRadius: '12px',
        cursor: 'pointer',
        boxShadow: 'inset 0px -2px 0px rgba(0, 0, 0, 0.4), inset 0px 2px 0px rgba(255, 255, 255, 0.4)',
        transition: 'transform 0.2s'
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.98)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {icon && (
        <span style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
          {icon}
        </span>
      )}
      <span style={{
        fontWeight: 600,
        fontSize: '16px',
        color: '#171412'
      }}>
        {children}
      </span>
    </button>
  );
}

