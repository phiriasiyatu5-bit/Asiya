import { Link } from "wouter";
import { motion } from "framer-motion";
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
  return (
    <div className="min-h-[100dvh] w-full px-6 py-16 md:px-12 md:py-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 md:mb-24 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-6xl text-primary mb-6 tracking-tight">
          Southern African<br />Development Community
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-sans max-w-2xl">
          A definitive guide to higher education institutions across the SADC region. Explore academic excellence spanning fifteen nations.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
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
    </div>
  );
}
