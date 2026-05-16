import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  Newspaper, MessageCircle, Grid3x3, Bookmark, Settings,
  Check, X, ChevronLeft, ChevronRight, Share2, ArrowLeft,
  Search, ExternalLink, Plus, ArrowRight, RefreshCw,
  Eye, Wifi, BatteryFull, Link2, Rocket, MessageSquare,
  Lightbulb, MoreHorizontal, TrendingUp, TrendingDown, Minus, Star, ArrowDown,
  Calendar,
} from 'lucide-react';

const colors = {
  blue: '#185FA5',
  blueLight: '#E6F1FB',
  blueDark: '#0C447C',
  // Brand gradient stops (for marquee logo and marketing surfaces)
  brandDeep: '#0B2F60',
  brandMid: '#1858A0',
  brandBright: '#0EA5E9',
  brandCyan: '#7DD3FC',
  brandMint: '#5EEAD4',
  teal: '#1D9E75',
  tealDark: '#0F6E56',
  gray: '#888780',
  coral: '#D85A30',
  coralDark: '#993C1D',
  green: '#639922',
  amber: '#BA7517',
  amberLight: '#FAEEDA',
  amberDark: '#633806',
  purple: '#7F77DD',
  purpleLight: '#EEEDFE',
  purpleDark: '#3C3489',
  tealLight: '#E1F5EE',
  tealLabelDark: '#085041',
  // Coverage mode colors — replaces the old left/center/right political spectrum.
  // Reporting (slate-cool), Analysis (amber-warm), Opinion (plum-distinct).
  reporting: '#5C7185',
  reportingLight: '#E4E9EE',
  analysis: '#9A7544',
  analysisLight: '#F1E7D4',
  opinion: '#7E5577',
  opinionLight: '#EBE0E8',
};

// Context for app-wide preference state — drives whether stretches-you badges and
// aperture-flagged content are visible to the user, plus active seasonal subscriptions.
const ApertureContext = createContext({ enabled: true, seasonalSubscriptions: [] });
const useAperture = () => useContext(ApertureContext);

// Helper: get the event object for a story, only if the user is subscribed to that event.
const useStoryEvent = (story) => {
  const { seasonalSubscriptions } = useAperture();
  if (!story || !story.eventId) return null;
  if (!seasonalSubscriptions || !seasonalSubscriptions.includes(story.eventId)) return null;
  // SEASONAL_EVENTS is defined further down; lazy-resolve.
  return SEASONAL_EVENTS.find(e => e.id === story.eventId) || null;
};

const STORIES = [
  {
    id: 'cannes-bong', category: 'Culture',
    headline: "Bong Joon-ho's new film opens Cannes to a 12-minute ovation",
    teaser: "Critics calling it his most political work since Parasite.",
    paragraphs: [
      "Bong Joon-ho's seventh feature, Mother Tongue, opened the 78th Cannes Film Festival last night to a twelve-minute standing ovation — the longest at the festival since 2019.",
      "Set in a near-future Seoul where private language tutors have replaced public schools, the film extends the class-consciousness Bong made his signature in Parasite. Reviews are reverential but split on the politics."
    ],
    spectrum: { left: 2, center: 3, right: 5 }, tilt: 'opinion-led',
    quote: 'a masterpiece of social cinema',
    social: { positive: 58, mixed: 32, critical: 10, note: 'trending on X · spike on TikTok via trailer audio' },
    sources: [
      { name: 'The Guardian', mode: 'opinion', headline: 'A masterpiece of social cinema' },
      { name: 'Variety', mode: 'analysis', headline: 'Stunning craft, uncertain commercial prospects' },
      { name: 'Hollywood Reporter', mode: 'opinion', headline: "Bong's most stylistically daring work yet" },
      { name: 'Le Monde', mode: 'opinion', headline: 'Bong returns to social fable with confidence' },
      { name: 'Cahiers du Cinéma', mode: 'opinion', headline: 'A near-future Korea, painfully recognizable' },
    ],
    tier: 'headlines', isNew: true, readTime: '1 min', section: 'Front page',
    eventId: 'cannes-2026',
    context: [
      { name: 'Bong Joon-ho', type: 'Director', initial: 'B', tone: 'culture', blurb: 'South Korean filmmaker. Best known for Parasite (2019), the first non-English film to win Best Picture. Known for genre-blending and class commentary.' },
      { name: 'Cannes Film Festival', type: 'Event', initial: 'C', tone: 'event', blurb: 'The 78th edition of the festival runs May 14–25 in Cannes, France. Opening-night slots are reserved for filmmakers the festival considers culturally significant.' },
      { name: 'Mother Tongue', type: 'Film', initial: 'M', tone: 'work', blurb: 'Bong\'s seventh feature. Korean-language, 2h 18m, set in near-future Seoul. Distribution rights sold to NEON for North America.' },
    ],
  },
  {
    id: 'crispr-hearing', category: 'Science',
    headline: "CRISPR trial restores hearing in 9 of 10 children born deaf",
    teaser: "Five-year follow-up in NEJM; first durable gene therapy for inherited deafness.",
    paragraphs: [
      "A five-year follow-up published this week in the New England Journal of Medicine shows that nine of ten children born with a specific form of inherited deafness can now hear normally after a single CRISPR-based gene therapy.",
      "The trial targeted OTOF gene mutations, which account for about 8% of congenital deafness cases. Researchers caution that this won't apply to most forms of hereditary hearing loss — but say the durability of the result reframes what gene therapy can do at scale."
    ],
    spectrum: { left: 6, center: 3, right: 1 }, tilt: 'mostly reporting',
    quote: 'a once-in-a-generation breakthrough',
    social: { positive: 78, mixed: 18, critical: 4, note: 'Deaf community discussion ongoing on Reddit' },
    sources: [
      { name: 'NEJM', mode: 'reporting', headline: 'OTOF gene therapy: five-year outcomes' },
      { name: 'NYT', mode: 'reporting', headline: 'Nine deaf children can now hear' },
      { name: 'WSJ', mode: 'analysis', headline: "Gene therapy's first real durability proof" },
    ],
    tier: 'headlines', isNew: true, readTime: '1 min', section: 'Front page',
    isAperture: true,
    context: [
      { name: 'OTOF gene', type: 'Concept', initial: 'O', tone: 'science', blurb: 'Encodes otoferlin, a protein essential for sound signal transmission in inner ear hair cells. Mutations cause ~8% of inherited deafness cases.' },
      { name: 'CRISPR-Cas9', type: 'Technology', initial: 'C', tone: 'science', blurb: 'Gene-editing technology that won the 2020 Nobel Prize in Chemistry. Allows targeted modification of DNA sequences in living cells.' },
      { name: 'NEJM', type: 'Journal', initial: 'N', tone: 'event', blurb: 'New England Journal of Medicine. Peer-reviewed medical journal, one of the most cited in the world. Publishing here signals strong consensus.' },
    ],
    biggerPicture: [
      {
        title: 'How gene therapy works, briefly',
        blurb: 'Gene therapy treats disease by editing or replacing faulty genes rather than addressing symptoms. CRISPR-based approaches use a molecular scissor (Cas9) guided to a specific DNA sequence. Early trials focused on a handful of single-gene disorders. The hearing trial is significant because it shows durability — the fix held for five years, the hardest test.',
        learnMore: 'Gene therapy 101',
      },
      {
        title: 'Why durability matters',
        blurb: 'Many earlier gene-therapy attempts produced initial improvements that faded — either because edited cells died off or because the body neutralized the therapy. A five-year durable result reframes which conditions are realistically treatable, and it changes what "cure" can mean in genetic medicine.',
        learnMore: 'Gene therapy trials',
      },
    ],
  },
  {
    id: 'eu-india-trade', category: 'World',
    headline: "EU and India sign sweeping trade deal after eight years of talks",
    teaser: "Cuts tariffs on cars, wine, and pharma. Both sides framing it as a hedge.",
    paragraphs: [
      "After more than eight years of negotiation, the EU and India have signed a comprehensive trade agreement that cuts tariffs across cars, wine, dairy, and pharmaceuticals. The deal also includes provisions on data flows and labor standards that had repeatedly stalled earlier rounds.",
      "Analysts see the timing as significant: it lands in the same week as renewed US-China tariff threats, suggesting both sides are hedging against a more fragmented global trade order. India gains preferential access to EU services markets; the EU gains a manufacturing partner outside China's orbit."
    ],
    spectrum: { left: 4, center: 6, right: 2 }, tilt: 'analysis-heavy',
    quote: 'a recalibration in a multipolar world',
    social: { positive: 42, mixed: 48, critical: 10, note: 'analyst commentary heavy on LinkedIn' },
    sources: [
      { name: 'FT', mode: 'analysis', headline: 'A strategic hedge against fragmentation' },
      { name: 'Reuters', mode: 'reporting', headline: 'EU-India deal: what changes Tuesday' },
      { name: 'The Hindu', mode: 'reporting', headline: 'Modi calls it generational shift' },
      { name: 'Politico EU', mode: 'analysis', headline: 'Brussels gets a manufacturing partner' },
    ],
    tier: 'headlines', isNew: false, readTime: '2 min', section: 'World',
    isAperture: true,
    context: [
      { name: 'European Union', type: 'Institution', initial: 'E', tone: 'world', blurb: 'Trading bloc of 27 member states. Total GDP ~$18T. The EU negotiates trade deals as a single entity, which is why agreements take years to finalize.' },
      { name: 'India', type: 'Country', initial: 'I', tone: 'world', blurb: 'World\'s most populous country and fifth-largest economy. Has pursued strategic non-alignment, balancing relationships with US, EU, Russia, and China.' },
      { name: 'Tariff fragmentation', type: 'Concept', initial: 'T', tone: 'concept', blurb: 'IMF term for the recent trend toward bilateral and regional trade blocs replacing multilateral WTO-based arrangements. Has accelerated since 2018.' },
    ],
  },
  {
    id: 'apple-vision', category: 'Tech',
    headline: "Apple delays Vision Pro 2, refocuses on lightweight glasses",
    teaser: "Internal memo cites soft sales and pressure from Meta's Ray-Ban line.",
    paragraphs: [
      "Apple has indefinitely delayed Vision Pro 2 and reallocated the team toward lightweight smart glasses that compete more directly with Meta's Ray-Ban line, according to an internal memo first reported by Bloomberg.",
      "Original Vision Pro sales reportedly fell well short of internal projections, with retention dropping sharply after the novelty period. The pivot is being framed internally as a refinement of strategy, not a retreat from spatial computing."
    ],
    spectrum: { left: 3, center: 6, right: 2 }, tilt: 'analysis-heavy',
    quote: 'a refinement of strategy, not a retreat',
    social: { positive: 32, mixed: 38, critical: 30, note: 'mixed reception, Meta fans celebrating' },
    sources: [
      { name: 'Bloomberg', mode: 'reporting', headline: 'Internal memo: Vision Pro 2 paused' },
      { name: 'The Verge', mode: 'analysis', headline: 'Apple admits the headset bet stalled' },
      { name: 'WSJ', mode: 'analysis', headline: 'Cook pivots before the next earnings cycle' },
    ],
    tier: 'headlines', isNew: false, readTime: '1 min', section: 'Tech',
    context: [
      { name: 'Apple', type: 'Company', initial: 'A', tone: 'tech', blurb: 'World\'s second-largest company by revenue. Vision Pro was its first major new product category since the Apple Watch in 2015. Launched February 2024 at $3,499.' },
      { name: 'Meta Ray-Ban', type: 'Product', initial: 'M', tone: 'tech', blurb: 'Second-generation smart glasses from Meta and EssilorLuxottica. Lightweight, $299 price point, audio + camera. Outsold Vision Pro by an estimated 4-to-1 in 2024.' },
      { name: 'Spatial computing', type: 'Concept', initial: 'S', tone: 'tech', blurb: 'Apple\'s preferred framing for mixed-reality interfaces. Positions devices as productivity and computing platforms rather than gaming or social VR.' },
    ],
  },
  {
    id: 'boj-yen', category: 'Markets',
    headline: "Yen surges as Bank of Japan signals end of yield curve control",
    teaser: "First major policy reversal in 25 years; equities slide on the news.",
    paragraphs: [
      "The yen jumped over 3% against the dollar after the Bank of Japan signaled the end of its decades-long yield curve control policy. The Nikkei fell sharply at the open as investors recalibrated for a higher rate environment.",
      "Economists are divided on whether this is the start of a sustained tightening cycle or a one-off signal. Either way, the era of structurally cheap yen-denominated borrowing appears to be closing."
    ],
    spectrum: { left: 5, center: 5, right: 1 }, tilt: 'reporting & analysis',
    quote: '25 years of monetary policy, undone',
    social: { positive: 28, mixed: 54, critical: 18, note: 'carry trade unwinding chatter' },
    sources: [
      { name: 'FT', mode: 'analysis', headline: 'BoJ ends the great yen experiment' },
      { name: 'Nikkei Asia', mode: 'reporting', headline: 'Markets recalibrate for higher rates' },
    ],
    tier: 'headlines', isNew: true, readTime: '1 min', section: 'Markets',
    isAperture: true,
    eventId: 'fed-decision-may',
    context: [
      { name: 'Bank of Japan', type: 'Institution', initial: 'B', tone: 'markets', blurb: 'Japan\'s central bank. Has held near-zero rates since 1999 — the longest monetary easing program in modern history. Decisions ripple through global bond and currency markets.' },
      { name: 'Yield curve control', type: 'Policy', initial: 'Y', tone: 'concept', blurb: 'A policy in which a central bank targets a specific yield level for longer-term government bonds, buying or selling to enforce it. The BoJ has used it since 2016.' },
      { name: 'Yen carry trade', type: 'Concept', initial: 'C', tone: 'markets', blurb: 'Strategy where investors borrow in yen at low rates to invest in higher-yielding assets elsewhere. Estimated at $500B+ globally. Sensitive to BoJ policy moves.' },
    ],
    biggerPicture: [
      {
        title: 'What central banks actually do',
        blurb: 'Central banks set short-term interest rates, manage money supply, and act as lender-of-last-resort to commercial banks. When they raise rates, borrowing gets more expensive and the currency typically strengthens. When they cut, the opposite. The BoJ has been an outlier among major economies, holding rates near zero while peers hiked aggressively post-2022.',
        learnMore: 'Monetary policy 101',
      },
      {
        title: 'Why a Japan policy shift ripples globally',
        blurb: 'For two decades, near-free yen borrowing financed a huge amount of global investing. When the BoJ tightens, that flow reverses — investors unwind positions in foreign assets and bring money back home. The 1998 LTCM crisis and the 2007 carry-trade unwind both had BoJ moves as triggers. Markets are watching for echoes.',
        learnMore: 'Global money flows',
      },
    ],
  },
  {
    id: 'argentina-peso', category: 'World',
    headline: "Argentina's currency reform passes in overnight session",
    teaser: "Most aggressive peso intervention in two decades; economists split.",
    paragraphs: [
      "In an overnight session, Argentina's Congress passed the most aggressive currency reform package in two decades — a unified exchange rate, partial dollarization of contracts, and major changes to capital controls.",
      "Economists are split: some see it as the only credible path out of triple-digit inflation; others warn it will deepen the recession before any stabilization."
    ],
    spectrum: { left: 3, center: 5, right: 4 }, tilt: 'analysis-heavy',
    quote: 'the only credible path — or the wrong one',
    social: { positive: 38, mixed: 32, critical: 30, note: 'heated debate in Spanish-language press' },
    sources: [
      { name: 'Clarín', mode: 'analysis', headline: 'The reform passes — what happens Monday' },
      { name: 'The Economist', mode: 'opinion', headline: "Milei's biggest bet pays off, for now" },
    ],
    tier: 'brief', isNew: false, readTime: '2 min', section: 'World',
  },
  {
    id: 'climate-finance', category: 'World',
    headline: "Climate finance deal stalls as developing nations walk out",
    teaser: "Negotiators leave Bonn without a number on loss-and-damage funding.",
    paragraphs: [
      "Talks in Bonn aimed at finalizing the loss-and-damage finance commitment ended without a concrete number, after delegations from the Global South walked out citing inadequate offers from wealthier nations.",
      "The next opportunity to break the deadlock is at COP later this year. Climate advocates warn that without firm numbers, the entire framework risks becoming a symbolic exercise."
    ],
    spectrum: { left: 5, center: 3, right: 2 }, tilt: 'mostly reporting',
    quote: 'risks becoming a symbolic exercise',
    social: { positive: 18, mixed: 32, critical: 50, note: 'frustration across climate Twitter' },
    sources: [
      { name: 'Carbon Brief', mode: 'reporting', headline: 'Bonn ends without numbers' },
      { name: 'Reuters', mode: 'analysis', headline: 'Loss-and-damage talks adjourn' },
    ],
    tier: 'brief', isNew: false, readTime: '2 min', section: 'World',
  },
  {
    id: 'ai-music-copyright', category: 'Tech',
    headline: "Federal court rules AI training on copyrighted music is fair use",
    teaser: "Decision splits with earlier rulings in books and code domains.",
    paragraphs: [
      "A federal court has ruled that training generative AI on copyrighted music recordings qualifies as fair use, in a decision that diverges from how similar questions have been treated in book and code domains.",
      "Major labels are expected to appeal. The ruling deepens an already fragmented legal landscape on AI training data."
    ],
    spectrum: { left: 3, center: 6, right: 4 }, tilt: 'analysis-heavy',
    quote: 'a fragmented legal landscape gets messier',
    social: { positive: 38, mixed: 30, critical: 32, note: 'split reactions in tech and music circles' },
    sources: [
      { name: 'Ars Technica', mode: 'analysis', headline: 'Fair use, applied to music training' },
    ],
    tier: 'brief', isNew: false, readTime: '1 min', section: 'Tech',
  },
  {
    id: 'f1-africa', category: 'Sports',
    headline: "Formula 1 returns to Africa with announced 2027 South African Grand Prix",
    teaser: "First African race since 1993; Kyalami circuit getting major renovation.",
    paragraphs: [
      "Formula 1 has confirmed a South African Grand Prix at Kyalami beginning in 2027, ending a 34-year absence from the African continent. The circuit will undergo significant renovation to meet current F1 safety standards.",
      "The announcement comes after years of negotiations and competing bids. F1 leadership cited the strategic importance of having a race on every populated continent."
    ],
    spectrum: { left: 7, center: 3, right: 2 }, tilt: 'mostly reporting',
    quote: '34 years, and finally back',
    social: { positive: 82, mixed: 14, critical: 4, note: 'celebrations across motorsport communities' },
    sources: [
      { name: 'Autosport', mode: 'analysis', headline: 'Kyalami returns to the calendar' },
    ],
    tier: 'brief', isNew: false, readTime: '1 min', section: 'Sports',
  },
  {
    id: 'doctor-shortage', category: 'World',
    headline: "WHO warns of 11 million health worker shortfall by 2030",
    teaser: "Africa and Southeast Asia projected to bear the heaviest impact.",
    paragraphs: [
      "The World Health Organization has updated its projections, warning of an 11 million health worker shortfall by 2030 — with Africa and Southeast Asia projected to bear the heaviest impact.",
      "The report calls for coordinated international investment in training and retention, and flags that high-income countries hiring from lower-income ones is making the imbalance worse."
    ],
    spectrum: { left: 3, center: 5, right: 1 }, tilt: 'analysis-heavy',
    quote: 'a slow-moving global emergency',
    social: { positive: 22, mixed: 38, critical: 40, note: 'limited mainstream pickup' },
    sources: [
      { name: 'WHO', mode: 'analysis', headline: 'Global health workforce projection 2030' },
    ],
    tier: 'deep', isNew: false, readTime: '2 min', section: 'World',
  },
  {
    id: 'quantum-comp', category: 'Science',
    headline: "Quantum computing milestone: error correction holds across 100 qubits",
    teaser: "Long-standing barrier broken in joint MIT–Google paper.",
    paragraphs: [
      "Researchers at MIT and Google have demonstrated that quantum error correction can be sustained reliably across 100 logical qubits — a long-standing barrier in the field.",
      "The result doesn't mean usable quantum computing has arrived, but it removes one of the largest theoretical doubts about whether the field's roadmap is achievable."
    ],
    spectrum: { left: 5, center: 4, right: 1 }, tilt: 'mostly reporting',
    quote: 'a theoretical doubt, removed',
    social: { positive: 60, mixed: 32, critical: 8, note: 'enthusiastic in physics communities' },
    sources: [
      { name: 'Nature', mode: 'analysis', headline: 'Error correction at 100-qubit scale' },
    ],
    tier: 'deep', isNew: false, readTime: '3 min', section: 'Science',
  },
  {
    id: 'housing-japan', category: 'World',
    headline: "Japan's empty-house policy: 11 million akiya, new rules force decisions",
    teaser: "Government tightens rules on abandoned rural homes.",
    paragraphs: [
      "Japan has tightened its rules on abandoned rural homes — the akiya — now numbering 11 million nationwide. Owners face new tax liabilities unless they renovate, sell, or formally surrender ownership.",
      "The policy is part of broader efforts to reverse rural depopulation. Critics say it doesn't address the underlying demographic issue."
    ],
    spectrum: { left: 3, center: 5, right: 2 }, tilt: 'analysis-heavy',
    quote: 'eleven million houses, slowly fading',
    social: { positive: 48, mixed: 36, critical: 16, note: 'foreign-buyer interest spiking' },
    sources: [
      { name: 'Japan Times', mode: 'analysis', headline: 'New akiya rules take effect' },
    ],
    tier: 'deep', isNew: false, readTime: '2 min', section: 'World',
  },
  {
    id: 'spotify-ai', category: 'Culture',
    headline: "Spotify's AI-curated radio crosses 50% of all listening hours",
    teaser: "Algorithmic curation now dominates how music is discovered.",
    paragraphs: [
      "For the first time, AI-curated listening has crossed 50% of all hours on Spotify, the company disclosed in its quarterly investor letter. Algorithmic discovery now meaningfully outpaces user-curated playlists.",
      "Music industry analysts split on whether this is empowering or homogenizing. Independent artists report mixed effects on discoverability."
    ],
    spectrum: { left: 3, center: 5, right: 3 }, tilt: 'analysis-heavy',
    quote: 'the algorithm crosses 50%',
    social: { positive: 28, mixed: 42, critical: 30, note: 'artist community discussing displacement' },
    sources: [
      { name: 'Pitchfork', mode: 'reporting', headline: 'When the algorithm becomes the radio' },
    ],
    tier: 'deep', isNew: false, readTime: '2 min', section: 'Culture',
  },
  {
    id: 'claude-design',
    category: 'Tech',
    headline: "Anthropic publishes Claude's design playbook, framing it as industry guidance",
    teaser: "Detailed paper on Constitutional AI, alignment work, and safety practices — unusually granular for a frontier lab.",
    paragraphs: [
      "Anthropic this week published a detailed paper on the design principles behind its Claude AI assistants — including its Constitutional AI training approach, alignment evaluations, and safety practices. The paper is unusually granular for an industry that has tended to treat training methods as proprietary.",
      "The release is being read as both a contribution to AI safety research and a strategic move to position Anthropic as a thought leader on responsible AI development. Several researchers have noted that competitors may need to respond in kind — either by adopting similar transparency or by explaining why they're not.",
      "The paper covers how Claude is trained to refuse harmful requests, how it's evaluated for honesty and helpfulness, and how its 'character' is shaped without prescribing a single worldview."
    ],
    spectrum: { left: 3, center: 6, right: 3 }, tilt: 'analysis-heavy',
    quote: 'a meaningful step toward transparency in AI development',
    social: { positive: 52, mixed: 36, critical: 12, note: 'active discussion in AI research community' },
    sources: [
      { name: 'Anthropic', mode: 'reporting', headline: "Claude's design principles" },
      { name: 'MIT Tech Review', mode: 'analysis', headline: 'Why Anthropic showed its hand' },
      { name: 'The Verge', mode: 'analysis', headline: 'AI safety, made legible' },
      { name: 'Stratechery', mode: 'opinion', headline: 'Anthropic\'s positioning play' },
    ],
    tier: 'brief', isNew: true, readTime: '2 min', section: 'Tech',
    context: [
      { name: 'Anthropic', type: 'Company', initial: 'A', tone: 'tech', blurb: 'AI safety company founded 2021 by former OpenAI researchers. Known for Claude AI assistant and a research-led approach to model development.' },
      { name: 'Claude', type: 'Product', initial: 'C', tone: 'tech', blurb: 'Anthropic\'s family of large language model assistants. Currently in its 4th major version. Competes with OpenAI\'s GPT and Google\'s Gemini.' },
      { name: 'Constitutional AI', type: 'Method', initial: 'C', tone: 'concept', blurb: 'A training method where the model learns from a set of explicit written principles ("a constitution") rather than only from per-example human feedback.' },
    ],
    biggerPicture: [
      {
        title: 'How modern AI assistants are built',
        blurb: 'Large language models like Claude are neural networks trained in two main phases. First, they\'re pretrained on huge amounts of text to learn patterns of language. Then they\'re refined through techniques like RLHF (Reinforcement Learning from Human Feedback) and constitutional methods to behave helpfully, honestly, and safely. The "training" you hear about isn\'t the model "thinking" — it\'s the process of adjusting billions of parameters until outputs look like what humans want.',
        learnMore: 'How LLMs work',
      },
      {
        title: 'The AI alignment problem',
        blurb: 'As AI models become more capable, ensuring they reliably pursue intended goals becomes harder. This is the "alignment problem." It\'s not just about preventing obvious harms — it\'s about making sure that, as models can solve more complex tasks, they continue doing what humans actually want rather than finding shortcuts. Anthropic, OpenAI, and DeepMind all maintain dedicated alignment teams. The field is young and active.',
        learnMore: 'AI alignment basics',
      },
      {
        title: 'Why this paper matters',
        blurb: 'Frontier AI labs have historically kept training details quiet — both for competitive reasons and to avoid handing capability uplifts to bad actors. Anthropic\'s decision to publish detailed methodology is a shift in that norm. The bet: transparency about safety practices will become an industry expectation, and being first to set that expectation creates positioning advantage.',
        learnMore: 'AI industry context',
      },
    ],
  },
  {
    id: 'vancouver-skytrain',
    category: 'World',
    headline: "TransLink approves SkyTrain extension to North Shore — first crossing in 50 years",
    teaser: "Long-debated rapid-transit link to the North Shore gets formal funding nod. Construction to begin 2027.",
    paragraphs: [
      "After three decades of competing proposals, TransLink and the province jointly announced approval for a SkyTrain extension across Burrard Inlet to the North Shore. The project will run from Brentwood Town Centre to a new terminus near Lonsdale Quay, with stops at Phibbs Exchange and Lower Lonsdale.",
      "The $4.6 billion build is funded jointly by federal infrastructure money, the province, and TransLink's MoU with municipalities. Construction is targeted for late 2027 with service projected to begin in 2032 — a timeline mayors have called \"aggressive but reasonable.\"",
      "For North Vancouver in particular, the project marks the first major fixed-link transit upgrade since the SeaBus opened in 1977. Local advocates have pushed for decades, citing some of the worst commute times in the region."
    ],
    spectrum: { left: 5, center: 4, right: 1 }, tilt: 'mostly reporting',
    quote: 'a generational shift for the North Shore',
    social: { positive: 64, mixed: 28, critical: 8, note: 'local subreddits and homeowner groups active' },
    sources: [
      { name: 'CBC News BC', mode: 'reporting', headline: 'SkyTrain to North Shore: what was approved' },
      { name: 'Vancouver Sun', mode: 'reporting', headline: 'How the $4.6B North Shore link breaks down' },
      { name: 'North Shore News', mode: 'analysis', headline: "What it changes for North Van's housing market" },
      { name: 'Daily Hive', mode: 'reporting', headline: 'Route, stops, timeline: everything announced' },
    ],
    tier: 'brief', isNew: true, readTime: '2 min', section: 'Local',
    location: { country: 'Canada', region: 'British Columbia', city: 'North Vancouver' },
    context: [
      { name: 'TransLink', type: 'Institution', initial: 'T', tone: 'concept', blurb: "Metro Vancouver's regional transit authority. Operates SkyTrain, SeaBus, bus, and West Coast Express. One of the few transit agencies in North America that's grown ridership since 2019." },
      { name: 'SeaBus', type: 'Service', initial: 'S', tone: 'concept', blurb: 'The passenger ferry across Burrard Inlet, opened 1977. Until now, the only fixed transit link between Vancouver and the North Shore.' },
    ],
  },
];

