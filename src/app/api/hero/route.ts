import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const dataFile = path.join(process.cwd(), "public/heroSlides.json");

// 🟩 GET: Đọc file JSON
export async function GET() {
  try {
    if (!fs.existsSync(dataFile)) {
      fs.writeFileSync(dataFile, "[]");
    }
    const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
    return NextResponse.json(data);
  } catch (err) {
    console.error("Lỗi đọc hero.json:", err);
    return NextResponse.json([], { status: 500 });
  }
}

// 🟦 POST: Cập nhật JSON (không còn upload hình)
export async function POST(req: NextRequest) {
  try {
    const slides = await req.json(); // nhận JSON trực tiếp từ fetch
    fs.writeFileSync(dataFile, JSON.stringify(slides, null, 2));
    return NextResponse.json(slides);
  } catch (err) {
    console.error("Lỗi ghi hero.json:", err);
    return NextResponse.json(
      { error: "Ghi dữ liệu thất bại" },
      { status: 500 }
    );
  }
}
