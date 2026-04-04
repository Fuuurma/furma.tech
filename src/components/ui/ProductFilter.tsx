"use client";

import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { Zap, Road, Pause, Layers } from "lucide-react";

interface ProductFilterProps {
  onFilterChange?: (filter: string) => void;
}

export function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [filter, setFilter] = React.useState("all");

  const handleValueChange = (value: string) => {
    if (value) {
      setFilter(value);
      onFilterChange?.(value);
    }
  };

  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-[13px] font-medium text-grey-500">Filter:</span>
      <ToggleGroup
        value={[filter]}
        onValueChange={(value) => value[0] && handleValueChange(value[0])}
        variant="outline"
        size="sm"
        className="gap-1"
      >
        <ToggleGroupItem value="all" className="gap-2 text-[12px] font-medium">
          <Layers className="size-3.5" />
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="dev" className="gap-2 text-[12px] font-medium">
          <Zap className="size-3.5" />
          In Dev
        </ToggleGroupItem>
        <ToggleGroupItem value="roadmap" className="gap-2 text-[12px] font-medium">
          <Road className="size-3.5" />
          Roadmap
        </ToggleGroupItem>
        <ToggleGroupItem value="paused" className="gap-2 text-[12px] font-medium">
          <Pause className="size-3.5" />
          Paused
        </ToggleGroupItem>
      </ToggleGroup>
      <Badge variant="outline" className="ml-auto text-[11px]">
        {filter === "all" ? "Showing all" : `Filter: ${filter}`}
      </Badge>
    </div>
  );
}
