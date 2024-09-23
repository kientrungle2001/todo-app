export const buildTree = (items: any[], parentField: string, parent: any = null): any[] => {
    let result: any[] = [];
    items.forEach((item) => {
        if (item[parentField] === (parent?.id ?? 0)) {
            let children: any[] = buildTree(items, parentField, item);
            if (children.length > 0) {
                item.__children = children;
            } else {
                delete item.__children;
            }
            result.push(item);
        }
    });
    return result;
}


export const flatTree = (items: any[], level = 0): any[] => {
    let result: any[] = [];
    items.forEach((item) => {
        item.__level = level;
        result.push(item);
        if (item.__children) {
            result = result.concat(flatTree(item.__children, level + 1));
        }
    });
    return result;
}