"use client";
import { resultAtom } from "@/state";
import { useAtomValue } from "jotai";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, ZoomControl, useMap } from "react-leaflet";

export default function Map() {
    const position = { lat: 24.137396608878987, lng: 120.68692065044608 };
    const newPosition = useAtomValue(resultAtom);
    const icon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/3177/3177361.png",
        iconSize: [32, 32]
    })
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
            <FlyToSpot />
            {newPosition && (
                <Marker
                    position={{
                        lat: newPosition.location.lat,
                        lng: newPosition.location.lng,
                    }}
                    icon={icon}
                ></Marker>
            )}
        </MapContainer>
    );
}

function FlyToSpot() {
    const map = useMap();
    const newPosition = useAtomValue(resultAtom);
    useEffect(() => {
        if (newPosition) {
            map.flyTo({
                lat: newPosition.location.lat,
                lng: newPosition.location.lng,
            });
        }
    }, [newPosition, map]);
    return <></>;
}
