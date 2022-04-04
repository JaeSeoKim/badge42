import React, { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect } from "react";

export type CodeProps = {
  code: string;
};

const Code: React.FC<CodeProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);

  return (
    <div className="relative group">
      <div className="items-center bg-neutral-100 p-3 rounded overflow-y-hidden hover:overflow-y-auto">
        <code className="font-mono text-xs whitespace-nowrap">{code}</code>
      </div>
      <button className="hidden group-hover:block transition-colors absolute right-2 top-2 p-2 border shadow rounded bg-neutral-100 hover:bg-neutral-50">
        <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
          {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
        </CopyToClipboard>
      </button>
    </div>
  );
};

export default Code;
