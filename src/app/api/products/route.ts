import { NextRequest, NextResponse } from "next/server";
import { getProductList } from "../../../products";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit'));
    const offset = Number(searchParams.get('offset'));
    const keyword = searchParams.get('keyword');
    const missParams = !(limit ?? offset);

    if (missParams) {
        return NextResponse.json({ message: 'Missing params', items: [], success: false }, { status: 400 })
    }

    const { items, total } = await getProductList(limit, offset, keyword);

    const response = {
        items,
        total,
        message: 'success',
        success: true
    };

    return NextResponse.json(response);
}
