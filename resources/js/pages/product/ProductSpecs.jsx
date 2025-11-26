import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { X, Plus, Info } from 'lucide-react';

export default function ProductSpecs({ data, setData, defaultEnabled = false }) {
    const [specsEnabled, setSpecsEnabled] = useState(defaultEnabled);
    const [specGroups, setSpecGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const [newSpecGroup, setNewSpecGroup] = useState('');
    const [selectedAttrId, setSelectedAttrId] = useState('');
    const [newSpecAttr, setNewSpecAttr] = useState('');
    const [createGroupName, setCreateGroupName] = useState('');
    const [createAttrName, setCreateAttrName] = useState('');
    const [newSpecValue, setNewSpecValue] = useState('');
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (specsEnabled) {
            fetch('/admin/specs/options')
                .then((res) => res.json())
                .then((groups) => setSpecGroups(groups));
        }
    }, [specsEnabled]);

    const validateForm = () => {
        const errors = {};

        // Check if we have at least one group option
        if (!selectedGroupId && !newSpecGroup.trim()) {
            errors.group = 'Please select a group or create a new one';
        }

        // Check if we have at least one attribute option
        if (!selectedAttrId && !newSpecAttr.trim()) {
            errors.attribute = 'Please select an attribute or create a new one';
        }

        // Check if value is provided
        if (!newSpecValue.trim()) {
            errors.value = 'Please enter a value';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const addSpecRow = () => {
        if (!validateForm()) return;

        const selectedGroup = specGroups.find((g) => String(g.id) === String(selectedGroupId));
        const groupName = (newSpecGroup || '').trim() || selectedGroup?.name;
        const selectedAttr = selectedGroup?.attributes.find((a) => String(a.id) === String(selectedAttrId));
        const attrName = (newSpecAttr || '').trim() || selectedAttr?.name;

        setData('specs', {
            ...(data.specs || {}),
            [groupName]: {
                ...(data.specs?.[groupName] || {}),
                [attrName]: newSpecValue,
            },
        });

        // Reset form
        setNewSpecAttr('');
        setNewSpecValue('');
        setFormErrors({});
    };

    const removeSpec = (groupName, attrName) => {
        const updated = { ...data.specs };
        delete updated[groupName][attrName];
        if (Object.keys(updated[groupName]).length === 0) delete updated[groupName];
        setData('specs', updated);
    };

    return (
        <Card className="border rounded-xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between bg-muted/30 rounded-t-xl">
                <CardTitle className="text-xl font-semibold">Product Specifications</CardTitle>
                <div className="flex items-center gap-3">
                    <Label htmlFor="specs-toggle" className="text-sm font-medium cursor-pointer">
                        {specsEnabled ? 'Enabled' : 'Disabled'}
                    </Label>
                    <div className="relative inline-flex items-center">
                        <input
                            id="specs-toggle"
                            type="checkbox"
                            className="absolute inset-0 w-11 h-6 opacity-0 cursor-pointer peer"
                            checked={specsEnabled}
                            onChange={(e) => setSpecsEnabled(e.target.checked)}
                            aria-label="Toggle product specifications"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                </div>
            </CardHeader>

            {specsEnabled && (
                <CardContent className="space-y-6 pt-6">
                    {/* Add New Spec */}
                    <div className="space-y-6 rounded-lg border p-5 bg-muted/10">
                        <div className="flex items-center gap-2">
                            <Plus className="h-5 w-5 text-blue-600" />
                            <h4 className="font-medium text-lg">Add New Specification</h4>
                        </div>

                        <div className="grid gap-5 md:grid-cols-1">
                            <div className="space-y-2">
                                <Label htmlFor="spec-group">Group</Label>
                                <Select
                                    onValueChange={(val) => {
                                        setSelectedGroupId(val);
                                        setNewSpecGroup('');
                                        setSelectedAttrId('');
                                        setNewSpecAttr('');
                                        setFormErrors({ ...formErrors, group: undefined });
                                    }}
                                    value={selectedGroupId}
                                >
                                    <SelectTrigger id="spec-group" className={formErrors.group ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Select or create group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {specGroups.map((g) => (
                                            <SelectItem key={g.id} value={g.id.toString()}>{g.name}</SelectItem>
                                        ))}
                                        <div className="p-2 border-t mt-2 space-y-2">
                                            <Label className="text-xs">Create new group</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Type group name"
                                                    value={createGroupName}
                                                    onChange={(e) => setCreateGroupName(e.target.value)}
                                                />
                                                <Button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const name = createGroupName.trim();
                                                        if (!name) return;
                                                        const tempId = `temp-group:${Date.now()}`;
                                                        setSpecGroups((prev) => ([
                                                            ...prev,
                                                            { id: tempId, name, attributes: [] },
                                                        ]));
                                                        setSelectedGroupId(tempId);
                                                        setNewSpecGroup('');
                                                        setSelectedAttrId('');
                                                        setNewSpecAttr('');
                                                        setCreateGroupName('');
                                                        setFormErrors({ ...formErrors, group: undefined });
                                                    }}
                                                    className="bg-blue-600 hover:bg-blue-700"
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                        </div>
                                    </SelectContent>
                                </Select>
                                {formErrors.group && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <Info className="h-3 w-3" /> {formErrors.group}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="spec-attribute">Attribute</Label>
                                <Select
                                    onValueChange={(val) => {
                                        setSelectedAttrId(val);
                                        setNewSpecAttr('');
                                        setFormErrors({ ...formErrors, attribute: undefined });
                                    }}
                                    value={selectedAttrId}
                                    disabled={!selectedGroupId}
                                >
                                    <SelectTrigger id="spec-attribute" className={formErrors.attribute ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Select or create attribute" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {specGroups.find((g) => String(g.id) === String(selectedGroupId))
                                            ?.attributes.map((a) => (
                                                <SelectItem key={a.id} value={a.id.toString()}>{a.name}</SelectItem>
                                            ))}
                                        <div className="p-2 border-t mt-2 space-y-2">
                                            <Label className="text-xs">Create new attribute</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Type attribute name"
                                                    value={createAttrName}
                                                    onChange={(e) => setCreateAttrName(e.target.value)}
                                                    disabled={!selectedGroupId}
                                                />
                                                <Button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const name = createAttrName.trim();
                                                        if (!name) return;
                                                        const tempAttrId = `temp-attr:${Date.now()}`;
                                                        setSpecGroups((prev) => prev.map((g) => {
                                                            if (String(g.id) !== String(selectedGroupId)) return g;
                                                            const existing = g.attributes || [];
                                                            return { ...g, attributes: [...existing, { id: tempAttrId, name }] };
                                                        }));
                                                        setSelectedAttrId(tempAttrId);
                                                        setNewSpecAttr('');
                                                        setCreateAttrName('');
                                                        setFormErrors({ ...formErrors, attribute: undefined });
                                                    }}
                                                    className="bg-blue-600 hover:bg-blue-700"
                                                    disabled={!selectedGroupId}
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                        </div>
                                    </SelectContent>
                                </Select>
                                {formErrors.attribute && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <Info className="h-3 w-3" /> {formErrors.attribute}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="spec-value">Value *</Label>
                                <Input
                                    id="spec-value"
                                    placeholder="Enter value"
                                    value={newSpecValue}
                                    onChange={(e) => {
                                        setNewSpecValue(e.target.value);
                                        if (e.target.value) setFormErrors({ ...formErrors, value: undefined });
                                    }}
                                    className={formErrors.value ? 'border-red-500' : ''}
                                />
                                {formErrors.value && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <Info className="h-3 w-3" /> {formErrors.value}
                                    </p>
                                )}
                            </div>
                        </div>

                        <Button type="button" onClick={(e) => { e.preventDefault(); addSpecRow(); }} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" /> Add Specification
                        </Button>
                    </div>

                    {/* Existing Specs */}
                    {Object.keys(data.specs || {}).length > 0 && (
                        <div className="space-y-5">
                            <h4 className="font-medium text-lg flex items-center gap-2">
                                <Info className="h-5 w-5 text-gray-500" />
                                Current Specifications
                            </h4>

                            {Object.entries(data.specs).map(([gName, attrs]) => (
                                <div key={gName} className="rounded-lg border p-5 bg-muted/5">
                                    <h4 className="mb-4 text-lg font-semibold border-b pb-2">{gName}</h4>
                                    <div className="space-y-4">
                                        {Object.entries(attrs).map(([aName, aVal]) => (
                                            <div key={aName} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-md bg-white border">
                                                <Label className="w-full sm:w-48 shrink-0 font-medium">{aName}</Label>
                                                <Input
                                                    className="flex-1"
                                                    value={aVal ?? ''}
                                                    onChange={(e) => setData('specs', {
                                                        ...data.specs,
                                                        [gName]: {
                                                            ...data.specs[gName],
                                                            [aName]: e.target.value,
                                                        },
                                                    })}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeSpec(gName, aName)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-100"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {Object.keys(data.specs || {}).length === 0 && (
                        <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/10 text-center">
                            <Info className="h-10 w-10 text-gray-400 mb-3" />
                            <h4 className="font-medium text-lg mb-1">No specifications added yet</h4>
                            <p className="text-gray-500 text-sm">Use the form above to add product specifications</p>
                        </div>
                    )}
                </CardContent>
            )}
        </Card>
    );
}
