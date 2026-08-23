import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { InstallCommand } from "./InstallCommand";
import { VariantSwitcher, useVariant, type Variant } from "./VariantSwitcher";

export type PreviewSources = Record<Variant, string>;

export function ComponentPreview({
    item,
    sources,
    children,
    dual = true,
}: {
    item: string;
    sources: PreviewSources;
    children: ReactNode | ((variant: Variant) => ReactNode);
    dual?: boolean;
}) {
    const [tab, setTab] = useState<"preview" | "code">("preview");
    const [variant, setVariant] = useVariant();
    const active = dual ? variant : "base";
    const registryItem = active === "radix" ? `@nimbuscn/radix/${item}` : `@nimbuscn/${item}`;

    return (
        <section className="my-8 flex flex-col gap-3">
            <header className="flex flex-wrap items-center justify-between gap-2">
                <div role="tablist" aria-label="Preview or code" className="inline-flex gap-1 rounded-lg border border-border p-1">
                    {(["preview", "code"] as const).map((option) => (
                        <button
                            key={option}
                            role="tab"
                            type="button"
                            aria-selected={tab === option}
                            onClick={() => setTab(option)}
                            className={cn(
                                "rounded-md px-3 py-1 text-sm capitalize transition-colors",
                                tab === option
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {dual && <VariantSwitcher value={variant} onChange={setVariant} />}
            </header>

            {tab === "preview" ? (
                <div className="flex min-h-56 items-center justify-center rounded-lg border border-border p-8">
                    {typeof children === "function" ? children(active) : children}
                </div>
            ) : (
                <pre className="max-h-[32rem] overflow-auto rounded-lg border border-border p-4 text-sm">
                    <code>{sources[active]}</code>
                </pre>
            )}

            <InstallCommand item={registryItem} />
        </section>
    );
}
