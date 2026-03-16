import { motion } from 'motion/react';
import { ExternalLink, FileText, Newspaper, PlayCircle, Radio, Presentation } from 'lucide-react';
import { resourceCards, type ResourceCard } from '../data/resources';

type Tone = 'light' | 'dark';

interface RelatedResourcesProps {
  sections: string[];
  tone?: Tone;
  title?: string;
  description?: string;
}

const typeLabel: Record<ResourceCard['type'], string> = {
  leaflet: 'Leaflet',
  'fact-sheet': 'Fact Sheet',
  video: 'Video',
  document: 'Document',
  presentation: 'Slides',
  flyer: 'Flyer',
  article: 'Article',
  radio: 'Audio',
  report: 'Report',
  chart: 'Chart',
  timeline: 'Timeline',
  guide: 'Guide',
  study: 'Study',
  draft: 'Draft',
  sample: 'Sample',
  faqs: 'FAQs',
};

function getTypeIcon(type: ResourceCard['type']) {
  if (type === 'video') return PlayCircle;
  if (type === 'radio') return Radio;
  if (type === 'article') return Newspaper;
  if (type === 'presentation') return Presentation;
  return FileText;
}

function ResourceCardTile({ resource, tone }: { resource: ResourceCard; tone: Tone }) {
  const Icon = getTypeIcon(resource.type);
  const isDark = tone === 'dark';

  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -6, scale: 1.01 }}
      className={[
        'group overflow-hidden rounded-2xl border transition-all duration-300',
        isDark
          ? 'border-white/10 bg-white/5 shadow-lg shadow-slate-950/30 hover:border-blue-400/40 hover:bg-white/10'
          : 'border-slate-200 bg-white shadow-lg hover:border-blue-200 hover:shadow-xl',
      ].join(' ')}
    >
      <div className="relative h-44 overflow-hidden">
        {resource.thumbnail ? (
          <>
            <img
              src={resource.thumbnail}
              alt={resource.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className={[
                'absolute inset-0',
                isDark
                  ? 'bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent'
                  : 'bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent',
              ].join(' ')}
            />
          </>
        ) : (
          <div
            className={[
              'flex h-full w-full items-center justify-center bg-gradient-to-br',
              isDark ? 'from-blue-950 via-slate-900 to-emerald-950' : 'from-blue-100 via-slate-100 to-emerald-100',
            ].join(' ')}
          >
            <div
              className={[
                'rounded-full p-4',
                isDark ? 'bg-white/10 text-blue-200' : 'bg-white text-blue-600 shadow-md',
              ].join(' ')}
            >
              <Icon className="h-8 w-8" />
            </div>
          </div>
        )}

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className={[
              'rounded-full px-3 py-1 text-xs font-semibold tracking-wide',
              isDark ? 'bg-white/10 text-white backdrop-blur' : 'bg-white/90 text-slate-700 shadow-sm',
            ].join(' ')}
          >
            Section {resource.section}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <div
            className={[
              'rounded-full px-2.5 py-1 text-xs font-semibold',
              isDark ? 'bg-blue-500/15 text-blue-200' : 'bg-blue-50 text-blue-700',
            ].join(' ')}
          >
            {typeLabel[resource.type]}
          </div>
        </div>

        <h3 className={['mb-2 text-lg font-bold', isDark ? 'text-white' : 'text-slate-800'].join(' ')}>
          {resource.title}
        </h3>
        <p className={['mb-4 text-sm leading-relaxed', isDark ? 'text-slate-300' : 'text-slate-600'].join(' ')}>
          {resource.description}
        </p>
        <div className={['flex items-center gap-2 text-sm font-semibold', isDark ? 'text-blue-200' : 'text-blue-600'].join(' ')}>
          <span>Open resource</span>
          <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.a>
  );
}

export function RelatedResources({
  sections,
  tone = 'light',
  title = 'Related Resources',
  description = 'Browse research cards, explainers, and source materials connected to this section.',
}: RelatedResourcesProps) {
  const cards = resourceCards.filter((resource) => sections.includes(resource.section));
  const isDark = tone === 'dark';

  if (cards.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={[
        'mt-14 rounded-3xl border p-8',
        isDark
          ? 'border-white/10 bg-white/5 backdrop-blur'
          : 'border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50',
      ].join(' ')}
    >
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={['mb-2 text-sm font-semibold uppercase tracking-[0.18em]', isDark ? 'text-blue-200' : 'text-blue-600'].join(' ')}>
            Research Library
          </p>
          <h3 className={['text-2xl font-bold', isDark ? 'text-white' : 'text-slate-800'].join(' ')}>{title}</h3>
        </div>
        <p className={['max-w-2xl text-sm leading-relaxed md:text-right', isDark ? 'text-slate-300' : 'text-slate-600'].join(' ')}>
          {description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((resource) => (
          <ResourceCardTile key={resource.id} resource={resource} tone={tone} />
        ))}
      </div>
    </motion.div>
  );
}
