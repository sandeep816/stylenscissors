import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {serviceType} from './serviceType'
import {teamMemberType} from './teamMemberType'
import {galleryType} from './galleryType'
import {testimonialType} from './testimonialType'
import {faqType} from './faqType'
import {appointmentType} from './appointmentType'
import {siteSettingsType} from './siteSettingsType'
import {homePageType} from './homePageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Core content types
    blockContentType,
    // Site Configuration
    siteSettingsType,
    homePageType,
    // Blog
    categoryType,
    postType,
    authorType,
    // Salon specific
    serviceType,
    teamMemberType,
    galleryType,
    testimonialType,
    faqType,
    appointmentType,
  ],
}
