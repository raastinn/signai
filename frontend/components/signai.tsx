import React from "react";
import Form from "./form";
import Results from "./results";
import { useState } from "react";

const CHAR_LIMIT: number = 32;

export default function Signai() {
  const URL: string =
    "https://nxhxljeglj.execute-api.us-east-1.amazonaws.com/prod/generate_branding_and_keywords";
  const [prompt, setPrompt] = useState("");
  const [branding, setBranding] = useState("");
  const [keywords, setKeywords] = useState("");
  const [hasResult, setHasResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit() {
    console.log("Submitting: " + prompt);
    console.log(branding);
    setIsLoading(true);
    fetch(`${URL}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(onResult);
  }

  function onResult(data: any) {
    setBranding(data.branding);
    setKeywords(data.keywords);
    setHasResult(true);
    setIsLoading(false);
  }

  function onReset() {
    setPrompt("");
    setHasResult(false);
    setIsLoading(false);
  }

  const displayedElement = hasResult ? (
    <Results
      prompt={prompt}
      branding={branding}
      keywords={keywords}
      onBack={onReset}
    />
  ) : (
    <Form
      prompt={prompt}
      setPrompt={setPrompt}
      onSubmit={onSubmit}
      isLoading={isLoading}
      charLimit={CHAR_LIMIT}
    />
  );

  const gradientTextStyle =
    "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto";

  return (
    <>
      <div className="h-screen flex">
        <div className="max-w-md m-auto p-2">
          <div className="bg-gray-800 p-8 rounded-md text-white shadow-xl">
            <div className="text-center m-10">
              <img className="mx-auto" src="https://i.imgur.com/4OTXe9I.png" width={200} />
              <div className={gradientTextStyle}>
                Your AI Branding Assistant
              </div>
            </div>
            {displayedElement}
          </div>
          <div className="justify-center flex space-between text-gray-700 text-sm my-3 font-light">
            <div>project by </div>
            <a
              href="https://github.com/raastinn/signai"
              target="_blank"
              className="transition ease-in-out font-light delay-200 text-gray-200 focus:ring-4 focus:ring-blue-300 rounded-md text-xs px-1.5 py-0.5 ml-1.5 mb-1 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none"
            >
              raastinn
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