const STARTERS = [
  { type: 'substantive', tag: 'Substantive · Science', storyId: 'crispr-hearing',
    text: '"Did you catch that hearing-loss trial? Nine out of ten children born deaf can now hear — first time gene therapy has worked at that scale."',
    source: 'CRISPR study in NEJM · 3 sources' },
  { type: 'culture', tag: 'Culture', storyId: 'cannes-bong',
    text: '"Bong Joon-ho\'s new film got a twelve-minute standing ovation at Cannes. Twelve minutes. People were apparently crying in the aisles."',
    source: 'Cannes opening · 10 sources' },
  { type: 'icebreaker', tag: 'Icebreaker · Tech', storyId: 'apple-vision',
    text: '"Apple quietly killed Vision Pro 2 — they\'re pivoting to lightweight glasses instead. Meta might have actually won that round."',
    source: 'Apple roadmap memo · 11 sources' },
  { type: 'substantive', tag: 'Substantive · World', storyId: 'eu-india-trade',
    text: '"The EU and India just signed a trade deal eight years in the making — same week as those new US-China tariff threats. Feels like everyone\'s hedging at once."',
    source: 'EU–India trade · 12 sources' },
  { type: 'icebreaker', tag: 'Icebreaker · Sports', storyId: 'f1-africa',
    text: '"Formula 1 is going back to Africa after thirty-four years. South Africa hosting in 2027 — first time since Mandela was president."',
    source: 'F1 calendar · 8 sources' },
  { type: 'culture', tag: 'Culture', storyId: 'spotify-ai',
    text: '"Half of all Spotify listening is now AI-curated. People are basically listening to a machine\'s taste at this point."',
    source: 'Spotify Q3 letter · 4 sources' },
  { type: 'substantive', tag: 'Substantive · Tech', storyId: 'claude-design',
    text: '"Anthropic just published how Claude is actually trained — pretty detailed for an industry that usually keeps that stuff secret. Could shift what people expect from other AI labs."',
    source: 'Anthropic paper · 4 sources' },
];

const TODAYS_GLANCE = [
  { topic: 'Markets', direction: 'down', detail: 'Nikkei −3.2%, S&P −1.4%',
    summary: 'Asian indices sell off on BoJ yield-curve pivot',
    storyId: 'boj-yen' },
  { topic: 'Science', direction: 'notable', detail: '',
    summary: 'Gene therapy restores hearing in nine of ten deaf children',
    storyId: 'crispr-hearing' },
  { topic: 'World', direction: 'mixed', detail: '',
    summary: 'EU and India sign sweeping trade deal — eight years in the making',
    storyId: 'eu-india-trade' },
  { topic: 'Tech', direction: 'down', detail: '',
    summary: 'Apple delays Vision Pro 2, refocuses on lightweight glasses',
    storyId: 'apple-vision' },
  { topic: 'Culture', direction: 'up', detail: '',
    summary: 'Cannes opens with twelve-minute ovation for Bong Joon-ho',
    storyId: 'cannes-bong' },
];

function Mark({ size = 28, color = colors.blue, strokeWidth }) {
  // Custom-drawn infinity glyph — single continuous path, two interlocking loops.
  const sw = strokeWidth || Math.max(2.5, size * 0.085);
  return (
    <svg width={size} height={size * 0.65} viewBox="0 0 80 52">
      <path d="M 14 26 C 14 10, 38 10, 42 26 C 46 42, 70 42, 70 26 C 70 10, 46 10, 42 26 C 38 42, 14 42, 14 26 Z"
        fill="none" stroke={color} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

function MarkLarge({ size = 140, color = colors.blue }) {
  // Scaled infinity for hero contexts (onboarding theme preview, completion screen).
  // Same shape as Mark — system unity across sizes.
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 140 84">
      <path d="M 22 42 C 22 16, 62 16, 70 42 C 78 68, 118 68, 118 42 C 118 16, 78 16, 70 42 C 62 68, 22 68, 22 42 Z"
        fill="none" stroke={color} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

// Wordmark — "In the Loop" with infinity replacing the two o's in "Loop"
// The infinity is sized smaller than a true "oo" pair and proper kerning padding
// is applied either side so the L and p don't crowd the loops.
function Wordmark({ size = 17, color = '#0B2B58' }) {
  const ref = React.useRef(null);
  const [layout, setLayout] = React.useState(null);

  // Measure actual rendered glyph widths after fonts load.
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    let mounted = true;
    const measure = () => {
      if (!mounted || !ref.current) return;
      const lEl = ref.current.querySelector('[data-glyph="l-prefix"]');
      const pEl = ref.current.querySelector('[data-glyph="p"]');
      if (!lEl || !pEl) return;
      try {
        const lBox = lEl.getBBox();
        const pBox = pEl.getBBox();
        setLayout({ lWidth: lBox.width, pWidth: pBox.width });
      } catch (e) { /* getBBox may throw before mount in some browsers */ }
    };
    measure();
    // Re-measure once webfonts settle
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }
    return () => { mounted = false; };
  }, [size]);

  const fontSize = size;
  // Infinity sized to match an "oo" pair optically — about 1.35× a single "o" width.
  // A single "o" in Fraunces Black at this weight is ≈ 0.62 × fontSize, so "oo" ≈ 1.24 × fontSize.
  const infWidth = fontSize * 1.32;
  // Stroke matches the typographic weight of the surrounding Black-900 letters
  const sw = fontSize * 0.13;
  // Padding either side of the infinity, in font-size units — separates it from L and p
  const sidePadding = fontSize * 0.06;
  // Vertical position: x-height center of lowercase letters (Fraunces Black sits at ≈ 0.52 of font size above baseline)
  const baseline = fontSize * 1.05;
  const infCenterY = baseline - fontSize * 0.31;
  // Infinity glyph dimensions (height ≈ 0.55 × infWidth, mirroring an o pair)
  const infHeight = infWidth * 0.55;

  // Default layout estimates (used until measurement completes)
  const estLWidth = fontSize * 3.8;
  const estPWidth = fontSize * 0.7;
  const lWidth = layout ? layout.lWidth : estLWidth;
  const pWidth = layout ? layout.pWidth : estPWidth;

  // Layout: "In the L" + gap + infinity + gap + "p"
  const lStart = 0;
  const lEnd = lStart + lWidth;
  const infStart = lEnd + sidePadding;
  const infEnd = infStart + infWidth;
  const pStart = infEnd + sidePadding;
  const totalWidth = pStart + pWidth + fontSize * 0.1;
  const totalHeight = fontSize * 1.35;

  return (
    <svg ref={ref} width={totalWidth} height={totalHeight}
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      style={{ display: 'block', overflow: 'visible' }}>
      <text data-glyph="l-prefix" x={lStart} y={baseline}
        fill={color}
        fontFamily="'Fraunces Variable', Fraunces, Georgia, serif"
        fontWeight="900"
        fontSize={fontSize}
        letterSpacing={`${fontSize * -0.025}px`}
        style={{ fontVariationSettings: "'opsz' 144" }}>
        In the L
      </text>
      {/* Infinity glyph — drawn at its native size, then transformed into position */}
      <g transform={`translate(${infStart}, ${infCenterY - infHeight / 2}) scale(${infWidth / 84})`}>
        <path d="M 4 26 C 4 8, 36 8, 42 26 C 48 44, 80 44, 80 26 C 80 8, 48 8, 42 26 C 36 44, 4 44, 4 26 Z"
          fill="none" stroke={color} strokeWidth={sw / (infWidth / 84)} strokeLinejoin="round" strokeLinecap="round"/>
      </g>
      <text data-glyph="p" x={pStart} y={baseline}
        fill={color}
        fontFamily="'Fraunces Variable', Fraunces, Georgia, serif"
        fontWeight="900"
        fontSize={fontSize}
        letterSpacing={`${fontSize * -0.025}px`}
        style={{ fontVariationSettings: "'opsz' 144" }}>
        p
      </text>
    </svg>
  );
}

