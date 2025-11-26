import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info } from 'lucide-react';

export default function BulkPricing({ data, setData }) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Label>Unit price (৳)</Label>
                    <Tooltip>
                        <TooltipTrigger>
                            <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Set the selling price for each unit.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <Input type="number" min="0" step="0.01" placeholder="Unit price" value={data.unit_price ?? ''} onChange={(e) => setData('unit_price', e.target.value)} />
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Label>Current stock qty</Label>
                    <Tooltip>
                        <TooltipTrigger>
                            <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add product stock quantity.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <Input type="number" min="0" step="1" placeholder="Quantity" value={data.qty ?? ''} onChange={(e) => setData('qty', e.target.value)} />
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Label>Discount Type</Label>
                    <Tooltip>
                        <TooltipTrigger>
                            <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Flat = fixed amount, Percent = percentage.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <Select value={data.discount_type || 'flat'} onValueChange={(v) => setData('discount_type', v)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select discount type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="flat">Flat</SelectItem>
                        <SelectItem value="percent">Percent</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Label>
                        Discount amount <span className="text-sm text-gray-500">({data.discount_type === 'flat' ? '৳' : '%'})</span>
                    </Label>
                </div>
                <Input type="number" min="0" step="0.01" placeholder="Ex: 5" value={data.discount_price ?? ''} onChange={(e) => setData('discount_price', e.target.value)} />
            </div>
        </div>
    );
}


