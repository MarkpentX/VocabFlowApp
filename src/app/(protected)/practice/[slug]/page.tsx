import Link from "next/link";


export default async function Page({params,}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params
    console.log(slug)
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link href={`/practice/by-translate/${slug}`}>By translate</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}