// ============================================
// LISTA DE INVITADOS - EDITA AQUI TUS INVITADOS
// ============================================
// Copia los datos de tu Google Sheets aqui
// Formato: nombre del invitado/familia y numero de pases
//
// El "slug" se genera automaticamente del nombre (sin acentos, en minusculas, con guiones)
// Por ejemplo: "Juan Pérez" -> juanperez.com/invitado/juan-perez
//
// IMPORTANTE: El slug debe ser unico para cada invitado

export interface Guest {
  name: string        // Nombre que aparecera en la invitacion
  slug: string        // URL unica (sin espacios, minusculas, con guiones)
  passes: number      // Numero de pases/personas que pueden asistir
  message?: string    // Mensaje personalizado opcional
}

// Funcion para generar slug automaticamente
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
    .replace(/[^a-z0-9\s-]/g, "")    // Solo letras, numeros, espacios y guiones
    .trim()
    .replace(/\s+/g, "-")            // Espacios a guiones
    .replace(/-+/g, "-")             // Multiples guiones a uno solo
}

// ============================================
// LISTA DE 90 INVITADOS - BODA KEVIN & NATHALY
// ============================================
export const GUESTS: Guest[] = [
  { name: "Timoteo Solorzano", slug: "timoteo-solorzano", passes: 3 },
  { name: "Juan García", slug: "juan-garcia", passes: 2 },
  { name: "Briseida García", slug: "briseida-garcia", passes: 2 },
  { name: "Fernando García", slug: "fernando-garcia", passes: 5 },
  { name: "Noe Pérez", slug: "noe-perez", passes: 4 },
  { name: "Josue García", slug: "josue-garcia", passes: 2 },
  { name: "Carlos García", slug: "carlos-garcia", passes: 3 },
  { name: "Carlos Andrade", slug: "carlos-andrade", passes: 4 },
  { name: "Andrea Peréz", slug: "andrea-perez", passes: 1 },
  { name: "Eleodoro Alvizurez", slug: "eleodoro-alvizurez", passes: 2 },
  { name: "Enrique Avilé", slug: "enrique-avile", passes: 2 },
  { name: "Mateo Valdez", slug: "mateo-valdez", passes: 2 },
  { name: "Irma Alvizurez", slug: "irma-alvizurez", passes: 1 },
  { name: "Fredy Rodriguez", slug: "fredy-rodriguez", passes: 2 },
  { name: "Alex Arrieta", slug: "alex-arrieta", passes: 4 },
  { name: "Jorge Cuque", slug: "jorge-cuque", passes: 2 },
  { name: "Angela Pirir", slug: "angela-pirir", passes: 4 },
  { name: "Roberto Ramirez", slug: "roberto-ramirez", passes: 2 },
  { name: "Victor Ovalle", slug: "victor-ovalle", passes: 2 },
  { name: "William López", slug: "william-lopez", passes: 3 },
  { name: "René Soto", slug: "rene-soto", passes: 2 },
  { name: "Anibal Alvizurez", slug: "anibal-alvizurez", passes: 3 },
  { name: "Aracely Alvizurez", slug: "aracely-alvizurez", passes: 2 },
  { name: "Gladys Gonzalez", slug: "gladys-gonzalez", passes: 1 },
  { name: "Walter Oscal y Juana Oscal", slug: "walter-juana-oscal", passes: 4 },
  { name: "Gregoria Alvizurez", slug: "gregoria-alvizurez", passes: 1 },
  { name: "Carmen Polanco", slug: "carmen-polanco", passes: 2 },
  { name: "Alonzo García", slug: "alonzo-garcia", passes: 2 },
  { name: "Dani Leon", slug: "dani-leon", passes: 2 },
  { name: "Maria Fernanda Cadenas", slug: "maria-fernanda-cadenas", passes: 1 },
  { name: "Magaly Alvizurez", slug: "magaly-alvizurez", passes: 2 },
  { name: "Carlos Benitez", slug: "carlos-benitez", passes: 2 },
  { name: "Eduardo Iboy", slug: "eduardo-iboy", passes: 3 },
  { name: "Manuel Deocute", slug: "manuel-deocute", passes: 5 },
  { name: "Manuel Morales", slug: "manuel-morales", passes: 2 },
  { name: "Brandon Lopez", slug: "brandon-lopez", passes: 3 },
  { name: "Brian Lopez", slug: "brian-lopez", passes: 3 },
  { name: "Marvin Lopez", slug: "marvin-lopez", passes: 2 },
  { name: "Trinidad Raymundo", slug: "trinidad-raymundo", passes: 1 },
  { name: "Jose Rojo", slug: "jose-rojo", passes: 3 },
  { name: "Edin Deocute", slug: "edin-deocute", passes: 3 },
  { name: "Judith Medrano", slug: "judith-medrano", passes: 2 },
  { name: "Fredy Garcia", slug: "fredy-garcia", passes: 3 },
  { name: "Jonathan Guzman", slug: "jonathan-guzman", passes: 3 },
  { name: "Julio Garcia", slug: "julio-garcia", passes: 2 },
  { name: "Juana Lopez", slug: "juana-lopez", passes: 1 },
  { name: "Josselyn Lopez", slug: "josselyn-lopez", passes: 3 },
  { name: "Francisco Lopez", slug: "francisco-lopez", passes: 2 },
  { name: "Julia Lopez", slug: "julia-lopez", passes: 1 },
  { name: "Romeo Leon", slug: "romeo-leon", passes: 1 },
  { name: "Billy Oliva", slug: "billy-oliva", passes: 2 },
  { name: "Andres Perez", slug: "andres-perez", passes: 1 },
  { name: "Eladio Morales", slug: "eladio-morales", passes: 2 },
  { name: "Gustavo Raymundo", slug: "gustavo-raymundo", passes: 2 },
  { name: "Mirian Donis", slug: "mirian-donis", passes: 2 },
  { name: "Wendy Caal", slug: "wendy-caal", passes: 1 },
  { name: "Ana Maria Santos", slug: "ana-maria-santos", passes: 1 },
  { name: "Alvis Guzman", slug: "alvis-guzman", passes: 2 },
  { name: "Elian Roldan", slug: "elian-roldan", passes: 1 },
  { name: "Luis Domingo Garcia", slug: "luis-domingo-garcia", passes: 2 },
  { name: "Alfredo Alvizurez", slug: "alfredo-alvizurez", passes: 2 },
  { name: "Rolando Yocute", slug: "rolando-yocute", passes: 2 },
  { name: "Victor Manuel Orellana", slug: "victor-manuel-orellana", passes: 2 },
  { name: "Elmer Martinez", slug: "elmer-martinez", passes: 2 },
  { name: "Eduardo Garcia", slug: "eduardo-garcia", passes: 2 },
  { name: "Telma Alvarado", slug: "telma-alvarado", passes: 3 },
  { name: "Jose Pivaral", slug: "jose-pivaral", passes: 3 },
  { name: "Efrain Hernandez", slug: "efrain-hernandez", passes: 2 },
  { name: "Mario Arriola", slug: "mario-arriola", passes: 1 },
  { name: "Sonia Escalante", slug: "sonia-escalante", passes: 1 },
  { name: "Luis Domingo Lopez", slug: "luis-domingo-lopez", passes: 2 },
  { name: "Gustavo Garcia", slug: "gustavo-garcia", passes: 2 },
  { name: "Jose Flores", slug: "jose-flores", passes: 1 },
  { name: "Luz Ventura", slug: "luz-ventura", passes: 1 },
  { name: "Lukas", slug: "lukas", passes: 1 },
  { name: "Estivens Camey", slug: "estivens-camey", passes: 1 },
  { name: "Mauricio Sipaque", slug: "mauricio-sipaque", passes: 1 },
  { name: "Sergio Morales", slug: "sergio-morales", passes: 1 },
  { name: "Ervin Morales", slug: "ervin-morales", passes: 1 },
  { name: "Juan Carlos Alvizurez", slug: "juan-carlos-alvizurez", passes: 2 },
  { name: "Leo Mijangos", slug: "leo-mijangos", passes: 2 },
  { name: "Vanessa Cisne", slug: "vanessa-cisne", passes: 1 },
  { name: "Jorge Cuque Jr", slug: "jorge-cuque-jr", passes: 1 },
  { name: "Mario Alvarado", slug: "mario-alvarado", passes: 2 },
  { name: "Edgar Alvizurez", slug: "edgar-alvizurez", passes: 2 },
  { name: "Luis Oscal", slug: "luis-oscal", passes: 1 },
  { name: "Graciela Garcia", slug: "graciela-garcia", passes: 1 },
  { name: "Maria Paiz", slug: "maria-paiz", passes: 1 },
  { name: "Joaquin Reyes", slug: "joaquin-reyes", passes: 2 },
  { name: "Esvin Joque", slug: "esvin-joque", passes: 2 },
  { name: "Joel Raymundo", slug: "joel-raymundo", passes: 1 },
  { name: "José Pivaral y Esposa", slug: "pivaral-jose", passes: 2 },
  { name: "Marco López, Esposa e Hija", slug: "marco-lopez", passes: 3 },
  { name: "Alex García", slug: "Alex-garcía", passes: 1 },
  { name: "Marco López, Esposa e Hija", slug: "marco-lopez", passes: 3 },
  { name: "Enrique García y Esposa", slug: "enrique-garcía", passes: 2 },
  { name: "Alex Alicea", slug: "alex-alicea", passes: 1 },
  
]

// Funcion para buscar un invitado por su slug
export function getGuestBySlug(slug: string): Guest | undefined {
  return GUESTS.find(guest => guest.slug === slug)
}

// Funcion para obtener todos los slugs (para generateStaticParams)
export function getAllGuestSlugs(): string[] {
  return GUESTS.map(guest => guest.slug)
}
