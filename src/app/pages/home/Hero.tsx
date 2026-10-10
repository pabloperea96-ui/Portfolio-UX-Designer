import { motion } from 'motion/react';

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center overflow-hidden min-h-[75vh] pt-ds-96 pb-ds-48"
    >
      <div className="relative z-10 w-full px-ds-24">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-ds-text-primary font-semibold w-full ds-text-heading-hero"
          style={{
            letterSpacing: 'var(--ds-tracking-heading-display)',
          }}
        >
          Hola! I'm <span className="text-ds-action-primary">Pablo</span>. Writer, designer and
          producer of experiences that work, convert and scale.
        </motion.h1>
      </div>
    </section>
  );
}