function MarkMarquee({ size = 220, instanceId = 'mq' }) {
  const id = instanceId;
  return (
    <svg viewBox="0 0 240 240" width={size} height={size}>
      <defs>
        {/* Saturated radial blue — brighter center, darker edges (spotlight effect) */}
        <radialGradient id={`${id}-bg`} cx="0.5" cy="0.45" r="0.75">
          <stop offset="0%" stopColor="#3B89D9"/>
          <stop offset="50%" stopColor="#1E5FB8"/>
          <stop offset="100%" stopColor="#0A3A7A"/>
        </radialGradient>
        {/* Upper highlight for glossy finish */}
        <radialGradient id={`${id}-highlight`} cx="0.5" cy="0.18" r="0.5">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)"/>
          <stop offset="60%" stopColor="rgba(255,255,255,0.04)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        {/* Center glow to soften word cloud near the central circle */}
        <radialGradient id={`${id}-center-glow`} cx="0.5" cy="0.5" r="0.25">
          <stop offset="0%" stopColor="rgba(30,95,184,1)"/>
          <stop offset="80%" stopColor="rgba(30,95,184,0.6)"/>
          <stop offset="100%" stopColor="rgba(30,95,184,0)"/>
        </radialGradient>
        {/* Lower vignette for depth */}
        <radialGradient id={`${id}-vignette`} cx="0.5" cy="1" r="0.7">
          <stop offset="0%" stopColor="rgba(0,0,0,0.18)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
        {/* Five concentric paths at varying radii for the word-cloud swirl */}
        <path id={`${id}-ring-1`} d="M 120 120 m -98 0 a 98 98 0 1 1 196 0 a 98 98 0 1 1 -196 0"/>
        <path id={`${id}-ring-2`} d="M 120 120 m -88 0 a 88 88 0 1 1 176 0 a 88 88 0 1 1 -176 0"/>
        <path id={`${id}-ring-3`} d="M 120 120 m -78 0 a 78 78 0 1 1 156 0 a 78 78 0 1 1 -156 0"/>
        <path id={`${id}-ring-4`} d="M 120 120 m -69 0 a 69 69 0 1 1 138 0 a 69 69 0 1 1 -138 0"/>
        <path id={`${id}-ring-5`} d="M 120 120 m -103 0 a 103 103 0 1 1 206 0 a 103 103 0 1 1 -206 0"/>
      </defs>

      {/* Layered background */}
      <rect width="240" height="240" rx="56" fill={`url(#${id}-bg)`}/>
      <rect width="240" height="240" rx="56" fill={`url(#${id}-vignette)`}/>
      <rect width="240" height="240" rx="56" fill={`url(#${id}-highlight)`}/>
      <rect x="1" y="1" width="238" height="238" rx="55" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6"/>

      {/* Word-cloud swirl: five overlapping text rings, varying sizes, mixed white and teal */}
      <text fontSize="13" fontWeight="700" fill="rgba(255,255,255,0.92)" letterSpacing="0.8" style={{ fontFamily: "'Inter Variable', Inter, sans-serif" }}>
        <textPath href={`#${id}-ring-1`} startOffset="5%">DAILY DIGEST · BREAKING · HEADLINES ·&nbsp;</textPath>
      </text>
      <text fontSize="11" fontWeight="700" fill="rgba(125,210,225,0.95)" letterSpacing="1" style={{ fontFamily: "'Inter Variable', Inter, sans-serif" }}>
        <textPath href={`#${id}-ring-2`} startOffset="35%">WORLD EVENTS · ANALYSIS · STAY INFORMED ·&nbsp;</textPath>
      </text>
      <text fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.78)" letterSpacing="1.2" style={{ fontFamily: "'Inter Variable', Inter, sans-serif" }}>
        <textPath href={`#${id}-ring-3`} startOffset="55%">TECH UPDATE · OPINION · POLITICS · TODAY ·&nbsp;</textPath>
      </text>
      <text fontSize="7.5" fontWeight="500" fill="rgba(170,225,235,0.7)" letterSpacing="1.4" style={{ fontFamily: "'Inter Variable', Inter, sans-serif" }}>
        <textPath href={`#${id}-ring-4`} startOffset="15%">TRENDING TOPICS · EVENTS · LATEST ·&nbsp;</textPath>
      </text>
      <text fontSize="6" fontWeight="500" fill="rgba(255,255,255,0.4)" letterSpacing="1.5" style={{ fontFamily: "'Inter Variable', Inter, sans-serif" }}>
        <textPath href={`#${id}-ring-5`} startOffset="0%">CONNECTED IN THE FLESH · STAY INFORMED · ANALYSIS ·&nbsp;</textPath>
      </text>
      {/* Offset overlap words for density */}
      <text fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.85)" letterSpacing="1.2" style={{ fontFamily: "'Inter Variable', Inter, sans-serif" }}>
        <textPath href={`#${id}-ring-2`} startOffset="0%">GLOBAL ·&nbsp;</textPath>
      </text>
      <text fontSize="9" fontWeight="600" fill="rgba(125,210,225,0.85)" letterSpacing="1.2" style={{ fontFamily: "'Inter Variable', Inter, sans-serif" }}>
        <textPath href={`#${id}-ring-3`} startOffset="20%">ALERT ·&nbsp;</textPath>
      </text>

      {/* Center glow softens the word cloud near the central circle */}
      <circle cx="120" cy="120" r="56" fill={`url(#${id}-center-glow)`}/>

      {/* Central circle */}
      <circle cx="120" cy="120" r="42" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2"/>
      <circle cx="120" cy="120" r="42" fill="rgba(11,47,96,0.55)"/>

      {/* IN THE / LOOP wordmark — sans-serif, stacked */}
      <text x="120" y="115" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" letterSpacing="2" style={{ fontFamily: "'Inter Variable', Inter, sans-serif" }}>IN THE</text>
      <text x="120" y="135" textAnchor="middle" fill="white" fontSize="17" fontWeight="800" letterSpacing="1.5" style={{ fontFamily: "'Inter Variable', Inter, sans-serif" }}>LOOP</text>

      {/* Refresh-style arrow wrapping around the center circle */}
      <g>
        <path d="M 86 100 A 42 42 0 0 1 158 138" stroke="#67E8F9" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.95"/>
        <path d="M 152 128 L 160 140 L 145 142" stroke="#67E8F9" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
}

// Mini infinity glyph for the aperture badge — same shape as the brand mark, sized for inline use
function ApertureMark({ size = 9, color = '#8B7AC4' }) {
  return (
    <svg width={size * 1.5} height={size} viewBox="0 0 80 52" style={{ flexShrink: 0 }}>
      <path d="M 8 26 C 8 8, 38 8, 42 26 C 46 44, 76 44, 76 26 C 76 8, 46 8, 42 26 C 38 44, 8 44, 8 26 Z"
        fill="none" stroke={color} strokeWidth="11" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

// Aperture badge — signals a story intentionally chosen to widen the user's view.
// Compact version for story rows, expanded version for detail views.
function ApertureBadge({ variant = 'compact' }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full font-semibold"
      style={{
        background: 'rgba(196, 181, 253, 0.22)',
        color: '#6D5BB7',
        padding: variant === 'detail' ? '2px 8px' : '1px 6px',
        fontSize: variant === 'detail' ? '10.5px' : '10px',
      }}
      title="Outside your usual reading — picked to widen your aperture"
    >
      <ApertureMark size={variant === 'detail' ? 10 : 9} color="#8B7AC4"/>
      {variant === 'detail' ? 'Stretches your aperture' : 'Stretches you'}
    </span>
  );
}

// Seasonal badge — signals a story is part of a followed event's coverage.
// Uses the event's brand color, including its emoji, to instantly link the story
// to the event in the user's mind.
function SeasonalBadge({ event, variant = 'compact' }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full font-semibold"
      style={{
        background: `${event.color}1A`, // ~10% opacity
        color: event.color,
        padding: variant === 'detail' ? '2px 8px' : '1px 6px',
        fontSize: variant === 'detail' ? '10.5px' : '10px',
      }}
      title={`Part of your ${event.title} coverage`}
    >
      <span style={{ fontSize: variant === 'detail' ? '11px' : '10px' }}>{event.emoji}</span>
      {variant === 'detail' ? event.title : event.title.split(' ')[0]}
    </span>
  );
}

function StatusBar({ time = '8:42' }) {
  return (
    <div className="flex justify-between items-center px-5 pt-3.5 pb-1 text-[11px] text-gray-500 font-medium">
      <span>{time}</span>
      <span className="flex gap-1.5 items-center">
        <Wifi className="w-3 h-3" strokeWidth={2}/>
        <BatteryFull className="w-3.5 h-3.5" strokeWidth={1.5}/>
      </span>
    </div>
  );
}

function SpectrumBar({ left, center, right, height = 10, type = 'news' }) {
  // For news bars, segments represent coverage mode: Reporting / Analysis / Opinion.
  // For social bars, segments represent reaction valence: Positive / Mixed / Critical.
  const cLeft = type === 'social' ? colors.green : colors.reporting;
  const cCenter = type === 'social' ? colors.gray : colors.analysis;
  const cRight = type === 'social' ? colors.coral : colors.opinion;
  return (
    <div className="flex gap-0.5 rounded overflow-hidden" style={{ height: `${height}px` }}>
      <div style={{ flex: left, background: cLeft }}/>
      <div style={{ flex: center, background: cCenter }}/>
      <div style={{ flex: right, background: cRight }}/>
    </div>
  );
}

function MixBar() {
  const segments = [
    { name: 'World', val: 25, color: colors.teal },
    { name: 'Tech', val: 18, color: colors.purple },
    { name: 'Culture', val: 16, color: colors.pink },
    { name: 'Markets', val: 14, color: colors.amber },
    { name: 'Science', val: 12, color: colors.green },
    { name: 'Other', val: 15, color: colors.gray },
  ];
  return (
    <div>
      <div className="flex gap-0.5 rounded-md overflow-hidden mb-3" style={{ height: '14px' }}>
        {segments.map(s => <div key={s.name} style={{ flex: s.val, background: s.color }}/>)}
      </div>
      <div className="grid grid-cols-2 gap-y-1.5 gap-x-3 text-[11px] text-gray-600">
        {segments.map(s => (
          <div key={s.name} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm" style={{ background: s.color }}/>
            <span>{s.name} {s.val}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneFrame({ children, height = 'auto' }) {
  return (
    <div className="bg-white rounded-[28px] border border-gray-200 overflow-hidden relative" style={{ minHeight: height }}>
      {children}
    </div>
  );
}

function GlanceRow({ item, isRead, onClick }) {
  const dc = {
    up:       { Icon: TrendingUp,   bg: '#E1F5EE', color: '#085041', label: 'up' },
    down:     { Icon: TrendingDown, bg: '#FAECE7', color: '#993C1D', label: 'down' },
    mixed:    { Icon: Minus,        bg: '#F1EFE8', color: '#5F5E5A', label: 'mixed' },
    notable:  { Icon: Star,         bg: '#E6F1FB', color: '#0C447C', label: 'notable' },
  }[item.direction];
  const I = dc.Icon;
  const story = STORIES.find(s => s.id === item.storyId);
  const { enabled: apertureEnabled } = useAperture();
  const isAperture = apertureEnabled && story && story.isAperture;
  const seasonalEvent = useStoryEvent(story);
  return (
    <button onClick={onClick}
      className={`w-full flex items-center gap-3 py-3 text-left border-b border-gray-100 last:border-0 transition-opacity ${isRead ? 'opacity-45' : ''}`}
      style={seasonalEvent && !isRead ? {
        borderLeft: `4px solid ${seasonalEvent.color}`,
        paddingLeft: '14px',
        marginLeft: '-18px',
        marginRight: '-4px',
        paddingRight: '4px',
        background: `${seasonalEvent.color}08`,
      } : {}}>
      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium whitespace-nowrap flex-shrink-0" style={{ background: dc.bg, color: dc.color }}>
        <span>{item.topic}</span>
        <I className="w-3 h-3" strokeWidth={2.4}/>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[13px] leading-snug ${isRead ? 'line-through' : ''}`} style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}>
          {item.summary}
        </p>
        {!isRead && (item.detail || isAperture || seasonalEvent) && (
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {item.detail && <span className="text-[11px] text-gray-500">{item.detail}</span>}
            {seasonalEvent && <SeasonalBadge event={seasonalEvent} variant="compact"/>}
            {isAperture && <ApertureBadge variant="compact"/>}
          </div>
        )}
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0"/>
    </button>
  );
}

function ChatterPulseRow({ starter, onClick }) {
  const typeMeta = {
    icebreaker:  { bg: colors.amberLight, color: colors.amberDark,   label: 'Icebreaker' },
    substantive: { bg: colors.tealLight,  color: colors.tealLabelDark, label: 'Substantive' },
    culture:     { bg: colors.purpleLight, color: colors.purpleDark, label: 'Culture' },
  }[starter.type] || { bg: colors.purpleLight, color: colors.purpleDark, label: 'Culture' };

  // Compact summary line: strip surrounding quotes, take first sentence or first ~90 chars.
  const stripped = starter.text.replace(/^"|"$/g, '');
  const firstSentence = stripped.match(/^[^.!?]+[.!?]/);
  const compact = firstSentence ? firstSentence[0] : (stripped.length > 90 ? stripped.slice(0, 88) + '…' : stripped);

  return (
    <button onClick={onClick}
      className="w-full flex items-center gap-3 py-3 text-left border-b border-gray-100 last:border-0 transition-opacity">
      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium whitespace-nowrap flex-shrink-0"
        style={{ background: typeMeta.bg, color: typeMeta.color }}>
        <span>{typeMeta.label}</span>
        <MessageSquare className="w-3 h-3" strokeWidth={2.2}/>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] leading-snug" style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}>
          {compact}
        </p>
        <p className="text-[11px] text-gray-500 mt-0.5">{starter.source}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0"/>
    </button>
  );
}

function PulseSection({ items, readIds, onItemClick, pulseMode, setPulseMode, onSeeAllChatter, onChatterTap }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-baseline mb-2.5">
        <div>
          <h3 className="text-[13px] font-medium leading-none">Today's pulse</h3>
          <p className="text-[10.5px] text-gray-400 mt-1">{pulseMode === 'news' ? "What's moving in the world" : 'What people are talking about'}</p>
        </div>
        <div className="flex p-0.5 bg-gray-100 rounded-full">
          {[
            { id: 'news', label: 'News' },
            { id: 'chatter', label: 'Chatter' },
          ].map(m => {
            const active = pulseMode === m.id;
            return (
              <button key={m.id} onClick={() => setPulseMode(m.id)}
                className="px-3 py-1 text-[11.5px] font-medium rounded-full transition-colors"
                style={active ? { background: '#fff', color: '#111', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' } : { color: '#6B7280' }}>
                {m.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="rounded-2xl bg-gray-50 px-4">
        {pulseMode === 'news' ? (
          items.map(item => (
            <GlanceRow key={item.storyId} item={item} isRead={readIds.has(item.storyId)} onClick={() => onItemClick(item.storyId)}/>
          ))
        ) : (
          <>
            {STARTERS.slice(0, 4).map((s, i) => (
              <ChatterPulseRow key={i} starter={s} onClick={() => onChatterTap && onChatterTap(s.storyId)}/>
            ))}
            <button onClick={onSeeAllChatter}
              className="w-full text-center py-3 text-[12px] font-medium flex items-center justify-center gap-1.5"
              style={{ color: colors.blue }}>
              See all {STARTERS.length} conversations <ArrowRight className="w-3.5 h-3.5"/>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function GlanceSection({ items, readIds, onItemClick, dense = false }) {
  // Retained for backwards compatibility (other surfaces may still call it).
  return (
    <div className={dense ? 'mb-4' : 'mb-5'}>
      <div className="flex justify-between items-baseline mb-2">
        <h3 className="text-[13px] font-medium">Today at a glance</h3>
        <span className="text-[11px] text-gray-400">tap any to expand</span>
      </div>
      <div className="rounded-2xl bg-gray-50 px-4">
        {items.map(item => (
          <GlanceRow key={item.storyId} item={item} isRead={readIds.has(item.storyId)} onClick={() => onItemClick(item.storyId)}/>
        ))}
      </div>
    </div>
  );
}

function LandingScreen({ onStart }) {
  return (
    <PhoneFrame>
      <StatusBar />
      <div className="flex flex-col" style={{ minHeight: '700px' }}>
        <div className="flex-1 flex flex-col items-center px-6 pt-10 pb-8">
          {/* Infinity mark — sized down a touch to make room for the hero line below */}
          <div className="relative" style={{ filter: `drop-shadow(0 14px 32px ${colors.brandMid}25)` }}>
            <MarkLarge size={140} color={colors.blue}/>
          </div>

          {/* Wordmark — sits below the mark, completing the lockup */}
          <div className="mt-5">
            <Wordmark size={22} color="#0B2B58"/>
          </div>

          {/* Hero line — heavier, tighter, more editorial confidence */}
          <h1 className="mt-7 text-center text-[26px] leading-[1.08] max-w-[320px]"
            style={{
              fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif",
              fontWeight: 600,
              fontVariationSettings: "'opsz' 144",
              letterSpacing: '-0.022em',
              color: '#0F1419'
            }}>
            Stay informed without doom-scrolling.
          </h1>

          {/* Tagline — body sans, slightly heavier, more readable contrast */}
          <p className="mt-3.5 text-center text-[13.5px] leading-[1.5] max-w-[300px]"
            style={{
              fontFamily: "'Inter Variable', Inter, sans-serif",
              fontWeight: 450,
              color: '#4A5568',
              letterSpacing: '-0.005em'
            }}>
            Two minutes in line for coffee. Five on the train. Fifteen at lunch. ITL is the trusted place to stay current — with whatever time you have.
          </p>

          {/* Value props — coverage transparency leads (editorial credentialing first) */}
          <div className="mt-7 space-y-3 w-full max-w-[300px]">
            {[
              { dot: colors.brandBright, text: 'Two paragraphs catch you up. Full sources wait when something pulls you in.' },
              { dot: colors.brandMint, text: 'Reporting, analysis, opinion — clearly marked.' },
              { dot: colors.brandCyan, text: 'Background that adapts as you learn.' },
              { dot: '#C4B5FD', text: 'Built to widen your view, not narrow it.' },
            ].map((v, i) => (
              <div key={i} className="flex gap-2.5">
                {/* Dot wrapper matches the line-height of the text, so the dot centers on the cap height */}
                <div className="flex-shrink-0 flex items-center" style={{ height: '20px' }}>
                  <span className="block w-[6px] h-[6px] rounded-full" style={{ background: v.dot }}/>
                </div>
                <p className="text-[13px] leading-[1.55]"
                  style={{
                    fontFamily: "'Inter Variable', Inter, sans-serif",
                    fontWeight: 600,
                    color: '#1F2937',
                    letterSpacing: '-0.005em'
                  }}>
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="px-5 pb-8">
          <button onClick={onStart}
            className="w-full py-4 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 text-white transition-opacity hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${colors.brandMid} 0%, ${colors.brandBright} 100%)`, boxShadow: `0 6px 20px ${colors.brandMid}30` }}>
            Try today's brief <ArrowRight className="w-4 h-4"/>
          </button>
          <p className="text-center text-xs text-gray-400 mt-4">Returning? <span style={{ color: colors.blue }} className="font-medium">Sign in</span></p>
        </div>
      </div>
    </PhoneFrame>
  );
}

function OnboardingHeader({ step, total, onSkip }) {
  return (
    <div className="flex justify-between items-center px-5 pt-3 pb-2 text-xs text-gray-500">
      <button onClick={onSkip} className="text-gray-400">Skip</button>
      <div className="flex gap-1.5">
        {Array.from({length: total}).map((_, i) => (
          <span key={i} className={`w-1.5 h-1.5 rounded-full ${i+1 <= step ? '' : 'bg-gray-200 border border-gray-300'}`}
            style={i+1 <= step ? { background: '#111' } : {}}/>
        ))}
      </div>
      <span className="text-gray-400">{step} of {total}</span>
    </div>
  );
}

function OnboardingSample({ onNext, onBack }) {
  return (
    <PhoneFrame>
      <StatusBar />
      <OnboardingHeader step={1} total={5} onSkip={onNext}/>
      <div style={{ minHeight: '640px' }} className="flex flex-col">
        <div className="px-6 pt-3 flex-1">
          <h2 style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontWeight: 500 }} className="text-[24px] leading-tight tracking-tight mb-2">A taste of today.</h2>
          <p className="text-[13px] text-gray-600 leading-relaxed mb-5">
            Five stories, two minutes. This is what every morning starts with in ITL — before any of the longer reading.
          </p>

          {/* Live glance preview using real story data */}
          <div className="mb-3">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-[12px] font-medium leading-none">Today's pulse</h3>
              <span className="text-[10.5px] text-gray-400">Thursday, May 14</span>
            </div>
            <div className="rounded-2xl bg-gray-50 px-4">
              {TODAYS_GLANCE.map(item => (
                <GlanceRow key={item.storyId} item={item} isRead={false} onClick={() => {}}/>
              ))}
            </div>
          </div>

          {/* Contextual callout teasing what's behind the glance */}
          <div className="rounded-xl px-3.5 py-3 mt-4 flex gap-3 items-start"
            style={{ background: colors.blueLight, border: `1px solid ${colors.blue}22` }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: colors.blue, color: '#fff' }}>
              <Lightbulb className="w-3.5 h-3.5" strokeWidth={2}/>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-gray-800 leading-relaxed">
                <span className="font-medium" style={{ color: colors.blueDark }}>Want depth on any story?</span> Keep scrolling for the five-minute Brief, or the full fifteen-minute Deep dive. You'll set your default in a moment.
              </p>
            </div>
          </div>
        </div>
        <div className="px-5 pb-7 pt-4">
          <button onClick={onNext} className="w-full py-3.5 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 text-white"
            style={{ background: colors.blue }}>
            Set this up for me <ArrowRight className="w-4 h-4"/>
          </button>
          <p className="text-center text-[11px] text-gray-400 mt-3">~30 seconds. You can change everything later.</p>
        </div>
      </div>
    </PhoneFrame>
  );
}

