import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function generateFiles() {
    try {
        // Get model information
        const modelName = await question('Enter model name (e.g., country): ');
        const modelNameCapitalized = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        const modelNameLowercase = modelName.charAt(0).toLowerCase() + modelName.slice(1);
        const modelNamePlural = modelName + 's';

        const resourceName = await question('Enter resource name (e.g., countries): ');

        // Get fields information
        console.log('\nEnter fields for the model (press Enter twice when done):');
        const fields = [];
        while (true) {
            const fieldName = await question('Field name (or press Enter to finish): ');
            if (!fieldName) break;

            const fieldLabel = await question('Field label: ');
            const fieldType = await question('Field type (text, number, select, etc.): ');
            const isRequired = (await question('Is required? (y/n): ')).toLowerCase() === 'y';

            fields.push({
                name: fieldName,
                label: fieldLabel,
                type: fieldType,
                required: isRequired,
            });
        }

        // Generate index.jsx
        const indexContent = generateIndexFile(modelName, resourceName, modelNameCapitalized, modelNameLowercase, fields);
        // Generate create.jsx
        const createContent = generateCreateFile(modelName, resourceName, modelNameCapitalized, modelNameLowercase, fields);
        // Generate show.jsx
        const showContent = generateShowFile(modelName, modelNameCapitalized, modelNameLowercase, fields);
        // Generate edit.jsx
        const editContent = generateEditFile(modelName, resourceName, modelNameCapitalized, modelNameLowercase, fields);

        // Create directory if it doesn't exist
        const dirPath = path.join('resources', 'js', 'pages', modelName);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Write files
        fs.writeFileSync(path.join(dirPath, 'index.jsx'), indexContent);
        fs.writeFileSync(path.join(dirPath, 'create.jsx'), createContent);
        fs.writeFileSync(path.join(dirPath, 'show.jsx'), showContent);
        fs.writeFileSync(path.join(dirPath, 'edit.jsx'), editContent);

        console.log(`\nFiles generated successfully in ${dirPath}`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        rl.close();
    }
}

function generateIndexFile(modelName, resourceName, modelNameCapitalized, modelNameLowercase, fields) {
    const columns = fields
        .map((field) => {
            if (field.type === 'boolean') {
                return `createToggleColumn('${field.name}', '${field.label}', '${field.name}.update', {
            confirmMessage: 'Are you sure you want to change the ${field.name} for this ${modelName}?',
            successMessage: '${field.name} updated successfully',
            errorMessage: 'Failed to update ${field.name}',
            modelType: '${modelName}',
        })`;
            }
            return `column('${field.name}', '${field.label}', (item) => <div className="font-medium">{item.${field.name}}</div>)`;
        })
        .join(',\n        ');

    return `// resources/js/Pages/${modelName}/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn, createToggleColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function ${modelNameCapitalized}() {
    const { ${modelNameLowercase}, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: '${modelNameCapitalized}',
            href: '/${resourceName}',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        ${columns},
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                routes={{
                    view: (id) => route('${resourceName}.show', id),
                    edit: (id) => route('${resourceName}.edit', id),
                    delete: (id) => route('${resourceName}.destroy', id),
                }}
            />
        )),
    ];

    return (
        <ListingPage
            title="${modelNameCapitalized}"
            data={${modelName}}
            filters={filters}
            currentUser={auth.user}
            resourceName="${resourceName}"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New ${modelNameCapitalized}"
        />
    );
}`;
}

function generateCreateFile(modelName, resourceName, modelNameCapitalized, modelNameLowercase, fields) {
    const formFields = fields.map((field) => ({
        name: field.name,
        label: field.label,
        type: field.type,
        placeholder: `Enter ${modelNameCapitalized} ${field.name}`,
        required: field.required,
    }));

    return `import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;
    const permissionOptions = permissions.map((permission) => ({
        label: permission.name,
        value: permission.name
    }));
    
    const fields = ${JSON.stringify(formFields, null, 8)};
    
    const breadcrumbs = [
        {
            title: 'Create ${modelNameCapitalized}',
            href: '/${modelName}'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create ${modelNameCapitalized}" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New ${modelNameCapitalized}"
                        description="Add a new ${modelName}"
                        initialData={{
                            ${fields.map((f) => `${f.name}: ''`).join(',\n                            ')}
                        }}
                        fields={fields}
                        submitUrl="${resourceName}"
                        submitLabel="Create New ${modelNameCapitalized}"
                        successMessage="${modelNameCapitalized} created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}`;
}

function generateShowFile(modelName, modelNameCapitalized, modelNameLowercase, fields) {
    return `import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function show() {
    const { ${modelNameLowercase} } = usePage().props;

    return (
        <AppLayout>
            <Head title="${modelNameCapitalized} Details" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Add your show page content here */}
                </div>
            </div>
        </AppLayout>
    );
}`;
}

function generateEditFile(modelName, resourceName, modelNameCapitalized, modelNameLowercase, fields) {
    const formFields = fields.map((field) => ({
        name: field.name,
        label: field.label,
        type: field.type,
        placeholder: `Enter ${modelNameCapitalized} ${field.name}`,
        required: field.required,
    }));

    return `import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { ${modelNameLowercase}, permissions, auth } = usePage().props;
    const permissionOptions = permissions.map((permission) => ({
        label: permission.name,
        value: permission.name
    }));
    
    const fields = ${JSON.stringify(formFields, null, 8)};
    
    const breadcrumbs = [
        {
            title: 'Edit ${modelNameCapitalized}',
            href: '/${modelName}',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit ${modelNameCapitalized}" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit ${modelNameCapitalized}"
                        description="Update ${modelName} information"
                        initialData={${modelNameLowercase}}
                        fields={fields}
                        submitUrl={\`${resourceName}/\${${modelNameLowercase}.id}\`}
                        submitLabel="Update ${modelNameCapitalized}"
                        successMessage="${modelNameCapitalized} updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}`;
}

generateFiles();
