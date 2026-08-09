import React from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

interface ModeItemProps {
    slug: string;
    url: string;
    img: string;
    title: string;
    description: string;
}

function ModeItem({ slug, img, title, description, url }: ModeItemProps) {
    return (
        <Link
            href={`/practice/${url}/${slug}`}
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
