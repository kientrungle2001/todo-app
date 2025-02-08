import React from "react";

const ExSubB1: React.FC<{ store: any }> = ({ store }) => {
    const [stateB1, setStateB1] = React.useState<number>(store.stateB.stateB1 ?? 0);
    React.useEffect(() => {
        store.listen('action1', (newValue: any) => {
            setStateB1(newValue as number);
        });
    }, []);
    return <>
        <h3>Sub B1 - {stateB1}</h3>
    </>
};

export default ExSubB1;