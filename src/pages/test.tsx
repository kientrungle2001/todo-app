import React from "react";
const store: any = {
    count: 0,
    increase: () => {
        store.count++;
        store.notify(store.count);
    },
    handlers: [],
    subscribe: (handler: any) => {
        store.handlers.push(handler);
    },
    unsubscribe: (handler: any) => {
        let index = store.handlers.indexOf(handler);
        store.handlers.splice(index, 1);
    },
    notify: (count: number) => {
        store.handlers.forEach((handler: any) => {
            handler(count);
        });
    }
};

function IncreaseButton() {
    return <button onClick={() => {
        store.increase();
    }}>Increase</button>;
}

function ShowCount() {
    const [count, setCount] = React.useState(store.count);
    React.useEffect(() => {
        store.subscribe(setCount);
        return () => {
            store.unsubscribe(setCount);
        }
    }, [])
    return <h1>Test {count}</h1>
}

export default function TestPage() {

    return <>
        <ShowCount />
        <IncreaseButton />
        <ShowCount />
        <IncreaseButton />
    </>
}