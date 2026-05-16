// ITL Editorial Content
// ----------------------
// This file holds all daily editorial data. Edit this file to update today's
// edition; the app code in App.jsx does not need to change.
//
// Structure:
//   STORIES         — every story in today's brief. The main editorial workload.
//   TODAYS_GLANCE   — macro-summary items shown in "Today's pulse" at the top.
//   STARTERS        — Chatter conversation prompts. Links to STORIES via storyId.
//   SEASONAL_EVENTS — Time-bounded events users can follow. Stories reference
//                     these via story.eventId.
//
// Cross-references:
//   - TODAYS_GLANCE items reference STORIES via storyId
//   - STARTERS reference STORIES via storyId
//   - STORIES reference SEASONAL_EVENTS via eventId
//
// When editing daily:
//   1. Replace STORIES with today's set (5-13 stories typically)
//   2. Update TODAYS_GLANCE to match (5 macro items, mapped to headline stories)
//   3. Optionally refresh STARTERS (3-7 conversation prompts)
//   4. Update SEASONAL_EVENTS only when events start, end, or are added

export const STORIES = [
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
export const TODAYS_GLANCE = [
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
export const STARTERS = [
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
export const SEASONAL_EVENTS = [
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
