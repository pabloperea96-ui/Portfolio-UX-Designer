import { motion } from 'motion/react';
import { DesignIcon, type DesignIconName } from '../../components/ds/design-icon';
import { DesignCard } from '../../components/ds/design-card';
import { DesignButton } from '../../components/ds/design-button';
import { DesignSection } from '../../components/ds/design-section';
import { MotionReveal } from '../../components/ds/motion-reveal';
import { TechnicalSheet } from '../../components/ds/technical-sheet';

const socialLinks: { icon: DesignIconName; label: string; href: string; username: string }[] = [
  {
    icon: 'linkedin',
    label: 'Linked In',
    href: 'https://linkedin.com/in/pablopereab',
    username: '/pablopereab',
  },
  {
    icon: 'github',
    label: 'Git-Hub',
    href: 'https://github.com',
    username: '@username',
  },
  {
    icon: 'mail',
    label: 'E-mail',
    href: 'mailto:pabloperea96@gmail.com',
    username: 'pabloperea96@gmail.com',
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative bg-ds-surface-background">
      <div className="max-w-(--ds-max-w-content) mx-auto flex flex-col items-center px-ds-24 lg:px-ds-48">
        {/* ── Main Content Section (cta variant) ── */}
        <DesignSection variant="cta">
          {/* Header — TechnicalSheet centered, heading-page size */}
          <MotionReveal className="relative w-full">
            <TechnicalSheet
              align="centered"
              size="default"
              subtitleVariant="eyebrow"
              subtitle="¡Trabajemos!"
              title="¿Algún proyecto en mente?"
              description="Siempre estoy abierto a escuchar propuestas y oportunidades. Déjame un mensaje y responderé tan pronto pueda."
              hasBadges={false}
              showCta={false}
            />
          </MotionReveal>

          {/* CTA Button */}
          <MotionReveal delay={0.2} margin="-80px" className="relative">
            <DesignButton
              variant="primary"
              size="large"
              icon
              iconType="mail"
              onClick={() => window.location.href = 'mailto:pabloperea96@gmail.com'}
            >
              Escríbeme
            </DesignButton>
          </MotionReveal>

          {/* Social Link Cards */}
          <MotionReveal delay={0.3} margin="-80px" className="relative flex flex-col md:flex-row gap-ds-32 items-start py-ds-4 w-full">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.icon === 'mail' ? undefined : '_blank'}
                rel={link.icon === 'mail' ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="block flex-1 min-w-0 w-full md:w-auto"
              >
                <DesignCard
                  variant="social"
                  icon={<DesignIcon name={link.icon} size={24} />}
                  title={link.label}
                  subtitle={link.username}
                />
              </motion.a>
            ))}
          </MotionReveal>
        </DesignSection>

        {/* ── Footer ── */}
        <div className="relative w-full">
          {/* Top border */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 border-t border-ds-border-subtle pointer-events-none"
          />
          <DesignSection variant="footer">
            <MotionReveal type="fade" delay={0.5}>
              <p className="ds-text-label-eyebrow text-ds-text-secondary flex-1 min-w-0">
                &copy; 2026
              </p>
            </MotionReveal>
            <MotionReveal type="fade" delay={0.6}>
              <p className="ds-text-label-eyebrow text-ds-text-secondary flex-1 min-w-0 text-right">
                All Rights Reserved
              </p>
            </MotionReveal>
          </DesignSection>
        </div>
      </div>
    </section>
  );
}
