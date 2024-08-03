import { memo } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"


function MarkdownRenderer({ markdown } : { markdown: string }) {

    return (
        <ReactMarkdown className={'markdown w-full h-full overflow-auto overflow-x-clip bg-default-100 rounded-xl p-5'}
           components={{
            a: ({node, ...props}) => <a target="_blank" href={props.href} className="text-blue-500" rel="noreferrer" {...props} />,
            table: ({children}) => (
              <table className="w-full border border-gray-400 border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    {/* You can add table headers here if needed */}
                  </tr>
                </thead>
                <tbody>{children}</tbody>
              </table>
            ),
            tr: ({ children }) => (
              <tr className="">{children}</tr>
            ),
            th: ({ children }) => (
              <th className="px-4 py-2 border border-default-500 text-left">{children}</th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-2 border border-default-500">{children}</td>
            ),
          }}
           remarkPlugins={[remarkGfm]}>
            {markdown}
          </ReactMarkdown>
    )
}

export default memo(MarkdownRenderer)