import { NextRequest, NextResponse } from "next/server";
import PRODUCTS from "../../../products";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit'));
    const offset = Number(searchParams.get('offset'));
    const keyword = searchParams.get('keyword');
    const missParams = !(limit ?? offset);

    if (missParams) {
        return NextResponse.json({ message: 'Missing params' }, { status: 400 })
    }

    const filteredProducts = keyword
        ? PRODUCTS.filter((product) => product.name.includes(keyword))
        : PRODUCTS;
    const products = filteredProducts.slice(offset, offset + limit);
    const response = {
        items: products,
        total: filteredProducts.length,
        message: 'success'
    };

    return NextResponse.json(response);
}
