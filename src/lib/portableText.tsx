import {PortableText as PortableTextReact} from '@portabletext/react'
import {PortableTextBlock} from '@portabletext/types'
import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'

// Custom components for Portable Text rendering
interface ImageValue {
  asset?: {
    _ref: string
  }
  alt?: string
}

const components = {
  types: {
    image: ({value}: {value: ImageValue}) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || 'Image'}
            width={800}
            height={600}
            className="rounded-lg"
          />
        </div>
      )
    },
  },
  marks: {
    link: ({value, children}: {value?: {href?: string}; children?: React.ReactNode}) => {
      if (!value?.href || !children) return null
      const target = value.href.startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({children}: {children?: React.ReactNode}) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({children}: {children?: React.ReactNode}) => (
      <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({children}: {children?: React.ReactNode}) => (
      <h3 className="text-2xl font-semibold mt-4 mb-2">{children}</h3>
    ),
    h4: ({children}: {children?: React.ReactNode}) => (
      <h4 className="text-xl font-semibold mt-3 mb-2">{children}</h4>
    ),
    blockquote: ({children}: {children?: React.ReactNode}) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    normal: ({children}: {children?: React.ReactNode}) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({children}: {children?: React.ReactNode}) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({children}: {children?: React.ReactNode}) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
}

interface PortableTextProps {
  value: PortableTextBlock | PortableTextBlock[]
  className?: string
}

export function PortableText({value, className}: PortableTextProps) {
  return (
    <div className={className}>
      <PortableTextReact value={value} components={components} />
    </div>
  )
}
