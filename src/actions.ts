"use server";

import { env } from "./env";
import { IPTrackerType } from "./type";

const baseURL = "https://geo.ipify.org/api/v2/country,city";

export async function get_ip_detail({
    ip,
    domain,
}: {
    ip?: string;
    domain?: string;
}) {
    const url = new URLSearchParams("");
    url.set("apiKey", env.IPIFY_API_KEY);
    if (ip) {
        url.set("ipAddress", ip);
    }
    if (domain) {
        url.set("domain", domain);
    }

    const data = await fetch(`${baseURL}?${url.toString()}`).then((res) =>
        res.json()
    );
    if (data["code"]) {
        return null;
    }
    return data as IPTrackerType;
}
