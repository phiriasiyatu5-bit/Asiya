import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search, GitCompare, CheckCircle2, Circle, Bookmark, Shuffle } from "lucide-react";
import { SADC_COUNTRIES } from "@/data";
import { useFavorites } from "@/hooks/useFavorites";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

const REGIONS = ["All", "Southern Africa", "East Africa", "Central Africa", "Indian Ocean"] as const;
type Region = typeof REGIONS[number];

export default function Home() {
  const [query, setQuery] = useState("");
  const [compareMode, setCompareMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [region, setRegion] = useState<Region>("Southern Africa");
  const [, navigate] = useLocation();
  const { favorites } = useFavorites();

  const visibleCountries =
    region === "All"
      ? SADC_COUNTRIES
      : SADC_COUNTRIES.filter((c) => c.region === region);

  function goRandom() {
    const pool = visibleCountries;
    const country = pool[Math.floor(Math.random() * pool.length)];
    const uni = country.universities[Math.floor(Math.random() * country.universities.length)];
    navigate(`/country/${country.id}?open=${encodeURIComponent(uni.name)}`);
  }

  const trimmed = query.trim().toLowerCase();

  const searchResults = trimmed
    ? visibleCountries.flatMap((country) => {
        const matched = country.universities.filter((u) =>
          u.name.toLowerCase().includes(trimmed)
        );
        return matched.length > 0 ? [{ country, matched }] : [];
      })
    : [];

  const totalMatches = searchResults.reduce((sum, r) => sum + r.matched.length, 0);

  function toggleCountry(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function startCompare() {
    navigate(`/compare?countries=${selected.join(",")}`);
  }

  function exitCompareMode() {
    setCompareMode(false);
    setSelected([]);
  }

  return (
    <div className="min-h-[100dvh] w-full px-6 py-16 md:px-12 md:py-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12 md:mb-16 text-center md:text-left"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
          <h1 className="text-4xl md:text-6xl text-primary tracking-tight">
            Southern African<br />Development Community
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={goRandom}
              data-testid="button-random-university"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-border bg-card text-sm font-sans font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors shrink-0"
            >
              <Shuffle size={15} />
              Discover
            </button>
            <Link
              href="/favorites"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-border bg-card text-sm font-sans font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors shrink-0"
              data-testid="link-favorites"
            >
              <Bookmark size={15} />
              Saved
              {favorites.length > 0 && (
                <span className="ml-0.5 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground font-sans max-w-2xl">
          A definitive guide to higher education institutions across the SADC region. Explore academic excellence spanning fifteen nations.
        </p>
      </motion.div>

      {/* Region filter */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mb-8 flex flex-wrap gap-2"
        data-testid="region-filter"
      >
        {REGIONS.map((r) => (
          <button
            key={r}
            onClick={() => { setRegion(r); setSelected([]); }}
            data-testid={`filter-region-${r.replace(/\s+/g, "-").toLowerCase()}`}
            className={`px-4 py-1.5 rounded-full border font-sans text-sm font-medium transition-all ${
              region === r
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {r}
          </button>
        ))}
        {region !== "All" && (
          <span className="ml-1 self-center font-sans text-xs text-muted-foreground">
            {visibleCountries.length} countr{visibleCountries.length !== 1 ? "ies" : "y"}
          </span>
        )}
      </motion.div>

      {/* Search + compare row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 flex flex-col sm:flex-row gap-3 max-w-2xl"
      >
        {!compareMode && (
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              size={18}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search universities in ${region === "All" ? "all regions" : region}…`}
              data-testid="input-search-universities"
              className="w-full pl-11 pr-4 py-3 rounded-sm border border-border bg-card text-foreground placeholder:text-muted-foreground font-sans text-base focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
        )}

        {!trimmed && (
          <button
            onClick={compareMode ? exitCompareMode : () => setCompareMode(true)}
            data-testid="button-toggle-compare"
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-sm border font-sans text-sm font-medium transition-all whitespace-nowrap ${
              compareMode
                ? "bg-muted border-border text-muted-foreground hover:text-foreground"
                : "bg-card border-border text-foreground hover:border-primary/50 hover:text-primary"
            }`}
          >
            <GitCompare size={16} />
            {compareMode ? "Cancel" : "Compare Countries"}
          </button>
        )}
      </motion.div>

      {trimmed && (
        <p className="mb-4 text-sm text-muted-foreground font-sans">
          {totalMatches === 0
            ? "No universities found"
            : `${totalMatches} result${totalMatches !== 1 ? "s" : ""} across ${searchResults.length} countr${searchResults.length !== 1 ? "ies" : "y"}`}
        </p>
      )}

      {compareMode && !trimmed && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between flex-wrap gap-4"
        >
          <p className="font-sans text-sm text-muted-foreground">
            {selected.length === 0
              ? "Select two or more countries to compare"
              : `${selected.length} countr${selected.length !== 1 ? "ies" : "y"} selected`}
          </p>
          <AnimatePresence>
            {selected.length >= 2 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={startCompare}
                data-testid="button-compare-selected"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-primary text-primary-foreground font-sans text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <GitCompare size={15} />
                Compare {selected.length} Countries
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {trimmed ? (
          <motion.div
            key={`search-${region}`}
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
            key={`grid-${region}`}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleCountries.map((country) => {
              const isSelected = selected.includes(country.id);
              return (
                <motion.div key={country.id} variants={item}>
                  {compareMode ? (
                    <button
                      onClick={() => toggleCountry(country.id)}
                      data-testid={`button-select-country-${country.id}`}
                      className={`w-full h-full text-left border rounded-sm p-8 flex flex-col justify-between items-start transition-all duration-200 ${
                        isSelected
                          ? "bg-primary/5 border-primary"
                          : "bg-card border-border hover:border-primary/40"
                      }`}
                    >
                      <div className="w-full flex justify-between items-start">
                        <div className="text-5xl mb-6 shadow-sm inline-block rounded-sm overflow-hidden" aria-hidden="true">
                          {country.flag}
                        </div>
                        {isSelected ? (
                          <CheckCircle2 size={20} className="text-primary mt-1 shrink-0" />
                        ) : (
                          <Circle size={20} className="text-muted-foreground/40 mt-1 shrink-0" />
                        )}
                      </div>
                      <h2 className={`text-2xl font-medium transition-colors ${isSelected ? "text-primary" : "text-foreground"}`}>
                        {country.name}
                      </h2>
                      <div className="mt-8 font-sans text-sm tracking-wider text-muted-foreground uppercase font-medium">
                        {country.universities.length} Institutions
                      </div>
                    </button>
                  ) : (
                    <Link
                      href={`/country/${country.id}`}
                      className="block group h-full"
                      data-testid={`link-country-${country.id}`}
                    >
                      <div className="h-full border border-border bg-card hover:bg-muted/30 hover:border-primary/40 transition-colors duration-300 p-8 flex flex-col justify-between items-start rounded-sm">
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
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
