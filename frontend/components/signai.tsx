import React from "react";
import Form from "./form";
import Results from "./results";
import { useState } from "react";
import Logo from "@/public/logo";

const CHAR_LIMIT: number = 32;

export default function Signai() {
  const brandingURL: string = "https://atcfwkecfi.execute-api.us-east-1.amazonaws.com/prod/generate_branding";
  const keywordsURL: string = "https://atcfwkecfi.execute-api.us-east-1.amazonaws.com/prod/generate_keywords"
  const [prompt, setPrompt] = useState("");
  const [branding, setBranding] = useState("");
  const [keywords, setKeywords] = useState("");
  const [hasResult, setHasResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit() {
    console.log("Submitting: " + prompt);
    console.log(branding);
    setIsLoading(true);

    const brandingPromise = fetch(`${brandingURL}?prompt=${prompt}`).then((res) => res.json());
    const keywordsPromise = fetch(`${keywordsURL}?prompt=${prompt}`).then((res) => res.json());

    // Use Promise.all to wait for both promises to resolve
    Promise.all([brandingPromise, keywordsPromise])
    .then(([brandingData, keywordsData]) => {

      // Call onResult function with the data
      onResult(brandingData, keywordsData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  function onResult(brandingData: any, keywordsData: any) {
    setBranding(brandingData.branding);
    setKeywords(keywordsData.keywords);
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
    "text-transparent bg-clip-text bg-gradient-to-r from-teal-100 to-indigo-200 font-light w-fit mx-auto";

  return (
    <>
      <div className="h-screen flex">
        <div className="max-w-md m-auto p-2">
          <div className="bg-gray-700/50 backdrop-blur-lg p-8 rounded-md text-white shadow-xl">
            <div className="text-center m-10">
              <div className="flex justify-center items-center gap-1 mb-2">
                <Logo />
                <p className='font-bold text-4xl -mt-2'>signai</p>
              </div>
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
