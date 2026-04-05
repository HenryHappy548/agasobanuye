import { memo } from "react";
import { Link } from "react-router-dom";
import { Film, HelpCircle, Download, Play, ChevronDown } from "lucide-react";
import { buildWatchPath } from "@/lib/watchRoute";

interface MovieSEOContentProps {
  title: string;
  year: string;
  genre: string;
  rating: string;
  category: string;
  description?: string;
  dubbed?: string;
  id: string;
}

const MovieSEOContent = memo(({ title, year, genre, rating, category, description, dubbed, id }: MovieSEOContentProps) => {
  const dubberName = rating || dubbed || "";
  const isTV = category === "tv";
  const movieType = isTV ? "series" : "filime";

  return (
    <div className="space-y-6">
      {/* Rich SEO Article Section */}
      <section className="bg-gradient-to-br from-card/80 to-card/40 rounded-xl p-5 border border-border/50 space-y-4">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <Film className="h-4 w-4 text-primary" />
          {title} Agasobanuye - Ibisobanuro Byuzuye
        </h2>

        {/* Main SEO paragraph with natural keyword usage */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          Urakaza neza! Hano urahasanga <strong className="text-foreground">{title} agasobanuye</strong> mu Kinyarwanda. 
          Iyi {movieType} ({year}) ni imwe mu {genre.toLowerCase()} movies zishimishije cyane. 
          {dubberName && <> Yasobanuwe na <strong className="text-foreground">{dubberName}</strong> mu buryo bwiza.</>}
          {" "}Kuri Rwaflix Store, urashobora kureba {title} ku buntu mu HD quality.
        </p>

        {/* Movie summary */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">📖 Incamake ya {title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description || (
              <>
                {title} ni {movieType} y'ubwoko bwa {genre.toLowerCase()} yakozwe mu mwaka wa {year}. 
                Iyi {movieType} irimo inkuru ishimishije cyane kandi igufasha kumva neza ibyabayemo. 
                {dubberName && <> {dubberName} yasobanuye iyi {movieType} mu Kinyarwanda mu buryo bworoshye kumva.</>}
              </>
            )}
          </p>
        </div>

        {/* Why watch */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">🎬 Impamvu Wagombye Kureba {title}</h3>
          <ul className="text-muted-foreground text-sm space-y-1.5 list-none">
            <li className="flex items-start gap-2">
              <Play className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
              <span>Agasobanuye mu Kinyarwanda - urumva neza ibiba mu filime</span>
            </li>
            <li className="flex items-start gap-2">
              <Play className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
              <span>HD quality - amashusho meza cyane ku telefoni n'ikomputeri</span>
            </li>
            <li className="flex items-start gap-2">
              <Download className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
              <span>Urashobora kurura (download) ukareba offline</span>
            </li>
            <li className="flex items-start gap-2">
              <Play className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
              <span>Ku buntu - nta mafaranga usaba</span>
            </li>
          </ul>
        </div>

        {/* Tags - SEO keywords */}
        <div className="pt-3 border-t border-border/30">
          <div className="flex flex-wrap gap-1.5">
            {[
              `${title} agasobanuye`,
              genre,
              "Agasobanuye movies",
              "Films z'agasobanuye",
              year,
              dubberName,
              "Rwaflix",
              "HD",
              "Movies explained in Kinyarwanda",
            ]
              .filter(Boolean)
              .map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-primary/10 rounded-full text-xs text-primary font-medium"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - great for Google featured snippets */}
      <section className="bg-card/60 rounded-xl p-5 border border-border/50 space-y-3">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-primary" />
          Ibibazo Bikunze Kubazwa (FAQ)
        </h2>

        <div className="space-y-2">
          <FAQItem
            question={`Nshobora kureba ${title} agasobanuye hehe?`}
            answer={`Urashobora kureba ${title} agasobanuye ku buntu hano kuri Rwaflix Store. Kanda gusa "Play" hejuru aha maze utangire kureba.`}
          />
          <FAQItem
            question={`Nshobora kurura (download) ${title}?`}
            answer={`Yego! Urashobora kurura ${title} mu HD quality. Kanda ku "Download" button iri hejuru y'iyi page.`}
          />
          <FAQItem
            question={`${title} yasobanuwe na nde?`}
            answer={
              dubberName
                ? `${title} yasobanuwe na ${dubberName} mu Kinyarwanda kuri Rwaflix Store.`
                : `${title} iraboneka agasobanuye mu Kinyarwanda kuri Rwaflix Store.`
            }
          />
          <FAQItem
            question="Rwaflix ni iki?"
            answer="Rwaflix ni urubuga rwo kureba filime (movies) agasobanuye mu Kinyarwanda ku buntu. Ufite movies nyinshi z'amoko atandukanye: Action, Drama, Comedy, na Thriller."
          />
          <FAQItem
            question={`${title} ni filime y'ubwoko ki?`}
            answer={`${title} ni ${movieType} y'ubwoko bwa ${genre}. Yakozwe mu ${year}.`}
          />
        </div>
      </section>

      {/* Internal links section */}
      <section className="bg-muted/30 rounded-xl p-4 border border-border/30">
        <h3 className="text-sm font-semibold text-foreground mb-3">🔗 Reba Izindi Movies</h3>
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/genre/${genre.toLowerCase()}`}
            className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-full text-xs text-primary font-medium transition-colors"
          >
            {genre} Movies Zose →
          </Link>
          {dubberName && (
            <Link
              to={`/dubber/${encodeURIComponent(dubberName)}`}
              className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-full text-xs text-primary font-medium transition-colors"
            >
              Movies za {dubberName} →
            </Link>
          )}
          <Link
            to="/movies"
            className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-full text-xs text-primary font-medium transition-colors"
          >
            Movies Zose →
          </Link>
          <Link
            to="/popular"
            className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-full text-xs text-primary font-medium transition-colors"
          >
            Popular Movies →
          </Link>
        </div>
      </section>
    </div>
  );
});

/* Collapsible FAQ Item */
const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <details className="group">
    <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-foreground py-2 px-3 bg-muted/40 rounded-lg hover:bg-muted/60 transition-colors list-none">
      <span>{question}</span>
      <ChevronDown className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
    </summary>
    <p className="text-muted-foreground text-sm px-3 py-2 leading-relaxed">{answer}</p>
  </details>
);

MovieSEOContent.displayName = "MovieSEOContent";

export default MovieSEOContent;
