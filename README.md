# Frontend Mentor Challenge - Rock, Paper, Scissors solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0).

## Table of contents

- [Overview](#overview)
- [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
        - [ViewTransition API](#viewtransition-api)
        - [Context and custom hook](#context-and-custom-hook)
    - [Resources](#resources)
- [Acknowledgment](#acknowledgment)

## Overview

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

Links:

- GitHub Repo: <https://github.com/xup60521/next-ip-address-tracker>

- Live Website: <https://next-ip-address-tracker-xi.vercel.app/>

```bash
# install dependencies
pnpm install
# start dev server
pnpm run dev
```

## My process

### Built with

- React

- Next.js

- TailwindCSS

- Leaflet

- 

### What I learned

#### ViewTransition API

 I’ve been interested in this new tech in a while. This is my first time using view transition api.

At first, `<SelectPanel />` shows up, and user can pick from the three options.

After that, view transition api jumps in.

```ts
// it's hard to name things...
export const useStartTransition = () => {
    return function (func: () => void) {
        const document2 = document as unknown as Document & {
            startViewTransition: (a: () => void) => void;
        };
      // Document currently doesn't have startViewTransition type,
        if ("startViewTransition" in document2) {
            document2.startViewTransition(() => {
              // using flush sync to force update page
                flushSync(() => {
                    func();
                });
            });
        } else {
            func();
        }
    };
};
```

`startViewTransition` is directly attached to the document object, so we first check if the method exists

In doing so, whether user’s browser support view transition api or not, our web app can run no matter what.


#### Context and custom Hook

Besides, the game logic and state live through the whole app, not only in individual components. Luckily react has a built in solution — context.



```tsx
import { type Picked } from "@/lib/utils";
import { createContext, useState } from "react";
import { unknown } from "zod";

export const pickContext = createContext({
    myPick: "" as Picked,
    setMyPick: unknown as React.Dispatch<React.SetStateAction<Picked>>,
    housePick: "" as Picked,
    setHousePick: unknown as React.Dispatch<React.SetStateAction<Picked>>,
    score: 0,
    setScore: unknown as React.Dispatch<React.SetStateAction<number>>
});

export function PickProvider({ children }: { children: React.ReactNode }) {
    const [myPick, setMyPick] = useState<Picked>("");
    const [housePick, setHousePick] = useState<Picked>("");
    const [score, setScore] = useState(0)
    return (
        <pickContext.Provider
            value={{ myPick, setMyPick, housePick, setHousePick, score, setScore }}
        >
            {children}
        </pickContext.Provider>
    );
}
```

For a rock, paper, scissors game, it’s not enough. Though we can access the state from anywhere inside the context provider, we still need to write the game logic for every components involved.

For the sake of that, we need to do something further. If we make the game logic an individual hook, any component can directly access to it, performing any operation anywhere.

```tsx
export const useGame = () => {
    const transition = useStartTransition();
    const { setMyPick, myPick, setHousePick, housePick, score, setScore } =
        useContext(pickContext);
    return {
        setPicked(e: Picked) {
            transition(() => {
                setMyPick(e);
            });
            setTimeout(() => {
                const randomNumber = Math.floor(Math.random() * 3);
                const housePick =
                    randomNumber === 0
                        ? "paper"
                        : randomNumber === 1
                        ? "rock"
                        : "scissors";
                setHousePick(housePick);
              // due to js closure, even though setMyPick
              // happens before the setTimeout callback,
              // the update function won't affect 
              // the value of myPick.
                const whoIsWinning = whoWins(e, housePick);
                setScore((prev) => {
                    if (whoIsWinning === "p1") {
                        return prev + 1;
                    }
                    if (whoIsWinning === "p2" && prev !== 0) {
                        return prev - 1;
                    }
                    return prev;
                });
            }, 1000);
        },
        myPick,
        housePick,
        score,
        newGame() {
            transition(() => {
                setMyPick("");
                setHousePick("");
            });
        },
    };
};
```

Although I separate `useGame` and `pickContext` in this case, it’s totally fine to write game logic in the context.

### Resources

- Google font - <https://fonts.google.com>

- TailwindCSS Docs - <https://tailwindcss.com/docs>

## Acknowledgment

- ViewTransition API tutorial - <https://blog.boggy.tw/2023/09/28/用view-transitions-api做有趣的動態吧/>