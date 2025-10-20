import { NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "public/heroSlides.json");

export async function GET() {
  try {
    const data = await readFile(filePath, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: "Không đọc được file" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await writeFile(filePath, JSON.stringify(body, null, 2), "utf8");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Không thể ghi file" }, { status: 500 });
  }
}
