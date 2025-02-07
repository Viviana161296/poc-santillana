import React from "react";

interface Props {
  content: string | null;
}

// Función para reemplazar marcas de Amazon Bedrock con HTML + emojis y agregar saltos de línea
const formatContent = (text: string) => {
  if (!text) return "";

  return text
    .replace(/^#### (.*?)/gm, "<h3 class='text-lg font-bold'>$1</h3>") // Título #### Texto
    .replace(/^### (.*?)/gm, "<h3 class='text-lg font-bold'>$1</h3>") // Título ### Texto
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Negrita **texto**
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // Cursiva *texto*
    .replace(/__(.*?)__/g, "🔽 <u>$1</u>") // Subrayado __texto__
    .replace(/```(.*?)```/gs, "💻 <code>$1</code>") // Código ```texto```
    .replace(/^- (.*?)/gm, "📝 <li>$1</li>") // Elemento de lista - texto
    .replace(/^> (.*?)/gm, "🗨️ <blockquote>$1</blockquote>") // Cita > texto
    .replace(/\n/g, "<br />"); // Agregar saltos de línea adicionales
};

export function ContentPreview({ content }: Props) {
  if (!content) {
    return (
      <div className="h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500">
        Generated content will appear here
      </div>
    );
  }

  return (
    <div className="h-96 overflow-auto p-4 bg-gray-50 rounded-lg">
      <div
        className="prose prose-sm max-w-none font-mono"
        dangerouslySetInnerHTML={{ __html: formatContent(content) }}
      />
    </div>
  );
}
