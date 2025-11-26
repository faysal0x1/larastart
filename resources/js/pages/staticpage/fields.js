const BASE_PAGE_OPTIONS = [
    { value: 'return-policy', label: 'Return Policy' },
    { value: 'privacy-policy', label: 'Privacy & Security' },
    { value: 'terms-and-conditions', label: 'Terms & Conditions' },
];

const formatLabel = (slug) =>
    slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

export const getStaticPageFields = (providedOptions = [], currentSlug = '') => {
    const sourceOptions = providedOptions.length ? providedOptions : BASE_PAGE_OPTIONS;
    let pageOptions = [...sourceOptions];

    if (currentSlug && !pageOptions.some((option) => option.value === currentSlug)) {
        pageOptions.push({
            value: currentSlug,
            label: formatLabel(currentSlug),
        });
    }

    return [
        {
            name: 'slug',
            label: 'Page',
            type: 'select',
            required: true,
            options: pageOptions,
            onChange: ({ value, setData }) => {
                const option = pageOptions.find((opt) => opt.value === value);
                if (option) {
                    setData('title', option.label);
                }
            },
        },
        { name: 'title', label: 'Title', type: 'text', required: true, readOnly: true, helpText: 'Auto-filled based on selected page' },
        { name: 'summary', label: 'Summary', type: 'textarea', rows: 3 },
        { name: 'content', label: 'Content', type: 'richtext', required: true },
        { name: 'is_active', label: 'Active', type: 'switch' },
    ];
};

