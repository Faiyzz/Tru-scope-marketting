"use client";

import { useMemo, useState } from "react";
import { Scissors, Clapperboard, Globe2 } from "lucide-react";

/** Replace these with your own Vimeo IDs or local MP4s */
type ServiceKey = "content" | "editing" | "web";
type VideoCfg = { kind: "mp4"; src: string } | { kind: "vimeo"; id: string };

const DEFAULT_VIDEOS: Record<ServiceKey, VideoCfg> = {
  content: { kind: "vimeo", id: "1089303592" },
  editing: { kind: "vimeo", id: "1089303621" },
  web: { kind: "vimeo", id: "1089303686" },
};

type Props = {
  videos?: Partial<Record<ServiceKey, VideoCfg>>;
};

export default function ServicesVSLSection({ videos = {} }: Props) {
  const mergedVideos: Record<ServiceKey, VideoCfg> = {
    content: videos.content ?? DEFAULT_VIDEOS.content,
    editing: videos.editing ?? DEFAULT_VIDEOS.editing,
    web: videos.web ?? DEFAULT_VIDEOS.web,
  };

  const [active, setActive] = useState<ServiceKey>("content");
  const activeVideo = mergedVideos[active];

  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* LEFT — Services list */}
          <div className="relative">
            <ol className="space-y-10 sm:space-y-12">
              <ServiceItem
                index="01"
                title="Content Creating"
                icon={<Scissors className="h-5 w-5" />}
                description="Producing creative and meaningful digital content that connects with audiences, drives engagement, and inspires action."
                active={active === "content"}
                onClick={() => setActive("content")}
              />

              <ServiceItem
                index="02"
                title="Video Editing"
                icon={<Clapperboard className="h-5 w-5" />}
                description="Shaping raw clips into professional, engaging visuals that tell powerful stories and leave a lasting impact."
                active={active === "editing"}
                onClick={() => setActive("editing")}
              />

              <ServiceItem
                index="03"
                title="Web Development"
                icon={<Globe2 className="h-5 w-5" />}
                description="Designing and developing responsive, user-friendly websites that bring your brand to life in the digital world."
                active={active === "web"}
                onClick={() => setActive("web")}
              />
            </ol>
          </div>

          {/* RIGHT — Simple single card with drop shadow */}
          <div className="relative">
            <div className="relative rounded-3xl bg-white ring-1 ring-black/5 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.3)] overflow-hidden">
              <div className="aspect-video">
                <VideoPlayer key={videoKey(activeVideo)} cfg={activeVideo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Subcomponents ---------- */

function ServiceItem(props: {
  index: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  const { index, title, description, icon, active, onClick } = props;
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={[
          "group w-full text-left grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-6",
          "items-start focus:outline-none cursor-pointer select-none",
        ].join(" ")}
      >
        {/* Number column */}
        <div className="relative cursor-pointer">
          <div className="text-2xl sm:text-3xl font-semibold tabular-nums text-neutral-900">
            {index}
          </div>
        </div>

        {/* Content column */}
        <div className="relative pl-4 border-l-2 border-transparent sm:pl-6">
          {/* active accent line */}
          <span
            className={[
              "absolute -left-[2px] top-0 h-full w-[2px] rounded-full transition-colors",
              active
                ? "bg-violet-500"
                : "bg-transparent group-hover:bg-violet-300",
            ].join(" ")}
          />
          {/* icon bubble */}
          <div
            className={[
              "mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border",
              "transition-colors",
              active
                ? "border-violet-500 text-violet-600 bg-violet-50"
                : "border-neutral-200 text-neutral-600 bg-white group-hover:border-violet-300 group-hover:text-violet-500",
            ].join(" ")}
            aria-hidden
          >
            {icon}
          </div>

          <h3
            className={[
              "text-xl sm:text-2xl font-semibold tracking-tight cursor-pointer",
              active ? "text-neutral-900" : "text-neutral-800",
            ].join(" ")}
          >
            {title}
          </h3>
          <p className="mt-2 max-w-prose text-sm sm:text-[15px] leading-6 text-neutral-500 cursor-pointer">
            {description}
          </p>
        </div>
      </button>
    </li>
  );
}

function VideoPlayer({ cfg }: { cfg: VideoCfg }) {
  if (cfg.kind === "mp4") {
    return (
      <video
        src={cfg.src}
        className="h-full w-full object-cover"
        controls
        preload="metadata"
        playsInline
      />
    );
  }

  // Vimeo embed
  const src = useMemo(
    () =>
      `https://player.vimeo.com/video/${cfg.id}?title=0&byline=0&portrait=0&dnt=1`,
    [cfg.id]
  );

  return (
    <iframe
      src={src}
      title="Service video"
      className="h-full w-full"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}

function videoKey(cfg: VideoCfg) {
  return cfg.kind === "mp4" ? `mp4:${cfg.src}` : `vimeo:${cfg.id}`;
}
