'use client'

import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { TbExchange } from 'react-icons/tb'
import Link from 'next/link'
import { useChat } from 'ai/react'
import ReactMarkdown from 'react-markdown';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AwsToGcp = () => {

  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const lastMessage = messages[messages.length - 1];
  console.log(lastMessage)

  const handleDownload = () => {
    if (lastMessage) {
      // Create a new blob containing the content
      const blob = new Blob([lastMessage.content], { type: 'text/plain' });
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.href = url;
      a.download = 'main.tf'; // File name
      document.body.appendChild(a);
      
      // Trigger the download
      a.click();
      
      // Cleanup
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  }

  return (
    <div className=" dark:bg-gray-900">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-screen h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Terraform AWS to GCP Converter</h1>
      <Link href={'/gcp-to-aws'}>
        <div className='flex justify-start gap-2 items-center mb-4 text-muted-foreground font-semibold text-sm'>
            <TbExchange />
            <p className=''>GCP to AWS</p>
        </div>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="aws-terraform">
            AWS Terraform Code
          </label>
          <form onSubmit={handleSubmit}>
            <Textarea
              className="w-full h-[70vh] border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              id="aws-terraform"
              placeholder="Paste your GCP Terraform code here..."
              rows={10}
              onChange={handleInputChange}
              value={input}
            />
            <div className='flex gap-2 justify-end'>
              <div className="flex justify-end mt-4">
                <Button type='button'>Stop</Button>
              </div>
              <div className="flex justify-end mt-4">
                <Button type='submit' >Generate GCP Terraform Code</Button>
              </div>
            </div>
          </form>  
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="gcp-terraform">
            GCP Terraform Code
          </label>
          <div className='border border-gray-300 px-2 rounded-md min-h-[70vh]'>
          {lastMessage && (
              <SyntaxHighlighter language="terraform" style={tomorrow}>
                {lastMessage.content}
              </SyntaxHighlighter>
          )}
          </div>
          <div className="flex justify-end mt-4">
                <Button type='submit' onClick={handleDownload}>Download</Button>
          </div>
          
          {/* <Textarea
            className="w-full h-[70vh] border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
            id="gcp-terraform"
            placeholder="Your AWS Terraform code will be generated here..."
            readOnly
            rows={10}
          /> */}
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default AwsToGcp