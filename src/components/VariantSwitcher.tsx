import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export type Variant = "base" | "radix";

const STORAGE_KEY = "nimbuscn.variant";

export function useVariant(): [Variant, (next: Variant) => void] {
    const [variant, setVariant] = useState<Variant>("base");

    useEffect(() => {
        try {
            const fromUrl = new URLSearchParams(window.location.search).get("variant");
            const stored = window.localStorage.getItem(STORAGE_KEY);
            const next = fromUrl ?? stored;
            if (next === "base" || next === "radix") setVariant(next);
        } catch {
            setVariant("base");
        }
    }, []);

    const update = (next: Variant) => {
        setVariant(next);
        try {
            window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
            return;
        }
    };

    return [variant, update];
}

export function VariantSwitcher({
    value,
    onChange,
}: {
    value: Variant;
    onChange: (next: Variant) => void;
}) {
    return (
        <div role="tablist" aria-label="Component library" className="inline-flex gap-1 rounded-lg border border-border p-1">
            {(["base", "radix"] as const).map((option) => (
                <button
                    key={option}
                    role="tab"
                    type="button"
                    aria-selected={value === option}
                    onClick={() => onChange(option)}
                    className={cn(
                        "rounded-md px-3 py-1 text-sm transition-colors",
                        value === option
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground",
                    )}
                >
                    {option === "base" ? "Base UI" : "Radix UI"}
                </button>
            ))}
        </div>
    );
}
