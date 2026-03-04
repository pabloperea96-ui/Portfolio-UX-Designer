import { useNavigate } from 'react-router';
import { DesignButton } from './design-button';
import { TechnicalSheet } from './technical-sheet';
import { MotionReveal } from './motion-reveal';

/* ========================================
   CaseStudyFooter — Design System composition component
   ========================================
   Bottom CTA section for case study pages.
   Shows a "thanks for reading" message with back + contact links.

   Composes:
     - TechnicalSheet (size="section", subtitleVariant="label") for the text
     - DesignButton (secondary, left arrow) for back navigation
     - DesignButton (primary, right icon) for contact CTA
   ======================================== */

interface CaseStudyFooterProps {
  /** Visual variant. 'inverse' applies --ds-surface-inverse background with --ds-text-inverse text. */
  variant?: 'default' | 'inverse';
  /** Thank-you label. Default: 'Gracias por leer' */
  label?: string;
  /** Heading text. Default: '¿Interesado en trabajar juntos?' */
  heading?: string;
  /** Back button label. Default: 'Volver a Home' */
  backLabel?: string;
  /** Contact button label. Default: 'Contactar' */
  contactLabel?: string;
  /** Email for the contact link */
  email?: string;
  /** Additional className */
  className?: string;
}

export function CaseStudyFooter({
  variant = 'default',
  label = 'Gracias por leer',
  heading = '¿Interesado en trabajar juntos?',
  backLabel = 'Volver a Home',
  contactLabel = 'Contactar',
  email = 'pabloperea96@gmail.com',
  className,
}: CaseStudyFooterProps) {
  const navigate = useNavigate();

  const isInverse = variant === 'inverse';

  return (
    <section
      className={`relative py-ds-72 md:py-ds-96 px-ds-24 lg:px-ds-48 ${
        isInverse
          ? 'bg-ds-surface-inverse'
          : 'border-t border-ds-border-subtle'
      } ${className ?? ''}`}
      style={
        isInverse
          ? ({
              '--ds-text-primary': 'var(--ds-text-inverse)',
              '--ds-text-secondary': 'var(--ds-text-inverse)',
              '--ds-text-tertiary': 'var(--ds-text-tertiary-inverse)',
              '--btn-secondary-text': 'var(--ds-text-inverse)',
              '--btn-secondary-border': 'var(--ds-text-inverse)',
              '--btn-secondary-bg-hover': 'var(--ds-action-hover-secondary-inverse)',
              '--icon-foreground': 'var(--ds-text-inverse)',
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-ds-32">
          <MotionReveal trigger="inView" margin="-80px">
            <TechnicalSheet
              size="section"
              subtitleVariant="label"
              subtitle={label}
              title={heading}
              hasBadges={false}
              showCta={false}
            />
          </MotionReveal>

          <MotionReveal trigger="inView" delay={0.15} margin="-80px">
            <div className="flex flex-wrap gap-ds-16">
              <DesignButton
                variant="secondary"
                icon
                iconDirection="left"
                onClick={() => navigate('/')}
              >
                {backLabel}
              </DesignButton>
              <DesignButton
                variant="primary"
                icon
                iconType="mail"
                iconPosition="right"
                onClick={() => { window.location.href = `mailto:${email}`; }}
              >
                {contactLabel}
              </DesignButton>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}