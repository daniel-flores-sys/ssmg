export default function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-3 flex-shrink-0">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logos */}
        <div className="flex items-center gap-4">
          <img
            src={`${import.meta.env.BASE_URL}usfx-small.png`}
            alt="Universidad San Francisco Xavier"
            className="h-8 w-auto object-contain"
          />
          <img
            src={`${import.meta.env.BASE_URL}dtic-small.png`}
            alt="DTIC"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Info central */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Copyright © 2011 · Dirección de Tecnologías de Información y Comunicación · USFX · SI Versión 2.0
          </p>
          <p className="text-xs text-muted-foreground">
            Soporte Técnico:{' '}
            <a
              href="mailto:dtic.soporte@usfx.bo"
              className="text-primary hover:underline"
            >
              dtic.soporte@usfx.bo
            </a>
          </p>
        </div>

        {/* Derecho reservado */}
        <div className="hidden sm:block w-24" />
      </div>
    </footer>
  )
}
