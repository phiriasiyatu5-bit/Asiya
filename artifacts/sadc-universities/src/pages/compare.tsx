import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Building2 } from "lucide-react";
import { SADC_COUNTRIES } from "@/data";

export default function Compare() {
  const params = new URLSearchParams(window.location.search);
  const ids = (params.get("countries") ?? "").split(",").filter(Boolean);
  const countries = ids
    .map((id) => SADC_COUNTRIES.find((c) => c.id === id))
    .filter(Boolean) as typeof SADC_COUNTRIES;

  if (countries.length < 2) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-muted-foreground font-sans mb-6">
          Select at least two countries to compare.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-sans font-medium text-primary hover:opacity-80 transition-opacity"
          data-testid="link-back-empty"
        >
          <ArrowLeft size={16} />
          Back to Directory
        </Link>
      </div>
    );
  }

  const maxUnis = Math.max(...countries.map((c) => c.universities.length));

  return (
    <div className="min-h-[100dvh] w-full px-6 py-12 md:px-12 md:py-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-10"
      >
        <Link
          href="/"
          className="inline-flex items-center text-sm font-sans font-medium text-muted-foreground hover:text-primary transition-colors gap-2"
          data-testid="link-back"
        >
          <ArrowLeft size={16} />
          Back to Directory
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-5xl text-primary tracking-tight mb-2">
          Comparing {countries.length} Countries
        </h1>
        <p className="text-muted-foreground font-sans">
          {countries.map((c) => c.name).join(" · ")}
        </p>
      </motion.div>

      {/* Summary bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid gap-4 mb-10"
        style={{ gridTemplateColumns: `repeat(${countries.length}, minmax(0, 1fr))` }}
      >
        {countries.map((country, i) => (
          <div
            key={country.id}
            className="border border-border bg-card rounded-sm p-5 text-center"
            data-testid={`summary-card-${country.id}`}
          >
            <div className="text-4xl mb-3">{country.flag}</div>
            <Link
              href={`/country/${country.id}`}
              className="font-medium text-foreground hover:text-primary transition-colors block leading-tight mb-1"
              data-testid={`link-compare-country-${country.id}`}
            >
              {country.name}
            </Link>
            <div className="font-sans text-2xl font-bold text-primary mt-2">
              {country.universities.length}
            </div>
            <div className="font-sans text-xs text-muted-foreground uppercase tracking-wider mt-1">
              Institutions
            </div>
            {/* bar chart */}
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(country.universities.length / maxUnis) * 100}%` }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                data-testid={`bar-${country.id}`}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Side-by-side university lists */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid gap-6"
        style={{ gridTemplateColumns: `repeat(${countries.length}, minmax(0, 1fr))` }}
      >
        {countries.map((country) => (
          <div key={country.id} data-testid={`column-${country.id}`}>
            <h2 className="font-serif text-lg text-foreground mb-4 pb-3 border-b border-border flex items-center gap-2">
              <span>{country.flag}</span>
              {country.name}
            </h2>
            <ul className="space-y-3">
              {country.universities.map((uni, idx) => (
                <motion.li
                  key={uni.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + idx * 0.04 }}
                  className="flex items-start gap-3 font-sans text-sm text-muted-foreground"
                  data-testid={`uni-${country.id}-${idx}`}
                >
                  <Building2 size={15} className="mt-0.5 shrink-0 text-primary/50" />
                  {uni.name}
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
