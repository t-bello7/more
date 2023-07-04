import { data } from "autoprefixer";
import { useState } from "react";
import axios from "axios";


const Scan = () => {
    const [formValues, setFormValues] = useState({
        imageFile: null
    })

    const submitHandler = async(e) => {
        //   onUploadProgress: data => {
        //     //Set the progress value to show the progress bar
        //     setProgress(Math.round((100 * data.loaded) / data.total))
        //   },
        e.preventDefault() //prevent the form from submitting
        let formData = new FormData()
        formData.append("imageFile", formValues.imageFile)
        console.log(formData)
        const response = await axios.post("http://127.0.0.1:5000/api/classify-fruit", 
                formData,
                {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
        const data = response.data;
        console.log(data);
        return data;
    }
    const handleImageChange = (e) => {
        setFormValues((prev) => ({
            imageFile: e.target.files ? e.target.files[0] : null,
        }));
    }
    return(
        <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
              <input type="file" name="imageFile" onChange={handleImageChange}/>
              <button
                type="button"
                className='text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                onClick={submitHandler}
                >
                Upload Image
              </button>

         </div>
        );
}

export default Scan;