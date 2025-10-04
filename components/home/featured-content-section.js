import { SectionHeader } from "./section-header";
import { ContentCard, EmptyState } from "./content-card";

export const FeaturedContentSection = ({ items, type }) => (
  <section>
    <SectionHeader link={`/${type}`} label={type.toUpperCase()} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.length > 0 ? (
        items.map((item) => <ContentCard key={item.id} item={item} type={type} />)
      ) : (
        <EmptyState type={type} />
      )}
    </div>
  </section>
);
