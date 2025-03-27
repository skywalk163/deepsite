import classNames from "classnames";
import { useRef } from "react";
import { TbReload } from "react-icons/tb";

function Preview({
  html,
  isResizing,
  isAiWorking,
  ref,
}: {
  html: string;
  isResizing: boolean;
  isAiWorking: boolean;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleRefreshIframe = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const content = iframe.srcdoc;
      iframe.srcdoc = "";
      setTimeout(() => {
        iframe.srcdoc = content;
      }, 10);
    }
  };

  return (
    <div
      ref={ref}
      className="w-full border-l border-gray-900 bg-white h-[calc(100dvh-54px)] relative"
    >
      <iframe
        ref={iframeRef}
        title="output"
        className={classNames("w-full h-full select-none", {
          "pointer-events-none": isResizing || isAiWorking,
        })}
        srcDoc={html}
      />
      <button
        className="bg-gray-900 shadow-md text-white text-sm font-medium absolute bottom-5 right-5 py-2 px-4 rounded-lg flex items-center gap-2 border border-gray-800 hover:brightness-150 transition-all duration-100 cursor-pointer"
        onClick={handleRefreshIframe}
      >
        <TbReload />
        Refresh Preview
      </button>
    </div>
  );
}

export default Preview;
