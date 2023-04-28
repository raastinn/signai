interface ResultsProps {
    prompt: string
    branding: string
    keywords: string[]
    onBack: any
}

const Results: React.FC<ResultsProps> = (props) => {

    const keywordElements = []
    for (let i = 0; i < props.keywords.length; i++) {
        const element = <div key={i} className="bg-teal-200 p-1 text-teal-800 px-2 text-sm rounded-md">#{props.keywords[i]}</div>
        keywordElements.push(element)
    }

    const resultsSection = (label: string, body: any) => {
        return (
            <div className="bg-slate-700 p-4 my-3 rounded-md">
                <div className="text-slate-500 text-sm font-bold bm-1">
                    {label}
                </div>
                <div>
                    {body}
                </div>
            </div>
        )
    }

    const keywordsHolder = <div className="flex flex-wrap gap-2 my-2">{keywordElements}</div>

    return (
        <>
            <div>
                {resultsSection("Prompt", <div className=" font-semibold">{props.prompt}</div>)}
                {resultsSection("Branding", props.branding)}
                {resultsSection("Keywords", keywordsHolder)}
            </div>
            <button
                className="bg-gradient-to-r from-teal-400 to-blue-500 
                disabled:opacity-50 w-full p-2 rounded-md text-lg" 
                onClick={props.onBack}
            >
                Back
            </button>
        </>
    )
}

export default Results