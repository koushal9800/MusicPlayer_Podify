import { isAxiosError } from "axios";
import { error } from "console";

export const catchAsyncError = (error: any): string =>{
    let errorMessage = error.message
    if(isAxiosError(error)){
        const errorResponse = error.response?.data
        if(errorResponse) errorMessage =errorResponse.error
    }
    return errorMessage
}

export default catchAsyncError