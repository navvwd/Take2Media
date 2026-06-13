import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  Clapperboard,
  Code2,
  Coffee,
  DatabaseZap,
  ExternalLink,
  Film,
  Gem,
  HardHat,
  HeartPulse,
  Layers3,
  LayoutDashboard,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  PanelsTopLeft,
  PenTool,
  Phone,
  Play,
  Rocket,
  Sparkles,
  Target,
  Utensils,
  Workflow,
  Zap,
} from 'lucide-react';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BackToTopButton from './BackToTopButton.jsx';

const assets = {
  take2Logo: '/assets/t2m_logo.jpg',
  brownHouseLogo: '/assets/bh_logo.jpeg',
  rkpLogo: '/assets/rkp_logo.png',
  amkLogo: '/assets/amk_logo.png',
};

const navItems = [
  { label: 'Home', short: 'Home', href: '#top', icon: Sparkles },
  { label: 'About', short: 'About', href: '#about', icon: Target },
  { label: 'Services', short: 'Services', href: '#services', icon: PanelsTopLeft },
  { label: 'Work', short: 'Work', href: '#work', icon: Layers3 },
  { label: 'Process', short: 'Process', href: '#process', icon: Workflow },
  { label: 'Contact', short: 'Contact', href: '#contact', icon: MessageCircle },
];

const services = [
  {
    title: 'Website Development',
    icon: Code2,
    copy: 'Premium business websites with clean UX, fast loading, service clarity, and conversion-ready enquiry paths.',
  },
  {
    title: 'Social Media Handling',
    icon: Megaphone,
    copy: 'Content calendars, publishing support, page hygiene, campaign ideas, and steady brand visibility.',
  },
  {
    title: 'Video Creation',
    icon: Clapperboard,
    copy: 'Reels, promos, brand videos, launch clips, and platform-ready content built to earn attention.',
  },
  {
    title: 'Video Editing',
    icon: Film,
    copy: 'Sharp edits with pacing, captions, sound polish, color, story flow, and social-first exports.',
  },
  {
    title: 'Content Creation',
    icon: Sparkles,
    copy: 'Posts, reels concepts, carousels, launch content, restaurant promos, and service-led creative assets.',
  },
  {
    title: 'Script Writing',
    icon: PenTool,
    copy: 'Hooks, ad scripts, reel scripts, voiceovers, founder videos, and clear brand storytelling.',
  },
  {
    title: 'Poster & Creative Design',
    icon: Layers3,
    copy: 'Campaign posters, social media creatives, digital flyers, offer visuals, and polished brand templates.',
  },
  {
    title: 'Branding Support',
    icon: Gem,
    copy: 'Identity direction, visual consistency, messaging support, presentation polish, and brand recall.',
  },
  {
    title: 'Automation Solutions',
    icon: Zap,
    copy: 'Lead capture flows, reminders, reporting systems, business workflows, and time-saving digital operations.',
  },
  {
    title: 'AI / Agent Tech Solutions',
    icon: Bot,
    copy: 'AI assistants, agent workflows, content systems, and smart automation built around real business needs.',
  },
  {
    title: 'Agentic AI, Automation & Dashboards',
    icon: LayoutDashboard,
    copy: 'Smart automation workflows, AI-powered systems, personalized dashboards, and internal tools that help businesses manage operations from one place.',
  },
  {
    title: 'Digital Marketing Support',
    icon: Target,
    copy: 'Marketing assets, campaign support, SEO basics, funnel thinking, analytics, and growth-focused improvements.',
  },
];

const servicesByTitle = Object.fromEntries(services.map((service) => [service.title, service]));

const serviceCategories = [
  {
    name: 'Core Growth Services',
    note: 'The high-impact essentials that build trust, visibility, and conversion from the first interaction.',
    services: ['Website Development', 'Social Media Handling', 'Video Creation', 'Branding Support'],
  },
  {
    name: 'Creative Production',
    note: 'Content, scripts, edits, and campaign visuals shaped for stronger brand communication.',
    services: ['Video Editing', 'Content Creation', 'Script Writing', 'Poster & Creative Design'],
  },
  {
    name: 'Smart Systems',
    note: 'Automation, AI, dashboards, and digital support that connect your workflow into one smarter system.',
    services: ['Automation Solutions', 'AI / Agent Tech Solutions', 'Agentic AI, Automation & Dashboards', 'Digital Marketing Support'],
  },
];

const serviceDeepDives = {
  'Website Development': {
    detail: 'Build a premium website that explains your offer clearly, earns trust quickly, and turns visitors into serious enquiries.',
    tags: ['Landing Pages', 'Business Websites', 'Lead Forms'],
  },
  'Social Media Handling': {
    detail: 'Plan, polish, and maintain your social presence with content direction, consistent posting support, and brand-safe execution.',
    tags: ['Calendars', 'Publishing', 'Visibility'],
  },
  'Video Creation': {
    detail: 'Produce promotional videos, reels, launch clips, and service explainers that help people understand your brand faster.',
    tags: ['Promos', 'Reels', 'Launch Clips'],
  },
  'Branding Support': {
    detail: 'Create stronger recall through visual consistency, messaging polish, identity direction, and client-ready brand presentation.',
    tags: ['Identity', 'Messaging', 'Recall'],
  },
  'Video Editing': {
    detail: 'Shape raw footage into clean, paced, captioned, platform-ready videos with story flow and social-first polish.',
    tags: ['Captions', 'Color', 'Pacing'],
  },
  'Content Creation': {
    detail: 'Develop posts, carousels, reel ideas, campaign assets, and practical content that supports real business goals.',
    tags: ['Posts', 'Carousels', 'Campaigns'],
  },
  'Script Writing': {
    detail: 'Write sharper hooks, ad scripts, voiceovers, reel outlines, and founder-led messaging with a clear viewer journey.',
    tags: ['Hooks', 'Voiceovers', 'Story'],
  },
  'Poster & Creative Design': {
    detail: 'Design premium social posters, digital flyers, offer creatives, and templates that keep your brand visually consistent.',
    tags: ['Posters', 'Flyers', 'Templates'],
  },
  'Automation Solutions': {
    detail: 'Connect forms, leads, reminders, reporting, and repeat workflows so your team spends less time on manual follow-up.',
    tags: ['Lead Flows', 'Reminders', 'Reports'],
  },
  'AI / Agent Tech Solutions': {
    detail: 'Build AI assistants, agent workflows, content systems, and smart automations around actual business operations.',
    tags: ['AI Agents', 'Assistants', 'Workflows'],
  },
  'Agentic AI, Automation & Dashboards': {
    detail: 'Create personalized dashboards and AI-powered workflow systems that bring operations, data, and decisions into one place.',
    tags: ['Dashboards', 'Data', 'Operations'],
  },
  'Digital Marketing Support': {
    detail: 'Support campaigns, funnels, SEO basics, creative testing, and practical growth improvements across your digital presence.',
    tags: ['Campaigns', 'Funnels', 'Growth'],
  },
};

const smartServiceTitleSet = new Set(['Automation Solutions', 'AI / Agent Tech Solutions', 'Agentic AI, Automation & Dashboards']);

