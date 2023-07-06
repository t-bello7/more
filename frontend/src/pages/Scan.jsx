import { useState, useEffect, useRef, useCallback } from "react";
import { useUploadForm } from "../hooks/uploadHook";
import Webcam from 'react-webcam';

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',

}
const Scan = () => {
    const [formValues, setFormValues] = useState({})
    const [picture, setPicture] = useState('');
    const webcamRef = useRef(null);
    const convertBase64ToFile = function (image) {
        const byteString = atob(image.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i += 1) {
          ia[i] = byteString.charCodeAt(i);
        }
        const newBlob = new Blob([ab], {
          type: 'image/png',
        });
        const form = new FormData();
        form.append("imageFile", newBlob, "filename");
        return form;
      };
      
    const capture = useCallback(() => {
        const pictureSrc = webcamRef.current.getScreenshot()
        const imageFile = convertBase64ToFile(pictureSrc)
        setFormValues((prev) => ({
          imageFile: imageFile,
        }));
        console.log(formValues);
        setPicture(pictureSrc)
    })
    
    const { data, uploadForm, progress } = useUploadForm(" http://127.0.0.1:5000/api/classify-fruit");
    const { data: gradeData, uploadForm: uploadImage, progress: uploadProgress } = useUploadForm(" http://127.0.0.1:5000/api/grade-fruit");

    const submitHandler = async(e) => {
        e.preventDefault()
        uploadForm(formValues.formData)
        return data
    }

    const gradeQuality = async(e) => {
        e.preventDefault()
        uploadImage(formValues.formData)
        return gradeData.data
    }
    const handleImageChange = (e) => {
        const data = new FileReader()
        data.addEventListener('load', () => {
            setPicture(data.result);
        })
        data.readAsDataURL(e.target.files[0])
        if (e.target.files){
          const form =  new FormData();
          form.append("imageFile", e.target.files[0]);
          setFormValues({
              formData: form,
          });
        }        
    }

    return(
        <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
              <div>
                {
                    picture == '' ? 
                    (<Webcam audio={false} height={400} ref={webcamRef} width={400} screenshotFormat="image/png" videoConstraints={videoConstraints} />)
                    : (
                        <img src={picture} />
                    )
                }
                <button>
                  <input type="file" name="imageFile" onChange={handleImageChange}/>
                </button>
              {picture != '' ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              setPicture("")
            }}
            className='text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'

          >
            Retake
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className='text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Capture
          </button>
        )}
              </div>
              

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