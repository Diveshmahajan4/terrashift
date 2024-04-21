'use client'

import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { TbExchange } from 'react-icons/tb'
import Link from 'next/link'
import { Editor } from '@monaco-editor/react'

const AwsToGcp = () => {

  const [value, setValue] = useState<string | undefined>('');
  

  return (
    <div className=" dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-screen h-screen">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Terraform AWS to GCP Converter</h1>
        <Link href={'/gcp-to-aws'}>
          <div className='flex justify-start gap-2 items-center mb-4 text-muted-foreground font-semibold text-sm hover:underline'>
              <TbExchange />
              <p className=''>GCP to AWS</p>
          </div>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="aws-terraform">
              AWS Terraform Code
            </label>
            <div className='border  shadow'>
            <Editor height="70vh" theme="vs-dark" defaultLanguage="json" defaultValue="Paste your AWS Terraform code here..." value={value} onChange={(value) => setValue(value)}/>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="gcp-terraform">
              GCP Terraform Code
            </label>
            <div className=' border rounde-md shadow'>
            <Editor height="70vh" theme="vs-dark" defaultLanguage="HCL" defaultValue="Your GCP Terraform code will be generated here..." />
            </div>
            <div className="flex justify-end mt-4">
              <Button>Generate GCP Terraform Code</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AwsToGcp