const portfolioWorks = [
  {
    name: 'Brown House Restaurant',
    logo: assets.brownHouseLogo,
    website: 'http://brownhouserestaurant.in/',
    cta: 'View Website',
    status: 'Website Delivered',
    secondaryStatus: 'Digital Support',
    category: 'Restaurant Website Development / Digital Branding / Video Production',
    description:
      "Take2 Media worked on the restaurant's digital presence, including website development, creative digital support, promotional content, and video production support for better online visibility.",
    badges: ['Website Development', 'Digital Branding', 'Video Production', 'Restaurant Marketing'],
    icon: Utensils,
    accent: 'from-ember/35 via-violet/15 to-cyan/20',
  },
  {
    name: 'RKP Hospitals',
    logo: assets.rkpLogo,
    website: 'http://rkphospitals.com/',
    cta: 'View Website',
    status: 'Website + Digital Setup',
    secondaryStatus: 'Ongoing Content Support',
    category: 'Hospital Website Development / Digital Setup / Content Creation',
    description:
      "Take2 Media worked on website development, hospital service presentation, digital setup support, content creation, and video production support to improve the hospital's online presence and communication.",
    badges: ['Website Development', 'Hospital Digital Setup', 'Content Creation', 'Video Production', 'Online Presence'],
    icon: HeartPulse,
    accent: 'from-cyan/30 via-electric/20 to-violet/25',
  },
  {
    name: 'Amuthu Karupatti Coffee',
    logo: assets.amkLogo,
    status: 'Creative Media Partner',
    secondaryStatus: 'Content Production',
    category: 'Social Media / Video Production / Content Production',
    description:
      'Take2 Media worked with Amuthu Karupatti Coffee as a creative media partner, supporting the brand through social media content, promotional video production, and content production for digital platforms.',
    note: 'This project focused on creative media and content support. Website development was not part of this work.',
    badges: ['Social Media Content', 'Video Production', 'Content Production', 'Food Brand Promotion'],
    icon: Coffee,
    accent: 'from-violet/35 via-cyan/15 to-ember/20',
  },
  {
    name: 'Construction Private Limited Company',
    status: 'In Progress',
    secondaryStatus: 'Dashboard Development',
    category: 'Personalized Dashboard / Business Automation / Internal Tools',
    description:
      'Take2 Media is working on a customized business dashboard for a construction private limited company, designed to help them manage important operations, monitor key data, and access business insights through a clean, personalized digital system.',
    badges: ['Personalized Dashboard', 'Business Automation', 'Internal Tool', 'Data Visualization', 'Workflow Support'],
    icon: HardHat,
    accent: 'from-cyan/25 via-violet/25 to-ember/20',
  },
];

const whyChoose = [
  'Creative and technical expertise in one place',
  'Premium visual quality with practical business value',
  'Website, media, branding, dashboards, automation, and growth support under one roof',
  'Clear client communication',
  'Fast execution with professional output',
  'Custom internal tools and dashboards based on each client business need',
  'Focus on real business growth, not just fancy design',
];

const trustPoints = [
  'Real client work across restaurants, hospitals, food brands, and business operations',
  'Website, content, branding, automation, and dashboard support under one roof',
  'Clear communication from planning to delivery',
  "Practical solutions built around each client's business workflow",
  'Premium digital presentation without unnecessary complexity',
];

const buildForYou = [
  {
    title: 'Restaurants',
    icon: Utensils,
    copy: 'Restaurant websites, menu presentation, food reels, promotional content, and social media support.',
  },
  {
    title: 'Hospitals',
    icon: HeartPulse,
    copy: 'Hospital websites, service pages, appointment form setup, awareness content, and digital presence support.',
  },
  {
    title: 'Local Brands',
    icon: Sparkles,
    copy: 'Branding, posters, social media content, video production, and campaign creatives.',
  },
  {
    title: 'Companies',
    icon: Building2,
    copy: 'Personalized dashboards, internal tools, workflow automation, data visualization, and business operation systems.',
  },
];

const productionFlow = [
  { label: 'Concept', icon: PenTool },
  { label: 'Shoot / Create', icon: Clapperboard },
  { label: 'Edit', icon: Film },
  { label: 'Publish', icon: Megaphone },
  { label: 'Engage', icon: Sparkles },
];

const productionCards = [
  {
    title: 'Social Media Handling',
    meta: 'Content calendars, posting support, page polish, and consistent brand visibility.',
    icon: Megaphone,
  },
  {
    title: 'Promotional Video Production',
    meta: 'Promo reels, launch clips, product/service videos, and campaign-ready cuts.',
    icon: Clapperboard,
  },
  {
    title: 'Content Production',
    meta: 'Posts, reels concepts, carousels, digital assets, and brand communication pieces.',
    icon: Sparkles,
  },
  {
    title: 'Creative Campaign Support',
    meta: 'Offer creatives, campaign direction, launch support, and social-first storytelling.',
    icon: Rocket,
  },
  {
    title: 'Branded Visual Storytelling',
    meta: 'Visual systems, design consistency, story arcs, and polished brand recall.',
    icon: Layers3,
  },
  {
    title: 'Reels & Short-Form Content',
    meta: 'Hook-led short-form content designed for fast attention and better engagement.',
    icon: Play,
  },
];

const automationFlow = [
  { label: 'Lead', icon: Target },
  { label: 'AI Routing', icon: Bot },
  { label: 'Automation', icon: Workflow },
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Action', icon: Rocket },
];

const dashboardCapabilities = [
  { title: 'Agentic AI workflows', icon: Bot },
  { title: 'Business automation systems', icon: Workflow },
  { title: 'Personalized dashboards', icon: LayoutDashboard },
  { title: 'Internal company tools', icon: PanelsTopLeft },
  { title: 'Data visualization systems', icon: ChartNoAxesCombined },
  { title: 'Workflow tracking dashboards', icon: DatabaseZap },
  { title: 'Form-to-dashboard automation', icon: MessageCircle },
  { title: 'Notification and reporting systems', icon: Mail },
  { title: 'CRM and lead management flows', icon: Target },
  { title: 'Custom digital systems for business operations', icon: Rocket },
];

const dashboardModules = [
  { label: 'Website Leads', icon: Code2 },
  { label: 'Social Media Enquiries', icon: Megaphone },
  { label: 'Campaign Requests', icon: Sparkles },
  { label: 'Automation Tasks', icon: Workflow },
  { label: 'Project Updates', icon: PanelsTopLeft },
  { label: 'Business Reports', icon: ChartNoAxesCombined },
  { label: 'Client Follow-ups', icon: MessageCircle },
  { label: 'Team Workflow', icon: Target },
];

const dashboardWorkflowExamples = [
  ['Website Form', 'Automation', 'Dashboard', 'Follow-up'],
  ['Social Media', 'Lead Capture', 'Dashboard', 'Action'],
];

const dashboardPlatforms = [
  'OpenAI',
  'Gemini',
  'LangChain',
  'n8n',
  'Make',
  'Zapier',
  'Google Sheets',
  'Airtable',
  'Notion',
  'Supabase',
  'Firebase',
  'PostgreSQL',
  'MongoDB',
  'WhatsApp',
  'Gmail',
  'Slack',
];

const footerServices = [
  'Website Development',
  'Social Media Handling',
  'Video Production',
  'Branding Support',
  'Automation Solutions',
  'Agentic AI',
  'Personalized Dashboards',
];

const processSteps = [
  ['01', 'Decode', 'Understand', 'We study your business, audience, goals, and current digital position.'],
  ['02', 'Map', 'Plan', 'We plan the right website, content, automation, or growth direction.'],
  ['03', 'Build', 'Create', 'We design, develop, edit, write, and create polished digital assets.'],
  ['04', 'Launch', 'Deliver', 'We launch clean, responsive, client-ready work with proper handoff.'],
  ['05', 'Scale', 'Grow', 'We refine content, improve systems, and support stronger visibility.'],
];

