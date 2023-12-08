interface FormProps {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  isLoading: boolean;
  charLimit: number;
}

export default function Form(props: FormProps) {
  const checkPrompt = props.prompt.length < props.charLimit;

  function updatePromptValue(text: string) {
    if (text.length <= props.charLimit) {
      props.setPrompt(text);
    }
  }

  let statusColor = "text-slate-500";
  let statusText = null;

  if (!checkPrompt) {
    statusColor = "text-red-400";
    statusText = `Input must be less than ${props.charLimit} characters.`;
  }

  return (
    <>
      <div className="mb-6 mx-4 text-slate-300 text-base font-light">
        <p>
          Tell me your brand and I will generate branding and keywords for you.
        </p>
      </div>
      <input
        className="p-2 w-full rounded-md focus:outline-teal-400 focus:outline text-slate-700"
        type="text"
        placeholder="fitness"
        value={props.prompt}
        onChange={(f) => updatePromptValue(f.currentTarget.value)}
      ></input>
      <div className={statusColor + " flex justify-between my-2 mb-6 text-sm"}>
        <div>{statusText}</div>
        <div>
          {props.prompt.length}/{props.charLimit}
        </div>
      </div>
      <button
        className="bg-gradient-to-r from-teal-400 to-blue-500 
            disabled:opacity-50 w-full p-2 rounded-md text-lg"
        onClick={props.onSubmit}
        disabled={props.isLoading || !checkPrompt}
      >
        Submit
      </button>
    </>
  );
}
