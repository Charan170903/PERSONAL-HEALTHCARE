import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  const data = await request.json();

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([
    `I'm looking for a PC recommendation with the following preferences:
     - Preferred Brand: ${data.height}
     - GPU Preference: ${data.weight}
     - RAM Capacity: ${data.age}GB
     - CPU Preference: ${data.gender}
     - SSD Storage: ${data.activity}GB
     - HDD Storage: ${data.water}GB

     Please provide detailed recommendations for a computer setup that matches these specifications. 
     Include specific models if possible, potential upgrades to consider, and any compatibility issues to be aware of.

     Then, at the end of your response, include a JSON object with technical specifications and give the heading as 'Technical Specifications'. The JSON must be formatted exactly as shown below, with numeric values only and NO COMMENTS:
     
     {
       "threadMark": number(also divide the result by 1000),
       "tdp": number,
       "powerperf": number,
       "cores": number,
       "year": number
     }
     
     IMPORTANT: The JSON must contain only the values without any comments or explanations. All values must be numbers (not strings), and the JSON must be properly formatted to be parseable.
    `,
  ]);

  const responseText = result.response.text();

  // Extract the JSON block from Gemini's response
  let specs = {};
  const jsonMatch = responseText.match(/\{[\s\S]*?\}/);

  try {
    if (jsonMatch) {
      specs = JSON.parse(jsonMatch[0]);
      console.log(specs);
    }
  } catch (e) {
    console.error("Failed to parse JSON from Gemini response:", e);
  }

  return NextResponse.json({
    result: responseText,
    specs,
    status: "success",
  });
}

export async function GET() {
  return NextResponse.json({
    status: "Working",
  });
}