const industries = [
  'Restaurants',
  'Hospitals',
  'Cafes',
  'Local Businesses',
  'Startups',
  'Service Brands',
  'Retail Businesses',
  'Personal Brands',
];

const heroPillars = [
  ['Websites', 'Premium digital presence'],
  ['Creative Media', 'Content, video, and branding'],
  ['Automation', 'AI workflows and dashboards'],
];

const heroSignalItems = [
  { label: 'Brief', icon: Sparkles },
  { label: 'Website', icon: Code2, mobileHidden: true },
  { label: 'Content', icon: Clapperboard },
  { label: 'Automation', icon: Workflow, mobileHidden: true },
  { label: 'Growth', icon: Rocket },
];

const contactDetails = [
  { label: 'Phone', value: '+91 98946 78789', icon: Phone, href: 'tel:+919894678789' },
  { label: 'Email', value: 'take2mediia@gmail.com', icon: Mail, href: 'mailto:take2mediia@gmail.com' },
  { label: 'Location', value: 'Chennai, Tamil Nadu', icon: MapPin },
];

const contactFormInitialState = {
  name: '',
  phone: '',
  email: '',
  businessName: '',
  serviceRequired: '',
  message: '',
};

const contactFormEndpoint =
  'https://script.google.com/macros/s/AKfycbzqbB8bQQ294eePnozYWSsqSqRw2aITibRHlH692lLTY-iq5frfmE09VBuvrDSDARN5/exec';

const contactServiceOptions = [
  'Website Development',
  'Social Media Handling',
  'Video Production',
  'Branding & Creative Design',
  'Automation',
  'Agentic AI Solutions',
  'Personalized Dashboard',
  'Complete Digital Growth Package',
  'Other',
];

const ctaDeliverables = [
  'Website Development',
  'Social Media',
  'Video Production',
  'Branding',
  'Automation',
  'Agentic AI',
  'Dashboards',
];

const ctaRevealLines = [
  'Whether you need a website,',
  'social media growth,',
  'video content,',
  'branding,',
  'automation,',
  'agentic AI,',
  'or personalized dashboards,',
  'Take2 Media helps you build a stronger digital presence',
  'and a smarter business system.',
];

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function useElementScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    let frame = null;
    const update = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const start = viewportHeight * 0.86;
      const distance = rect.height + viewportHeight * 0.34;
      const nextProgress = clamp((start - rect.top) / distance);
      setProgress((current) => (Math.abs(current - nextProgress) > 0.006 ? nextProgress : current));
      frame = null;
    };

    const requestUpdate = () => {
      if (frame === null) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return [ref, progress];
}

function Reveal({ children, className = '', delay = 0, as: Tag = 'div', ...props }) {
  const [ref, visible] = useReveal();
  const mergedStyle = {
    ...(props.style || {}),
    transitionDelay: `${delay}ms`,
  };

  return (
    <Tag
      {...props}
      ref={ref}
      className={`${className} reveal-ready ${visible ? 'reveal-in' : ''}`}
      style={mergedStyle}
    >
      {children}
    </Tag>
  );
}

function ScrollRevealText({ lines }) {
  const [ref, progress] = useElementScrollProgress();

  return (
    <div ref={ref} className="scroll-reveal-text" aria-label={lines.join(' ')}>
      {lines.map((line, index) => {
        const start = index / lines.length - 0.04;
        const end = (index + 1) / lines.length + 0.12;
        const lineProgress = clamp((progress - start) / (end - start));
        const opacity = 0.28 + lineProgress * 0.72;

        return (
          <span
            key={line}
            className="scroll-reveal-line"
            style={{
              opacity,
              color: `rgba(5, 7, 13, ${opacity})`,
              transform: `translate3d(0, ${(1 - lineProgress) * 10}px, 0)`,
            }}
          >
            {line}
          </span>
        );
      })}
    </div>
  );
}

