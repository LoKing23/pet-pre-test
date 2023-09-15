import { v4 as uuidv4 } from 'uuid';
import { Product } from "./types"

const PRODUCT_NAMES = ['罐罐', '零食', '保健', '玩具', '貓砂', '飼料', '餐具', '清潔', '美容', '其他'];

const generateProductId = (length: number): string => length && length <= 24 ? uuidv4().replaceAll('-', '').slice(0, length): uuidv4();

const generateProductIds = (count: number = 10000, length: number = 8): string[] => {
    const set = new Set<string>();

    while (set.size < count) {
        set.add(generateProductId(length));
    }
    
    return Array.from(set);
}

const productList: Product[] = generateProductIds(10000).map((id, index) => ({
    id,
    name: PRODUCT_NAMES[index%10] + ' - ' + id.slice(0, 4),
    price: Math.floor(Math.random() * 1000),
}));

export default productList;