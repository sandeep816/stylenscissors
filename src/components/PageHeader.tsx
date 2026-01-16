import React from 'react'

export default function PageHeader({ title, description, label }: { title?: string, description?: string, label?: string }) {
  return (
    <section className='pt-32 pb-16 bg-pink-50'>
      <div className='container mx-auto px-4 text-center'>
        <div className='text-center max-w-2xl mx-auto mb-12'>
          {label && <span className='text-pink-500 font-bold tracking-wider uppercase text-sm'>{label}</span>}
          {title && <h2 className='font-display text-4xl md:text-5xl lg:text-6xl text-foreground mt-3 mb-3'>{title}</h2>}
          {description && <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>{description}</p>}
        </div>
      </div>
    </section>
  );
}