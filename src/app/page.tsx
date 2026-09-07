"use client";

import React, { useState, useRef, useMemo } from "react";
import showsData from "../../data/shows.json";

interface SetlistItem {
  number: string;
  title: string;
  tag: string;
}

interface PhotoItem {
  url: string;
  caption: string;
}

interface VideoItem {
  title: string;
  duration: string;
  thumbnail: string;
}

interface NewsItem {
  title: string;
  source: string;
  snippet: string;
}

interface Show {
  id: string;
  year: string;
  title: string;
  headline: string;
  subheadline: string;
  tour: string;
  date: string;
  formattedDate: string;
  city: string;
  state: string;
  country: string;
  venue: string;
  bands: string[];
  isFestival: boolean;
  festivalName: string | null;
  isMilestone: boolean;
  isFeatured?: boolean;
  milestoneTag: string;
  genre: string;
  badge: string;
  secondaryBadge: string;
  tertiaryBadge: string;
  coverImage: string;
  summary: string;
  storyTitle: string;
  story: string;
  quote: string;
  decibels: string;
  moshDuration: string;
  companions: string;
  temperature: string;
  verdict: string;
  setlist: SetlistItem[];
  photos: PhotoItem[];
  videos: VideoItem[];
  newsLinks: NewsItem[];
  setlistUrl?: string;
  googlePhotosUrl?: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("TODOS");
  const [activeDecade, setActiveDecade] = useState<string>("TODOS");
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [modalTab, setModalTab] = useState<"story" | "setlist" | "gallery" | "news">("story");
  const [copiedNotification, setCopiedNotification] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);

  const shows = showsData as Show[];

  // Filter shows based on search query, genre, and decade
  const filteredShows = useMemo(() => {
    return shows.filter((show) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        show.title.toLowerCase().includes(q) ||
        show.headline.toLowerCase().includes(q) ||
        show.city.toLowerCase().includes(q) ||
        show.venue.toLowerCase().includes(q) ||
        show.year.includes(q) ||
        show.bands.some((b) => b.toLowerCase().includes(q)) ||
        show.genre.toLowerCase().includes(q);

      const matchesGenre =
        selectedGenre === "TODOS" ||
        show.genre.toLowerCase().includes(selectedGenre.toLowerCase()) ||
        (selectedGenre === "Festivais" && show.isFestival);

      const matchesDecade =
        activeDecade === "TODOS" ||
        (activeDecade === "1994" && parseInt(show.year) < 2000) ||
        (activeDecade === "2000s" && parseInt(show.year) >= 2000 && parseInt(show.year) < 2010) ||
        (activeDecade === "2010s" && parseInt(show.year) >= 2010 && parseInt(show.year) < 2020) ||
        (activeDecade === "2019" && show.year === "2019") ||
        (activeDecade === "2020s" && parseInt(show.year) >= 2020);

      return matchesSearch && matchesGenre && matchesDecade;
    });
  }, [shows, searchQuery, selectedGenre, activeDecade]);

  const scrollTimeline = (offset: number) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
    if (rulerRef.current) {
      rulerRef.current.scrollBy({ left: offset / 2, behavior: "smooth" });
    }
  };

  const scrollToCard = (id: string) => {
    const card = document.getElementById(id);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      card.classList.add("ring-2", "ring-blood-fire");
      setTimeout(() => {
        card.classList.remove("ring-2", "ring-blood-fire");
      }, 2000);
    }
  };

  const openShowModal = (show: Show) => {
    setSelectedShow(show);
    setModalTab("story");
  };

  const handleShare = () => {
    if (navigator.clipboard && selectedShow) {
      navigator.clipboard.writeText(
        `Confira a memória de ${selectedShow.headline} (${selectedShow.year}) no Live Vault: https://live.caesarcesar.com.br`
      );
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-chivo antialiased selection:bg-primary-container selection:text-white relative">
      {/* TOP BRUTALIST METALLIC HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0708]/95 backdrop-blur-xl border-b border-primary-container/40 shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
        <div className="h-20 w-full max-w-[1500px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
          {/* Brand & Metal Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <img
              alt="Horned Skull Metal Emblem"
              className="h-14 w-14 object-contain filter drop-shadow-[0_0_12px_rgba(181,10,24,0.8)] hover:scale-105 transition-transform cursor-pointer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB43fUt0m75QrVeOoQL0mA8Bh_S1TyM-816u69Iw3CTF03QgzAwXN_GzKsHeenDaLxpHzg6E6TgoEjrOIGEwRDf2Rt_S65wx4bZspZfxP8GA-n_oA3qK-4Mh9z4jsXzIbIlWONTgcv4AEazzL5thJq7BTOq3veQrI7-kNsjIXYHu-eMTjNgpzOMScC-PWgqW-0A--aGV1PEkr6rRTpgMXqHSvxbhR_huMF56otJaP4yEk4dYslpvho"
            />
            <div className="flex flex-col">
              <span className="font-anton text-2xl md:text-3xl tracking-wider text-[#ffcfcb] uppercase leading-none flex items-center gap-2">
                LIVE
                <span className="text-xs px-2 py-0.5 rounded bg-primary-container text-white font-mono tracking-widest font-bold uppercase border border-blood-fire">
                  Vault 1994-2026
                </span>
              </span>
              <span className="font-mono text-[10px] text-tertiary tracking-[0.25em] uppercase mt-0.5">
                live.caesarcesar.com.br
              </span>
            </div>
          </div>

          {/* Quick Search Bar & Metal Filter Chips */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-auto flex-col gap-1.5">
            <div className="relative flex items-center w-full">
              <span className="material-symbols-outlined absolute left-3 text-primary text-[20px] pointer-events-none">
                search
              </span>
              <input
                className="w-full bg-[#170f10] text-on-surface font-mono text-xs pl-10 pr-10 py-2 rounded-lg border border-outline-variant/60 outline-none focus:border-blood-fire focus:ring-1 focus:ring-blood-fire placeholder:text-outline/70 transition-all shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)]"
                placeholder="Buscar por banda, festival, cidade ou ano (ex: Slayer, Sepultura, 1994)..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="material-symbols-outlined absolute right-3 text-outline text-[18px] cursor-pointer hover:text-primary transition-colors"
                >
                  close
                </button>
              ) : (
                <span className="material-symbols-outlined absolute right-3 text-outline text-[18px]">
                  tune
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 custom-scroll">
              <span className="text-outline text-[10px] font-mono uppercase tracking-wider shrink-0">
                Gênero:
              </span>
              {["TODOS", "Thrash Metal", "Heavy Clássico", "Festivais"].map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono uppercase transition-all shrink-0 ${
                    selectedGenre === genre
                      ? "bg-primary-container text-white border border-blood-fire shadow-sm font-bold"
                      : "bg-[#1f1718] text-on-surface-variant hover:text-white border border-outline-variant/40"
                  }`}
                  type="button"
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Counters */}
          <div className="hidden 2xl:flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 bg-[#170f10] border border-primary-container/40 px-3 py-1.5 rounded-lg shadow-md">
              <span className="material-symbols-outlined text-primary text-[18px]">
                confirmation_number
              </span>
              <span className="font-anton text-lg text-white">48</span>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase">Shows</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#170f10] border border-primary-container/40 px-3 py-1.5 rounded-lg shadow-md">
              <span className="material-symbols-outlined text-secondary text-[18px]">groups</span>
              <span className="font-anton text-lg text-white">32</span>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase">Bandas</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#170f10] border border-primary-container/40 px-3 py-1.5 rounded-lg shadow-md">
              <span className="material-symbols-outlined text-tertiary text-[18px]">location_city</span>
              <span className="font-anton text-lg text-white">6</span>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase">Cidades</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#170f10] border border-primary-container/40 px-3 py-1.5 rounded-lg shadow-md">
              <span className="material-symbols-outlined text-blood-fire text-[18px]">stadium</span>
              <span className="font-anton text-lg text-white">12</span>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase">Festivais</span>
            </div>
          </div>

          {/* User & Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-white font-anton text-sm tracking-wider uppercase hover:bg-blood-fire transition-all border border-blood-fire/80 shadow-[0_0_15px_rgba(181,10,24,0.4)]"
              onClick={() => openShowModal(shows[2] || shows[0])}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
              <span>Destaque Slayer</span>
            </button>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary-container to-secondary border border-blood-fire flex items-center justify-center cursor-pointer shadow-[0_0_12px_rgba(230,28,36,0.6)]">
              <span className="material-symbols-outlined text-white text-[20px]">skull</span>
            </div>
          </div>
        </div>

        {/* Secondary Navigation Bar */}
        <div className="w-full bg-[#070405] border-t border-primary-container/20">
          <div className="max-w-[1500px] mx-auto px-4 md:px-8 flex items-center justify-between">
            <nav className="flex items-center gap-1 py-1.5 overflow-x-auto text-xs font-mono uppercase tracking-wider custom-scroll">
              <span className="px-3 py-1 bg-primary-container/80 text-white font-bold rounded border border-blood-fire flex items-center gap-1.5 shrink-0">
                <span className="material-symbols-outlined text-[15px]">timeline</span>
                <span>Linha do Tempo (1994 - 2026)</span>
              </span>
              <span className="px-3 py-1 text-on-surface-variant hover:text-white rounded transition-all shrink-0 cursor-default">
                Bandas &amp; Artistas
              </span>
              <span className="px-3 py-1 text-on-surface-variant hover:text-white rounded transition-all shrink-0 cursor-default">
                Monsters &amp; Festivais
              </span>
              <span className="px-3 py-1 text-on-surface-variant hover:text-white rounded transition-all shrink-0 cursor-default">
                Mapa de Arenas
              </span>
              <span className="px-3 py-1 text-on-surface-variant hover:text-white rounded transition-all shrink-0 cursor-default">
                Estatísticas Brutais
              </span>
            </nav>
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-tertiary shrink-0">
              <span className="w-2 h-2 rounded-full bg-blood-fire animate-ping"></span>
              <span>REIGN IN LIVE SOUND: 118 dB MAX</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="w-full pb-24 bg-background pentagram-bg pt-32">
        {/* Hero / Headline Vault Header & Stat Panels */}
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 mb-8 pt-8">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-6 border-b border-primary-container/30 pt-2">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded bg-blood-dark/80 text-primary border border-primary-container/80 font-mono text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_10px_rgba(181,10,24,0.4)]">
                  <span className="material-symbols-outlined text-[14px] text-blood-fire">
                    local_fire_department
                  </span>
                  Hell Awaits • 32 Anos de Carnificina Sonora
                </span>
                <span className="font-mono text-xs text-outline">|</span>
                <span className="font-mono text-xs text-secondary font-semibold">1994 — 2026</span>
              </div>
              <h1 className="font-anton text-4xl md:text-6xl text-white tracking-wider uppercase text-blood-shadow leading-none">
                CAESAR C. CESAR
              </h1>
              <p className="font-chivo text-on-surface-variant text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
                Décadas de história a poucos metros dos amplificadores. Diário visual, interativo e
                cronológico de grandes shows e festivais.
              </p>
            </div>

            {/* High-Impact Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 xl:w-auto w-full">
              <div className="bg-[#140e0f]/90 border border-primary-container/50 rounded-lg p-3 shadow-[0_4px_16px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-blood-fire transition-all">
                <div className="absolute -right-3 -bottom-3 text-primary-container/10 group-hover:text-primary-container/20 transition-all font-anton text-6xl select-none">
                  48
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-outline block">
                  Total Assistido
                </span>
                <span className="font-anton text-3xl text-white text-blood-shadow">48</span>
                <span className="font-mono text-[11px] text-primary block mt-0.5">Shows Brutais</span>
              </div>

              <div className="bg-[#140e0f]/90 border border-primary-container/50 rounded-lg p-3 shadow-[0_4px_16px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-blood-fire transition-all">
                <div className="absolute -right-3 -bottom-3 text-primary-container/10 group-hover:text-primary-container/20 transition-all font-anton text-6xl select-none">
                  32
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-outline block">
                  Linha Temporal
                </span>
                <span className="font-anton text-3xl text-secondary">
                  32 <span className="text-sm font-sans font-normal text-secondary/80">anos</span>
                </span>
                <span className="font-mono text-[11px] text-secondary block mt-0.5">1994 — 2026</span>
              </div>

              <div className="bg-[#140e0f]/90 border border-primary-container/50 rounded-lg p-3 shadow-[0_4px_16px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-blood-fire transition-all">
                <div className="absolute -right-3 -bottom-3 text-primary-container/10 group-hover:text-primary-container/20 transition-all font-anton text-6xl select-none">
                  32
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-outline block">
                  Formações
                </span>
                <span className="font-anton text-3xl text-tertiary">32</span>
                <span className="font-mono text-[11px] text-tertiary block mt-0.5">
                  Bandas no Palco
                </span>
              </div>

              <div className="bg-[#140e0f]/90 border border-primary-container/50 rounded-lg p-3 shadow-[0_4px_16px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-blood-fire transition-all">
                <div className="absolute -right-3 -bottom-3 text-primary-container/10 group-hover:text-primary-container/20 transition-all font-anton text-6xl select-none">
                  12
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-outline block">
                  Arenas &amp; Mosh
                </span>
                <span className="font-anton text-3xl text-blood-fire">12</span>
                <span className="font-mono text-[11px] text-blood-fire block mt-0.5">
                  Grandes Festivais
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PRIMARY FEATURE: HORIZONTAL TIMELINE CONTROLS & RULER (1994 - 2026) */}
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 mb-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#140e0f]/95 border border-primary-container/60 p-4 rounded-xl shadow-2xl relative">
            {/* Navigation Decades Jump Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs uppercase text-primary tracking-wider font-bold flex items-center gap-1 mr-1">
                <span className="material-symbols-outlined text-[16px] text-blood-fire">
                  fast_forward
                </span>
                Salto de Época:
              </span>
              {[
                { label: "Todos os Anos", key: "TODOS" },
                { label: "1994 (Primeiro Show)", key: "1994", cardId: "card-1994-08-27-monsters-of-rock" },
                { label: "Anos 2000", key: "2000s" },
                { label: "Década de 2010", key: "2010s", cardId: "card-2011-09-25-rock-in-rio-metal" },
                { label: "2019 Despedida", key: "2019", cardId: "card-2019-10-02-slayer-farewell" },
                { label: "2024 - 2026", key: "2020s", cardId: "card-2024-12-06-iron-maiden-sepultura" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveDecade(item.key);
                    if (item.cardId) scrollToCard(item.cardId);
                  }}
                  className={`px-3 py-1 rounded font-mono text-xs font-bold uppercase transition-all ${
                    activeDecade === item.key
                      ? "bg-primary-container text-white border border-blood-fire shadow-sm"
                      : "bg-[#201517] text-on-surface-variant hover:text-white hover:bg-primary-container border border-outline-variant/50"
                  }`}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Horizontal Scroll Left/Right Arrow Triggers */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <span className="font-mono text-[11px] text-outline uppercase tracking-wider hidden sm:inline">
                Navegar Régua:
              </span>
              <button
                className="p-2 rounded-lg bg-[#1f1718] border border-outline-variant hover:border-blood-fire text-on-surface hover:text-white transition-all shadow-md active:scale-95"
                onClick={() => scrollTimeline(-450)}
                title="Voltar Anos"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                className="p-2 rounded-lg bg-[#1f1718] border border-outline-variant hover:border-blood-fire text-on-surface hover:text-white transition-all shadow-md active:scale-95"
                onClick={() => scrollTimeline(450)}
                title="Avançar Anos"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
              <button
                className="px-3 py-2 rounded-lg bg-primary-container hover:bg-blood-fire text-white font-mono text-xs uppercase font-bold flex items-center gap-1.5 transition-all border border-blood-fire"
                onClick={() => openShowModal(shows[2] || shows[0])}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>Ver Ficha Aberta</span>
              </button>
            </div>
          </div>
        </div>

        {/* HORIZONTAL SCRUBBER RULER BAR (1994 - 2026) */}
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 mb-6">
          <div
            className="relative w-full bg-[#110b0c] border border-primary-container/40 rounded-xl p-4 overflow-x-auto custom-scroll"
            ref={rulerRef}
          >
            <div className="relative min-w-[1240px] py-2">
              <div className="absolute top-1/2 left-4 right-4 h-1 -translate-y-1/2 bg-gradient-to-r from-blood-dark via-primary-container to-blood-fire rounded-full shadow-[0_0_12px_rgba(230,28,36,0.6)]"></div>

              {/* Chronological Year Milestones */}
              <div className="relative flex items-center justify-between gap-8 z-10">
                {/* 1994 Milestone */}
                <button
                  className="flex flex-col items-center group focus:outline-none"
                  onClick={() => scrollToCard("card-1994-08-27-monsters-of-rock")}
                  type="button"
                >
                  <span className="font-anton text-sm text-primary group-hover:text-blood-fire transition-colors">
                    1994
                  </span>
                  <div className="w-6 h-6 rounded-full bg-blood-dark border-2 border-blood-fire flex items-center justify-center my-1 shadow-[0_0_10px_rgba(230,28,36,0.6)]">
                    <span className="material-symbols-outlined text-[13px] text-white">flag</span>
                  </div>
                  <span className="font-mono text-[10px] text-primary uppercase font-bold">
                    Primeiro Show
                  </span>
                </button>

                {/* 1998 Milestone */}
                <div className="flex flex-col items-center group">
                  <span className="font-anton text-xs text-outline">1998</span>
                  <div className="w-4 h-4 rounded-full bg-[#1c1214] border border-outline flex items-center justify-center my-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-outline"></div>
                  </div>
                  <span className="font-mono text-[10px] text-outline-variant uppercase">
                    South of Heaven
                  </span>
                </div>

                {/* 2004 Milestone */}
                <div className="flex flex-col items-center group">
                  <span className="font-anton text-xs text-outline">2004</span>
                  <div className="w-4 h-4 rounded-full bg-[#1c1214] border border-outline flex items-center justify-center my-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-outline"></div>
                  </div>
                  <span className="font-mono text-[10px] text-outline-variant uppercase">
                    Chimera Tour
                  </span>
                </div>

                {/* 2011 Milestone */}
                <button
                  className="flex flex-col items-center group focus:outline-none"
                  onClick={() => scrollToCard("card-2011-09-25-rock-in-rio-metal")}
                  type="button"
                >
                  <span className="font-anton text-sm text-tertiary group-hover:text-white transition-colors">
                    2011
                  </span>
                  <div className="w-6 h-6 rounded-full bg-blood-dark border-2 border-tertiary flex items-center justify-center my-1 shadow-[0_0_10px_rgba(247,185,142,0.6)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
                  </div>
                  <span className="font-mono text-[10px] text-tertiary uppercase font-bold">
                    Metallica + Slayer
                  </span>
                </button>

                {/* 2013 Milestone */}
                <div className="flex flex-col items-center group">
                  <span className="font-anton text-xs text-outline">2013</span>
                  <div className="w-4 h-4 rounded-full bg-[#1c1214] border border-outline flex items-center justify-center my-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-outline"></div>
                  </div>
                  <span className="font-mono text-[10px] text-outline-variant uppercase">
                    Maiden + Slayer
                  </span>
                </div>

                {/* 2019 Milestone - FEATURED */}
                <button
                  className="flex flex-col items-center group focus:outline-none"
                  onClick={() => scrollToCard("card-2019-10-02-slayer-farewell")}
                  type="button"
                >
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blood-fire animate-ping"></span>
                    <span className="font-anton text-base text-blood-fire font-bold">2019</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-container border-2 border-white flex items-center justify-center my-1 shadow-[0_0_20px_rgba(230,28,36,0.9)] animate-pulse">
                    <span className="material-symbols-outlined text-[16px] text-white">
                      local_fire_department
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-white bg-blood-dark px-2 py-0.5 rounded border border-blood-fire uppercase font-bold">
                    Slayer Farewell
                  </span>
                </button>

                {/* 2024 Milestone */}
                <button
                  className="flex flex-col items-center group focus:outline-none"
                  onClick={() => scrollToCard("card-2024-12-06-iron-maiden-sepultura")}
                  type="button"
                >
                  <span className="font-anton text-sm text-secondary group-hover:text-white transition-colors">
                    2024
                  </span>
                  <div className="w-6 h-6 rounded-full bg-blood-dark border-2 border-secondary flex items-center justify-center my-1 shadow-[0_0_10px_rgba(255,183,122,0.6)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                  </div>
                  <span className="font-mono text-[10px] text-secondary uppercase font-bold">
                    Allianz Parque
                  </span>
                </button>

                {/* 2026 Milestone */}
                <button
                  className="flex flex-col items-center group focus:outline-none"
                  onClick={() => scrollToCard("card-2026-04-18-metal-fest")}
                  type="button"
                >
                  <span className="font-anton text-sm text-primary group-hover:text-white transition-colors">
                    2026
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#1e1315] border-2 border-dashed border-blood-fire flex items-center justify-center my-1 shadow-[0_0_12px_rgba(181,10,24,0.5)]">
                    <span className="material-symbols-outlined text-[14px] text-blood-fire">
                      event_upcoming
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-primary uppercase font-bold">
                    Metal Fest 2026
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* HORIZONTAL TRACK OF CONCERT CARDS */}
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blood-fire text-[22px]">
                view_carousel
              </span>
              <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
                Trilha Cronológica de Shows
              </h2>
              <span className="font-mono text-xs text-outline hidden sm:inline">
                (Arraste ou clique nas setas para navegar)
              </span>
            </div>
            <span className="font-mono text-xs text-tertiary">
              {filteredShows.length} Shows no Vault
            </span>
          </div>

          {/* Cards Flex Track */}
          <div
            className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 custom-scroll scroll-smooth"
            ref={trackRef}
            id="concert-track"
          >
            {filteredShows.map((show) => {
              const isFeatured = show.isFeatured;
              return (
                <div
                  key={show.id}
                  id={`card-${show.id}`}
                  className={`${
                    isFeatured
                      ? "min-w-[360px] md:min-w-[420px] max-w-[420px] bg-[#180e10] border-2 border-blood-fire shadow-[0_0_35px_rgba(230,28,36,0.35)]"
                      : "min-w-[340px] md:min-w-[390px] max-w-[390px] bg-[#140e10] border border-primary-container/40 shadow-2xl hover:border-blood-fire"
                  } rounded-xl overflow-hidden flex flex-col justify-between group transition-all shrink-0 relative`}
                >
                  {isFeatured && (
                    <div className="absolute top-0 right-0 bg-blood-fire text-white font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg z-20 shadow-md flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">star</span>
                      Show em Destaque
                    </div>
                  )}

                  <div>
                    {/* Banner Image with dark distressed tint */}
                    <div className={`relative ${isFeatured ? "h-52" : "h-48"} w-full overflow-hidden bg-black`}>
                      <img
                        alt={show.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-125"
                        src={show.coverImage}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#140e10] via-transparent to-black/60"></div>
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span
                          className={`px-2.5 py-0.5 rounded font-mono text-[11px] font-extrabold uppercase ${
                            isFeatured
                              ? "bg-black/80 backdrop-blur-md border border-blood-fire text-white"
                              : "bg-blood-fire text-white shadow-[0_0_10px_rgba(230,28,36,0.6)]"
                          }`}
                        >
                          {show.formattedDate}
                        </span>
                        {show.milestoneTag && (
                          <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-blood-fire text-secondary font-mono text-[10px] uppercase font-bold">
                            {show.milestoneTag}
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                        <span className="font-mono text-[11px] text-secondary tracking-wider uppercase font-bold">
                          {show.title}
                        </span>
                        <span className="font-mono text-[10px] text-outline">
                          {show.venue}, {show.state}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 flex flex-col gap-2.5">
                      <div>
                        <span className="font-mono text-[11px] text-blood-fire uppercase tracking-wider block font-bold">
                          {show.tour}
                        </span>
                        <h3
                          className={`font-anton ${
                            isFeatured ? "text-3xl text-blood-shadow" : "text-2xl"
                          } text-white tracking-wide uppercase mt-0.5 flex items-center justify-between`}
                        >
                          <span>{show.headline}</span>
                          <span className="text-xs font-mono font-normal text-secondary">
                            {show.subheadline}
                          </span>
                        </h3>
                      </div>
                      <p className="font-chivo text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                        {show.summary}
                      </p>

                      {/* Fast Info Badges */}
                      <div className="flex items-center gap-2 flex-wrap pt-1 text-[11px] font-mono">
                        {show.badge && (
                          <span className="px-2 py-0.5 rounded bg-primary-container text-white border border-blood-fire font-bold">
                            {show.badge}
                          </span>
                        )}
                        {show.secondaryBadge && (
                          <span className="px-2 py-0.5 rounded bg-[#1e1315] text-secondary border border-secondary/30">
                            {show.secondaryBadge}
                          </span>
                        )}
                        {show.tertiaryBadge && (
                          <span className="px-2 py-0.5 rounded bg-[#1e1315] text-on-surface-variant">
                            {show.tertiaryBadge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div
                    className={`p-4 pt-2 border-t ${
                      isFeatured
                        ? "border-primary-container/30 bg-[#10090a]"
                        : "border-primary-container/20"
                    } flex items-center justify-between gap-2`}
                  >
                    <button
                      className="flex-1 py-1.5 px-2 rounded bg-[#1c1315] hover:bg-[#281b1e] text-on-surface hover:text-white font-mono text-[11px] uppercase flex items-center justify-center gap-1 border border-outline-variant/40 transition-colors"
                      onClick={() => {
                        setSelectedShow(show);
                        setModalTab("setlist");
                      }}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px] text-secondary">
                        queue_music
                      </span>
                      <span>Setlist</span>
                    </button>
                    <button
                      className="flex-1 py-1.5 px-2 rounded bg-[#1c1315] hover:bg-[#281b1e] text-on-surface hover:text-white font-mono text-[11px] uppercase flex items-center justify-center gap-1 border border-outline-variant/40 transition-colors"
                      onClick={() => {
                        setSelectedShow(show);
                        setModalTab("gallery");
                      }}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px] text-primary">
                        photo_camera
                      </span>
                      <span>Fotos</span>
                    </button>
                    <button
                      className="py-1.5 px-3 rounded bg-primary-container hover:bg-blood-fire text-white font-mono text-[11px] font-bold uppercase flex items-center justify-center gap-1 transition-all border border-blood-fire"
                      onClick={() => openShowModal(show)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px]">visibility</span>
                      <span>Abrir</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* EXPANDED CONCERT DETAIL MODAL */}
      {selectedShow && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl"
          id="show-modal"
        >
          {/* Backdrop close click */}
          <div className="absolute inset-0" onClick={() => setSelectedShow(null)}></div>

          {/* Modal Box Container */}
          <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#120b0d] border border-blood-fire/70 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.95),0_0_40px_rgba(181,10,24,0.5)] flex flex-col overflow-hidden z-10 metal-border">
            {/* Modal Header with Stage Panorama */}
            <div className="relative h-64 sm:h-72 w-full shrink-0 overflow-hidden bg-black">
              <img
                alt={selectedShow.headline}
                className="w-full h-full object-cover filter brightness-95 contrast-125"
                src={selectedShow.coverImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120b0d] via-[#120b0d]/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#120b0d]/90 via-transparent to-transparent"></div>

              {/* Top Bar Controls */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-blood-fire text-white font-mono text-xs uppercase font-extrabold tracking-wider shadow-lg border border-white/20">
                    Vault Archive
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-secondary font-mono text-xs border border-outline-variant/40">
                    {selectedShow.city} • {selectedShow.year}
                  </span>
                </div>
                <button
                  className="w-10 h-10 rounded-lg bg-black/80 hover:bg-blood-fire text-white flex items-center justify-center transition-all border border-outline-variant/60"
                  onClick={() => setSelectedShow(null)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
              </div>

              {/* Hero Show Title Inside Header */}
              <div className="absolute bottom-4 left-4 sm:left-6 right-4">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-mono text-blood-fire text-xs uppercase tracking-widest font-bold">
                    {selectedShow.tour}
                  </span>
                  <span className="text-outline">•</span>
                  <span className="font-mono text-secondary text-xs">
                    {selectedShow.subheadline || selectedShow.title}
                  </span>
                </div>
                <h2 className="font-anton text-3xl sm:text-5xl text-white uppercase tracking-wider text-blood-shadow leading-tight">
                  {selectedShow.headline}
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-on-surface-variant font-mono text-xs mt-2">
                  <div className="flex items-center gap-1.5 text-primary">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    <span>{selectedShow.formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-secondary">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    <span>
                      {selectedShow.venue}, {selectedShow.city} - {selectedShow.state}
                    </span>
                  </div>
                  {selectedShow.tertiaryBadge && (
                    <div className="flex items-center gap-1.5 text-tertiary">
                      <span className="material-symbols-outlined text-[16px]">
                        confirmation_number
                      </span>
                      <span>{selectedShow.tertiaryBadge}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabbed Navigation Ribbon */}
            <div className="w-full bg-[#0d0708] px-4 sm:px-6 shrink-0 overflow-x-auto flex items-center gap-2 border-b border-primary-container/30 custom-scroll">
              <button
                className={`px-3.5 py-2.5 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  modalTab === "story"
                    ? "text-blood-fire border-b-2 border-blood-fire font-bold"
                    : "text-on-surface-variant hover:text-white"
                }`}
                onClick={() => setModalTab("story")}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span>História &amp; Memórias Sombrias</span>
              </button>
              <button
                className={`px-3.5 py-2.5 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  modalTab === "setlist"
                    ? "text-blood-fire border-b-2 border-blood-fire font-bold"
                    : "text-on-surface-variant hover:text-white"
                }`}
                onClick={() => setModalTab("setlist")}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">queue_music</span>
                <span>Repertório Sangrento</span>
                <span className="ml-1 px-1.5 py-0.2 rounded bg-primary-container text-[10px] text-white font-mono font-bold">
                  {selectedShow.setlist.length}
                </span>
              </button>
              <button
                className={`px-3.5 py-2.5 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  modalTab === "gallery"
                    ? "text-blood-fire border-b-2 border-blood-fire font-bold"
                    : "text-on-surface-variant hover:text-white"
                }`}
                onClick={() => setModalTab("gallery")}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">perm_media</span>
                <span>Galeria Moshpit &amp; Vídeos</span>
              </button>
              <button
                className={`px-3.5 py-2.5 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  modalTab === "news"
                    ? "text-blood-fire border-b-2 border-blood-fire font-bold"
                    : "text-on-surface-variant hover:text-white"
                }`}
                onClick={() => setModalTab("news")}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">newspaper</span>
                <span>Críticas &amp; Ingressos</span>
              </button>
            </div>

            {/* Modal Body Content with Scroll */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#120b0d] custom-scroll">
              {/* TAB 1: HISTÓRIA & MEMÓRIAS SOMBRIAS */}
              {modalTab === "story" && (
                <div className="flex flex-col gap-4">
                  <div className="bg-[#1b1012] p-4 rounded-lg border border-primary-container/40 flex items-start gap-3 shadow-md">
                    <div className="w-10 h-10 rounded bg-blood-dark text-blood-fire shrink-0 flex items-center justify-center font-bold text-[20px] border border-blood-fire/50">
                      <span className="material-symbols-outlined">skull</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-anton text-xl text-white tracking-wide uppercase">
                        {selectedShow.storyTitle || selectedShow.headline}
                      </span>
                      <span className="font-mono text-xs text-outline">
                        Relato por Caesar • Diário Vault #{selectedShow.year}
                      </span>
                    </div>
                  </div>

                  <div className="text-on-surface-variant font-chivo text-sm md:text-base flex flex-col gap-3 leading-relaxed whitespace-pre-line">
                    <p>{selectedShow.story || selectedShow.summary}</p>

                    {selectedShow.quote && (
                      <div className="p-4 rounded-lg bg-[#1a0e10] border-l-4 border-blood-fire my-1 shadow-inner">
                        <p className="font-chivo italic text-white text-sm md:text-base mb-2">
                          &quot;{selectedShow.quote}&quot;
                        </p>
                        <div className="flex items-center gap-3 font-mono text-xs text-secondary flex-wrap">
                          {selectedShow.decibels && (
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px] text-blood-fire">
                                graphic_eq
                              </span>
                              Volume Medido: {selectedShow.decibels}
                            </span>
                          )}
                          {selectedShow.moshDuration && (
                            <>
                              <span>•</span>
                              <span>Moshpit: {selectedShow.moshDuration}</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Meta Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                    <div className="bg-[#170e10] p-3 rounded border border-primary-container/30">
                      <span className="text-outline uppercase block text-[10px]">
                        Companhias de Mosh
                      </span>
                      <span className="text-white font-bold text-xs mt-1 block">
                        {selectedShow.companions || "Amigos do Metal"}
                      </span>
                    </div>
                    <div className="bg-[#170e10] p-3 rounded border border-primary-container/30">
                      <span className="text-outline uppercase block text-[10px]">
                        Ambiente &amp; Clima
                      </span>
                      <span className="text-secondary font-bold text-xs mt-1 block">
                        {selectedShow.temperature || "Clima de Arena"}
                      </span>
                    </div>
                    <div className="bg-[#170e10] p-3 rounded border border-primary-container/30">
                      <span className="text-outline uppercase block text-[10px]">
                        Veredito Supremo
                      </span>
                      <span className="text-blood-fire font-bold text-xs mt-1 block">
                        {selectedShow.verdict || "10/10"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: REPERTÓRIO (SETLIST) */}
              {modalTab === "setlist" && (
                <div className="flex flex-col gap-3 font-mono">
                  <div className="flex items-center justify-between pb-2 border-b border-primary-container/30 text-xs">
                    <span className="text-white font-bold uppercase">
                      Setlist Oficial Completo ({selectedShow.city} {selectedShow.year})
                    </span>
                    <span className="text-blood-fire font-bold">
                      {selectedShow.setlist.length} Faixas de Fúria
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs">
                    {selectedShow.setlist.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded bg-[#180f11] hover:bg-primary-container/20 transition-all border border-outline-variant/20"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-blood-fire font-bold w-6">{item.number}</span>
                          <span className="text-white font-bold">{item.title}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-primary-container/50 text-white text-[10px] uppercase font-bold">
                          {item.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: GALERIA & VÍDEOS */}
              {modalTab === "gallery" && (
                <div className="flex flex-col gap-4">
                  {selectedShow.videos && selectedShow.videos.length > 0 && (
                    <div className="relative w-full rounded-xl overflow-hidden bg-black border border-primary-container/50 shadow-2xl">
                      <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                        <img
                          alt="Video cover"
                          className="w-full h-full object-cover filter brightness-90"
                          src={selectedShow.videos[0].thumbnail}
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-blood-fire text-white flex items-center justify-center shadow-[0_0_30px_rgba(230,28,36,0.8)] cursor-pointer hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[36px]">
                              play_arrow
                            </span>
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white font-mono">
                          <span className="text-xs font-bold drop-shadow">
                            {selectedShow.videos[0].title}
                          </span>
                          <span className="text-[11px] bg-black/80 px-2 py-0.5 rounded border border-blood-fire">
                            {selectedShow.videos[0].duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Photos Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 font-mono">
                    {selectedShow.photos &&
                      selectedShow.photos.map((photo, pIdx) => (
                        <div
                          key={pIdx}
                          className="relative h-32 rounded-lg overflow-hidden border border-primary-container/40 group cursor-pointer"
                        >
                          <img
                            alt={photo.caption}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            src={photo.url}
                          />
                          <div className="absolute bottom-1 left-2 text-[10px] text-white font-bold drop-shadow">
                            {photo.caption}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TAB 4: CRÍTICAS & NOTÍCIAS */}
              {modalTab === "news" && (
                <div className="flex flex-col gap-3 font-mono">
                  {selectedShow.newsLinks && selectedShow.newsLinks.length > 0 ? (
                    selectedShow.newsLinks.map((news, nIdx) => (
                      <div
                        key={nIdx}
                        className="p-3.5 rounded-lg bg-[#180f11] hover:bg-[#221517] border border-primary-container/40 transition-all flex flex-col gap-1"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-blood-fire uppercase font-bold">{news.source}</span>
                          <span className="material-symbols-outlined text-[15px] text-outline">
                            open_in_new
                          </span>
                        </div>
                        <h4 className="font-anton text-lg text-white tracking-wide uppercase mt-0.5">
                          {news.title}
                        </h4>
                        <p className="font-chivo text-xs text-on-surface-variant leading-relaxed">
                          &quot;{news.snippet}&quot;
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-outline text-xs">
                      Nenhuma matéria cadastrada para este show.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Action Footer */}
            <div className="w-full bg-[#0b0607] p-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-primary-container/30 shrink-0">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {selectedShow.googlePhotosUrl && (
                  <a
                    href={selectedShow.googlePhotosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-[#1a0f12] hover:bg-[#27161a] border border-outline-variant/40 text-white font-mono text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      photo_camera_back
                    </span>
                    <span>Google Fotos</span>
                  </a>
                )}
                {selectedShow.setlistUrl && (
                  <a
                    href={selectedShow.setlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-[#1a0f12] hover:bg-[#27161a] border border-outline-variant/40 text-white font-mono text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px] text-tertiary">
                      open_in_new
                    </span>
                    <span>Setlist.fm</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  className="w-full sm:w-auto px-5 py-2 rounded-lg bg-primary-container hover:bg-blood-fire text-white font-anton text-sm tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all border border-blood-fire shadow-[0_0_20px_rgba(230,28,36,0.6)]"
                  onClick={handleShare}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                  <span>{copiedNotification ? "Link Copiado!" : "Compartilhar Relato"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BRUTALIST METALLIC FOOTER */}
      <footer className="w-full bg-[#070405] border-t border-primary-container/40 py-8">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <img
              alt="Horned Skull Metal Emblem"
              className="h-10 w-10 object-contain filter drop-shadow-[0_0_8px_rgba(181,10,24,0.8)]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB43fUt0m75QrVeOoQL0mA8Bh_S1TyM-816u69Iw3CTF03QgzAwXN_GzKsHeenDaLxpHzg6E6TgoEjrOIGEwRDf2Rt_S65wx4bZspZfxP8GA-n_oA3qK-4Mh9z4jsXzIbIlWONTgcv4AEazzL5thJq7BTOq3veQrI7-kNsjIXYHu-eMTjNgpzOMScC-PWgqW-0A--aGV1PEkr6rRTpgMXqHSvxbhR_huMF56otJaP4yEk4dYslpvho"
            />
            <div className="flex flex-col text-left">
              <span className="font-anton text-xl text-white tracking-wider uppercase">LIVE</span>
              <span className="font-mono text-[10px] text-outline uppercase tracking-widest">
                por Caesar • live.caesarcesar.com.br (1994 - 2026)
              </span>
            </div>
          </div>
          <p className="font-mono text-xs text-outline max-w-xl">
            © 1994 — 2026 live.caesarcesar.com.br por Caesar. Dedicado aos moshpits, palhetas
            voadoras e lendas eternas do som pesado.
          </p>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded bg-blood-dark border border-blood-fire text-white font-mono text-[11px] uppercase tracking-widest font-bold shadow-md">
              STILL REIGNING
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
