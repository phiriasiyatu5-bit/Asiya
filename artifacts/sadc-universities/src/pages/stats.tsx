import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, GraduationCap, BookOpen } from "lucide-react";
import { SADC_COUNTRIES } from "@/data";

const allUniversities = SADC_COUNTRIES.flatMap((c) =>
  c.universities.map((u) => ({ ...u, country: c }))
);

const total = allUniversities.length;
const byType = {
  Public: allUniversities.filter((u) => u.type === "Public").length,
  Private: allUniversities.filter((u) => u.type === "Private").length,
  Technical: allUniversities.filter((u) => u.type === "Technical").length,
};

const ranked = [...SADC_COUNTRIES]
  .sort((a, b) => b.universities.length - a.universities.length);

const oldest = [...allUniversities].sort((a, b) => a.founded - b.founded)[0];
const newest = [...allUniversities].sort((a, b) => b.founded - a.founded)[0];

const avgFounded = Math.round(
  allUniversities.reduce((sum, u) => sum + u.founded, 0) / total
);

const TYPE_CONFIG = {
  Public: {
    color: "bg-blue-500",
    light: "bg-blue-50 border-blue-200 text-blue-700",
    icon: <Building2 size={18} />,
  },
  Private: {
    color: "bg-amber-500",
    light: "bg-amber-50 border-amber-200 text-amber-700",
    icon: <BookOpen size={18} />,
  },
  Technical: {
    color: "bg-emerald-500",
    light: "bg-emerald-50 border-emerald-200 text-emerald-700",
    icon: <GraduationCap size={18} />,
  },
};

const maxCount = ranked[0].universities.length;

export default function Stats() {
  return (
    <div className="min-h-[100dvh] w-full px-6 py-12 md:px-12 md:py-20 max-w-4xl mx-auto">
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
        className="mb-12"
      >
        <h1 className="text-3xl md:text-5xl text-primary tracking-tight mb-2">
          SADC at a Glance
        </h1>
        <p className="text-muted-foreground font-sans">
          Higher education across {SADC_COUNTRIES.length} member states
        </p>
      </motion.div>

      {/* Top stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
      >
        {[
          { label: "Total Institutions", value: total },
          { label: "Member States", value: SADC_COUNTRIES.length },
          { label: "Avg. Founded", value: avgFounded },
          { label: "Oldest Founded", value: oldest.founded },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-sm p-5 text-center"
            data-testid={`stat-card-${i}`}
          >
            <div className="text-3xl font-serif font-medium text-primary mb-1">
              {stat.value}
            </div>
            <div className="font-sans text-xs text-muted-foreground uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Type breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mb-12"
      >
        <h2 className="font-serif text-2xl text-foreground mb-6">By Institution Type</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {(["Public", "Private", "Technical"] as const).map((type) => {
            const cfg = TYPE_CONFIG[type];
            const count = byType[type];
            const pct = Math.round((count / total) * 100);
            return (
              <div
                key={type}
                className={`border rounded-sm p-5 ${cfg.light}`}
                data-testid={`type-card-${type.toLowerCase()}`}
              >
                <div className="flex items-center gap-2 mb-3 opacity-70">
                  {cfg.icon}
                  <span className="font-sans text-sm font-medium uppercase tracking-wider">
                    {type}
                  </span>
                </div>
                <div className="text-4xl font-serif font-medium mb-1">{count}</div>
                <div className="font-sans text-sm opacity-70">{pct}% of total</div>
                <div className="mt-3 h-1.5 bg-black/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${cfg.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Country ranking */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="font-serif text-2xl text-foreground mb-6">Countries by Institution Count</h2>
        <div className="space-y-3">
          {ranked.map((country, idx) => {
            const pct = (country.universities.length / maxCount) * 100;
            return (
              <motion.div
                key={country.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.25 + idx * 0.04 }}
                data-testid={`ranking-row-${country.id}`}
              >
                <Link
                  href={`/country/${country.id}`}
                  className="flex items-center gap-4 group"
                >
                  <span className="font-sans text-sm text-muted-foreground w-5 text-right shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xl shrink-0">{country.flag}</span>
                  <span className="font-sans text-sm font-medium text-foreground group-hover:text-primary transition-colors w-36 shrink-0 truncate">
                    {country.name}
                  </span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary/70 rounded-full group-hover:bg-primary transition-colors"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: 0.3 + idx * 0.04, ease: "easeOut" }}
                    />
                  </div>
                  <span className="font-sans text-sm font-medium text-foreground w-6 text-right shrink-0">
                    {country.universities.length}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Notable facts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h2 className="font-serif text-2xl text-foreground mb-6">Notable Facts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-sm p-5" data-testid="fact-oldest">
            <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mb-2">Oldest Institution</p>
            <p className="font-medium text-foreground">{oldest.name}</p>
            <p className="font-sans text-sm text-muted-foreground mt-1">
              {oldest.country.flag} {oldest.country.name} · Est. {oldest.founded}
            </p>
          </div>
          <div className="bg-card border border-border rounded-sm p-5" data-testid="fact-newest">
            <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mb-2">Most Recently Founded</p>
            <p className="font-medium text-foreground">{newest.name}</p>
            <p className="font-sans text-sm text-muted-foreground mt-1">
              {newest.country.flag} {newest.country.name} · Est. {newest.founded}
            </p>
          </div>
          <div className="bg-card border border-border rounded-sm p-5" data-testid="fact-most">
            <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mb-2">Most Institutions</p>
            <p className="font-medium text-foreground">{ranked[0].name}</p>
            <p className="font-sans text-sm text-muted-foreground mt-1">
              {ranked[0].flag} {ranked[0].universities.length} institutions
            </p>
          </div>
          <div className="bg-card border border-border rounded-sm p-5" data-testid="fact-least">
            <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mb-2">Fewest Institutions</p>
            <p className="font-medium text-foreground">{ranked[ranked.length - 1].name}</p>
            <p className="font-sans text-sm text-muted-foreground mt-1">
              {ranked[ranked.length - 1].flag} {ranked[ranked.length - 1].universities.length} institution
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
