"use client";

import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-3 mb-8 flex-wrap">
      <span className="text-[13px] font-medium text-grey-500">Filter:</span>
      <ToggleGroup
        value={[activeCategory]}
        onValueChange={(value) => value[0] && onCategoryChange(value[0])}
        variant="outline"
        size="sm"
        className="gap-1 flex-wrap"
      >
        {categories.map((cat) => (
          <ToggleGroupItem key={cat} value={cat} className="text-[12px] font-medium">
            {cat}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Badge variant="outline" className="text-[11px]">
        {activeCategory === "All" ? "Showing all" : `${activeCategory} only`}
      </Badge>
    </div>
  );
}
