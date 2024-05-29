export type IPTrackerType = {
    ip: string;
    location: Location;
    domains: string[];
    as: As;
    isp: string;
};

type As = {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
};

type Location = {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
};
