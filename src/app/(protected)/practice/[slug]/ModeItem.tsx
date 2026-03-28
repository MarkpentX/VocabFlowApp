import React from "react";
import Link from "next/link";
import { slugDecode } from "@/lib/slug-utils";
import Image from "next/image";

interface ModeItemProps {
    slug: Promise<{ slug: string }>;
    img: string;
    title: string;
    description: string;
}

async function ModeItem({slug, img, title, description}: ModeItemProps) {
    const slugParam = await slug;
    const decodedSlug = slugDecode(slugParam.slug);

    return (
        <Link
            href={`/practice/by-translate/${decodedSlug}`}
            className="bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black p-3 rounded-xl"
        >
            <article className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50 transition">
                <Image width={36} height={36} src={img} alt="mode-icon" />

                <div>
                    <h3 className="font-bold text-lg">
                        {title}
                    </h3>

                    <p className="text-sm text-[rgb(103,126,119)]">
                        {description}
                    </p>
                </div>
            </article>
        </Link>
    );
}

export default ModeItem;