export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  pillar: 'All Pillars' | 'Mitigation' | 'Adaptation' | 'Resilience' | 'Recovery';
  duration: string;
  summary: string;
  content: string[];
  keyStats: { label: string; value: string; color: string }[];
  quiz: QuizQuestion[];
}

export const chapters: Chapter[] = [
  {
    id: 'chapter-1',
    number: 1,
    title: 'The Missing Link in Climate Investment',
    pillar: 'All Pillars',
    duration: '15 min',
    summary: 'Global climate finance has scaled rapidly — but most capital flows to just one of four pillars. Discover the structural gap.',
    content: [
      'Global climate finance has scaled rapidly in recent years. Annual investment now exceeds approximately USD $1.7 trillion, largely directed toward mitigation — renewable energy, electrification, and decarbonisation technologies.',
      'Climate change is no longer defined solely by future emissions. Its physical impacts are already reshaping infrastructure, economic activity, and financial risk globally.',
      'The climate economy is expanding beyond mitigation into a broader, multi-dimensional system — one that encompasses four interconnected pillars: Mitigation, Adaptation, Resilience, and Recovery.',
      'These four pillars form the Climate Evolution Cycle. Yet adaptation finance accounts for less than 10% of global climate investment, and resilience and recovery capital remain fragmented and underrepresented.',
      'This course introduces the Climate Economy Efficient Frontier — a structured framework for understanding and addressing this capital allocation imbalance across all four pillars.',
    ],
    keyStats: [
      { label: 'Annual Climate Investment', value: '$1.7T', color: 'text-primary' },
      { label: 'Adaptation Share', value: '<10%', color: 'text-danger' },
      { label: 'Pillars Covered', value: '4', color: 'text-secondary' },
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'What is the approximate annual global climate investment figure cited in the framework?',
        options: ['$500 billion', '$1.7 trillion', '$3 trillion', '$200 billion'],
        correctIndex: 1,
      },
      {
        id: 'q1-2',
        question: 'Which pillar of the climate economy is currently the dominant recipient of climate capital?',
        options: ['Adaptation', 'Resilience', 'Mitigation', 'Recovery'],
        correctIndex: 2,
      },
      {
        id: 'q1-3',
        question: 'Approximately what percentage of global climate investment goes to adaptation finance?',
        options: ['Less than 10%', '30%', '50%', '20%'],
        correctIndex: 0,
      },
      {
        id: 'q1-4',
        question: 'What is the name of the capital allocation framework introduced in the course?',
        options: ['Climate Policy Initiative', 'Climate Economy Efficient Frontier', 'ESG Frontier Model', 'Green Economy Protocol'],
        correctIndex: 1,
      },
      {
        id: 'q1-5',
        question: 'Which organisation developed the course framework?',
        options: ['UNEP', 'World Economic Forum', 'CSID', 'Climate Policy Initiative'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'chapter-2',
    number: 2,
    title: 'The Climate Economy',
    pillar: 'All Pillars',
    duration: '15 min',
    summary: 'Climate change is reshaping the global economy across multiple sectors. Understand the full system view.',
    content: [
      'Climate change is reshaping the global economy — encompassing the transition to a low-carbon economy, adapting infrastructure to new conditions, strengthening systems against climate shocks, and rebuilding communities following disasters.',
      'The climate economy spans multiple sectors: energy, infrastructure, insurance, construction, agriculture, and technology. It is not a single sector — it is a system.',
      'Understanding the climate economy as a multi-sector, multi-phase system provides a broader framework for analysing investment opportunities.',
      'A useful system view: Climate Data & Trends → Risk & Impact Assessment → Investment Opportunities → Portfolio Strategy → Ongoing Monitoring & Adaptation. This loop captures the dynamic and evolving nature of climate investment.',
    ],
    keyStats: [
      { label: 'Sectors Involved', value: '6+', color: 'text-primary' },
      { label: 'Investment Phases', value: '4', color: 'text-secondary' },
      { label: 'System Type', value: 'Multi-phase', color: 'text-earth' },
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Which sectors does the climate economy span?',
        options: ['Only energy and technology', 'Energy, infrastructure, insurance, construction, agriculture, technology', 'Finance and legal only', 'Agriculture and food only'],
        correctIndex: 1,
      },
      {
        id: 'q2-2',
        question: 'What is the purpose of ongoing monitoring in climate investment?',
        options: ['To reduce returns', 'To track media coverage', 'To adjust to new risks and enhance portfolio resilience', 'To comply with tax regulations'],
        correctIndex: 2,
      },
      {
        id: 'q2-3',
        question: 'According to the framework, climate change is primarily:',
        options: ['An environmental challenge only', 'Both an environmental AND economic challenge', 'A political challenge only', 'A financial reporting issue'],
        correctIndex: 1,
      },
      {
        id: 'q2-4',
        question: 'Which comes first in the investment system view?',
        options: ['Portfolio Strategy', 'Investment Opportunities', 'Climate Data & Trends', 'Ongoing Monitoring'],
        correctIndex: 2,
      },
      {
        id: 'q2-5',
        question: 'What kind of system does the paper describe the climate economy as?',
        options: ['A linear, single-phase system', 'A multi-sector, multi-phase system', 'A government-only system', 'A technology-only system'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'chapter-3',
    number: 3,
    title: 'The Climate Evolution Cycle',
    pillar: 'All Pillars',
    duration: '18 min',
    summary: 'The four pillars — Mitigation, Adaptation, Resilience, Recovery — do not occur in sequence. They unfold simultaneously.',
    content: [
      'The Climate Evolution Cycle is a structural representation of how the climate economy develops, transitions, and responds across four pillars.',
      'Mitigation is the early-stage response — reducing emissions, decarbonisation, and driving the energy transition. This is where the majority of climate capital currently flows.',
      'Adaptation emerges as physical climate impacts materialise — infrastructure and systems must adjust to new environmental conditions. Flood-resistant construction, water management, and coastal protection are examples.',
      'Resilience is the structural response — strengthening systems to withstand and absorb climate shocks, reducing systemic vulnerability. Grid hardening and storm-resistant transport infrastructure are examples.',
      'Recovery occurs following climate-related events — rebuilding and reconstruction that restores and reshapes infrastructure and economic activity. Disaster response frameworks and insurance-linked capital are key tools.',
      'Critically, these four phases do NOT occur in a linear sequence. They unfold simultaneously across different regions, sectors, and time horizons. A city may be investing in mitigation, adapting its coastline, hardening its grid, and rebuilding from a recent flood — all at the same time.',
    ],
    keyStats: [
      { label: 'Mitigation Share', value: '~94%', color: 'text-primary' },
      { label: 'Simultaneous Phases', value: '4', color: 'text-secondary' },
      { label: 'Linear Sequence?', value: 'No', color: 'text-danger' },
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Which pillar focuses on rebuilding after climate-related events?',
        options: ['Mitigation', 'Adaptation', 'Resilience', 'Recovery'],
        correctIndex: 3,
      },
      {
        id: 'q3-2',
        question: 'Which pillar represents the "early stage" climate response?',
        options: ['Recovery', 'Resilience', 'Mitigation', 'Adaptation'],
        correctIndex: 2,
      },
      {
        id: 'q3-3',
        question: 'Do the four phases of the Climate Evolution Cycle occur in linear sequence?',
        options: ['Yes, always', 'No — they unfold simultaneously across different regions and sectors', 'Only in developed economies', 'Only during extreme weather years'],
        correctIndex: 1,
      },
      {
        id: 'q3-4',
        question: 'What does "Adaptation" primarily involve?',
        options: ['Rebuilding damaged infrastructure', 'Reducing greenhouse gas emissions', 'Adjusting infrastructure to operate under changing climate conditions', 'Strengthening grids against storms'],
        correctIndex: 2,
      },
      {
        id: 'q3-5',
        question: 'What does "Resilience" focus on?',
        options: ['Emitting fewer greenhouse gases', 'Reconstructing post-disaster communities', 'Strengthening systems to withstand and absorb climate shocks', 'Expanding adaptation financing'],
        correctIndex: 2,
      },
      {
        id: 'q3-6',
        question: 'What is the Climate Evolution Cycle?',
        options: ['A carbon accounting system', 'A structural representation of how the climate economy develops across four pillars', 'A renewable energy subsidy model', 'A government emissions target'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'chapter-4',
    number: 4,
    title: 'The Climate Economy Investment Cycle — Four Phases',
    pillar: 'All Pillars',
    duration: '20 min',
    summary: 'From policy-led mitigation to event-driven recovery — the four investment phases and how they overlap in practice.',
    content: [
      'Phase 1 — Policy-Led Mitigation Expansion: Mitigation investments dominate early. Capital flows toward renewable energy generation, electrification of transport, energy efficiency technologies, and industrial decarbonisation. This phase is driven by policy frameworks, regulatory incentives, and technological innovation.',
      'Phase 2 — Adaptation Infrastructure Expansion: Investment demand expands beyond emissions reduction as physical climate impacts become more visible. Examples include flood defence infrastructure, water management systems, climate-resilient agriculture, coastal protection projects, and urban heat mitigation strategies.',
      'Phase 3 — System Resilience Investment: Focus shifts to strengthening infrastructure. Electricity grid hardening, wildfire mitigation systems, storm-resistant transport infrastructure, flood-resilient urban drainage systems, and climate-resilient telecommunications all fall within this phase.',
      'Phase 4 — Climate Recovery and Reconstruction: Rebuilding following climate-related disasters. This includes rebuilding damaged infrastructure, restoring housing and transport networks, reconstruction of energy systems, and economic recovery programs.',
      'Investment phases overlap significantly in practice across regions, sectors, and asset classes. A sophisticated climate investor cannot focus on one phase alone — the opportunity set spans all four simultaneously.',
    ],
    keyStats: [
      { label: 'Investment Phases', value: '4', color: 'text-primary' },
      { label: 'Phase 1 Driver', value: 'Policy', color: 'text-secondary' },
      { label: 'Phase 4 Driver', value: 'Events', color: 'text-earth' },
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'What drives investment in Phase 1 of the Climate Economy Investment Cycle?',
        options: ['Insurance markets', 'Disaster frequency', 'Policy frameworks, regulatory incentives, and technological innovation', 'Physical climate impacts'],
        correctIndex: 2,
      },
      {
        id: 'q4-2',
        question: 'Which of these is an example of Adaptation investment?',
        options: ['Wildfire mitigation systems', 'Coastal protection projects', 'Grid hardening', 'Disaster reconstruction'],
        correctIndex: 1,
      },
      {
        id: 'q4-3',
        question: 'Which is an example of a Resilience investment?',
        options: ['Flood defence infrastructure', 'Renewable energy generation', 'Electricity grid hardening', 'Disaster reconstruction'],
        correctIndex: 2,
      },
      {
        id: 'q4-4',
        question: 'What is Recovery investment primarily shaped by?',
        options: ['Policy frameworks', 'Infrastructure planning', 'Reconstruction demand following climate events', 'Carbon pricing'],
        correctIndex: 2,
      },
      {
        id: 'q4-5',
        question: 'Do the four investment phases overlap in practice?',
        options: ['No — they are strictly sequential', 'Yes — they overlap across regions, sectors and time', 'Only in developing countries', 'Only in coastal regions'],
        correctIndex: 1,
      },
      {
        id: 'q4-6',
        question: 'Phase 2 (Adaptation Infrastructure Expansion) typically begins when:',
        options: ['Mitigation investment declines to zero', 'Physical climate impacts become more visible', 'Recovery spending ends', 'Carbon prices fall'],
        correctIndex: 1,
      },
      {
        id: 'q4-7',
        question: 'What is the key implication of overlapping investment cycles?',
        options: ['Investors should only focus on mitigation', 'Climate economy should be seen as a single sector', 'Climate economy is an interconnected, multi-pillar investment system', 'Adaptation always precedes resilience'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'chapter-5',
    number: 5,
    title: 'The Trillion-Dollar Climate Capital Imbalance',
    pillar: 'Adaptation',
    duration: '20 min',
    summary: 'Why $1.3 trillion goes to mitigation while adaptation receives just $76 billion — and what that structural gap means.',
    content: [
      'Annual climate finance reached approximately $1.3 trillion in 2022 (CPI tracked). Broader estimates range from $1.5–$1.7 trillion when including all climate-relevant flows.',
      'The breakdown is stark: Mitigation received $1.3 trillion (CPI tracked, 2022). Adaptation received just $76 billion — less than 10% of total climate investment. Resilience and Recovery are not separately tracked by major global datasets.',
      'The UNEP Adaptation Gap Report 2024 estimates that adaptation needs will reach $215–387 billion per year by 2030. Actual adaptation finance is below $80 billion. The gap is $307 billion per year — and growing.',
      'Why did climate capital become so concentrated in mitigation? ESG frameworks prioritised emissions reduction metrics. Government policy favoured mitigation with clear incentive structures. Mitigation investments generate direct, visible cash flows (power purchase agreements, carbon credits). Disaster recovery was historically handled through insurance markets and public funding — separate from investment portfolios.',
      'This is not simply a temporary gap — it is a structural misalignment between capital allocation and the full economic reality of climate change. As physical climate risks accelerate, investment demand across adaptation, resilience, and recovery is expected to expand significantly.',
    ],
    keyStats: [
      { label: 'Mitigation Finance (2022)', value: '$1.3T', color: 'text-primary' },
      { label: 'Adaptation Finance (2022)', value: '$76B', color: 'text-danger' },
      { label: 'Adaptation Gap by 2030', value: '$307B/yr', color: 'text-warning' },
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'What was the approximate tracked value of climate finance in 2022 (CPI)?',
        options: ['$500 billion', '$1.3 trillion', '$2.5 trillion', '$3 trillion'],
        correctIndex: 1,
      },
      {
        id: 'q5-2',
        question: 'How much was tracked for adaptation finance in 2022 (CPI)?',
        options: ['$1.3 trillion', '$500 billion', '$76 billion', '$200 billion'],
        correctIndex: 2,
      },
      {
        id: 'q5-3',
        question: "According to UNEP's Adaptation Gap Report 2024, what are annual adaptation needs by 2030?",
        options: ['$10–20 billion', '$50–80 billion', '$215–387 billion', '$1 trillion'],
        correctIndex: 2,
      },
      {
        id: 'q5-4',
        question: 'Why did climate capital become concentrated in mitigation? (Select best reason)',
        options: ['Adaptation was not needed', 'ESG frameworks, measurable outcomes, and policy alignment favoured emissions reduction', 'Mitigation is cheaper', 'Resilience is too complex'],
        correctIndex: 1,
      },
      {
        id: 'q5-5',
        question: 'What does the capital imbalance highlight?',
        options: ['Climate change is not serious', 'Mitigation is more profitable', 'A structural misalignment between capital allocation and evolving climate economic realities', 'Investors dislike green bonds'],
        correctIndex: 2,
      },
      {
        id: 'q5-6',
        question: 'Which body produces the Global Landscape of Climate Finance report?',
        options: ['UNEP', 'World Economic Forum', 'Climate Policy Initiative', 'UNDRR'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'chapter-6',
    number: 6,
    title: 'Economic Roles of the Four Climate Pillars',
    pillar: 'All Pillars',
    duration: '18 min',
    summary: 'A structured comparison of the four pillars: their economic functions, typical investments, capital volumes, and investment drivers.',
    content: [
      'Mitigation: Economic function is to reduce GHG emissions and limit long-term severity. Typical investments include renewable energy, EVs, hydrogen, energy efficiency, and industrial decarbonisation. Approximate annual capital: $1.7 trillion. Investment driver: Policy.',
      'Adaptation: Economic function is to adjust infrastructure and systems to operate under changing climate conditions. Typical investments include flood management, water systems, climate-resilient agriculture, coastal protection, and urban heat mitigation. Approximate annual capital: $60–80 billion. Investment driver: Impact.',
      'Resilience: Economic function is to strengthen systems to withstand and absorb climate shocks. Typical investments include grid hardening, wildfire mitigation, storm-resistant infrastructure, resilient telecom, and flood-resilient urban systems. Annual capital: Limited and fragmented — not systematically tracked. Investment driver: Risk.',
      'Recovery: Economic function is to rebuild and restore infrastructure, systems, and communities following climate events. Typical investments include disaster reconstruction, insurance-linked capital, rebuilding infrastructure, and emergency recovery programs. Annual capital: Primarily reactive — not consistently measured. Investment driver: Events.',
    ],
    keyStats: [
      { label: 'Mitigation Annual Capital', value: '$1.7T', color: 'text-primary' },
      { label: 'Adaptation Annual Capital', value: '$60–80B', color: 'text-secondary' },
      { label: 'Recovery Tracking', value: 'Reactive', color: 'text-earth' },
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'What is the investment driver for Resilience investments?',
        options: ['Policy', 'Impact', 'Risk', 'Events'],
        correctIndex: 2,
      },
      {
        id: 'q6-2',
        question: 'What is the investment driver for Recovery investments?',
        options: ['Policy', 'Impact', 'Risk', 'Event'],
        correctIndex: 3,
      },
      {
        id: 'q6-3',
        question: 'Which pillar includes hydrogen and EVs as typical investments?',
        options: ['Adaptation', 'Recovery', 'Mitigation', 'Resilience'],
        correctIndex: 2,
      },
      {
        id: 'q6-4',
        question: 'What is the approximate annual capital for Adaptation?',
        options: ['$1.7 trillion', '$60–80 billion', '$500 billion', '$300 billion'],
        correctIndex: 1,
      },
      {
        id: 'q6-5',
        question: 'What is the economic function of Adaptation?',
        options: ['Rebuild damaged infrastructure', 'Reduce greenhouse gas emissions', 'Adjust infrastructure to operate under changing climate conditions', 'Strengthen systems against shocks'],
        correctIndex: 2,
      },
      {
        id: 'q6-6',
        question: 'Which pillars are NOT separately tracked in global climate finance datasets?',
        options: ['Mitigation and Adaptation', 'Adaptation and Recovery', 'Resilience and Recovery', 'Mitigation and Resilience'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'chapter-7',
    number: 7,
    title: 'Diversification & The Climate Economy Efficient Frontier',
    pillar: 'All Pillars',
    duration: '20 min',
    summary: 'How combining all four pillars in a portfolio improves diversification and unlocks the Climate Economy Efficient Frontier.',
    content: [
      'Each climate pillar has distinct correlation characteristics with traditional asset classes — and with each other. This creates genuine diversification opportunities.',
      'Mitigation has moderate correlation — it is policy and market-cycle dependent. Adaptation has lower correlation — linked to physical climate impacts rather than policy cycles. Resilience has low correlation — it is risk-driven and defensive in nature. Recovery has very low correlation — it is event-driven and episodic.',
      'The Climate Economy Efficient Frontier describes portfolios that span all four pillars, potentially capturing a broader range of climate economy investment opportunities while improving diversification and risk-adjusted returns.',
      'Applying portfolio theory: portfolios concentrated primarily in mitigation represent only a narrow segment of the opportunity set. Optimal capital allocation is not static — it evolves in response to changing climate conditions, economic impacts, and investment dynamics.',
      'Combining exposure across all four pillars may provide structural diversification benefits, reducing reliance on any single economic driver.',
    ],
    keyStats: [
      { label: 'Recovery Correlation', value: 'Very Low', color: 'text-primary' },
      { label: 'Pillars for Frontier', value: '4', color: 'text-secondary' },
      { label: 'Allocation Type', value: 'Dynamic', color: 'text-earth' },
    ],
    quiz: [
      {
        id: 'q7-1',
        question: 'Which climate pillar has "very low correlation" (event driven and episodic)?',
        options: ['Mitigation', 'Adaptation', 'Resilience', 'Recovery'],
        correctIndex: 3,
      },
      {
        id: 'q7-2',
        question: 'What does the "Climate Economy Efficient Frontier" represent?',
        options: ['A carbon tax model', 'Portfolios that dynamically allocate capital across all four pillars to optimise risk-adjusted returns', 'A single-theme mitigation portfolio', 'A government subsidy framework'],
        correctIndex: 1,
      },
      {
        id: 'q7-3',
        question: 'Why does Adaptation have lower correlation than Mitigation?',
        options: ['It is linked to policy cycles', 'It is linked to physical climate impacts', 'It generates higher returns', 'It depends on technology adoption'],
        correctIndex: 1,
      },
      {
        id: 'q7-4',
        question: "What is Resilience's primary economic driver?",
        options: ['Disaster events', 'Energy transition policy', 'Infrastructure protection, risk management, and system hardening', 'Insurance-linked activity'],
        correctIndex: 2,
      },
      {
        id: 'q7-5',
        question: 'Is optimal capital allocation across the four pillars static?',
        options: ['Yes, it remains fixed', 'No, it evolves in response to changing conditions', 'Yes, set by governments', 'No, only changes every decade'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'chapter-8',
    number: 8,
    title: 'The Adaptive Thematic Framework™ — Structure & Application',
    pillar: 'All Pillars',
    duration: '25 min',
    summary: 'Deep dive into the ATF™: dynamic weighting, pillar-based scoring, decision triggers, and portfolio construction methodology.',
    content: [
      'The Adaptive Thematic Framework™ is a proprietary capital allocation framework developed by Arciteq Capital. Its purpose is to address the structural limitations of traditional climate investment strategies that are concentrated in mitigation.',
      'Dynamic Approach: The framework allocates capital across the four pillars reflecting their evolving economic relevance. Each pillar is driven by different forces — mitigation by policy, adaptation by infrastructure needs, resilience by risk, recovery by reconstruction demand.',
      'Framework Structure: Capital is allocated based on relative position within the Climate Evolution Cycle. Early: heavier weighting toward mitigation. As impacts grow: allocation expands toward adaptation and resilience. Over time: recovery becomes more material.',
      'Pillar-Based Scoring: Each investment is evaluated against the four pillars using measurable indicators. Mitigation: tCO₂e avoided, energy transition contribution, carbon intensity improvement. Adaptation: exposure reduction to physical climate risks, infrastructure suitability under future climate. Resilience: system redundancy, ability to withstand extreme weather, recovery time. Recovery: speed of reconstruction, economic restoration impact, community reinstatement.',
      'Dynamic Weighting Logic: Weightings evolve based on climate risk exposure, frequency and severity of extreme weather, policy changes, infrastructure vulnerability, and disaster occurrence.',
      'Decision Triggers: Measurable increases in physical climate risk; changes in infrastructure vulnerability; policy shifts; occurrence of major climate disasters; insurance loss data and disaster recovery demand.',
    ],
    keyStats: [
      { label: 'Scoring Dimensions', value: '4', color: 'text-primary' },
      { label: 'Weighting Type', value: 'Dynamic', color: 'text-secondary' },
      { label: 'Replaces ESG?', value: 'No — Extends', color: 'text-earth' },
    ],
    quiz: [
      {
        id: 'q8-1',
        question: 'What organisation developed the Adaptive Thematic Framework™?',
        options: ['UNEP', 'World Economic Forum', 'Arciteq Capital', 'CPI'],
        correctIndex: 2,
      },
      {
        id: 'q8-2',
        question: 'What is the primary purpose of the Adaptive Thematic Framework™?',
        options: ['To focus entirely on renewable energy', 'To dynamically allocate capital across the four pillars of the climate economy', 'To replace all climate investment models', 'To create a carbon offset market'],
        correctIndex: 1,
      },
      {
        id: 'q8-3',
        question: 'In early stages of the Climate Evolution Cycle, capital allocation is weighted toward:',
        options: ['Recovery', 'Resilience', 'Mitigation', 'Adaptation'],
        correctIndex: 2,
      },
      {
        id: 'q8-4',
        question: 'Which metric is used to score Mitigation investments?',
        options: ['Speed of reconstruction', 'System redundancy', 'Emissions reduction potential (tCO₂e avoided)', 'Recovery time'],
        correctIndex: 2,
      },
      {
        id: 'q8-5',
        question: 'What does "Dynamic Weighting Logic" mean in the framework?',
        options: ['Allocations are set by government', 'Pillar weightings evolve in response to changing macro conditions', 'All pillars are always weighted equally', 'Weights are fixed at the start of each year'],
        correctIndex: 1,
      },
      {
        id: 'q8-6',
        question: 'Which of the following is a "Decision Trigger" for capital reallocation?',
        options: ['Stock market fluctuations', 'Occurrence of major climate-related disasters', 'Interest rate changes', 'Company earnings reports'],
        correctIndex: 1,
      },
      {
        id: 'q8-7',
        question: 'Tonne of CO₂ equivalent (tCO₂e) is used as a measure for which pillar?',
        options: ['Recovery', 'Resilience', 'Adaptation', 'Mitigation'],
        correctIndex: 3,
      },
      {
        id: 'q8-8',
        question: 'Does the Adaptive Thematic Framework™ intend to replace existing climate investment strategies?',
        options: ['Yes, completely', 'No — it extends and integrates them within a broader model', 'Only in developed markets', 'Only for governments'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'chapter-9',
    number: 9,
    title: 'Case Study — Gold Coast Municipal Resilience Pilot',
    pillar: 'All Pillars',
    duration: '20 min',
    summary: 'How the ATF™ was applied at a municipal level in Gold Coast, Australia — and what it means for households.',
    content: [
      'The Gold Coast case study demonstrates the ATF™ applied at a municipal level. The city faces exposure to coastal erosion, flooding, extreme rainfall, heat stress, and infrastructure vulnerability from rapid urban growth.',
      'Mitigation (Gold Coast): Renewable energy integration across council assets, electrification of public transport fleets, energy-efficient building upgrades.',
      'Adaptation (Gold Coast): Stormwater and flood management systems, coastal protection and erosion control, urban heat mitigation through green spaces and cooling infrastructure.',
      'Resilience (Gold Coast): Grid and energy system redundancy, climate-resilient transport corridors, emergency response infrastructure.',
      'Recovery (Gold Coast): Rapid rebuilding frameworks, disaster response funding mechanisms, insurance-linked resilience financing.',
      'Dynamic allocation in practice: During stable conditions, the framework prioritises mitigation and long-term adaptation. As risks intensify, the allocation shifts toward resilience. After extreme events, capital is redirected toward recovery and reconstruction.',
      'The Arciteq Capital Residents Tool extends the four-pillar framework to household level: residential solar (mitigation), property-level flood protection (adaptation), backup power solutions (resilience), insurance coverage optimisation (recovery).',
    ],
    keyStats: [
      { label: 'Case Study City', value: 'Gold Coast', color: 'text-primary' },
      { label: 'Pillars Applied', value: '4', color: 'text-secondary' },
      { label: 'Framework Level', value: 'Municipal', color: 'text-earth' },
    ],
    quiz: [
      {
        id: 'q9-1',
        question: 'Which Australian city is used as the case study in the paper?',
        options: ['Sydney', 'Melbourne', 'Gold Coast', 'Brisbane'],
        correctIndex: 2,
      },
      {
        id: 'q9-2',
        question: 'What is the "Arciteq Capital Residents Tool"?',
        options: ['A financial trading platform', 'An extension of the four-pillar framework to household-level decision making', 'A municipal accounting system', 'A carbon offset calculator'],
        correctIndex: 1,
      },
      {
        id: 'q9-3',
        question: 'Which Gold Coast initiative falls under the "Adaptation" pillar?',
        options: ['Electrification of public transport fleets', 'Coastal protection and erosion control', 'Grid redundancy', 'Rapid rebuilding frameworks'],
        correctIndex: 1,
      },
      {
        id: 'q9-4',
        question: 'After an extreme weather event, which pillar does capital allocation shift toward?',
        options: ['Mitigation', 'Adaptation', 'Resilience', 'Recovery'],
        correctIndex: 3,
      },
      {
        id: 'q9-5',
        question: 'What is an example of a household "Resilience" action?',
        options: ['Residential solar adoption', 'Insurance coverage optimisation', 'Backup power solutions', 'Property-level flood protection'],
        correctIndex: 2,
      },
      {
        id: 'q9-6',
        question: 'Which of these is a "Recovery" initiative at the Gold Coast municipal level?',
        options: ['Renewable energy integration', 'Flood management systems', 'Emergency response infrastructure', 'Disaster response funding mechanisms'],
        correctIndex: 3,
      },
    ],
  },
];

export const finalAssessmentQuestions: QuizQuestion[] = [
  {
    id: 'fa-1',
    question: 'What is the approximate annual global climate investment figure cited in the paper?',
    options: ['$500 billion', '$1 trillion', '$1.7 trillion', '$5 trillion'],
    correctIndex: 2,
  },
  {
    id: 'fa-2',
    question: 'What percentage of global climate investment goes to adaptation finance?',
    options: ['Less than 10%', '25%', '40%', '55%'],
    correctIndex: 0,
  },
  {
    id: 'fa-3',
    question: 'What are the four pillars of the Climate Evolution Cycle?',
    options: ['Carbon, Energy, Water, Land', 'Mitigation, Adaptation, Resilience, Recovery', 'Prevention, Protection, Restoration, Innovation', 'Emissions, Exposure, Hardening, Rebuilding'],
    correctIndex: 1,
  },
  {
    id: 'fa-4',
    question: 'Adaptation investments are primarily driven by:',
    options: ['Policy frameworks and subsidies', 'Insurance markets', 'Physical climate impacts and infrastructure requirements', 'Disaster events and reconstruction'],
    correctIndex: 2,
  },
  {
    id: 'fa-5',
    question: 'Which source reports the Global Landscape of Climate Finance?',
    options: ['UNEP', 'UNDRR', 'WEF', 'Climate Policy Initiative'],
    correctIndex: 3,
  },
  {
    id: 'fa-6',
    question: 'How much did CPI track for adaptation finance in 2022?',
    options: ['$1.3 trillion', '$76 billion', '$215 billion', '$500 billion'],
    correctIndex: 1,
  },
  {
    id: 'fa-7',
    question: 'What is the Climate Economy Efficient Frontier?',
    options: ['A carbon pricing mechanism', 'A framework optimising portfolios across mitigation, adaptation, resilience, and recovery', 'A set of ESG regulations', 'A single-pillar clean energy benchmark'],
    correctIndex: 1,
  },
  {
    id: 'fa-8',
    question: 'Which pillar has the lowest (very low) correlation with other asset classes?',
    options: ['Mitigation', 'Adaptation', 'Resilience', 'Recovery'],
    correctIndex: 3,
  },
  {
    id: 'fa-9',
    question: 'Recovery investments are primarily driven by:',
    options: ['Policy', 'Impact', 'Risk', 'Events'],
    correctIndex: 3,
  },
  {
    id: 'fa-10',
    question: 'What does the Adaptive Thematic Framework™ do that traditional static models do not?',
    options: ['Focuses only on renewable energy', 'Dynamically allocates capital across all four climate pillars in response to changing conditions', 'Targets only developed markets', 'Eliminates risk entirely'],
    correctIndex: 1,
  },
  {
    id: 'fa-11',
    question: 'Which metric scores Resilience investments?',
    options: ['Emissions reduction potential', 'Speed of reconstruction', 'System redundancy and ability to withstand extreme weather', 'Insurance coverage'],
    correctIndex: 2,
  },
  {
    id: 'fa-12',
    question: 'What is the role of "Decision Triggers" in the framework?',
    options: ['To generate trading signals', 'To signal when capital should be rebalanced across pillars', 'To set interest rates', 'To report ESG compliance'],
    correctIndex: 1,
  },
  {
    id: 'fa-13',
    question: 'In the Gold Coast case study, which pillar includes "electrification of public transport fleets"?',
    options: ['Adaptation', 'Resilience', 'Recovery', 'Mitigation'],
    correctIndex: 3,
  },
  {
    id: 'fa-14',
    question: "According to UNEP's Adaptation Gap Report 2024, annual adaptation needs by 2030 are:",
    options: ['$10–20 billion', '$80–100 billion', '$215–387 billion', '$1 trillion'],
    correctIndex: 2,
  },
  {
    id: 'fa-15',
    question: 'The Adaptive Thematic Framework™ is designed as:',
    options: ['A replacement for all ESG models', 'A system-level model applicable across economic and geopolitical challenges', 'A carbon offset standard', 'A government policy directive'],
    correctIndex: 1,
  },
];