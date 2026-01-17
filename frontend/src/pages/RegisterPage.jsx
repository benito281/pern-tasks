import React from "react";
import { Input, Card, Button } from "../components/ui/index.js";
import { useForm } from "react-hook-form"

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h3 className="text-2xl font-bold">Register</h3>
        <form onSubmit={onSubmit}>
          <Input placeholder="Enter your fullname" type="text" {...register("fullname",{
            required: true
          })}/>
          {
            errors.fullname && <span className="text-red-500">The fullname is required</span>
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
