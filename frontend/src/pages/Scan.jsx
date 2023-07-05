import { useState, useEffect } from "react";
import { useUploadForm } from "../hooks/uploadHook";

const Scan = () => {
    const [formValues, setFormValues] = useState({
        imageFile: null
    })
    const { data, uploadForm, progress } = useUploadForm("http://127.0.0.1:5000/api/classify-fruit");
    const { data: gradeData, uploadForm: uploadImage, progress: uploadProgress } = useUploadForm("http://127.0.0.1:5000/api/grade-fruit");

    const submitHandler = async(e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("imageFile", formValues.imageFile)
        uploadForm(formData)
        return data
    }

    const gradeQuality = async(e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("imageFile", formValues.imageFile)
        uploadImage(formData)
        console.log(gradeData.data)
        return gradeData.data
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
                classify Image
              </button>
                <p>{JSON.stringify(data.data)}</p>
                <button
                type="button"
                className='text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                onClick={gradeQuality}
                >
                grade Image
              </button>
              {
                gradeData.data && (
                    <>
                    <p>Fresh {JSON.stringify(gradeData?.data[0])}</p>
                    <p>Rotten {JSON.stringify(gradeData?.data[1])}</p>
                    </>
                )
              }
      
         </div> 
        );
}

export default Scan;