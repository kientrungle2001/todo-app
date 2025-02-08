import ExChildA from "./ExChildA";
import ExChildB from "./ExChildB";

const ExParent1: React.FC<{ store: any }> = ({ store }) => {
    return <>
        <h2>Parent 1</h2>
        <ExChildA store={store}></ExChildA>
        <ExChildB store={store}></ExChildB>
    </>
};

export default ExParent1;