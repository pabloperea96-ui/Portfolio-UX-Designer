import { useNavigate } from 'react-router';
import { TechnicalSheet } from '../components/ds/technical-sheet';
import { DesignButton } from '../components/ds/design-button';
import { MotionReveal } from '../components/ds/motion-reveal';

/**
 * 404 page — minimal design matching the portfolio style.
 * Composes TechnicalSheet (centered) for the text block.
 */
export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-ds-24 text-center">
      <MotionReveal trigger="mount">
        <TechnicalSheet
          align="centered"
          subtitle="Error 404"
          title="Página no encontrada"
          description="La página que buscas no existe o ha sido movida."
          hasBadges={false}
          showCta={false}
          className="max-w-md mx-auto"
        >
          <div className="pt-ds-16">
            <DesignButton variant="primary" onClick={() => navigate('/')}>
              Volver al inicio
            </DesignButton>
          </div>
        </TechnicalSheet>
      </MotionReveal>
    </div>
  );
}
