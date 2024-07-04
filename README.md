# Frontend Mentor Challenge - Rock, Paper, Scissors solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0).

## Table of contents

-   [Overview](#overview)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
        -   [Leaflet](#leaflet)
        -   [Data Fetching](#data-fetching)
    -   [Resources](#resources)
-   [Acknowledgment](#acknowledgment)

## Overview

Users should be able to:

-   View the optimal layout for each page depending on their device's screen size
-   See hover states for all interactive elements on the page
-   See their own IP address on the map on the initial page load
-   Search for any IP addresses or domains and see the key information and location

Links:

-   GitHub Repo: <https://github.com/xup60521/next-ip-address-tracker>

-   Live Website: <https://next-ip-address-tracker-xi.vercel.app/>

```bash
# install dependencies
pnpm install
# start dev server
pnpm run dev
```

## My process

### Built with

-   React

-   Next.js

-   TailwindCSS

-   Leaflet (with OpenStreetMap)

-   Jotai (global state management)

### What I learned

#### Leaflet

Instead of Google maps, I use leaflet with OpenStreetMap in this project. To be more specific, I use `react-leaflet`, a react wrapper for leaflet, in this challenge.

A basic map setup is quite simple

```tsx
"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

export default function Map() {
    const position = { lat: 24.137396608878987, lng: 120.68692065044608 };
    return (
        <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={true}
            className="z-0 h-full w-full"
            zoomControl={false}
        >
            <ZoomControl position="bottomleft" />
            <TileLayer
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    );
}
```

In this challenge, we need to mark the position of a domain or ip. A built in marker can help.

```tsx
import { Icon } from "leaflet";
export default function () {
    const icon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/3177/3177361.png",
        iconSize: [32, 32],
    });
    return (
        <Marker
            position={{
                lat: newPosition.location.lat,
                lng: newPosition.location.lng,
            }}
            icon={icon}
        ></Marker>
    );
}
```

Pass the marker as children in the `<MapContainer />` component. The marker should show up in the map.

```html
<MapContainer>
    <Marker />
</MapContainer>
```

#### Data Fetching

When the page is loaded, an useEffect will fire, fetching the initial data from ```/api``` end point. On the backend side, the route handler parses the request url, and make the actual request to the ipify API.

BTW, client-side fetch function is defined at ```action.ts```.

I use jotai to handle the fetch result. Even though it's not the safest method to manage remote state, it currently works.

### Resources

-   Google font - <https://fonts.google.com>

-   TailwindCSS Docs - <https://tailwindcss.com/docs>

-   react-leaflet docs: <https://react-leaflet.js.org/docs/start-introduction/>

## Acknowledgment

-  get client's public ip: <https://stackoverflow.com/a/72565046>