import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { createEstate } from '@/redux/estate/estateAsync';
import BtnSpinner from '@/components/BtnSpinner';
import { toast } from '@/hooks/use-toast';
import { danger, success } from '@/lib/toastClass';
import { useNavigate } from 'react-router-dom';
import { RejectedPayload } from '@/types';

// Define the validation schema
const estateSchema = z.object({
  name: z.string()
    .min(2, 'Estate name must be at least 2 characters')
    .max(50, 'Estate name must not exceed 50 characters'),
  location: z.string()
    .min(5, 'Location must be at least 5 characters')
    .max(100, 'Location must not exceed 100 characters'),
});

// Infer TypeScript type from the schema
type EstateFormData = z.infer<typeof estateSchema>;

function SetUpEstate() {
    const dispatch = useDispatch<AppDispatch>();
    const {loading} = useSelector((state : RootState) => state.estate)
    const {userInfo} = useSelector((state : RootState) => state.user)
    const navigate = useNavigate()
  const form = useForm<EstateFormData>({
    resolver: zodResolver(estateSchema),
    defaultValues: {
      name: '',
      location: '',
    },
  });

  const onSubmit = async (data: EstateFormData) => {
    dispatch(createEstate({data,adminId : userInfo?.user._id as string })).unwrap().then((res) => {
        toast({
            title : res.message,
            className : success
        });
        setTimeout(() => {
            navigate('/d')
        }, 1000)
    })  .catch((err: RejectedPayload) => {
        if (err) {
            toast({
                title: "Failed!",
                description: ` ${err.message}`,
                className: danger,
            });
        }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Set Up Estate</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estate Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter estate name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter estate location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full"
                disabled={loading.create}
              >
                {loading.create ? <BtnSpinner />: 'Create Estate'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SetUpEstate;