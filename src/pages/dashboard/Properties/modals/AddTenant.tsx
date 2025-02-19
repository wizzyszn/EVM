import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Row } from "@tanstack/react-table"
import { Property, RejectedPayload } from "@/types"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { addTenant } from "@/redux/tenant/tenantAsync"
import { toast } from "@/hooks/use-toast"
import { danger, success } from "@/lib/toastClass"
import BtnSpinner from "@/components/BtnSpinner"

const userFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type UserFormData = z.infer<typeof userFormSchema>
type Props = {
    onClose : () => void,
    open : boolean,
    rowData : Row<Property> | null
}

export function AddTenant({
    onClose,
    open,
    rowData
}:Props) {
    const {userInfo} = useSelector((state : RootState) =>state.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
     
    },
  });
  const dispatch = useDispatch<AppDispatch>()
  const {loading } = useSelector((state : RootState) => state.tenant)
  const onSubmit = (data: UserFormData) => {
    //console.log(data)
    // Here you would typically send this data to your backend
    const refined =  {...data,
        propertyId : rowData?.original._id as string
    }
    dispatch(addTenant({data : refined, adminId : userInfo?.user._id as string})).unwrap().then((res) =>{
        toast({
            title : res.message,
            className : success
        });
        onClose();
    })
    .catch((err: RejectedPayload) => {
        if (err) {
            toast({
                title: "Failed!",
                description: ` ${err.message}`,
                className: danger,
            });
        }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Information</DialogTitle>
          <DialogDescription>Enter the user details here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full"
          disabled={loading.create}>
            {loading.create ? <BtnSpinner /> : "Add Tenant"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

