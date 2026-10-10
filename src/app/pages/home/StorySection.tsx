import { motion } from 'motion/react';

// ─── Shared animation variants ───────────────────────────────────────────────

const imgVariants = {
  hidden: { scale: 1.04, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const imgTransition = { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const };

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const textTransition = { duration: 0.9, ease: 'easeOut' as const };

const viewport = { once: true, margin: '-60px' };

// ─── Images (public/images/) ───────────────────────────────────────────────
const IMG_MERCADO_DESKTOP = '/images/mercadolibre-desktop.png';
const IMG_MERCADO_PHONE = '/images/mercadolibre-phone.png';
const IMG_COPY_1 = '/images/dembow-mockup.png';
const IMG_COPY_2 = '/images/mis-propias-finanzas.png';
const IMG_COPY_3 = '/images/tres-galeones.png';
const IMG_COPY_4 = '/images/mono.png';
const IMG_BINALOGUE = '/images/binalogue.png';

// ─── Chapter 1 — Mercado Libre ───────────────────────────────────────────────
// Layout: [Title + Lead] | [Desktop image]; then [iPhone mockup] | [Paragraph]

function Chapter1() {
  return (
    <div className="flex flex-col gap-ds-80">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,523px)_1fr] gap-ds-32 items-start">
        <div className="flex flex-col gap-ds-48">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={textVariants}
            transition={textTransition}
            className="text-ds-text-primary font-semibold ds-text-heading-page"
            style={{ letterSpacing: 'var(--ds-tracking-heading-page)' }}
          >
            Mercado Libre
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={textVariants}
            transition={{ ...textTransition, delay: 0.05 }}
            className="ds-text-body-default text-ds-text-primary font-medium"
            style={{
              fontSize: 'var(--ds-font-size-body-lead)',
              lineHeight: 'var(--ds-line-height-lead)',
              letterSpacing: 'var(--ds-tracking-body-emphasis)',
            }}
          >
            3 years as a UX Designer & Content Designer in Fulfillment: the massive warehousing and
            distribution service operative in Brazil, Mexico, Colombia, Argentina, Chile, USA and
            China.
          </motion.p>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={imgVariants}
          transition={imgTransition}
          className="w-full overflow-hidden"
        >
          <img
            src={IMG_MERCADO_DESKTOP}
            alt="Mercado Libre Shipment Planning — desktop UI"
            className="w-full h-auto block"
            style={{ clipPath: 'inset(4% 4% 4% 4%)' }}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,520px)_1fr] gap-ds-32 items-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={imgVariants}
          transition={imgTransition}
          className="w-full max-w-[280px] mx-auto lg:mx-0 overflow-hidden rounded-ds-lg shadow-lg"
        >
          <img
            src={IMG_MERCADO_PHONE}
            alt="Mercado Libre — mobile email screen"
            className="w-full h-auto object-cover block"
            style={{ aspectRatio: '520/1083' }}
          />
        </motion.div>
        <div className="flex flex-col justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={textVariants}
            transition={{ ...textTransition, delay: 0.1 }}
            className="ds-text-body-default text-ds-text-primary font-medium space-y-4"
            style={{
              fontSize: 'var(--ds-font-size-body-lead)',
              lineHeight: 'var(--ds-line-height-lead)',
              letterSpacing: 'var(--ds-tracking-body-emphasis)',
            }}
          >
            <p>
              I worked in Shipment Planning – Fulfillment's section in charge of helping sellers
              send the right stock, at the right time to ensure consistent sales across six
              countries.
            </p>
            <p>
              I designed, wrote and built features that moved seller behavior — from stock
              recommendations and communication plans to a benefits-engine that increased average
              stored stock by 10 days, now live in Mexico and Brazil.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Chapter 2 — Copywriting ─────────────────────────────────────────────────
// Title + lead stacked; then two rows of campaign images

