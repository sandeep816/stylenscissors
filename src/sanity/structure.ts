import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Style & Scissors')
    .items([
      // Site Configuration
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Home Page')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.divider(),
      // Main Content
      S.listItem()
        .title('Services')
        .child(S.documentTypeList('service').title('Services')),
      S.listItem()
        .title('Team Members')
        .child(S.documentTypeList('teamMember').title('Team Members')),
      S.listItem()
        .title('Gallery')
        .child(S.documentTypeList('gallery').title('Gallery Items')),
      S.listItem()
        .title('Testimonials')
        .child(S.documentTypeList('testimonial').title('Testimonials')),
      S.listItem()
        .title('Appointments')
        .child(S.documentTypeList('appointment').title('Appointments')),
      S.divider(),
      // Blog
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Posts')
                .child(S.documentTypeList('post').title('Posts')),
              S.listItem()
                .title('Categories')
                .child(S.documentTypeList('category').title('Categories')),
              S.listItem()
                .title('Authors')
                .child(S.documentTypeList('author').title('Authors')),
            ])
        ),
      S.divider(),
      // FAQ
      S.listItem()
        .title('FAQ')
        .child(S.documentTypeList('faq').title('FAQ Items')),
      S.divider(),
      // Other document types
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            'siteSettings',
            'homePage',
            'service',
            'teamMember',
            'gallery',
            'testimonial',
            'appointment',
            'post',
            'category',
            'author',
            'faq',
            'blockContent',
          ].includes(item.getId()!),
      ),
    ])
