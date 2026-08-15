"use client";

import { Suspense, useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import PostHogPageView from "@/presentation/providers/PostHogPageView";

function initPostHog() {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || posthog.__loaded) {
        return;
    }

    posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
        person_profiles: "always",
        capture_pageview: false,
        capture_pageleave: true,
        capture_exceptions: true,
        autocapture: true,
        enable_heatmaps: true,
        session_recording: {
            recordCrossOriginIframes: false,
        },
    });
}

function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        initPostHog();
    }, []);

    return (
        <PHProvider client={posthog}>
            <Suspense fallback={null}>
                <PostHogPageView/>
            </Suspense>
            {children}
        </PHProvider>
    );
}

export default PostHogProvider;
