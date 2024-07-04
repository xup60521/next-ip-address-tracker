import { env } from "@/env";
import { type IPTrackerType } from "@/type";
const baseURL = "https://geo.ipify.org/api/v2/country,city";

export async function GET(req: Request) {
    const { searchParams, origin } = new URL(req.url);
    const ip = searchParams.get("ipAddress");
    const domain = searchParams.get("domain");
    const url = new URLSearchParams("");
    url.set("apiKey", env.IPIFY_API_KEY);
    if (ip) {
        url.set("ipAddress", ip);
    }
    if (domain) {
        url.set("domain", domain);
    }
    if (!ip && !domain) {
        url.set("ipAddress", origin);
    }
    const data = await fetch(`${baseURL}?${url.toString()}`).then((res) =>
        res.json()
    );
    if ("code" in data) {
        return Response.json(null);
    }
    return Response.json(data);
}
