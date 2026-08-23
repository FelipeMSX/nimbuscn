import { getCollection, type CollectionEntry } from "astro:content";

import { defaultLocale, isLocale, type Locale } from "./i18n";

export type DocEntry = CollectionEntry<"docs">;

export type TreeNode = {
    slug: string;
    title: string;
    order: number;
    children: TreeNode[];
};

export function localeOf(entry: DocEntry): Locale {
    const [segment] = entry.id.split("/");
    return isLocale(segment) ? segment : defaultLocale;
}

export function pathOf(entry: DocEntry): string {
    return entry.id.split("/").slice(1).join("/").replace(/\/?index$/, "");
}

export async function docsFor(locale: Locale): Promise<DocEntry[]> {
    const all = await getCollection("docs");
    return all.filter((entry) => localeOf(entry) === locale);
}

export async function treeFor(locale: Locale): Promise<TreeNode[]> {
    const entries = await docsFor(locale);
    const roots = new Map<string, TreeNode>();

    for (const entry of entries) {
        const path = pathOf(entry);
        const [head, ...rest] = path.split("/").filter(Boolean);
        const key = head ?? "";
        const node: TreeNode = {
            slug: path,
            title: entry.data.title,
            order: entry.data.order ?? 0,
            children: [],
        };

        if (rest.length === 0) {
            roots.set(key, { ...node, children: roots.get(key)?.children ?? [] });
            continue;
        }

        const parent = roots.get(key) ?? { slug: key, title: key, order: 0, children: [] };
        parent.children.push(node);
        roots.set(key, parent);
    }

    const byOrder = (a: TreeNode, b: TreeNode) => a.order - b.order || a.title.localeCompare(b.title);
    return [...roots.values()]
        .map((node) => ({ ...node, children: node.children.sort(byOrder) }))
        .sort(byOrder);
}
