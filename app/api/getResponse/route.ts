import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  const data = await request.json();

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const result = await model.generateContent([
    `I'm looking for a PC recommendation with the following preferences:
     - Preferred Brand: ${data.height}
     - GPU Preference: ${data.weight}
     - RAM Capacity: ${data.age}GB
     - CPU Preference: ${data.gender}
     - SSD Storage: ${data.activity}GB
     - HDD Storage: ${data.water}GB
     
     Please provide detailed recommendations for a computer setup that matches these specifications. Include specific models if possible, potential upgrades to consider, and any compatibility issues to be aware of. Also suggest what types of tasks (gaming, video editing, programming, etc.) this configuration would be best suited for.`,
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