function OnboardingTheme({ onNext, theme, setTheme }) {
  return (
    <PhoneFrame>
      <StatusBar />
      <OnboardingHeader step={2} total={5} onSkip={onNext}/>
      <div style={{ minHeight: '640px' }} className="flex flex-col">
        <div className="px-6 pt-4 flex-1">
          <h2 style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontWeight: 500 }} className="text-[22px] leading-tight mb-3">First, the look.</h2>
          <p className="text-sm text-gray-600 leading-relaxed">You can change this any time in settings.</p>
          <div className="mt-6 space-y-3">
            {[
              { id: 'light', name: 'Light', desc: 'For daytime reading and bright spaces.', bg: '#fff', fg: '#111', border: '#E5E7EB' },
              { id: 'dark', name: 'Dark', desc: 'Warm-tinted, easier on the eyes after sunset.', bg: '#1F1B1A', fg: '#F1ECE7', border: '#3D3633' },
            ].map(opt => (
              <button key={opt.id} onClick={() => setTheme(opt.id)}
                className={`w-full p-3 rounded-2xl border-2 flex items-center gap-4 transition-colors text-left`}
                style={{ borderColor: theme === opt.id ? colors.blue : '#E5E7EB' }}>
                <div className="w-14 h-14 rounded-xl border flex-shrink-0 flex items-center justify-center text-[10px]"
                  style={{ background: opt.bg, color: opt.fg, borderColor: opt.border }}>
                  <Mark size={22} color={opt.id === 'dark' ? '#85B7EB' : colors.blue}/>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{opt.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                </div>
                {theme === opt.id && <Check className="w-5 h-5" style={{ color: colors.blue }}/>}
              </button>
            ))}
          </div>
        </div>
        <div className="px-5 pb-7 pt-4">
          <button onClick={onNext} className="w-full py-3.5 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 text-white"
            style={{ background: colors.blue }}>Continue <ArrowRight className="w-4 h-4"/></button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function OnboardingTime({ onNext, onBack, tier, setTier }) {
  const options = [
    { id: 'headlines', label: 'Headlines', time: '~2 min', desc: 'Five macro lines. The day in a glance.' },
    { id: 'brief', label: 'Brief', time: '~5 min', desc: 'The glance plus deeper stories.' },
    { id: 'deep', label: 'Deep dive', time: '~15 min', desc: 'A full daily paper, organized by section.' },
  ];
  return (
    <PhoneFrame>
      <StatusBar />
      <OnboardingHeader step={3} total={5} onSkip={onNext}/>
      <div style={{ minHeight: '640px' }} className="flex flex-col">
        <div className="px-6 pt-4 flex-1">
          <h2 style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontWeight: 500 }} className="text-[22px] leading-tight mb-3">How much time, usually?</h2>
          <p className="text-sm text-gray-600 leading-relaxed">You'll see all three options every day. This sets the default.</p>
          <div className="mt-6 space-y-2.5">
            {options.map(opt => (
              <button key={opt.id} onClick={() => setTier(opt.id)}
                className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-colors text-left`}
                style={{ borderColor: tier === opt.id ? colors.blue : '#E5E7EB' }}>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="text-sm font-medium">{opt.label}</p>
                    <p className="text-xs text-gray-400">{opt.time}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{opt.desc}</p>
                </div>
                {tier === opt.id && <Check className="w-5 h-5" style={{ color: colors.blue }}/>}
              </button>
            ))}
          </div>
        </div>
        <div className="px-5 pb-7 pt-4 flex gap-3">
          <button onClick={onBack} className="px-5 py-3.5 rounded-2xl text-sm font-medium text-gray-600 border border-gray-200">Back</button>
          <button onClick={onNext} className="flex-1 py-3.5 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 text-white"
            style={{ background: colors.blue }}>Continue <ArrowRight className="w-4 h-4"/></button>
        </div>
      </div>
    </PhoneFrame>
  );
}

const SUBGENRES = {
  World: ['Geopolitics', 'Climate', 'Trade & economy', 'Health', 'Conflict', 'Migration'],
  Tech: ['AI', 'Big tech', 'Startups', 'Video games', 'Crypto', 'Hardware', 'Security & privacy'],
  Culture: ['Film & TV', 'Music', 'Books', 'Art & design', 'Fashion', 'Food'],
  Markets: ['Stocks', 'Crypto', 'Real estate', 'Corporate news', 'Personal finance', 'IPOs'],
  Science: ['Health & medicine', 'Space', 'Climate science', 'Biology', 'Physics', 'AI research'],
  Sports: ['NBA', 'NFL', 'Soccer (EPL/UEFA)', 'F1', 'Tennis', 'Golf', 'MMA', 'Olympics'],
};

// Regional news catalog — country → region → city. Users pick the most local anchor;
// the system surfaces stories at any matching tier (city + region + country).
// Sample data scoped to Canada/BC for the prototype; production would lazy-load by country.
const REGIONS = {
  Canada: {
    'British Columbia': ['Vancouver', 'North Vancouver', 'Victoria', 'Burnaby', 'Surrey', 'Richmond'],
    'Ontario': ['Toronto', 'Ottawa', 'Hamilton', 'Mississauga'],
    'Quebec': ['Montreal', 'Quebec City', 'Laval'],
    'Alberta': ['Calgary', 'Edmonton'],
  },
  'United States': {
    'California': ['Los Angeles', 'San Francisco', 'San Diego'],
    'New York': ['New York City', 'Brooklyn', 'Albany'],
    'Texas': ['Austin', 'Houston', 'Dallas'],
  },
  'United Kingdom': {
    'England': ['London', 'Manchester', 'Birmingham'],
    'Scotland': ['Edinburgh', 'Glasgow'],
  },
};

// Seasonal events — temporary subscriptions that prioritize a topic for the duration
// of the event, then auto-sunset a few days after coverage tapers off.
// "active" = currently happening, suggested in dashboard prompt.
// "upcoming" = within the next 2 weeks, surfaced as advance notice.
const SEASONAL_EVENTS = [
  {
    id: 'cannes-2026', title: 'Cannes Film Festival', emoji: '🎬',
    category: 'Culture', region: 'Global',
    dates: 'May 14 – 25', durationDays: 12,
    status: 'active', startsLabel: 'starts today',
    blurb: 'Twelve days of premieres, jury politics, and red-carpet moments. Bong Joon-ho opens this year.',
    expectedStories: '6-10 stories', color: '#B8421A',
  },
  {
    id: 'fed-decision-may', title: 'Fed rate decision', emoji: '📊',
    category: 'Markets', region: 'Global',
    dates: 'May 21', durationDays: 5,
    status: 'upcoming', startsLabel: 'in 7 days',
    blurb: 'Markets recalibrating. The Fed\'s May meeting follows the BoJ shift — global rate watchers tuning in.',
    expectedStories: '4-6 stories', color: '#854F0B',
  },
  {
    id: 'champions-league-final', title: 'Champions League final', emoji: '⚽',
    category: 'Sports', region: 'Global',
    dates: 'May 31', durationDays: 4,
    status: 'upcoming', startsLabel: 'in 17 days',
    blurb: 'Europe\'s biggest club football match of the year. Wembley hosts.',
    expectedStories: '3-5 stories', color: '#993C1D',
  },
];

function LocationCard({ location, setLocation }) {
  const [expanded, setExpanded] = useState(false);
  const [step, setStep] = useState('country'); // 'country' | 'region' | 'city'

  const country = location?.country || null;
  const region = location?.region || null;
  const city = location?.city || null;

  const display = city || region || country || null;
  const isSet = !!country;

  // Helpers
  const clear = () => { setLocation(null); setStep('country'); };
  const pickCountry = (c) => { setLocation({ country: c }); setStep('region'); };
  const pickRegion = (r) => { setLocation({ ...location, region: r, city: null }); setStep('city'); };
  const pickCity = (c) => { setLocation({ ...location, city: c }); setExpanded(false); setStep('country'); };

  const breadcrumbLabel = step === 'country'
    ? 'Pick your country'
    : step === 'region'
      ? `${country} · pick your region`
      : `${country} · ${region} · pick your city`;

  return (
    <div className="border border-gray-200 rounded-2xl p-3.5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: colors.blueLight, color: colors.blueDark, fontSize: 18 }}>
          📍
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-medium leading-tight" style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}>Local news</h3>
          <p className="text-[11px] text-gray-500 mt-0.5">
            {isSet
              ? <>Following <span className="font-medium text-gray-700">{display}</span></>
              : 'Tell us where you live so we can surface local stories.'}
          </p>
        </div>
        {isSet && (
          <button onClick={clear} className="text-[11px] text-gray-400 hover:text-gray-600 px-2 py-1">
            Clear
          </button>
        )}
      </div>

      {/* Expand/collapse pickers */}
      {!expanded && !isSet && (
        <button onClick={() => { setExpanded(true); setStep('country'); }}
          className="w-full mt-1 py-2 rounded-md text-[12px] font-medium border transition-colors"
          style={{ background: colors.blue, color: '#fff', borderColor: colors.blue }}>
          Set location
        </button>
      )}
      {!expanded && isSet && (
        <button onClick={() => { setExpanded(true); setStep(city ? 'city' : region ? 'region' : 'country'); }}
          className="text-[11px] mt-1 font-medium" style={{ color: colors.blue }}>
          Change →
        </button>
      )}

      {expanded && (
        <>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-3 mb-2">{breadcrumbLabel}</p>
          {step === 'country' && (
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(REGIONS).map(c => (
                <button key={c} onClick={() => pickCountry(c)}
                  className="px-2.5 py-1 text-[11px] rounded-full border transition-colors"
                  style={{ background: '#fff', color: '#6B7280', borderColor: '#E5E7EB' }}>
                  {c}
                </button>
              ))}
            </div>
          )}
          {step === 'region' && country && (
            <>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(REGIONS[country] || {}).map(r => (
                  <button key={r} onClick={() => pickRegion(r)}
                    className="px-2.5 py-1 text-[11px] rounded-full border transition-colors"
                    style={{ background: '#fff', color: '#6B7280', borderColor: '#E5E7EB' }}>
                    {r}
                  </button>
                ))}
              </div>
              <button onClick={() => { setExpanded(false); }}
                className="mt-2 text-[11px] text-gray-500">Stop at {country} →</button>
            </>
          )}
          {step === 'city' && country && region && (
            <>
              <div className="flex flex-wrap gap-1.5">
                {(REGIONS[country][region] || []).map(c => (
                  <button key={c} onClick={() => pickCity(c)}
                    className="px-2.5 py-1 text-[11px] rounded-full border transition-colors"
                    style={{ background: '#fff', color: '#6B7280', borderColor: '#E5E7EB' }}>
                    {c}
                  </button>
                ))}
              </div>
              <button onClick={() => { setExpanded(false); }}
                className="mt-2 text-[11px] text-gray-500">Stop at {region} →</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

function PriorityTopicCard({ topic, interest, setInterest, understanding, setUnderstanding, subgenres, setSubgenres }) {
  const [expanded, setExpanded] = useState(false);
  const interestLevels = [
    { v: 0, label: 'Skip' },
    { v: 1, label: 'Dip in', accent: true },
    { v: 2, label: 'Light' },
    { v: 3, label: 'Standard' },
    { v: 4, label: 'Heavy' },
  ];
  const understandingLevels = [
    { v: 'new', label: 'New to it' },
    { v: 'familiar', label: 'Familiar' },
    { v: 'confident', label: 'Confident' },
  ];
  const isSkipped = interest === 0;
  const isDipIn = interest === 1;
  const availableSubgenres = SUBGENRES[topic] || [];
  const selectedCount = subgenres ? subgenres.length : 0;
  const toggleSub = (sg) => {
    if (!setSubgenres) return;
    const next = subgenres.includes(sg) ? subgenres.filter(x => x !== sg) : [...subgenres, sg];
    setSubgenres(next);
  };
  return (
    <div className="border border-gray-200 rounded-2xl p-3.5" style={{ opacity: isSkipped ? 0.6 : 1, transition: 'opacity 200ms' }}>
      <div className="flex items-center gap-3 mb-3">
        <StoryCover story={{ id: '__topic__', category: topic }} size={36} rounded="rounded-lg"/>
        <h3 className="text-[15px] font-medium flex-1" style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}>{topic}</h3>
      </div>
      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Interest</p>
      <div className="flex gap-1 mb-1.5">
        {interestLevels.map(o => {
          const active = interest === o.v;
          // "Dip in" uses the aperture lavender, signaling its connection to the stretches-you mechanism
          const activeStyle = o.accent
            ? { background: '#8B7AC4', color: '#fff', borderColor: '#8B7AC4' }
            : { background: colors.blue, color: '#fff', borderColor: colors.blue };
          return (
            <button key={o.v} onClick={() => setInterest(o.v)}
              className="flex-1 py-1.5 text-[10.5px] rounded-md border transition-colors"
              style={active ? activeStyle : { background: '#fff', color: '#6B7280', borderColor: '#E5E7EB' }}>
              {o.label}
            </button>
          );
        })}
      </div>
      {isDipIn && (
        <p className="text-[10.5px] mb-3 leading-relaxed" style={{ color: '#6D5BB7' }}>
          Occasional stories to widen your view — picked when they're worth the stretch.
        </p>
      )}
      {!isDipIn && <div className="mb-1.5"/>}
      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Familiarity</p>
      <div className="flex gap-1">
        {understandingLevels.map(o => {
          const active = understanding === o.v;
          return (
            <button key={o.v} onClick={() => setUnderstanding(o.v)} disabled={isSkipped}
              className="flex-1 py-1.5 text-[11px] rounded-md border transition-colors"
              style={active ? { background: '#111', color: '#fff', borderColor: '#111' } : { background: '#fff', color: '#6B7280', borderColor: '#E5E7EB' }}>
              {o.label}
            </button>
          );
        })}
      </div>
      {!isSkipped && availableSubgenres.length > 0 && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 mt-3 text-[11px] font-medium"
            style={{ color: colors.blue }}>
            {expanded ? 'Hide specifics' : selectedCount > 0 ? `Specifics · ${selectedCount} selected` : 'Add specifics'}
            <ChevronRight className="w-3 h-3 transition-transform" style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}/>
          </button>
          {expanded && (
            <>
              <p className="text-[10.5px] text-gray-500 mt-2 mb-1.5">Pick any that matter to you. Leave blank to get everything in {topic}.</p>
              <div className="flex flex-wrap gap-1.5">
                {availableSubgenres.map(sg => {
                  const active = subgenres && subgenres.includes(sg);
                  return (
                    <button key={sg} onClick={() => toggleSub(sg)}
                      className="px-2.5 py-1 text-[11px] rounded-full border transition-colors"
                      style={active
                        ? { background: colors.blueLight, color: colors.blueDark, borderColor: colors.blue }
                        : { background: '#fff', color: '#6B7280', borderColor: '#E5E7EB' }}>
                      {sg}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function OnboardingPriorities({ onNext, onBack, topicValues, setTopicValues, topicUnderstanding, setTopicUnderstanding, topicSubgenres, setTopicSubgenres, location, setLocation }) {
  const topics = ['World', 'Tech', 'Culture', 'Markets', 'Science', 'Sports'];
  return (
    <PhoneFrame>
      <StatusBar />
      <OnboardingHeader step={4} total={5} onSkip={onNext}/>
      <div style={{ minHeight: '640px' }} className="flex flex-col">
        <div className="px-6 pt-4 flex-1">
          <h2 style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontWeight: 500 }} className="text-[22px] leading-tight mb-3">What matters, and how well do you know it?</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-1">Two things help us serve you better.</p>
          <ul className="text-xs text-gray-500 leading-relaxed mb-5 space-y-1 mt-2">
            <li><span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ background: colors.blue }}/>How much of each you want to see</li>
            <li><span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ background: '#111' }}/>How much background context to pair with stories</li>
          </ul>
          <div className="space-y-2.5">
            <LocationCard location={location} setLocation={setLocation}/>
            {topics.map(t => (
              <PriorityTopicCard
                key={t}
                topic={t}
                interest={topicValues[t]}
                setInterest={(v) => setTopicValues({ ...topicValues, [t]: v })}
                understanding={topicUnderstanding[t]}
                setUnderstanding={(v) => setTopicUnderstanding({ ...topicUnderstanding, [t]: v })}
                subgenres={topicSubgenres[t] || []}
                setSubgenres={(v) => setTopicSubgenres({ ...topicSubgenres, [t]: v })}
              />
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-5 leading-relaxed">
            Add specifics if you want — say "AI" under Tech, or your league under Sports. We'll lighten background context as you become more familiar with each topic over time.
          </p>
        </div>
        <div className="px-5 pb-7 pt-4 flex gap-3">
          <button onClick={onBack} className="px-5 py-3.5 rounded-2xl text-sm font-medium text-gray-600 border border-gray-200">Back</button>
          <button onClick={onNext} className="flex-1 py-3.5 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 text-white"
            style={{ background: colors.blue }}>Continue <ArrowRight className="w-4 h-4"/></button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function OnboardingTopics({ onNext, onBack, balance, setBalance }) {
  return (
    <PhoneFrame>
      <StatusBar />
      <OnboardingHeader step={5} total={5} onSkip={onNext}/>
      <div style={{ minHeight: '640px' }} className="flex flex-col">
        <div className="px-6 pt-4 flex-1">
          <h2 style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontWeight: 500 }} className="text-[22px] leading-tight mb-3">A bigger picture, on purpose.</h2>
          <p className="text-sm text-gray-600 leading-relaxed">We can lean into what you like, or nudge you toward stories you'd usually skip. Pick a starting balance — you can change it any time.</p>
          <div className="mt-7 p-4 rounded-2xl bg-gray-50">
            <div className="flex justify-between text-[11px] text-gray-500 mb-2">
              <span>My interests</span>
              <span>Well-rounded</span>
            </div>
            <input type="range" min="0" max="100" value={balance} onChange={e => setBalance(Number(e.target.value))}
              className="w-full" style={{ accentColor: colors.blue }}/>
            <p className="text-xs text-gray-600 mt-3 leading-relaxed">
              {balance}% well-rounded. {balance < 40 ? 'You\'ll mostly see stories close to your interests.' : balance < 75 ? 'A balanced mix with regular nudges outside your usual.' : 'We\'ll push you toward stories that broaden your view rather than confirm it.'}
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-5">You can fine-tune individual topics later in <span style={{ color: colors.blue }} className="font-medium">Topics</span>.</p>
        </div>
        <div className="px-5 pb-7 pt-4 flex gap-3">
          <button onClick={onBack} className="px-5 py-3.5 rounded-2xl text-sm font-medium text-gray-600 border border-gray-200">Back</button>
          <button onClick={onNext} className="flex-1 py-3.5 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 text-white"
            style={{ background: colors.blue }}>Start reading <ArrowRight className="w-4 h-4"/></button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function AppHeader({ onMenu, dateLine, locationLabel, activeSeasonalEvents = [], onOpenSeasonal, userInitial = 'M' }) {
  const [showEventsPopover, setShowEventsPopover] = React.useState(false);
  const hasEvents = activeSeasonalEvents.length > 0;
  return (
    <div className="px-5 pt-2 pb-3 relative">
      <div className="flex justify-between items-center">
        <div className="min-w-0">
          <Wordmark size={17} color="#0B2B58"/>
          <div className="text-[11px] text-gray-400 mt-1 truncate">
            {dateLine}
            {locationLabel && (
              <>
                <span className="text-gray-300 mx-1.5">·</span>
                <span className="text-gray-400">{locationLabel}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Seasonal events icon — emoji stack if subscribed, plus-glyph otherwise */}
          <button
            onClick={() => {
              if (hasEvents) setShowEventsPopover(v => !v);
              else if (onOpenSeasonal) onOpenSeasonal();
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 relative"
            style={{
              background: hasEvents ? `${activeSeasonalEvents[0].color}12` : 'transparent',
              border: `1px solid ${hasEvents ? `${activeSeasonalEvents[0].color}40` : '#E5E7EB'}`,
            }}
            aria-label="Followed events"
            title={hasEvents ? `Following ${activeSeasonalEvents.length} event${activeSeasonalEvents.length === 1 ? '' : 's'}` : 'Follow an event'}>
            <Calendar
              className="w-[15px] h-[15px]"
              strokeWidth={2}
              style={{ color: hasEvents ? activeSeasonalEvents[0].color : '#6B7280' }}
            />
            {hasEvents && (
              <span
                className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center text-[9.5px] font-bold text-white"
                style={{ background: activeSeasonalEvents[0].color, boxShadow: '0 0 0 1.5px #fff' }}>
                {activeSeasonalEvents.length}
              </span>
            )}
          </button>
          <button onClick={onMenu}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-[13px] transition-transform hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${colors.blueDark} 0%, ${colors.blue} 100%)`, fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}
            aria-label="Open user menu">
            {userInitial}
          </button>
        </div>
      </div>

      {/* Followed-events popover */}
      {showEventsPopover && hasEvents && (
        <div className="absolute inset-0 z-30" onClick={() => setShowEventsPopover(false)}>
          <div className="absolute bg-white rounded-2xl overflow-hidden"
            style={{ top: 56, right: 50, width: 250, boxShadow: '0 12px 40px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.06)' }}
            onClick={e => e.stopPropagation()}>
            <div className="px-3.5 pt-3 pb-2 border-b border-gray-100">
              <div className="text-[10.5px] uppercase tracking-wider text-gray-400 font-semibold">Following</div>
            </div>
            {activeSeasonalEvents.map(e => (
              <div key={e.id} className="flex items-center gap-2.5 px-3.5 py-2.5 border-b border-gray-100 last:border-0">
                <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 text-[14px]"
                  style={{ background: `${e.color}18` }}>
                  {e.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-medium leading-tight truncate" style={{ color: e.color }}>{e.title}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{e.dates}</div>
                </div>
              </div>
            ))}
            <button
              onClick={() => { setShowEventsPopover(false); if (onOpenSeasonal) onOpenSeasonal(); }}
              className="w-full flex items-center justify-center gap-1 py-2.5 text-[11.5px] font-medium hover:bg-gray-50 transition-colors"
              style={{ color: colors.blue }}>
              <Plus className="w-3 h-3"/> Follow another event
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Story-specific editorial covers. SVG overlays sit on top of CSS gradient backgrounds.
const COVER_DESIGNS = {
  'cannes-bong': {
    bg: 'linear-gradient(165deg, #5C1A0F 0%, #B8421A 55%, #E89537 100%)',
    overlay: (
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        {[6, 14, 22, 30, 50, 58, 66, 74].map((x, i) => (
          <rect key={i} x={x} y="0" width="2" height="80" fill="#FED7AA" opacity={0.18 + (i % 3) * 0.08}/>
        ))}
        <circle cx="40" cy="40" r="22" fill="#FEF3C7" opacity="0.18"/>
        <circle cx="40" cy="40" r="12" fill="#FEF3C7" opacity="0.32"/>
        <circle cx="40" cy="40" r="5" fill="#FEF3C7" opacity="0.7"/>
      </svg>
    ),
  },
  'crispr-hearing': {
    bg: 'linear-gradient(135deg, #0A3D2E 0%, #0F766E 50%, #2DD4BF 100%)',
    overlay: (
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        <circle cx="40" cy="40" r="34" fill="none" stroke="white" strokeWidth="0.6" opacity="0.22"/>
        <circle cx="40" cy="40" r="24" fill="none" stroke="white" strokeWidth="0.8" opacity="0.32"/>
        <circle cx="40" cy="40" r="14" fill="none" stroke="white" strokeWidth="1" opacity="0.45"/>
        <circle cx="40" cy="40" r="5" fill="white" opacity="0.85"/>
        <path d="M14,18 Q40,40 66,18 M14,62 Q40,40 66,62" stroke="white" strokeWidth="0.8" fill="none" opacity="0.35"/>
      </svg>
    ),
  },
  'eu-india-trade': {
    bg: 'linear-gradient(135deg, #1E3A8A 0%, #5B21B6 50%, #F97316 100%)',
    overlay: (
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        <path d="M-5,40 Q20,15 40,40" stroke="white" strokeWidth="2" fill="none" opacity="0.45"/>
        <path d="M85,40 Q60,15 40,40" stroke="white" strokeWidth="2" fill="none" opacity="0.45"/>
        <path d="M-5,40 Q20,65 40,40" stroke="white" strokeWidth="1" fill="none" opacity="0.25"/>
        <path d="M85,40 Q60,65 40,40" stroke="white" strokeWidth="1" fill="none" opacity="0.25"/>
        <circle cx="40" cy="40" r="6" fill="white" opacity="0.9"/>
      </svg>
    ),
  },
  'apple-vision': {
    bg: 'linear-gradient(145deg, #1E293B 0%, #475569 60%, #94A3B8 100%)',
    overlay: (
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        <rect x="14" y="28" width="22" height="24" rx="11" fill="#F1F5F9" opacity="0.25"/>
        <rect x="44" y="28" width="22" height="24" rx="11" fill="#F1F5F9" opacity="0.25"/>
        <rect x="34" y="36" width="12" height="3" fill="#F1F5F9" opacity="0.5"/>
        <circle cx="25" cy="40" r="4" fill="#F1F5F9" opacity="0.6"/>
        <circle cx="55" cy="40" r="4" fill="#F1F5F9" opacity="0.6"/>
        <line x1="0" y1="68" x2="80" y2="68" stroke="white" strokeWidth="0.4" opacity="0.2"/>
        <line x1="0" y1="14" x2="80" y2="14" stroke="white" strokeWidth="0.4" opacity="0.2"/>
      </svg>
    ),
  },
  'boj-yen': {
    bg: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
    overlay: (
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        <line x1="0" y1="20" x2="80" y2="20" stroke="white" strokeWidth="0.3" opacity="0.12"/>
        <line x1="0" y1="40" x2="80" y2="40" stroke="white" strokeWidth="0.3" opacity="0.12"/>
        <line x1="0" y1="60" x2="80" y2="60" stroke="white" strokeWidth="0.3" opacity="0.12"/>
        <polyline points="4,18 16,28 26,22 36,38 48,52 60,62 76,68"
          fill="none" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="4,18 16,28 26,22 36,38 48,52 60,62 76,68 76,80 4,80 Z"
          fill="#EF4444" opacity="0.18"/>
        <circle cx="76" cy="68" r="2.5" fill="#EF4444"/>
      </svg>
    ),
  },
  'argentina-peso': {
    bg: 'linear-gradient(155deg, #1D4ED8 0%, #60A5FA 55%, #F0F9FF 100%)',
    overlay: (
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        <circle cx="40" cy="40" r="22" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5"/>
        <text x="40" y="48" textAnchor="middle" fill="white" opacity="0.9" fontSize="22" fontWeight="600">$</text>
        <line x1="40" y1="14" x2="40" y2="66" stroke="white" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,3"/>
      </svg>
    ),
  },
  'climate-finance': {
    bg: 'linear-gradient(180deg, #075985 0%, #0EA5E9 60%, #BAE6FD 100%)',
    overlay: (
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        <path d="M-5,52 Q20,42 40,48 T85,46 L85,80 L-5,80 Z" fill="white" opacity="0.2"/>
        <path d="M-5,62 Q20,54 40,58 T85,56 L85,80 L-5,80 Z" fill="white" opacity="0.25"/>
        <circle cx="58" cy="22" r="6" fill="#FEF3C7" opacity="0.8"/>
        <circle cx="58" cy="22" r="10" fill="#FEF3C7" opacity="0.25"/>
      </svg>
    ),
  },
  'ai-music-copyright': {
    bg: 'linear-gradient(140deg, #581C87 0%, #BE185D 50%, #F472B6 100%)',
    overlay: (
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        {[14, 22, 30, 38, 46, 54, 62, 70].map((x, i) => {
          const h = [18, 32, 22, 44, 28, 38, 16, 26][i];
          return <rect key={i} x={x-1.5} y={40-h/2} width="3" height={h} rx="1.5" fill="white" opacity={0.4 + (i % 3) * 0.15}/>;
        })}
      </svg>
    ),
  },
  'f1-africa': {
    bg: 'linear-gradient(135deg, #7C2D12 0%, #EA580C 60%, #FDBA74 100%)',
    overlay: (
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        <path d="M-5,55 L85,25" stroke="white" strokeWidth="1.5" opacity="0.4"/>
        <path d="M-5,65 L85,35" stroke="white" strokeWidth="1" opacity="0.3"/>
        <path d="M-5,45 L85,15" stroke="white" strokeWidth="0.8" opacity="0.25"/>
        <circle cx="55" cy="38" r="5" fill="white" opacity="0.85"/>
        <circle cx="55" cy="38" r="8" fill="white" opacity="0.25"/>
      </svg>
    ),
  },
};

const CATEGORY_DESIGNS = {
  World: {
    bg: 'linear-gradient(135deg, #134E4A 0%, #0D9488 100%)',
    overlay: (
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        <circle cx="40" cy="40" r="26" fill="none" stroke="white" strokeWidth="1" opacity="0.4"/>
        <ellipse cx="40" cy="40" rx="26" ry="10" fill="none" stroke="white" strokeWidth="0.8" opacity="0.3"/>
        <line x1="14" y1="40" x2="66" y2="40" stroke="white" strokeWidth="0.6" opacity="0.3"/>
      </svg>
    ),
  },
  Tech: {
    bg: 'linear-gradient(145deg, #1E293B 0%, #6366F1 100%)',
    overlay: (
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        <rect x="20" y="22" width="40" height="28" rx="2.5" fill="none" stroke="white" strokeWidth="1" opacity="0.45"/>
        <line x1="20" y1="32" x2="60" y2="32" stroke="white" strokeWidth="0.6" opacity="0.3"/>
        <circle cx="40" cy="60" r="2" fill="white" opacity="0.6"/>
      </svg>
    ),
  },
  Culture: {
    bg: 'linear-gradient(135deg, #831843 0%, #DB2777 100%)',
    overlay: (
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        {[14, 22, 30, 50, 58, 66].map((x, i) => (
          <rect key={i} x={x} y="0" width="1.5" height="80" fill="white" opacity={0.2 + (i % 2) * 0.1}/>
        ))}
        <circle cx="40" cy="40" r="14" fill="white" opacity="0.15"/>
      </svg>
    ),
  },
  Markets: {
    bg: 'linear-gradient(175deg, #0F172A 0%, #334155 100%)',
    overlay: (
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        <line x1="0" y1="30" x2="80" y2="30" stroke="white" strokeWidth="0.3" opacity="0.15"/>
        <line x1="0" y1="50" x2="80" y2="50" stroke="white" strokeWidth="0.3" opacity="0.15"/>
        <polyline points="6,52 18,44 28,48 38,32 50,36 62,24 74,18" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  Science: {
    bg: 'linear-gradient(145deg, #064E3B 0%, #10B981 100%)',
    overlay: (
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        <circle cx="40" cy="40" r="6" fill="white" opacity="0.6"/>
        <circle cx="40" cy="40" r="18" fill="none" stroke="white" strokeWidth="1" opacity="0.4"/>
        <circle cx="22" cy="22" r="3" fill="white" opacity="0.7"/>
        <circle cx="58" cy="58" r="3" fill="white" opacity="0.7"/>
        <line x1="22" y1="22" x2="40" y2="40" stroke="white" strokeWidth="0.6" opacity="0.4"/>
        <line x1="58" y1="58" x2="40" y2="40" stroke="white" strokeWidth="0.6" opacity="0.4"/>
      </svg>
    ),
  },
  Sports: {
    bg: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
    overlay: (
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        <circle cx="40" cy="40" r="20" fill="none" stroke="white" strokeWidth="1" opacity="0.4"/>
        <path d="M40,20 L40,60 M20,40 L60,40" stroke="white" strokeWidth="0.8" opacity="0.3"/>
        <circle cx="40" cy="40" r="6" fill="white" opacity="0.6"/>
      </svg>
    ),
  },
};

function StoryCover({ story, size = 72, rounded = 'rounded-xl' }) {
  const design = COVER_DESIGNS[story.id] || CATEGORY_DESIGNS[story.category] || CATEGORY_DESIGNS.World;
  return (
    <div className={`${rounded} overflow-hidden flex-shrink-0 relative`}
      style={{ width: size, height: size, background: design.bg }}>
      <div className="absolute inset-0">
        {design.overlay}
      </div>
    </div>
  );
}

// Backwards-compat alias (in case anything else uses TopicThumb)
function TopicThumb({ category, size = 72 }) {
  return <StoryCover story={{ id: '__none__', category }} size={size}/>;
}

function getInitial(name) {
  const cleaned = name.replace(/^The\s+/i, '');
  const words = cleaned.split(/\s+/);
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return words.map(w => w.charAt(0)).join('').toUpperCase().slice(0, 2);
}

function SourceAvatar({ name, mode, size = 28 }) {
  const colorMap = {
    reporting: colors.reporting,
    analysis: colors.analysis,
    opinion: colors.opinion,
  };
  return (
    <div className="rounded-full flex items-center justify-center flex-shrink-0 text-white font-medium"
      style={{ width: size, height: size, background: colorMap[mode] || colors.gray, fontSize: size <= 24 ? '10px' : '11px' }}>
      {getInitial(name)}
    </div>
  );
}

function StoryRow({ story, isRead, isAnimating, onClick }) {
  const { enabled: apertureEnabled } = useAperture();
  const showAperture = apertureEnabled && story.isAperture;
  const seasonalEvent = useStoryEvent(story);
  if (isRead) {
    return (
      <div className="py-2.5 border-b border-gray-100 opacity-40 transition-all duration-300">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400">{story.category}</span>
          <Check className="w-3.5 h-3.5" style={{ color: colors.teal }}/>
        </div>
        <h4 className="text-[13px] font-medium leading-snug mt-0.5 line-through" style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}>
          {story.headline}
        </h4>
      </div>
    );
  }
  return (
    <div className={`py-3.5 border-b border-gray-100 cursor-pointer transition-all duration-300 flex gap-3 ${isAnimating ? 'opacity-50' : ''}`}
      onClick={onClick}
      style={seasonalEvent ? {
        borderLeft: `4px solid ${seasonalEvent.color}`,
        paddingLeft: '14px',
        marginLeft: '-18px',
        marginRight: '-4px',
        paddingRight: '4px',
        background: `${seasonalEvent.color}08`,
      } : {}}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <span className="text-[11px] text-gray-400">{story.category}</span>
          {story.isNew && <span className="w-1.5 h-1.5 rounded-full" style={{ background: colors.blue }}/>}
          {seasonalEvent && <SeasonalBadge event={seasonalEvent} variant="compact"/>}
          {showAperture && <ApertureBadge variant="compact"/>}
        </div>
        <h4 className="text-[13px] font-medium leading-snug mb-1.5" style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}>
          {story.headline}
        </h4>
        <p className="text-[11px] text-gray-500 leading-relaxed mb-2">{story.teaser}</p>
        <div className="flex items-center gap-2 text-[11px] text-gray-400">
          <div className="w-14"><SpectrumBar left={story.spectrum.left} center={story.spectrum.center} right={story.spectrum.right} height={6}/></div>
          <span>{story.tilt} · {story.spectrum.left + story.spectrum.center + story.spectrum.right} sources</span>
        </div>
      </div>
      <StoryCover story={story} size={72}/>
    </div>
  );
}

function SpectrumSelector({ tier, setTier, storyCount, timeLabel }) {
  const tiers = [
    { id: 'headlines', label: 'Headlines' },
    { id: 'brief', label: 'Brief' },
    { id: 'deep', label: 'Deep dive' },
  ];
  const activeIdx = tiers.findIndex(t => t.id === tier);
  return (
    <div className="mb-5">
      <div className="flex justify-between items-baseline mb-3">
        <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Today's read</span>
        <span className="text-[11px] text-gray-700">{storyCount} {storyCount === 1 ? 'story' : 'stories'} · {timeLabel}</span>
      </div>
      <div className="relative px-1">
        <div className="absolute h-px bg-gray-200" style={{ top: '6px', left: '8px', right: '8px' }}/>
        <div className="absolute h-px transition-all duration-300" style={{
          top: '6px', left: '8px',
          width: activeIdx === 0 ? '0' : activeIdx === 1 ? 'calc(50% - 8px)' : 'calc(100% - 16px)',
          background: colors.blue,
        }}/>
        <div className="flex justify-between relative">
          {tiers.map((t, i) => {
            const active = i === activeIdx;
            const passed = i < activeIdx;
            return (
              <button key={t.id} onClick={() => setTier(t.id)} className="flex flex-col items-center gap-1.5 -mx-2 px-2 z-10">
                <div className="w-3 h-3 rounded-full transition-colors"
                  style={active ? { background: colors.blue, boxShadow: `0 0 0 3px ${colors.blueLight}` }
                    : passed ? { background: colors.blue }
                    : { background: '#fff', border: '1.5px solid #D1D5DB' }}/>
                <span className={`text-[11px] transition-colors ${active ? 'font-medium text-gray-900' : 'text-gray-400'}`}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TierSelector(props) { return <SpectrumSelector {...props}/>; }

function ProgressBar({ done, total, dayNum }) {
  const pct = total ? (done / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: colors.blue }}/>
      </div>
      <span className="text-xs text-gray-500 font-medium whitespace-nowrap">{done} of {total} · day {dayNum}</span>
    </div>
  );
}

function SectionDivider({ id, label, subtitle }) {
  return (
    <div id={id} className="my-7 flex items-center gap-3 scroll-mt-4">
      <div className="h-px flex-1 bg-gray-200"/>
      <div className="text-center px-2">
        <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-0.5">Section</p>
        <h3 className="text-[17px] leading-tight" style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontVariationSettings: "'opsz' 12, 'wght' 480" }}>{label}</h3>
        {subtitle && <p className="text-[10.5px] text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="h-px flex-1 bg-gray-200"/>
    </div>
  );
}

function TodayScreen({ tier, setTier, stories, readIds, animatingId, onStoryClick, pulseMode, setPulseMode, onSeeAllChatter }) {
  const total = stories.length;
  const done = stories.filter(s => readIds.has(s.id)).length;

  const glanceIds = new Set(TODAYS_GLANCE.map(g => g.storyId));
  const briefDetailStories = stories.filter(s => !glanceIds.has(s.id) && s.tier === 'brief');
  const deepDetailStories = stories.filter(s => !glanceIds.has(s.id) && s.tier === 'deep');

  const tierCounts = { headlines: 5, brief: 9, deep: 13 };
  const tierTimes = { headlines: '~2 min', brief: '~5 min', deep: '~15 min' };
  const currentStoryCount = tierCounts[tier];
  const totalReadTime = tierTimes[tier];

  // Auto-update active tier indicator as user scrolls
  React.useEffect(() => {
    const sections = [
      { id: 'section-headlines', tier: 'headlines' },
      { id: 'section-brief', tier: 'brief' },
      { id: 'section-deep', tier: 'deep' },
    ];
    const observer = new IntersectionObserver((entries) => {
      // Pick the topmost section currently intersecting the upper half of viewport
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length > 0) {
        const matching = sections.find(s => s.id === visible[0].target.id);
        if (matching) setTier(matching.tier);
      }
    }, { rootMargin: '0px 0px -65% 0px', threshold: [0, 0.1] });
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [setTier]);

  const handleSpectrumTap = (newTier) => {
    setTier(newTier);
    const targetId = newTier === 'headlines' ? 'section-headlines' : newTier === 'brief' ? 'section-brief' : 'section-deep';
    requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const bySection = {};
  deepDetailStories.forEach(s => {
    if (!bySection[s.section]) bySection[s.section] = [];
    bySection[s.section].push(s);
  });

  return (
    <div className="px-5">
      <SpectrumSelector tier={tier} setTier={handleSpectrumTap} storyCount={currentStoryCount} timeLabel={totalReadTime}/>
      <ProgressBar done={done} total={total} dayNum={12}/>

      <div id="section-headlines" className="scroll-mt-4">
        <PulseSection
          items={TODAYS_GLANCE}
          readIds={readIds}
          onItemClick={onStoryClick}
          pulseMode={pulseMode}
          setPulseMode={setPulseMode}
          onSeeAllChatter={onSeeAllChatter}
          onChatterTap={onStoryClick}
        />
      </div>

      <SectionDivider id="section-brief" label="Brief" subtitle="Today's nine stories, in more depth"/>
      <div>
        {briefDetailStories.map(s => (
          <StoryRow key={s.id} story={s} isRead={readIds.has(s.id)} isAnimating={animatingId === s.id} onClick={() => onStoryClick(s.id)}/>
        ))}
      </div>

      <SectionDivider id="section-deep" label="Deep dive" subtitle="A full daily paper, organized"/>
      {Object.entries(bySection).map(([section, secStories]) => (
        <div key={section} className="mb-3">
          <div className="flex justify-between items-baseline pt-2 pb-1">
            <h3 className="text-[14px] font-medium" style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}>{section}</h3>
            <span className="text-[11px] text-gray-400">{secStories.length} {secStories.length === 1 ? 'story' : 'stories'}</span>
          </div>
          <div>
            {secStories.map(s => (
              <StoryRow key={s.id} story={s} isRead={readIds.has(s.id)} isAnimating={animatingId === s.id} onClick={() => onStoryClick(s.id)}/>
            ))}
          </div>
        </div>
      ))}

      <div className="my-5 p-4 rounded-2xl bg-gray-50 text-center">
        <p className="text-xs text-gray-600 mb-3">{total - done > 0 ? `${total - done} more to clear today's paper.` : "Today's paper is empty."}</p>
        <button className="text-[13px] font-medium px-4 py-2 rounded-lg inline-flex items-center gap-1.5"
          style={{ background: '#111', color: '#fff' }}>
          Continue exploring <ArrowRight className="w-3.5 h-3.5"/>
        </button>
        <p className="text-[11px] text-gray-400 mt-2.5">Multi-paper deep dive. Only place infinite scroll lives.</p>
      </div>
    </div>
  );
}

function BiggerPictureCard({ item, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden transition-colors">
      <button onClick={() => setOpen(!open)} className="w-full px-4 py-3 flex items-center gap-3 text-left">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: colors.blueLight, color: colors.blueDark }}>
          <Lightbulb className="w-3.5 h-3.5" strokeWidth={2}/>
        </div>
        <h4 className="text-[13.5px] font-medium flex-1" style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}>{item.title}</h4>
        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}/>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0">
          <p className="text-[12.5px] text-gray-700 leading-relaxed">{item.blurb}</p>
          {item.learnMore && (
            <button className="mt-2.5 text-[12px] font-medium flex items-center gap-1" style={{ color: colors.blue }}>
              {typeof item.learnMore === 'string' ? item.learnMore : 'Learn more'} <ArrowRight className="w-3 h-3"/>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function BiggerPictureSection({ items, understanding }) {
  if (!items || items.length === 0) return null;
  // Familiarity drives initial expand state.
  // "new" → all expanded. "familiar" → first one expanded. "confident" → all collapsed.
  const expandedByDefault = (i) => {
    if (understanding === 'new') return true;
    if (understanding === 'familiar') return i === 0;
    return false;
  };
  const label = understanding === 'new' ? 'Step back · expanded for you' : understanding === 'confident' ? 'Step back' : 'The bigger picture';
  const sublabel = understanding === 'new'
    ? "You marked this topic New, so we've expanded the framing."
    : understanding === 'confident'
      ? 'Tap any to refresh memory'
      : 'Where this story sits in the larger conversation';
  return (
    <>
      <div className="flex items-baseline justify-between mt-5 mb-2">
        <p className="text-[11px] text-gray-400 font-medium italic" style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}>{label}</p>
        <span className="text-[10.5px] text-gray-400">{sublabel}</span>
      </div>
      <div className="space-y-2 mb-2">
        {items.map((item, i) => (
          <BiggerPictureCard key={i} item={item} defaultOpen={expandedByDefault(i)}/>
        ))}
      </div>
    </>
  );
}

function ContextCard({ item }) {
  const toneColors = {
    culture: { bg: '#FBEAF0', color: '#9D174D' },
    event: { bg: '#FEF3C7', color: '#92400E' },
    work: { bg: '#E0E7FF', color: '#3730A3' },
    science: { bg: '#D1FAE5', color: '#065F46' },
    tech: { bg: '#E0E7FF', color: '#1E40AF' },
    markets: { bg: '#FEE2E2', color: '#991B1B' },
    world: { bg: '#CCFBF1', color: '#115E59' },
    concept: { bg: '#F3E8FF', color: '#6B21A8' },
  };
  const tone = toneColors[item.tone] || toneColors.concept;
  return (
    <div className="flex gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer transition-colors">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-medium"
        style={{ background: tone.bg, color: tone.color, fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontSize: '17px' }}>
        {item.initial || item.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[13px] font-medium">{item.name}</span>
          <span className="text-[10px] uppercase tracking-wider text-gray-400">{item.type}</span>
        </div>
        <p className="text-[11px] text-gray-600 leading-relaxed mb-1.5">{item.blurb}</p>
        <span className="text-[11px] font-medium" style={{ color: colors.blue }}>Read more →</span>
      </div>
    </div>
  );
}

function StoryDetail({ story, onBack, onMarkRead, onToggleSave, isSaved, isAnimating, understanding }) {
  const { enabled: apertureEnabled } = useAperture();
  const showAperture = apertureEnabled && story.isAperture;
  const seasonalEvent = useStoryEvent(story);
  const total = story.spectrum.left + story.spectrum.center + story.spectrum.right;
  return (
    <div className={`flex flex-col transition-opacity duration-200 ${isAnimating ? 'opacity-40' : 'opacity-100'}`} style={{ minHeight: '720px' }}>
      <StatusBar time="8:43"/>
      {/* Prominent event banner — declares "this is part of the followed event" */}
      {seasonalEvent && (
        <div className="px-5 py-2 flex items-center gap-2"
          style={{ background: `${seasonalEvent.color}14`, borderBottom: `1px solid ${seasonalEvent.color}30` }}>
          <span className="text-[15px]">{seasonalEvent.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="text-[10.5px] uppercase tracking-wider font-semibold leading-tight"
              style={{ color: seasonalEvent.color }}>
              Part of {seasonalEvent.title}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">
              {seasonalEvent.dates} · you're following this event
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center px-5 pt-2 pb-3.5">
        <button onClick={onBack} className="flex items-center gap-0.5 text-[13px] font-medium">
          <ChevronLeft className="w-[18px] h-[18px]"/> Brief
        </button>
      </div>
      <div className="flex-1 px-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="inline-block px-2.5 py-1 rounded-xl text-[11px] font-medium"
            style={{ background: colors.blueLight, color: colors.blueDark }}>{story.category}</span>
          <span className="text-[11px] text-gray-400">This morning · {story.readTime} read</span>
          {seasonalEvent && <SeasonalBadge event={seasonalEvent} variant="detail"/>}
          {showAperture && <ApertureBadge variant="detail"/>}
        </div>
        <h1 style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontWeight: 500 }} className="text-[24px] leading-[1.2] tracking-tight mb-4">
          {story.headline}
        </h1>
        <p className="text-[11px] text-gray-400 mt-5 mb-2 font-medium italic" style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}>The story</p>
        {story.paragraphs.map((p, i) => (
          <p key={i} className="text-[14px] leading-relaxed text-gray-900 mb-2.5">{p}</p>
        ))}

        <p className="text-[11px] text-gray-400 mt-5 mb-2 font-medium italic" style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}>How this is landing</p>
        <div className="rounded-xl bg-gray-50 px-3.5 py-3">
          <p className="text-xs text-gray-600 font-medium flex items-center gap-1.5 mb-2"><Newspaper className="w-3.5 h-3.5 text-gray-400"/>Coverage focus · {total} outlets</p>
          <div className="flex justify-between text-[11px] mb-1">
            <span style={{ color: colors.reporting }}>Reporting · {story.spectrum.left}</span>
            <span style={{ color: colors.analysis }}>Analysis · {story.spectrum.center}</span>
            <span style={{ color: colors.opinion }}>Opinion · {story.spectrum.right}</span>
          </div>
          <SpectrumBar left={story.spectrum.left} center={story.spectrum.center} right={story.spectrum.right}/>
          <div className="text-[11px] text-gray-600 text-center mt-1.5">{story.tilt} · "{story.quote}"</div>

          <div className="h-px bg-gray-200 my-3.5"/>

          <p className="text-xs text-gray-600 font-medium flex items-center gap-1.5 mb-2"><MessageSquare className="w-3.5 h-3.5 text-gray-400"/>Social pulse · ~12k posts in 24h</p>
          <div className="flex justify-between text-[11px] mb-1">
            <span style={{ color: '#3B6D11' }}>Positive · {story.social.positive}%</span>
            <span className="text-gray-500">Mixed · {story.social.mixed}%</span>
            <span style={{ color: colors.coralDark }}>Critical · {story.social.critical}%</span>
          </div>
          <SpectrumBar left={story.social.positive} center={story.social.mixed} right={story.social.critical} type="social"/>
          <div className="text-[11px] text-gray-400 text-center mt-1.5">{story.social.note}</div>
        </div>

        <BiggerPictureSection items={story.biggerPicture} understanding={understanding}/>

        {story.context && story.context.length > 0 && (
          <>
            <div className="flex items-baseline justify-between mt-5 mb-2">
              <p className="text-[11px] text-gray-400 font-medium italic" style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}>Background</p>
              {understanding === 'new' && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: '#FEF3C7', color: '#92400E' }}>
                  Extra context · marked New
                </span>
              )}
              {understanding === 'familiar' && (
                <span className="text-[10px] text-gray-400">Quick refresher</span>
              )}
            </div>
            {understanding === 'confident' ? (
              <details className="mb-2">
                <summary className="text-[12px] text-gray-500 cursor-pointer py-2 flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3"/> Background available ({story.context.length} entities)
                </summary>
                <div className="space-y-2 mt-2">
                  {story.context.map((c, i) => <ContextCard key={i} item={c}/>)}
                </div>
              </details>
            ) : (
              <div className="space-y-2 mb-2">
                {story.context.map((c, i) => <ContextCard key={i} item={c}/>)}
              </div>
            )}
          </>
        )}

        <p className="text-[11px] text-gray-400 mt-5 mb-2 font-medium italic" style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}>Read the original</p>
        {story.sources.slice(0, 3).map((s, i) => (
          <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
            <SourceAvatar name={s.name} mode={s.mode} size={32}/>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-gray-600 mb-0.5 flex items-center gap-1.5">
                <span>{s.name}</span>
                <span className="text-gray-300">·</span>
                <span className="capitalize" style={{ color: s.mode === 'reporting' ? colors.reporting : s.mode === 'analysis' ? colors.analysis : colors.opinion }}>{s.mode}</span>
              </div>
              <p style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }} className="text-[13px] font-medium leading-snug">{s.headline}</p>
            </div>
            <span className="text-xs font-medium flex items-center gap-0.5 whitespace-nowrap" style={{ color: colors.blue }}>
              Read <ExternalLink className="w-3 h-3"/>
            </span>
          </div>
        ))}
        {story.sources.length > 3 && (
          <button className="w-full mt-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-600">
            Show {story.sources.length - 3} more sources
          </button>
        )}
      </div>

      <div className="flex gap-2 px-5 pt-4 pb-5 border-t border-gray-100 mt-5 items-stretch">
        <button onClick={onMarkRead}
          className="flex-1 py-3 rounded-xl text-[13px] font-medium flex items-center justify-center gap-1.5 text-white"
          style={{ background: colors.blue }}>
          <Check className="w-4 h-4"/> Mark as read
        </button>
        <button onClick={onToggleSave} className="px-3.5 rounded-xl border border-gray-200 flex items-center justify-center"
          style={{ background: isSaved ? colors.blueLight : '#fff' }}>
          <Bookmark className="w-4 h-4" fill={isSaved ? colors.blue : 'none'} style={{ color: isSaved ? colors.blue : '#111' }}/>
        </button>
        <button className="px-3.5 rounded-xl border border-gray-200 flex items-center justify-center">
          <Share2 className="w-4 h-4 text-gray-900"/>
        </button>
      </div>
    </div>
  );
}

function ExploreScreen({ onBack }) {
  return (
    <div className="flex flex-col" style={{ minHeight: '720px' }}>
      <StatusBar time="8:51"/>
      <div className="flex justify-between items-center px-5 pt-2 pb-3.5">
        <button onClick={onBack} className="flex items-center gap-0.5 text-[13px] font-medium">
          <ChevronLeft className="w-[18px] h-[18px]"/> Today
        </button>
        <div style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }} className="text-[15px] font-medium">Explore</div>
        <Search className="w-[18px] h-[18px] text-gray-900"/>
      </div>
      <div className="px-5">
        <p className="text-xs text-gray-600 leading-relaxed mb-3">Beyond today's paper. Multiple sources, long reads, archives. Scroll as long as you like.</p>
        <div className="flex gap-1.5 overflow-x-auto mb-4 pb-1">
          {['All', 'Long reads', 'By source', 'By region', 'This week'].map((f, i) => (
            <button key={f} className="px-3 py-1.5 rounded-full border whitespace-nowrap text-[11px] font-medium"
              style={i === 0 ? { background: '#111', color: '#fff', borderColor: '#111' } : { background: '#fff', color: '#6B7280', borderColor: '#E5E7EB' }}>
              {f}
            </button>
          ))}
        </div>
        {[
          { src: 'Financial Times', srcMode: 'analysis', time: '2h ago · long read', h: 'The hidden architecture of the EU–India trade deal', p: 'Eight years of negotiations produced more than tariff schedules — a strategic recalibration few outlets are covering.', tilt: 'analysis-heavy · 7 min', spec: [3, 6, 2] },
          { src: 'The Atlantic', srcMode: 'opinion', time: '6h ago · feature', h: 'Why the gene-therapy hearing trial may change deaf education forever', p: 'A look at the families behind the nine restored hearings — and the wider debate inside the Deaf community.', tilt: 'opinion-led · 12 min', spec: [2, 3, 6] },
          { src: 'The Economist', srcMode: 'analysis', time: '1d ago · weekly briefing', h: "Argentina's peso reform: lessons from a country that's tried this before", p: 'The fourth currency reset in three decades. What worked, what failed, and what\'s different this time.', tilt: 'analysis-heavy · 9 min', spec: [2, 6, 3] },
        ].map((c, i) => (
          <div key={i} className="p-3.5 bg-white border border-gray-200 rounded-2xl mb-2.5 flex gap-3">
            <SourceAvatar name={c.src} mode={c.srcMode} size={36}/>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] text-gray-600 mb-1.5">
                <span className="font-medium">{c.src}</span>
                <span className="text-gray-400">· {c.time}</span>
              </div>
              <h4 style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }} className="text-[14px] font-medium leading-snug mb-1.5">{c.h}</h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-2.5">{c.p}</p>
              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <div className="w-14"><SpectrumBar left={c.spec[0]} center={c.spec[1]} right={c.spec[2]} height={6}/></div>
                <span>{c.tilt}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center items-center gap-1.5 py-3 text-[11px] text-gray-400">
          <RefreshCw className="w-3.5 h-3.5"/> Loading more…
        </div>
      </div>
    </div>
  );
}

