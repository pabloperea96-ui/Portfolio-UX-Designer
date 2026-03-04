import { motion } from 'motion/react';
import { useState } from 'react';
import { DesignArrow } from '../../components/ds/design-arrow';
import { DesignButton } from '../../components/ds/design-button';

export function Hero() {
  const [arrowHovered, setArrowHovered] = useState(false);

  const scrollToWork = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="relative z-10 max-w-(--ds-max-w-content) w-full mx-auto px-ds-24 lg:px-ds-48">
        <div className="flex flex-col gap-ds-48 py-ds-72 w-full">

          {/* Eyebrow + Title group */}
          <div className="flex flex-col gap-ds-4">
            {/* Large typographic statement */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="ds-text-heading-hero text-ds-text-primary w-full"
            >
              Hola, soy <span className="text-ds-action-primary">Pablo</span>. Escribo, diseño y produzco experiencias que funcionan, convierten y escalan.
            </motion.h1>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-ds-24 items-center"
          >
            <DesignButton variant="primary" onClick={scrollToWork}>
              Ver Proyectos
            </DesignButton>
            <DesignButton variant="secondary" onClick={scrollToContact}>
              Contáctame
            </DesignButton>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToWork}
        onMouseEnter={() => setArrowHovered(true)}
        onMouseLeave={() => setArrowHovered(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-ds-48 left-1/2 -translate-x-1/2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
      >
        <motion.div
          animate={arrowHovered ? { y: [0, 8, 0] } : { y: 0 }}
          transition={arrowHovered ? { duration: 1.5, repeat: Infinity } : { duration: 0.3 }}
        >
          <DesignArrow direction="down" size={24} />
        </motion.div>
      </motion.button>
    </section>
  );
}