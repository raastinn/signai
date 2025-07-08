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
    statusColor = "text-red-500";
    statusText = `Input must be less than ${props.charLimit} characters.`;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!props.isLoading && checkPrompt) {
          props.onSubmit();
        }
      }}
    >
      <div className="mb-6 mx-4 text-slate-50 text-base font-light">
        <p>
          Tell me your brand and I will generate branding and keywords for you.
        </p>
      </div>
      <input
        className="p-2 w-full rounded-md focus:outline-teal-500 focus:outline text-slate-700"
        type="text"
        required={true}
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
        className="bg-gradient-to-r from-indigo-200 via-indigo-300 to-sky-300 hover:opacity-70
            transition-all duration-300 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        disabled={props.isLoading || !checkPrompt}
      >
        Submit
      </button>
    </form>
  );
}
