import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { createUserAccount } from "@/lib/appwrite/api"
 


const SignUpForm = () => {

  const isLoading = false ;
  

  // 1. Defining the form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: "",
      email: '',
      password: '',
    },
  })
 
  // 2. Defining a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
     const newUser = await createUserAccount(values);

     console.log(newUser)
  }

  return (
    
        <Form {...form}>
          
          <div className = "sm:w-420 flex-center flex-col">

           <img src = "/assets/images/logo.png" alt = "logo "   width="250" />
           
          <h2 className="h2-bold md:h2-bold pt-5 sn:pt-12" >Create a new account</h2>
          {/* <p className="text-light-3 small-medium md:base-regular mt-2" >To use BizBridge enter your details</p> */}

      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type = "text" className= "shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type = "text" className= "shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type = "text" className= "shad-input" {...field} />
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
                <Input type = "password" className= "shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className = "shad-button_primary" >
          { isLoading ? (
            <div className = "flex centre gap-2">
             <Loader /> Loading...
            </div>
          ): "Sign Up"
          }
        </Button>

        <p className = "text-small-regular text-light-2 text-center mt-2">
          Already have an account? 
          <Link to = "/sign in" className = "text-primary-550 text-small-semibold ml-1">Log in</Link>
        </p>
        
      </form>
      </div>
    </Form>
    
  )
  }

export default SignUpForm
