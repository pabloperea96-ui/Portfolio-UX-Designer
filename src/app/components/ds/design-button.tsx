import * as React from 'react';
import { DesignArrow } from './design-arrow';
import type { DesignArrowDirection } from './design-arrow';
import { DesignIcon } from './design-icon';
import type { DesignIconName } from './design-icon';

interface DesignButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'default' | 'large';
  icon?: boolean;
  /** Which icon to render: 'arrow' (default) uses DesignArrow, any other value uses DesignIcon */
  iconType?: 'arrow' | DesignIconName;
  /** Arrow direction when `iconType` is 'arrow' (default "right") */
  iconDirection?: DesignArrowDirection;
  /** Layout position of the icon relative to text (default "left") */
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export function DesignButton({
  variant = 'primary',
  size = 'default',
  icon = false,
  iconType = 'arrow',
  iconDirection = 'right',
  iconPosition = 'left',
  children,
  className = '',
  ...props
}: DesignButtonProps) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';
  const isPrimary = variant === 'primary';

  const radiusClass = 'rounded-ds-md';
  const paddingClass = isLarge ? 'px-ds-48 py-ds-24' : isSmall ? 'px-ds-24 py-ds-12' : 'px-ds-32 py-ds-16';
  const textClass = isLarge ? 'ds-text-action-button-lg' : isSmall ? 'ds-text-action-inline' : 'ds-text-action-button-df';
  const iconSize = isLarge ? 24 : isSmall ? 14 : 18;
  const iconColor = isPrimary ? 'var(--btn-primary-text)' : 'var(--btn-secondary-text)';

  const renderIcon = () =>
    iconType === 'arrow' ? (
      <DesignArrow direction={iconDirection} size={iconSize} color={iconColor} />
    ) : (
      <DesignIcon name={iconType} size={iconSize} color={iconColor} />
    );

  return (
    <button
      className={`
        relative inline-flex items-center justify-center gap-ds-10
        ${paddingClass} ${radiusClass} transition-all duration-200 group cursor-pointer
        ${isPrimary
          ? 'bg-btn-primary-bg text-btn-primary-text hover:bg-btn-primary-bg-hover hover:shadow-[1px_1px_2px_0px_rgba(0,0,0,0.25)]'
          : 'bg-transparent text-btn-secondary-text hover:bg-btn-secondary-bg-hover'
        }
        ${textClass}
        ${className}
      `.trim()}
      {...props}
    >
      {/* Secondary variant border overlay */}
      {!isPrimary && (
        <span
          aria-hidden="true"
          className={`absolute border border-solid border-btn-secondary-border inset-0 pointer-events-none ${radiusClass} transition-all duration-200 group-hover:shadow-[1px_1px_2px_0px_rgba(0,0,0,0.25)]`}
        />
      )}

      {icon && iconPosition === 'left' && renderIcon()}

      <span className="relative shrink-0 text-center leading-normal">
        {children}
      </span>

      {icon && iconPosition === 'right' && renderIcon()}
    </button>
  );
}