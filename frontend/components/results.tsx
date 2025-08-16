interface ResultsProps {
  prompt: string;
  branding: string;
  keywords: string | string[];
  onBack: any;
}

export default function Results(props: ResultsProps) {
  const keywordElements = [];

  for (let i = 0; i < props.keywords.length; i++) {
    const element = (
      <div
        key={i}
        className="bg-slate-800 p-1 text-gray-300 px-2 text-sm rounded-md"
      >
        #{props.keywords[i]}
      </div>
    );
    keywordElements.push(element);
  }

  function resultsSection(label: string, body: any) {
    return (
      <div className="bg-neutral-400/10 p-4 my-3 rounded-md">
        <div className="text-slate-400 text-sm font-semibold bm-1">{label}</div>
        <div>{body}</div>
      </div>
    );
  }

  const keywordsHolder = (
    <div className="flex flex-wrap gap-2 my-2">{keywordElements}</div>
  );

  return (
    <>
      <div>
        {resultsSection(
          "Prompt",
          <div className="font-semibold">{props.prompt}</div>,
        )}
        {resultsSection("Branding", props.branding)}
        {resultsSection("Keywords", keywordsHolder)}
      </div>
      <button
        className="bg-lime
                disabled:opacity-50 w-full p-2 rounded-md text-lg text-gray-700"
        onClick={props.onBack}
      >
        Back
      </button>
    </>
  );
}
