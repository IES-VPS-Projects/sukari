"use client"

import { MarkdownFormatter } from "@/lib/markdown-formatter"
import ReactMarkdown from 'react-markdown'

export default function TestMarkdown() {
  const testResponse = MarkdownFormatter.formatResponse({
    query: "What is the total sugar production in Kenya?",
    answer: "Based on the latest data from the Kenya Sugar Board, the total sugar production in Kenya for 2024 is approximately 2.5 million tons. This represents a significant increase from previous years due to improved farming practices and favorable weather conditions.",
    analysis_type: "data_analysis",
    agents_used: ["data_analyst", "supervisor"],
    source_urls: [
      "https://www.kenyasugarboard.co.ke/production-data",
      "https://www.trade.go.ke/sugar-statistics"
    ],
    data_insights: "Production has increased by 15% compared to 2023, with the National factory leading production at 40% of total output.",
    research_findings: "Recent policy changes have encouraged increased production through subsidies and improved infrastructure."
  });

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Markdown Formatter Test</h1>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <ReactMarkdown 
          components={{
            p: ({children}) => (
              <p className="mb-4 last:mb-0 text-base leading-[1.6] font-sans">
                {children}
              </p>
            ),
            h1: ({children}) => (
              <h1 className="text-2xl font-bold mb-6 mt-8 first:mt-0 text-gray-900 border-b border-gray-200 pb-2">
                {children}
              </h1>
            ),
            h2: ({children}) => (
              <h2 className="text-xl font-bold mb-4 mt-6 first:mt-0 text-gray-800">
                {children}
              </h2>
            ),
            h3: ({children}) => (
              <h3 className="text-lg font-semibold mb-3 mt-5 first:mt-0 text-gray-700">
                {children}
              </h3>
            ),
            ul: ({children}) => (
              <ul className="list-disc list-inside mb-4 space-y-2 font-sans">
                {children}
              </ul>
            ),
            ol: ({children}) => (
              <ol className="list-decimal list-inside mb-4 space-y-2 font-sans">
                {children}
              </ol>
            ),
            li: ({children}) => (
              <li className="text-base leading-[1.6] font-sans">
                {children}
              </li>
            ),
            strong: ({children}) => (
              <strong className="font-semibold text-base leading-[1.6] font-sans">
                {children}
              </strong>
            ),
            em: ({children}) => (
              <em className="italic text-base leading-[1.6] font-sans">
                {children}
              </em>
            ),
            code: ({children}) => (
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            ),
            pre: ({children}) => (
              <pre className="bg-gray-100 p-3 rounded text-sm font-mono overflow-x-auto mb-4 border border-gray-200">
                {children}
              </pre>
            ),
            blockquote: ({children}) => (
              <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-4 text-base leading-[1.6] font-sans bg-blue-50 py-2 rounded-r">
                {children}
              </blockquote>
            ),
            a: ({href, children}) => (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {children}
              </a>
            ),
            hr: () => (
              <hr className="my-6 border-gray-300" />
            ),
          }}
        >
          {testResponse}
        </ReactMarkdown>
      </div>
    </div>
  );
}


