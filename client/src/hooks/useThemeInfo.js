import { toggleTheme } from "../ReduxStore/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function useThemeInfo(){
    const theme = useSelector((state)=> state.themeSlice.theme) ; 
    const dispatch = useDispatch() ; 
    const changeTheme = (newTheme)=>{
        dispatch(toggleTheme(newTheme)) ; 
    }

    return {
        theme,
        changeTheme,
    };
}