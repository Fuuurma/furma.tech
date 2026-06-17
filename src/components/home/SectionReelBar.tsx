"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReelItem } from "@/lib/home-reel";
import { StudioChrome } from "@/components/studio/StudioChrome";
import { cn } from "@/lib/utils";

interface SectionReelBarProps {
  items: ReelItem[];
  activeReelIndex: number;
  onSelect: (reelIndex: number) => void;
  onBrandReset?: () => void;
}

interface ReelColumnProps {
  items: ReelItem[];
  activeReelIndex: number;
  columnOffset: -1 | 0 | 1;
  onSelect?: (reelIndex: number) => void;
}

function ReelRow({
  item,
  label,
  isCurrent,
}: {
  item: ReelItem | null;
  label: string;
  isCurrent: boolean;
}) {
  if (!item) {
    return (
      <div
        className="plastic-reel__project plastic-reel__project--ghost h-[var(--plastic-nav-h)]"
        aria-hidden
      />
    );
  }

  return (
    <div
      className={cn(
        "plastic-reel__project h-[var(--plastic-nav-h)]",
        isCurrent && "plastic-reel__project--current",
      )}
    >
      <span className="plastic-reel__project-name">{item.title}</span>
      <span className="plastic-reel__project-meta">
        <span>{label}</span>
        <span className="plastic-reel__count">{item.count}</span>
      </span>
    </div>
  );
}

function ReelColumn({
  items,
  activeReelIndex,
  columnOffset,
  onSelect,
}: ReelColumnProps) {
  const labels = {
    [-1]: "Previous one",
    0: "You're here",
    1: "Next one",
  } as const;

  const label = labels[columnOffset];
  const targetReelIndex = activeReelIndex + columnOffset;

  const rows: { item: ReelItem | null }[] = [];

  if (columnOffset === -1) {
    rows.push({ item: null });
    items.forEach((entry) => rows.push({ item: entry }));
  } else if (columnOffset === 1) {
    items.forEach((entry) => rows.push({ item: entry }));
    rows.push({ item: null });
  } else {
    items.forEach((entry) => rows.push({ item: entry }));
  }

  const translateIndex =
    columnOffset === -1
      ? activeReelIndex
      : columnOffset === 1
        ? activeReelIndex + 1
        : activeReelIndex;

  const activeItem = items[activeReelIndex];

  const strip = (
    <div
      className="plastic-reel__strip"
      style={{
        transform: `translate3d(0, calc(-1 * ${translateIndex} * var(--plastic-nav-h)), 0)`,
      }}
    >
      {rows.map((row, i) => (
        <ReelRow
          key={row.item?.id ?? `ghost-${columnOffset}-${i}`}
          item={row.item}
          label={label}
          isCurrent={
            columnOffset === 0 && row.item?.id === activeItem?.id
          }
        />
      ))}
    </div>
  );

  if (
    columnOffset !== 0 &&
    targetReelIndex >= 0 &&
    targetReelIndex < items.length
  ) {
    const target = items[targetReelIndex];
    return (
      <button
        type="button"
        onClick={() => onSelect?.(targetReelIndex)}
        className="plastic-reel__viewport plastic-reel__viewport--interactive"
        aria-label={`Go to ${target.title}`}
      >
        {strip}
      </button>
    );
  }

  if (columnOffset === 0) {
    return (
      <div className="plastic-reel__viewport" aria-current="true">
        {strip}
      </div>
    );
  }

  return <div className="plastic-reel__viewport">{strip}</div>;
}

export function SectionReelBar({
  items,
  activeReelIndex,
  onSelect,
  onBrandReset,
}: SectionReelBarProps) {
  const prevIndexRef = useRef(activeReelIndex);
  const prev = prevIndexRef.current;
  const direction =
    activeReelIndex > prev
      ? "forward"
      : activeReelIndex < prev
        ? "backward"
        : "idle";

  useLayoutEffect(() => {
    prevIndexRef.current = activeReelIndex;
  }, [activeReelIndex]);

  return (
    <StudioChrome
      onBrandReset={onBrandReset}
      projectsSlot={
        <div
          className={cn(
            "plastic-reel__projects w-full",
            direction !== "idle" && `plastic-reel__projects--${direction}`,
          )}
          role="navigation"
          aria-label="Site sections"
          data-active-index={activeReelIndex}
        >
          <ReelColumn
            items={items}
            activeReelIndex={activeReelIndex}
            columnOffset={-1}
            onSelect={onSelect}
          />
          <ReelColumn
            items={items}
            activeReelIndex={activeReelIndex}
            columnOffset={0}
          />
          <ReelColumn
            items={items}
            activeReelIndex={activeReelIndex}
            columnOffset={1}
            onSelect={onSelect}
          />
        </div>
      }
      className="border-foreground/10"
    />
  );
}
