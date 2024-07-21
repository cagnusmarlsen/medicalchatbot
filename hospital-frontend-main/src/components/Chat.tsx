/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Button } from "./ui/button"

export default function Component(props) {
  const [message, setMessage] = useState("")
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (message.trim() !== "") {
      <div className="flex justify-end">
        <div className="bg-blue-100 text-blue-800 p-2 rounded-lg">{message}</div>
      </div>
      setMessage("")
    }
  }
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }
  return (
    <div className="rounded-lg shadow-lg">
      <div className="flex justify-between bg-black text-white text-center py-2 rounded-t-lg"> 
        <div className="ml-auto">
            <Button variant="ghost" size="sm" onClick={props.toggle}>Close</Button>
        </div>
      </div>
      <div className="p-4 space-y-4 bg-white">
        <div className="flex justify-end">
          <div className="bg-blue-100 text-blue-800 p-2 rounded-lg">I have a question</div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="space-y-1">
            <p className="text-xs text-gray-500">John Newman</p>
            <div className="bg-gray-100 p-2 rounded-lg">
              <p>Sure thing!</p>
            </div>
            <div className="bg-gray-100 p-2 rounded-lg">
              <p>What is your question?</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end" />
      </div>
      <form onSubmit={handleSubmit} className="p-2 bg-gray-100 rounded-b-lg">
        <input
          type="text"
          placeholder="Enter your query..."
          className="w-full p-2 bg-white rounded-lg border border-gray-300"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  )
}