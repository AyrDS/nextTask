import { useState } from "react"


const useForm = (formData = {}) => {
   const [formValues, setFormValues] = useState(formData);

   const handleChange = e => {
      setFormValues({
         ...formValues,
         [e.target.name]: e.target.value
      });
   }

   const resetForm = () => {
      setFormValues(formData);
   }

   return {
      formValues,
      ...formValues,
      resetForm,
      handleChange,
   }
}
export default useForm
