import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { SADC_COUNTRIES } from "@/data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function Home() {
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();

  const searchResults = trimmed
    ? SADC_COUNTRIES.flatMap((country) => {
        const matched = country.universities.filter((u) =>
          u.name.toLowerCase().includes(trimmed)
        );
        return matched.length > 0 ? [{ country, matched }] : [];
      })
    : [];

  const totalMatches = searchResults.reduce((sum, r) => sum + r.matched.length, 0);

  return (
    <div className="min-h-[100dvh] w-full px-6 py-16 md:px-12 md:py-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12 md:mb-16 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-6xl text-primary mb-6 tracking-tight">
          Southern African<br />Development Community
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-sans max-w-2xl">
          A definitive guide to higher education institutions across the SADC region. Explore academic excellence spanning fifteen nations.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 max-w-xl"
      >
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            size={18}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search universities across all countries..."
            data-testid="input-search-universities"
            className="w-full pl-11 pr-4 py-3 rounded-sm border border-border bg-card text-foreground placeholder:text-muted-foreground font-sans text-base focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>
        {trimmed && (
          <p className="mt-2 text-sm text-muted-foreground font-sans">
            {totalMatches === 0
              ? "No universities found"
              : `${totalMatches} result${totalMatches !== 1 ? "s" : ""} across ${searchResults.length} countr${searchResults.length !== 1 ? "ies" : "y"}`}
          </p>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {trimmed ? (
          <motion.div
            key="search-results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {searchResults.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground font-sans">
                No universities match your search.
              </div>
            ) : (
              searchResults.map(({ country, matched }) => (
                <div
                  key={country.id}
                  className="border border-border bg-card rounded-sm p-6"
                  data-testid={`search-result-country-${country.id}`}
                >
                  <Link
                    href={`/country/${country.id}`}
                    className="flex items-center gap-3 mb-4 group"
                    data-testid={`link-search-country-${country.id}`}
                  >
                    <span className="text-3xl">{country.flag}</span>
                    <h2 className="text-xl text-foreground font-medium group-hover:text-primary transition-colors">
                      {country.name}
                    </h2>
                  </Link>
                  <ul className="space-y-2">
                    {matched.map((u) => {
                      const idx = u.name.toLowerCase().indexOf(trimmed);
                      const before = u.name.slice(0, idx);
                      const match = u.name.slice(idx, idx + trimmed.length);
                      const after = u.name.slice(idx + trimmed.length);
                      return (
                        <li
                          key={u.name}
                          className="font-sans text-muted-foreground text-base pl-2 border-l-2 border-primary/30"
                          data-testid={`search-result-university-${u.name}`}
                        >
                          {before}
                          <mark className="bg-primary/15 text-primary rounded-sm px-0.5 font-medium">
                            {match}
                          </mark>
                          {after}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
          </motion.div>
        ) : (
          <motion.div
            key="country-grid"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SADC_COUNTRIES.map((country) => (
              <motion.div key={country.id} variants={item}>
                <Link
                  href={`/country/${country.id}`}
                  className="block group h-full"
                  data-testid={`link-country-${country.id}`}
                >
                  <div className="h-full border border-border bg-card hover:bg-muted/30 hover:border-primary/40 transition-colors duration-300 p-8 flex flex-col justify-between items-start rounded-sm hover-elevate">
                    <div>
                      <div className="text-5xl mb-6 shadow-sm inline-block rounded-sm overflow-hidden" aria-hidden="true">
                        {country.flag}
                      </div>
                      <h2 className="text-2xl text-foreground font-medium group-hover:text-primary transition-colors">
                        {country.name}
                      </h2>
                    </div>
                    <div className="mt-8 font-sans text-sm tracking-wider text-muted-foreground uppercase font-medium">
                      {country.universities.length} Institutions
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
