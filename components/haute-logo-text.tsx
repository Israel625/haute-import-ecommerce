export function HauteLogoText({ className = "" }: { className?: string }) {
  return (
    <div className={`font-heading font-bold ${className}`}>
      <span className="text-4xl md:text-6xl bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
        HAUTE
      </span>
      <span className="block text-lg md:text-xl text-muted-foreground tracking-widest">
        IMPORT
      </span>
    </div>
  )
}