import { env } from "@/env";
import { type IPTrackerType } from "@/type";
import { log } from "console";
const baseURL = "https://geo.ipify.org/api/v2/country,city";

export async function GET(req: Request) {
    const { searchParams, hostname } = new URL(req.url);
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
        log(hostname)
        url.set("ipAddress", hostname);
    }
    const data = await fetch(`${baseURL}?${url.toString()}`).then((res) =>
        res.json()
    );
    if ("code" in data) {
        return Response.json(null);
    }
    return Response.json(data);
}
