import React from "react";
import { Input, Card, Button } from "../components/ui/index.js";
import { useForm } from "react-hook-form"

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const response = await fetch(import.meta.env.VITE_HOST + "signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(data)
    })
    const result = await response.json();
    console.log(result);
  });

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h3 className="text-2xl font-bold">Register</h3>
        <form onSubmit={onSubmit}>
          <Input placeholder="Enter your username" type="text" {...register("username",{
            required: true
          })}/>
          {
            errors.username && <span className="text-red-500">The username is required</span>
          }
          <Input placeholder="Enter your email" type="email" {...register("email", {
            required: true
          })}/>
           {
            errors.email && <span className="text-red-500">The email is required</span>
          }
          <Input placeholder="Enter your password" type="password" { ...register("password", {
            required: true
          })}/>
           {
            errors.password && <span className="text-red-500">The password is required</span>
          }
          <Button>
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;
