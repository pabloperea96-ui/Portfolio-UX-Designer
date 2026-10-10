import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catches JavaScript errors in child components and renders a fallback UI
 * instead of a white screen. Wrap the app (or a route subtree) to contain errors.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleGoHome = (): void => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div
          className="min-h-screen flex flex-col items-center justify-center px-ds-24 py-ds-48 bg-background text-ds-text-primary font-ds-sans"
          role="alert"
        >
          <h1 className="text-ds-text-primary font-medium mb-ds-16" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)' }}>
            Algo salió mal
          </h1>
          <p className="text-ds-text-secondary mb-ds-32 max-w-md text-center ds-text-body-default">
            Ha ocurrido un error inesperado. Puedes recargar la página o volver al inicio.
          </p>
          <div className="flex flex-wrap gap-ds-16 justify-center">
            <button
              type="button"
              onClick={this.handleReload}
              className="ds-text-action-button-df px-ds-32 py-ds-16 rounded-ds-md font-medium transition-colors duration-200"
              style={{
                backgroundColor: 'var(--ds-action-primary)',
                color: 'var(--btn-primary-text)',
              }}
            >
              Recargar página
            </button>
            <button
              type="button"
              onClick={this.handleGoHome}
              className="ds-text-action-button-df px-ds-32 py-ds-16 rounded-ds-md font-medium border border-solid transition-colors duration-200"
              style={{
                borderColor: 'var(--ds-border-subtle)',
                color: 'var(--ds-text-primary)',
                backgroundColor: 'transparent',
              }}
            >
              Ir al inicio
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