function ChatterScreen({ filter, setFilter, dateLine, onMenu, hideHeader }) {
  const filtered = filter === 'all' ? STARTERS : STARTERS.filter(s => s.type === filter);
  const tagColor = (type) => {
    if (type === 'icebreaker') return { bg: colors.amberLight, fg: colors.amberDark };
    if (type === 'substantive') return { bg: colors.tealLight, fg: colors.tealLabelDark };
    return { bg: colors.purpleLight, fg: colors.purpleDark };
  };
  return (
    <div>
      {!hideHeader && <AppHeader onMenu={onMenu} dateLine={dateLine}/>}
      <div className="px-5 pb-3">
        <h2 style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontWeight: 500 }} className="text-[22px] leading-tight tracking-tight">Chatter</h2>
        <p className="text-[13px] text-gray-600 leading-relaxed mt-1">{STARTERS.length} conversation starters from today. Skim before dinner.</p>
      </div>
      <div className="flex gap-1.5 overflow-x-auto px-5 mb-4 pb-1">
        {[
          { id: 'all', label: `All · ${STARTERS.length}` },
          { id: 'icebreaker', label: 'Icebreaker' },
          { id: 'substantive', label: 'Substantive' },
          { id: 'culture', label: 'Culture' },
        ].map(p => {
          const active = filter === p.id;
          return (
            <button key={p.id} onClick={() => setFilter(p.id)}
              className="px-3 py-1.5 rounded-full border whitespace-nowrap text-[12px] font-medium"
              style={active ? { background: colors.blue, color: '#FBFCFD', borderColor: colors.blue } : { background: '#fff', color: '#6B7280', borderColor: '#E5E7EB' }}>
              {p.label}
            </button>
          );
        })}
      </div>
      <div className="px-5">
        {filtered.map((s, i) => {
          const tc = tagColor(s.type);
          return (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 mb-2.5">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-xl" style={{ background: tc.bg, color: tc.fg }}>{s.tag}</span>
                <div className="flex gap-3 text-gray-400">
                  <Bookmark className="w-4 h-4"/>
                  <RefreshCw className="w-4 h-4"/>
                </div>
              </div>
              <p className="text-[14px] leading-relaxed mb-2.5">{s.text}</p>
              <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                <Link2 className="w-3 h-3"/> {s.source}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-8">No starters in this category right now.</p>
        )}
      </div>
    </div>
  );
}

