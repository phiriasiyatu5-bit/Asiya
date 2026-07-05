import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Bookmark, Building2, Trash2 } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { SADC_COUNTRIES } from "@/data";

export default function Favorites() {
  const { favorites, toggle, clear } = useFavorites();

  const grouped = SADC_COUNTRIES.flatMap((country) => {
    const favs = favorites.filter((f) => f.countryId === country.id);
    return favs.length > 0 ? [{ country, favs }] : [];
  });

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
        className="flex items-start justify-between gap-4 mb-10 flex-wrap"
      >
        <div>
          <h1 className="text-3xl md:text-5xl text-primary tracking-tight mb-2 flex items-center gap-3">
            <Bookmark size={32} className="text-primary/70 shrink-0" />
            Saved Institutions
          </h1>
          <p className="text-muted-foreground font-sans">
            {favorites.length === 0
              ? "No saved institutions yet"
              : `${favorites.length} institution${favorites.length !== 1 ? "s" : ""} across ${grouped.length} countr${grouped.length !== 1 ? "ies" : "y"}`}
          </p>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={clear}
            data-testid="button-clear-favorites"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-border bg-card text-sm font-sans text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors"
          >
            <Trash2 size={14} />
            Clear all
          </button>
        )}
      </motion.div>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-24 text-center"
        >
          <Bookmark size={40} className="mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground font-sans text-lg mb-2">Nothing saved yet</p>
          <p className="text-muted-foreground/60 font-sans text-sm max-w-xs mx-auto">
            Open any country and tap the bookmark icon next to a university to save it here.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-sm font-sans font-medium text-primary hover:opacity-80 transition-opacity"
            data-testid="link-browse"
          >
            Browse countries
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-8">
          <AnimatePresence>
            {grouped.map(({ country, favs }) => (
              <motion.div
                key={country.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                data-testid={`favorites-group-${country.id}`}
              >
                <Link
                  href={`/country/${country.id}`}
                  className="flex items-center gap-3 mb-4 group"
                  data-testid={`link-favorites-country-${country.id}`}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <h2 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                    {country.name}
                  </h2>
                </Link>

                <ul className="space-y-3">
                  <AnimatePresence>
                    {favs.map((fav, idx) => (
                      <motion.li
                        key={fav.universityName}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.04 }}
                        className="bg-card border border-border p-5 rounded-sm flex items-center gap-4 group/item"
                        data-testid={`favorite-item-${idx}`}
                      >
                        <div className="h-9 w-9 bg-muted rounded-full flex items-center justify-center text-primary/70 shrink-0">
                          <Building2 size={18} />
                        </div>
                        <span className="flex-1 font-sans text-base text-foreground font-medium">
                          {fav.universityName}
                        </span>
                        <button
                          onClick={() => toggle(fav)}
                          data-testid={`button-remove-favorite-${idx}`}
                          className="opacity-0 group-hover/item:opacity-100 transition-opacity p-1.5 rounded-sm hover:bg-muted text-muted-foreground hover:text-destructive"
                          aria-label={`Remove ${fav.universityName} from favorites`}
                        >
                          <Bookmark size={16} className="fill-primary text-primary" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
