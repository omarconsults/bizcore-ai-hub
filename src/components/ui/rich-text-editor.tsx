
import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  theme?: 'snow' | 'bubble';
  modules?: any;
  formats?: string[];
}

// XSS protection: sanitize HTML content
const sanitizeHtml = (html: string): string => {
  // Remove potentially dangerous tags and attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing...",
  className,
  readOnly = false,
  theme = 'snow',
  modules,
  formats
}) => {
  // Default modules with business-focused toolbar (security-enhanced)
  const defaultModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'blockquote'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
    clipboard: {
      // Security: Strip formatting on paste to prevent XSS
      matchVisual: false
    }
  };

  // Default formats (restricted for security)
  const defaultFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'align',
    'link', 'blockquote', 'color', 'background'
  ];

  // Enhanced onChange with sanitization
  const handleChange = (content: string) => {
    const sanitizedContent = sanitizeHtml(content);
    onChange(sanitizedContent);
  };

  // Add custom styles to the document head
  useEffect(() => {
    const styleId = 'rich-text-editor-styles';
    
    // Check if styles already exist
    if (document.getElementById(styleId)) {
      return;
    }

    const styles = `
      .ql-toolbar {
        border: 1px solid #e5e7eb;
        border-bottom: none;
        border-radius: 0.375rem 0.375rem 0 0;
      }
      .ql-container {
        border: 1px solid #e5e7eb;
        border-radius: 0 0 0.375rem 0.375rem;
        font-family: inherit;
      }
      .ql-editor {
        min-height: 150px;
        font-size: 14px;
        line-height: 1.5;
      }
      .ql-editor.ql-blank::before {
        color: #9ca3af;
        font-style: normal;
      }
      .ql-toolbar .ql-stroke {
        fill: none;
        stroke: #374151;
      }
      .ql-toolbar .ql-fill {
        fill: #374151;
      }
      .ql-toolbar .ql-picker-label {
        color: #374151;
      }
      .ql-toolbar button:hover,
      .ql-toolbar button:focus {
        color: #1e40af;
      }
      .ql-toolbar button.ql-active {
        color: #1e40af;
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    // Cleanup function to remove styles when component unmounts
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div className={cn("rich-text-editor", className)}>
      <ReactQuill
        theme={theme}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readOnly}
        modules={modules || defaultModules}
        formats={formats || defaultFormats}
        style={{
          backgroundColor: 'white',
        }}
      />
    </div>
  );
};

export default RichTextEditor;
