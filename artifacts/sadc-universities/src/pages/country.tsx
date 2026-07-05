import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, Bookmark, MapPin, Globe, Languages, Printer } from "lucide-react";
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

  useEffect(() => {
    if (!country) return;
    const urlParams = new URLSearchParams(window.location.search);
    const openName = urlParams.get("open");
    if (openName) {
      const uni = country.universities.find((u) => u.name === openName);
      if (uni) setSelected(uni);
    }
  }, [country]);

  if (!country) {
    return <NotFound />;
  }

  return (
    <>
      {/* ── Screen layout ── */}
      <div className="no-print min-h-[100dvh] w-full px-6 py-12 md:px-12 md:py-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-12 flex items-center justify-between gap-4 flex-wrap"
        >
          <Link
            href="/"
            className="inline-flex items-center text-sm font-sans font-medium text-muted-foreground hover:text-primary transition-colors gap-2"
            data-testid="link-back"
          >
            <ArrowLeft size={16} />
            Back to Directory
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              data-testid="button-print"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-border bg-card text-sm font-sans font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              <Printer size={15} />
              Export PDF
            </button>
            <Link
              href="/favorites"
              className="inline-flex items-center gap-2 text-sm font-sans font-medium text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-favorites"
            >
              <Bookmark size={15} />
              Saved
            </Link>
          </div>
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
                <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mb-1">Capital</p>
                <p className="font-sans text-base font-medium text-foreground" data-testid="country-capital">
                  {country.capital}
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-sm p-5 flex items-start gap-3">
              <Globe size={16} className="text-primary/60 mt-0.5 shrink-0" />
              <div>
                <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mb-1">Region</p>
                <p className="font-sans text-base font-medium text-foreground" data-testid="country-region">
                  {country.region}
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-sm p-5 flex items-start gap-3">
              <Languages size={16} className="text-primary/60 mt-0.5 shrink-0" />
              <div>
                <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mb-1">Languages</p>
                <div className="flex flex-wrap gap-1 mt-1" data-testid="country-languages">
                  {country.languages.map((lang) => (
                    <span key={lang} className="inline-block text-xs font-sans bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
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

      {/* ── Print-only layout ── */}
      <div className="print-page hidden print:block">
        <div className="print-header">
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#8b3a2a", fontFamily: "Georgia, serif" }}>
            {country.flag} {country.name}
          </div>
          <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.25rem" }}>
            SADC Universities Guide · {country.universities.length} Registered Institutions
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem", fontSize: "0.8rem", color: "#555" }}>
          <tbody>
            <tr>
              <td style={{ paddingRight: "2rem", paddingBottom: "0.25rem" }}><strong>Capital:</strong> {country.capital}</td>
              <td style={{ paddingRight: "2rem", paddingBottom: "0.25rem" }}><strong>Region:</strong> {country.region}</td>
              <td style={{ paddingBottom: "0.25rem" }}><strong>Languages:</strong> {country.languages.join(", ")}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem", marginTop: "1rem" }}>
          Universities & Colleges
        </div>

        {country.universities.map((uni, idx) => (
          <div key={uni.name} className="print-uni-row">
            <span style={{ fontSize: "0.8rem", color: "#aaa", width: "1.2rem", flexShrink: 0 }}>{idx + 1}</span>
            <span className="print-uni-name">{uni.name}</span>
            <span className="print-uni-meta">{uni.type} · Est. {uni.founded}</span>
            <span className="print-uni-meta" style={{ color: "#8b3a2a" }}>{uni.website.replace("https://", "")}</span>
          </div>
        ))}

        <div className="print-footer">
          SADC Universities Guide · Printed {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>

      <UniversityModal
        university={selected}
        country={selected ? country : null}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
