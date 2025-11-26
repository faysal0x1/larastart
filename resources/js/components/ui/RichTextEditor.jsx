import { Editor } from '@tinymce/tinymce-react';

// Import TinyMCE locally to avoid CDN usage
import 'tinymce/tinymce'; // core
import 'tinymce/icons/default'; // icons
import 'tinymce/themes/silver'; // theme
import 'tinymce/models/dom'; // model

// Import TinyMCE skins
import 'tinymce/skins/ui/oxide/skin.css';
import 'tinymce/skins/content/default/content.css';

// Import plugins (only the ones you use)
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/accordion';
import 'tinymce/plugins/help';
import 'tinymce/plugins/save';
import { useRef } from 'react';

export default function RichTextEditor({
    value,
    onChange,
    placeholder = "Enter text...",
    height = 300,
    id,
    className = ""
}) {
    const editorRef = useRef(null);

    const handleEditorChange = (content) => {
        onChange(content);
    };

    return (
        <div className={className}>
            <Editor
                id={id}
                // apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                onInit={(evt, editor) => editorRef.current = editor}
                value={value || ''}
                onEditorChange={handleEditorChange}
                init={{
                    license_key: 'gpl',
                    height: height,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'wordcount',
                        'pagebreak', 'nonbreaking', 'directionality', 'codesample',
                        'emoticons', 'quickbars', 'autosave', 'autoresize', 'visualchars',
                        'importcss', 'accordion', 'help', 'save'
                    ],
                    toolbar: 'undo redo | blocks | fontfamily fontsize | ' +
                        'bold italic underline strikethrough subscript superscript | ' +
                        'forecolor backcolor | alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist outdent indent | blockquote codesample | ' +
                        'link image media table accordion | emoticons charmap | ' +
                        'hr pagebreak | searchreplace | visualblocks visualchars | ' +
                        'ltr rtl | code preview fullscreen | save | help | removeformat',
                    content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }',
                    placeholder: placeholder,
                    branding: false,
                    promotion: false,
                    statusbar: false,
                    resize: false,
                    skin: false,
                    content_css: false,
                    // Font size options
                    font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
                    // Font family options
                    font_family_formats: 'Arial=arial,helvetica,sans-serif; Times New Roman=times new roman,times,serif; Courier New=courier new,courier,monospace; Georgia=georgia,serif; Verdana=verdana,sans-serif; Comic Sans MS=comic sans ms,sans-serif; Impact=impact,sans-serif; Trebuchet MS=trebuchet ms,sans-serif; Tahoma=tahoma,sans-serif',
                    // Paste configuration (core feature)
                    paste_as_text: false,
                    paste_auto_cleanup_on_paste: true,
                    paste_remove_styles: false,
                    paste_remove_spans: false,
                    paste_strip_class_attributes: 'none',
                    paste_data_images: true,
                    // Auto-resize configuration
                    autoresize_bottom_margin: 16,
                    autoresize_overflow_padding: 16,
                    autoresize_on_init: true,
                    // Auto-save configuration
                    autosave_ask_before_unload: true,
                    autosave_interval: '30s',
                    autosave_retention: '2m',
                    autosave_prefix: '{path}{query}-{id}-',
                    autosave_restore_when_empty: false,
                    autosave_notification: false,
                    // Quickbars (context menu)
                    quickbars_selection_toolbar: 'bold italic | fontsize forecolor backcolor | quicklink h2 h3 blockquote quickimage quicktable',
                    quickbars_insert_toolbar: false, // Disabled to prevent hover toolbar on empty areas
                    // Code sample configuration
                    codesample_languages: [
                        { text: 'HTML/XML', value: 'markup' },
                        { text: 'JavaScript', value: 'javascript' },
                        { text: 'CSS', value: 'css' },
                        { text: 'PHP', value: 'php' },
                        { text: 'Ruby', value: 'ruby' },
                        { text: 'Python', value: 'python' },
                        { text: 'Java', value: 'java' },
                        { text: 'C', value: 'c' },
                        { text: 'C#', value: 'csharp' },
                        { text: 'C++', value: 'cpp' },
                        { text: 'SQL', value: 'sql' },
                        { text: 'JSON', value: 'json' },
                        { text: 'XML', value: 'xml' },
                        { text: 'Bash', value: 'bash' },
                        { text: 'Go', value: 'go' },
                        { text: 'TypeScript', value: 'typescript' }
                    ],
                    codesample_theme: 'default',
                    // Table advanced options
                    table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
                    table_resize_bars: true,
                    table_default_attributes: {
                        border: '1'
                    },
                    table_default_styles: {
                        'border-collapse': 'collapse',
                        'width': '100%'
                    },
                    // Image advanced options
                    image_advtab: true,
                    image_caption: true,
                    image_list: false,
                    image_title: true,
                    // Link advanced options
                    link_title: true,
                    link_target_list: [
                        { text: 'None', value: '' },
                        { text: 'New window', value: '_blank' },
                        { text: 'Same window', value: '_self' }
                    ],
                    // Custom formats
                    block_formats: 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6; Preformatted=pre; Blockquote=blockquote',
                    // Style formats
                    style_formats: [
                        {
                            title: 'Headings',
                            items: [
                                { title: 'Heading 1', format: 'h1' },
                                { title: 'Heading 2', format: 'h2' },
                                { title: 'Heading 3', format: 'h3' },
                                { title: 'Heading 4', format: 'h4' },
                                { title: 'Heading 5', format: 'h5' },
                                { title: 'Heading 6', format: 'h6' }
                            ]
                        },
                        {
                            title: 'Inline',
                            items: [
                                { title: 'Bold', icon: 'bold', format: 'bold' },
                                { title: 'Italic', icon: 'italic', format: 'italic' },
                                { title: 'Underline', icon: 'underline', format: 'underline' },
                                { title: 'Strikethrough', icon: 'strikethrough', format: 'strikethrough' },
                                { title: 'Superscript', icon: 'superscript', format: 'superscript' },
                                { title: 'Subscript', icon: 'subscript', format: 'subscript' },
                                { title: 'Code', icon: 'code', format: 'code' }
                            ]
                        },
                        {
                            title: 'Blocks',
                            items: [
                                { title: 'Paragraph', format: 'p' },
                                { title: 'Blockquote', format: 'blockquote' },
                                { title: 'Div', format: 'div' },
                                { title: 'Pre', format: 'pre' }
                            ]
                        },
                        {
                            title: 'Alignment',
                            items: [
                                { title: 'Left', icon: 'alignleft', format: 'alignleft' },
                                { title: 'Center', icon: 'aligncenter', format: 'aligncenter' },
                                { title: 'Right', icon: 'alignright', format: 'alignright' },
                                { title: 'Justify', icon: 'alignjustify', format: 'alignjustify' }
                            ]
                        }
                    ],
                    // Visual blocks and chars
                    visualblocks_default_state: false,
                    visualchars_default_state: false,
                    // Import CSS
                    importcss_append: true,
                    // Undo/Redo levels
                    undo_redo_levels: 50,
                    // Word count
                    wordcount_countregex: /[\w\u2019\'-]+/g,
                    // Setup function
                    setup: (editor) => {
                        editor.on('init', () => {
                            editor.getContainer().style.border = '1px solid #e2e8f0';
                            editor.getContainer().style.borderRadius = '6px';
                        });

                        // Add custom keyboard shortcuts
                        editor.addShortcut('ctrl+shift+s', 'Save content', () => {
                            // Trigger save if needed
                            console.log('Save shortcut pressed');
                        });
                    }
                }}
            />
        </div>
    );
}
