import { IPTrackerType } from "./type";

export async function get_ip_detail({
    ip,
    domain,
}: {
    ip?: string;
    domain?: string;
}) {
    const url = new URLSearchParams("");
    if (ip) {
        url.set("ipAddress", ip);
    }
    if (domain) {
        url.set("domain", domain);
    }
    const data = await fetch(`/api?${url.toString()}`).then((res) =>
        res.json()
    );
    if (!data) {
        return null;
    }
    return data as IPTrackerType;
}
