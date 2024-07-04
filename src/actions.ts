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
    if (!ip && !domain) {
        const { ip } = await fetch("https://api.ipify.org?format=json", {
            method: "GET",
        })
            .then((res) => res.json())
            .catch((error) => console.error(error));
        url.set("ipAddress", ip);
    }
    const data = await fetch(`/api?${url.toString()}`).then((res) =>
        res.json()
    );
    if (!data) {
        return null;
    }
    return data as IPTrackerType;
}
