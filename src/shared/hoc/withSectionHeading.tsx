import { motion } from 'framer-motion'
import { type ComponentType, type FC } from 'react'

export interface SectionHeadingConfig {
  /** HTML id for the wrapping <section> element */
  sectionId: string
  /** Plain text that appears before the gradient word */
  prefix: string
  /** The word rendered in the accent gradient colour */
  gradient: string
  /** Optional extra className for the <section> wrapper */
  className?: string
}

/**
 * HOC — wraps a content component in a `<section>` element that includes
 * an animated gradient section heading above the wrapped content.
 *
 * @example
 * const Projects = withSectionHeading(ProjectsContent, {
 *   sectionId: 'portfolio',
 *   prefix: 'Featured',
 *   gradient: 'Projects',
 * })
 */
export function withSectionHeading<P extends object>(
  WrappedComponent: ComponentType<P>,
  config: SectionHeadingConfig
): FC<P> {
  const { sectionId, prefix, gradient, className } = config

  const WithSectionHeading: FC<P> = (props) => (
    <section id={sectionId} className={`section${className ? ` ${className}` : ''}`}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {prefix} <span className="section-title-gradient">{gradient}</span>
      </motion.h2>

      <WrappedComponent {...props} />
    </section>
  )

  WithSectionHeading.displayName = `WithSectionHeading(${
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
  })`

  return WithSectionHeading
}
