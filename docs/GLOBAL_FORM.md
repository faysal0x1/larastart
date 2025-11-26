# GlobalForm – Usage Guide

This document explains how to use the `GlobalForm` component, define fields, enable different layouts, and wire up submissions.

## Import

```jsx
import GlobalForm from '@/components/GlobalForm';
```

## Quick Start

```jsx
<GlobalForm
  title="Create Item"
  description="Add a new item"
  submitUrl="/admin/items"
  submitLabel="Create"
  initialData={{ name: '', price: '', start_at: '' }}
  fields={[
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true },
    { name: 'start_at', label: 'Start Date', type: 'date', required: false },
  ]}
/>
```

## Props

- `title` string: Card title
- `description` string: Card description
- `initialData` object: Inertia `useForm` initial state
- `fields` Field[]: Field configuration array (see Field types below)
- `sections` Section[]: For the `sectioned` layout
- `layoutType` 'single' | 'two-column' | 'sectioned' (default: 'single')
- `submitUrl` string: Endpoint to submit the form
- `method` 'post' | 'put' (default: 'post')
- `submitLabel` string (default: 'Submit')
- `cancelUrl` string | null
- `cancelLabel` string (default: 'Cancel')
- `onSuccess` function: Callback after successful submit
- `successMessage` string (default: 'Form submitted successfully!')

## Layouts

Choose one layout via `layoutType`:

- Single column
```jsx
<GlobalForm layoutType="single" fields={fields} ... />
```

- Two column
```jsx
<GlobalForm layoutType="two-column" fields={fields} ... />
```

- Sectioned (per-section titles, descriptions, and grids)
```jsx
const sections = [
  { title: 'Basic', description: 'Info', fields: ['name', 'code'], layout: 'grid', gridCols: 2 },
  { title: 'Limits', fields: ['limit', 'user_limit'], layout: 'grid', gridCols: 2 },
];

<GlobalForm layoutType="sectioned" sections={sections} fields={fields} ... />
```

Notes:
- `layout` inside a section supports 'grid' (with `gridCols`) or defaults to stacked.
- `fields` in a section are the `name` keys that correspond to definitions in the top-level `fields` prop.

## Field Types

Each field shares common keys:
- `name` string (required)
- `label` string
- `type` string (see below)
- `placeholder` string
- `required` boolean
- `className` string
- `disabled` boolean
- `helpText` string

Supported `type` values and extras:

- Text inputs: `text` | `email` | `password` | `number` | `tel` | `url`
  - Extras: `min`, `max`, `step`

- Text area: `textarea`
  - Extras: `rows`

- Rich text: `richtext`

- Select: `select`
  - Extras: `options: { label, value }[]`, `searchable: boolean`

- Multi-select: `multiselect`
  - Extras: `options: { label, value }[]`
  - The form stores an array of selected values

- Switch / Checkbox: `switch` | `checkbox`
  - Boolean values

- Radio: `radio`
  - Extras: `options: { label, value }[]`

- Date: `date`

- Image: `image`
  - Extras: `accept` (defaults to `image/*`)

### Select with Search
```jsx
{
  name: 'user_id',
  label: 'User',
  type: 'select',
  searchable: true,
  options: users.map(u => ({ label: u.name, value: u.id })),
}
```

### Multi-select
```jsx
{
  name: 'tags',
  label: 'Tags',
  type: 'multiselect',
  options: tagOptions, // [{ label, value }]
}
```

### Date
```jsx
{ name: 'start_at', label: 'Start At', type: 'date' }
```

### Image Upload
```jsx
{ name: 'thumbnail', label: 'Thumbnail', type: 'image', accept: 'image/*' }
```

## Handling PUT/Update
Set `method="put"`. The component will send a POST with `_method=PUT` for Laravel compatibility.

```jsx
<GlobalForm
  method="put"
  submitUrl={`/admin/items/${id}`}
  initialData={loadedItem}
  fields={fields}
/>
```

## Success & Errors
- On success, a toast is shown and `onSuccess` is called (if provided). For non-edit forms, input values reset.
- On error, a toast is shown and the form scrolls to the first error field. Inline errors render under the corresponding inputs.

## Example – Sectioned Coupon Form
```jsx
const fields = [
  { name: 'type', label: 'Type', type: 'select', options: couponType, required: true },
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'code', label: 'Code', type: 'text', required: true },
  { name: 'coupon_for', label: 'Coupon For', type: 'select', options: couponFor },
  { name: 'limit', label: 'Limit', type: 'number', required: true },
  { name: 'user_limit', label: 'User Limit', type: 'number', required: true },
  { name: 'discount_type', label: 'Discount Type', type: 'select', options: discountType, required: true },
  { name: 'discount', label: 'Discount', type: 'number', required: true },
  { name: 'max_discount', label: 'Max Discount', type: 'number' },
  { name: 'minimum_purchase', label: 'Minimum Purchase', type: 'number' },
  { name: 'start_at', label: 'Start', type: 'date', required: true },
  { name: 'end_at', label: 'End', type: 'date' },
];

const sections = [
  { title: 'Basic', description: 'Details', fields: ['type','title','code','coupon_for'], layout: 'grid', gridCols: 2 },
  { title: 'Limits', description: 'Usage limits', fields: ['limit','user_limit','minimum_purchase'], layout: 'grid', gridCols: 3 },
  { title: 'Discount', fields: ['discount_type','discount','max_discount'], layout: 'grid', gridCols: 3 },
  { title: 'Validity', fields: ['start_at','end_at'], layout: 'grid', gridCols: 2 },
];

<GlobalForm
  title="Create New Coupon"
  description="Add a new coupon"
  layoutType="sectioned"
  sections={sections}
  fields={fields}
  initialData={{
    type: '', title: '', code: '', coupon_for: '', limit: '', user_limit: '',
    discount_type: '', discount: '', max_discount: '', minimum_purchase: '',
    start_at: '', end_at: ''
  }}
  submitUrl="/admin/coupon"
  submitLabel="Create New Coupon"
  successMessage="Coupon created successfully!"
/>
```

## Extending: New Layouts
Layouts live in `resources/js/components/form-layouts/` and receive:
- `fields`, `sections` (for sectioned), and `renderFieldBlock(field)` to render the full field block (label, input, help, error).
You can add your own component and wire it in `GlobalForm` by extending the `layoutType` switch.

## Extending: New Field Types
Add a new case inside `renderField` in `GlobalForm.jsx`. Keep the signature consistent and use `setData(name, value)` to write to the form state. Reuse shared UI components for consistency.

## Notes
- The component uses Inertia `useForm` internally and sends `FormData` for compatibility with files.
- For PUT/PATCH, Laravel expects `_method` – handled automatically when `method="put"`.
- Searchable selects use a popover + command; non-searchable uses the standard select.
