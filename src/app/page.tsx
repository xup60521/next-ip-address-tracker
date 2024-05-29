import dynamic from "next/dynamic";
import InputIP from "./_components/InputIP";

const Map = dynamic(() => import("./_components/Map"), { ssr: false });

export default async function Page() {
    
    return (
        <main className="text-black w-screen h-screen flex flex-col">
            <div
                className="w-full px-6 flex-col items-center z-10 hidden md:flex"
                style={{
                    backgroundImage: `url(/images/pattern-bg-desktop.png)`,
                    backgroundRepeat: "round",
                }}
            >
                <h1 className="text-white md:text-3xl text-2xl w-full text-center font-semibold md:py-8 my-6">
                    IP Address Tracker
                </h1>
                <InputIP />
            </div>
            <div
                className="w-full px-6 flex flex-col items-center z-10 md:hidden"
                style={{
                    backgroundImage: `url(/images/pattern-bg-mobile.png)`,
                    backgroundRepeat: "round",
                }}
            >
                <h1 className="text-white md:text-3xl text-2xl w-full text-center font-semibold md:py-8 my-6">
                    IP Address Tracker
                </h1>
                <InputIP />
            </div>
            <Map />
        </main>
    );
}
