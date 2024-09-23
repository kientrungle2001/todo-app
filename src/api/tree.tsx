export const buildTree = (items: any[], parentField: string, parent: any = null): any[] => {
    const map: any = {};
    items.forEach(item => {
        map[item.id] = { ...item, __children: [] };
    });

    const forest: any[] = [];
    items.forEach(item => {
        if (item[parentField]) {
            if (map[item[parentField]]) {
                map[item[parentField]].__children.push(map[item.id]);
            } else {
                forest.push(map[item.id]);
            }
        } else {
            forest.push(map[item.id]);
        }
    });
    return forest;
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