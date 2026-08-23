import type { FieldValues, UseFormReturn } from "react-hook-form";

export function FormStatePanel<TFields extends FieldValues>({
    form,
    submitted,
}: {
    form: UseFormReturn<TFields>;
    submitted: TFields | null;
}) {
    const { errors, isDirty, isValid, isSubmitting } = form.formState;
    const values = form.watch();

    return (
        <aside className="rounded-lg border border-border bg-muted/40 p-4 text-sm" aria-label="Form state">
            <dl className="grid grid-cols-3 gap-2">
                <div>
                    <dt className="text-muted-foreground">Dirty</dt>
                    <dd>{String(isDirty)}</dd>
                </div>
                <div>
                    <dt className="text-muted-foreground">Valid</dt>
                    <dd>{String(isValid)}</dd>
                </div>
                <div>
                    <dt className="text-muted-foreground">Submitting</dt>
                    <dd>{String(isSubmitting)}</dd>
                </div>
            </dl>

            <p className="mt-4 text-muted-foreground">Values</p>
            <pre className="mt-1 overflow-x-auto text-xs"><code>{JSON.stringify(values, null, 2)}</code></pre>

            {Object.keys(errors).length > 0 && (
                <>
                    <p className="mt-4 text-destructive">Errors</p>
                    <ul className="mt-1 list-disc pl-5 text-xs">
                        {Object.entries(errors).map(([name, error]) => (
                            <li key={name}>
                                {name}: {String((error as { message?: string })?.message ?? "invalid")}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {submitted && (
                <>
                    <p className="mt-4 text-muted-foreground">Submitted</p>
                    <pre className="mt-1 overflow-x-auto text-xs"><code>{JSON.stringify(submitted, null, 2)}</code></pre>
                </>
            )}
        </aside>
    );
}
