import { Component, type ComponentType, type ErrorInfo, type FC, type ReactNode } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface FallbackProps {
  error: Error
  resetError: () => void
}

const DefaultFallback: FC<FallbackProps> = ({ error, resetError }) => (
  <div role="alert" style={{ padding: '1.5rem', textAlign: 'center' }}>
    <p style={{ marginBottom: '0.75rem', color: 'var(--color-danger, #e53e3e)' }}>
      Something went wrong: <strong>{error.message}</strong>
    </p>
    <button onClick={resetError} style={{ cursor: 'pointer' }}>
      Try again
    </button>
  </div>
)

class ErrorBoundaryBase extends Component<
  { children: ReactNode; FallbackComponent: ComponentType<FallbackProps> },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Errors are surfaced via the FallbackComponent; hook into an error
    // reporting service here if needed (e.g. Sentry.captureException).
  }

  resetError = () => this.setState({ hasError: false, error: null })

  render() {
    if (this.state.hasError && this.state.error) {
      const { FallbackComponent } = this.props
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />
    }
    return this.props.children
  }
}

/**
 * HOC — wraps any component in an error boundary so rendering errors are caught
 * gracefully instead of crashing the whole page.
 *
 * @param WrappedComponent The component to protect.
 * @param FallbackComponent Optional custom fallback UI; receives `error` and `resetError`.
 *
 * @example
 * const SafeProjects = withErrorBoundary(Projects)
 * const SafeContact  = withErrorBoundary(Contact, MyCustomFallback)
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: ComponentType<P>,
  FallbackComponent: ComponentType<FallbackProps> = DefaultFallback
): FC<P> {
  const WithErrorBoundary: FC<P> = (props) => (
    <ErrorBoundaryBase FallbackComponent={FallbackComponent}>
      <WrappedComponent {...props} />
    </ErrorBoundaryBase>
  )

  WithErrorBoundary.displayName = `WithErrorBoundary(${
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
  })`

  return WithErrorBoundary
}
