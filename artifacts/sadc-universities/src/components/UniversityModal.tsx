import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Building2, Globe, Bookmark } from "lucide-react";
import { useEffect } from "react";
import type { University, Country } from "@/data";
import { useFavorites } from "@/hooks/useFavorites";

type Props = {
  university: University | null;
  country: Country | null;
  onClose: () => void;
};

const TYPE_COLORS: Record<University["type"], string> = {
  Public: "bg-blue-50 text-blue-700 border-blue-200",
  Private: "bg-amber-50 text-amber-700 border-amber-200",
  Technical: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function UniversityModal({ university, country, onClose }: Props) {
  const { isFavorite, toggle } = useFavorites();

  useEffect(() => {
    if (!university) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [university, onClose]);

  useEffect(() => {
    if (university) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [university]);

  const fav = university ? isFavorite(university.name) : false;
  const age = university ? new Date().getFullYear() - university.founded : 0;

  return (
    <AnimatePresence>
      {university && country && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            data-testid="modal-backdrop"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed inset-x-4 bottom-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-50 bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            data-testid="university-modal"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3 pr-4">
                <span className="text-3xl shrink-0">{country.flag}</span>
                <div>
                  <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {country.name}
                  </p>
                  <h2
                    className="text-lg font-serif font-medium text-foreground leading-snug"
                    data-testid="modal-university-name"
                  >
                    {university.name}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() =>
                    toggle({
                      universityName: university.name,
                      countryId: country.id,
                      countryName: country.name,
                      countryFlag: country.flag,
                    })
                  }
                  aria-label={fav ? "Remove from saved" : "Save institution"}
                  data-testid="modal-button-favorite"
                  className={`p-2 rounded-sm transition-colors ${
                    fav ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Bookmark size={18} className={fav ? "fill-primary" : ""} />
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  data-testid="modal-button-close"
                  className="p-2 rounded-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Type badge */}
              <div className="flex items-center gap-3">
                <Building2 size={16} className="text-muted-foreground shrink-0" />
                <span className="font-sans text-sm text-muted-foreground">Institution type</span>
                <span
                  className={`ml-auto text-xs font-medium font-sans px-2.5 py-1 rounded-full border ${TYPE_COLORS[university.type]}`}
                  data-testid="modal-type-badge"
                >
                  {university.type}
                </span>
              </div>

              {/* Founded */}
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-muted-foreground shrink-0" />
                <span className="font-sans text-sm text-muted-foreground">Founded</span>
                <span
                  className="ml-auto font-sans text-sm font-medium text-foreground"
                  data-testid="modal-founded"
                >
                  {university.founded}
                  <span className="text-muted-foreground font-normal ml-1.5">
                    ({age} year{age !== 1 ? "s" : ""} ago)
                  </span>
                </span>
              </div>

              {/* Website */}
              <div className="flex items-center gap-3">
                <Globe size={16} className="text-muted-foreground shrink-0" />
                <span className="font-sans text-sm text-muted-foreground">Website</span>
                <a
                  href={university.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="modal-website-link"
                  className="ml-auto font-sans text-sm text-primary hover:underline underline-offset-2 truncate max-w-[180px]"
                >
                  {university.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="modal-visit-button"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-sm bg-primary text-primary-foreground font-sans text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Globe size={15} />
                Visit Official Website
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
