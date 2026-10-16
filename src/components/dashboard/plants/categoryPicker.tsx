import { Check } from "lucide-react";

import type { CategoryPickerProps } from "@type/dashboard/plant.types";

export default function CategoryPicker({
    options,
    selected,
    onChange,
    disabled = false,
}: CategoryPickerProps) {
    const selectedIds = new Set(
        selected.map((category) => category.id)
    );

    const toggleCategory = (id: string) => {
        if (selectedIds.has(id)) {
            onChange(
                selected.filter(
                    (category) => category.id !== id
                )
            );

            return;
        }

        const category = options.find(
            (option) => option.id === id
        );

        if (category) {
            onChange([...selected, category]);
        }
    };

    if (options.length === 0) {
        return (
            <p className="rounded-lg border border-dashed border-[#dfe4dc] px-3 py-2.5 text-xs text-[#7b847a]">
                No categories yet. Create one in the Categories page.
            </p>
        );
    }

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((category) => {
                const isSelected = selectedIds.has(
                    category.id
                );

                return (
                    <button
                        key={category.id}
                        type="button"
                        disabled={disabled}
                        aria-pressed={isSelected}
                        onClick={() =>
                            toggleCategory(category.id)
                        }
                        className={`flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${isSelected
                            ? "border-[#486344] bg-[#edf4eb] text-[#486344]"
                            : "border-[#dfe4dc] bg-white text-[#596257] hover:bg-[#f7f9f5]"
                            }`}
                    >
                        {isSelected && (
                            <Check className="h-3 w-3" />
                        )}

                        {category.name}
                    </button>
                );
            })}
        </div>
    );
}
