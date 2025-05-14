import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import 'quill/dist/quill.snow.css';

export default function QuillEditor({ value, onChange, placeholder, disabled, className }) {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && editorRef.current && !quillRef.current) {
            import('quill').then(async ({ default: Quill }) => {
                // Dynamically import Quill plugins
                await Promise.all([import('quill-mention'), import('quill-image-resize-module'), import('quill-table')]);

                const Font = Quill.import('formats/font');
                Font.whitelist = ['sans-serif', 'serif', 'monospace', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida'];
                Quill.register(Font, true);

                // Initialize Quill
                const quill = new Quill(editorRef.current, {
                    modules: {
                        toolbar: [
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            [{ font: Font.whitelist }],
                            [{ size: ['small', false, 'large', 'huge'] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ color: [] }, { background: [] }],
                            [{ script: 'sub' }, { script: 'super' }],
                            [{ align: [] }],
                            [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
                            [{ indent: '-1' }, { indent: '+1' }],
                            ['blockquote', 'code-block'],
                            ['link', 'image', 'video'],
                            [{ direction: 'rtl' }],
                            ['clean'],
                            [{ table: {} }],
                        ],
                        imageResize: {
                            modules: ['Resize', 'DisplaySize'],
                        },
                        table: true,
                        mention: {
                            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
                            mentionDenotationChars: ['@'],
                            source: function (searchTerm, renderList) {
                                const values = [
                                    { id: 1, value: 'User 1' },
                                    { id: 2, value: 'User 2' },
                                    { id: 3, value: 'User 3' },
                                ];
                                const matches =
                                    searchTerm.length === 0
                                        ? values
                                        : values.filter((item) => item.value.toLowerCase().includes(searchTerm.toLowerCase()));
                                renderList(matches, searchTerm);
                            },
                        },
                        emoji: {
                            showTooltip: true,
                        },
                    },
                    placeholder: placeholder || 'Write something...',
                    readOnly: disabled,
                    theme: 'snow',
                });

                quillRef.current = quill;

                if (value) {
                    quill.clipboard.dangerouslyPasteHTML(value);
                }

                quill.on('text-change', () => {
                    const html = quill.root.innerHTML;
                    if (onChange && html !== value) {
                        onChange(html);
                    }
                });
            });
        }

        return () => {
            if (quillRef.current) {
                quillRef.current.off('text-change');
                quillRef.current = null;
            }
        };
    }, []);

    // Keep the editor updated when value prop changes externally
    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            quillRef.current.clipboard.dangerouslyPasteHTML(value || '');
        }
    }, [value]);

    return (
        <div className={cn('rich-text-editor', className)}>
            <div className="quill-container">
                <div ref={editorRef} className="min-h-60" />
            </div>
        </div>
    );
}
