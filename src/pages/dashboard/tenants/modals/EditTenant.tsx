import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
  import { ScrollArea } from "@/components/ui/scroll-area"
  import { useForm} from "react-hook-form"
  import { zodResolver } from "@hookform/resolvers/zod"
  import * as z from "zod"
  import { Row } from "@tanstack/react-table"
  import { UserInt } from "@/types"
  import { useEffect } from "react"
  
  const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required")
  })
  
  type UserFormData = z.infer<typeof userSchema>
  
  interface EditTenantProps {
    open: boolean,
    onClose: () => void,
    rowData: Row<UserInt["user"]>
  }
  
  export default function EditTenant({ open, onClose, rowData}: EditTenantProps) {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<UserFormData>({
      resolver: zodResolver(userSchema),
      
    })
  
    // Reset form when dialog opens with new data
    useEffect(() => {
      if (open) {
        reset({
          name: rowData.getValue("name") as string,
          email: rowData.getValue("email") as string,
          phone: rowData.getValue("phone") as string,
        })
      }
    }, [open, rowData, reset])
  
    const onSubmit = (data: UserFormData) => {
      onClose()
      console.log(data)
    }
  
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User Information</DialogTitle>
            <DialogDescription>
              Make changes to the user's information here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ScrollArea className="max-h-[60vh] pr-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Details</CardTitle>
                  <CardDescription>Basic user information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...register("name")} />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" {...register("phone")} />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Properties</CardTitle>
                  <CardDescription>Manage associated properties</CardDescription>
                </CardHeader>
              </Card>
            </ScrollArea>
            <div className="mt-4 flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    )
  }