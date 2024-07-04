"use client";

import { get_ip_detail } from "@/actions";
import {  resultAtom } from "@/state";
import { IPTrackerType } from "@/type";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

export default function InputIP() {
    const [input, setInput] = useState("");
    const [result, setResult] = useAtom<null | IPTrackerType>(resultAtom);
    async function handleEnter() {
        const ip_regex = /[0-9]+[.][0-9]+[.][0-9]+[.][0-9]+/;
        if (ip_regex.test(input)) {
            const data = await get_ip_detail({ ip: input });
            setResult(data ? { ...data } : null);
            return;
        }
        const data = await get_ip_detail({ domain: input });
        setResult(data ? { ...data } : null);
    }
    useEffect(() => {
        async function getInitData() {
            const initData = await get_ip_detail({});
            setResult(initData ? { ...initData } : null);
        }
        getInitData();
    }, []);
    return (
        <>
            <div className="md:w-[35rem] w-full flex rounded-lg">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleEnter();
                        }
                    }}
                    className="px-6 py-3 rounded-l-lg flex-grow min-w-0 cursor-pointer"
                    placeholder="Search for any IP address or domain"
                />
                <button
                    onMouseDown={handleEnter}
                    className="h-full px-5 text-white bg-black transition hover:bg-gray-800 rounded-r-lg"
                >{`>`}</button>
            </div>
            <div className="md:grid md:grid-cols-4 md:gap-0 gap-2 md:w-[80vw] flex flex-col w-full rounded-lg md:py-8 py-6 md:translate-y-[50%] bg-white md:m-0 -mb-[12.5rem] my-4">
                <div className="px-8 md:border-r-[1px] border-neutral-300 flex flex-col md:items-start items-center">
                    <h3 className="text-[0.6rem] text-neutral-500 tracking-wide py-0">
                        IP ADDRESS
                    </h3>
                    <p className="font-semibold text-black md:py-4 py-2 md:text-left text-center">
                        {result?.ip}
                    </p>
                </div>
                <div className="px-8 md:border-r-[1px] border-neutral-300 flex flex-col md:items-start items-center">
                    <h3 className="text-[0.6rem] text-neutral-500 tracking-wide py-0">
                        LOCATION
                    </h3>
                    <p className="font-semibold text-black md:py-4 py-2 md:text-left text-center">
                        {result &&
                            `${result.location.city}, ${result.location.region} ${result.location.postalCode}`}
                    </p>
                </div>
                <div className="px-8 md:border-r-[1px] border-neutral-300 flex flex-col md:items-start items-center">
                    <h3 className="text-[0.6rem] text-neutral-500 tracking-wide py-0">
                        TIMEZONE
                    </h3>
                    <p className="font-semibold text-black md:py-4 py-2 md:text-left text-center">
                        {result && `UTC ${result.location.timezone}`}
                    </p>
                </div>
                <div className="px-8  flex flex-col md:items-start items-center">
                    <h3 className="text-[0.6rem] text-neutral-500 tracking-wide py-0">
                        ISP
                    </h3>
                    <p className="font-semibold text-black md:py-4 py-2 md:text-left text-center">
                        {result?.isp}
                    </p>
                </div>
            </div>
        </>
    );
}
