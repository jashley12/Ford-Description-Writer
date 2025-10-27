import { GoogleGenAI } from "@google/genai";
import { CLOSING_PARAGRAPHS } from '../constants';
import { VehicleType } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateDescription = async (existingContent: string, vehicleType: VehicleType): Promise<string> => {
  const isNew = vehicleType === 'new';

  const title = isNew ? "for brand-new Ford vehicles" : "for pre-owned vehicles at Bob Tomes Ford";
  
  const focusPoints = isNew
    ? `*   **Focus on 'New':** Emphasize that this is a factory-fresh vehicle. Highlight the latest model-year features, full factory warranty, advanced technology, and the unparalleled experience of being the first owner.`
    : `*   **Hook Opening & Key Data:** Immediately start with the most attractive selling points from the source text (e.g., "one-owner," "clean CARFAX," "low mileage"). Throughout the description, weave in specific data points like MPG, horsepower, or cargo capacity if they are available in the source text. These details are crucial for SEO and informed buyers.`;
  
  const keywords = isNew
    ? `*   **Primary Concepts:** "new car," "new truck," "new SUV," "new Ford."
        *   **Related Terms:** "new car for sale," "latest models," "factory warranty," "Ford dealership in McKinney."`
    : `*   **Semantic Variety & Fluidity:** Your primary goal is natural, fluid language. Instead of just listing keywords, weave them into the narrative. For example, instead of "We have used car sales and used truck sales," try "Whether you're looking for a family car or a capable truck, our sales team can help."
        *   **Primary Concepts:** "used car," "used truck," "used SUV."
        *   **Related Terms:** "pre-owned vehicle," "certified pre-owned," "quality used car," "reliable crossover," "crossover SUV," "quality used Ford SUV," "sport utility," "used car sales," "used truck sales," "Ford dealership in McKinney."
    *   **Strategic Placement:** Ensure "certified pre-owned" appears at least once, preferably in the opening or closing section to capture that specific search intent.`;

  const closingInstruction = isNew 
    ? `The description **MUST** end with the following condensed paragraph exactly as written, but you **MUST OMIT the final sentence 'All used cars may have dealer adds that affect the final price; call for details.'**. This is the ONLY call-to-action.`
    : `The description **MUST** end with the following condensed paragraph exactly as written, with no modifications. This is the ONLY call-to-action.`

  const prompt = `
    You are an expert automotive copywriter and SEO strategist specializing in creating highly effective vehicle descriptions ${title}. Your task is to **completely rewrite and enhance** the provided vehicle information into a new, professional, and compelling description that is optimized for both human readers and search engine crawlers (including LLMs).

    **PROVIDED VEHICLE INFORMATION TO REWRITE:**
    """
    ${existingContent}
    """

    **CRITICAL REWRITING INSTRUCTIONS:**

    **1. SEO & Keyword Strategy:**
    ${keywords}
    *   **Local SEO:** Naturally integrate mentions of the Dallas-Fort Worth area and surrounding cities like Allen, Richardson, Dallas, Fort Worth, Prosper, Frisco, Grapevine, Wylie, and Plano.
    *   **Competitive Positioning:** Where appropriate, frame the vehicle as an alternative to its main competitors. For example, for a Ford Explorer, you could mention it's a "compelling alternative to the Toyota Highlander or Kia Telluride." This helps capture users who are cross-shopping brands.
    *   **Avoid Stuffing:** Keyword usage must feel organic and contextually relevant. The goal is readability and authority, not robotic repetition.

    **2. Content Structure & Readability:**
    ${focusPoints}
    *   **Thematic Paragraphs:** Structure the main body into clear, thematic sections. For example, create distinct paragraphs for "Performance and Capability," "Interior Comfort and Technology," and "Safety and Peace of Mind."
    *   **Sentence Rhythm:** Create a natural and professional rhythm by varying sentence lengths. A mix of short, punchy sentences and more descriptive medium-length sentences is ideal. Avoid long, complex sentences or a monotonous series of short sentences. The flow must sound human and be highly scannable.
    *   **Avoid Redundancy:** Be ruthless in trimming repetition. Do not repeat descriptive words or phrases across different paragraphs. Keep the text crisp, fresh, and impactful.
    *   **Financing:** Mention that flexible financing options are available through Bob Tomes Ford.

    **3. Dealership & Formatting Rules:**
    *   **Character Limit:** The entire new description MUST be under 3,900 characters.
    *   **Dealership Information:** Seamlessly integrate "Bob Tomes Ford," the address "950 S Central Expy, McKinney, TX 75072," and the phone number "(214) 544-5000" into the description's body.
    *   **Tone:** Professional, engaging, and authoritative.
    *   **Exclusions:** Do not include any external sources, references, or links. The focus is 100% on Bob Tomes Ford. Do not use markdown formatting.

    **4. ABSOLUTE FINAL INSTRUCTION: THE CLOSING**
    *   Your generated description **MUST NOT** include any concluding paragraph or call-to-action of its own. Your final sentence should naturally lead into the boilerplate text below.
    *   ${closingInstruction}
        "${CLOSING_PARAGRAPHS}"

    Now, generate the complete, rewritten vehicle description based on all these instructions and the provided vehicle information.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating description:", error);
    return "An error occurred while generating the description. Please check the console for details.";
  }
};