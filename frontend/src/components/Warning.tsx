import { useNavigate } from "react-router-dom";

interface WarningProps {
  label: string;
  buttonText: string;
  to: string;
}

export function Warning({ label, buttonText, to }: WarningProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="pt-3 pb-6 text-sm flex justify-center">
      <div className="text-slate-400">
        {label}
        <button
          className="cursor-pointer pl-2 underline text-slate-400"
          onClick={() => navigate(to)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