function TopicsScreen({ mode, setMode, balance, setBalance, topicValues, setTopicValues, topicUnderstanding, setTopicUnderstanding, apertureEnabled, setApertureEnabled, location, setLocation, seasonalSubscriptions, setSeasonalSubscriptions, onOpenSeasonal, dateLine, onMenu, hideHeader }) {
  const vLabels = ['Skip', 'Dip in', 'Light', 'Standard', 'Heavy'];
  const uLabels = { new: 'New to it', familiar: 'Familiar', confident: 'Confident' };
  const uCycle = { new: 'familiar', familiar: 'confident', confident: 'new' };
  return (
    <div>
      {!hideHeader && <AppHeader onMenu={onMenu} dateLine={dateLine}/>}
      <div className="px-5 pb-2">
        <h2 style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontWeight: 500 }} className="text-[22px] leading-tight tracking-tight">Topics & balance</h2>
        <p className="text-[12px] text-gray-600 leading-relaxed mt-1 mb-4">Tune what shows up in your brief.</p>

        <div className="flex gap-1 p-1 bg-gray-100 rounded-2xl mb-4">
          {['simple', 'medium', 'granular'].map(m => {
            const active = mode === m;
            return (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 py-2 text-[12px] font-medium rounded-xl capitalize transition-colors`}
                style={active ? { background: '#fff', color: '#111' } : { color: '#6B7280' }}>
                {m}
              </button>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 mb-1">
          <div className="flex justify-between text-[11px] text-gray-500 mb-1">
            <span>My interests</span>
            <span>Well-rounded</span>
          </div>
          <input type="range" min="0" max="100" value={balance} onChange={e => setBalance(Number(e.target.value))}
            className="w-full" style={{ accentColor: colors.blue }}/>
          <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
            {balance}% well-rounded. {mode === 'granular' ? 'Overrides individual topic settings below.' : 'We\'ll push you toward stories that broaden your view rather than confirm it.'}
          </p>
        </div>

        {(mode === 'medium' || mode === 'granular') && (
          <>
            <p className="text-[11px] text-gray-400 mt-6 mb-2.5 font-medium tracking-wider">Today's mix</p>
            <MixBar/>
          </>
        )}

        {mode === 'granular' && (
          <>
            <p className="text-[11px] text-gray-400 mt-6 mb-2.5 font-medium tracking-wider">Topics you follow</p>
            {Object.entries(topicValues).map(([name, val]) => {
              const understanding = (topicUnderstanding && topicUnderstanding[name]) || 'familiar';
              return (
                <div key={name} className="mb-3.5">
                  <div className="flex justify-between mb-1 items-baseline gap-2">
                    <span className="text-[13px] font-medium">{name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTopicUnderstanding && setTopicUnderstanding({ ...topicUnderstanding, [name]: uCycle[understanding] })}
                        className="px-2 py-0.5 rounded-full text-[10px] font-medium border transition-colors"
                        style={understanding === 'new'
                          ? { background: '#FEF3C7', color: '#92400E', borderColor: '#FDE68A' }
                          : understanding === 'familiar'
                            ? { background: '#E0E7FF', color: '#3730A3', borderColor: '#C7D2FE' }
                            : { background: '#D1FAE5', color: '#065F46', borderColor: '#A7F3D0' }}>
                        {uLabels[understanding]}
                      </button>
                      <span className="text-[11px] text-gray-400">{vLabels[val]}</span>
                    </div>
                  </div>
                  <input type="range" min="0" max="4" step="1" value={val}
                    onChange={e => setTopicValues({...topicValues, [name]: Number(e.target.value)})}
                    className="w-full" style={{ accentColor: colors.blue }}/>
                </div>
              );
            })}
            <button className="w-full mt-1.5 py-2.5 border border-dashed border-gray-300 rounded-xl text-[12px] text-gray-500 flex items-center justify-center gap-1.5">
              <Plus className="w-3.5 h-3.5"/> Add a topic
            </button>
            <p className="text-[11px] text-gray-400 leading-relaxed mt-3">
              Tap a familiarity pill to cycle. Topics marked <span className="font-medium text-gray-600">New</span> get richer background context — we'll fade it as you become more familiar.
            </p>
          </>
        )}

        {/* Aperture toggle — universally available across all modes */}
        <div className="mt-6 pt-5 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(196, 181, 253, 0.22)' }}>
              <ApertureMark size={14} color="#6D5BB7"/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[14px] font-medium leading-tight">Aperture stretches</h3>
                <button
                  onClick={() => setApertureEnabled && setApertureEnabled(!apertureEnabled)}
                  className="rounded-full flex-shrink-0 transition-colors"
                  style={{
                    width: 36, height: 20,
                    background: apertureEnabled ? '#8B7AC4' : '#D1D5DB',
                    padding: 2,
                  }}>
                  <div className="bg-white rounded-full transition-transform"
                    style={{
                      width: 16, height: 16,
                      transform: apertureEnabled ? 'translateX(16px)' : 'translateX(0)',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    }}/>
                </button>
              </div>
              <p className="text-[12px] text-gray-600 leading-relaxed mt-1">
                Occasional stories outside your usual reading, picked to widen your view. {apertureEnabled
                  ? <span style={{ color: '#6D5BB7' }} className="font-medium">On.</span>
                  : <span className="text-gray-400 font-medium">Off — you'll only see what you've asked for.</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Local news section */}
        {setLocation && (
          <div className="mt-5 pt-5 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-[18px]"
                style={{ background: colors.blueLight }}>
                📍
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[14px] font-medium leading-tight">Local news</h3>
                  {location && (
                    <button onClick={() => setLocation(null)}
                      className="text-[10.5px] text-gray-400 hover:text-gray-600">Clear</button>
                  )}
                </div>
                <p className="text-[12px] text-gray-600 leading-relaxed mt-1">
                  {location
                    ? <>Following <span className="font-medium text-gray-800">{location.city || location.region || location.country}</span>{location.region && location.region !== (location.city || location.region) ? `, ${location.region}` : ''}{location.country && !location.city && !location.region ? '' : location.country ? ` · ${location.country}` : ''}</>
                    : 'Not set. Add a location to see stories from where you live.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Seasonal subscriptions section */}
        {setSeasonalSubscriptions && (
          <div className="mt-5 pt-5 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-[16px]"
                style={{ background: '#FEF3C7' }}>
                📅
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[14px] font-medium leading-tight">Seasonal follows</h3>
                  <button onClick={onOpenSeasonal}
                    className="text-[10.5px] font-medium" style={{ color: colors.blue }}>Browse →</button>
                </div>
                <p className="text-[12px] text-gray-600 leading-relaxed mt-1">
                  {seasonalSubscriptions && seasonalSubscriptions.length > 0
                    ? <>Following {seasonalSubscriptions.length} {seasonalSubscriptions.length === 1 ? 'event' : 'events'} this week.</>
                    : 'Time-bounded follows for events like the Olympics, elections, or festivals. Auto-expire when coverage tapers.'}
                </p>
                {seasonalSubscriptions && seasonalSubscriptions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {seasonalSubscriptions.map(id => {
                      const e = SEASONAL_EVENTS.find(x => x.id === id);
                      if (!e) return null;
                      return (
                        <div key={id}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10.5px] font-medium"
                          style={{ background: `${e.color}18`, color: e.color }}>
                          <span>{e.emoji}</span>
                          <span>{e.title}</span>
                          <button
                            onClick={() => setSeasonalSubscriptions(seasonalSubscriptions.filter(x => x !== id))}
                            className="ml-0.5 hover:opacity-70">
                            <X className="w-2.5 h-2.5"/>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {mode === 'simple' && (
          <p className="text-[12px] text-gray-400 leading-relaxed mt-4 text-center">
            Want to see today's topic mix? Switch to <span style={{ color: colors.blue }} className="font-medium">Medium</span>.<br/>
            Tune each topic individually? Switch to <span style={{ color: colors.blue }} className="font-medium">Granular</span>.
          </p>
        )}
        {mode === 'medium' && (
          <p className="text-[12px] text-gray-400 leading-relaxed mt-5 text-center">
            Want to tune each topic individually? Switch to <span style={{ color: colors.blue }} className="font-medium">Granular</span>.
          </p>
        )}
      </div>
    </div>
  );
}

function SavedScreen({ savedIds, dateLine, onMenu, onStoryClick, hideHeader }) {
  const saved = STORIES.filter(s => savedIds.has(s.id));
  return (
    <div>
      {!hideHeader && <AppHeader onMenu={onMenu} dateLine={dateLine}/>}
      <div className="px-5 pb-2">
        <h2 style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontWeight: 500 }} className="text-[22px] leading-tight tracking-tight">Saved</h2>
        <p className="text-[12px] text-gray-600 leading-relaxed mt-1 mb-4">Stories you want to come back to.</p>
        {saved.length === 0 ? (
          <div className="text-center py-12 px-4">
            <Bookmark className="w-7 h-7 text-gray-300 mx-auto mb-3" strokeWidth={1.5}/>
            <p className="text-sm text-gray-500 mb-1">Nothing saved yet.</p>
            <p className="text-xs text-gray-400 leading-relaxed">Tap the bookmark icon on any story to keep it here.</p>
          </div>
        ) : (
          saved.map(s => (
            <StoryRow key={s.id} story={s} isRead={false} isAnimating={false} onClick={() => onStoryClick(s.id)}/>
          ))
        )}
      </div>
    </div>
  );
}

function CompletionScreen({ onChatter, onExplore, onReset }) {
  return (
    <div className="px-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: '100%', background: colors.blue }}/>
        </div>
        <span className="text-xs text-gray-500 font-medium whitespace-nowrap">all done · day 13</span>
      </div>

      <div className="rounded-2xl p-5 text-center mb-4" style={{ background: colors.blueLight, border: `0.5px solid ${colors.blue}33` }}>
        <div className="w-11 h-11 rounded-full inline-flex items-center justify-center mb-3"
          style={{ background: colors.blue, color: colors.blueLight }}>
          <Check className="w-6 h-6"/>
        </div>
        <h3 style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontWeight: 500 }} className="text-[19px] tracking-tight mb-1">
          You're done with Thursday.
        </h3>
        <p className="text-[13px] text-gray-600 mb-4">A 12-minute read across nine stories.</p>
        <div className="grid grid-cols-3 gap-1.5 pt-3.5 border-t" style={{ borderColor: `${colors.blue}33` }}>
          {[
            { n: '12', l: 'minutes' },
            { n: '9', l: 'stories' },
            { n: '4', l: 'angles covered' },
          ].map(s => (
            <div key={s.l} className="text-center">
              <div style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontWeight: 500, color: colors.blue }} className="text-[22px] leading-tight">{s.n}</div>
              <div className="text-[11px] text-gray-600 mt-1 leading-tight">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onChatter} className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3.5 mb-2.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.amberLight, color: colors.amberDark }}>
          <MessageCircle className="w-[18px] h-[18px]"/>
        </div>
        <div className="flex-1 text-left">
          <p className="text-[13px] font-medium">Take it to dinner</p>
          <p className="text-[12px] text-gray-500">Six conversation starters waiting in Chatter.</p>
        </div>
        <ChevronRight className="w-[18px] h-[18px] text-gray-400"/>
      </button>

      <button onClick={onExplore} className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3.5 mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.purpleLight, color: colors.purpleDark }}>
          <Rocket className="w-[18px] h-[18px]"/>
        </div>
        <div className="flex-1 text-left">
          <p className="text-[13px] font-medium">Keep going</p>
          <p className="text-[12px] text-gray-500">Long reads, multiple papers, archives.</p>
        </div>
        <ChevronRight className="w-[18px] h-[18px] text-gray-400"/>
      </button>

      <p className="text-center text-[12px] text-gray-400 mt-4 italic">Tomorrow's brief drops at 6 AM.</p>

      <button onClick={onReset} className="block mx-auto mt-5 text-xs text-gray-400 underline">Reset (prototype only)</button>
    </div>
  );
}

// User menu — popover triggered by the avatar. Surfaces three destinations
// in a clear visual hierarchy: stats (insights), preferences (tuning), settings (chrome).
function UserMenu({ onClose, onOpenStats, onOpenPreferences, onOpenSettings, userInitial = 'M', userLabel = 'Reader' }) {
  return (
    <div className="absolute inset-0 z-30" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div className="absolute bg-white rounded-2xl overflow-hidden"
        style={{ top: 64, right: 14, width: 250, boxShadow: '0 12px 40px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.06)' }}
        onClick={e => e.stopPropagation()}>
        {/* Identity header */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-[15px]"
            style={{ background: `linear-gradient(135deg, ${colors.blueDark} 0%, ${colors.blue} 100%)`, fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}>
            {userInitial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium leading-tight">{userLabel}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Day 12 · 47 stories read</div>
          </div>
        </div>
        {/* Menu items */}
        <button onClick={() => { onOpenStats(); onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors text-left">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: '#FEF3C7', color: '#92400E' }}>
            <TrendingUp className="w-4 h-4" strokeWidth={2.2}/>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium leading-tight">Insights</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Your reading patterns</div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300"/>
        </button>
        <button onClick={() => { onOpenPreferences(); onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors border-t border-gray-100 text-left">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: colors.blueLight, color: colors.blueDark }}>
            <Grid3x3 className="w-4 h-4" strokeWidth={2}/>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium leading-tight">Preferences</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Topics, aperture, balance</div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300"/>
        </button>
        <button onClick={() => { onOpenSettings(); onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors border-t border-gray-100 text-left">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: '#F3F4F6', color: '#4B5563' }}>
            <Settings className="w-4 h-4" strokeWidth={2}/>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium leading-tight">Settings</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Theme, account, app</div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300"/>
        </button>
      </div>
    </div>
  );
}

// Stats / Insights screen — surfaces reading patterns. Aperture-stretches gets featured prominently
// since it's a principle the user opted into; visible progress reinforces commitment.
function StatsScreen({ dateLine, onMenu, hideHeader }) {
  return (
    <div>
      {!hideHeader && <AppHeader dateLine={dateLine} onMenu={onMenu}/>}
      <div className="px-5 pb-6">
        <h2 style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontWeight: 500 }} className="text-[22px] leading-tight tracking-tight">Your reading</h2>
        <p className="text-[12px] text-gray-600 leading-relaxed mt-1 mb-5">How you've been engaging with ITL.</p>

        {/* Top-line stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="rounded-2xl bg-gray-50 px-3 py-3 text-center">
            <div style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontVariationSettings: "'opsz' 144", fontWeight: 700 }} className="text-[28px] leading-none" >47</div>
            <div className="text-[10.5px] text-gray-500 mt-1.5">stories read</div>
          </div>
          <div className="rounded-2xl bg-gray-50 px-3 py-3 text-center">
            <div style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontVariationSettings: "'opsz' 144", fontWeight: 700 }} className="text-[28px] leading-none">9</div>
            <div className="text-[10.5px] text-gray-500 mt-1.5">day streak</div>
          </div>
          <div className="rounded-2xl bg-gray-50 px-3 py-3 text-center">
            <div style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontVariationSettings: "'opsz' 144", fontWeight: 700 }} className="text-[28px] leading-none">~38</div>
            <div className="text-[10.5px] text-gray-500 mt-1.5">min this week</div>
          </div>
        </div>

        {/* Aperture-stretches highlight */}
        <div className="rounded-2xl p-4 mb-4 relative overflow-hidden"
          style={{ background: 'rgba(196, 181, 253, 0.18)', border: '1px solid rgba(139, 122, 196, 0.25)' }}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: '#fff' }}>
              <ApertureMark size={16} color="#8B7AC4"/>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10.5px] uppercase tracking-wider font-semibold mb-1" style={{ color: '#6D5BB7' }}>Aperture this month</p>
              <p className="text-[14px] leading-snug" style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontVariationSettings: "'opsz' 14, 'wght' 500" }}>
                You read <span style={{ color: '#6D5BB7' }} className="font-semibold">8 stretches</span> outside your usual topics.
              </p>
              <p className="text-[11.5px] text-gray-600 leading-relaxed mt-1.5">
                Most outside Markets and Science — both started "New to it," now trending toward Familiar.
              </p>
            </div>
          </div>
        </div>

        {/* Topic mix this month */}
        <p className="text-[11px] text-gray-400 mb-2 font-medium tracking-wider">Your topic mix · last 30 days</p>
        <div className="rounded-2xl bg-gray-50 p-4 mb-4">
          {[
            { name: 'Culture', val: 14, color: '#993556' },
            { name: 'World', val: 12, color: '#0F6E56' },
            { name: 'Tech', val: 10, color: '#3C3489' },
            { name: 'Sports', val: 6, color: '#993C1D' },
            { name: 'Markets', val: 3, color: '#854F0B' },
            { name: 'Science', val: 2, color: '#3B6D11' },
          ].map(t => (
            <div key={t.name} className="flex items-center gap-3 py-1.5">
              <span className="text-[12px] w-14">{t.name}</span>
              <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${(t.val / 14) * 100}%`, background: t.color }}/>
              </div>
              <span className="text-[11px] text-gray-500 w-6 text-right">{t.val}</span>
            </div>
          ))}
        </div>

        {/* Coverage mix */}
        <p className="text-[11px] text-gray-400 mb-2 font-medium tracking-wider">Coverage focus you read</p>
        <div className="rounded-2xl bg-gray-50 p-4 mb-4">
          <div className="flex gap-0.5 rounded overflow-hidden mb-2" style={{ height: '10px' }}>
            <div style={{ flex: 22, background: colors.reporting }}/>
            <div style={{ flex: 18, background: colors.analysis }}/>
            <div style={{ flex: 7, background: colors.opinion }}/>
          </div>
          <div className="flex justify-between text-[11px] text-gray-600">
            <span style={{ color: colors.reporting }}>Reporting · 47%</span>
            <span style={{ color: colors.analysis }}>Analysis · 38%</span>
            <span style={{ color: colors.opinion }}>Opinion · 15%</span>
          </div>
          <p className="text-[10.5px] text-gray-400 mt-2.5 leading-relaxed">
            You read more reporting than the average ITL reader — a good signal that you're getting the facts before forming a view.
          </p>
        </div>

        <p className="text-[11px] text-gray-400 leading-relaxed mt-4">
          Insights reflect your activity in ITL only. Full analytics will be available with an account.
        </p>
      </div>
    </div>
  );
}

