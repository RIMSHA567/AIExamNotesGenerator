// ================================
// Function: buildPrompt (UPDATED)
// Purpose: AI ko bohot detailed, exam-focused notes generate karne ka instruction dena
// ================================
export const buildPrompt = ({
  topic,
  classlevel,
  examType,
  revisionMode = false,
  includeDiagram = false,
  includeChart = false,
}) => {
  return `
Generate highly detailed, exam-focused notes for the following topic.

INPUT:
Topic: ${topic}
Class Level: ${classlevel || "Not specified"}
Exam Type: ${examType || "General"}
Revision Mode: ${revisionMode ? "ON" : "OFF"}
Include Diagram: ${includeDiagram ? "YES" : "NO"}
Include Charts: ${includeChart ? "YES" : "NO"}

GLOBAL RULES:
- Use clear, simple, exam-oriented language
- Notes MUST be in Markdown format
- Include headings, sub-headings, bullet points, and examples
- Avoid storytelling or irrelevant information
- Every heading MUST have at least 2-5 subpoints or examples
- Include exam tips or common pitfalls where relevant

REVISION MODE RULES:
IF REVISION MODE IS ON:
- Provide very short notes
- Only bullet points
- One-line definitions and formulas
- Include keywords and last-minute exam tips
- Summarize ALL important facts under "revisionPoints"

IF REVISION MODE IS OFF:
- Provide DETAILED notes
- Each main topic must include:
  1. Definition
  2. Explanation
  3. Examples (if applicable)
  4. Exam tips (if relevant)
- Paragraphs max 24 lines
- Each sub-topic must have structured bullets
- Use clear Markdown headings (h1, h2, h3)

IMPORTANCE:
- Divide sub-topics into 3 categories based on exam relevance:
  - Very Important Topics (★)
  - Important Topics (★★)
  - Frequently Asked Topics (★★★)
- Provide at least 2-5 subtopics per category

DIAGRAM RULES:
IF INCLUDE DIAGRAM IS YES:
- diagram.data MUST contain VALID Mermaid syntax only
- Must start with: graph TD
- Wrap all node labels in square brackets []
- Keep labels simple and exam-relevant

CHART RULES:
IF INCLUDE CHARTS IS YES:
- charts array MUST include at least 1 chart
- Chart type based on topic:
  - THEORY → bar or pie
  - PROCESS → bar or line
- Data must be numeric and exam-focused
- Use concise labels and titles

JSON FORMAT (STRICT):
{
  "subTopics": {
    "★": ["string with subtopic detail and points"],
    "★★": ["string with subtopic detail and points"],
    "★★★": ["string with subtopic detail and points"]
  },
  "Importance": "string describing overall importance in exam",
  "notes": "string with detailed Markdown notes including headings, subheadings, bullets, examples, exam tips",
  "revisionPoints": ["bullet point summary of all key facts, definitions, formulas, keywords"],
  "questions": {
    "short": ["5-10 short exam questions related to topic"],
    "long": ["3-5 long exam questions with sub-parts if needed"]
  },
  "diagram": {
    "type": "Flowchart | Graph | Process",
    "data": "Mermaid syntax string"
  },
  "charts": [
    {
      "type": "bar | line | pie",
      "title": "string",
      "data": [{"name": "string", "value": 10}]
    }
  ]
}

RETURN ONLY VALID JSON WITHOUT EXTRA TEXT.
Make the notes extremely detailed and structured for exam preparation.
`;
};
