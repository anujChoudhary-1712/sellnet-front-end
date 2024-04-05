"use client";
import React, { useContext, useEffect, useState } from "react";
import { storage } from "@/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import toast from "react-hot-toast";
import { Context } from "@/contextapi/contextapi";
import { Button } from "@/components/ui/button";
import { postRequest } from "@/actions/APICalls";
import { useRouter } from "next/navigation";

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  fileUrl: string;
  imageUrl: string;
}

const Page = () => {
  const { user } = useContext(Context);
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "",
    fileUrl: "",
    imageUrl: "",
  });
  const [productFile, setProductFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  
  const router = useRouter()

  const handleChange = (e: any, type: string | null) => {
    const { name, value, files } = e.target;
    if (type === null) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
      localStorage.setItem(
        "formData",
        JSON.stringify({ ...formData, [name]: value })
      );
    } else if (type === "file") {
      setProductFile(files[0]);
    } else {
      setImage(files[0]);
    }
  };

  const uploadFile = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      if (!productFile) {
        toast.error("No file selected");
      } else {
        const storageRef = ref(
          storage,
          `${user.companyName}/product_files/${productFile?.name}_${Date.now()}`
        );
        setUploading(true);
        setDisabled(true);
        await uploadBytes(storageRef, productFile);
        const fileUrl = await getDownloadURL(storageRef);
        localStorage.setItem(
          "formData",
          JSON.stringify({ ...formData, fileUrl })
        );
        console.log(fileUrl);
        setFormData((prevData) => ({ ...prevData, fileUrl: fileUrl }));
        toast.success("File Uploaded Successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
      setDisabled(false);
    }
  };

  const uploadImage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let arr: string[] = [];
    e.preventDefault();
    try {
      if (!image) {
        toast.error("No Image selected");
      } else {
        const storageRef = ref(
          storage,
          `${user.companyName}/product_images/${image?.name}_${Date.now()}`
        );
        setUploading(true);
        setDisabled(true);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);
        console.log(imageUrl);
        localStorage.setItem(
          "formData",
          JSON.stringify({ ...formData, imageUrl })
        );
        toast.success("File Uploaded Successfully");
        setFormData((prevData) => ({ ...prevData, imageUrl: imageUrl }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
      setDisabled(false);
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.description || !formData.category || !formData.price) {
        toast.error("Fill all the details");
        return;
      }
      if (!formData.fileUrl) {
        toast.error("Please upload product file");
        return;
      }
      if (!formData.imageUrl) {
        toast.error("Please upload product image");
        return;
      }
      setDisabled(true);
      setLoading(true);
      const body = JSON.stringify({...formData,sellerId:user._id})
      const res = await postRequest(
        "products/create",
        body
      );

      if(res.error){
        console.log(res.message)
        return
      }

      console.log(res)
      localStorage.removeItem("formData")
      router.push("/dashboard/products")
      toast.success("Product Created Successfully")
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
      setLoading(true);
    }
  };

  useEffect(() => {
    const details = localStorage.getItem("formData") || "";
    try {
      const formDetails = JSON.parse(details);
      if (formDetails) {
        setFormData(formDetails);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    console.log("jhi")
  }, []);

  return (
    <form className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-white text-xl">Creating new product</h2>
        <Button
          variant={"secondary"}
          className="bg-white text-black"
          onClick={(e) => handleSubmit(e)}
          disabled={isDisabled}
        >
          Submit
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-2">
          <label className="text-white text-sm font-medium">Product Name</label>
          <input
            type="text"
            className="w-full outline-none p-2 rounded-md bg-[#3f4141] text-white"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e, null)}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label className="text-white text-sm font-medium">
            Product Description
          </label>
          <textarea
            rows={3}
            className="w-full outline-none p-2 rounded-md bg-[#3f4141] text-white"
            name="description"
            value={formData.description}
            onChange={(e) => handleChange(e, null)}
          ></textarea>
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label className="text-white text-sm font-medium">
            Price in rupees
          </label>
          <input
            type="number"
            className="w-full outline-none p-2 rounded-md bg-[#3f4141] text-white"
            name="price"
            value={formData.price}
            onChange={(e) => handleChange(e, null)}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label className="text-white text-sm font-medium">Category</label>
          <select
            className="w-full outline-none p-2 rounded-md bg-[#3f4141] text-white"
            name="category"
            value={formData.category}
            onChange={(e) => handleChange(e, null)}
          >
            <option value="">Select Category</option>
            <option value="UI Design">UI Design</option>
            <option value="UI Kit">UI Kit</option>
            <option value="Icons">Icons</option>
            <option value="Emojis">Emojis</option>
            <option value="Other">Other</option>
          </select>
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label className="text-white text-sm font-medium">Product File</label>
          <div className="flex gap-4 justify-between items-center">
            <input
              type="file"
              className="w-10/12 xl:w-11/12 outline-none p-2 rounded-md bg-[#3f4141] text-white"
              onChange={(e) => handleChange(e, "file")}
            />
            <Button
              variant={"secondary"}
              className="bg-white text-black w-fit min-w-[130px]"
              disabled={isDisabled}
              onClick={(e) => uploadFile(e)}
            >
              Upload File
            </Button>
          </div>
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label className="text-white text-sm font-medium">
            Product Image
          </label>
          <div className="flex gap-4 justify-between items-center">
            <input
              type="file"
              className="w-10/12 xl:w-11/12 outline-none p-2 rounded-md bg-[#3f4141] text-white"
              onChange={(e) => handleChange(e, "image")}
            />

            <Button
              variant={"secondary"}
              className="bg-white text-black w-fit min-w-[130px]"
              disabled={isDisabled}
              onClick={(e) => uploadImage(e)}
            >
              Upload Image
            </Button>
          </div>
        </fieldset>
      </div>
    </form>
  );
};

export default Page;
