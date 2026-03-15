'use server'

import React from 'react';
import Link from "next/link";
import {getAllTags} from "@/app/(protected)/tags/actions";

async function Page() {
    const tags = await getAllTags()

    if (tags.length === 0){
        return (
            <h1>You dont have any tags</h1>
        )
    }

    return (
        <main>
            <h1>Your tags</h1>

            <ul>
                {tags.map((tag, index) => (
                    <li key={index}>
                        <Link href={`/tags/${tag}`}>{tag}</Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default Page;