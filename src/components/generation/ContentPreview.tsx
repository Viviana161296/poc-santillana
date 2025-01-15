import React from 'react';

interface Props {
  content: string | null;
}

export function ContentPreview({ content }: Props) {
  if (!content) {
    return (
      <div className="h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500">
        Generated content will appear here
      </div>
    );
  }

  return (
    <div className="h-64 overflow-auto">
      <div className="prose prose-sm max-w-none">
        <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg">
          {content}
        </pre>
      </div>
    </div>
  );
}