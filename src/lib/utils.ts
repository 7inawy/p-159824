
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    // Format date as DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${year}/${month}/${day}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}
