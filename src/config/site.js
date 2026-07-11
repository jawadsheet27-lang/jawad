// ----------------------------------------------------------------------
// EDIT ME - every contact detail and brand constant lives in this file.
//
// whatsappNumber : digits only, international format, no "+" and no spaces
//                  e.g. '96170123456'
// whatsappDisplay: what visitors SEE on the site (any format you like)
// ----------------------------------------------------------------------

export const site = {
  name: 'ORRIS PARFUMS',
  tagline: 'Timeless scents. Crafted with emotion.',
  message: 'Every scent tells a story.',
  domain: 'orrisparfums.com',
  whatsappNumber: '961XXXXXXXX', // <-- replace with real digits, e.g. 96170123456
  whatsappDisplay: '+961 XX XXX XXX',
  email: 'hello@orrisparfums.com',
  instagram: 'orrisparfums',
  delivery: 'Delivery across Beirut & all of Lebanon — then worldwide.',
}

export const instagramUrl = 'https://www.instagram.com/' + site.instagram

export const waLink = (message) =>
  'https://wa.me/' + site.whatsappNumber + '?text=' + encodeURIComponent(message)

export const orderMessage = (productName) =>
  "Hello, I'm interested in ordering " + productName + ' from ORRIS PARFUMS.'
