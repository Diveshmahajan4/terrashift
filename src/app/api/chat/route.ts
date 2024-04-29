import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
 
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
 
export const dynamic = 'force-dynamic';

 // Constructing the prompt.
 const prompt = `
 Input: Terraform code for AWS infrastructure. This can include resources like EC2 instances, S3 buckets, security groups, etc.
 
 Output: Terraform code for GCP infrastructure replicating the functionality of the AWS code.
 The script should identify the corresponding GCP resources (e.g., Compute Engine for EC2, Cloud Storage for S3) and translate the configuration accordingly.
 
 Translation Rules:
 Identify the AWS resource type (e.g., aws_instance, aws_s3_bucket).
 Find the equivalent GCP resource type (e.g., google_compute_instance, google_storage_bucket).
 Map the AWS resource properties to their corresponding GCP properties.
 Handle any differences in property syntax or behavior between AWS and GCP.
 Preserve comments and variable references within the code.

 Just return the converted terraform code and nothing else.

 Code: 
 
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

export async function GET(){
    return "hello from chat"
}