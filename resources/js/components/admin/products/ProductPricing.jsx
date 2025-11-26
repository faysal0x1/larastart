import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

export default function ProductPricing({ data, setData }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Pricing &amp; Others</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label>Unit price (৳)</Label>
                        <Tooltip>
                            <TooltipTrigger>
                                <Info className="h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Set the selling price for each unit of this product.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Unit price"
                        value={data.unit_price}
                        onChange={(e) => setData('unit_price', e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label>Current stock qty</Label>
                        <Tooltip>
                            <TooltipTrigger>
                                <Info className="h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>
                                    {data.variations?.length > 0
                                        ? "Total stock is calculated from all variations automatically."
                                        : "Add the Stock Quantity of this product that will be visible to customers."}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Input
                        type="number"
                        min="0"
                        value={data.qty}
                        step="1"
                        placeholder="Quantity"
                        onChange={(e) => setData('qty', e.target.value)}
                        required
                        disabled={data.variations?.length > 0} // Disable input when variations exist
                        className={data.variations?.length > 0 ? "bg-gray-100" : ""}
                    />
                    {data.variations?.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                            Note: Stock quantity is automatically calculated from variations.
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label>Discount Type</Label>
                        <Tooltip>
                            <TooltipTrigger>
                                <Info className="h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>If 'Flat' discount amount will be set as fixed amount. If 'Percentage' discount amount will be set as percentage.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Select
                        value={data.discount_type}
                        onValueChange={(value) => setData('discount_type', value)}
                        required
                    >
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
                        <Tooltip>
                            <TooltipTrigger>
                                <Info className="h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add the discount amount in percentage or a fixed value here.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Input
                        type="number"
                        min="0"
                        value={data.discount_price}
                        step="0.01"
                        placeholder="Ex: 5"
                        onChange={(e) => setData('discount_price', e.target.value)}
                        required
                    />
                </div>

                {/* Call for Price Toggle */}
                <div className="space-y-2 md:col-span-2 lg:col-span-4">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="call_for_price"
                            checked={data.call_for_price || false}
                            onCheckedChange={(checked) => setData('call_for_price', checked)}
                        />
                        <div className="flex items-center gap-2">
                            <Label htmlFor="call_for_price">Call for Price</Label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Enable this to show "Call for Price" instead of displaying the actual price to customers.</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                    {data.call_for_price && (
                        <p className="text-sm text-muted-foreground">
                            When enabled, customers will see "Call for Price" instead of the product price.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
