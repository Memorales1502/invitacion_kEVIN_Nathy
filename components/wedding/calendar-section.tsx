"use client"

const DAYS_OF_WEEK = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]
const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

interface CalendarSectionProps {
  date: Date
}

export function CalendarSection({ date }: CalendarSectionProps) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const weddingDay = date.getDate()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  
  const monthName = `${MONTHS[month]} ${year}`
  
  const days: (number | null)[] = []
  
  // Dias vacios antes del primer dia del mes
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  
  // Dias del mes
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  // Obtener el dia de la semana
  const dayOfWeek = DAYS_OF_WEEK[date.getDay()]
  const dayNum = date.getDate()
  const monthText = MONTHS[month]

  return (
    <section className="py-20 px-4 bg-white/40 backdrop-blur-sm">
      <div className="max-w-md mx-auto text-center">
        <h3 className="font-[family-name:var(--font-script)] text-4xl md:text-5xl text-[#c9a45c] mb-8">
          {monthName}
        </h3>

        <div className="bg-white/70 rounded-xl shadow-lg p-6 border border-[#c9a45c]/20">
          {/* Dias de la semana */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {DAYS_OF_WEEK.map((day) => (
              <div 
                key={day} 
                className={`text-sm font-semibold uppercase tracking-wider ${
                  day === "Vie" ? "text-[#c9a45c] font-bold" : "text-[#5a4a3a]"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Dias del mes */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const isWeddingDay = day === weddingDay
              
              return (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center text-base relative
                    ${day ? 'text-[#5a4a3a]' : ''}
                    ${isWeddingDay ? 'font-bold' : 'font-medium'}
                  `}
                >
                  {day && (
                    <>
                      {isWeddingDay ? (
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          {/* Circulo dorado destacado */}
                          <div className="absolute inset-0 bg-[#c9a45c] rounded-full shadow-lg" />
                          <span className="relative z-10 text-white font-bold text-xl">
                            {day}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#5a4a3a]">{day}</span>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>

          {/* Leyenda - VIERNES resaltado y fecha grande */}
          <div className="mt-6 pt-4 border-t border-[#c9a45c]/20">
            <p className="text-2xl md:text-3xl text-[#5a4a3a] font-medium">
              <span className="font-bold text-[#c9a45c] uppercase">Viernes</span>, {dayNum} de {monthText} de {year}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
