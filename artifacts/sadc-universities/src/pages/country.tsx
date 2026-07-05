import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, Bookmark, MapPin, Globe, Languages } from "lucide-react";
import { SADC_COUNTRIES } from "@/data";
import type { University } from "@/data";
import { useFavorites } from "@/hooks/useFavorites";
import UniversityModal from "@/components/UniversityModal";
import NotFound from "./not-found";

export default function Country() {
  const params = useParams();
  const country = SADC_COUNTRIES.find((c) => c.id === params.id);
  const { isFavorite, toggle } = useFavorites();
  const [selected, setSelected] = useState<University | null>(null);

  if (!country) {
    return <NotFound />;
  }

  return (
    <>
      <div className="min-h-[100dvh] w-full px-6 py-12 md:px-12 md:py-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-12 flex items-center justify-between"
        >
          <Link
            href="/"
            className="inline-flex items-center text-sm font-sans font-medium text-muted-foreground hover:text-primary transition-colors gap-2"
            data-testid="link-back"
          >
            <ArrowLeft size={16} />
            Back to Directory
          </Link>
          <Link
            href="/favorites"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-muted-foreground hover:text-primary transition-colors"
            data-testid="link-favorites"
          >
            <Bookmark size={15} />
            Saved
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Hero */}
          <div className="flex items-center gap-6 mb-10 border-b border-border pb-10">
            <div className="text-6xl md:text-8xl shadow-sm rounded-sm overflow-hidden" aria-hidden="true">
              {country.flag}
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl text-primary font-serif tracking-tight">
                {country.name}
              </h1>
              <p className="mt-3 text-lg font-sans text-muted-foreground">
                {country.universities.length} Registered Institutions
              </p>
            </div>
          </div>

          {/* Country info section */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14"
            data-testid="country-info-section"
          >
            <div className="bg-card border border-border rounded-sm p-5 flex items-start gap-3">
              <MapPin size={16} className="text-primary/60 mt-0.5 shrink-0" />
              <div>
                <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Capital
                </p>
                <p className="font-sans text-base font-medium text-foreground" data-testid="country-capital">
                  {country.capital}
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-sm p-5 flex items-start gap-3">
              <Globe size={16} className="text-primary/60 mt-0.5 shrink-0" />
              <div>
                <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Region
                </p>
                <p className="font-sans text-base font-medium text-foreground" data-testid="country-region">
                  {country.region}
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-sm p-5 flex items-start gap-3">
              <Languages size={16} className="text-primary/60 mt-0.5 shrink-0" />
              <div>
                <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Languages
                </p>
                <div className="flex flex-wrap gap-1 mt-1" data-testid="country-languages">
                  {country.languages.map((lang) => (
                    <span
                      key={lang}
                      className="inline-block text-xs font-sans bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Universities list */}
          <div className="space-y-6">
            <h2 className="text-2xl text-foreground font-serif mb-8">Universities & Colleges</h2>

            <div className="grid grid-cols-1 gap-4">
              {country.universities.map((uni, idx) => {
                const fav = isFavorite(uni.name);
                return (
                  <motion.div
                    key={uni.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                    className="bg-card border border-border rounded-sm flex items-center gap-4 hover:border-primary/30 transition-colors group"
                    data-testid={`card-university-${idx}`}
                  >
                    <button
                      onClick={() => setSelected(uni)}
                      data-testid={`button-open-modal-${idx}`}
                      className="flex-1 flex items-center gap-4 p-6 text-left"
                    >
                      <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center text-primary/70 shrink-0">
                        <Building2 size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-sans text-lg text-foreground font-medium leading-snug">
                          {uni.name}
                        </div>
                        <div className="font-sans text-xs text-muted-foreground mt-1 flex items-center gap-2">
                          <span>{uni.type}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/40 inline-block" />
                          <span>Est. {uni.founded}</span>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() =>
                        toggle({
                          universityName: uni.name,
                          countryId: country.id,
                          countryName: country.name,
                          countryFlag: country.flag,
                        })
                      }
                      aria-label={fav ? `Remove ${uni.name} from saved` : `Save ${uni.name}`}
                      data-testid={`button-favorite-${idx}`}
                      className={`pr-6 p-2 rounded-sm transition-all ${
                        fav
                          ? "text-primary"
                          : "text-muted-foreground/30 opacity-0 group-hover:opacity-100 hover:text-primary"
                      }`}
                    >
                      <Bookmark size={18} className={fav ? "fill-primary" : ""} />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <UniversityModal
        university={selected}
        country={selected ? country : null}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
