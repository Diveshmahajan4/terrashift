import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
 
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
 
export const dynamic = 'force-dynamic';

 // Constructing the prompt.
 const prompt = `
 Input: Terraform code for GCP infrastructure. This can include resources like Compute Engine instances, Cloud Storage buckets, VPC networks, etc.
 
 Output: Terraform code for AWS infrastructure replicating the functionality of the GCP code.
 The script should identify the corresponding AWS resources (e.g., EC2 instances, S3 buckets) and translate the configuration accordingly.
  
 Translation Rules:
 Identify the GCP resource type (e.g., google_compute_instance, google_storage_bucket).
 Find the equivalent AWS resource type (e.g., aws_instance, aws_s3_bucket).
 Map the GCP resource properties to their corresponding AWS properties.
 Handle any differences in property syntax or behavior between GCP and AWS.
 Preserve comments and variable references within the code.
 
 Just return the converted Terraform code and nothing else.
 
 `;
 
// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const buildGoogleGenAIPrompt = (messages: Message[]) => ({

  contents: messages
    .filter(message => message.role === 'user' || message.role === 'assistant')
    .map(message => ({
      role: message.role === 'user' ? 'user' : 'model',
      parts: [{ text: prompt+message.content }],
    })),
});
 
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();

  console.log(messages[messages.length -1].content)
 
  const geminiStream = await genAI
    .getGenerativeModel({ model: 'gemini-pro' })
    .generateContentStream(buildGoogleGenAIPrompt(messages));
 
  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(geminiStream);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}