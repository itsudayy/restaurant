import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const AddItem = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  const [axiosSecure] = useAxiosSecure();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

  console.log(img_hosting_token);

  const onSubmit = (data) => {
    console.log(data.image[0]);
    const formData = new FormData()
    formData.append('image',data.image[0]) //append only one at a time
    fetch(img_hosting_url,{
      method:"POST",
      body:formData
    })
    .then(res=>res.json())
    .then(imgResponse =>{
      console.log(imgResponse)
      if(imgResponse.success){
        const imgURL = imgResponse.data.display_url
        const {name,recipe,category,price} = data
        const newItem = {name,recipe,category,price:parseFloat(price),image:imgURL}
        console.log(newItem)
        axiosSecure.post('/menu',newItem)
        .then(data =>{
          console.log(data.data)
          if(data.data.insertedId){
            reset()
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Item Upload Successfully",
              showConfirmButton: false,
              timer: 1200
            });
          }
        })
      }
    })

  };

  return (
    <div className="w-full">
      <SectionTitle
        subHeading={"What's new?"}
        heading={"Add An Item"}
      ></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-8">
        <label className="form-control w-full my-4">
          <div className="label">
            <span className="label-text">Recipe name*</span>
          </div>
          <input
            type="text"
            {...register("name", { required: true, maxLength: 120 })}
            placeholder="Recipe Name"
            className="input input-bordered w-full "
          />
        </label>
        <div className="flex my-4">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Category*</span>
            </div>
            <select
              defaultValue="Pick One"
              className="select select-bordered"
              {...register("category", { required: true })}
            >
              <option disabled>Pick One</option>
              <option>Pizza</option>
              <option>Soup</option>
              <option>Salad</option>
              <option>Dessert</option>
              <option>Deshi</option>
              <option>Drinks</option>
            </select>
          </label>
          <label className="form-control w-full ms-4">
            <div className="label">
              <span className="label-text">Price*</span>
            </div>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Price"
              className="input input-bordered w-full "
            />
          </label>
        </div>
        <label className="form-control my-4">
          <div className="label">
            <span className="label-text">Recipe Details*</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            {...register("recipe", { required: true })}
            placeholder="Recipe Details"
          ></textarea>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">ITEM IMAGE</span>
          </div>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full "
          />
        </label>
        <input className="btn btn-sm mt-4" type="submit" value="Add Item" />
      </form>
    </div>
  );
};

export default AddItem;