function Chapter2() {
  return (
    <div className="flex flex-col gap-ds-48">
      <div className="flex flex-col gap-ds-48 max-w-[523px]">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={textVariants}
          transition={textTransition}
          className="text-ds-text-primary font-semibold ds-text-heading-page"
          style={{ letterSpacing: 'var(--ds-tracking-heading-page)' }}
        >
          Copywriting
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={textVariants}
          transition={{ ...textTransition, delay: 0.05 }}
          className="ds-text-body-default text-ds-text-primary font-medium space-y-4"
          style={{
            fontSize: 'var(--ds-font-size-body-lead)',
            lineHeight: 'var(--ds-line-height-lead)',
            letterSpacing: 'var(--ds-tracking-body-emphasis)',
          }}
        >
          <p>
            2+ years in an independent creative agency, 7+ brands built from scratch. Each one a
            different world. Maluma's Dembow, inspired by his hometown Medellín; Mis Propias
            Finanzas, a finance platform that makes investing feel approachable; Tres Galeones, a
            taco joint in Mexico dripping with attitude; Mono, a challenger bank for startups fed
            up with theirs.
          </p>
          <p>
            Creative concept, tone of voice, brandbooks, naming, social — from the first brief to
            the final pixel.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-ds-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-ds-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={imgVariants}
            transition={imgTransition}
            className="overflow-hidden rounded-ds-lg shadow-md"
          >
            <img
              src={IMG_COPY_1}
              alt="Dembow campaign"
              className="w-full h-auto object-cover block"
              style={{ aspectRatio: '1159/615' }}
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={imgVariants}
            transition={{ ...imgTransition, delay: 0.05 }}
            className="overflow-hidden rounded-ds-lg shadow-md"
          >
            <img
              src={IMG_COPY_2}
              alt="Mis Propias Finanzas"
              className="w-full h-auto object-cover block"
              style={{ aspectRatio: '454/615' }}
            />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-ds-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={imgVariants}
            transition={imgTransition}
            className="overflow-hidden rounded-ds-lg shadow-md"
          >
            <img
              src={IMG_COPY_3}
              alt="Tres Galeones"
              className="w-full h-auto object-cover block"
              style={{ aspectRatio: '522/606' }}
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={imgVariants}
            transition={{ ...imgTransition, delay: 0.05 }}
            className="overflow-hidden rounded-ds-lg shadow-md"
          >
            <img
              src={IMG_COPY_4}
              alt="Mono — challenger bank"
              className="w-full h-auto object-cover block"
              style={{ aspectRatio: '1071/605' }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Chapter 3 — Binalogue ───────────────────────────────────────────────────
// Title + text left | image right

function Chapter3() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,523px)_1fr] gap-ds-32 items-start">
      <div className="flex flex-col gap-ds-48">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={textVariants}
          transition={textTransition}
          className="text-ds-text-primary font-semibold ds-text-heading-page"
          style={{ letterSpacing: 'var(--ds-tracking-heading-page)' }}
        >
          Binalogue
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={textVariants}
          transition={{ ...textTransition, delay: 0.05 }}
          className="ds-text-body-default text-ds-text-primary font-medium space-y-4"
          style={{
            fontSize: 'var(--ds-font-size-body-lead)',
            lineHeight: 'var(--ds-line-height-lead)',
            letterSpacing: 'var(--ds-tracking-body-emphasis)',
          }}
        >
          <p>
            Now I'm a Partner at Binalogue — a creative and production company with offices in
            Madrid, Miami and Bogotá. We build brand activations and 360 campaigns across every
            platform, physical or digital.
          </p>
          <p>I'm part of the Colombia chapter. And it's just getting started.</p>
        </motion.div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={imgVariants}
        transition={imgTransition}
        className="w-full overflow-hidden rounded-ds-lg shadow-md"
      >
        <img
          src={IMG_BINALOGUE}
          alt="Binalogue — creative and production company"
          className="w-full h-auto object-cover block"
          style={{ aspectRatio: '1074/564' }}
        />
      </motion.div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function StorySection() {
  return (
    <section id="story" className="relative py-ds-96 lg:py-ds-128">
      <div className="max-w-(--ds-max-w-content) mx-auto px-ds-24 flex flex-col gap-ds-128">
        <Chapter1 />
        <Chapter2 />
        <Chapter3 />
      </div>
    </section>
  );
}
