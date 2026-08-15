"use client";

import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";

interface PostHogIdentifyProps {
    userId: string;
    email?: string;
    username?: string;
}

function PostHogIdentify({ userId, email, username }: PostHogIdentifyProps) {
    const posthog = usePostHog();

    useEffect(() => {
        if (!posthog) {
            return;
        }

        posthog.identify(userId, {
            email,
            username,
        });
    }, [posthog, userId, email, username]);

    return null;
}

export default PostHogIdentify;
