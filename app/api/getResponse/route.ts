import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  const data = await request.json();

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-exp-0801" });

  const result = await model.generateContent([
    `my height is ${data.height}cm my weight is ${data.weight}kg my age is ${data.age} im a ${data.gender} and mY physical status is ${data.activity} and i drink about ${data.water} litres of water per day, Give general Tips, don't provide any medical advice just give me the tips, how is my health status`,
  ]);

  return NextResponse.json({
    result: result.response.text(),
    status: "success",
  });
}

export async function GET() {
  return NextResponse.json({
    status: "Working",
  });
}
