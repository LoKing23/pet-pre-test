import productList, { getProductList } from './products';


describe('productList', () => {
    it('should be an array', () => {
        expect(Array.isArray(productList)).toBe(true);
    });

    it('should have 10000 items', () => {
        expect(productList.length).toBe(10000);
    });

    it('each item should have an id', () => {
        expect(productList.every((product) => product.id)).toBe(true);
    });

    it('each item should have a name', () => {
        expect(productList.every((product) => product.name)).toBe(true);
    });
});

describe('getProductList', () => {
    it('should return an object with items and total properties', async () => {
        const result = await getProductList(10, 0);
        expect(result).toHaveProperty('items');
        expect(result).toHaveProperty('total');
    });

    it('should return 10 items when limit is 10', async () => {
        const result = await getProductList(10, 0);
        expect(result.items.length).toBe(10);
    });

    it('should return 5 items when limit is 5 and offset is 5', async () => {
        const result = await getProductList(5, 5);
        expect(result.items.length).toBe(5);
    });

    it('should return all items when limit is greater than the total number of items', async () => {
        const result = await getProductList(20000, 0);
        expect(result.items.length).toBe(10000);
    });

    it('should return items that match the keyword', async () => {
        const result = await getProductList(10, 0, '罐罐');
        expect(result.items.every((product) => product.name.includes('罐罐'))).toBe(true);
    });
});