function DeliverablesFlow() {
  return (
    <div className="deliverables-flow" aria-label="Website Development to Social Media to Video Production to Branding to Automation to Agentic AI to Dashboards">
      {ctaDeliverables.map((item, index) => (
        <React.Fragment key={item}>
          <span
            className="deliverable-badge"
            style={{
              transform: `rotate(${(index - 3) * 1.1}deg) translateY(${index % 2 ? 7 : 0}px)`,
              animationDelay: `${index * 90}ms`,
            }}
          >
            {item}
          </span>
          {index < ctaDeliverables.length - 1 && (
            <span className="deliverable-arrow" aria-hidden="true">
              <ArrowRight size={15} strokeWidth={3} />
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function Section({ id, eyebrow, title, copy, children, className = '' }) {
  return (
    <section id={id} className={`relative z-10 px-5 py-20 sm:px-6 lg:px-8 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || copy) && (
          <Reveal className="mb-12 max-w-3xl">
            {eyebrow && (
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                <span className="h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_18px_rgba(255,138,61,0.9)]" />
                {eyebrow}
              </p>
            )}
            {title && <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>}
            {copy && <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{copy}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

function LogoMark() {
  return (
    <span className="premium-logo-frame premium-logo-frame-nav">
      <img src={assets.take2Logo} alt="Take2 Media logo" className="premium-logo-image premium-logo-image-nav" />
    </span>
  );
}

function Navbar() {
  const [activeHref, setActiveHref] = useState('#top');

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    if (!sections.length) return undefined;

    let frame = null;

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.42;
      let currentHref = '#top';

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= activationLine) {
          currentHref = `#${section.id}`;
        }
      });

      setActiveHref((current) => (current === currentHref ? current : currentHref));
      frame = null;
    };

    const requestUpdate = () => {
      if (frame === null) {
        frame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      if (!window.location.hash) return;

      const target = document.querySelector(window.location.hash);
      if (target) {
        window.requestAnimationFrame(() => {
          target.scrollIntoView({ block: 'start' });
        });
      }
    };

    const initialHashTimer = window.setTimeout(scrollToHash, 120);
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      window.clearTimeout(initialHashTimer);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return (
    <>
      <header className="site-topbar">
        <div className="topbar-shell">
          <a href="#top" className="topbar-brand group" aria-label="Take2 Media home">
            <LogoMark />
            <span className="topbar-brand-copy">
              <span>Take2</span>
              <span>Media</span>
            </span>
          </a>
          <span className="topbar-signature">
            <span />
            Creative Tech Studio
          </span>
        </div>
      </header>

      <nav className="floating-dock" aria-label="Primary navigation">
        <div className="floating-dock-shell">
          <div className="floating-dock-track">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`dock-link ${activeHref === item.href ? 'is-active' : ''}`}
                aria-current={activeHref === item.href ? 'page' : undefined}
              >
                <span className="dock-link-icon">
                  <item.icon size={15} strokeWidth={2.4} />
                </span>
                <span className="dock-link-label">{item.short}</span>
                <span className="dock-link-timeline" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </a>
            ))}
          </div>
          <a href="#contact" className={`dock-cta ${activeHref === '#contact' ? 'is-active' : ''}`}>
            Start Project
            <ArrowRight size={16} strokeWidth={2.6} />
          </a>
        </div>
      </nav>
    </>
  );
}

function AbstractScene() {
  return (
    <div className="hero-scene hero-engine relative mx-auto aspect-square w-full max-w-[540px] lg:max-w-[620px]">
      <div className="hero-engine-grid" />
      <div className="hero-energy-core" aria-hidden="true">
        <span className="hero-core-ring hero-core-ring-one" />
        <span className="hero-core-ring hero-core-ring-two" />
        <span className="hero-core-ring hero-core-ring-three" />
        <span className="hero-core-glass" />
      </div>

      <span className="hero-glow-orb hero-glow-orb-cyan" />
      <span className="hero-glow-orb hero-glow-orb-violet" />
      <span className="hero-glow-orb hero-glow-orb-ember" />
      <span className="hero-motion-beam hero-motion-beam-one" />
      <span className="hero-motion-beam hero-motion-beam-two" />

      {[
        ['Website', Code2, 'left-[11%] top-[16%]'],
        ['Content', Clapperboard, 'right-[8%] top-[20%]'],
        ['AI Flow', Bot, 'left-[16%] bottom-[20%]'],
        ['Growth', Rocket, 'right-[18%] bottom-[13%]'],
      ].map(([label, Icon, position], index) => (
        <div key={label} className={`hero-orbit-node ${position}`} style={{ animationDelay: `${index * 160}ms` }}>
          <Icon size={17} />
          <span>{label}</span>
        </div>
      ))}

      <div className="hero-glass-panel hero-panel-dashboard">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">Live System</span>
          <Sparkles size={16} className="text-ember" />
        </div>
        <div className="mt-5 space-y-3">
          <span className="block h-2.5 rounded-full bg-white/34" />
          <span className="block h-2.5 w-3/4 rounded-full bg-cyan/45" />
          <span className="block h-2.5 w-5/6 rounded-full bg-violet/35" />
        </div>
      </div>

      <div className="hero-glass-panel hero-panel-media">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-night shadow-glow">
            <Play size={17} fill="currentColor" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-black text-white">Creative Reel</p>
            <p className="mt-1 text-xs font-semibold text-slate-400">video + social + brand</p>
          </div>
        </div>
      </div>

      <div className="hero-metric-cube">
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Growth Engine</span>
        <strong className="mt-2 block font-display text-2xl text-white">Take2</strong>
      </div>
    </div>
  );
}

function AmbientVisuals() {
  return (
    <div className="ambient-3d" aria-hidden="true">
      <span className="velvet-shape velvet-shape-one" />
      <span className="velvet-shape velvet-shape-two" />
      <span className="velvet-shape velvet-shape-three" />
      <span className="depth-ribbon depth-ribbon-one" />
      <span className="depth-ribbon depth-ribbon-two" />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative z-10 overflow-hidden px-5 pb-32 pt-32 sm:px-6 sm:pb-36 lg:px-8 lg:pb-40 lg:pt-24">
      <div className="absolute left-1/2 top-28 h-44 w-[40rem] -translate-x-1/2 rounded-full bg-cyan/10 blur-3xl" />
      <div className="absolute left-[8%] top-36 h-px w-28 bg-gradient-to-r from-transparent via-cyan/70 to-transparent" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="hero-copy reveal-in">
          <div className="hero-signal-thread" aria-label="Creative signal thread from brief to website, content, automation, and growth">
            <div className="hero-signal-track" aria-hidden="true">
              <span className="hero-signal-line" />
              <span className="hero-signal-pulse" />
            </div>
            <div className="hero-signal-items">
              {heroSignalItems.map(({ label, icon: Icon, mobileHidden }) => (
                <span key={label} className="hero-signal-chip" data-mobile-hidden={mobileHidden ? 'true' : undefined}>
                  <span className="hero-signal-node" aria-hidden="true">
                    <Icon size={12} strokeWidth={2.4} />
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </div>
          <h1 className="hero-headline font-display text-5xl font-extrabold leading-[0.98] tracking-normal sm:text-6xl lg:text-7xl">
            We Build <span className="hero-word-glow">Digital Presence</span> That Helps Brands <span className="gradient-text hero-sweep">Grow</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Take2 Media helps businesses grow through premium websites, social media handling, video content, branding, <span className="text-cyan-100">automation</span>, and <span className="text-violet-100">agentic AI</span> digital solutions.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#work" className="hero-cta-primary button-shine inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan via-electric to-violet px-7 py-4 text-sm font-bold text-white shadow-glow transition">
              View Our Work <ArrowRight className="hero-cta-arrow" size={18} />
            </a>
            <a href="#contact" className="hero-cta-secondary inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/7 px-7 py-4 text-sm font-bold text-white transition">
              Start a Project <ArrowRight className="hero-cta-arrow" size={17} />
            </a>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {heroPillars.map(([value, label]) => (
              <div key={label} className="hero-pillar-card glass rounded-2xl px-4 py-4">
                <p className="font-display text-2xl font-black text-white">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <AbstractScene />
      </div>
    </section>
  );
}

function SmartSystemPreview({ active = false }) {
  return (
    <div className={`smart-system-preview ${active ? 'is-active' : ''}`} aria-hidden="true">
      <span className="smart-node smart-node-one" />
      <span className="smart-node smart-node-two" />
      <span className="smart-node smart-node-three" />
      <span className="smart-connection smart-connection-one" />
      <span className="smart-connection smart-connection-two" />
      <div className="smart-mini-dashboard">
        <span />
        <span />
        <span />
      </div>
      <div className="smart-floating-chip smart-floating-chip-one">AI</div>
      <div className="smart-floating-chip smart-floating-chip-two">Flow</div>
    </div>
  );
}

function useFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updatePointerMode = () => setHasFinePointer(mediaQuery.matches);

    updatePointerMode();
    mediaQuery.addEventListener('change', updatePointerMode);
    return () => mediaQuery.removeEventListener('change', updatePointerMode);
  }, []);

  return hasFinePointer;
}

const InteractiveServiceCard = memo(function InteractiveServiceCard({
  categoryName,
  enableHoverActivation,
  index,
  isActive,
  isSmartService,
  onActivate,
  serviceTitle,
}) {
  const service = servicesByTitle[serviceTitle];
  const deepDive = serviceDeepDives[serviceTitle];
  const Icon = service.icon;

  const handleActivate = useCallback(() => {
    onActivate(serviceTitle);
  }, [onActivate, serviceTitle]);

  const handlePointerEnter = useCallback(() => {
    if (enableHoverActivation) {
      onActivate(serviceTitle);
    }
  }, [enableHoverActivation, onActivate, serviceTitle]);

  return (
    <article
      className={`interactive-service-card ${isActive ? 'is-active' : ''} ${isSmartService ? 'is-smart-system' : ''}`}
      onClick={handleActivate}
      onFocus={handleActivate}
      onPointerEnter={handlePointerEnter}
      tabIndex={0}
      aria-pressed={isActive}
    >
      <div className="interactive-service-topline">
        <span className="interactive-service-number">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="interactive-service-category">{categoryName}</span>
      </div>

      <div className="interactive-service-main">
        <div className="interactive-service-icon">
          <Icon size={22} />
        </div>
        <div>
          <h3>{service.title}</h3>
          <p>{service.copy}</p>
        </div>
      </div>

      {isSmartService && <SmartSystemPreview active={isActive} />}

      <div className="interactive-service-detail">
        <p>{deepDive.detail}</p>
        <div>
          {deepDive.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <span className="interactive-service-arrow" aria-hidden="true">
        <ArrowRight size={17} />
      </span>
    </article>
  );
});

function ServicesSection() {
  const [activeService, setActiveService] = useState('Website Development');
  const enableHoverActivation = useFinePointer();
  const activeCategory = useMemo(
    () => serviceCategories.find((category) => category.services.includes(activeService)) || serviceCategories[0],
    [activeService],
  );
  const activateService = useCallback((serviceTitle) => {
    setActiveService((currentService) => (currentService === serviceTitle ? currentService : serviceTitle));
  }, []);

  return (
    <Section id="services" className="py-16 lg:py-24">
      <div className="services-redesign relative grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
        <Reveal className="services-sticky-panel">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
            <span className="h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_18px_rgba(255,138,61,0.9)]" />
            Services
          </p>
          <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            Digital services built for visibility, trust, and real business growth.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            Choose one focused service or bring Take2 Media in as your creative and digital growth partner.
          </p>

          <div className="mt-8 grid gap-3">
            {serviceCategories.map((category, index) => {
              const selected = category.name === activeCategory.name;

              return (
                <button
                  key={category.name}
                  type="button"
                  className={`service-category-tab ${selected ? 'is-selected' : ''}`}
                  onClick={() => setActiveService(category.services[0])}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{category.name}</strong>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="service-category-stack">
          {serviceCategories.map((category, categoryIndex) => (
            <Reveal key={category.name} delay={categoryIndex * 80} className="service-category-block">
              <div className="service-category-heading">
                <span>{category.name}</span>
                <p>{category.note}</p>
              </div>

              <div className="service-interactive-grid">
                {category.services.map((serviceTitle, index) => {
                  const isActive = activeService === serviceTitle;
                  const isSmartService = smartServiceTitleSet.has(serviceTitle);

                  return (
                    <InteractiveServiceCard
                      key={serviceTitle}
                      categoryName={category.name}
                      enableHoverActivation={enableHoverActivation}
                      index={index}
                      isActive={isActive}
                      isSmartService={isSmartService}
                      onActivate={activateService}
                      serviceTitle={serviceTitle}
                    />
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function WorkCard({ work, index }) {
  const { name, logo, website, status, secondaryStatus, cta, category, description, note, badges, icon: Icon, accent } = work;

  return (
    <Reveal as="article" delay={index * 90} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan/30 sm:p-6">
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-75 transition duration-500 group-hover:opacity-95`} />
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-cyan/15 blur-3xl" />
      <div className="absolute inset-0 bg-radial-grid bg-[length:22px_22px] opacity-20" />

      <div className="relative flex min-h-[34rem] flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="premium-logo-frame premium-logo-frame-work rounded-[1.65rem]">
            {logo ? (
              <img src={logo} alt={`${name} logo`} className="premium-logo-image" loading="eager" />
            ) : (
              <Icon size={36} className="relative z-10 text-night" />
            )}
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex max-w-[13rem] flex-wrap justify-end gap-2">
              {status && (
                <span className="rounded-full border border-ember/30 bg-ember/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-ember">
                  {status}
                </span>
              )}
              {secondaryStatus && (
                <span className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">
                  {secondaryStatus}
                </span>
              )}
            </div>
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur-xl transition duration-500 group-hover:rotate-6 group-hover:scale-105">
              <Icon size={24} />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">{category}</p>
          <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-white">{name}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-200 sm:text-base">{description}</p>
          {note && <p className="mt-4 rounded-2xl border border-white/10 bg-night/45 p-4 text-sm font-semibold leading-6 text-slate-100">{note}</p>}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span key={badge} className="rounded-full border border-white/10 bg-night/60 px-3 py-2 text-xs font-bold text-slate-100 backdrop-blur-xl">
              {badge}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-8">
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="button-shine inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-night transition hover:bg-cyan-100"
            >
              {cta} <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function SocialVideoProductionSection() {
  return (
    <Section
      id="social-video"
      eyebrow="Creative Studio"
      title="Social Media, Video & Content Production"
      copy="Take2 Media creates engaging social media content, promotional videos, branded visuals, and creative digital media designed to help businesses attract attention, communicate better, and strengthen their online presence."
      className="py-16 lg:py-24"
    >
      <div className="video-production-stage relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/25 sm:p-8 lg:p-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan/18 blur-3xl" />
        <div className="absolute right-10 top-1/4 h-80 w-80 rounded-full bg-violet/16 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-ember/14 blur-3xl" />
        <div className="absolute inset-0 bg-radial-grid bg-[length:26px_26px] opacity-15" />

        <div className="relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal className="max-w-2xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-night/55 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-xl">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-night">
                <Clapperboard size={15} />
              </span>
              Studio Workflow
            </div>

            <h3 className="mt-7 font-display text-3xl font-black leading-tight text-white sm:text-4xl">
              Content built like a campaign, polished like a studio.
            </h3>
            <p className="mt-5 leading-8 text-slate-300">
              From scroll-stopping concepts to edited reels, launch creatives, food promos, service videos, and branded social assets, the production process stays sharp, organized, and business-focused.
            </p>

            <div className="production-flow mt-8" aria-label="Concept to Shoot or Create to Edit to Publish to Engage">
              {productionFlow.map(({ label, icon: Icon }, index) => (
                <React.Fragment key={label}>
                  <div className="production-flow-step">
                    <Icon size={17} />
                    <span>{label}</span>
                  </div>
                  {index < productionFlow.length - 1 && (
                    <ArrowRight className="production-flow-arrow" size={18} aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {productionCards.map(({ title, meta, icon: Icon }, index) => (
                <Reveal key={title} delay={index * 70} className="production-mini-card">
                  <Icon size={19} className="text-ember" />
                  <p className="mt-4 font-display text-base font-bold text-white">{title}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-400">{meta}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="studio-visual relative min-h-[30rem]">
            <div className="production-feature-panel">
              <div className="production-feature-panel-glow" />
              <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100">Feature Focus</p>
                <h4 className="mt-3 font-display text-2xl font-black text-white">Social Media Handling</h4>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
                  Planning, creative direction, content rhythm, and visual consistency for brands that need to stay visible.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Reels', 'Posts', 'Campaigns'].map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-slate-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lens-core" aria-hidden="true">
              <span className="lens-ring lens-ring-one" />
              <span className="lens-ring lens-ring-two" />
              <span className="lens-ring lens-ring-three" />
              <span className="lens-glass" />
            </div>

            <div className="floating-video-frame floating-video-frame-one">
              <div className="video-frame-topline">
                <span />
                <span />
                <span />
              </div>
              <div className="video-frame-media">
                <span className="video-play-dot">
                  <Play size={18} fill="currentColor" />
                </span>
              </div>
              <div className="video-frame-caption">
                <span>Promo Cut</span>
                <span>00:18</span>
              </div>
            </div>

            <div className="floating-video-frame floating-video-frame-two">
              <div className="reel-card-stack">
                <span />
                <span />
                <span />
              </div>
              <div className="video-frame-caption">
                <span>Reel Story</span>
                <span>9:16</span>
              </div>
            </div>

            <div className="floating-video-frame floating-video-frame-three">
              <div className="frame-strip" aria-hidden="true">
                {Array.from({ length: 7 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
              <div className="video-frame-caption">
                <span>Edit Pass</span>
                <span>Frame by frame</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function DashboardSection() {
  return (
    <Section
      id="agentic-ai"
      eyebrow="Agentic AI & Dashboards"
      title="Agentic AI, Automation & Dashboard Systems"
      copy="Take2 Media builds automation workflows, AI-assisted systems, and personalized dashboards that help businesses collect leads, connect tools, track operations, and manage important updates from one place."
      className="py-16 lg:py-24"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-8 lg:p-10">
        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
        <div className="absolute left-1/3 top-1/2 h-72 w-72 rounded-full bg-violet/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-ember/15 blur-3xl" />
        <div className="absolute inset-0 bg-radial-grid bg-[length:24px_24px] opacity-15" />

        <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal className="max-w-2xl">
            <div className="mb-7 inline-grid h-16 w-16 place-items-center rounded-[1.4rem] border border-white/15 bg-white/10 text-cyan shadow-glow backdrop-blur-xl">
              <LayoutDashboard size={30} />
            </div>
            <h3 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl">
              Agentic AI, Automation & Dashboards
            </h3>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              From website enquiries and social media leads to project updates, reports, and follow-ups, we can organize your business workflow into a clean personalized dashboard.
            </p>
            <p className="mt-5 leading-8 text-slate-300">
              Take2 Media is also working with a construction private limited company to build a personalized dashboard for their business operations.
            </p>
          </Reveal>

          <Reveal delay={120} className="automation-system-visual">
            <div className="automation-system-glow automation-system-glow-one" />
            <div className="automation-system-glow automation-system-glow-two" />
            <div className="automation-depth-grid" aria-hidden="true" />
            <div className="automation-orbit-ring automation-orbit-ring-one" aria-hidden="true" />
            <div className="automation-orbit-ring automation-orbit-ring-two" aria-hidden="true" />
            <div className="automation-path-line" />
            <div className="automation-flow-row">
              {automationFlow.map(({ label, icon: Icon }, index) => (
                <React.Fragment key={label}>
                  <div className="automation-node" style={{ animationDelay: `${index * 120}ms` }}>
                    <span>
                      <Icon size={18} />
                    </span>
                    <strong>{label}</strong>
                  </div>
                  {index < automationFlow.length - 1 && (
                    <ArrowRight className="automation-node-arrow" size={18} aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="automation-dashboard-panel automation-dashboard-panel-main">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">Operations Dashboard</span>
                <LayoutDashboard size={16} className="text-ember" />
              </div>
              <p className="automation-dashboard-copy">
                Your website leads, social media enquiries, automation tasks, reports, and business updates can be organized into one clean personalized dashboard.
              </p>
              <div className="dashboard-module-grid">
                {dashboardModules.map(({ label, icon: Icon }, index) => (
                  <span key={label} className="dashboard-module-card" style={{ '--module-delay': `${index * 80}ms` }}>
                    <Icon size={14} />
                    {label}
                  </span>
                ))}
              </div>
              <p className="automation-dashboard-note">Built around your workflow, not a fixed template.</p>
            </div>

            <div className="automation-dashboard-panel automation-dashboard-panel-side">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Smart Triggers</span>
              <div className="mt-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
                <span className="h-2 flex-1 rounded-full bg-white/18" />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="dashboard-flow-board relative mt-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Workflow Examples</p>
            <h4 className="mt-2 font-display text-xl font-bold text-white">Connected routes from request to action.</h4>
          </div>
          <div className="dashboard-flow-list">
            {dashboardWorkflowExamples.map((flow) => (
              <div key={flow.join('-')} className="dashboard-flow-row">
                {flow.map((item, index) => (
                  <React.Fragment key={item}>
                    <span className="dashboard-flow-node">{item}</span>
                    {index < flow.length - 1 && (
                      <ArrowRight className="dashboard-flow-arrow" size={16} aria-hidden="true" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {dashboardCapabilities.slice(0, 5).map(({ title, icon: Icon }, index) => (
            <Reveal key={title} delay={index * 60} className="dashboard-capability-chip group">
              <span>
                <Icon size={18} />
              </span>
              <strong>{title}</strong>
            </Reveal>
          ))}
        </div>

        <Reveal className="relative mt-8 rounded-[1.75rem] border border-white/10 bg-night/50 p-5 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Tools & Platforms</p>
              <h4 className="mt-3 font-display text-2xl font-bold text-white">
                Systems built around the tools your business already uses.
              </h4>
              <p className="mt-4 leading-7 text-slate-300">
                These tools can be connected based on the client's business needs to create smarter workflows, faster reporting, and better operational visibility.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end">
              {dashboardPlatforms.map((platform) => (
                <span key={platform} className="dashboard-platform-chip rounded-full border border-white/10 bg-white/7 px-4 py-2 text-xs font-bold text-slate-100">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function TrustedLogoStrip() {
  const trustedBrands = [
    { name: 'Brown House Restaurant', logo: assets.brownHouseLogo },
    { name: 'RKP Hospitals', logo: assets.rkpLogo },
    { name: 'Amuthu Karupatti Coffee', logo: assets.amkLogo },
  ];

  return (
    <Section id="trusted" eyebrow="Trust" title="Trusted by Growing Brands" className="py-12 lg:py-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustedBrands.map(({ name, logo }, index) => (
          <Reveal key={name} delay={index * 70} className="glass group flex min-h-32 items-center gap-4 rounded-[1.5rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan/30">
            <span className="premium-logo-frame premium-logo-frame-trust rounded-[1.35rem]">
              <img src={logo} alt={`${name} logo`} className="premium-logo-image" loading="lazy" />
            </span>
            <span className="font-display text-lg font-bold leading-tight text-white">{name}</span>
          </Reveal>
        ))}
        <Reveal delay={240} className="glass flex min-h-32 items-center justify-center rounded-[1.5rem] p-5 text-center">
          <span className="rounded-full border border-ember/30 bg-ember/15 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-ember">
            Construction Dashboard Project
          </span>
        </Reveal>
      </div>
    </Section>
  );
}

function TrustSection() {
  return (
    <Section
      id="trust"
      eyebrow="Trust"
      title="Built With Real Business Needs in Mind"
      copy="Take2 Media focuses on practical digital work that businesses actually need, from websites and social media content to automation systems and personalized dashboards. Every project is handled with clear communication, useful design, and business-focused execution."
      className="py-16 lg:py-24"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {trustPoints.map((point, index) => (
          <Reveal key={point} delay={index * 70} className="glass rounded-[1.5rem] p-5">
            <BadgeCheck className="mb-5 text-ember" size={22} />
            <p className="text-sm font-semibold leading-7 text-slate-100">{point}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function BuildForYouSection() {
  return (
    <Section id="build-for-you" eyebrow="Solutions" title="What We Can Build For You">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {buildForYou.map(({ title, icon: Icon, copy }, index) => (
          <Reveal key={title} delay={index * 80} className="group glass relative overflow-hidden rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan/30">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan/10 blur-2xl transition group-hover:bg-ember/15" />
            <div className="relative">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-night">
                <Icon size={23} />
              </span>
              <h3 className="mt-7 font-display text-2xl font-bold text-white">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProcessSection() {
  const zigzagOffsets = ['0rem', '8rem', '1.8rem', '9rem', '3rem'];
  const processRoutePath = 'M110 124 C215 124 244 252 350 252 C456 252 490 116 600 116 C712 116 744 270 850 270 C956 270 996 148 1090 148';
  const processRouteSegments = [
    'M110 124 C215 124 244 252 350 252',
    'M350 252 C456 252 490 116 600 116',
    'M600 116 C712 116 744 270 850 270',
    'M850 270 C956 270 996 148 1090 148',
  ];
  const processRouteCues = [
    { x: 244, y: 178, rotate: 48 },
    { x: 486, y: 190, rotate: -42 },
    { x: 728, y: 190, rotate: 50 },
    { x: 968, y: 206, rotate: -34 },
  ];

  return (
    <Section
      id="process"
      eyebrow="Process"
      title="From First Brief to Digital Growth, We Move With a Clear Plan."
      copy="Every project follows a structured creative and technical journey, from understanding your business to planning, creating, launching, and improving your digital presence."
    >
      <div className="process-zigzag-shell">
        <div className="process-zigzag-glow process-zigzag-glow-cyan" aria-hidden="true" />
        <div className="process-zigzag-glow process-zigzag-glow-violet" aria-hidden="true" />

        <svg className="process-zigzag-svg" viewBox="0 0 1200 420" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="processZigzagGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.22" />
              <stop offset="45%" stopColor="#22d3ee" stopOpacity="0.9" />
              <stop offset="78%" stopColor="#8b5cf6" stopOpacity="0.78" />
              <stop offset="100%" stopColor="#ff8a3d" stopOpacity="0.46" />
            </linearGradient>
          </defs>
          <path className="process-zigzag-ribbon" d={processRoutePath} />
          <path className="process-zigzag-route-base" d={processRoutePath} />
          {processRouteSegments.map((segment, index) => (
            <path
              key={segment}
              className="process-zigzag-route-segment"
              d={segment}
              style={{ '--route-delay': `${index * 140}ms` }}
            />
          ))}
          {processRouteCues.map(({ x, y, rotate }, index) => (
            <g
              key={`${x}-${y}`}
              className="process-zigzag-media-cue"
              style={{ '--cue-delay': `${index * 160}ms` }}
              transform={`translate(${x} ${y}) rotate(${rotate})`}
            >
              <rect x="-22" y="-8" width="44" height="16" rx="8" />
              <path d="M-12 0 H12" />
              <circle cx="-14" cy="0" r="2" />
              <circle cx="14" cy="0" r="2" />
              <path d="M2 -5 L7 0 L2 5" />
            </g>
          ))}
          <circle className="process-zigzag-pulse" r="5.5">
            <animateMotion dur="7s" repeatCount="indefinite" path={processRoutePath} />
          </circle>
        </svg>

        <div className="process-zigzag-track">
          {processSteps.map(([num, step, phase, copy], index) => (
            <Reveal
              key={step}
              delay={index * 90}
              className="process-zigzag-step-wrap"
              style={{ '--zigzag-offset': zigzagOffsets[index] }}
            >
              <article className="process-zigzag-card">
                <span className="process-zigzag-number">{num}</span>
                <span className="process-zigzag-dot" aria-hidden="true" />
                <span className="process-zigzag-label">{phase}</span>
                <h3>{step}</h3>
                <p>{copy}</p>
              </article>
              {index < processSteps.length - 1 && (
                <span className="process-zigzag-mobile-cue" aria-hidden="true">
                  <span className="process-mobile-reel-dots">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className="process-mobile-reel-line" />
                  <span className="process-mobile-reel-cut" />
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function FinalCTASection() {
  return (
    <Section id="cta" className="py-16 lg:py-24">
      <Reveal className="cta-premium-card relative overflow-hidden rounded-[2rem] border border-white/10 bg-white p-7 text-night sm:p-10 lg:p-14">
        <div className="cta-depth-orb cta-depth-orb-one" />
        <div className="cta-depth-orb cta-depth-orb-two" />
        <div className="cta-depth-orb cta-depth-orb-three" />
        <div className="cta-depth-plane" />

        <div className="relative">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-electric">Let's Build Your Brand Online</p>
          <DeliverablesFlow />

          <div className="mt-10 grid gap-9 lg:grid-cols-[1fr_18rem] lg:items-end">
            <ScrollRevealText lines={ctaRevealLines} />

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <a href="#contact" className="cta-action button-shine inline-flex items-center justify-center gap-2 rounded-full bg-night px-7 py-4 text-sm font-bold text-white transition">
                Start Your Project <ArrowRight size={18} />
              </a>
              <p className="max-w-xs text-left text-sm font-semibold leading-6 text-slate-600 lg:text-right">
                Websites, content, automation, and dashboards built around your business workflow.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function App() {
  const [contactForm, setContactForm] = useState(contactFormInitialState);
  const [contactStatus, setContactStatus] = useState({ type: 'idle', message: '' });
  const isContactSubmitting = contactStatus.type === 'loading';

  const updateContactField = (event) => {
    const { name, value } = event.target;
    setContactForm((current) => ({ ...current, [name]: value }));
    if (contactStatus.type === 'error') {
      setContactStatus({ type: 'idle', message: '' });
    }
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    const trimmedForm = Object.fromEntries(
      Object.entries(contactForm).map(([key, value]) => [key, value.trim()])
    );
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedForm.email);
    const phoneDigits = trimmedForm.phone.replace(/\D/g, '');

    if (!trimmedForm.name || !trimmedForm.phone || !trimmedForm.email) {
      setContactStatus({
        type: 'error',
        message: 'Please enter your name, phone number, and email before submitting.',
      });
      return;
    }

    if (!emailIsValid) {
      setContactStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    if (phoneDigits.length < 7) {
      setContactStatus({
        type: 'error',
        message: 'Please enter a valid phone number.',
      });
      return;
    }

    try {
      setContactStatus({ type: 'loading', message: 'Sending your project details...' });

      const formData = new FormData();
      formData.append('name', trimmedForm.name);
      formData.append('phone', trimmedForm.phone);
      formData.append('email', trimmedForm.email);
      formData.append('businessName', trimmedForm.businessName);
      formData.append('serviceRequired', trimmedForm.serviceRequired);
      formData.append('message', trimmedForm.message);
      formData.append('source', 'Take2 Media Website');
      formData.append('userAgent', navigator.userAgent);

      await fetch(contactFormEndpoint, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });

      setContactForm(contactFormInitialState);
      setContactStatus({
        type: 'success',
        message: 'Thank you! Your enquiry has been submitted successfully. We will contact you soon.',
      });
    } catch {
      setContactStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or contact us directly.',
      });
    }
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (reduceMotion || coarsePointer) {
      document.documentElement.style.setProperty('--scroll-depth', '0px');
      return undefined;
    }

    let ticking = false;
    const updateDepth = () => {
      document.documentElement.style.setProperty('--scroll-depth', `${Math.max(window.scrollY * -0.02, -90)}px`);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateDepth);
        ticking = true;
      }
    };

    updateDepth();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden font-sans">
      <AmbientVisuals />
      <div className="noise" />
      <Navbar />
      <BackToTopButton />
      <Hero />
      <TrustedLogoStrip />

      <Section
        id="about"
        eyebrow="About"
        title="Creative media, websites, automation, and growth support for serious local brands."
        copy="Take2 Media is a creative and technology-driven digital agency helping businesses build a stronger online presence through websites, social media, video content, branding, and smart digital systems. We work with restaurants, hospitals, local businesses, cafes, service brands, and growing businesses."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ['01', 'Presence that feels premium', 'We design your website, content, and creative assets so your brand looks trustworthy from the first interaction.'],
            ['02', 'Media that supports sales', 'Videos, posters, scripts, and social content are built around business goals, not just visual noise.'],
            ['03', 'Systems that save time', 'Automation and AI/agent-tech support help capture leads, organize follow-up, and improve everyday digital workflows.'],
          ].map(([num, title, copy], index) => (
            <Reveal as="article" key={title} delay={index * 80} className="glass rounded-[1.75rem] p-6">
              <span className="text-sm font-black text-cyan">{num}</span>
              <h3 className="mt-5 font-display text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{copy}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <ServicesSection />

      <SocialVideoProductionSection />

      <DashboardSection />

      <Section id="work" eyebrow="Our Work" title="Real client work by Take2 Media" copy="A premium view of our website, media, restaurant, hospital, food-brand, and dashboard work using verified project details from our portfolio records.">
        <div className="relative">
          <div className="absolute -left-16 top-20 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
          <div className="absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-ember/10 blur-3xl" />
          <div className="relative grid gap-5 lg:grid-cols-3">
            {portfolioWorks.map((work, index) => (
              <WorkCard key={work.name} work={work} index={index} />
            ))}
          </div>
        </div>
        <Reveal className="mt-6 rounded-[1.5rem] border border-cyan/20 bg-cyan/10 p-5 text-sm font-semibold leading-7 text-cyan-50">
          More projects are actively in progress as Take2 Media continues working with local businesses and growing brands.
        </Reveal>
      </Section>

      <TrustSection />
      <BuildForYouSection />

      <Section id="why-us" eyebrow="Why Choose Take2 Media" title="Creative quality with practical business value under one roof.">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="mesh rounded-[2rem] border border-white/10 p-8">
            <BrainCircuit className="text-cyan" size={42} />
            <h3 className="mt-8 font-display text-3xl font-bold">One team for creative, technical, and growth execution.</h3>
            <p className="mt-5 leading-8 text-slate-300">
              Take2 Media connects visual quality, website development, content production, automation, and AI-powered systems so your digital presence feels complete and client-ready.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyChoose.map((item, index) => (
              <Reveal key={item} delay={index * 60} className="glass flex items-center gap-4 rounded-2xl p-5">
                <BadgeCheck className="shrink-0 text-ember" size={22} />
                <span className="font-semibold text-slate-100">{item}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <ProcessSection />

      <Section id="industries" eyebrow="Industries" title="Built for businesses where presentation, trust, and consistency matter.">
        <div className="overflow-hidden rounded-full border border-white/10 bg-white/5 py-4">
          <div className="marquee-track flex w-max gap-3 px-3">
            {[...industries, ...industries].map((industry, index) => (
              <span key={`${industry}-${index}`} className="rounded-full border border-white/10 bg-night/70 px-5 py-3 text-sm font-bold text-slate-100">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <FinalCTASection />

      <Section
        id="contact"
        eyebrow="Contact Take2 Media"
        title="Ready to build your brand online or create a smarter business system?"
        copy="Share your business details and the service you need. Take2 Media can help with websites, social media handling, video production, branding, automation, agentic AI, and personalized dashboards."
      >
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="glass rounded-[2rem] p-7">
            <MessageCircle className="text-cyan" size={30} />
            <h3 className="mt-7 font-display text-2xl font-bold">Start with a clear brief.</h3>
            <p className="mt-4 leading-8 text-slate-300">
              Websites, social media, video content, branding, automation, and dashboard systems can be scoped together or as focused sprints.
            </p>
            <div className="mt-8 space-y-4">
              {contactDetails.map(({ label, value, icon: Icon, href }) => {
                const ContentTag = href ? 'a' : 'div';

                return (
                <ContentTag key={label} href={href} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan/35 hover:bg-white/8">
                  <Icon size={18} className="text-ember" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
                    <p className="mt-1 font-semibold text-slate-100">{value}</p>
                  </div>
                </ContentTag>
                );
              })}
            </div>
          </Reveal>
          <Reveal as="form" className="glass grid gap-4 rounded-[2rem] p-5 sm:grid-cols-2" onSubmit={handleContactSubmit}>
            <input
              className="rounded-2xl border border-white/10 bg-white/7 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan/60"
              name="name"
              onChange={updateContactField}
              placeholder="Name"
              value={contactForm.name}
            />
            <input
              className="rounded-2xl border border-white/10 bg-white/7 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan/60"
              name="phone"
              onChange={updateContactField}
              placeholder="Phone Number"
              type="tel"
              value={contactForm.phone}
            />
            <input
              className="rounded-2xl border border-white/10 bg-white/7 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan/60"
              name="email"
              onChange={updateContactField}
              placeholder="Email"
              type="email"
              value={contactForm.email}
            />
            <input
              className="rounded-2xl border border-white/10 bg-white/7 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan/60"
              name="businessName"
              onChange={updateContactField}
              placeholder="Business Name"
              value={contactForm.businessName}
            />
            <select
              className="rounded-2xl border border-white/10 bg-night px-4 py-4 text-sm text-white outline-none transition focus:border-cyan/60 sm:col-span-2"
              name="serviceRequired"
              onChange={updateContactField}
              value={contactForm.serviceRequired}
            >
              <option value="" disabled>Service Required</option>
              {contactServiceOptions.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            <textarea
              className="min-h-36 rounded-2xl border border-white/10 bg-white/7 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan/60 sm:col-span-2"
              name="message"
              onChange={updateContactField}
              placeholder="Message"
              value={contactForm.message}
            />
            {contactStatus.message && (
              <p
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold sm:col-span-2 ${
                  contactStatus.type === 'success'
                    ? 'border-cyan/25 bg-cyan/10 text-cyan-100'
                    : contactStatus.type === 'error'
                      ? 'border-ember/30 bg-ember/10 text-orange-100'
                      : 'border-white/10 bg-white/7 text-slate-200'
                }`}
                role="status"
                aria-live="polite"
              >
                {contactStatus.message}
              </p>
            )}
            <button
              className="button-shine inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan via-electric to-violet px-7 py-4 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
              type="submit"
              disabled={isContactSubmitting}
              aria-busy={isContactSubmitting}
            >
              {isContactSubmitting ? 'Sending...' : 'Start Your Project'} <Rocket size={18} />
            </button>
          </Reveal>
        </div>
      </Section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 text-sm text-slate-400 lg:grid-cols-[1.1fr_0.8fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-white">
              <span className="premium-logo-frame premium-logo-frame-footer rounded-2xl">
                <img src={assets.take2Logo} alt="Take2 Media logo" className="premium-logo-image" loading="lazy" />
              </span>
              <span className="font-display text-xl font-bold">Take2 Media</span>
            </div>
            <p className="mt-4 max-w-sm leading-7">Premium websites, social media, creative content, branding, automation, agentic AI workflows, and personalized dashboards for growing businesses.</p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-white">Navigation</h3>
            <div className="mt-4 grid gap-3">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="hover:text-white">{item.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-white">Services</h3>
            <div className="mt-4 grid gap-3">
              {footerServices.map((service) => (
                <a key={service} href="#services" className="hover:text-white">{service}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-white">Contact</h3>
            <div className="mt-4 grid gap-3">
              <a href="tel:+919894678789" className="hover:text-white">+91 98946 78789</a>
              <a href="mailto:take2mediia@gmail.com" className="hover:text-white">take2mediia@gmail.com</a>
              <span>Chennai, Tamil Nadu</span>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 Take2 Media. All rights reserved.</p>
          <a href="#top" className="font-bold text-slate-300">Back to top</a>
        </div>
      </footer>
    </main>
  );
}

export default App;
