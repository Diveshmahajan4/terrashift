'use client'

import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { TbExchange } from 'react-icons/tb'
import Link from 'next/link'
import { useChat } from 'ai/react'
import ReactMarkdown from 'react-markdown';

const AwsToGcp = () => {

  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const lastMessage = messages[messages.length - 1];

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
          <div className='border p-2'>
          {lastMessage && (
              <ReactMarkdown className="markdown">{lastMessage.content}</ReactMarkdown>
          )}
          </div>
          
          {/* <Textarea
            className="w-full h-[70vh] border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
            id="gcp-terraform"
            placeholder="Your AWS Terraform code will be generated here..."
            readOnly
            rows={10}
          /> */}
          {/* <div className="flex justify-end mt-4">
                <Button type='submit' >Generate GCP Terraform Code</Button>
          </div> */}
        </div>
      </div>
    </div>
  </div>
  )
}

export default AwsToGcp