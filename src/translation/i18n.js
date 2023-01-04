import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en'
import pt from './pt'

export const resources = {
    en, pt
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'pt',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
})