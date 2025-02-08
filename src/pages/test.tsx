import ExParent1 from "@/components/example/ExParent1";
import createStore from "@/components/example/store/createStore";

const Test = () => {
    return <>
        <h1>Test</h1>
        <ExParent1 store={createStore()}></ExParent1>
    </>
};

export default Test;