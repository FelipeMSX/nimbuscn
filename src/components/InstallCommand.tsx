import { useState } from "react";

import { cn } from "@/lib/utils";

const MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const;

type Manager = (typeof MANAGERS)[number];

const RUNNER: Record<Manager, string> = {
    npm: "npx shadcn@latest",
    pnpm: "pnpm dlx shadcn@latest",
    yarn: "yarn dlx shadcn@latest",
    bun: "bunx --bun shadcn@latest",
};

export function InstallCommand({ item }: { item: string }) {
    const [manager, setManager] = useState<Manager>("npm");
    const [copied, setCopied] = useState(false);
    const command = `${RUNNER[manager]} add ${item}`;

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className="rounded-lg border border-border">
            <div className="flex items-center justify-between border-b border-border px-2">
                <div role="tablist" aria-label="Package manager" className="flex">
                    {MANAGERS.map((option) => (
                        <button
                            key={option}
                            role="tab"
                            type="button"
                            aria-selected={manager === option}
                            onClick={() => setManager(option)}
                            className={cn(
                                "px-3 py-2 text-sm transition-colors",
                                manager === option
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <button type="button" onClick={copy} className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
            <pre className="overflow-x-auto px-4 py-3 text-sm"><code>{command}</code></pre>
        </div>
    );
}
