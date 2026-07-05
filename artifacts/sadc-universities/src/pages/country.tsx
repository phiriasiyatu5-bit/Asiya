import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, Bookmark } from "lucide-react";
import { SADC_COUNTRIES } from "@/data";
import { useFavorites } from "@/hooks/useFavorites";
import NotFound from "./not-found";

export default function Country() {
  const params = useParams();
  const country = SADC_COUNTRIES.find((c) => c.id === params.id);
  const { isFavorite, toggle } = useFavorites();

  if (!country) {
    return <NotFound />;
  }

  return (
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
        <div className="flex items-center gap-6 mb-16 border-b border-border pb-12">
          <div className="text-6xl md:text-8xl shadow-sm rounded-sm overflow-hidden" aria-hidden="true">
            {country.flag}
          </div>
          <div>
            <h1 className="text-4xl md:text-6xl text-primary font-serif tracking-tight">
              {country.name}
            </h1>
            <p className="mt-4 text-lg font-sans text-muted-foreground">
              {country.universities.length} Registered Institutions
            </p>
          </div>
        </div>

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
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
                  className="bg-card border border-border p-6 rounded-sm flex items-center gap-4 hover:border-primary/30 transition-colors group"
                  data-testid={`card-university-${idx}`}
                >
                  <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center text-primary/70 shrink-0">
                    <Building2 size={20} />
                  </div>
                  <div className="flex-1 font-sans text-lg text-foreground font-medium">
                    {uni.name}
                  </div>
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
                    className={`p-2 rounded-sm transition-all ${
                      fav
                        ? "text-primary"
                        : "text-muted-foreground/30 opacity-0 group-hover:opacity-100 hover:text-primary"
                    }`}
                  >
                    <Bookmark
                      size={18}
                      className={fav ? "fill-primary" : ""}
                    />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
