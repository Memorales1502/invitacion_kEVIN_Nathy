-- Tabla de invitados para la boda de Kevin & Nathaly
CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  passes INTEGER NOT NULL DEFAULT 1,
  confirmed BOOLEAN DEFAULT NULL,
  attending_count INTEGER DEFAULT NULL,
  message TEXT,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Permitir acceso publico para lectura y actualizacion (sin autenticacion requerida)
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Politica para permitir lectura publica por slug
CREATE POLICY "Allow public read by slug" ON guests 
  FOR SELECT USING (true);

-- Politica para permitir actualizacion de confirmacion
CREATE POLICY "Allow public update confirmation" ON guests 
  FOR UPDATE USING (true);

-- Insertar todos los invitados
INSERT INTO guests (name, slug, passes) VALUES
  ('Timoteo Solorzano', 'timoteo-solorzano', 3),
  ('Juan García', 'juan-garcia', 4),
  ('Fernando García', 'fernando-garcia', 5),
  ('Noe Pérez', 'noe-perez', 4),
  ('Josue García', 'josue-garcia', 2),
  ('Carlos García', 'carlos-garcia', 3),
  ('Carlos Andrade', 'carlos-andrade', 4),
  ('Andrea Peréz', 'andrea-perez', 1),
  ('Eleodoro Alvizurez', 'eleodoro-alvizurez', 2),
  ('Enrique Avilé', 'enrique-avile', 2),
  ('Mateo Valdez', 'mateo-valdez', 2),
  ('Irma Alvizurez', 'irma-alvizurez', 1),
  ('Fredy Rodriguez', 'fredy-rodriguez', 2),
  ('Alex Arrieta', 'alex-arrieta', 4),
  ('Jorge Cuque', 'jorge-cuque', 2),
  ('Angela Pirir', 'angela-pirir', 4),
  ('Roberto Ramirez', 'roberto-ramirez', 2),
  ('Victor Ovalle', 'victor-ovalle', 2),
  ('William López', 'william-lopez', 2),
  ('René Soto', 'rene-soto', 2),
  ('Anibal Alvizurez', 'anibal-alvizurez', 3),
  ('Aracely Alvizurez', 'aracely-alvizurez', 2),
  ('Gladys Gonzalez', 'gladys-gonzalez', 1),
  ('Walter Oscal y Juana Oscal', 'walter-juana-oscal', 4),
  ('Gregoria Alvizurez', 'gregoria-alvizurez', 1),
  ('Carmen Polanco', 'carmen-polanco', 2),
  ('Alonzo García', 'alonzo-garcia', 2),
  ('Dani Leon', 'dani-leon', 2),
  ('Mariafernanda Cadenas', 'mariafernanda-cadenas', 1),
  ('Magaly Alvizurez', 'magaly-alvizurez', 2),
  ('Carlos Benitez', 'carlos-benitez', 2),
  ('Eduardo Iboy', 'eduardo-iboy', 2),
  ('Manuel Deocute', 'manuel-deocute', 5),
  ('Manuel Morales', 'manuel-morales', 2),
  ('Brandon Lopez', 'brandon-lopez', 3),
  ('Brian Lopez', 'brian-lopez', 3),
  ('Marvin Lopez', 'marvin-lopez', 2),
  ('Trinidad Raymundo', 'trinidad-raymundo', 1),
  ('Jose Rojo', 'jose-rojo', 2),
  ('Edin Deocute', 'edin-deocute', 3),
  ('Judith Medrano', 'judith-medrano', 2),
  ('Fredy Garcia', 'fredy-garcia', 2),
  ('Jonathan Guzman', 'jonathan-guzman', 2),
  ('Julio Garcia', 'julio-garcia', 2),
  ('Juana Lopez', 'juana-lopez', 1),
  ('Josselyn Lopez', 'josselyn-lopez', 3),
  ('Francisco Lopez', 'francisco-lopez', 2),
  ('Julia Lopez', 'julia-lopez', 1),
  ('Romeo Leon', 'romeo-leon', 1),
  ('Billy Oliva', 'billy-oliva', 2),
  ('Andres Perez', 'andres-perez', 1),
  ('Eladio Morales', 'eladio-morales', 4),
  ('Gustavo Raymundo', 'gustavo-raymundo', 2),
  ('Mirian Donis', 'mirian-donis', 2),
  ('Wendy Caal', 'wendy-caal', 1),
  ('Ana Maria Santos', 'ana-maria-santos', 1),
  ('Alvis Guzman', 'alvis-guzman', 2),
  ('Elian Roldan', 'elian-roldan', 1),
  ('Luis Domingo Garcia', 'luis-domingo-garcia', 2),
  ('Alfredo Alvizurez', 'alfredo-alvizurez', 2),
  ('Rolando Yocute', 'rolando-yocute', 2),
  ('Victor Manuel Orellana', 'victor-manuel-orellana', 2),
  ('Elmer Martinez', 'elmer-martinez', 2),
  ('Eduardo Garcia', 'eduardo-garcia', 2),
  ('Telma Alvarado', 'telma-alvarado', 3),
  ('Jose Pivaral', 'jose-pivaral', 2),
  ('Efrain Hernandez', 'efrain-hernandez', 2),
  ('Mario Arriola', 'mario-arriola', 1),
  ('Sonia Escalante', 'sonia-escalante', 1),
  ('Luis Domingo Lopez', 'luis-domingo-lopez', 2),
  ('Gustavo Garcia', 'gustavo-garcia', 2),
  ('Jose Flores', 'jose-flores', 1),
  ('Luz Ventura', 'luz-ventura', 1),
  ('Lukas', 'lukas', 1),
  ('Estivens Camey', 'estivens-camey', 1)
ON CONFLICT (slug) DO NOTHING;
