import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

export default function BulkCallForPrice({ data, setData }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Label className="text-base font-medium">Call for Price</Label>
                        <Tooltip>
                            <TooltipTrigger>
                                <Info className="h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Enable to hide price and show "Call for Price" instead.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        When enabled, the product price will be hidden and replaced with "Call for Price" text.
                    </p>
                </div>
                <Switch
                    checked={data.call_for_price || false}
                    onCheckedChange={(checked) => setData('call_for_price', checked)}
                />
            </div>
        </div>
    );
}
