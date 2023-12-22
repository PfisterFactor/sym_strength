export function mapObject<T extends { [key: string]: any }, V extends T[string], newV,>
    (obj: T, callback: (value: V, key: string, object: T) => newV): { [key: string]: newV } {
    return Object.keys(obj).reduce((acc, k) => {
        return {
            ...acc,
            [k]: callback(obj[k],k,obj)
        }
    }, {});
}