// Seasonal event card — used inside SeasonalPrompt for each event the user can opt into.
function SeasonalEventCard({ event, isSubscribed, onToggle }) {
  return (
    <div className="rounded-2xl border p-3.5 transition-colors"
      style={{
        borderColor: isSubscribed ? event.color : '#E5E7EB',
        background: isSubscribed ? `${event.color}10` : '#fff',
      }}>
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 text-[22px]"
          style={{ background: `${event.color}20` }}>
          {event.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-0.5 flex-wrap">
            <h4 className="text-[14px] font-medium" style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif" }}>{event.title}</h4>
            <span className="text-[10.5px] uppercase tracking-wider font-semibold"
              style={{ color: event.color }}>
              {event.status === 'active' ? 'Active now' : event.startsLabel}
            </span>
          </div>
          <p className="text-[11.5px] text-gray-600 leading-snug mb-1.5">{event.blurb}</p>
          <p className="text-[10.5px] text-gray-400">{event.dates} · expect {event.expectedStories}</p>
        </div>
      </div>
      <button onClick={onToggle}
        className="w-full mt-3 py-2 rounded-md text-[12px] font-medium transition-colors"
        style={isSubscribed
          ? { background: event.color, color: '#fff' }
          : { background: '#fff', color: event.color, border: `1px solid ${event.color}40` }}>
        {isSubscribed ? '✓ Following' : 'Follow for the duration'}
      </button>
    </div>
  );
}

// Seasonal prompt — bottom-sheet popover shown on dashboard once per week.
// Offers temporary subscriptions to time-bounded events.
function SeasonalPrompt({ onClose, subscriptions, setSubscriptions }) {
  const toggle = (id) => {
    if (subscriptions.includes(id)) {
      setSubscriptions(subscriptions.filter(x => x !== id));
    } else {
      setSubscriptions([...subscriptions, id]);
    }
  };
  return (
    <div className="absolute inset-0 z-30 flex items-end" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div className="bg-white w-full rounded-t-3xl p-5 pb-7" onClick={e => e.stopPropagation()}>
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4"/>
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <h3 style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontWeight: 500 }} className="text-[18px] leading-tight">This week in the news cycle</h3>
            <p className="text-[12px] text-gray-500 mt-1">A few stories worth following for a stretch — not just one headline.</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center flex-shrink-0">
            <X className="w-4 h-4 text-gray-500"/>
          </button>
        </div>
        <div className="space-y-2 mt-4">
          {SEASONAL_EVENTS.map(e => (
            <SeasonalEventCard
              key={e.id}
              event={e}
              isSubscribed={subscriptions.includes(e.id)}
              onToggle={() => toggle(e.id)}
            />
          ))}
        </div>
        <p className="text-[10.5px] text-gray-400 leading-relaxed mt-4">
          Followed events auto-expire a few days after coverage tapers. You'll see a quiet note when one ends. Manage anytime in Preferences.
        </p>
        <button onClick={onClose}
          className="w-full mt-4 py-3 rounded-xl text-sm font-medium text-white"
          style={{ background: colors.blue }}>
          Done
        </button>
      </div>
    </div>
  );
}

