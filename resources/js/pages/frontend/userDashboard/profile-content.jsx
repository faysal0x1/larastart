import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Edit3, Package, Truck, CheckCircle, MapPin, Phone, Mail, Calendar, User } from "lucide-react"

export function ProfileContent() {
  const recentOrders = [
    {
      id: "#ORD-2024-001",
      date: "2024-01-15",
      status: "Delivered",
      total: "$129.99",
      items: 2,
      statusColor: "bg-green-500",
    },
    {
      id: "#ORD-2024-002",
      date: "2024-01-12",
      status: "In Transit",
      total: "$89.50",
      items: 1,
      statusColor: "bg-blue-500",
    },
    {
      id: "#ORD-2024-003",
      date: "2024-01-08",
      status: "Processing",
      total: "$245.00",
      items: 3,
      statusColor: "bg-yellow-500",
    },
  ]

  return (
    <main className="flex-1 p-6">
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Account Details</h1>
            <p className="text-muted-foreground mt-1">Manage your personal information and account preferences</p>
          </div>
          <Button className="gap-2">
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Your basic account information and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Sarah" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Johnson" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input id="email" defaultValue="sarah.johnson@email.com" />
                  <Badge variant="secondary">Verified</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthdate">Date of Birth</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input id="birthdate" type="date" defaultValue="1990-05-15" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">47</p>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">$2,847</p>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Truck className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">3</p>
                    <p className="text-sm text-muted-foreground">In Transit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Recent Orders
              </CardTitle>
              <CardDescription>Your latest purchase history and order status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={order.id}>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${order.statusColor}`} />
                        <div>
                          <p className="font-medium text-foreground">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.date} • {order.items} {order.items === 1 ? "item" : "items"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{order.total}</p>
                        <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>{order.status}</Badge>
                      </div>
                    </div>
                    {index < recentOrders.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Orders
              </Button>
            </CardContent>
          </Card>

          {/* Default Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Default Shipping Address
              </CardTitle>
              <CardDescription>Your primary delivery address for orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="font-medium text-foreground">Sarah Johnson</p>
                <p className="text-muted-foreground">123 Main Street, Apt 4B</p>
                <p className="text-muted-foreground">New York, NY 10001</p>
                <p className="text-muted-foreground">United States</p>
              </div>
              <Button variant="outline" className="mt-4 bg-transparent">
                Manage Addresses
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
