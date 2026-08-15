import React from "react";
import { notFound } from "next/navigation";
import { getSharedGrammarResultAction } from "@/presentation/actions/grammar-actions";
import SharedResultView from "@/presentation/components/features/grammar/SharedResultView";

interface PageProps {
    params: Promise<{ resultId: string }>;
}

async function Page({ params }: PageProps) {
    const { resultId } = await params;
    const result = await getSharedGrammarResultAction(resultId);

    if (!result.isSuccess) {
        notFound();
    }

    return <SharedResultView result={result.data} />;
}

export default Page;
