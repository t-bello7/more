import { useState } from "react";
import axios from "axios";

export const useUploadForm = (url) => {
    const [data, setData] = useState({});
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const uploadForm = async (formData) => {
        setIsLoading(true);
        const response = await axios.post(`http://192.168.137.18${url}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (progressEvent) => {
                const progress = (progressEvent.loaded / progressEvent.total) * 50;
                setProgress(progress);
            },
            onDownloadProgress: (progressEvent) => {
                const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
                setProgress(progress);
            }
        });
        setData(response.data);
        setIsLoading(false);
    }
    return { uploadForm, isLoading, progress, data}
}