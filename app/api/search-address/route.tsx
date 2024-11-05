import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function GET(request) {
    const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get('q');

    if (!searchText) {
        return NextResponse.json({ error: "Missing search query parameter" }, { status: 400 });
    }

    // Generate a unique session token
    const sessionToken = randomUUID();

    const url = `${BASE_URL}?q=${encodeURIComponent(searchText)}&language=en&limit=8&session_token=${sessionToken}&proximity=-83.748708,42.265837&country=US&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;

    try {
        const res = await fetch(url, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error("Failed to fetch data from Mapbox");

        const searchResult = await res.json();
        return NextResponse.json({ data: searchResult });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Failed to fetch data from Mapbox" }, { status: 500 });
    }
}