function SettingsDrawer({ onClose, onResetOnboarding, onResetReads, onOpenSaved, onOpenExplore, savedCount }) {
  return (
    <div className="absolute inset-0 z-30 flex items-end" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div className="bg-white w-full rounded-t-3xl p-5 pb-8" onClick={e => e.stopPropagation()}>
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5"/>
        <h3 style={{ fontFamily: "'Fraunces Variable', Fraunces, Georgia, serif", fontWeight: 500 }} className="text-[18px] mb-1">Settings</h3>
        <p className="text-xs text-gray-500 mb-4">Theme, account, and app chrome.</p>

        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 mt-3">Appearance</p>
        <div className="space-y-0 mb-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full" style={{ background: 'linear-gradient(135deg, #fff, #1F1B1A)', border: '1px solid #E5E7EB' }}/>
              <span className="text-sm">Theme</span>
            </div>
            <span className="text-xs text-gray-400">Light</span>
          </div>
        </div>

        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 mt-3">Library</p>
        <div className="space-y-0 mb-4">
          <button onClick={() => { onOpenExplore && onOpenExplore(); }} className="flex justify-between items-center py-3 border-b border-gray-100 w-full">
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-gray-500"/>
              <span className="text-sm">Explore — multi-paper feed</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400"/>
          </button>
          <button onClick={() => { onOpenSaved(); onClose(); }} className="flex justify-between items-center py-3 border-b border-gray-100 w-full">
            <div className="flex items-center gap-3">
              <Bookmark className="w-4 h-4 text-gray-500"/>
              <span className="text-sm">Saved</span>
            </div>
            <div className="flex items-center gap-2">
              {savedCount > 0 && <span className="text-xs text-gray-400">{savedCount}</span>}
              <ChevronRight className="w-4 h-4 text-gray-400"/>
            </div>
          </button>
        </div>

        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 mt-3">Prototype</p>
        <div className="space-y-0">
          <button onClick={onResetReads} className="flex justify-between items-center py-3 border-b border-gray-100 w-full">
            <span className="text-sm">Reset today's progress</span>
            <ChevronRight className="w-4 h-4 text-gray-400"/>
          </button>
          <button onClick={onResetOnboarding} className="flex justify-between items-center py-3 border-b border-gray-100 w-full">
            <span className="text-sm">Restart onboarding</span>
            <ChevronRight className="w-4 h-4 text-gray-400"/>
          </button>
          <div className="flex justify-between items-center py-3">
            <span className="text-sm text-gray-400">Account · Sign out</span>
            <span className="text-xs text-gray-300">in production</span>
          </div>
        </div>
        <button onClick={onClose} className="w-full mt-5 py-3 rounded-xl text-sm font-medium text-white"
          style={{ background: colors.blue }}>Done</button>
      </div>
    </div>
  );
}

export default function App() {
  const [apertureEnabled, setApertureEnabled] = useState(true);
  const [seasonalSubscriptions, setSeasonalSubscriptions] = useState([]);
  return (
    <ApertureContext.Provider value={{ enabled: apertureEnabled, seasonalSubscriptions }}>
      <AppInner
        apertureEnabled={apertureEnabled} setApertureEnabled={setApertureEnabled}
        seasonalSubscriptions={seasonalSubscriptions} setSeasonalSubscriptions={setSeasonalSubscriptions}
      />
    </ApertureContext.Provider>
  );
}

function AppInner({ apertureEnabled, setApertureEnabled, seasonalSubscriptions, setSeasonalSubscriptions }) {
  const [screen, setScreen] = useState('landing');
  const [theme, setTheme] = useState('light');
  const [tier, setTier] = useState('brief');
  const [balance, setBalance] = useState(65);
  const [topicValues, setTopicValues] = useState({
    World: 4, Tech: 3, Culture: 4, Markets: 1, Science: 1, Sports: 2,
  });
  const [topicUnderstanding, setTopicUnderstanding] = useState({
    World: 'familiar', Tech: 'familiar', Culture: 'familiar',
    Markets: 'new', Science: 'new', Sports: 'familiar',
  });
  const [topicSubgenres, setTopicSubgenres] = useState({
    World: [], Tech: [], Culture: [], Markets: [], Science: [], Sports: [],
  });
  // Regional location — country → region → city. Default for prototype: North Vancouver.
  const [location, setLocation] = useState({ country: 'Canada', region: 'British Columbia', city: 'North Vancouver' });
  // Whether the user has seen this week's seasonal prompt. Resets in production weekly via timestamp.
  const [seenSeasonalPrompt, setSeenSeasonalPrompt] = useState(false);

  // Single-screen app: News is the only main surface. Pulse toggles between news (glance) and chatter modes.
  const [pulseMode, setPulseMode] = useState('news');
  const [subScreen, setSubScreen] = useState(null); // 'topics' | 'saved' | 'chatter' | 'stats' | null
  const [topicsMode, setTopicsMode] = useState('simple');
  const [chatterFilter, setChatterFilter] = useState('all');
  const [readIds, setReadIds] = useState(new Set());
  const [savedIds, setSavedIds] = useState(new Set());
  const [animatingId, setAnimatingId] = useState(null);
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [showExplore, setShowExplore] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSeasonalPrompt, setShowSeasonalPrompt] = useState(false);

  // Continuous-scroll model: all stories always render. Tier is just a position indicator.
  const stories = STORIES;
  const allRead = stories.length > 0 && stories.every(s => readIds.has(s.id));

  // Seasonal prompt: auto-open shortly after the user reaches the main dashboard
  // for the first time. In production this'd run once per week based on a stored timestamp.
  useEffect(() => {
    if (screen !== 'main') return;
    if (seenSeasonalPrompt) return;
    if (subScreen || selectedStoryId || showExplore || showUserMenu || showSettings) return;
    const t = setTimeout(() => {
      setShowSeasonalPrompt(true);
      setSeenSeasonalPrompt(true);
    }, 350);
    return () => clearTimeout(t);
  }, [screen, seenSeasonalPrompt, subScreen, selectedStoryId, showExplore, showUserMenu, showSettings]);

  const dateLine = (() => {
    const newCount = stories.filter(s => s.isNew && !readIds.has(s.id)).length;
    return newCount > 0 ? `Thu, May 14 · ${newCount} new since 6 PM` : 'Thu, May 14';
  })();

  const markStoryRead = (id) => {
    setAnimatingId(id);
    setTimeout(() => {
      setReadIds(prev => new Set([...prev, id]));
      setAnimatingId(null);
      setSelectedStoryId(null);
    }, 320);
  };

  const toggleSave = (id) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const resetReads = () => { setReadIds(new Set()); setShowSettings(false); };
  const restartOnboarding = () => {
    setReadIds(new Set()); setSavedIds(new Set()); setTier('brief'); setBalance(65);
    setPulseMode('news'); setSubScreen(null); setShowSettings(false);
    setSeenSeasonalPrompt(false); setSeasonalSubscriptions([]);
    setScreen('landing');
  };

  if (screen === 'landing') {
    return <ITLPage><LandingScreen onStart={() => setScreen('onboarding-sample')}/></ITLPage>;
  }
  if (screen === 'onboarding-sample') {
    return <ITLPage><OnboardingSample onNext={() => setScreen('onboarding-theme')}/></ITLPage>;
  }
  if (screen === 'onboarding-theme') {
    return <ITLPage><OnboardingTheme theme={theme} setTheme={setTheme} onNext={() => setScreen('onboarding-time')}/></ITLPage>;
  }
  if (screen === 'onboarding-time') {
    return <ITLPage><OnboardingTime tier={tier} setTier={setTier} onBack={() => setScreen('onboarding-theme')} onNext={() => setScreen('onboarding-priorities')}/></ITLPage>;
  }
  if (screen === 'onboarding-priorities') {
    return <ITLPage><OnboardingPriorities
      topicValues={topicValues} setTopicValues={setTopicValues}
      topicUnderstanding={topicUnderstanding} setTopicUnderstanding={setTopicUnderstanding}
      topicSubgenres={topicSubgenres} setTopicSubgenres={setTopicSubgenres}
      location={location} setLocation={setLocation}
      onBack={() => setScreen('onboarding-time')} onNext={() => setScreen('onboarding-topics')}/></ITLPage>;
  }
  if (screen === 'onboarding-topics') {
    return <ITLPage><OnboardingTopics balance={balance} setBalance={setBalance} onBack={() => setScreen('onboarding-priorities')} onNext={() => setScreen('main')}/></ITLPage>;
  }

  if (selectedStoryId) {
    const story = STORIES.find(s => s.id === selectedStoryId);
    return (
      <ITLPage>
        <PhoneFrame>
          <StoryDetail story={story} isAnimating={animatingId === story.id}
            isSaved={savedIds.has(story.id)}
            understanding={topicUnderstanding[story.category]}
            onBack={() => setSelectedStoryId(null)}
            onMarkRead={() => markStoryRead(story.id)}
            onToggleSave={() => toggleSave(story.id)}/>
        </PhoneFrame>
      </ITLPage>
    );
  }

  if (showExplore) {
    return (
      <ITLPage>
        <PhoneFrame>
          <ExploreScreen onBack={() => setShowExplore(false)}/>
        </PhoneFrame>
      </ITLPage>
    );
  }

  // Sub-screens reached from user menu or in-app links. These layer over News.
  // Each gets a back-nav header with a labeled origin.
  const SubScreenHeader = ({ label }) => (
    <div className="flex items-center gap-2 px-5 pt-2 pb-3">
      <button onClick={() => setSubScreen(null)} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
        <ArrowLeft className="w-4 h-4 text-gray-600"/>
      </button>
      <span className="text-[13px] text-gray-500">{label}</span>
    </div>
  );

  const openMenu = () => setShowUserMenu(true);

  if (subScreen === 'stats') {
    return (
      <ITLPage>
        <PhoneFrame>
          <StatusBar/>
          <SubScreenHeader label="Insights"/>
          <StatsScreen dateLine={dateLine} hideHeader={true}/>
        </PhoneFrame>
      </ITLPage>
    );
  }
  if (subScreen === 'topics') {
    return (
      <ITLPage>
        <PhoneFrame>
          <StatusBar/>
          <SubScreenHeader label="Preferences"/>
          <TopicsScreen mode={topicsMode} setMode={setTopicsMode} balance={balance} setBalance={setBalance}
            topicValues={topicValues} setTopicValues={setTopicValues}
            topicUnderstanding={topicUnderstanding} setTopicUnderstanding={setTopicUnderstanding}
            apertureEnabled={apertureEnabled} setApertureEnabled={setApertureEnabled}
            location={location} setLocation={setLocation}
            seasonalSubscriptions={seasonalSubscriptions} setSeasonalSubscriptions={setSeasonalSubscriptions}
            onOpenSeasonal={() => setShowSeasonalPrompt(true)}
            dateLine={dateLine} onMenu={openMenu} hideHeader={true}/>
          {showSeasonalPrompt && (
            <SeasonalPrompt
              onClose={() => setShowSeasonalPrompt(false)}
              subscriptions={seasonalSubscriptions}
              setSubscriptions={setSeasonalSubscriptions}
            />
          )}
        </PhoneFrame>
      </ITLPage>
    );
  }
  if (subScreen === 'saved') {
    return (
      <ITLPage>
        <PhoneFrame>
          <StatusBar/>
          <SubScreenHeader label="Settings"/>
          <SavedScreen savedIds={savedIds} dateLine={dateLine} onMenu={openMenu}
            onStoryClick={(id) => setSelectedStoryId(id)} hideHeader={true}/>
        </PhoneFrame>
      </ITLPage>
    );
  }
  if (subScreen === 'chatter') {
    return (
      <ITLPage>
        <PhoneFrame>
          <StatusBar/>
          <SubScreenHeader label="Today's pulse"/>
          <ChatterScreen filter={chatterFilter} setFilter={setChatterFilter} dateLine={dateLine}
            onMenu={openMenu} hideHeader={true}/>
        </PhoneFrame>
      </ITLPage>
    );
  }

  // Active subscriptions, resolved to event objects
  const activeSeasonalEvents = SEASONAL_EVENTS.filter(e => seasonalSubscriptions.includes(e.id));
  // Location label for inline display in date line
  const locationLabel = location ? (location.city || location.region || location.country) : null;

  return (
    <ITLPage>
      <PhoneFrame>
        <StatusBar/>
        <AppHeader
          onMenu={openMenu}
          dateLine={dateLine}
          locationLabel={locationLabel}
          activeSeasonalEvents={activeSeasonalEvents}
          onOpenSeasonal={() => setShowSeasonalPrompt(true)}
        />

        {allRead ? (
          <CompletionScreen onChatter={() => setSubScreen('chatter')} onExplore={() => setShowExplore(true)} onReset={resetReads}/>
        ) : (
          <TodayScreen tier={tier} setTier={setTier} stories={stories} readIds={readIds} animatingId={animatingId}
            onStoryClick={(id) => setSelectedStoryId(id)}
            pulseMode={pulseMode} setPulseMode={setPulseMode}
            onSeeAllChatter={() => setSubScreen('chatter')}/>
        )}

        {showUserMenu && (
          <UserMenu
            onClose={() => setShowUserMenu(false)}
            onOpenStats={() => setSubScreen('stats')}
            onOpenPreferences={() => setSubScreen('topics')}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}

        {showSeasonalPrompt && (
          <SeasonalPrompt
            onClose={() => setShowSeasonalPrompt(false)}
            subscriptions={seasonalSubscriptions}
            setSubscriptions={setSeasonalSubscriptions}
          />
        )}

        {showSettings && (
          <SettingsDrawer
            onClose={() => setShowSettings(false)}
            onResetOnboarding={restartOnboarding}
            onResetReads={resetReads}
            onOpenSaved={() => setSubScreen('saved')}
            onOpenExplore={() => { setShowSettings(false); setShowExplore(true); }}
            savedCount={savedIds.size}
          />
        )}
      </PhoneFrame>
    </ITLPage>
  );
}

function ITLPage({ children }) {
  return (
    <>
      <style>{`
        @import url('https://cdn.jsdelivr.net/npm/@fontsource-variable/fraunces@5.1.4/index.css');
        @import url('https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5.1.0/index.css');
        body, html { font-family: 'Inter Variable', Inter, system-ui, -apple-system, sans-serif; -webkit-font-smoothing: antialiased; }
        input[type="range"] { height: 24px; }
        input[type="range"]::-webkit-slider-thumb { background: ${colors.blue}; }
      `}</style>
      <div className="min-h-screen flex items-center justify-center py-8 px-4" style={{ background: '#F1EFE8' }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          {children}
        </div>
      </div>
    </>
  );
}