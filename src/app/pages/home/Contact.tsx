import { motion } from 'motion/react';
import { DesignIcon, type DesignIconName } from '../../components/ds/design-icon';
import { DesignCard } from '../../components/ds/design-card';
import { MotionReveal } from '../../components/ds/motion-reveal';

const contactLinks: { icon: DesignIconName; label: string; href: string; username: string }[] = [
  {
    icon: 'mail',
    label: 'E-mail',
    href: 'mailto:pabloperea96@gmail.com',
    username: 'pabloperea96@gmail.com',
  },
  {
    icon: 'linkedin',
    label: 'Linked In',
    href: 'https://linkedin.com/in/pablopereab',
    username: 'in/pablopereab/',
  },
  {
    icon: 'github',
    label: 'GitHub',
    href: 'https://github.com/pabloperea96-ui',
    username: '@pabloperea96-ui',
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative"
      style={{ backgroundColor: 'var(--ds-action-pressed)' }}
    >
      <div className="max-w-(--ds-max-w-content) mx-auto px-ds-24 py-ds-80 flex flex-col lg:flex-row gap-ds-32 items-start justify-between">
        <div className="flex flex-col gap-ds-8 shrink-0 w-full max-w-[523px]">
          <MotionReveal>
            <h2 className="text-ds-text-inverse font-semibold ds-text-heading-page" style={{ letterSpacing: 'var(--ds-tracking-heading-page)' }}>
              Ready to rumble
            </h2>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <p
              className="text-white font-medium ds-text-body-emphasis"
              style={{
                lineHeight: 'var(--ds-line-height-body)',
                letterSpacing: 'var(--ds-tracking-body-emphasis)',
              }}
            >
              Let's build something worth talking about!
            </p>
          </MotionReveal>
        </div>

        <div className="flex flex-col md:flex-row gap-ds-32 flex-1 min-w-0 w-full">
          {contactLinks.map((link, index) => (
            <MotionReveal key={link.label} delay={0.2 + index * 0.1} className="flex-1 min-w-0">
              <a
                href={link.href}
                target={link.icon === 'mail' ? undefined : '_blank'}
                rel={link.icon === 'mail' ? undefined : 'noopener noreferrer'}
                className="block w-full h-full"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <DesignCard
                    variant="social"
                    icon={<DesignIcon name={link.icon} size={24} />}
                    title={link.label}
                    subtitle={link.username}
                  />
                </motion.div>
              </a>
            </MotionReveal>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/20">
        <div className="max-w-(--ds-max-w-content) mx-auto px-ds-24 py-ds-16 flex flex-col sm:flex-row justify-between items-center gap-ds-16">
          <p className="ds-text-label-eyebrow text-white/80">© 2026</p>
          <p className="ds-text-label-eyebrow text-white/80">All Rights Reserved</p>
        </div>
      </div>
    </section>
  );
}
