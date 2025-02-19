import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { signIn } from "@/redux/user/userAsync"
import { toast } from "@/hooks/use-toast"
import { danger, success } from "@/lib/toastClass"
import { RejectedPayload } from "@/types"
import BtnSpinner from "@/components/BtnSpinner"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
})

export default function SignIn() {
    const navigate = useNavigate();
    const {isAuthLoading} = useSelector((state : RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(signIn({data : values})).unwrap().then((res) =>{
        toast({
          title : res.message,
          className : success
        });
        if (res.data.user.role === "admin" && !res.data.user.estate) {
          navigate('/estate-setup')}
          else{
            setTimeout(() =>{
              navigate('/d')
          }, 1000);
          }
      
    })
    .catch((error: RejectedPayload) => {
      toast({
          title: "Error",
          description: error.message,
          className: danger,
      });
  });
  }

  return (
    <div className=" h-svh w-full flex justify-center items-center">
         <Card className="w-[350px] shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
        <CardDescription>Access your e-statement account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 transition-colors"
              disabled={isAuthLoading}
            >
            {isAuthLoading ? <BtnSpinner /> : "Sign in"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <Button variant="link" className="text-sm text-gray-600 hover:text-blue-600">
          Forgot password?
        </Button>
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a className="text-blue-600 hover:underline" onClick={() => navigate("/register")}>
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
    </div>
   
  )
}

